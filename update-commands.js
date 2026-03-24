import { readFileSync, writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const SCRIPT_PATH = join(__dirname, 'script.js');
const HISTORY_PATH = join(__dirname, 'docs', 'HISTORY.md');

const SOURCES = {
  claude: {
    linkedin: 'https://www.linkedin.com/showcase/claude/posts/?feedView=all',
  },
};

const GITHUB_MODELS_ENDPOINT = 'https://models.inference.ai.azure.com/chat/completions';
const MODEL = 'gpt-4o-mini';


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

async function detectNewNews(existingChangelog, sources, githubToken) {
  const existingTitles = existingChangelog.flatMap(e => e.entries.map(n => n.title));

  const sourcesText = Object.entries(sources).map(([tool, data]) => {
    const content = Object.values(data).filter(Boolean).join('\n\n').slice(0, 4000);
    return `=== ${tool.toUpperCase()} ===\n${content}`;
  }).join('\n\n');

  const prompt = `Sos un asistente experto en noticias de productos de IA.

Estas son las noticias que ya están documentadas (títulos existentes):
${existingTitles.length ? existingTitles.join('\n') : 'Ninguna aún'}

Acá está el contenido de la página de LinkedIn de Claude con posts recientes:
${sourcesText}

Tu tarea: identificar posts o anuncios NUEVOS que no estén ya en la lista. Para cada noticia nueva, devolvé un array JSON con este formato exacto (sin markdown, solo JSON puro):

[
  {
    "date": "YYYY-MM-DD",
    "title": "Título breve del post o novedad",
    "body": "Resumen del contenido del post en español (máximo 2 oraciones)",
    "url": "URL del link que incluye el post para leer más (si hay uno, si no: \"\")"
  }
]

Si no hay noticias nuevas, devolvé: []

Solo incluir posts que aparezcan claramente en el contenido y NO estén ya en la lista existente.`;

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

function updateHistory(injectedNews) {
  if (!injectedNews.length) return;
  const date = new Date().toISOString().slice(0, 10);

  const history = readFileSync(HISTORY_PATH, 'utf8');
  const lines = injectedNews.map(({ title, url }) =>
    `- **claude** ${title}${url ? ` — ${url}` : ''}`
  );
  const mdEntry = `\n### ${date}\n${lines.join('\n')}\n`;
  writeFileSync(HISTORY_PATH, history.replace('<!-- CHANGELOG:START -->', `<!-- CHANGELOG:START -->${mdEntry}`), 'utf8');

  console.log(`Historial actualizado con ${injectedNews.length} entrada(s).`);
}

function escapeRegex(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function loadExistingChangelog(src) {
  const marker = 'const changelog = ';
  const start = src.indexOf(marker);
  if (start === -1) return [];
  let depth = 0, i = start + marker.length;
  for (; i < src.length; i++) {
    if (src[i] === '[') depth++;
    else if (src[i] === ']') { depth--; if (depth === 0) break; }
  }
  try {
    const fn = new Function(`return (${src.slice(start + marker.length, i + 1)})`);
    return fn();
  } catch { return []; }
}

function injectNewNews(src, newNews, existingChangelog) {
  if (!newNews.length) return src;

  const existingTitles = existingChangelog.flatMap(e => e.entries.map(n => n.title));
  const date = new Date().toISOString().slice(0, 10); // YYYY-MM-DD
  let modified = src;
  let injectedCount = 0;
  const toInject = [];

  for (const item of newNews) {
    if (existingTitles.includes(item.title)) {
      console.log(`  Omitiendo "${item.title}" (ya existe)`);
      continue;
    }
    toInject.push(item);
    injectedCount++;
  }

  if (!toInject.length) return src;

  const entries = toInject
    .map(item => `{ tool: "claude", title: "${item.title.replace(/"/g, '\\"')}", body: "${item.body.replace(/"/g, '\\"')}", url: "${item.url}" }`)
    .join(', ');
  const jsEntry = `\n  { date: "${date}", entries: [${entries}] },`;

  modified = modified.replace(
    /\/\/ \{ date: "YYYY-MM-DD".*?\}\s*\}/,
    (match) => match + jsEntry
  );

  console.log(`Inyectadas ${injectedCount} noticias nuevas en changelog.`);
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
  const existingChangelog = loadExistingChangelog(src);
  console.log(`Entradas en changelog: ${existingChangelog.length}`);

  console.log('Descargando fuentes...');
  const sources = await fetchAllSources(githubToken);

  console.log('Consultando GitHub Models API...');
  const newNews = await detectNewNews(existingChangelog, sources, githubToken);
  console.log(`Noticias nuevas detectadas: ${newNews.length}`);

  if (!newNews.length) {
    console.log('Sin cambios. Saliendo.');
    process.exit(0);
  }

  const updatedSrc = injectNewNews(src, newNews, existingChangelog);

  if (updatedSrc === src) {
    console.log('Sin cambios efectivos en script.js. Saliendo.');
    process.exit(0);
  }

  writeFileSync(SCRIPT_PATH, updatedSrc, 'utf8');
  console.log('script.js actualizado correctamente.');
  updateHistory(newNews);
  const lines = newNews.map(({ title, body, url }) =>
    `• ${title}\n  ${body}${url ? `\n  ${url}` : ''}`
  ).join('\n\n');
  writeFileSync('/tmp/new_commands.txt', lines, 'utf8');
}

main().catch(err => {
  console.error('ERROR:', err.message);
  process.exit(1);
});
