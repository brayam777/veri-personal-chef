#!/usr/bin/env bash
# Regera "Catalogo - Veri Personal Chef.pdf" na raiz do projeto.
# Uso (de qualquer pasta): bash catalogo-pdf/gerar-pdf.sh   — ou: npm run pdf:catalogo
set -e
cd "$(dirname "$0")/.."
node catalogo-pdf/build.js
node tools/pdf.js catalogo-pdf/catalogo.html "Catalogo - Veri Personal Chef.pdf"
