# Veri Personal Chef — site institucional

Site institucional da **Veri Personal Chef**, personal chef e buffet em **Goiânia e região** (casamentos, festas de 15 anos,
aniversários infantis, jantares em casa, eventos corporativos e mesas de frios). Cliente da Sua Vitrine; o projeto é
mantido por Brayam (brayamfelipe02@gmail.com). Também gera dois PDFs de venda: o catálogo de pratos e o portfólio de um
evento (aniversário de 60 anos).

## Onde está cada coisa em produção

| O quê | Onde |
|---|---|
| Site | https://verichef.suavitrine.net.br (um "f") — alias técnico: https://veri-personal-chef.vercel.app |
| Hospedagem | Vercel, projeto **veri-personal-chef**, conta **brayam777**, time *brayam-s-projects* |
| Repositório | https://github.com/brayam777/veri-personal-chef (**público**) |
| Deploy | Automático: push em `main` → produção; outras branches → preview |
| DNS | Cloudflare, zona `suavitrine.net.br`: CNAME `verichef` → `10ceaa6121a04bf0.vercel-dns-017.com` |
| Google | Search Console, propriedade `https://verichef.suavitrine.net.br/` (também coberta pela propriedade de domínio `suavitrine.net.br`) |
| Banco de dados | **Nenhum.** Não há Supabase nem outro banco neste projeto |
| Instagram da cliente | https://www.instagram.com/veripersonalchef/ · WhatsApp (62) 98593-3737 |

**Não confundir / não usar aqui:**
- Projeto Vercel **`sua-vitrine`** e repositório `brayam777/sua-vitrine` — é o site principal da Sua Vitrine, outro projeto.
- O domínio **`vericheff.suavitrine.net.br`** (dois "f") foi usado por poucos dias e **não existe mais**. Não volte a usá-lo.
- Não renomeie o registro `verichef` no Cloudflare: cada troca de endereço derrubou a indexação no Google.

## Stack e estrutura

HTML/CSS/JS puros, sem framework e sem etapa de build no deploy. Node só para os scripts.

```
site/                 o que é publicado (outputDirectory do vercel.json)
  index.html          home — editada à mão (menu, rodapé, chamada final e faixa do Instagram vêm do gerador via marcadores <!--NAV-->, <!--FOOTER-->, <!--CTA-->, <!--INSTA-->)
  *.html              páginas de serviço, cardápio e 404 — GERADAS, não editar à mão
  css/style.css, js/site.js   compartilhados por todas as páginas
  img/, img/p/        imagens otimizadas (WebP), geradas por tools/imagens-site.js
  sitemap.xml, robots.txt     gerados
build/gerar.js        gerador: conteúdo das páginas de serviço, FAQ, cardápio, SEO/JSON-LD, sitemap
build/dims.json       dimensões das fotos de img/p (gerado por tools/imagens-site.js)
tools/                imagens do site, folhas de contato numeradas, impressão de PDF (Chrome/Edge headless)
catalogo-pdf/         gerador do "Catalogo - Veri Personal Chef.pdf"
evento-60-anos/       gerador do "Portfolio Aniversario 60 anos - Veri Personal Chef.pdf"
tests/verificar-site.js   teste do site (roda também como buildCommand na Vercel)
```

Convenções: textos em pt-BR; URLs limpas (`/buffet-de-casamento`, sem `.html`, via `cleanUrls`); caminhos absolutos a
partir da raiz do site (`/img/...`, `/css/...`); CSS e JS são carregados com `?v=<hash>` calculado pelo gerador —
**sempre rode `npm run gerar` depois de mexer em `css/style.css` ou `js/site.js`**, senão visitantes ficam com a versão
antiga em cache por até 1 ano.

## Regras e dados que precisam mudar juntos

- **Domínio do site** (`https://verichef.suavitrine.net.br`): `SITE` em `build/gerar.js` **e** o `<head>` de
  `site/index.html` (canonical, og:url, og:image, JSON-LD). Depois `npm run gerar` e `npm test`. Atualize também o Search
  Console.
- **Cardápio** (lista de pratos do catálogo da cliente) existe em três lugares: `MENU` em `build/gerar.js` (página
  /cardapio), `MENU` no `<script>` de `site/index.html` (abas da home) e `sections` em `catalogo-pdf/build.js` (PDF).
- **Telefone/WhatsApp e Instagram**: constantes no topo de `build/gerar.js`, `PHONE` em `site/js/site.js`, o `<head>` e
  o JSON-LD de `site/index.html`, e `PHONE` em `catalogo-pdf/build.js` / `evento-60-anos/build.js`.
- **Fotos**: os números em `tools/imagens-site.js`, `catalogo-pdf/build.js` são posições em `catalogo-pdf/list.txt`
  (fotos originais do WhatsApp em ordem alfabética). A galeria da home (`G` e `D` em `site/index.html`) usa
  `img/g01..g16`; ao trocar uma foto da galeria, atualize as dimensões em `D`.
- **Conteúdo sem confirmação da cliente**: não invente fatos (anos de experiência, formação, número de convidados,
  serviços). Algumas respostas de FAQ já são inferências — ver pendências.

## Rodar localmente

```bash
npm install          # só precisa para os scripts de imagem (sharp)
npm run gerar        # regenera páginas de serviço, cardápio, 404, sitemap, menu/rodapé da home
npm run servir       # http://localhost:5173 (com URLs limpas, igual à Vercel)
npm test             # verificação do site
npm run testar:producao   # idem + confere o site publicado (200 nas páginas, 404 em arquivos internos)
```

Imagens e PDFs precisam do **material original da cliente**, que NÃO está no repositório (é público): as 182 fotos
`WhatsApp Image 2026-09-29 at *.jpeg` na raiz do projeto e `evento-60-anos/fotos/`. Com o material no lugar:
`npm run folhas` (escolher fotos pelo número), `npm run imagens` (regera site/img + build/dims.json, depois
`npm run gerar`), `npm run pdf:catalogo`, `npm run pdf:evento` (precisam de Chrome ou Edge; ou defina `CHROME=`).

## Publicar

`git push` em `main`. A Vercel roda `node tests/verificar-site.js` (buildCommand) e publica `site/`. Se o teste falhar, o
deploy falha e o site anterior continua no ar. Conferir: `npx vercel@latest ls veri-personal-chef`.

Não rode `vercel deploy` de dentro de `site/` (era o fluxo antigo, antes do Git): a configuração (`cleanUrls`,
`outputDirectory`, cache) fica no `vercel.json` da raiz, e um deploy feito de `site/` sairia sem ela. Se precisar de um
deploy manual, rode `npx vercel@latest deploy --prod` na raiz do projeto.

**O que não vai com o push** (é configurado fora do código): DNS no Cloudflare, domínios do projeto na Vercel, Search
Console. Não há banco de dados nem migrações neste projeto.

## Pendências em aberto

- Confirmar com a Veri as respostas de FAQ que foram deduzidas (ex.: "mini weddings", "chácaras e espaços de eventos").
- Parte das fotos do material da cliente parece banco de imagens/IA (as de numeração ~80–181); se não forem dela,
  substituir por fotos reais (`tools/imagens-site.js`).
- Search Console: em 06/10/2026 home, comida para eventos, casamento e 15 anos estavam indexadas; indexação solicitada
  para aniversário infantil, personal chef, corporativos, mesa de frios e cardápio. Conferir o relatório "Páginas".
- Ícone (favicon) e nome "Veri Personal Chef" nos resultados do Google: publicados em 06/10/2026, aguardando o Google.
  Por ser subdomínio, o Google pode continuar mostrando "suavitrine.net.br"; um domínio próprio resolveria.
