// Gera todas as imagens do site (site/img) a partir das fotos originais do WhatsApp na raiz do projeto.
// Uso: npm run imagens            (grava em site/img e atualiza build/dims.json)
//      npm run imagens -- --out tmp/img-teste   (grava em outra pasta, sem tocar no site)
//
// Os números abaixo são posições na lista catalogo-pdf/list.txt (fotos da raiz em ordem alfabética).
// Para escolher fotos novas, gere as folhas de contato: npm run folhas
const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

const ROOT = path.join(__dirname, "..");
const FOTOS = fs.readFileSync(path.join(ROOT, "catalogo-pdf", "list.txt"), "utf8").trim().split(/\r?\n/);
const outArg = process.argv.indexOf("--out");
const OUT = outArg > -1 ? path.resolve(process.argv[outArg + 1]) : path.join(ROOT, "site", "img");
const DIMS_FILE = outArg > -1 ? path.join(OUT, "dims.json") : path.join(ROOT, "build", "dims.json");
const src = i => path.join(ROOT, FOTOS[i]);

// imagens da home, do cardápio e da galeria (g01..g16 também ganham miniatura -t)
const PRINCIPAIS = {
  hero: 20, chef: 23, casamento: 41, debutante: 158, infantil: 155, jantar: 102, corporativo: 54,
  "mesa-frios": 42, confraternizacao: 74, cta: 83,
  "menu-entradas": 7, "menu-finger": 142, "menu-massas": 53, "menu-saladas": 67, "menu-carnes": 173,
  "menu-aves": 30, "menu-peixes": 179, "menu-acomp": 127, "menu-sobremesas": 111,
  g01: 58, g02: 63, g03: 88, g04: 138, g05: 59, g06: 110, g07: 107, g08: 99, g09: 3, g10: 162,
  g11: 16, g12: 68, g13: 97, g14: 69, g15: 75, g16: 161,
};

// fotos das páginas de serviço (img/p/<chave>-N.webp); a primeira é a capa da página
const PAGINAS = {
  casamento: [63, 58, 41, 69, 7, 102, 1, 57, 111],
  debutante: [158, 59, 119, 105, 33, 47, 60, 140],
  infantil: [68, 17, 76, 99, 8, 155, 50, 44],
  "personal-chef": [102, 110, 138, 97, 162, 172, 53, 71],
  corporativo: [54, 30, 74, 49, 160, 23, 79, 116],
  "mesa-de-frios": [42, 20, 16, 88, 78, 63, 64, 1],
  eventos: [75, 30, 20, 59, 41, 68, 74, 102],
};

// ícone: "V" dourado sobre vinho, desenhado como forma (não depende de fonte)
const ICONE = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" rx="14" fill="#7a2e2e"/><path d="M12 15h12.5L32 39.5 39.5 15H52L37.5 50h-11z" fill="#e8c98f"/></svg>`;

async function icones(dir) {
  fs.writeFileSync(path.join(dir, "favicon.svg"), ICONE);
  const png = s => sharp(Buffer.from(ICONE), { density: Math.max(72, s * 72 / 64 * 1.5) }).resize(s, s).png().toBuffer();
  for (const [nome, s] of [["favicon-48.png", 48], ["favicon-96.png", 96], ["favicon-192.png", 192], ["apple-touch-icon.png", 180]])
    fs.writeFileSync(path.join(dir, nome), await png(s));
  // favicon.ico com PNGs 16/32/48 embutidos
  const tamanhos = [16, 32, 48], imgs = await Promise.all(tamanhos.map(png));
  const head = Buffer.alloc(6 + 16 * tamanhos.length);
  head.writeUInt16LE(0, 0); head.writeUInt16LE(1, 2); head.writeUInt16LE(tamanhos.length, 4);
  let off = head.length;
  tamanhos.forEach((s, i) => {
    const e = 6 + 16 * i;
    head.writeUInt8(s, e); head.writeUInt8(s, e + 1); head.writeUInt16LE(1, e + 4); head.writeUInt16LE(32, e + 6);
    head.writeUInt32LE(imgs[i].length, e + 8); head.writeUInt32LE(off, e + 12); off += imgs[i].length;
  });
  fs.writeFileSync(path.join(dir, "favicon.ico"), Buffer.concat([head, ...imgs]));
}

(async () => {
  fs.mkdirSync(path.join(OUT, "p"), { recursive: true });
  let total = 0;
  for (const [nome, i] of Object.entries(PRINCIPAIS)) {
    const w = nome === "cta" ? 1600 : 1000;
    total += (await sharp(src(i)).rotate().resize({ width: w, withoutEnlargement: true }).webp({ quality: 78 }).toFile(path.join(OUT, nome + ".webp"))).size;
    if (/^g\d+$/.test(nome))
      total += (await sharp(src(i)).rotate().resize({ width: 520, withoutEnlargement: true }).webp({ quality: 72 }).toFile(path.join(OUT, nome + "-t.webp"))).size;
  }
  // imagem de compartilhamento (WhatsApp/redes)
  total += (await sharp(src(42)).rotate().resize(1200, 630, { fit: "cover" }).jpeg({ quality: 80, mozjpeg: true }).toFile(path.join(OUT, "og.jpg"))).size;

  const dims = {};
  for (const [chave, ids] of Object.entries(PAGINAS)) {
    for (let j = 0; j < ids.length; j++) {
      const nome = `${chave}-${j + 1}`;
      const r = await sharp(src(ids[j])).rotate().resize({ width: j === 0 ? 1100 : 800, withoutEnlargement: true }).webp({ quality: 76 }).toFile(path.join(OUT, "p", nome + ".webp"));
      total += r.size; dims[nome] = [r.width, r.height];
    }
  }
  fs.writeFileSync(DIMS_FILE, JSON.stringify(dims));

  // ícones ficam na raiz do site (ao lado do index.html)
  const iconDir = outArg > -1 ? OUT : path.join(ROOT, "site");
  await icones(iconDir);

  console.log(`ok — ${Math.round(total / 1024)} KB em ${path.relative(ROOT, OUT) || OUT}`);
  if (outArg < 0) console.log("Agora rode: npm run gerar");
})();
