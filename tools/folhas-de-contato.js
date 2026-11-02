// Gera folhas de contato numeradas com todas as fotos da raiz, para escolher fotos pelo número
// (o número é a posição em catalogo-pdf/list.txt, o mesmo usado em tools/imagens-site.js e catalogo-pdf/build.js).
// Uso: npm run folhas   → grava tmp/folhas/folha-0.jpg, folha-1.jpg, ...
const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

const ROOT = path.join(__dirname, "..");
const FOTOS = fs.readFileSync(path.join(ROOT, "catalogo-pdf", "list.txt"), "utf8").trim().split(/\r?\n/);
const OUT = path.join(ROOT, "tmp", "folhas");
const T = 260, COLS = 5, POR_FOLHA = 20;

(async () => {
  fs.mkdirSync(OUT, { recursive: true });
  for (let f = 0; f * POR_FOLHA < FOTOS.length; f++) {
    const lote = FOTOS.slice(f * POR_FOLHA, (f + 1) * POR_FOLHA);
    const comps = [];
    for (let i = 0; i < lote.length; i++) {
      const idx = f * POR_FOLHA + i, x = (i % COLS) * T, y = Math.floor(i / COLS) * T;
      comps.push({ input: await sharp(path.join(ROOT, lote[i])).rotate().resize(T, T, { fit: "cover" }).toBuffer(), left: x, top: y });
      comps.push({ input: Buffer.from(`<svg width="60" height="30"><rect width="60" height="30" fill="black"/><text x="5" y="22" font-size="20" fill="yellow" font-family="Arial">${idx}</text></svg>`), left: x, top: y });
    }
    await sharp({ create: { width: COLS * T, height: Math.ceil(lote.length / COLS) * T, channels: 3, background: "#fff" } })
      .composite(comps).jpeg({ quality: 70 }).toFile(path.join(OUT, `folha-${f}.jpg`));
  }
  console.log("ok —", path.relative(ROOT, OUT));
})();
