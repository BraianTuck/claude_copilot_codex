import { readFileSync, writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const STATE_PATH = join(__dirname, 'last-seen.json');
const SCRIPT_PATH = join(__dirname, 'script.js');

// Both official channels
const CHANNELS = [
  { id: 'UCV03SRZXJEz-hchIAogeJOg', label: '@claude' },
  { id: 'UCrDwWp7EBBv4NwvScIpBDOA', label: '@anthropic-ai' },
];

async function getLatestVideo(channelId) {
  const rssUrl = `https://www.youtube.com/feeds/videos.xml?channel_id=${channelId}`;
  const res = await fetch(rssUrl);
  if (!res.ok) throw new Error(`HTTP ${res.status} fetching RSS for ${channelId}`);
  const xml = await res.text();
  const m = xml.match(/<entry>([\s\S]*?)<\/entry>/);
  if (!m) return null;
  const e = m[1];
  return {
    videoId: e.match(/<yt:videoId>([^<]+)/)?.[1] || '',
    title: e.match(/<title>([^<]+)/)?.[1] || '',
    published: e.match(/<published>([^<]+)/)?.[1] || '',
    description: (e.match(/<media:description>([\s\S]*?)<\/media:description>/)?.[1] || '').trim(),
  };
}

function loadState() {
  try {
    return JSON.parse(readFileSync(STATE_PATH, 'utf8'));
  } catch {
    return { youtube: {}, changelog: { lastDate: '', lastTitle: '' } };
  }
}

function saveState(state) {
  writeFileSync(STATE_PATH, JSON.stringify(state, null, 2) + '\n');
}

function addToChangelog(video, channelLabel) {
  const src = readFileSync(SCRIPT_PATH, 'utf8');
  const date = video.published.slice(0, 10); // YYYY-MM-DD
  const title = `🎬 ${video.title}`;
  const body = video.description.length > 200
    ? video.description.slice(0, 200) + '...'
    : video.description;
  const url = `https://www.youtube.com/watch?v=${video.videoId}`;

  // Find the changelog array and insert new entry
  const marker = 'const changelog = [';
  const idx = src.indexOf(marker);
  if (idx === -1) {
    console.log('  Could not find changelog in script.js');
    return false;
  }

  // Find the first entry line (after the comment)
  const afterMarker = src.slice(idx + marker.length);
  const firstEntryMatch = afterMarker.match(/\n(\s*)\{/);
  if (!firstEntryMatch) {
    console.log('  Could not find first changelog entry');
    return false;
  }

  const indent = firstEntryMatch[1];
  const insertPos = idx + marker.length + firstEntryMatch.index + 1;

  // Escape quotes in title and body for JS string
  const escTitle = title.replace(/"/g, '\\"');
  const escBody = body.replace(/"/g, '\\"').replace(/\n/g, ' ');

  const newEntry = `${indent}{ date: "${date}", entries: [{ tool: "claude", title: "${escTitle}", body: "${escBody}", url: "${url}" }] },\n`;

  const newSrc = src.slice(0, insertPos) + newEntry + src.slice(insertPos);
  writeFileSync(SCRIPT_PATH, newSrc);
  console.log(`  Added to changelog: ${title}`);
  return true;
}

async function main() {
  const state = loadState();
  if (!state.youtube || typeof state.youtube !== 'object') state.youtube = {};
  const messages = [];
  let changelogUpdated = false;

  for (const ch of CHANNELS) {
    console.log(`Checking ${ch.label} (${ch.id})...`);
    const latest = await getLatestVideo(ch.id);
    if (!latest || !latest.videoId) {
      console.log(`  No videos found for ${ch.label}`);
      continue;
    }

    const lastId = state.youtube[ch.id] || '';

    if (lastId === latest.videoId) {
      console.log(`  No new videos on ${ch.label}`);
      continue;
    }

    // First run for this channel — just record state
    if (!lastId) {
      console.log(`  First run for ${ch.label} — recording state`);
      state.youtube[ch.id] = latest.videoId;
      continue;
    }

    // New video found
    console.log(`  New video on ${ch.label}: ${latest.title}`);
    const desc = latest.description.length > 500
      ? latest.description.slice(0, 500) + '...'
      : latest.description;

    messages.push([
      `🎬 Nuevo video en YouTube ${ch.label}`,
      '',
      latest.title,
      '',
      desc,
      '',
      `🔗 https://www.youtube.com/watch?v=${latest.videoId}`,
    ].join('\n'));

    // Add to changelog
    if (addToChangelog(latest, ch.label)) {
      changelogUpdated = true;
    }

    state.youtube[ch.id] = latest.videoId;
  }

  saveState(state);

  // Write flag for workflow to know if changelog was updated
  writeFileSync('/tmp/changelog_updated.txt', changelogUpdated ? 'yes' : '');

  if (messages.length) {
    const hora = new Date().toLocaleString('sv-SE', { timeZone: 'America/Montevideo' });
    const full = messages.join('\n\n---\n\n') + `\n\n🕐 ${hora} (Montevideo)`;
    writeFileSync('/tmp/youtube_message.txt', full);
  } else {
    writeFileSync('/tmp/youtube_message.txt', '');
  }
}

main().catch((err) => {
  console.error('Error:', err.message);
  writeFileSync('/tmp/youtube_message.txt', '');
  writeFileSync('/tmp/changelog_updated.txt', '');
  process.exit(0);
});
