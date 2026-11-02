// Verifica o site gerado em site/ (sem dependências).
// Uso: npm test                → checagens locais
//      npm run testar:producao → também confere o site publicado
const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");
const SITE_DIR = path.join(ROOT, "site");
const gerar = fs.readFileSync(path.join(ROOT, "build", "gerar.js"), "utf8");
const SITE = gerar.match(/const SITE = "([^"]+)"/)[1];
const PROD = process.argv.includes("--prod");

let falhas = 0, checagens = 0;
const ok = (cond, msg) => { checagens++; if (!cond) { falhas++; console.log("  ✗ " + msg); } };

const htmls = fs.readdirSync(SITE_DIR).filter(f => f.endsWith(".html"));
const existe = p => fs.existsSync(path.join(SITE_DIR, p));
// cleanUrls da Vercel: /cardapio → cardapio.html, / → index.html
const resolve = url => {
  const p = decodeURIComponent(url.split("#")[0].split("?")[0]).replace(/^\//, "");
  if (p === "") return "index.html";
  return existe(p) ? p : existe(p + ".html") ? p + ".html" : null;
};

console.log(`Site: ${SITE}\n`);

for (const f of htmls) {
  const h = fs.readFileSync(path.join(SITE_DIR, f), "utf8");
  const pagina = f === "index.html" ? "/" : "/" + f.replace(/\.html$/, "");
  console.log(pagina);
  ok(/<title>[^<]{10,}<\/title>/.test(h), `${f}: sem <title>`);
  ok((h.match(/<h1[\s>]/g) || []).length === 1, `${f}: deve ter exatamente um <h1>`);
  if (f === "404.html") {
    ok(h.includes('content="noindex"'), "404.html: precisa de noindex");
  } else {
    ok(/<meta name="description" content="[^"]{50,}"/.test(h), `${f}: meta description curta ou ausente`);
    const canon = (h.match(/<link rel="canonical" href="([^"]+)"/) || [])[1];
    ok(canon === SITE + (pagina === "/" ? "/" : pagina), `${f}: canonical "${canon}" deveria ser ${SITE}${pagina}`);
    ok(h.includes('href="/favicon.ico"'), `${f}: sem favicon.ico`);
  }
  for (const m of h.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) {
    try { JSON.parse(m[1]); ok(true); } catch { ok(false, `${f}: JSON-LD inválido`); }
  }
  // links e arquivos locais apontam para algo que existe
  for (const m of h.matchAll(/(?:href|src|data-full)="([^"#][^"]*)"/g)) {
    const u = m[1];
    if (/^(https?:|mailto:|tel:|data:)/.test(u) || u.includes("${")) continue;
    ok(resolve(u), `${f}: referência quebrada "${u}"`);
  }
  ok(!/C:\/Users|\/c\/Users|AppData|localhost/.test(h), `${f}: contém caminho local/localhost`);
  ok(!h.includes("vericheff"), `${f}: ainda cita o domínio antigo vericheff`);
}

// CSS: imagens de fundo existem
const css = fs.readFileSync(path.join(SITE_DIR, "css", "style.css"), "utf8");
for (const m of css.matchAll(/url\((\/img\/[^)]+)\)/g)) ok(resolve(m[1]), `style.css: imagem "${m[1]}" não existe`);

// sitemap e robots
const sitemap = fs.readFileSync(path.join(SITE_DIR, "sitemap.xml"), "utf8");
const locs = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => m[1]);
console.log(`\nsitemap: ${locs.length} URLs`);
ok(locs.length === htmls.length - 1, `sitemap tem ${locs.length} URLs, esperado ${htmls.length - 1} (todas menos a 404)`);
for (const l of locs) ok(l.startsWith(SITE) && resolve(l.slice(SITE.length) || "/"), `sitemap: URL sem página "${l}"`);
ok(fs.readFileSync(path.join(SITE_DIR, "robots.txt"), "utf8").includes(`Sitemap: ${SITE}/sitemap.xml`), "robots.txt sem a linha do sitemap");

async function producao() {
  console.log(`\nProdução (${SITE}):`);
  for (const l of [...locs, `${SITE}/sitemap.xml`, `${SITE}/favicon.ico`]) {
    const r = await fetch(l, { redirect: "manual" });
    ok(r.status === 200, `${l} respondeu ${r.status}`);
  }
  // arquivos internos não podem estar publicados
  for (const p of ["/CLAUDE.md", "/README.md", "/package.json", "/tests/verificar-site.js", "/build/gerar.js",
                   "/tools/imagens-site.js", "/catalogo-pdf/build.js", "/vercel.json", "/.gitignore"]) {
    const r = await fetch(SITE + p, { redirect: "manual" });
    ok(r.status === 404, `${p} deveria dar 404 no site, deu ${r.status}`);
  }
}

(async () => {
  if (PROD) await producao();
  console.log(`\n${checagens - falhas}/${checagens} checagens ok`);
  if (falhas) { console.log(`${falhas} falha(s)`); process.exit(1); }
})();
