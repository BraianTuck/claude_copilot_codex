import { readFileSync, writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const SCRIPT_PATH = join(__dirname, 'script.js');

function loadChangelog(src) {
  const marker = 'const changelog = ';
  const start = src.indexOf(marker);
  if (start === -1) return [];
  let depth = 0, i = start + marker.length;
  for (; i < src.length; i++) {
    if (src[i] === '[') depth++;
    else if (src[i] === ']') { depth--; if (depth === 0) break; }
  }
  try {
    return new Function(`return (${src.slice(start + marker.length, i + 1)})`)();
  } catch { return []; }
}

const src = readFileSync(SCRIPT_PATH, 'utf8');
const changelog = loadChangelog(src).filter(e => e.date !== 'YYYY-MM-DD');

if (!changelog.length) {
  writeFileSync('/tmp/message_body.txt', '');
  process.exit(0);
}

// Most recent entry
const latest = changelog[changelog.length - 1];
const lines = latest.entries.map(({ title, body, url }) => {
  let line = `• ${title}\n  ${body}`;
  if (url) line += `\n  ${url}`;
  return line;
});

writeFileSync('/tmp/message_body.txt', `📅 ${latest.date}\n${lines.join('\n\n')}`);
