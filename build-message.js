import { readFileSync, writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const SCRIPT_PATH = join(__dirname, 'script.js');
const STATE_PATH = join(__dirname, 'last-seen.json');

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

function loadState() {
  try {
    return JSON.parse(readFileSync(STATE_PATH, 'utf8'));
  } catch {
    return { youtube: { lastVideoId: '' }, changelog: { lastDate: '', lastTitle: '' } };
  }
}

function saveState(state) {
  writeFileSync(STATE_PATH, JSON.stringify(state, null, 2) + '\n');
}

const src = readFileSync(SCRIPT_PATH, 'utf8');
const changelog = loadChangelog(src).filter(e => e.date !== 'YYYY-MM-DD');

if (!changelog.length) {
  writeFileSync('/tmp/message_body.txt', '');
  process.exit(0);
}

// Most recent entry
const latest = changelog[changelog.length - 1];
const latestTitle = latest.entries[0]?.title || '';
const state = loadState();

// Check if already notified
if (state.changelog.lastDate === latest.date && state.changelog.lastTitle === latestTitle) {
  console.log('No new changelog entries');
  writeFileSync('/tmp/message_body.txt', '');
  process.exit(0);
}

// New entry — build message
const lines = latest.entries.map(({ title, body, url }) => {
  let line = `• ${title}\n  ${body}`;
  if (url) line += `\n  ${url}`;
  return line;
});

writeFileSync('/tmp/message_body.txt', `📅 ${latest.date}\n${lines.join('\n\n')}`);

// Update state
state.changelog.lastDate = latest.date;
state.changelog.lastTitle = latestTitle;
saveState(state);
console.log('New changelog entry found:', latestTitle);
