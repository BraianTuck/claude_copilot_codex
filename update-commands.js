import { readFileSync, writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const SCRIPT_PATH = join(__dirname, 'script.js');
const HISTORY_PATH = join(__dirname, 'docs', 'HISTORY.md');

const SOURCES = {
  claude: {
    changelog: 'https://raw.githubusercontent.com/anthropics/claude-code/main/CHANGELOG.md',
  },
  codex: {
    docs: 'https://raw.githubusercontent.com/openai/codex/main/codex-cli/README.md',
  },
  copilot: {
    docs: 'https://docs.github.com/en/copilot/reference/cli-command-reference',
  },
};

const GITHUB_MODELS_ENDPOINT = 'https://models.inference.ai.azure.com/chat/completions';
const MODEL = 'gpt-4o-mini';

function loadExistingData(src) {
  const match = src.match(/const data\s*=\s*(\{[\s\S]*?\});\s*\nconst order/);
  if (!match) throw new Error('No se pudo extraer el objeto data de script.js');
  const fn = new Function(`return (${match[1]})`);
  return fn();
}

async function fetchSource(url, githubToken) {
  const headers = { 'User-Agent': 'command-atlas-updater/1.0' };
  if (githubToken && url.includes('github.com')) {
    headers['Authorization'] = `Bearer ${githubToken}`;
  }
  try {
    const res = await fetch(url, { headers });
    if (!res.ok) {
      console.warn(`WARN: No se pudo descargar ${url} (${res.status})`);
      return null;
    }
    return res.text();
  } catch (err) {
    console.warn(`WARN: Error de red al descargar ${url}: ${err.message}`);
    return null;
  }
}

async function fetchAllSources(githubToken) {
  const results = {};
  for (const [tool, urls] of Object.entries(SOURCES)) {
    results[tool] = {};
    for (const [type, url] of Object.entries(urls)) {
      console.log(`  Descargando ${tool}/${type}...`);
      results[tool][type] = await fetchSource(url, githubToken);
    }
  }
  return results;
}

async function detectNewCommands(existingData, sources, githubToken) {
  const existingSummary = Object.entries(existingData).map(([tool, toolData]) => {
    const cmds = toolData.cards.flatMap(c => c.c.map(cmd => cmd[0]));
    return `${tool}: ${cmds.join(', ')}`;
  }).join('\n');

  const sourcesText = Object.entries(sources).map(([tool, data]) => {
    const content = Object.values(data).filter(Boolean).join('\n\n').slice(0, 3000);
    return `=== ${tool.toUpperCase()} ===\n${content}`;
  }).join('\n\n');

  const prompt = `Sos un asistente experto en herramientas de coding AI.

Tenés estos comandos ya documentados:
${existingSummary}

Acá están los changelogs y docs actuales:
${sourcesText}

Tu tarea: identificar comandos NUEVOS que no estén ya en la lista. Para cada comando nuevo, devolvé un array JSON con este formato exacto (sin markdown, solo JSON puro):

[
  {
    "tool": "claude",
    "cardTitle": "nombre de la card donde agregarlo (debe coincidir exactamente con una card existente)",
    "command": ["/comando", "tipo", "descripcion breve en español", "version opcional"]
  }
]

Si no hay comandos nuevos, devolvé: []

Tipos válidos: "built-in", "skill", "agent", "update", "cli", "flag", "setting", "shortcut", "experimental"
Solo incluir comandos que claramente aparecen en los changelogs/docs pero NO están en la lista existente.`;

  const res = await fetch(GITHUB_MODELS_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${githubToken}`,
    },
    body: JSON.stringify({
      model: MODEL,
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.2,
      max_tokens: 2000,
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`GitHub Models API error ${res.status}: ${err}`);
  }

  const json = await res.json();
  const raw = json.choices?.[0]?.message?.content?.trim() ?? '';

  try {
    return JSON.parse(raw);
  } catch {
    const match = raw.match(/\[[\s\S]*\]/);
    if (match) return JSON.parse(match[0]);
    console.warn('WARN: La respuesta de la AI no era JSON válido:', raw.slice(0, 200));
    return [];
  }
}

function updateHistory(injectedCommands) {
  if (!injectedCommands.length) return;
  const date = new Date().toISOString().slice(0, 10);

  // Actualizar docs/HISTORY.md
  const history = readFileSync(HISTORY_PATH, 'utf8');
  const lines = injectedCommands.map(({ tool, command }) =>
    `- **${tool}** \`${command[0]}\` — ${command[2]}`
  );
  const mdEntry = `\n### ${date}\n${lines.join('\n')}\n`;
  writeFileSync(HISTORY_PATH, history.replace('<!-- CHANGELOG:START -->', `<!-- CHANGELOG:START -->${mdEntry}`), 'utf8');

  // Inyectar entrada en changelog[] de script.js
  const src = readFileSync(SCRIPT_PATH, 'utf8');
  const entries = injectedCommands.map(({ tool, command }) =>
    `{ tool: "${tool}", cmd: "${command[0]}", desc: "${command[2].replace(/"/g, '\\"')}" }`
  ).join(', ');
  const jsEntry = `\n  { date: "${date}", entries: [${entries}] },`;
  const updated = src.replace(
    '// { date: "YYYY-MM-DD", entries: [{ tool: "claude", cmd: "/cmd", desc: "..." }] }',
    `// { date: "YYYY-MM-DD", entries: [{ tool: "claude", cmd: "/cmd", desc: "..." }] }${jsEntry}`
  );
  writeFileSync(SCRIPT_PATH, updated, 'utf8');

  console.log(`Historial actualizado con ${injectedCommands.length} entrada(s).`);
}

function escapeRegex(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function injectNewCommands(src, newCommands, existingData) {
  if (!newCommands.length) return src;

  let modified = src;
  let injectedCount = 0;

  for (const entry of newCommands) {
    const { tool, cardTitle, command } = entry;
    if (!existingData[tool]) continue;

    const alreadyExists = existingData[tool].cards.some(card =>
      card.c.some(c => c[0] === command[0])
    );
    if (alreadyExists) {
      console.log(`  Omitiendo "${command[0]}" (ya existe)`);
      continue;
    }

    const cardPattern = new RegExp(
      `(t:\\s*["']${escapeRegex(cardTitle)}["'][\\s\\S]*?c:\\s*\\[)`,
      'g'
    );

    const commandStr = JSON.stringify(command);

    if (cardPattern.test(modified)) {
      modified = modified.replace(
        new RegExp(`(t:\\s*["']${escapeRegex(cardTitle)}["'][\\s\\S]*?c:\\s*\\[)`),
        (_, prefix) => prefix + `\n          ${commandStr},`
      );
      console.log(`  + Agregado "${command[0]}" a card "${cardTitle}" (${tool})`);
      injectedCount++;
    } else {
      console.warn(`  WARN: No se encontró la card "${cardTitle}" para tool "${tool}"`);
    }
  }

  console.log(`Inyectados ${injectedCount} comandos nuevos.`);
  return modified;
}

async function main() {
  const githubToken = process.env.GITHUB_TOKEN;
  if (!githubToken) {
    console.error('ERROR: GITHUB_TOKEN no está definido.');
    process.exit(1);
  }

  console.log('Leyendo script.js...');
  const src = readFileSync(SCRIPT_PATH, 'utf8');
  const existingData = loadExistingData(src);
  console.log(`Tools cargadas: ${Object.keys(existingData).join(', ')}`);

  console.log('Descargando fuentes...');
  const sources = await fetchAllSources(githubToken);

  console.log('Consultando GitHub Models API...');
  const newCommands = await detectNewCommands(existingData, sources, githubToken);
  console.log(`Comandos nuevos detectados: ${newCommands.length}`);

  if (!newCommands.length) {
    console.log('Sin cambios. Saliendo.');
    process.exit(0);
  }

  const updatedSrc = injectNewCommands(src, newCommands, existingData);

  if (updatedSrc === src) {
    console.log('Sin cambios efectivos en script.js. Saliendo.');
    process.exit(0);
  }

  writeFileSync(SCRIPT_PATH, updatedSrc, 'utf8');
  console.log('script.js actualizado correctamente.');
  updateHistory(newCommands);
}

main().catch(err => {
  console.error('ERROR:', err.message);
  process.exit(1);
});
