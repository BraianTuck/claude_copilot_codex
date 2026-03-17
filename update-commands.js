import { readFileSync, writeFileSync } from 'fs';
import { createRequire } from 'module';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const SCRIPT_PATH = join(__dirname, 'script.js');

/**
 * Lee script.js y devuelve el objeto `data` con los comandos existentes.
 * Usa regex para extraer el bloque `const data = {...}` sin ejecutar el DOM.
 */
function loadExistingData(src) {
  // Extraer el bloque const data = { ... }; usando regex
  // El objeto data termina justo antes de `const order`
  const match = src.match(/const data\s*=\s*(\{[\s\S]*?\});\s*\nconst order/);
  if (!match) {
    throw new Error('No se pudo extraer el objeto data de script.js');
  }
  // Evaluar el objeto JS (no es JSON estricto, tiene strings con comillas simples)
  // Usamos Function() para evaluarlo de forma segura
  const fn = new Function(`return (${match[1]})`);
  return fn();
}

// Smoke test - ejecutar solo si se llama directamente
const src = readFileSync(SCRIPT_PATH, 'utf8');
const existing = loadExistingData(src);
console.log('Tools loaded:', Object.keys(existing));
console.log('Claude cards:', existing.claude.cards.length);
console.log('Codex cards:', existing.codex.cards.length);
console.log('Copilot cards:', existing.copilot.cards.length);
