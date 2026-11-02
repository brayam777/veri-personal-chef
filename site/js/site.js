// Comportamentos compartilhados por todas as páginas
(() => {
  const PHONE = "5562985933737";
  const msg = document.body.dataset.wa || "Olá, Veri! Vi o seu site e gostaria de um orçamento para o meu evento.";
  const WA = `https://wa.me/${PHONE}?text=${encodeURIComponent(msg)}`;
  document.querySelectorAll(".wa-link").forEach(a => a.href = WA);
  document.querySelectorAll("[data-year]").forEach(el => el.textContent = new Date().getFullYear());

  // navegação
  const nav = document.getElementById("nav");
  const links = document.getElementById("navlinks");
  const onScroll = () => nav.classList.toggle("solid", scrollY > 60 || links.classList.contains("open"));
  addEventListener("scroll", onScroll, {passive:true}); onScroll();
  document.getElementById("menuToggle").onclick = () => { links.classList.toggle("open"); onScroll(); };
  links.querySelectorAll("a").forEach(a => a.addEventListener("click", () => { links.classList.remove("open"); onScroll(); }));

  // animação de entrada
  const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }), {threshold:.12});
  document.querySelectorAll(".reveal").forEach(el => io.observe(el));

  // galeria ampliada: qualquer elemento com data-full abre no lightbox
  const lb = document.getElementById("lightbox");
  if (!lb) return;
  const lbImg = lb.querySelector("img");
  let items = [], cur = 0;
  const show = i => { cur = (i + items.length) % items.length; lbImg.src = items[cur].dataset.full; lbImg.alt = items[cur].querySelector("img")?.alt || ""; };
  const close = () => { lb.classList.remove("open"); lb.setAttribute("aria-hidden", "true"); };
  document.addEventListener("click", e => {
    const t = e.target.closest("[data-full]");
    if (!t) return;
    items = [...document.querySelectorAll("[data-full]")];
    show(items.indexOf(t)); lb.classList.add("open"); lb.setAttribute("aria-hidden", "false");
  });
  lb.querySelector(".lb-close").onclick = close;
  lb.querySelector(".lb-prev").onclick = e => { e.stopPropagation(); show(cur - 1); };
  lb.querySelector(".lb-next").onclick = e => { e.stopPropagation(); show(cur + 1); };
  lb.onclick = e => { if (e.target === lb) close(); };
  addEventListener("keydown", e => {
    if (!lb.classList.contains("open")) return;
    if (e.key === "Escape") close();
    if (e.key === "ArrowLeft") show(cur - 1);
    if (e.key === "ArrowRight") show(cur + 1);
  });
})();
