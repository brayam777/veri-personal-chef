#!/usr/bin/env bash
# Regera "Portfolio Aniversario 60 anos - Veri Personal Chef.pdf" na raiz do projeto.
# Uso (de qualquer pasta): bash evento-60-anos/gerar-pdf.sh   — ou: npm run pdf:evento
set -e
cd "$(dirname "$0")/.."
node evento-60-anos/build.js
node tools/pdf.js evento-60-anos/evento.html "Portfolio Aniversario 60 anos - Veri Personal Chef.pdf"
