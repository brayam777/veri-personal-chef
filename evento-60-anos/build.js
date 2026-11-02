// Gera o portfólio do evento "Aniversário de 60 anos" da Veri Personal Chef.
// Uso: bash evento-60-anos/gerar-pdf.sh
const fs = require('fs');
const S = __dirname;
const PHONE = '(62) 98593-3737';
const img = n => `fotos/foto-${n}.jpg`;

// Cardápio impresso do evento (foto 105 da pasta do Drive)
const menu = [
  ['Entradas & Aperitivos', ['Seleção de pães', 'Frios e embutidos', 'Queijo Brie com castanhas e mel',
    'Burrata com tomate confit', 'Seleção de peito de peru, salame e presunto Parma', 'Patê de frango', 'Patê de abacaxi',
    'Carpaccio de filé com mostarda Dijon e alcaparras', 'Ceviche de manga', 'Ceviche de maçã-verde com batata chips',
    'Vinagrete de polvo', 'Bruschetta de Brie com geleia de pimenta e nozes', 'Bruschetta de tomate confit com burrata',
    'Terrine de pistache e romã', 'Terrine de figo e Parma', 'Salada Caprese', 'Mix de frutas']],
  ['Finger Foods', ['Mini-hambúrguer com batata', 'Camarão empanado', 'Cestinha de massa filo com Brie e geleia de damasco']],
  ['Pratos Principais', ['Conchiglione recheado com frango', 'Mix de folhas', 'Fraldinha assada com batatas',
    'Filé de tilápia com farofa', 'Arroz branco', 'Arroz com amêndoas']],
];

const galleries = [
  { title: 'Entradas & Aperitivos', grid: 6, photos: [[76, 'Queijo Brie com castanhas e mel'], [87, 'Burrata com tomate confit'],
    [60, 'Carpaccio de filé com mostarda Dijon e alcaparras'], [88, 'Frios e embutidos'], [323, 'Ceviche servido em taças'],
    [91, 'Seleção de pães']] },
  { title: 'Entradas & Aperitivos', grid: 4, photos: [[77, 'Frios e embutidos'], [324, 'Ceviche servido em taças'],
    [107, 'Focaccia com azeitonas e tomate seco'], [109, 'Queijo Brie com castanhas e mel']] },
  { title: 'Patês, Terrines & Salada', grid: 4, photos: [[89, 'Terrine de pistache e romã'], [90, 'Terrine de figo e Parma'],
    [111, 'Patê com tomatinhos confit'], [62, 'Salada Caprese']] },
  { title: 'Mesa & Ambientação', grid: 4, photos: [[3, 'Mesa do buffet'], [78, 'Mesa de entradas'], [61, 'Queijo Brie e frutas na mesa de entradas'],
    [249, 'Mesa posta']] },
];

let pageNo = 0;
const pages = [];
const footer = () => `<div class="foot"><span>Veri Personal Chef</span><span>${PHONE}</span><span>${String(pageNo).padStart(2, '0')}</span></div>`;
const add = (cls, html, withFoot = true) => { pageNo++; pages.push(`<section class="page ${cls}">${html}${withFoot ? footer() : ''}</section>`); };
const fig = ([n, cap]) => `<figure><div class="ph" style="background-image:url('${img(n)}')"></div>${cap ? `<figcaption>${cap}</figcaption>` : ''}</figure>`;

add('cover', `<div class="bg" style="background-image:url('${img(78)}')"></div><div class="shade"></div>
<div class="cv"><div class="kicker">Portfólio de Evento</div><h1>Veri</h1><div class="sub">Personal Chef</div>
<div class="rule"></div><p>Aniversário de 60 anos — buffet completo, das entradas ao prato principal.</p><div class="tel">Atendimento · ${PHONE}</div></div>`, false);

add('opener tall', `<div class="hero" style="background-image:url('${img(92)}')"><span class="hcap">Seleção de pães</span></div>
<div class="body"><div class="num">O evento</div><h2>Cardápio servido</h2><div class="rule"></div>
<div class="menu-cols">${menu.map(([t, items]) => `<div class="mblock"><h3>${t}</h3><ul>${items.map(i => `<li>${i}</li>`).join('')}</ul></div>`).join('')}</div></div>`);

for (const g of galleries) {
  add('gallery', `<div class="ghead"><span>${g.title}</span></div><div class="grid g${g.grid}">${g.photos.map(fig).join('')}</div>`);
}

add('back', `<div class="bg" style="background-image:url('${img(249)}')"></div><div class="shade full"></div>
<div class="bk"><h1>Veri</h1><div class="sub">Personal Chef</div><div class="rule"></div>
<p>Vamos criar juntos o cardápio do seu evento?</p><div class="call">Orçamentos e reservas</div><div class="big">${PHONE}</div><div class="small">WhatsApp</div></div>`, false);

const css = fs.readFileSync(S + '/../catalogo-pdf/style.css', 'utf8') + fs.readFileSync(S + '/extra.css', 'utf8');
fs.writeFileSync(S + '/evento.html', `<!doctype html><html lang="pt-BR"><head><meta charset="utf-8"><title>Portfólio Aniversário 60 anos — Veri Personal Chef</title>
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400;1,500&family=Montserrat:wght@300;400;500;600&display=block" rel="stylesheet">
<style>${css}</style></head><body>${pages.join('\n')}</body></html>`);
console.log('pages', pageNo);
