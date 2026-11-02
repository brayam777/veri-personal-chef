// Imprime um HTML local em PDF com o Chrome/Edge headless.
// Uso: node tools/pdf.js <arquivo.html> <saida.pdf>
// Se o navegador não for encontrado, defina a variável CHROME com o caminho do executável.
const fs = require("fs");
const path = require("path");
const { execFileSync } = require("child_process");
const { pathToFileURL } = require("url");

const [html, pdf] = process.argv.slice(2);
if (!html || !pdf) { console.error("Uso: node tools/pdf.js <arquivo.html> <saida.pdf>"); process.exit(1); }

const candidatos = [
  process.env.CHROME,
  "C:/Program Files/Google/Chrome/Application/chrome.exe",
  "C:/Program Files (x86)/Google/Chrome/Application/chrome.exe",
  process.env.LOCALAPPDATA && path.join(process.env.LOCALAPPDATA, "Google/Chrome/Application/chrome.exe"),
  "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe",
  "C:/Program Files/Microsoft/Edge/Application/msedge.exe",
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  "/usr/bin/google-chrome", "/usr/bin/chromium", "/usr/bin/chromium-browser",
].filter(Boolean);
const chrome = candidatos.find(c => fs.existsSync(c));
if (!chrome) { console.error("Chrome/Edge não encontrado. Defina CHROME=<caminho do executável>."); process.exit(1); }

execFileSync(chrome, [
  "--headless=new", "--disable-gpu", "--allow-file-access-from-files", "--no-pdf-header-footer",
  "--virtual-time-budget=15000", `--print-to-pdf=${path.resolve(pdf)}`, pathToFileURL(path.resolve(html)).href,
], { stdio: "inherit" });
console.log("ok —", path.resolve(pdf));
