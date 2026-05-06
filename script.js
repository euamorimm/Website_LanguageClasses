gsap.registerPlugin(ScrollTrigger);


/* ════════════════════════════════════════
   NAVBAR — Hambúrguer
   ════════════════════════════════════════ */
const ham = document.getElementById('ham');
const mob = document.getElementById('mob');

ham.addEventListener('click', () => {
  ham.classList.toggle('open');
  mob.classList.toggle('open');
});

// Fecha o menu ao clicar em qualquer link do menu mobile
document.querySelectorAll('.ml').forEach(link => {
  link.addEventListener('click', () => {
    ham.classList.remove('open');
    mob.classList.remove('open');
  });
});


/* ════════════════════════════════════════
   ESTRELAS DE AVALIAÇÃO
   ════════════════════════════════════════ */
let rating = 0;
const stars = document.querySelectorAll('.star');

stars.forEach(star => {
  // Hover: ilumina até a estrela hovered
  star.addEventListener('mouseover', () => {
    const val = +star.dataset.v;
    stars.forEach(s => s.classList.toggle('on', +s.dataset.v <= val));
  });

  // Mouse sai: volta para o rating selecionado
  star.addEventListener('mouseleave', () => {
    stars.forEach(s => s.classList.toggle('on', +s.dataset.v <= rating));
  });

  // Click: fixa o rating
  star.addEventListener('click', () => {
    rating = +star.dataset.v;
    stars.forEach(s => s.classList.toggle('on', +s.dataset.v <= rating));
  });
});


/* ════════════════════════════════════════
   FORMULÁRIO — Envio com animação
   ════════════════════════════════════════ */
document.getElementById('fform').addEventListener('submit', (e) => {
  e.preventDefault();

  const form    = document.getElementById('fform');
  const success = document.getElementById('fsuc');

  gsap.to(form, {
    opacity: 0,
    y: -10,
    duration: .4,
    onComplete: () => {
      form.style.display = 'none';
      success.classList.add('show');
      gsap.from(success, { opacity: 0, y: 14, duration: .6 });
    }
  });
});


/* ════════════════════════════════════════
   CARROSSEL DE DEPOIMENTOS
   Avança automaticamente a cada 10 segundos
   ════════════════════════════════════════ */
const track  = document.getElementById('ct');
const dotsEl = document.getElementById('dots');
const slides = document.querySelectorAll('.test-slide');

let current = 0;
let autoTimer;

// Gera os dots dinamicamente
slides.forEach((_, i) => {
  const dot = document.createElement('div');
  dot.className = 'dot' + (i === 0 ? ' on' : '');
  dot.addEventListener('click', () => goTo(i));
  dotsEl.appendChild(dot);
});

function goTo(index) {
  clearTimeout(autoTimer);
  current = index;

  gsap.to(track, {
    x: `-${current * 100}%`,
    duration: .9,
    ease: 'power3.inOut'
  });

  document.querySelectorAll('.dot').forEach((d, i) => {
    d.classList.toggle('on', i === current);
  });

  autoTimer = setTimeout(() => goTo((current + 1) % slides.length), 10000);
}

// Inicia o timer
autoTimer = setTimeout(() => goTo(1), 10000);


/* ════════════════════════════════════════
   GSAP ANIMATIONS — ScrollTrigger
   ════════════════════════════════════════ */

/* Hero: animação de entrada (sem scroll) */
const heroTL = gsap.timeline({ defaults: { ease: 'power3.out' } });

heroTL
  .from('.eyebrow',    { opacity: 0, y: 18, duration: .8, delay: .15 })
  .from('.hero h1',   { opacity: 0, y: 28, duration: 1  }, '-=.4')
  .from('.hero-p',    { opacity: 0, y: 18, duration: .8 }, '-=.5')
  .from('.hero-btns', { opacity: 0, y: 14, duration: .7 }, '-=.4')
  .from('.badge',     { opacity: 0, x: -18, stagger: .14, duration: .7 }, '-=.3')
  .from('.hero-deco', { opacity: 0, scale: .8, duration: 1, ease: 'power2.out' }, 0);

/* Reasons: aparecem ao entrar na viewport */
gsap.from('.reason', {
  scrollTrigger: { trigger: '.reasons', start: 'top 82%' },
  opacity: 0,
  y: 36,
  stagger: .1,
  duration: .85,
  ease: 'power3.out'
});

/* About: imagem da esquerda, texto da direita */
gsap.from('.about-img-wrap', {
  scrollTrigger: { trigger: '.about', start: 'top 78%' },
  opacity: 0,
  x: -44,
  duration: 1,
  ease: 'power3.out'
});

gsap.from('.about-content > *', {
  scrollTrigger: { trigger: '.about', start: 'top 78%' },
  opacity: 0,
  x: 36,
  stagger: .09,
  duration: .85,
  ease: 'power3.out'
});

/* Contador animado das estatísticas */
ScrollTrigger.create({
  trigger: '.stats-row',
  start: 'top 86%',
  once: true,
  onEnter: () => {
    const counters = [
      { el: document.getElementById('s1'), end: 8,   suffix: '+' },
      { el: document.getElementById('s2'), end: 340, suffix: ''  },
      { el: document.getElementById('s3'), end: 3,   suffix: ''  },
    ];

    counters.forEach(({ el, end, suffix }) => {
      gsap.fromTo(
        { val: 0 },
        { val: end },
        {
          duration: 1.8,
          ease: 'power2.out',
          onUpdate: function () {
            el.textContent = Math.round(this.targets()[0].val) + suffix;
          }
        }
      );
    });
  }
});

/* Packages: cards sobem ao entrar */
gsap.from([
  document.getElementById('p1'),
  document.getElementById('p2'),
  document.getElementById('p3')
], {
  scrollTrigger: { trigger: '.pkgs', start: 'top 82%' },
  opacity: 0,
  y: 44,
  stagger: .13,
  duration: .9,
  ease: 'power3.out'
});

/* Feedback: info da esquerda, form da direita */
gsap.from('.fb-info > *', {
  scrollTrigger: { trigger: '.feedback', start: 'top 82%' },
  opacity: 0,
  x: -28,
  stagger: .09,
  duration: .8,
  ease: 'power3.out'
});

gsap.from('.fb-form-wrap', {
  scrollTrigger: { trigger: '.feedback', start: 'top 82%' },
  opacity: 0,
  x: 28,
  duration: .9,
  ease: 'power3.out'
});

/* Footer / Depoimentos */
gsap.from('.test-hdr > *', {
  scrollTrigger: { trigger: '#test', start: 'top 85%' },
  opacity: 0,
  y: 22,
  stagger: .1,
  duration: .8,
  ease: 'power3.out'
});