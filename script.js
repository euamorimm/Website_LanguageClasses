/* ════════════════════════════════════════
   script.js — Languages: English & Spanish
   Requires: GSAP 3 + ScrollTrigger
   (loaded via CDN in index.html)
   ════════════════════════════════════════ */

gsap.registerPlugin(ScrollTrigger);


/* ════════════════════════════════════════
   NAVBAR — Hamburger toggle
   ════════════════════════════════════════ */
const ham = document.getElementById('ham');
const mob = document.getElementById('mob');

ham.addEventListener('click', () => {
  ham.classList.toggle('open');
  mob.classList.toggle('open');
});

// Close mobile menu when any link is clicked
document.querySelectorAll('.ml').forEach(link => {
  link.addEventListener('click', () => {
    ham.classList.remove('open');
    mob.classList.remove('open');
  });
});

// Shrink nav on scroll
window.addEventListener('scroll', () => {
  const nav = document.getElementById('nav');
  if (window.scrollY > 60) {
    nav.style.height = '50px';
    nav.style.boxShadow = '0 2px 24px rgba(0,0,0,.07)';
  } else {
    nav.style.height = '';
    nav.style.boxShadow = '';
  }
});


/* ════════════════════════════════════════
   STAR RATING
   ════════════════════════════════════════ */
let rating = 0;
const stars = document.querySelectorAll('.star');

stars.forEach(star => {
  // Highlight stars on hover
  star.addEventListener('mouseover', () => {
    const val = +star.dataset.v;
    stars.forEach(s => s.classList.toggle('on', +s.dataset.v <= val));
  });

  // Restore the saved rating on mouse leave
  star.addEventListener('mouseleave', () => {
    stars.forEach(s => s.classList.toggle('on', +s.dataset.v <= rating));
  });

  // Lock in the rating on click
  star.addEventListener('click', () => {
    rating = +star.dataset.v;
    stars.forEach(s => s.classList.toggle('on', +s.dataset.v <= rating));

    // Bounce animation on click
    gsap.fromTo(star, { scale: 1.4 }, { scale: 1, duration: .3, ease: 'back.out(2)' });
  });
});


/* ════════════════════════════════════════
   CONTACT FORM — Submit animation
   ════════════════════════════════════════ */
document.getElementById('fform').addEventListener('submit', (e) => {
  e.preventDefault();

  const form    = document.getElementById('fform');
  const success = document.getElementById('fsuc');

  gsap.to(form, {
    opacity: 0,
    y: -12,
    duration: .4,
    ease: 'power2.in',
    onComplete: () => {
      form.style.display = 'none';
      success.classList.add('show');
      gsap.from(success, { opacity: 0, y: 16, duration: .7, ease: 'power3.out' });
    }
  });
});


/* ════════════════════════════════════════
   TESTIMONIALS CAROUSEL
   Auto-advances every 10 seconds
   ════════════════════════════════════════ */
const track  = document.getElementById('ct');
const dotsEl = document.getElementById('dots');
const slides = document.querySelectorAll('.test-slide');

let current = 0;
let autoTimer;

// Build dots dynamically
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

// Start the auto-play timer
autoTimer = setTimeout(() => goTo(1), 10000);


/* ════════════════════════════════════════
   GSAP ANIMATIONS
   ════════════════════════════════════════ */

/* ── 1. Hero entrance (plays immediately on load) ── */
const heroTL = gsap.timeline({ defaults: { ease: 'power3.out' } });

heroTL
  .from('.nav',        { opacity: 0, y: -20, duration: .7 })
  .from('.eyebrow',    { opacity: 0, y: 20,  duration: .8 }, '-=.3')
  .from('.hero h1',    { opacity: 0, y: 32,  duration: 1  }, '-=.5')
  .from('.hero-p',     { opacity: 0, y: 20,  duration: .8 }, '-=.5')
  .from('.hero-btns',  { opacity: 0, y: 16,  duration: .7 }, '-=.4')
  .from('.badge',      { opacity: 0, x: -20, stagger: .15, duration: .7 }, '-=.3')
  .from('.hero-deco',  { opacity: 0, scale: .7, rotation: -15, duration: 1.2, ease: 'elastic.out(1,.6)' }, '-=.8')
  .from('.hero-r',     { opacity: 0, duration: 1, ease: 'power2.out' }, 0);

/* ── 2. Hero decoration — slow spin (runs forever) ── */
gsap.to('.hero-deco', {
  rotation: 360,
  duration: 30,
  repeat: -1,
  ease: 'none'
});

/* ── 3. Reasons — stagger up from below ── */
gsap.from('.reason', {
  scrollTrigger: { trigger: '.reasons', start: 'top 82%' },
  opacity: 0,
  y: 48,
  stagger: .12,
  duration: .9,
  ease: 'power3.out'
});

/* Number counter inside each reason card */
ScrollTrigger.create({
  trigger: '.reasons',
  start: 'top 80%',
  once: true,
  onEnter: () => {
    document.querySelectorAll('.r-num').forEach((el, i) => {
      gsap.from(el, {
        opacity: 0,
        scale: 1.6,
        duration: .6,
        delay: i * .12,
        ease: 'back.out(2)'
      });
    });
  }
});

/* ── 4. About — image slides from left, text from right ── */
gsap.from('.about-img-wrap', {
  scrollTrigger: { trigger: '.about', start: 'top 78%' },
  opacity: 0,
  x: -60,
  duration: 1.1,
  ease: 'power3.out'
});

gsap.from('.about-content > *', {
  scrollTrigger: { trigger: '.about', start: 'top 78%' },
  opacity: 0,
  x: 40,
  stagger: .1,
  duration: .9,
  ease: 'power3.out'
});

/* Decorative frame draws itself in */
gsap.from('.about-frame', {
  scrollTrigger: { trigger: '.about', start: 'top 75%' },
  opacity: 0,
  scale: .85,
  duration: 1,
  ease: 'power2.out'
});

/* ── 5. Stats counter animation ── */
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
          duration: 2,
          ease: 'power2.out',
          onUpdate: function () {
            el.textContent = Math.round(this.targets()[0].val) + suffix;
          }
        }
      );
    });
  }
});

/* ── 6. Packages — cards rise with stagger ── */
gsap.from([
  document.getElementById('p1'),
  document.getElementById('p2'),
  document.getElementById('p3')
], {
  scrollTrigger: { trigger: '.pkgs', start: 'top 82%' },
  opacity: 0,
  y: 60,
  stagger: .15,
  duration: 1,
  ease: 'power3.out'
});

/* Featured card pulses once on enter */
ScrollTrigger.create({
  trigger: '#p2',
  start: 'top 80%',
  once: true,
  onEnter: () => {
    gsap.fromTo('#p2',
      { boxShadow: '0 0 0 0 rgba(184,147,74,0)' },
      { boxShadow: '0 0 0 18px rgba(184,147,74,0)', duration: 1, ease: 'power2.out' }
    );
  }
});

/* Package buttons — magnetic hover effect */
document.querySelectorAll('.pkg-btn').forEach(btn => {
  btn.addEventListener('mousemove', (e) => {
    const rect = btn.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width  / 2) * .25;
    const y = (e.clientY - rect.top  - rect.height / 2) * .25;
    gsap.to(btn, { x, y, duration: .3, ease: 'power2.out' });
  });

  btn.addEventListener('mouseleave', () => {
    gsap.to(btn, { x: 0, y: 0, duration: .5, ease: 'elastic.out(1,.5)' });
  });
});

/* ── 7. Feedback form — slide in from sides ── */
gsap.from('.fb-info > *', {
  scrollTrigger: { trigger: '.feedback', start: 'top 82%' },
  opacity: 0,
  x: -32,
  stagger: .1,
  duration: .85,
  ease: 'power3.out'
});

gsap.from('.fb-form-wrap', {
  scrollTrigger: { trigger: '.feedback', start: 'top 82%' },
  opacity: 0,
  x: 32,
  duration: 1,
  ease: 'power3.out'
});

/* Form fields reveal one by one */
gsap.from('.f-field', {
  scrollTrigger: { trigger: '.feedback', start: 'top 75%' },
  opacity: 0,
  y: 16,
  stagger: .08,
  duration: .6,
  ease: 'power2.out'
});

/* ── 8. Testimonials header ── */
gsap.from('.test-hdr > *', {
  scrollTrigger: { trigger: '#test', start: 'top 85%' },
  opacity: 0,
  y: 24,
  stagger: .12,
  duration: .8,
  ease: 'power3.out'
});

/* ── 9. Footer bottom bar slides up ── */
gsap.from('.foot-bot', {
  scrollTrigger: { trigger: '.foot-bot', start: 'top 95%' },
  opacity: 0,
  y: 20,
  duration: .7,
  ease: 'power2.out'
});

/* ── 10. Horizontal scroll parallax on the reasons strip ── */
gsap.to('.reasons', {
  scrollTrigger: {
    trigger: '.reasons',
    start: 'top bottom',
    end: 'bottom top',
    scrub: 1
  },
  backgroundPositionY: '30%'
});