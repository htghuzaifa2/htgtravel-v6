#!/usr/bin/env node
/**
 * audit-blogs.cjs — QA gate for the HTG Travel blog corpus.
 *
 * Global checks (every post file):
 *   - title <= 62 chars, metaDescription 70-160 chars
 *   - exactly 1 quote block, >= 4 FAQs, FAQ answers 15-60 words
 *   - no FAQ question string used on more than 3 posts
 *   - promo fields globally unique (headline / body / cta / waText)
 *   - Palestine message exists for every slug, all unique
 *   - post files == SEEDS registry == Palestine message count
 *
 * New-file checks (STRICT list below — this session's additions):
 *   - body 545-800 words, 5 keywords, 4 FAQs
 *   - no em-dash / en-dash, no "!" outside waText greeting
 *   - no slop vocabulary
 *   - waText starts with "Assalam o Alaikum!" and is >= 75 chars
 *   - FAQ questions: no exact match with any other post, Jaccard < 0.6 vs all
 *   - Palestine message 140-150 chars
 *
 * Usage: node scripts/audit-blogs.cjs [--strict <file1.ts,file2.ts,...>]
 * When --strict is omitted, files modified in the last 2 days are strict.
 */

const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");
const DIR = path.join(ROOT, "src", "lib", "blog-posts");

const SLOP = [
  "unlock", "and more", "melting pot", "effortless", "tailored", "dive into",
  "world-class", "must-try", "must-visit", "transform your", "importantly",
];

let strictFiles = [];
const argIdx = process.argv.indexOf("--strict");
if (argIdx !== -1 && argIdx + 1 < process.argv.length) {
  strictFiles = process.argv[argIdx + 1].split(",").filter(Boolean).map((f) => f.trim());
} else if (argIdx === -1) {
  const twoDaysAgo = Date.now() - 2 * 24 * 3600 * 1000;
  strictFiles = fs
    .readdirSync(DIR)
    .filter((f) => f.endsWith(".ts"))
    .filter((f) => fs.statSync(path.join(DIR, f)).mtimeMs > twoDaysAgo);
}

function extract(src, field) {
  const m = src.match(new RegExp(field + ':\\s*\\n?\\s*"((?:[^"\\\\]|\\\\.)*)"', "m"));
  return m ? m[1] : null;
}

const files = fs.readdirSync(DIR).filter((f) => f.endsWith(".ts"));
const errors = [];
const warnings = [];
const qOwners = {}; // question -> [files]
const promoVals = { headline: {}, body: {}, cta: {}, waText: {} };
const allQuestions = []; // {file, q}

for (const f of files) {
  const src = fs.readFileSync(path.join(DIR, f), "utf8");
  const code = src.replace(/\/\*[\s\S]*?\*\//g, "").replace(/\/\/[^\n]*/g, "");
  const title = extract(code, "title");
  const meta = extract(code, "metaDescription");
  const wa = extract(code, "waText");
  const slug = extract(code, "slug");
  const isStrict = strictFiles.includes(f);

  if (!title || !meta || !slug) { errors.push(`${f}: missing title/meta/slug`); continue; }

  if (title.length > 62) errors.push(`${f}: title ${title.length} chars > 62`);
  if (meta.length < 70 || meta.length > 160)
    errors.push(`${f}: metaDescription ${meta.length} chars outside 70-160`);

  // quotes + faqs
  const quotes = (code.match(/type:\s*"quote"/g) || []).length;
  if (quotes !== 1) errors.push(`${f}: ${quotes} quote blocks (need exactly 1)`);
  const faqMatches = [...code.matchAll(/\{\s*q:\s*"((?:[^"\\\\]|\\\\.)*)",\s*a:\s*"((?:[^"\\\\]|\\\\.)*)"\s*\}/g)];
  if (faqMatches.length < 4) errors.push(`${f}: only ${faqMatches.length} FAQs (need >= 4)`);
  for (const m of faqMatches) {
    const aWords = m[2].split(/\s+/).length;
    if (aWords < 15 || aWords > 60)
      errors.push(`${f}: FAQ answer "${m[1].slice(0, 40)}" ${aWords} words outside 15-60`);
    qOwners[m[1].toLowerCase()] = qOwners[m[1].toLowerCase()] || [];
    qOwners[m[1].toLowerCase()].push(f);
    allQuestions.push({ file: f, q: m[1] });
  }

  // keywords
  const kwMatch = code.match(/keywords:\s*\[([\s\S]*?)\]/);
  const kws = kwMatch ? kwMatch[1].match(/"([^"]+)"/g).map((x) => x.slice(1, -1)) : [];
  if (kws.length !== 5) {
    if (isStrict) errors.push(`${f}: ${kws.length} keywords (need exactly 5)`);
    else warnings.push(`${f}: ${kws.length} keywords (legacy)`);
  }

  // promo uniqueness
  for (const k of ["headline", "body", "cta", "waText"]) {
    const v = extract(code, k);
    if (!v) { errors.push(`${f}: promo.${k} missing`); continue; }
    const key = v.toLowerCase();
    promoVals[k][key] = promoVals[k][key] || [];
    promoVals[k][key].push(f);
  }

  // body word count
  let words = 0;
  for (const m of code.matchAll(/text:\s*"((?:[^"\\\\]|\\\\.)*)"/g)) words += m[1].split(/\s+/).length;
  for (const m of code.matchAll(/items:\s*\[([\s\S]*?)\]/g))
    for (const i of m[1].matchAll(/"((?:[^"\\\\]|\\\\.)*)"/g)) words += i[1].split(/\s+/).length;
  if (isStrict && (words < 545 || words > 800))
    errors.push(`${f}: body ${words} words outside 545-800 (STRICT)`);

  // waText format
  if (!wa || !wa.startsWith("Assalam o Alaikum!")) errors.push(`${f}: waText must start with "Assalam o Alaikum!"`);
  if (wa && wa.length < 75) errors.push(`${f}: waText only ${wa.length} chars`);

  if (isStrict) {
    // hygiene: em/en dashes and exclamations outside waText
    const noWa = code.replace(wa ? wa : "", "");
    if (/—|–/.test(noWa)) errors.push(`${f}: em/en-dash present (STRICT)`);
    if (/!/.test(noWa.replace(/Assalam o Alaikum!/g, ""))) errors.push(`${f}: exclamation outside waText (STRICT)`);
    const prose = noWa.toLowerCase();
    for (const s of SLOP) if (prose.includes(s)) errors.push(`${f}: slop "${s}" (STRICT)`);
  }
}

// cross-post: question overuse (>3 posts)
for (const [q, owners] of Object.entries(qOwners))
  if (owners.length > 3) errors.push(`question on ${owners.length} posts (max 3): "${q}" -> ${owners.join(", ")}`);

// cross-post: promo uniqueness
for (const [k, map] of Object.entries(promoVals))
  for (const [v, owners] of Object.entries(map))
    if (owners.length > 1)
      errors.push(`promo.${k} duplicated across ${owners.join(" | ")}`);

// strict FAQ uniqueness: exact + Jaccard vs all other questions
const jaccard = (a, b) => {
  const A = new Set(a.toLowerCase().split(/\W+/).filter((w) => w.length > 2));
  const B = new Set(b.toLowerCase().split(/\W+/).filter((w) => w.length > 2));
  if (!A.size || !B.size) return 0;
  let inter = 0;
  for (const w of A) if (B.has(w)) inter++;
  return inter / (A.size + B.size - inter);
};
for (const { file, q } of allQuestions) {
  if (!strictFiles.includes(file)) continue;
  for (const other of allQuestions) {
    if (other.file === file && other.q === q) continue;
    if (other.q === q) { errors.push(`${file}: FAQ question exactly duplicates ${other.file}: "${q}"`); continue; }
    const j = jaccard(q, other.q);
    if (j >= 0.6) errors.push(`${file}: FAQ question too close (J=${j.toFixed(2)}) to ${other.file}: "${q}" vs "${other.q}"`);
  }
}

// Palestine messages coherence
const palSrc = fs.readFileSync(path.join(ROOT, "src", "lib", "palestine-messages.ts"), "utf8");
const palBlock = palSrc.match(/PALESTINE_BLOG_MESSAGES[^{]*\{([\s\S]*?)\n\};/);
const palEntries = palBlock
  ? [...palBlock[1].matchAll(/"([a-z0-9-]+)":\s*\n?\s*"((?:[^"\\\\]|\\\\.)*)"/g)]
  : [];
const palMap = {};
for (const [, slug, msg] of palEntries) palMap[slug] = msg;
const slugs = files.map((f) => extract(fs.readFileSync(path.join(DIR, f), "utf8"), "slug"));
for (const s of slugs) {
  if (!palMap[s]) errors.push(`no Palestine message for slug "${s}"`);
  else if (strictFiles.includes(files[slugs.indexOf(s)]) || true) {
    if (strictFiles.includes(files[slugs.indexOf(s)])) {
      const len = palMap[s].length;
      if (len < 140 || len > 150) errors.push(`Palestine message for "${s}" ${len} chars outside 140-150 (STRICT)`);
    }
  }
}
const palVals = Object.values(palMap).map((v) => v.toLowerCase());
if (palVals.length !== new Set(palVals).size) errors.push("duplicate Palestine messages detected");
if (palEntries.length !== files.length)
  errors.push(`coherence: ${files.length} post files vs ${palEntries.length} Palestine messages`);

// SEEDS registry coherence: every post file's exported const must be
// imported AND listed in the SEEDS array inside blog-data.ts
const dataSrc = fs.readFileSync(path.join(ROOT, "src", "lib", "blog-data.ts"), "utf8");
for (const f of files) {
  const src = fs.readFileSync(path.join(DIR, f), "utf8");
  const m = src.match(/export\s+const\s+(\w+):\s*BlogPostSeed/);
  if (!m) { errors.push(`${f}: no "export const <name>: BlogPostSeed" declaration`); continue; }
  const name = m[1];
  const importRe = new RegExp(`import\\s*\\{\\s*${name}\\s*\\}\\s*from\\s*"\\.\\/blog-posts\\/${f.replace(/\.ts$/, "")}"`);
  if (!importRe.test(dataSrc)) errors.push(`${f}: const ${name} not imported in blog-data.ts`);
  const listed = [...dataSrc.matchAll(new RegExp(`^\\s*${name},`, "gm"))].length;
  if (listed !== 1) errors.push(`${f}: const ${name} listed ${listed}x in SEEDS (need exactly 1)`);
}
const importCount = (dataSrc.match(/from\s+"\.\/blog-posts\//g) || []).length;
if (importCount !== files.length)
  errors.push(`coherence: ${files.length} post files vs ${importCount} imports in blog-data.ts`);

console.log(`posts: ${files.length} | palestine msgs: ${palEntries.length} | imports: ${importCount}`);
console.log(`strict (new) files: ${strictFiles.length}${strictFiles.length ? " -> " + strictFiles.join(", ") : ""}`);
if (warnings.length) console.log(`warnings: ${warnings.length}`);
warnings.slice(0, 10).forEach((w) => console.log("  WARN " + w));
if (errors.length) {
  console.log(`\nFAILED: ${errors.length} error(s)`);
  errors.forEach((e) => console.log("  ERROR " + e));
  process.exit(1);
}
console.log("\nALL CLEAN");
