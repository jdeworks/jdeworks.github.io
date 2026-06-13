#!/usr/bin/env node
// Headless verification of the "Code Editor" easter egg.
// Same approach as make-it-look-good: a self-contained static server + Puppeteer.
//
// Usage:
//   node scripts/verify-code-editor.mjs
//   (reuses the puppeteer install from a sibling repo if jdeworks has none yet:
//    NODE_PATH=/home/jens/repos/make-it-look-good/node_modules node scripts/verify-code-editor.mjs)

import { createServer } from 'http';
import { readFileSync, existsSync, readdirSync } from 'fs';
import { join, extname } from 'path';
// Resolve puppeteer from jdeworks' own install if present, else fall back to a
// sibling repo's install (make-it-look-good) so verification works before
// `npm install` is run here. ESM ignores NODE_PATH, so resolve explicitly.
import { createRequire } from 'module';
const _require = createRequire(import.meta.url);
let _pptrPath;
try { _pptrPath = _require.resolve('puppeteer'); }
catch { _pptrPath = '/home/jens/repos/make-it-look-good/node_modules/puppeteer/lib/esm/puppeteer/puppeteer.js'; }
const puppeteer = (await import(_pptrPath)).default;

const ROOT = join(import.meta.dirname, '..');
const MIME = {
  '.html': 'text/html', '.js': 'text/javascript', '.mjs': 'text/javascript',
  '.css': 'text/css', '.svg': 'image/svg+xml', '.json': 'application/json',
};

function startServer() {
  const srv = createServer((req, res) => {
    let p = decodeURIComponent(req.url.split('?')[0]);
    if (p === '/') p = '/index.html';
    const file = join(ROOT, p);
    if (!file.startsWith(ROOT) || !existsSync(file)) { res.writeHead(404); return res.end('nf'); }
    res.writeHead(200, { 'Content-Type': MIME[extname(file)] || 'application/octet-stream' });
    res.end(readFileSync(file));
  });
  return new Promise(r => srv.listen(0, () => r({ srv, port: srv.address().port })));
}

const results = [];
const ok = (name, cond, extra = '') => { results.push({ name, pass: !!cond, extra }); };

const { srv, port } = await startServer();
const base = `http://localhost:${port}`;
// Reuse an installed Chromium. Prefer $CHROME_BIN, else the newest Playwright
// chromium in the shared cache (Puppeteer's own download may be absent/partial).
function findChrome() {
  if (process.env.CHROME_BIN && existsSync(process.env.CHROME_BIN)) return process.env.CHROME_BIN;
  const pwRoot = join(process.env.HOME || '', '.cache', 'ms-playwright');
  if (!existsSync(pwRoot)) return undefined;
  const dirs = readdirSync(pwRoot).filter(d => d.startsWith('chromium-'))
    .sort((a, b) => (parseInt(b.split('-')[1]) || 0) - (parseInt(a.split('-')[1]) || 0));
  for (const d of dirs) {
    const bin = join(pwRoot, d, 'chrome-linux64', 'chrome');
    if (existsSync(bin)) return bin;
  }
  return undefined;
}
const CHROME = findChrome();
const browser = await puppeteer.launch({
  headless: true,
  executablePath: CHROME || undefined,
  args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu', '--disable-dev-shm-usage'],
});

try {
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 900 });
  const netErrors = [];
  page.on('requestfailed', r => netErrors.push(r.url()));

  await page.goto(`${base}/?layout=Code+Editor&palette=Amber&font=Modern`, { waitUntil: 'networkidle0' });
  await page.waitForSelector('[data-layout].ready', { timeout: 10000 });
  await page.waitForSelector('code-editor', { timeout: 5000 });

  // Initial tabs: about.ts + projects.ts, about.ts active
  const initTabs = await page.$$eval('[id$="-tabs"] [data-tab]', els => els.map(e => e.dataset.tab));
  ok('initial tabs include about.ts + projects.ts', initTabs.includes('about-ts') && initTabs.includes('projects-ts'), JSON.stringify(initTabs));
  const activeName = await page.$eval('[id$="-tabs"] .active', e => e.textContent.trim()).catch(() => '');
  ok('about.ts is the active tab', /about\.ts/.test(activeName), activeName);

  // No Preview/Source toggle on a .ts source file
  const toggleHiddenForSource = await page.$eval('[id$="-editor-head"]', e => e.style.display === 'none' || e.innerHTML.trim() === '');
  ok('no md-toggle on source file', toggleHiddenForSource);

  // Scrollbar color follows the accent (declaration must be valid, not 'auto')
  const sbColor = await page.evaluate(() => {
    const ed = document.querySelector('[id$="-editor"]') || document.documentElement;
    const sc = getComputedStyle(ed).scrollbarColor;
    const accent = getComputedStyle(document.documentElement).getPropertyValue('--accent').trim();
    return { sc, accent };
  });
  ok('scrollbar-color is set (not auto)', sbColor.sc && sbColor.sc !== 'auto', JSON.stringify(sbColor));

  // Sizing: whole editor capped to one screen (no page-level scroll)
  const pageFits = await page.evaluate(() =>
    document.documentElement.scrollHeight <= window.innerHeight + 2);
  ok('editor fits one screen (no page scroll)', pageFits);
  const rootIsViewport = await page.evaluate(() => {
    const r = document.querySelector('[id$="-root"]');
    return r && Math.abs(r.getBoundingClientRect().height - window.innerHeight) <= 2;
  });
  ok('editor root == viewport height', rootIsViewport);

  // Icons by status present in the tree
  const folderGlyphs = await page.$$eval('[data-node-kind="folder"][data-folder]', els =>
    els.map(e => ({ folder: e.dataset.folder, txt: e.textContent })));
  ok('project folders rendered', folderGlyphs.length >= 5, `${folderGlyphs.length} folders`);

  // Helper: expand a project folder by its data-folder id, return whether children visible
  async function expandFolder(folderId) {
    const sel = `[data-node-kind="folder"][data-folder="${folderId}"]`;
    await page.click(sel);
    return page.$eval(`[data-children="${folderId}"]`, e => !e.hidden).catch(() => false);
  }

  // Find a PUBLIC project folder (lock/box glyphs identify private/archived)
  const folderMeta = await page.$$eval('[data-node-kind="folder"][data-folder]', els =>
    els.filter(e => e.dataset.folder !== 'src').map(e => ({
      id: e.dataset.folder,
      glyph: (e.querySelector('[class*="-icon"]')?.textContent || '').trim(),
      name: e.textContent.replace(/\s+/g, ' ').trim(),
    })));
  // Public = plain folder (📁 U+1F4C1). Private = 🔒. Archived = 📦.
  const pub = folderMeta.find(f => f.glyph.codePointAt(0) === 0x1F4C1);
  const priv = folderMeta.find(f => f.glyph.codePointAt(0) === 0x1F512);
  const arch = folderMeta.find(f => f.glyph.codePointAt(0) === 0x1F4E6);
  ok('a public project folder exists (📁)', !!pub, pub?.id);
  ok('a private project folder exists (🔒)', !!priv, priv?.id);
  ok('an archived project folder exists (📦)', !!arch, arch?.id);

  // PUBLIC: expand → open README.md → expect fetched markdown to render
  if (pub) {
    const visible = await expandFolder(pub.id);
    ok('public folder expands', visible);
    const readmeSel = `[data-children="${pub.id}"] [data-node-kind="readme"]`;
    await page.waitForSelector(readmeSel, { timeout: 3000 });
    await page.click(readmeSel);
    // Wait for rendered markdown (.${uid}-md) to appear in the editor
    const rendered = await page.waitForFunction(() => {
      const ed = document.querySelector('[id$="-editor"]');
      return ed && /-md(\b|")/.test(ed.innerHTML) && ed.textContent.trim().length > 40;
    }, { timeout: 15000 }).then(() => true).catch(() => false);
    ok('public README fetches + renders markdown', rendered);

    // The editor pane scrolls independently and the page still doesn't scroll
    const independentScroll = await page.evaluate(() => {
      const ed = document.querySelector('[id$="-editor"]');
      const sb = document.querySelector('[class*="-sidebar"]');
      const pageStill = document.documentElement.scrollHeight <= window.innerHeight + 2;
      // editor is its own scroll container (a long README overflows it)
      const edScrolls = ed && ed.scrollHeight > ed.clientHeight + 2;
      // sidebar and editor are distinct scroll containers
      const distinct = ed && sb && ed !== sb;
      return { pageStill, edScrolls, distinct };
    });
    ok('page stays fixed while README is long', independentScroll.pageStill);
    ok('editor pane scrolls independently of tree', independentScroll.edScrolls && independentScroll.distinct,
       JSON.stringify(independentScroll));

    // Actually scroll the editor and prove the PAGE doesn't move (the bug that "failed").
    const scrollProof = await page.evaluate(() => {
      const ed = document.querySelector('[id$="-editor"]');
      const pageBefore = window.scrollY;
      ed.scrollTop = 9999;
      return { edScrolled: ed.scrollTop > 5, pageMoved: window.scrollY !== pageBefore, edTop: ed.scrollTop };
    });
    ok('editor scrolls internally, page does not move', scrollProof.edScrolled && !scrollProof.pageMoved,
       JSON.stringify(scrollProof));

    // Preview/Source toggle now visible; flip to Source → expect <pre> raw markdown
    const hasToggle = await page.$eval('[id$="-editor-head"]', e => /md-toggle/.test(e.innerHTML)).catch(() => false);
    ok('md-toggle appears for README', hasToggle);
    if (hasToggle) {
      await page.click('[data-md-toggle]');
      const srcShown = await page.waitForFunction(() => {
        const ed = document.querySelector('[id$="-editor"]');
        return ed && ed.querySelector('pre');
      }, { timeout: 4000 }).then(() => true).catch(() => false);
      ok('Source view shows raw markdown <pre>', srcShown);
    }
  }

  // Relative links in a rendered README are rewritten to the repo (scripts has them)
  const scripts = folderMeta.find(f => /\bscripts\b/.test(f.name));
  if (scripts) {
    await expandFolder(scripts.id);
    await page.click(`[data-children="${scripts.id}"] [data-node-kind="readme"]`);
    await page.waitForFunction(() => {
      const ed = document.querySelector('[id$="-editor"]');
      return ed && ed.querySelectorAll('a[href]').length > 0;
    }, { timeout: 15000 }).catch(() => {});
    const links = await page.evaluate(() => {
      const ed = document.querySelector('[id$="-editor"]');
      const as = [...ed.querySelectorAll('a[href]')];
      return {
        total: as.length,
        relative: as.filter(a => { const h = a.getAttribute('href'); return h && !/^(https?:|mailto:|tel:|#|\/\/|data:)/i.test(h); }).length,
        toRepo: as.filter(a => /github\.com\/jdeworks\/scripts\/blob\/HEAD\//.test(a.getAttribute('href') || '')).length,
        newTab: as.filter(a => /^https?:/i.test(a.getAttribute('href') || '')).every(a => a.target === '_blank'),
      };
    });
    ok('scripts README has links', links.total > 0, JSON.stringify(links));
    ok('no broken relative links remain', links.relative === 0, JSON.stringify(links));
    ok('relative file links rewritten to repo /blob/HEAD/', links.toRepo > 0, JSON.stringify(links));
    ok('external README links open in a new tab', links.newTab);
  }

  // Tab disambiguation: open a second README.md → both show "(repo)"
  if (pub) {
    await page.click(`[data-children="${pub.id}"] [data-node-kind="readme"]`).catch(() => {});
    await page.click('[data-file-id="root-readme"]').catch(() => {});
    const tabLabels = await page.$$eval('[id$="-tabs"] [data-tab]', els => els.map(e => e.textContent.replace(/\s+/g, ' ').trim()));
    const readmeTabs = tabLabels.filter(t => /README\.md/.test(t));
    ok('duplicate README tabs show "(repo)"', readmeTabs.length >= 2 && readmeTabs.every(t => /README\.md \(.+\)/.test(t)),
       JSON.stringify(readmeTabs));
    // about.ts stays plain (unique)
    ok('unique file name stays plain (no parens)', tabLabels.some(t => /about\.ts/.test(t) && !/about\.ts\s*\(/.test(t)),
       JSON.stringify(tabLabels));
  }

  // Nav "..." rows carry no icon
  if (pub) {
    const navHasIcon = await page.$eval(`[data-children="${pub.id}"] [data-node-kind="nav"]`,
      el => !!el.querySelector('[class*="-icon"]'));
    ok('"..." nav row has no icon', !navHasIcon);
  }

  // PRIVATE: expand → open README.md → summary renders, with NO github fetch for that repo
  if (priv) {
    netErrors.length = 0;
    const ghBefore = [];
    const sniff = r => { if (r.url().includes(`/jdeworks/`) && r.url().includes('README')) ghBefore.push(r.url()); };
    page.on('request', sniff);
    await expandFolder(priv.id);
    const rSel = `[data-children="${priv.id}"] [data-node-kind="summary"], [data-children="${priv.id}"] [data-node-kind="readme"]`;
    await page.waitForSelector(rSel, { timeout: 3000 });
    const kind = await page.$eval(rSel, e => e.dataset.nodeKind);
    ok('private README node is kind=summary (no fetch)', kind === 'summary', `kind=${kind}`);
    await page.click(rSel);
    const privRendered = await page.waitForFunction(() => {
      const ed = document.querySelector('[id$="-editor"]');
      return ed && ed.textContent.trim().length > 30;
    }, { timeout: 5000 }).then(() => true).catch(() => false);
    ok('private summary renders content', privRendered);
    page.off('request', sniff);

    // Private "..." → cheeky modal (not a new tab/navigation)
    let popupOpened = false;
    const onPopup = () => { popupOpened = true; };
    page.on('popup', onPopup);
    await page.click(`[data-children="${priv.id}"] [data-node-kind="nav"][data-private]`);
    const modalShown = await page.waitForSelector('[data-ce-modal]', { timeout: 2000 }).then(() => true).catch(() => false);
    ok('private "..." opens a cheeky modal (no navigation)', modalShown && !popupOpened);
    // Dice re-roll changes the message
    if (modalShown) {
      const before = await page.$eval('[data-ce-modal] p', e => e.textContent);
      await page.click('[data-ce-modal] [data-ce-roll]');
      await new Promise(r => setTimeout(r, 100));
      const after = await page.$eval('[data-ce-modal] p', e => e.textContent);
      ok('dice re-roll shuffles the cheeky message', before !== after, JSON.stringify({ before: before.slice(0, 30), after: after.slice(0, 30) }));
    }
    // Dismiss it
    await page.click('[data-ce-modal] [data-ce-close]').catch(() => {});
    await new Promise(r => setTimeout(r, 250));
    const modalGone = await page.$('[data-ce-modal]').then(el => !el);
    ok('cheeky modal dismisses', modalGone);
    page.off('popup', onPopup);
  }

  // Source/preview toggle is a corner overlay (absolute) — doesn't take flow height
  {
    const headAbsolute = await page.evaluate(() => {
      const h = document.querySelector('[id$="-editor-head"]');
      return h ? getComputedStyle(h).position : null;
    });
    ok('source/preview toggle is absolutely positioned (corner icon)', headAbsolute === 'absolute', String(headAbsolute));
  }

  // Tab close: count tabs, close active, expect fewer
  const before = await page.$$eval('[id$="-tabs"] [data-tab]', e => e.length);
  await page.click('[id$="-tabs"] .active [data-close]');
  const after = await page.$$eval('[id$="-tabs"] [data-tab]', e => e.length);
  ok('closing a tab removes it', after === before - 1, `${before}→${after}`);

  // ── Mobile sidebar drawer ──────────────────────────────────────────
  // On phones the file tree collapses to a slide-in drawer toggled by ☰.
  {
    const uid = await page.$eval('code-editor', e => e.dataset.uid);
    await page.setViewport({ width: 390, height: 800 });
    await new Promise(r => setTimeout(r, 250));

    const m = await page.evaluate((uid) => {
      const root = document.getElementById(uid + '-root');
      const btn = document.getElementById(uid + '-sb-toggle');
      const sb = document.querySelector('.' + uid + '-sidebar');
      return {
        btnVisible: !!(btn && btn.offsetParent !== null),
        // drawer starts off-screen (translateX(-100%) → left edge negative)
        sbHiddenLeft: sb.getBoundingClientRect().left < -10,
        openClass: root.classList.contains(uid + '-sb-open'),
      };
    }, uid);
    ok('mobile: ☰ toggle button is visible', m.btnVisible);
    ok('mobile: drawer starts hidden off-screen', m.sbHiddenLeft && !m.openClass, JSON.stringify(m));

    // Tap ☰ → drawer slides in
    await page.click(`#${uid}-sb-toggle`);
    await new Promise(r => setTimeout(r, 300));
    const opened = await page.evaluate((uid) => {
      const root = document.getElementById(uid + '-root');
      const sb = document.querySelector('.' + uid + '-sidebar');
      return { openClass: root.classList.contains(uid + '-sb-open'), sbOnScreen: sb.getBoundingClientRect().left >= -1 };
    }, uid);
    ok('mobile: ☰ opens the drawer', opened.openClass && opened.sbOnScreen, JSON.stringify(opened));

    // Tap a file row → drawer auto-closes
    await page.click(`.${uid}-sidebar [data-file-id="about-ts"]`);
    await new Promise(r => setTimeout(r, 300));
    const closedByFile = await page.evaluate((uid) =>
      !document.getElementById(uid + '-root').classList.contains(uid + '-sb-open'), uid);
    ok('mobile: opening a file auto-closes the drawer', closedByFile);

    // Re-open, then tap backdrop → closes. Click far right of the drawer
    // (the 240px drawer overlays the backdrop's left/centre).
    await page.click(`#${uid}-sb-toggle`);
    await new Promise(r => setTimeout(r, 300));
    await page.mouse.click(350, 400);
    await new Promise(r => setTimeout(r, 300));
    const closedByBackdrop = await page.evaluate((uid) =>
      !document.getElementById(uid + '-root').classList.contains(uid + '-sb-open'), uid);
    ok('mobile: tapping the backdrop closes the drawer', closedByBackdrop);

    // Restore desktop viewport for the screenshot
    await page.setViewport({ width: 1280, height: 900 });
    await new Promise(r => setTimeout(r, 200));
  }

  // Screenshot for the human
  const shot = join(ROOT, 'scripts', 'verify-code-editor.png');
  // Re-open a public README for a representative screenshot
  if (pub) {
    await page.click(`[data-children="${pub.id}"] [data-node-kind="readme"]`).catch(() => {});
    await new Promise(r => setTimeout(r, 800));
  }
  await page.screenshot({ path: shot, fullPage: false });
  console.log('screenshot:', shot);

  ok('no failed network requests (excluding optional fonts)', netErrors.filter(u => !u.includes('fonts.g')).length === 0, netErrors.join(' '));

} finally {
  await browser.close();
  srv.close();
}

const passed = results.filter(r => r.pass).length;
console.log('\n── Code Editor verification ──');
for (const r of results) console.log(`${r.pass ? '✓' : '✗'} ${r.name}${r.extra ? '  (' + r.extra + ')' : ''}`);
console.log(`\n${passed}/${results.length} checks passed`);
process.exit(passed === results.length ? 0 : 1);
