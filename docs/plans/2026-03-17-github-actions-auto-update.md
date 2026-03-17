# GitHub Actions Auto-Update Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Crear un script Node.js y un workflow de GitHub Actions que corra diariamente, detecte nuevos comandos en changelogs/docs oficiales usando GitHub Models API, actualice `script.js` automáticamente y publique el site en GitHub Pages.

**Architecture:** Un script `update-commands.js` sin dependencias externas lee el `script.js` existente para extraer comandos actuales, descarga fuentes (CHANGELOG de anthropics/claude-code y docs de Codex/Copilot), llama a GitHub Models API para identificar comandos nuevos en formato JSON, y los inyecta en `script.js`. El workflow de GitHub Actions corre el script a diario y commitea si hubo cambios.

**Tech Stack:** Node.js 20 (fetch nativo, fs/vm built-in), GitHub Actions, GitHub Models API (gpt-4o-mini), GitHub Pages.

---

### Task 1: Inicializar el repo git

**Files:**
- Init: directorio raíz del proyecto

**Step 1: Inicializar git y crear .gitignore**

```bash
cd "c:\Users\bperez\Desktop\Claude Code"
git init
```

Crear `.gitignore` con este contenido:
```
node_modules/
.env
*.log
```

**Step 2: Verificar estado**

```bash
git status
```
Esperado: muestra `index.html`, `script.js`, `styles.css`, `docs/` como untracked.

**Step 3: Primer commit**

```bash
git add index.html script.js styles.css docs/
git commit -m "feat: initial commit - AI Command Atlas cheatsheet"
```

---

### Task 2: Crear `update-commands.js` — extracción de datos existentes

**Files:**
- Create: `update-commands.js`

**Step 1: Escribir la función que lee script.js y extrae el objeto `data`**

Crear `update-commands.js` con el siguiente contenido inicial:

```js
import { readFileSync, writeFileSync } from 'fs';
import { runInNewContext } from 'vm';

const SCRIPT_PATH = new URL('./script.js', import.meta.url).pathname;

/**
 * Lee script.js y devuelve el objeto `data` con los comandos existentes.
 */
function loadExistingData() {
  const src = readFileSync(SCRIPT_PATH, 'utf8');
  const sandbox = {};
  // Ejecuta el archivo en un contexto aislado para extraer `data`
  runInNewContext(src, sandbox);
  return sandbox.data;
}

// Smoke test
const existing = loadExistingData();
console.log('Tools loaded:', Object.keys(existing));
console.log('Claude cards:', existing.claude.cards.length);
```

**Step 2: Verificar que funciona**

```bash
cd "c:\Users\bperez\Desktop\Claude Code"
node --input-type=module < update-commands.js
```

Esperado:
```
Tools loaded: [ 'claude', 'codex', 'copilot' ]
Claude cards: 12
```

> Nota: si el script tiene `let active = ...` y otras variables globales, `runInNewContext` las ignora — solo necesitamos `data`.

**Step 3: Ajustar si `runInNewContext` falla por `const`/`let` fuera de función**

Si el sandbox arroja error porque `renderAll()` u otras funciones no existen en el contexto, reemplazar el `runInNewContext` por una extracción con regex:

```js
function loadExistingData() {
  const src = readFileSync(SCRIPT_PATH, 'utf8');
  // Extrae solo el bloque `const data = { ... };`
  const match = src.match(/const data\s*=\s*(\{[\s\S]*?\});\s*\n(?:const|let|var|function)/);
  if (!match) throw new Error('No se pudo extraer el objeto data de script.js');
  return JSON.parse(
    match[1]
      .replace(/(['"])?([a-zA-Z0-9_]+)(['"])?:/g, '"$2":')  // keys sin comillas
      .replace(/'/g, '"')
  );
}
```

> Nota: el enfoque de regex es frágil para JS complejo. Si falla, usar el approach alternativo del Step 4.

**Step 4 (alternativo): Extracción robusta con separación de datos**

Si los pasos anteriores fallan, la alternativa más robusta es que el script identifique comandos existentes por búsqueda de strings directamente en el source:

```js
function extractExistingCommands(src) {
  // Devuelve un Set con todos los strings de comandos que ya están en script.js
  const commandPattern = /\["(\/[^"]+|[a-z][a-z\s\-]+)"(?:\s*,)/g;
  const commands = new Set();
  let m;
  while ((m = commandPattern.exec(src)) !== null) {
    commands.add(m[1]);
  }
  return commands;
}
```

**Step 5: Commit**

```bash
git add update-commands.js
git commit -m "feat: add update-commands.js with data extraction"
```

---

### Task 3: Agregar fetching de fuentes (CHANGELOG + docs)

**Files:**
- Modify: `update-commands.js`

**Step 1: Agregar función para descargar el CHANGELOG de Claude Code**

Agregar al script (antes del smoke test):

```js
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

async function fetchSource(url, githubToken) {
  const headers = { 'User-Agent': 'command-atlas-updater/1.0' };
  if (githubToken && url.includes('github.com')) {
    headers['Authorization'] = `Bearer ${githubToken}`;
  }
  const res = await fetch(url, { headers });
  if (!res.ok) {
    console.warn(`WARN: No se pudo descargar ${url} (${res.status})`);
    return null;
  }
  return res.text();
}
```

**Step 2: Agregar función que descarga todas las fuentes**

```js
async function fetchAllSources(githubToken) {
  const results = {};
  for (const [tool, urls] of Object.entries(SOURCES)) {
    results[tool] = {};
    for (const [type, url] of Object.entries(urls)) {
      results[tool][type] = await fetchSource(url, githubToken);
    }
  }
  return results;
}
```

**Step 3: Verificar fetch manualmente**

Reemplazar el smoke test temporalmente:

```js
const token = process.env.GITHUB_TOKEN || '';
const sources = await fetchAllSources(token);
console.log('Claude changelog length:', sources.claude.changelog?.length ?? 'FAILED');
console.log('Codex docs length:', sources.codex.docs?.length ?? 'FAILED');
```

Correr:
```bash
node update-commands.js
```

Esperado: longitudes > 0 para al menos el changelog de Claude Code (es público).

**Step 4: Commit**

```bash
git add update-commands.js
git commit -m "feat: add source fetching to update-commands.js"
```

---

### Task 4: Agregar llamada a GitHub Models API y lógica de update

**Files:**
- Modify: `update-commands.js`

**Step 1: Agregar función que llama a GitHub Models API**

```js
const GITHUB_MODELS_ENDPOINT = 'https://models.inference.ai.azure.com/chat/completions';
const MODEL = 'gpt-4o-mini';

async function detectNewCommands(existingData, sources, githubToken) {
  // Construir resumen de comandos existentes (solo los nombres, para no pasarle todo el JSON)
  const existingSummary = Object.entries(existingData).map(([tool, toolData]) => {
    const cmds = toolData.cards.flatMap(c => c.c.map(cmd => cmd[0]));
    return `${tool}: ${cmds.join(', ')}`;
  }).join('\n');

  // Construir contexto de fuentes (recortar a 8000 chars para no sobrepasar contexto)
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
    "cardTitle": "nombre de la card donde agregarlo (existente o nueva)",
    "command": ["/comando", "tipo", "descripcion breve en español", "version opcional"]
  }
]

Si no hay comandos nuevos, devolvé: []

Tipos válidos: "built-in", "skill", "agent", "update", "cli", "flag", "setting", "shortcut", "experimental"
`;

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
    // Intentar extraer JSON del texto
    const match = raw.match(/\[[\s\S]*\]/);
    if (match) return JSON.parse(match[0]);
    console.warn('WARN: La respuesta de la AI no era JSON válido:', raw.slice(0, 200));
    return [];
  }
}
```

**Step 2: Agregar función que inyecta nuevos comandos en `script.js`**

```js
function injectNewCommands(src, newCommands, existingData) {
  if (!newCommands.length) return src;

  let modified = src;
  let injectedCount = 0;

  for (const entry of newCommands) {
    const { tool, cardTitle, command } = entry;
    if (!existingData[tool]) continue;

    // Verificar que el comando no exista ya
    const alreadyExists = existingData[tool].cards.some(card =>
      card.c.some(c => c[0] === command[0])
    );
    if (alreadyExists) continue;

    // Buscar la card por título en el source
    const cardPattern = new RegExp(
      `(t:\\s*["']${escapeRegex(cardTitle)}["'][\\s\\S]*?c:\\s*\\[)`,
      'g'
    );

    const commandStr = JSON.stringify(command);

    if (cardPattern.test(modified)) {
      // Agregar al final del array c: de esa card
      modified = modified.replace(cardPattern, (match, prefix) => {
        return prefix + `\n          ${commandStr},`;
      });
      injectedCount++;
    } else {
      console.warn(`WARN: No se encontró la card "${cardTitle}" para tool "${tool}"`);
    }
  }

  console.log(`Inyectados ${injectedCount} comandos nuevos.`);
  return modified;
}

function escapeRegex(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
```

**Step 3: Escribir la función `main` que orquesta todo**

Reemplazar el smoke test con:

```js
async function main() {
  const githubToken = process.env.GITHUB_TOKEN;
  if (!githubToken) {
    console.error('ERROR: GITHUB_TOKEN no está definido.');
    process.exit(1);
  }

  console.log('Leyendo script.js...');
  const src = readFileSync(SCRIPT_PATH, 'utf8');
  const existingData = loadExistingData(src);

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
}

main().catch(err => {
  console.error('ERROR:', err.message);
  process.exit(1);
});
```

**Step 4: Ajustar `loadExistingData` para recibir `src` como parámetro**

La función debe aceptar el source ya leído para evitar doble lectura:

```js
function loadExistingData(src) {
  const sandbox = {};
  try {
    runInNewContext(src, sandbox);
    return sandbox.data;
  } catch {
    // Fallback: extracción de comandos por regex
    console.warn('WARN: runInNewContext falló, usando extracción por regex.');
    return null; // main manejará el null
  }
}
```

**Step 5: Verificar sintaxis**

```bash
node --check update-commands.js
```

Esperado: sin output (sin errores de sintaxis).

**Step 6: Commit**

```bash
git add update-commands.js
git commit -m "feat: add GitHub Models API call and command injection logic"
```

---

### Task 5: Crear el workflow de GitHub Actions

**Files:**
- Create: `.github/workflows/update-commands.yml`

**Step 1: Crear el directorio y el archivo**

```bash
mkdir -p .github/workflows
```

Crear `.github/workflows/update-commands.yml`:

```yaml
name: Auto-update commands

on:
  schedule:
    - cron: '0 6 * * *'   # 6am UTC todos los días
  workflow_dispatch:        # permite correr manualmente desde la UI de GitHub

permissions:
  contents: write           # necesario para hacer git push

jobs:
  update:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'

      - name: Run update script
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
        run: node update-commands.js

      - name: Commit changes if any
        run: |
          git config user.name "github-actions[bot]"
          git config user.email "github-actions[bot]@users.noreply.github.com"
          git diff --quiet && echo "No changes" && exit 0
          git add script.js
          git commit -m "chore: auto-update commands [skip ci]"
          git push
```

**Step 2: Verificar YAML válido**

```bash
node -e "
const fs = require('fs');
const content = fs.readFileSync('.github/workflows/update-commands.yml', 'utf8');
console.log('Lines:', content.split('\n').length);
console.log('OK');
"
```

Esperado: `OK` y número de líneas razonable (>20).

**Step 3: Commit**

```bash
git add .github/workflows/update-commands.yml
git commit -m "feat: add GitHub Actions workflow for daily command updates"
```

---

### Task 6: Subir el repo a GitHub

**Step 1: Crear el repo en GitHub**

Ir a https://github.com/new y crear un repo público con el nombre `command-atlas` (o similar). **No inicializar con README** (el repo ya tiene contenido local).

**Step 2: Agregar el remote y hacer push**

```bash
git remote add origin https://github.com/TU_USUARIO/command-atlas.git
git branch -M main
git push -u origin main
```

Reemplazar `TU_USUARIO` con tu usuario de GitHub.

**Step 3: Verificar en GitHub**

Abrir `https://github.com/TU_USUARIO/command-atlas` y confirmar que se ven los archivos.

---

### Task 7: Activar GitHub Pages

**Step 1: Ir a Settings del repo**

En GitHub: Settings → Pages → Source: "Deploy from a branch" → Branch: `main` → Folder: `/ (root)` → Save.

**Step 2: Esperar el primer deploy**

El primer deploy tarda 1-2 minutos. Aparece en la tab "Actions" del repo como un workflow "pages build and deployment".

**Step 3: Verificar el site**

Abrir `https://TU_USUARIO.github.io/command-atlas` y verificar que el cheatsheet carga correctamente.

---

### Task 8: Verificar el workflow de auto-update

**Step 1: Correr el workflow manualmente**

En GitHub: Actions → "Auto-update commands" → "Run workflow" → Run workflow.

**Step 2: Ver logs**

Abrir el workflow run y verificar que los steps pasan. Resultado esperado en los logs:
```
Leyendo script.js...
Descargando fuentes...
Consultando GitHub Models API...
Comandos nuevos detectados: 0   (o N si hay novedades)
Sin cambios. Saliendo.          (o "script.js actualizado correctamente.")
```

**Step 3: Si el step falla por permisos de `contents: write`**

Ir a Settings → Actions → General → Workflow permissions → seleccionar "Read and write permissions" → Save.

Volver a correr el workflow manualmente.

---

## Notas de implementación

- `update-commands.js` debe usar `import` (ESM) porque usa `import.meta.url`. Si el proyecto no tiene `package.json`, agregar uno mínimo: `{ "type": "module" }` y commitearlo antes del Task 2.
- Si `runInNewContext` falla porque `script.js` llama a `document.getElementById` (que no existe en Node), el fallback de extracción por regex se activa automáticamente.
- El `[skip ci]` en el mensaje del commit evita que el push del bot dispare otro workflow.
- GitHub Models API tiene un free tier generoso para repos públicos. Si alcanza el límite, el workflow falla sin modificar `script.js`.
