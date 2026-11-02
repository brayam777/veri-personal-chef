// Gera o catálogo em PDF da Veri Personal Chef.
// Uso: node catalogo-pdf/build.js  (depois imprime catalogo.html em PDF com o Chrome headless — ver gerar-pdf.sh)
const fs = require('fs');
const S = __dirname;
const files = fs.readFileSync(S + '/list.txt', 'utf8').trim().split(/\r?\n/);
// fotos ficam na raiz do projeto; o catalogo.html fica em catalogo-pdf/, por isso o caminho relativo
const DIR = '../';
const img = i => DIR + encodeURIComponent(files[i]);
const PHONE = '(62) 98593-3737';

const sections = [
  { title: 'Entradas & Aperitivos', hero: 16, heroCap: 'Tábua de queijos e embutidos', items: [
    'Tábua de queijos e embutidos', 'Queijo Brie na massa folhada — com frutas vermelhas ou mix de castanhas caramelizadas',
    'Burrata com tomate confit e molho pesto', 'Caponata de berinjela', 'Lagarto desfiado',
    'Seleção de presunto Parma, salame e peito de peru', 'Patê de frango', 'Patê de abacaxi', 'Patê de damasco',
    'Patê de azeitona', 'Patê de atum', 'Patê de frango em versões finger food, cestinha ou barquete',
    'Terrine de figo com cream cheese e gorgonzola', 'Terrine de pistache',
    'Carpaccio de filé mignon com molho de alcaparras, mostarda Dijon e parmesão',
    'Rosbife ao molho de alcaparras e mostarda Dijon', 'Julienne de cenoura e pepino', 'Ceviche de salmão',
    'Ceviche de tilápia com manga', 'Ceviche de tilápia com maçã-verde', 'Vinagrete de polvo',
    'Bruschetta de Brie com geleia de damasco', 'Bruschetta de Brie com geleia de pimenta e nozes',
    'Bruschetta de burrata com tomate confit', 'Mini sanduíche natural',
    'Mini-hambúrguer com creme de queijo prato e cheddar', 'Quibe nas versões tradicional, desconstruído e assado',
    'Salada de bacalhau com batata, cebola, azeitonas e azeite'],
    gallery: [[0, 'Brie na massa folhada com castanhas caramelizadas'], [41, 'Burrata com tomate confit e pesto'],
      [4, 'Carpaccio de filé mignon'], [63, 'Seleção de presunto Parma'], [121, 'Ceviche de salmão'],
      [11, 'Ceviche de tilápia com maçã&#8209;verde'], [103, 'Bruschetta de burrata com tomate confit'],
      [33, 'Mini-hambúrguer'], [133, 'Quibe assado']],
    extra: { title: 'Entradas & Aperitivos · Patês & Terrines', photos: [84, 128, 12, 14, 80, 114],
      caps: { 84: 'Terrine de pistache', 128: 'Terrine de figo com cream cheese e gorgonzola' } } },
  { title: 'Finger Food', hero: 159, heroCap: 'Risoto de camarão', items: [
    'Creme de palmito com bacon', 'Bobó de camarão', 'Moqueca de peixe com camarão', 'Peixe com banana-da-terra',
    'Bacalhau gratinado', 'Escondidinho de abóbora cabotiá com carne-seca', 'Panelinha do Cerrado',
    'Escondidinho de mandioca com carne-seca', 'Fricassê de frango', 'Fricassê de carne moída ou carne-seca',
    'Chica Doida', 'Filé mignon ao molho de gorgonzola com torradas', 'Risoto de camarão com Grana Padano',
    'Risoto de funghi com filé mignon', 'Risoto de costela bovina', 'Risoto de polvo',
    'Risoto de filé mignon com parmesão', 'Cestinha de massa folhada com Brie e geleia de damasco',
    'Cestinha de carne-seca com Catupiry', 'Camarão com Catupiry'],
    gallery: [[142, 'Cestinha de massa folhada'], [166, ''], [100, ''], [160, ''], [9, ''], [119, ''],
      [59, ''], [101, ''], [146, '']] },
  { title: 'Massas', hero: 172, heroCap: 'Pappardelle com filé mignon e cogumelos', items: [
    'Rondelli', 'Penne aos quatro queijos', 'Conchiglione recheado com frango ao molho branco',
    'Conchiglione recheado com ricota ao molho vermelho', 'Massa concha ao molho do chef', 'Lasanha',
    'Fettuccine com filé mignon', 'Fettuccine com camarão ao molho pesto', 'Nhoque ao molho branco com azeite trufado',
    'Nhoque ao molho vermelho', 'Pappardelle cremoso com filé mignon e cogumelos'],
    gallery: [[171, 'Conchiglione recheado com ricota ao molho vermelho'], [147, 'Lasanha'], [53, 'Pappardelle com filé mignon'],
      [132, 'Penne com filé mignon'], [130, 'Conchiglione recheado'], [34, 'Pappardelle cremoso']] },
  { title: 'Saladas', hero: 125, heroCap: 'Salada Caesar', items: [
    'Salada Caprese', 'Mix de folhas', 'Salada de salmão com massa gravatinha', 'Salada de Parma com figo',
    'Salada de rúcula, morango e queijo gorgonzola', 'Salada Caesar', 'Salada Tropical'],
    gallery: [[21, 'Salada Caprese'], [89, ''], [45, ''], [67, 'Mix de folhas'], [56, ''], [62, '']] },
  { title: 'Pratos Principais — Carnes', hero: 102, heroCap: 'Filé mignon ao molho de vinho tinto', items: [
    'Filé mignon ao molho de vinho tinto', 'Filé mignon ao molho quatro queijos',
    'Filé mignon ao molho de mostarda Dijon e gorgonzola',
    'Filé mignon com mix de cogumelos ao molho Alfredo ou poivre e Grana Padano', 'Filé à parmegiana',
    'Strogonoff de filé mignon', 'Filé mignon ao molho madeira', 'Fraldinha assada', 'Lagarto na cerveja preta',
    'Lombo suíno ao molho cítrico', 'Lombo suíno ao molho de abacaxi', 'Pernil na cerveja preta',
    'Costelinha ao molho barbecue', 'Carré', 'Feijoada completa com acompanhamentos'],
    gallery: [[173, 'Filé mignon'], [109, 'Filé mignon com mix de cogumelos'], [148, 'Filé à parmegiana'],
      [91, ''], [90, ''], [129, 'Lombo suíno ao molho cítrico'], [138, 'Carré'], [74, 'Feijoada completa'],
      [27, 'Filé mignon ao molho']] },
  { title: 'Aves', hero: 116, heroCap: '', items: [
    'Filé de frango', 'Fricassê de frango', 'Frango cremoso com cream cheese', 'Frango xadrez',
    'Strogonoff de frango', 'Frango assado com batatas', 'Galinhada com pequi'], gallery: [] },
  { title: 'Peixes & Frutos do Mar', hero: 75, heroCap: 'Paella de frutos do mar', items: [
    'Paella de frutos do mar', 'Camarão na moranga', 'Carne-seca com requeijão na moranga', 'Moqueca de peixe',
    'Filé de salmão ao molho de maracujá', 'Filé de salmão com legumes', 'Filé de salmão ao molho de ervas',
    'Filé de merluza com farofa e purê de banana-da-terra', 'Bacalhau com nata', 'Camarão com Catupiry'],
    gallery: [[179, 'Camarão na moranga'], [97, 'Salmão ao molho de maracujá'], [110, 'Filé de salmão'],
      [108, 'Bacalhau'], [152, 'Moqueca'], [157, 'Polvo'], [107, 'Camarão na moranga'], [134, 'Filé de salmão'],
      [96, 'Risoto de camarão']] },
  { title: 'Acompanhamentos', hero: 31, heroCap: 'Arroz branco', items: [
    'Arroz branco', 'Arroz com rúcula e tomate seco', 'Arroz com brócolis e bacon', 'Arroz Biro-Biro',
    'Arroz com amêndoas laminadas', 'Arroz carreteiro', 'Caldo de feijão', 'Tutu de feijão', 'Feijão tropeiro',
    'Vinagrete de feijão-verde', 'Purê de batata', 'Creme de milho'],
    gallery: [[127, 'Arroz com amêndoas laminadas'], [153, ''], [49, ''], [30, ''], [65, ''], [145, '']] },
  { title: 'Sobremesas', hero: 111, heroCap: 'Cheesecake de frutas vermelhas', items: [
    'Mousse de maracujá com raspas de chocolate', 'Mousse de limão-siciliano com raspas de chocolate branco',
    'Panna cotta com frutas vermelhas', 'Cheesecake de doce de leite', 'Cheesecake de frutas vermelhas',
    'Sorvete com brigadeiro de Bis', 'Mousse de limão com abacaxi', 'Bombom aberto de uva e morango'],
    gallery: [[181, 'Cheesecake de doce de leite'], [158, 'Panna cotta com frutas vermelhas'],
      [105, 'Mousse de limão-siciliano'], [99, ''], [98, 'Bombom aberto de uva'], [55, '']] },
];
const events = [1, 20, 88, 86, 2, 64, 87, 77, 83, 6, 47, 92];

let pageNo = 0;
const pages = [];
const footer = () => `<div class="foot"><span>Veri Personal Chef</span><span>${PHONE}</span><span>${String(pageNo).padStart(2, '0')}</span></div>`;
const add = (cls, html, withFoot = true) => { pageNo++; pages.push(`<section class="page ${cls}">${html}${withFoot ? footer() : ''}</section>`); };
const fig = ([i, cap]) => `<figure><div class="ph" style="background-image:url('${img(i)}')"></div>${cap ? `<figcaption>${cap}</figcaption>` : ''}</figure>`;
const perPage = s => (s.gallery.length > 6 ? 9 : 6);

// Página inicial de cada seção, para o índice
let p = 3; // capa = 1, apresentação = 2
const starts = sections.map(s => { const st = p; p += 1 + Math.ceil(s.gallery.length / perPage(s)) + (s.extra ? 1 : 0); return st; });
const eventsPage = p;

add('cover', `<div class="bg" style="background-image:url('${img(88)}')"></div><div class="shade"></div>
<div class="cv"><div class="kicker">Catálogo de Pratos</div><h1>Veri</h1><div class="sub">Personal Chef</div>
<div class="rule"></div><p>Gastronomia feita com carinho, elegância e sabor.</p><div class="tel">Atendimento · ${PHONE}</div></div>`, false);

add('about', `<div class="about-img" style="background-image:url('${img(23)}')"></div>
<div class="about-txt"><div class="kicker">Bem-vindo</div><h2>Sabor para<br>cada ocasião</h2>
<p>Da mesa de frios ao prato principal, cada preparo é feito com ingredientes selecionados, apresentação cuidadosa e muito carinho — para jantares, festas, eventos e celebrações.</p>
<p>Monte o seu cardápio a partir das opções deste catálogo e fale com a Veri para um orçamento personalizado.</p>
<div class="idx">${sections.map((s, k) => `<div><span class="n">${String(k + 1).padStart(2, '0')}</span><span class="t">${s.title}</span><span class="dots"></span><span class="pg">${starts[k]}</span></div>`).join('')}
<div><span class="n">${String(sections.length + 1).padStart(2, '0')}</span><span class="t">Mesas & Eventos</span><span class="dots"></span><span class="pg">${eventsPage}</span></div></div></div>`);

sections.forEach((s, k) => {
  const long = s.items.length > 14;
  add(s.items.length > 24 ? 'opener tall' : 'opener', `<div class="hero" style="background-image:url('${img(s.hero)}')">${s.heroCap ? `<span class="hcap">${s.heroCap}</span>` : ''}</div>
<div class="body"><div class="num">${String(k + 1).padStart(2, '0')}</div><h2>${s.title}</h2><div class="rule"></div>
<ul class="${long ? 'two' : 'one'}">${s.items.map(t => `<li>${t}</li>`).join('')}</ul></div>`);
  const per = perPage(s);
  for (let g = 0; g < s.gallery.length; g += per) {
    add('gallery', `<div class="ghead"><span>${s.title}</span></div><div class="grid g${per}">${s.gallery.slice(g, g + per).map(fig).join('')}</div>`);
  }
  if (s.extra) add('gallery', `<div class="ghead"><span>${s.extra.title}</span></div><div class="grid g6">${s.extra.photos.map(i => fig([i, (s.extra.caps || {})[i] || ''])).join('')}</div>`);
});

for (let g = 0; g < events.length; g += 6) {
  add('gallery', `<div class="ghead"><span>Mesas & Eventos</span></div><div class="grid g6">${events.slice(g, g + 6).map(i => fig([i, ''])).join('')}</div>`);
}

add('back', `<div class="bg" style="background-image:url('${img(54)}')"></div><div class="shade full"></div>
<div class="bk"><h1>Veri</h1><div class="sub">Personal Chef</div><div class="rule"></div>
<p>Vamos criar juntos o cardápio do seu evento?</p><div class="call">Orçamentos e reservas</div><div class="big">${PHONE}</div><div class="small">WhatsApp</div></div>`, false);

const css = fs.readFileSync(S + '/style.css', 'utf8');
fs.writeFileSync(S + '/catalogo.html', `<!doctype html><html lang="pt-BR"><head><meta charset="utf-8"><title>Catálogo Veri Personal Chef</title>
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400;1,500&family=Montserrat:wght@300;400;500;600&display=block" rel="stylesheet">
<style>${css}</style></head><body>${pages.join('\n')}</body></html>`);
console.log('pages', pageNo);
