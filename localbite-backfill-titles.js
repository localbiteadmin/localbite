#!/usr/bin/env node
// localbite-backfill-titles.js
// Fetches article titles for all sources missing article_title field
// Uses curl to fetch page HTML and extracts <title> tag
// Falls back to constructed title for blocked URLs
// Run from: /Users/harryenchin/Documents/GitHub/localbite/
// Usage: node localbite-backfill-titles.js [--dry-run] [--city lisbon]

const fs = require('fs');
const { execSync } = require('child_process');

const args = process.argv.slice(2);
const DRY_RUN = args.includes('--dry-run');
const CITY_FILTER = args.includes('--city') ? args[args.indexOf('--city') + 1] : null;

// ─── CONFIG ───────────────────────────────────────────────────────────────────

// Only process canonical live files — skip v5 archives and raw files
const LIVE_FILES = [
  'localbite-barcelona-2023-2026.json',
  'localbite-valencia-2023-2026.json',
  'localbite-seville-2023-2026.json',
  'localbite-cordoba-2023-2026.json',
  'localbite-granada-2023-2026.json',
  'localbite-lisbon-2023-2026.json',
  'localbite-porto-2023-2026.json',
  'localbite-malaga-2023-2026.json',
  'localbite-toronto-2023-2026.json',
  'localbite-fes-2025-2026.json',
  'localbite-marrakesh-2025-2026.json',
  'localbite-rabat-2025-2026.json',
  'localbite-chefchaouen-2025-2026.json',
];

// Sources known to block automated fetches — use constructed titles
const KNOWN_BLOCKED = [
  'torontolife.com',
  'nowtoronto.com',
  'observador.pt',
  'publico.pt',
  'guardian.com',
  'theguardian.com',
  'timeout.com',
  'timeout.pt',
];

// Manual title overrides for sources where we know the title
// Format: 'source-id': 'Article Title'
const MANUAL_TITLES = {
  'foodism-23best-2026': 'The 23 Best Restaurants in Toronto Right Now',
  'foodism-winter-new-2026': 'The Best New Restaurants in Toronto This Winter',
  'foodism-summer-new-2025': 'The Best New Restaurants in Toronto This Summer',
  'madamemarie-fall-2025': "Toronto's Hottest New Restaurants for Fall 2025",
  'madamemarie-summer-2025': "Toronto's Hottest New Restaurants for Summer 2025",
  'madamemarie-stop-review-2025': 'Restaurant Review: Stop Restaurant',
  'nowtoronto-caribbean-2025': 'Taste the Islands at These 8 Caribbean Food Spots in Toronto',
  'nowtoronto-michelin-2025': "Toronto Region's Michelin Guide 2025 Just Dropped",
  'src-tl-michelin-25': "Toronto's Michelin Guide Was Just Updated: All the New Starred Restaurants",
  'src-tl-bnr-25': "These Are Toronto's Best New Restaurants of 2025",
  'src-cc-jan-25': 'New Toronto Restaurants Worth the Splurge (2025)',
  'src-c100-25': "Canada's 100 Best Restaurants 2025",
};

// ─── HELPERS ─────────────────────────────────────────────────────────────────

function extractTitle(html) {
  const match = html.match(/<title[^>]*>([^<]+)<\/title>/i);
  if (!match) return null;
  let title = match[1]
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\s+/g, ' ')
    .trim();
  // Strip common suffixes like " | Publication Name" or " - Publication Name"
  title = title.replace(/\s*[\|—\-–]\s*[^|—\-–]{3,40}$/, '').trim();
  return title || null;
}

function fetchTitle(url, sourceId) {
  // Check manual override first
  if (MANUAL_TITLES[sourceId]) {
    return { title: MANUAL_TITLES[sourceId], method: 'manual' };
  }

  // Check if URL is known blocked
  const isBlocked = KNOWN_BLOCKED.some(domain => url.includes(domain));
  if (isBlocked) {
    return { title: null, method: 'blocked' };
  }

  // Try curl fetch
  try {
    const html = execSync(
      `curl -s -L --max-time 10 -A "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36" "${url}"`,
      { encoding: 'utf8', timeout: 15000 }
    );
    const title = extractTitle(html);
    if (title && title.length > 5) {
      return { title, method: 'curl' };
    }
    return { title: null, method: 'curl-no-title' };
  } catch (e) {
    return { title: null, method: 'curl-error' };
  }
}

function constructTitle(source) {
  // Build a reasonable title from available metadata
  const pub = source.publication;
  const date = source.article_date ? source.article_date.substring(0, 7) : null;
  const writer = source.writer;
  if (date) {
    return `${pub} — ${date}`;
  }
  return pub;
}

// ─── MAIN ─────────────────────────────────────────────────────────────────────

let totalProcessed = 0;
let totalUpdated = 0;
let totalSkipped = 0;
let totalBlocked = 0;
let totalFailed = 0;

const files = LIVE_FILES.filter(f => {
  if (!fs.existsSync(f)) return false;
  if (CITY_FILTER) {
    const d = JSON.parse(fs.readFileSync(f, 'utf8'));
    const city = (d.city || (d.meta && d.meta.city) || '').toLowerCase();
    return city.includes(CITY_FILTER.toLowerCase());
  }
  return true;
});

console.log(DRY_RUN ? '=== DRY RUN MODE ===' : '=== LIVE MODE ===');
console.log('Files to process:', files.length);
if (CITY_FILTER) console.log('City filter:', CITY_FILTER);
console.log('');

files.forEach(file => {
  const d = JSON.parse(fs.readFileSync(file, 'utf8'));
  const city = d.city || (d.meta && d.meta.city);
  const sourcesNeedingTitles = d.sources.filter(s => !s.article_title);

  if (sourcesNeedingTitles.length === 0) {
    console.log(`${city}: all titles present, skipping`);
    return;
  }

  console.log(`\n${city}: ${sourcesNeedingTitles.length} sources need titles`);
  let changed = false;

  d.sources.forEach(source => {
    if (source.article_title) {
      totalSkipped++;
      return;
    }

    totalProcessed++;
    const url = source.url;

    if (!url) {
      const constructed = constructTitle(source);
      console.log(`  [no-url] ${source.publication} → "${constructed}"`);
      if (!DRY_RUN) {
        source.article_title = constructed;
        changed = true;
      }
      totalUpdated++;
      return;
    }

    process.stdout.write(`  [fetch] ${source.publication} (${source.id})... `);
    const result = fetchTitle(url, source.id);

    if (result.title) {
      console.log(`✓ "${result.title}" [${result.method}]`);
      if (!DRY_RUN) {
        source.article_title = result.title;
        changed = true;
      }
      totalUpdated++;
    } else if (result.method === 'blocked') {
      const constructed = constructTitle(source);
      console.log(`⚠ blocked → constructed: "${constructed}"`);
      if (!DRY_RUN) {
        source.article_title = constructed;
        changed = true;
      }
      totalBlocked++;
      totalUpdated++;
    } else {
      const constructed = constructTitle(source);
      console.log(`✗ failed [${result.method}] → constructed: "${constructed}"`);
      if (!DRY_RUN) {
        source.article_title = constructed;
        changed = true;
      }
      totalFailed++;
      totalUpdated++;
    }

    // Rate limit — be polite to servers
    try { execSync('sleep 1'); } catch(e) {}
  });

  if (changed && !DRY_RUN) {
    fs.writeFileSync(file, JSON.stringify(d, null, 2));
    console.log(`  → ${file} updated`);
  }
});

console.log('\n=== SUMMARY ===');
console.log('Processed:', totalProcessed);
console.log('Updated:', totalUpdated, '(from curl:', totalUpdated - totalBlocked - totalFailed, '| manual:', Object.keys(MANUAL_TITLES).length, '| constructed:', totalBlocked + totalFailed + ')');
console.log('Already had titles:', totalSkipped);
console.log('Blocked (constructed fallback):', totalBlocked);
console.log('Failed (constructed fallback):', totalFailed);

if (DRY_RUN) {
  console.log('\nDry run complete — no files written. Run without --dry-run to apply.');
} else {
  console.log('\nDone. Commit with:');
  console.log('git add localbite-*-2023-2026.json localbite-*-2025-2026.json');
  console.log('git commit -m "feat: backfill article_title field for all sources"');
  console.log('git push');
}
