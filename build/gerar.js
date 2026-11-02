// Gera as páginas internas, o cardápio, o 404, o sitemap e o robots do site da Veri.
// Uso: node build/gerar.js   (a partir da pasta "veri personal cheff")
const fs = require("fs");
const path = require("path");

const SITE = "https://verichef.suavitrine.net.br";
const OUT = path.join(__dirname, "..", "site");
const DIMS = require("./dims.json");
const PHONE_FMT = "(62) 98593-3737";
const INSTA = "https://www.instagram.com/veripersonalchef/";
const INSTA_HANDLE = "@veripersonalchef";
const CITY = "Goiânia e região";

const WA_ICON = `<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm0 18.2a8.2 8.2 0 0 1-4.2-1.1l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.3-.4.3-.4.7-1.3.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.7 11.8 11.8 0 0 0 4.5 4c1.7.7 2.4.8 3.2.6.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.1-1.2l-.4-.3Z"/></svg>`;

const INSTA_ICON = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4.2"/><circle cx="17.4" cy="6.6" r="1.1" fill="currentColor" stroke="none"/></svg>`;

// ---------------------------------------------------------------- serviços
const SERVICES = [
  {
    slug: "buffet-de-casamento", img: "casamento", nav: "Buffet de casamento", short: "Recepção, jantar e sobremesas para o grande dia",
    title: "Buffet de Casamento em Goiânia | Veri Personal Chef",
    desc: "Buffet de casamento em Goiânia e região com cardápio personalizado: recepção com finger food, mesa de frios, jantar com risotos e filé mignon e sobremesas finas.",
    eyebrow: "Casamentos", h1: "Buffet de casamento em Goiânia",
    lead: "Um cardápio pensado junto com os noivos, preparado com carinho e servido com a mesma elegância da decoração.",
    wa: "Olá, Veri! Vi o seu site e gostaria de um orçamento de buffet para o meu casamento.",
    introTitle: "O sabor do dia mais especial",
    intro: [
      "O casamento é uma daquelas datas que ficam para sempre na memória — e a comida faz parte dela. A <strong>Veri Personal Chef</strong> monta o buffet do seu casamento em Goiânia e região a partir do estilo da festa, do horário da cerimônia e do perfil dos convidados.",
      "Da recepção com mesa de frios, ceviches servidos em taças e bruschettas ao jantar com filé mignon, risotos e peixes, cada prato é preparado com ingredientes selecionados e apresentado com cuidado. Para fechar, sobremesas finas como panna cotta, cheesecake e mousses.",
      "Seja um mini wedding em casa ou uma festa com muitos convidados, o cardápio é dimensionado para o seu evento — sem pacotes engessados.",
    ],
    checks: [
      ["Cardápio montado com os noivos", "Você escolhe os pratos a partir do catálogo da Veri."],
      ["Recepção, jantar e sobremesas", "Um buffet completo, do primeiro canapé ao doce."],
      ["Apresentação elegante", "Travessas e mesas que combinam com a decoração."],
      ["Atendimento em " + CITY, "Casamentos em casa, chácaras e espaços de eventos."],
    ],
    menuTitle: "Sugestão de cardápio para casamento",
    blocks: [
      ["Recepção", ["Mesa de frios com queijos, Parma e frutas", "Ceviche de salmão servido em taças", "Bruschetta de burrata com tomate confit", "Cestinha de massa folhada com Brie e geleia de damasco", "Terrine de pistache"]],
      ["Entradas quentes", ["Risoto de camarão com Grana Padano", "Filé mignon ao molho de gorgonzola com torradas", "Bobó de camarão", "Risoto de funghi com filé mignon"]],
      ["Jantar", ["Filé mignon ao molho de vinho tinto", "Filé de salmão ao molho de maracujá", "Arroz com amêndoas laminadas", "Purê de batata"]],
      ["Sobremesas", ["Panna cotta com frutas vermelhas", "Cheesecake de frutas vermelhas", "Mousse de limão-siciliano com chocolate branco", "Cheesecake de doce de leite"]],
    ],
    gallery: "casamento",
    faq: [
      ["A Veri faz buffet de casamento em Goiânia?", "Sim. A Veri Personal Chef atende casamentos em Goiânia e região, com cardápio personalizado para a recepção, o jantar e as sobremesas."],
      ["Posso escolher os pratos do meu casamento?", "Pode. O cardápio é montado junto com os noivos a partir das opções do catálogo da Veri — entradas, finger foods, massas, carnes, peixes, acompanhamentos e sobremesas."],
      ["A Veri atende mini weddings?", "Sim. Do mini wedding ao casamento com muitos convidados, as quantidades e o cardápio são pensados para o tamanho da sua festa."],
      ["Com quanta antecedência devo pedir o orçamento?", "Quanto antes, melhor: datas de casamento costumam ser disputadas. Assim que tiver a data e o local definidos, chame a Veri no WhatsApp."],
      ["Como é feito o orçamento?", "Pelo WhatsApp " + PHONE_FMT + ". Informe a data, o local, o número de convidados e o estilo da festa, e a Veri envia uma proposta personalizada."],
    ],
  },
  {
    slug: "festa-de-15-anos", img: "debutante", nav: "Festa de 15 anos", short: "Finger food, massas e doces em taça",
    title: "Buffet para Festa de 15 Anos em Goiânia | Veri Personal Chef",
    desc: "Buffet para festa de 15 anos em Goiânia: finger food, mini-hambúrgueres, estação de massas e risotos e sobremesas em taças. Cardápio personalizado para a debutante.",
    eyebrow: "Debutantes", h1: "Buffet para festa de 15 anos",
    lead: "Um cardápio com a cara da debutante: bonito nas fotos e gostoso para convidados de todas as idades.",
    wa: "Olá, Veri! Vi o seu site e gostaria de um orçamento de buffet para uma festa de 15 anos.",
    introTitle: "Uma festa jovem, com cardápio sofisticado",
    intro: [
      "A festa de 15 anos pede um cardápio que agrade ao mesmo tempo os amigos da debutante e a família. A <strong>Veri Personal Chef</strong> combina finger foods práticos de comer em pé com pratos quentes que sustentam a noite inteira.",
      "Mini-hambúrgueres, cestinhas e quibes circulam durante a festa; massas, risotos e strogonoff entram na hora do jantar; e as sobremesas servidas em taças e copinhos viram parte da decoração — e das fotos.",
      "Tudo é montado a partir do tema e do estilo da festa, com atendimento em " + CITY + ".",
    ],
    checks: [
      ["Finger food a noite toda", "Porções individuais, fáceis de comer na pista."],
      ["Jantar que agrada a todos", "Massas, risotos e pratos clássicos."],
      ["Doces que viram foto", "Sobremesas em taças e copinhos."],
      ["Cardápio no tema da festa", "Montado junto com a família da debutante."],
    ],
    menuTitle: "Sugestão de cardápio para 15 anos",
    blocks: [
      ["Finger food", ["Mini-hambúrguer com creme de queijo prato e cheddar", "Cestinha de carne-seca com Catupiry", "Quibe tradicional ou assado", "Mini sanduíche natural"]],
      ["Jantar", ["Penne aos quatro queijos", "Pappardelle cremoso com filé mignon e cogumelos", "Risoto de funghi com filé mignon", "Strogonoff de frango com arroz branco"]],
      ["Doces em taça", ["Mousse de maracujá com raspas de chocolate", "Sorvete com brigadeiro de Bis", "Bombom aberto de uva e morango", "Cheesecake de doce de leite"]],
    ],
    gallery: "debutante",
    faq: [
      ["O cardápio agrada jovens e adultos?", "Sim. A ideia é equilibrar finger foods que os jovens adoram, como mini-hambúrgueres, com pratos quentes que agradam a família toda."],
      ["As comidas podem ser servidas em porções individuais?", "Podem. Vários preparos do catálogo têm versões finger food, em cestinhas, barquetes, copinhos e taças."],
      ["A Veri atende festas de 15 anos em Goiânia?", "Sim, a Veri atende festas de debutante em Goiânia e região."],
      ["Como peço um orçamento?", "Chame a Veri no WhatsApp " + PHONE_FMT + " com a data, o local e o número de convidados."],
    ],
  },
  {
    slug: "aniversario-infantil", img: "infantil", nav: "Aniversário infantil", short: "Lanchinhos para as crianças e comida para os pais",
    title: "Buffet para Aniversário Infantil em Goiânia | Veri Personal Chef",
    desc: "Comida para aniversário infantil em Goiânia: mini-hambúrgueres, mini sanduíches naturais, palitinhos de legumes, frutas no copinho e pratos para os adultos.",
    eyebrow: "Festas infantis", h1: "Comida para aniversário infantil",
    lead: "Lanchinhos que as crianças amam e comida de verdade para os pais — tudo feito com o carinho da Veri.",
    wa: "Olá, Veri! Vi o seu site e gostaria de um orçamento para um aniversário infantil.",
    introTitle: "Festa de criança com comida feita com carinho",
    intro: [
      "Em aniversário infantil, a comida precisa ser prática para as crianças e gostosa para os adultos. A <strong>Veri Personal Chef</strong> prepara lanchinhos em porções pequenas, coloridas e fáceis de pegar, além de pratos quentes para os pais.",
      "Mini-hambúrgueres, mini sanduíches naturais, palitinhos de cenoura e pepino e frutas servidas no copinho fazem sucesso com a criançada. Para os adultos, escondidinhos, fricassê e strogonoff garantem que ninguém saia com fome.",
      "É só contar onde e quando será a festa: a Veri atende aniversários infantis em " + CITY + ".",
    ],
    checks: [
      ["Porções do tamanho das crianças", "Mini lanches fáceis de pegar."],
      ["Opções mais leves", "Sanduíche natural, legumes e frutas."],
      ["Comida para os pais", "Pratos quentes para os adultos."],
      ["Visual colorido", "Copinhos e travessas que alegram a mesa."],
    ],
    menuTitle: "Sugestão de cardápio para festa infantil",
    blocks: [
      ["Para as crianças", ["Mini-hambúrguer com creme de queijo", "Mini sanduíche natural", "Palitinhos de cenoura e pepino", "Frutas servidas no copinho", "Quibe assado"]],
      ["Para os adultos", ["Escondidinho de mandioca com carne-seca", "Fricassê de frango", "Strogonoff de frango", "Arroz branco e salada Tropical"]],
      ["Sobremesas", ["Sorvete com brigadeiro de Bis", "Mousse de maracujá", "Bombom aberto de uva e morango"]],
    ],
    gallery: "infantil",
    faq: [
      ["Tem opções mais saudáveis para as crianças?", "Tem. Mini sanduíches naturais, palitinhos de legumes e frutas servidas em copinhos ficam ao lado dos lanchinhos tradicionais."],
      ["Dá para ter comida para os adultos também?", "Sim. O cardápio pode incluir pratos quentes como escondidinho, fricassê e strogonoff para os pais e convidados adultos."],
      ["A Veri atende festas infantis em Goiânia?", "Sim, em Goiânia e região. Informe o local da festa ao pedir o orçamento."],
      ["Como peço um orçamento?", "Pelo WhatsApp " + PHONE_FMT + ", com a data, o local e quantas crianças e adultos serão."],
    ],
  },
  {
    slug: "personal-chef-em-casa", img: "personal-chef", nav: "Personal chef em casa", short: "Jantares especiais na sua casa",
    title: "Personal Chef em Goiânia | Jantares em Casa | Veri Personal Chef",
    desc: "Personal chef em Goiânia para jantares em casa: jantar a dois, aniversários e encontros em família com pratos como risoto de camarão, filé mignon e salmão.",
    eyebrow: "Personal chef", h1: "Personal chef em Goiânia",
    lead: "A experiência de um restaurante dentro da sua casa: jantares a dois, aniversários e encontros com quem você ama.",
    wa: "Olá, Veri! Vi o seu site e gostaria de um orçamento de personal chef para um jantar em casa.",
    introTitle: "Um jantar especial, sem sair de casa",
    intro: [
      "Contratar uma personal chef é a forma mais tranquila de receber bem: você escolhe o cardápio, e a <strong>Veri</strong> cuida do preparo e da apresentação dos pratos.",
      "É ideal para um jantar romântico, um aniversário de casamento, uma comemoração em família ou um encontro com amigos. Carpaccio, burrata, risoto de camarão, filé mignon ao molho de cogumelos e salmão ao molho de ervas são alguns dos pratos que costumam fazer sucesso.",
      "Atendimento em " + CITY + ".",
    ],
    checks: [
      ["Cardápio exclusivo", "Pensado para a sua ocasião e os seus gostos."],
      ["Pratos bem apresentados", "Clima de restaurante na sua mesa."],
      ["Do jantar a dois à família", "Para poucos ou muitos convidados."],
      ["Você só aproveita", "A Veri cuida da cozinha."],
    ],
    menuTitle: "Sugestão de jantar",
    blocks: [
      ["Entrada", ["Carpaccio de filé mignon com alcaparras, Dijon e parmesão", "Burrata com tomate confit e molho pesto", "Terrine de figo com cream cheese e gorgonzola", "Salada de Parma com figo"]],
      ["Prato principal", ["Filé mignon com cogumelos ao molho poivre e Grana Padano", "Risoto de camarão com Grana Padano", "Filé de salmão ao molho de ervas", "Nhoque ao molho branco com azeite trufado"]],
      ["Sobremesa", ["Panna cotta com frutas vermelhas", "Cheesecake de doce de leite", "Mousse de maracujá com raspas de chocolate"]],
    ],
    gallery: "personal-chef",
    faq: [
      ["O que faz uma personal chef?", "Prepara um cardápio exclusivo para a sua ocasião, cuidando do preparo e da apresentação dos pratos, para você receber seus convidados sem se preocupar com a cozinha."],
      ["Para quantas pessoas a Veri atende?", "Do jantar a dois a encontros com família e amigos. Informe o número de pessoas ao pedir o orçamento."],
      ["Posso escolher os pratos?", "Sim. O cardápio é montado com você a partir das opções do catálogo da Veri."],
      ["Como reservo uma data?", "Chame a Veri no WhatsApp " + PHONE_FMT + " com a data, o horário e o número de pessoas."],
    ],
  },
  {
    slug: "eventos-corporativos", img: "corporativo", nav: "Eventos corporativos", short: "Coquetéis, almoços e confraternizações",
    title: "Buffet para Eventos Corporativos em Goiânia | Veri Personal Chef",
    desc: "Buffet para eventos corporativos em Goiânia: coquetéis, almoços de empresa e confraternizações de fim de ano com paella, feijoada, finger food e muito mais.",
    eyebrow: "Empresas", h1: "Buffet para eventos corporativos",
    lead: "Coquetéis, almoços e confraternizações de fim de ano com um cardápio que causa boa impressão.",
    wa: "Olá, Veri! Vi o seu site e gostaria de um orçamento de buffet para um evento da minha empresa.",
    introTitle: "Comida boa para a sua empresa receber bem",
    intro: [
      "Um evento de empresa bem servido fala muito sobre quem o organiza. A <strong>Veri Personal Chef</strong> prepara cardápios para coquetéis, lançamentos, almoços com clientes e confraternizações de equipe em " + CITY + ".",
      "Para coquetéis, finger foods e bruschettas servidos em porções individuais. Para almoços e confraternizações, pratos fartos como paella de frutos do mar, feijoada completa, galinhada com pequi e costelinha ao barbecue.",
      "O cardápio é montado de acordo com o formato do evento, o horário e o número de participantes.",
    ],
    checks: [
      ["Coquetéis e finger food", "Para lançamentos, reuniões e happy hours."],
      ["Almoços e confraternizações", "Pratos fartos para a equipe toda."],
      ["Fim de ano", "Confraternizações com a cara da empresa."],
      ["Orçamento sob medida", "Pelo formato e tamanho do evento."],
    ],
    menuTitle: "Sugestões para eventos de empresa",
    blocks: [
      ["Coquetel", ["Bruschetta de Brie com geleia de damasco", "Mini-hambúrguer", "Cestinha de massa folhada com Brie", "Ceviche de tilápia com manga", "Quibe assado"]],
      ["Almoço", ["Paella de frutos do mar", "Filé à parmegiana", "Lombo suíno ao molho cítrico", "Arroz carreteiro", "Salada Caesar"]],
      ["Confraternização", ["Feijoada completa com acompanhamentos", "Galinhada com pequi", "Costelinha ao molho barbecue", "Caldo de feijão"]],
    ],
    gallery: "corporativo",
    faq: [
      ["A Veri faz confraternização de fim de ano de empresa?", "Sim. Feijoada, paella, galinhada com pequi e outros pratos fartos são ótimas opções para confraternizações de equipe."],
      ["Quais formatos de evento a Veri atende?", "Coquetéis, lançamentos, almoços com clientes, reuniões e confraternizações. O cardápio é adaptado ao formato."],
      ["Atende empresas em Goiânia?", "Sim, em Goiânia e região."],
      ["Como pedir um orçamento?", "Pelo WhatsApp " + PHONE_FMT + ", informando a data, o local, o formato e o número de participantes."],
    ],
  },
  {
    slug: "mesa-de-frios", img: "mesa-de-frios", nav: "Mesa de frios", short: "Tábuas de queijos, embutidos e frutas",
    title: "Mesa de Frios e Tábua de Queijos em Goiânia | Veri Personal Chef",
    desc: "Mesa de frios e tábuas de queijos em Goiânia: queijos, Parma, salame, frutas, patês artesanais e bruschettas para casamentos, aniversários, chás e happy hours.",
    eyebrow: "Mesas de frios", h1: "Mesa de frios e tábuas de queijos",
    lead: "Fartura, cor e sabor: tábuas montadas à mão com queijos, embutidos, frutas, patês e bruschettas.",
    wa: "Olá, Veri! Vi o seu site e gostaria de um orçamento de mesa de frios.",
    introTitle: "O centro das atenções da sua festa",
    intro: [
      "Uma mesa de frios bem montada é daquelas que ninguém esquece — e que todo mundo fotografa. A <strong>Veri Personal Chef</strong> monta tábuas e mesas fartas com queijos variados, presunto Parma, salame, frutas frescas, patês artesanais e bruschettas.",
      "Ela funciona sozinha, num chá, aniversário ou happy hour, ou como recepção de um casamento ou festa maior, combinada com outros pratos do cardápio.",
      "Atendimento em " + CITY + ".",
    ],
    checks: [
      ["Montagem artesanal", "Cada tábua é arrumada à mão."],
      ["Patês feitos pela Veri", "Frango, abacaxi, damasco, azeitona e atum."],
      ["Para qualquer ocasião", "Chás, aniversários, recepções e happy hours."],
      ["Combina com o buffet", "Pode abrir um casamento ou festa maior."],
    ],
    menuTitle: "O que pode ir na sua mesa",
    blocks: [
      ["Queijos & embutidos", ["Tábua de queijos e embutidos", "Seleção de presunto Parma, salame e peito de peru", "Queijo Brie na massa folhada", "Burrata com tomate confit e pesto"]],
      ["Patês & pastinhas", ["Patê de frango", "Patê de abacaxi", "Patê de damasco", "Patê de azeitona", "Caponata de berinjela"]],
      ["Para acompanhar", ["Bruschetta de Brie com geleia de pimenta e nozes", "Rosbife ao molho de alcaparras e Dijon", "Lagarto desfiado", "Frutas frescas"]],
    ],
    gallery: "mesa-de-frios",
    faq: [
      ["Para que tipo de evento serve a mesa de frios?", "Para chás, aniversários, happy hours, recepções de casamento e confraternizações. Ela pode ser servida sozinha ou junto com outros pratos."],
      ["Posso combinar a mesa de frios com um buffet?", "Sim. É comum usar a mesa de frios na recepção e servir pratos quentes depois."],
      ["A Veri monta mesa de frios em Goiânia?", "Sim, em Goiânia e região."],
      ["Como peço um orçamento?", "Pelo WhatsApp " + PHONE_FMT + ", com a data, o local e o número de convidados."],
    ],
  },
];

// página-guia de eventos (buffet / comida para eventos)
const HUB = {
  slug: "comida-para-eventos", img: "eventos",
  title: "Buffet e Comida para Eventos em Goiânia | Veri Personal Chef",
  desc: "Buffet e comida para eventos em Goiânia e região: casamentos, festas de 15 anos, aniversários infantis, jantares, eventos corporativos e mesas de frios. Cardápio personalizado.",
  eyebrow: "Buffet & eventos", h1: "Buffet e comida para eventos em Goiânia",
  lead: "Do jantar em casa à grande festa: a Veri monta o cardápio do seu evento com carinho, elegância e sabor.",
  wa: "Olá, Veri! Vi o seu site e gostaria de um orçamento para o meu evento.",
};

// cardápio completo (catálogo da Veri)
const MENU = [
  ["entradas", "Entradas & Aperitivos", "menu-entradas", ["Tábua de queijos e embutidos","Queijo Brie na massa folhada com frutas vermelhas ou castanhas caramelizadas","Burrata com tomate confit e molho pesto","Caponata de berinjela","Lagarto desfiado","Seleção de presunto Parma, salame e peito de peru","Patê de frango","Patê de abacaxi","Patê de damasco","Patê de azeitona","Patê de atum","Patê de frango em versões finger food, cestinha ou barquete","Terrine de figo com cream cheese e gorgonzola","Terrine de pistache","Carpaccio de filé mignon com alcaparras, Dijon e parmesão","Rosbife ao molho de alcaparras e mostarda Dijon","Julienne de cenoura e pepino","Ceviche de salmão","Ceviche de tilápia com manga","Ceviche de tilápia com maçã-verde","Vinagrete de polvo","Bruschetta de Brie com geleia de damasco","Bruschetta de Brie com geleia de pimenta e nozes","Bruschetta de burrata com tomate confit","Mini sanduíche natural","Mini-hambúrguer com creme de queijo prato e cheddar","Quibe tradicional, desconstruído ou assado","Salada de bacalhau com batata, cebola, azeitonas e azeite"]],
  ["finger-food", "Finger Food", "menu-finger", ["Creme de palmito com bacon","Bobó de camarão","Moqueca de peixe com camarão","Peixe com banana-da-terra","Bacalhau gratinado","Escondidinho de abóbora cabotiá com carne-seca","Panelinha do Cerrado","Escondidinho de mandioca com carne-seca","Fricassê de frango","Fricassê de carne moída ou carne-seca","Chica Doida","Filé mignon ao molho de gorgonzola com torradas","Risoto de camarão com Grana Padano","Risoto de funghi com filé mignon","Risoto de costela bovina","Risoto de polvo","Risoto de filé mignon com parmesão","Cestinha de massa folhada com Brie e geleia de damasco","Cestinha de carne-seca com Catupiry","Camarão com Catupiry"]],
  ["massas", "Massas", "menu-massas", ["Rondelli","Penne aos quatro queijos","Conchiglione recheado com frango ao molho branco","Conchiglione recheado com ricota ao molho vermelho","Massa concha ao molho do chef","Lasanha","Fettuccine com filé mignon","Fettuccine com camarão ao molho pesto","Nhoque ao molho branco com azeite trufado","Nhoque ao molho vermelho","Pappardelle cremoso com filé mignon e cogumelos"]],
  ["saladas", "Saladas", "menu-saladas", ["Salada Caprese","Mix de folhas","Salada de salmão com massa gravatinha","Salada de Parma com figo","Salada de rúcula, morango e queijo gorgonzola","Salada Caesar","Salada Tropical"]],
  ["carnes", "Carnes", "menu-carnes", ["Filé mignon ao molho de vinho tinto","Filé mignon ao molho quatro queijos","Filé mignon ao molho de mostarda Dijon e gorgonzola","Filé mignon com mix de cogumelos ao molho Alfredo ou poivre e Grana Padano","Filé à parmegiana","Strogonoff de filé mignon","Filé mignon ao molho madeira","Fraldinha assada","Lagarto na cerveja preta","Lombo suíno ao molho cítrico","Lombo suíno ao molho de abacaxi","Pernil na cerveja preta","Costelinha ao molho barbecue","Carré","Feijoada completa com acompanhamentos"]],
  ["aves", "Aves", "menu-aves", ["Filé de frango","Fricassê de frango","Frango cremoso com cream cheese","Frango xadrez","Strogonoff de frango","Frango assado com batatas","Galinhada com pequi"]],
  ["peixes", "Peixes & Frutos do Mar", "menu-peixes", ["Paella de frutos do mar","Camarão na moranga","Carne-seca com requeijão na moranga","Moqueca de peixe","Filé de salmão ao molho de maracujá","Filé de salmão com legumes","Filé de salmão ao molho de ervas","Filé de merluza com farofa e purê de banana-da-terra","Bacalhau com nata","Camarão com Catupiry"]],
  ["acompanhamentos", "Acompanhamentos", "menu-acomp", ["Arroz branco","Arroz com rúcula e tomate seco","Arroz com brócolis e bacon","Arroz Biro-Biro","Arroz com amêndoas laminadas","Arroz carreteiro","Caldo de feijão","Tutu de feijão","Feijão tropeiro","Vinagrete de feijão-verde","Purê de batata","Creme de milho"]],
  ["sobremesas", "Sobremesas", "menu-sobremesas", ["Mousse de maracujá com raspas de chocolate","Mousse de limão-siciliano com raspas de chocolate branco","Panna cotta com frutas vermelhas","Cheesecake de doce de leite","Cheesecake de frutas vermelhas","Sorvete com brigadeiro de Bis","Mousse de limão com abacaxi","Bombom aberto de uva e morango"]],
];

// ---------------------------------------------------------------- partes comuns
const esc = s => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const strip = s => s.replace(/<[^>]+>/g, "");

function nav() {
  return `<nav class="nav" id="nav">
  <div class="wrap">
    <a href="/" class="brand"><b>Veri</b><small>Personal Chef</small></a>
    <ul id="navlinks">
      <li><a href="/#sobre">A Chef</a></li>
      <li class="dd"><a href="/comida-para-eventos">Eventos</a>
        <ul class="sub">
${SERVICES.map(s => `          <li><a href="/${s.slug}">${s.nav}</a></li>`).join("\n")}
        </ul>
      </li>
      <li><a href="/cardapio">Cardápio</a></li>
      <li><a href="/#galeria">Galeria</a></li>
      <li><a href="#contato">Contato</a></li>
    </ul>
    <a class="btn btn-primary wa-link" href="https://wa.me/5562985933737" target="_blank" rel="noopener">Orçamento</a>
    <button class="menu-toggle" id="menuToggle" aria-label="Abrir menu">
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M3 7h18M3 12h18M3 17h18"/></svg>
    </button>
  </div>
</nav>`;
}

function footer() {
  return `<footer>
  <div class="wrap">
    <div class="foot-links">
      <div>
        <a href="/" class="brand"><b>Veri</b><small>Personal Chef</small></a>
        <p style="margin-top:14px;max-width:320px">Gastronomia feita com carinho, elegância e sabor. Buffet e personal chef em ${CITY}.</p>
      </div>
      <div>
        <h4>Eventos</h4>
        <ul>
          <li><a href="/comida-para-eventos">Buffet e comida para eventos</a></li>
${SERVICES.map(s => `          <li><a href="/${s.slug}">${s.nav}</a></li>`).join("\n")}
        </ul>
      </div>
      <div>
        <h4>Contato</h4>
        <ul>
          <li><a class="wa-link" href="https://wa.me/5562985933737" target="_blank" rel="noopener">WhatsApp</a></li>
          <li><a href="${INSTA}" target="_blank" rel="noopener">Instagram ${INSTA_HANDLE}</a></li>
          <li><a href="tel:+5562985933737">${PHONE_FMT}</a></li>
          <li><a href="/cardapio">Cardápio completo</a></li>
        </ul>
      </div>
    </div>
    <div class="base">
      <span>© <span data-year>2026</span> Veri Personal Chef</span>
      <span>Atendimento em ${CITY}</span>
    </div>
  </div>
</footer>`;
}

function cta(text) {
  return `<section class="cta" id="contato">
  <div class="wrap">
    <span class="eyebrow">Orçamentos e reservas</span>
    <h2>${text || "Vamos criar juntos o cardápio do seu evento?"}</h2>
    <p>Conte para a Veri o que você está planejando. Ela responde pessoalmente e monta uma proposta sob medida.</p>
    <a class="btn btn-primary wa-link" href="https://wa.me/5562985933737" target="_blank" rel="noopener" style="background:#25d366;color:#10361f">${WA_ICON} Chamar no WhatsApp</a>
    <a class="btn btn-insta" href="${INSTA}" target="_blank" rel="noopener">${INSTA_ICON} Siga no Instagram</a>
    <a class="phone" href="tel:+5562985933737">${PHONE_FMT}</a>
  </div>
</section>`;
}

const tail = `<a class="wa-float wa-link" href="https://wa.me/5562985933737" target="_blank" rel="noopener" aria-label="Falar no WhatsApp">${WA_ICON}</a>

<div class="lightbox" id="lightbox" aria-hidden="true">
  <button class="lb-btn lb-close" aria-label="Fechar">✕</button>
  <button class="lb-btn lb-prev" aria-label="Anterior">‹</button>
  <img alt="">
  <button class="lb-btn lb-next" aria-label="Próxima">›</button>
</div>

<script src="/js/site.js" defer></script>`;

function head({ title, desc, url, image, jsonld }) {
  return `<!doctype html>
<html lang="pt-BR">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)}</title>
<meta name="description" content="${esc(desc)}">
<link rel="canonical" href="${url}">
<meta name="theme-color" content="#2b2420">
<meta property="og:type" content="website">
<meta property="og:locale" content="pt_BR">
<meta property="og:site_name" content="Veri Personal Chef">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(desc)}">
<meta property="og:url" content="${url}">
<meta property="og:image" content="${image || SITE + "/img/og.jpg"}">
<meta name="twitter:card" content="summary_large_image">
<link rel="icon" href="/favicon.ico" sizes="48x48">
<link rel="icon" href="/favicon.svg" type="image/svg+xml">
<link rel="icon" href="/favicon-192.png" type="image/png" sizes="192x192">
<link rel="apple-touch-icon" href="/apple-touch-icon.png">
<meta name="robots" content="max-image-preview:large">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,500;0,600;1,500&family=Jost:wght@300;400;500&display=swap" rel="stylesheet">
<link rel="stylesheet" href="/css/style.css">
${(jsonld || []).map(j => `<script type="application/ld+json">${JSON.stringify(j)}</script>`).join("\n")}
</head>`;
}

const BUSINESS = {
  "@type": "FoodEstablishment",
  "@id": SITE + "/#negocio",
  name: "Veri Personal Chef",
  url: SITE + "/",
  image: SITE + "/img/og.jpg",
  telephone: "+55-62-98593-3737",
  sameAs: [INSTA],
  servesCuisine: ["Brasileira", "Goiana", "Contemporânea"],
  areaServed: { "@type": "City", name: "Goiânia" },
  address: { "@type": "PostalAddress", addressLocality: "Goiânia", addressRegion: "GO", addressCountry: "BR" },
  description: "Personal chef e buffet para casamentos, festas de 15 anos, aniversários infantis, jantares e eventos corporativos em Goiânia e região.",
};

const crumbsLd = items => ({
  "@context": "https://schema.org", "@type": "BreadcrumbList",
  itemListElement: items.map(([name, url], i) => ({ "@type": "ListItem", position: i + 1, name, item: url })),
});

const img = (name, alt, extra = "") => {
  const d = DIMS[name];
  return `<img src="/img/p/${name}.webp" width="${d[0]}" height="${d[1]}" alt="${esc(alt)}" ${extra}>`;
};

function gallery(key, alt) {
  const names = Object.keys(DIMS).filter(n => n.startsWith(key + "-") && n !== key + "-1" && /-\d+$/.test(n.slice(key.length)));
  return `<div class="pgallery">
${names.map(n => `  <button data-full="/img/p/${n}.webp" aria-label="Ampliar foto">${img(n, alt, 'loading="lazy" decoding="async"')}</button>`).join("\n")}
</div>`;
}

const steps = `<div class="steps">
      <div class="step reveal"><h4>Conversa inicial</h4><p>Você conta pelo WhatsApp a data, o local e o número de convidados.</p></div>
      <div class="step reveal"><h4>Monte seu cardápio</h4><p>Escolha os pratos com a orientação da Veri.</p></div>
      <div class="step reveal"><h4>Orçamento personalizado</h4><p>Uma proposta feita sob medida, sem pacotes engessados.</p></div>
      <div class="step reveal"><h4>O grande dia</h4><p>A Veri prepara e apresenta tudo com capricho.</p></div>
    </div>`;

function related(except) {
  return `<div class="related">
${SERVICES.filter(s => s.slug !== except).map(s => `  <a class="rel reveal" href="/${s.slug}">${img(s.img + "-1", s.nav, 'loading="lazy" decoding="async"')}<div><b>${s.nav}</b><span>${s.short}</span></div></a>`).join("\n")}
</div>`;
}

function page(p, body, jsonld) {
  const url = p.slug ? `${SITE}/${p.slug}` : SITE + "/";
  return `${head({ title: p.title, desc: p.desc, url, image: p.ogImage, jsonld })}
<body data-wa="${esc(p.wa || "")}">

${nav()}

${body}

${footer()}

${tail}
</body>
</html>
`;
}

function hero(p, crumbName) {
  return `<header class="page-hero">
  <div class="wrap">
    <div>
      <p class="crumbs"><a href="/">Início</a><span>/</span>${crumbName !== p.h1 && p.slug !== HUB.slug ? `<a href="/comida-para-eventos">Eventos</a><span>/</span>` : ""}${esc(crumbName)}</p>
      <span class="eyebrow">${p.eyebrow}</span>
      <h1>${p.h1}</h1>
      <p class="lead">${p.lead}</p>
      <div class="actions">
        <a class="btn btn-primary wa-link" href="https://wa.me/5562985933737" target="_blank" rel="noopener">${WA_ICON} Pedir orçamento</a>
        <a class="btn btn-ghost" href="#cardapio-sugestao">Ver sugestão de cardápio</a>
      </div>
    </div>
    <figure>${img(p.img + "-1", p.h1, 'fetchpriority="high" decoding="async"')}</figure>
  </div>
</header>`;
}

// ---------------------------------------------------------------- páginas de serviço
function servicePage(s) {
  const url = `${SITE}/${s.slug}`;
  const jsonld = [
    { "@context": "https://schema.org", ...BUSINESS },
    { "@context": "https://schema.org", "@type": "Service", name: s.h1, serviceType: s.nav, description: s.desc, url,
      provider: { "@id": SITE + "/#negocio" }, areaServed: { "@type": "City", name: "Goiânia" } },
    crumbsLd([["Início", SITE + "/"], ["Eventos", SITE + "/comida-para-eventos"], [s.nav, url]]),
    { "@context": "https://schema.org", "@type": "FAQPage",
      mainEntity: s.faq.map(([q, a]) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })) },
  ];
  s.ogImage = `${SITE}/img/p/${s.img}-1.webp`;
  const body = `${hero(s, s.nav)}

<main>
<section class="section">
  <div class="wrap intro">
    <div class="prose reveal">
      <span class="eyebrow">${s.eyebrow}</span>
      <h2>${s.introTitle}</h2>
${s.intro.map(t => `      <p>${t}</p>`).join("\n")}
    </div>
    <ul class="checks reveal">
${s.checks.map(([b, t]) => `      <li><b>${b}</b><span>${t}</span></li>`).join("\n")}
    </ul>
  </div>
</section>

<section class="section alt" id="cardapio-sugestao">
  <div class="wrap">
    <div class="section-head reveal">
      <span class="eyebrow">Cardápio</span>
      <h2>${s.menuTitle}</h2>
      <p>Uma sugestão para começar. Tudo pode ser trocado — o cardápio final é montado com você.</p>
    </div>
    <div class="blocks">
${s.blocks.map(([h, items]) => `      <div class="block reveal"><h3>${h}</h3><ul>${items.map(i => `<li>${i}</li>`).join("")}</ul></div>`).join("\n")}
    </div>
    <p class="blocks-note">Veja todas as opções no <a href="/cardapio">cardápio completo da Veri</a>.</p>
  </div>
</section>

<section class="section">
  <div class="wrap">
    <div class="section-head reveal">
      <span class="eyebrow">Galeria</span>
      <h2>Feito pela Veri</h2>
    </div>
    ${gallery(s.gallery, s.nav + " — Veri Personal Chef")}
  </div>
</section>

<section class="section alt">
  <div class="wrap">
    <div class="section-head reveal"><span class="eyebrow">Como funciona</span><h2>Do primeiro contato ao último prato</h2></div>
    ${steps}
  </div>
</section>

<section class="section">
  <div class="wrap">
    <div class="section-head reveal"><span class="eyebrow">Dúvidas frequentes</span><h2>Perguntas sobre ${s.nav.toLowerCase()}</h2></div>
    <div class="faq">
${s.faq.map(([q, a], i) => `      <details${i === 0 ? " open" : ""}><summary>${q}</summary><p>${a}</p></details>`).join("\n")}
    </div>
  </div>
</section>

${instaBand()}

<section class="section alt">
  <div class="wrap">
    <div class="section-head reveal"><span class="eyebrow">Outros eventos</span><h2>A Veri também faz</h2></div>
    ${related(s.slug)}
  </div>
</section>

${cta()}
</main>`;
  return page(s, body, jsonld);
}

// ---------------------------------------------------------------- página-guia
function hubPage() {
  const url = `${SITE}/${HUB.slug}`;
  const faq = [
    ["A Veri faz buffet para eventos em Goiânia?", "Sim. A Veri Personal Chef atende casamentos, festas de 15 anos, aniversários infantis, jantares em casa, eventos corporativos e confraternizações em Goiânia e região."],
    ["Quais estilos de serviço são possíveis?", "Finger food em porções individuais, buffet com pratos quentes, mesas de frios e pratos típicos como feijoada, galinhada com pequi e paella. Dá para combinar mais de um estilo no mesmo evento."],
    ["O cardápio é personalizado?", "Sempre. Você escolhe os pratos a partir do catálogo da Veri, com a orientação dela, e recebe um orçamento feito para o seu evento."],
    ["Como pedir um orçamento?", "Pelo WhatsApp " + PHONE_FMT + ", informando o tipo de evento, a data, o local e o número de convidados."],
  ];
  const jsonld = [
    { "@context": "https://schema.org", ...BUSINESS },
    crumbsLd([["Início", SITE + "/"], ["Buffet e comida para eventos", url]]),
    { "@context": "https://schema.org", "@type": "FAQPage",
      mainEntity: faq.map(([q, a]) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })) },
  ];
  HUB.ogImage = `${SITE}/img/p/eventos-1.webp`;
  const styles = [
    ["Finger food", "Porções individuais servidas em copinhos, taças, cestinhas e barquetes: risotos, escondidinhos, bobó de camarão, ceviches e mini-hambúrgueres."],
    ["Buffet de pratos quentes", "Massas, risotos, filé mignon aos molhos da casa, salmão, frango e acompanhamentos servidos em réchauds."],
    ["Mesas de frios", "Tábuas de queijos, embutidos, frutas, patês e bruschettas para recepções, chás e happy hours."],
    ["Sabores de Goiás e do Brasil", "Galinhada com pequi, Panelinha do Cerrado, Chica Doida, feijoada completa, moqueca e paella para almoços e confraternizações."],
  ];
  const body = `${hero(HUB, "Buffet e comida para eventos")}

<main>
<section class="section">
  <div class="wrap intro">
    <div class="prose reveal">
      <span class="eyebrow">Veri Personal Chef</span>
      <h2>Comida de verdade para o seu evento</h2>
      <p>A <strong>Veri Personal Chef</strong> prepara buffet e comida para eventos em ${CITY}. São mais de 110 preparos no catálogo — de entradas e finger foods a pratos principais, acompanhamentos e sobremesas — para você montar um cardápio com a cara da sua festa.</p>
      <p>Na cozinha da Veri, clássicos como risotos, carpaccio, ceviches e filé mignon encontram o sabor afetivo do Cerrado, com galinhada com pequi e Panelinha do Cerrado. Tudo feito com ingredientes selecionados e apresentação cuidadosa.</p>
      <p>Escolha abaixo o tipo de evento para ver sugestões de cardápio, fotos e respostas para as dúvidas mais comuns.</p>
    </div>
    <ul class="checks reveal">
      <li><b>+110 preparos no catálogo</b><span>Entradas, massas, carnes, peixes e sobremesas.</span></li>
      <li><b>Cardápio 100% personalizado</b><span>Montado junto com você.</span></li>
      <li><b>Do íntimo ao grande evento</b><span>Jantares a dois e festas com muitos convidados.</span></li>
      <li><b>Atendimento em ${CITY}</b><span>Orçamento direto pelo WhatsApp.</span></li>
    </ul>
  </div>
</section>

<section class="section events">
  <div class="wrap">
    <div class="section-head reveal"><span class="eyebrow">Tipos de evento</span><h2>Para cada celebração, um cardápio</h2></div>
    <div class="event-grid">
${SERVICES.map(s => `      <a class="event reveal" href="/${s.slug}">
        <div class="ph">${img(s.img + "-1", s.nav, 'loading="lazy" decoding="async"')}</div>
        <div class="body"><h3>${s.nav}</h3><p>${s.short}.</p><span class="more">Ver detalhes</span></div>
      </a>`).join("\n")}
      <a class="event reveal" href="/cardapio">
        <div class="ph"><img src="/img/menu-carnes.webp" alt="Cardápio completo" loading="lazy" decoding="async"></div>
        <div class="body"><h3>Cardápio completo</h3><p>Todas as opções do catálogo da Veri.</p><span class="more">Ver cardápio</span></div>
      </a>
    </div>
  </div>
</section>

<section class="section" id="cardapio-sugestao">
  <div class="wrap">
    <div class="section-head reveal"><span class="eyebrow">Estilos de serviço</span><h2>Como a comida pode ser servida</h2></div>
    <div class="blocks">
${styles.map(([h, t]) => `      <div class="block reveal" style="background:var(--paper)"><h3>${h}</h3><p style="color:var(--muted);font-size:.95rem">${t}</p></div>`).join("\n")}
    </div>
  </div>
</section>

<section class="section alt">
  <div class="wrap">
    <div class="section-head reveal"><span class="eyebrow">Galeria</span><h2>Eventos da Veri</h2></div>
    ${gallery("eventos", "Comida para eventos — Veri Personal Chef")}
  </div>
</section>

<section class="section">
  <div class="wrap">
    <div class="section-head reveal"><span class="eyebrow">Dúvidas frequentes</span><h2>Perguntas sobre buffet para eventos</h2></div>
    <div class="faq">
${faq.map(([q, a], i) => `      <details${i === 0 ? " open" : ""}><summary>${q}</summary><p>${a}</p></details>`).join("\n")}
    </div>
  </div>
</section>

${cta()}
</main>`;
  return page(HUB, body, jsonld);
}

// ---------------------------------------------------------------- cardápio
function menuPage() {
  const p = {
    slug: "cardapio",
    title: "Cardápio | Veri Personal Chef — Buffet e Personal Chef em Goiânia",
    desc: "Cardápio completo da Veri Personal Chef: entradas, finger food, massas, saladas, carnes, aves, peixes, acompanhamentos e sobremesas para eventos em Goiânia.",
    wa: "Olá, Veri! Vi o cardápio no seu site e gostaria de montar um orçamento.",
  };
  const url = SITE + "/cardapio";
  const jsonld = [
    { "@context": "https://schema.org", ...BUSINESS, hasMenu: url },
    { "@context": "https://schema.org", "@type": "Menu", name: "Cardápio Veri Personal Chef", url,
      hasMenuSection: MENU.map(([, t, , items]) => ({ "@type": "MenuSection", name: t, hasMenuItem: items.map(n => ({ "@type": "MenuItem", name: n })) })) },
    crumbsLd([["Início", SITE + "/"], ["Cardápio", url]]),
  ];
  const body = `<header class="page-hero" style="padding-bottom:70px">
  <div class="wrap" style="grid-template-columns:1fr">
    <div>
      <p class="crumbs"><a href="/">Início</a><span>/</span>Cardápio</p>
      <span class="eyebrow">Cardápio</span>
      <h1>Cardápio da Veri Personal Chef</h1>
      <p class="lead">Mais de 110 preparos para montar o cardápio do seu evento. Combine à vontade — cada orçamento é feito sob medida.</p>
      <nav class="toc" aria-label="Categorias">${MENU.map(([id, t]) => `<a href="#${id}">${t}</a>`).join("")}</nav>
    </div>
  </div>
</header>

<main>
<section class="menu-page">
  <div class="wrap">
${MENU.map(([id, t, im, items]) => `    <div class="cat" id="${id}">
      <img src="/img/${im}.webp" alt="${esc(t)} — Veri Personal Chef" loading="lazy" decoding="async">
      <div class="reveal">
        <h2>${t}</h2>
        <ul>${items.map(i => `<li>${i}</li>`).join("")}</ul>
      </div>
    </div>`).join("\n")}
  </div>
</section>

<section class="section alt">
  <div class="wrap">
    <div class="section-head reveal"><span class="eyebrow">Ideias de cardápio por evento</span><h2>Precisa de inspiração?</h2></div>
    ${related("")}
  </div>
</section>

${cta("Montou o seu cardápio? Peça o orçamento")}
</main>`;
  return page(p, body, jsonld);
}

function notFound() {
  const p = { slug: "404", title: "Página não encontrada | Veri Personal Chef", desc: "Página não encontrada." };
  let html = page(p, `<main class="notfound page-hero"><div class="wrap" style="grid-template-columns:1fr;justify-items:center">
  <div><span class="eyebrow">Erro 404</span><h1>Esta página saiu do forno</h1>
  <p class="lead" style="margin:0 auto 34px">Não encontramos o que você procurava. Que tal voltar para o início ou ver o cardápio?</p>
  <div class="actions" style="justify-content:center"><a class="btn btn-primary" href="/">Voltar ao início</a><a class="btn btn-ghost" href="/cardapio">Ver cardápio</a></div></div>
</div></main>`, []);
  return html.replace(/<link rel="canonical"[^>]*>\n/, "")
    .replace('<meta name="robots" content="max-image-preview:large">', '<meta name="robots" content="noindex">');
}

function instaBand() {
  return `<section class="insta-band">
  <div class="wrap">
    <div class="insta-ic">${INSTA_ICON}</div>
    <div>
      <span class="eyebrow">Nos siga no Instagram</span>
      <h2>Bastidores, pratos e eventos da Veri</h2>
      <p>Acompanhe as novidades, veja os eventos mais recentes e se inspire para a sua festa em <strong>${INSTA_HANDLE}</strong>.</p>
    </div>
    <a class="btn btn-insta" href="${INSTA}" target="_blank" rel="noopener">${INSTA_ICON} Seguir ${INSTA_HANDLE}</a>
  </div>
</section>`;
}

// ---------------------------------------------------------------- saída
// versão dos arquivos CSS/JS: muda quando o conteúdo muda, forçando o navegador a baixar de novo
const ASSET_V = require("crypto").createHash("md5")
  .update(fs.readFileSync(path.join(OUT, "css/style.css"))).update(fs.readFileSync(path.join(OUT, "js/site.js")))
  .digest("hex").slice(0, 8);
const versionAssets = html => html
  .replace(/\/css\/style\.css(\?v=\w+)?/g, "/css/style.css?v=" + ASSET_V)
  .replace(/\/js\/site\.js(\?v=\w+)?/g, "/js/site.js?v=" + ASSET_V);

const write = (file, content) => { fs.writeFileSync(path.join(OUT, file), file.endsWith(".html") ? versionAssets(content) : content); console.log("  ", file); };

for (const s of SERVICES) write(`${s.slug}.html`, servicePage(s));
write(`${HUB.slug}.html`, hubPage());
write("cardapio.html", menuPage());
write("404.html", notFound());

// home: atualiza menu e rodapé entre os marcadores
const homeFile = path.join(OUT, "index.html");
let home = fs.readFileSync(homeFile, "utf8");
home = home.replace(/<!--NAV-->[\s\S]*?<!--\/NAV-->/, `<!--NAV-->\n${nav().replace('<a href="#contato">', '<a href="/#contato">')}\n<!--/NAV-->`)
           .replace(/<!--FOOTER-->[\s\S]*?<!--\/FOOTER-->/, `<!--FOOTER-->\n${footer()}\n<!--/FOOTER-->`)
           .replace(/<!--INSTA-->[\s\S]*?<!--\/INSTA-->/, `<!--INSTA-->\n${instaBand()}\n<!--/INSTA-->`)
           .replace(/<!--CTA-->[\s\S]*?<!--\/CTA-->/, `<!--CTA-->\n${cta()}\n<!--/CTA-->`);
fs.writeFileSync(homeFile, versionAssets(home)); console.log("   index.html (menu e rodapé)");

const today = new Date().toISOString().slice(0, 10);
const urls = ["", HUB.slug, ...SERVICES.map(s => s.slug), "cardapio"];
write("sitemap.xml", `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(u => `  <url><loc>${SITE}/${u}</loc><lastmod>${today}</lastmod><priority>${u === "" ? "1.0" : "0.8"}</priority></url>`).join("\n")}
</urlset>
`);
write("robots.txt", `User-agent: *\nAllow: /\n\nSitemap: ${SITE}/sitemap.xml\n`);
