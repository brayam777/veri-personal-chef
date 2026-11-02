# Veri Personal Chef

Site institucional da Veri Personal Chef — buffet e personal chef em Goiânia e região.

**No ar:** https://verichef.suavitrine.net.br

Site estático (HTML, CSS e JS puros) publicado na Vercel. As páginas de serviço, o cardápio, o sitemap e o menu/rodapé
são gerados por `build/gerar.js`. Detalhes de estrutura, regras e pendências estão no [CLAUDE.md](CLAUDE.md).

## Comandos

| Comando | O que faz |
|---|---|
| `npm run gerar` | Regenera as páginas a partir de `build/gerar.js` |
| `npm run servir` | Abre o site em http://localhost:5173 |
| `npm test` | Verifica o site (títulos, links, imagens, SEO, sitemap) |
| `npm run testar:producao` | Verifica também o site publicado |
| `npm run imagens` | Regera as imagens otimizadas do site* |
| `npm run folhas` | Folhas de contato numeradas das fotos originais, em `tmp/folhas/`* |
| `npm run pdf:catalogo` / `npm run pdf:evento` | Regera os PDFs de venda* (precisa de Chrome ou Edge) |

\* Precisam do material original da cliente, que não está no repositório (ver abaixo).

## Publicar

Faça commit e `git push` na branch `main`. A Vercel roda o teste e, se passar, publica a pasta `site/` em produção
em cerca de um minuto. Branches diferentes de `main` geram um link de prévia.

```bash
npm run gerar
npm test
git add -A
git commit -m "Descreva a mudança"
git push
```

Este projeto não tem banco de dados. DNS (Cloudflare), domínios da Vercel e Search Console são configurados fora do
código e não mudam com o push.

## Continuar em outro computador

### 1. Instalar

- [Git](https://git-scm.com/downloads)
- [Node.js](https://nodejs.org/) 20 ou mais novo (LTS)
- [GitHub CLI](https://cli.github.com/)
- Google Chrome ou Microsoft Edge (só para gerar os PDFs)

### 2. Entrar nas contas

```bash
gh auth login --web
```

Escolha GitHub.com e HTTPS, e entre com a conta **brayam777**. No Windows, se o `gh` não for encontrado no terminal,
use `"C:\Program Files\GitHub CLI\gh.exe" auth login --web`.

A Vercel só é necessária para ver deploys ou mexer em configurações (o deploy já é automático pelo push):

```bash
npx vercel@latest login
npx vercel@latest link --yes --project veri-personal-chef
```

O `link` cria um arquivo `.env.local`; ele já está no `.gitignore` e pode ser apagado.

### 3. Baixar o projeto e testar

```bash
gh repo clone brayam777/veri-personal-chef
cd veri-personal-chef
npm install
npm test
npm run servir
```

### 4. Material original da cliente (opcional)

O repositório é público, então as fotos originais e os PDFs **não** estão nele. Só são necessários para regerar
imagens ou PDFs. Copie da pasta original (`Downloads/veri personal cheff` no computador antigo) para o projeto:

- as 182 fotos `WhatsApp Image 2026-09-29 at *.jpeg` → raiz do projeto
- `evento-60-anos/fotos/` → mesma pasta no projeto
- os PDFs (`Catalogo - Veri Personal Chef.pdf`, `Portfolio Aniversario 60 anos - Veri Personal Chef.pdf`,
  `DOC-20260929-WA0045.pdf`) → raiz do projeto

Esses arquivos já estão no `.gitignore` e não vão subir por engano.

### 5. Publicar

Igual a qualquer computador: `git push` na `main`. Confira o deploy com:

```bash
npx vercel@latest ls veri-personal-chef
```
