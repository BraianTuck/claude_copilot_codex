import { readFileSync, writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const SCRIPT_PATH = join(__dirname, 'script.js');

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

/**
 * Lee script.js y devuelve el objeto `data` con los comandos existentes.
 */
function loadExistingData(src) {
  const match = src.match(/const data\s*=\s*(\{[\s\S]*?\});\s*\nconst order/);
  if (!match) {
    throw new Error('No se pudo extraer el objeto data de script.js');
  }
  const fn = new Function(`return (${match[1]})`);
  return fn();
}

/**
 * Descarga una URL y devuelve el texto, o null si falla.
 */
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

/**
 * Descarga todas las fuentes definidas en SOURCES.
 */
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

// Smoke test de fetching
const token = process.env.GITHUB_TOKEN || '';
console.log('Descargando fuentes...');
const sources = await fetchAllSources(token);
console.log('Claude changelog length:', sources.claude.changelog?.length ?? 'FAILED');
console.log('Codex docs length:', sources.codex.docs?.length ?? 'FAILED');
console.log('Copilot docs length:', sources.copilot.docs?.length ?? 'FAILED');
