// ──────────────────────────────────────────────
// alpefe.me · hand-drawn portfolio
//  · scroll reveal
//  · cursor trail (subtle pencil dots)
//  · wiggle boost on tag click
// ──────────────────────────────────────────────

(() => {
  'use strict';

  // ─── scroll reveal ──────────────────────────
  const reveal = (entries, obs) => {
    for (const e of entries) {
      if (e.isIntersecting) {
        e.target.classList.add('is-in');
        obs.unobserve(e.target);
      }
    }
  };
  const io = new IntersectionObserver(reveal, {
    threshold: 0,
    rootMargin: '0px 0px 200px 0px',  // trigger well before reaching viewport
  });
  document.querySelectorAll('[data-reveal]').forEach(el => io.observe(el));

  // Safety fallback: reveal anything still hidden after 2s
  // (in case the page is short, in a headless browser, or IO misbehaves)
  setTimeout(() => {
    document.querySelectorAll('[data-reveal]:not(.is-in)').forEach(el => {
      el.classList.add('is-in');
    });
  }, 2000);

  // ─── cursor trail: small pencil dots ────────
  // Stays subtle — disabled on touch + reduced motion
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

  if (!reduceMotion && !isTouch) {
    const colors = ['#ff9bbd', '#a8d8c0', '#ffd66b', '#a8c8f0', '#c8a8f0'];
    let lastSpawn = 0;
    const throttle = 38; // ms between dots

    document.addEventListener('mousemove', (e) => {
      const now = performance.now();
      if (now - lastSpawn < throttle) return;
      lastSpawn = now;

      const dot = document.createElement('span');
      dot.className = 'cursor-dot';
      const size = 6 + Math.random() * 6;
      dot.style.cssText = `
        position: fixed;
        left: ${e.clientX - size / 2}px;
        top: ${e.clientY - size / 2}px;
        width: ${size}px;
        height: ${size}px;
        border-radius: 50%;
        background: ${colors[Math.floor(Math.random() * colors.length)]};
        opacity: 0.65;
        pointer-events: none;
        z-index: 9999;
        transition: opacity 600ms ease, transform 600ms ease;
      `;
      document.body.appendChild(dot);
      // fade out
      requestAnimationFrame(() => {
        dot.style.opacity = '0';
        dot.style.transform = `translate(${(Math.random() - 0.5) * 20}px, ${(Math.random() - 0.5) * 20}px) scale(0.4)`;
      });
      setTimeout(() => dot.remove(), 700);
    });
  }

  // ─── wiggle boost on tag click ──────────────
  document.querySelectorAll('.tag').forEach(tag => {
    tag.addEventListener('click', () => {
      tag.style.animation = 'none';
      // force reflow
      void tag.offsetWidth;
      tag.style.animation = 'gentle-wiggle 0.6s ease-in-out 2';
      setTimeout(() => { tag.style.animation = ''; }, 1300);
    });
  });

  // ─── friendly console signature ─────────────
  if (window.console) {
    console.log(
      '%c✎ alpefe.me',
      'font-family: Caveat, cursive; font-size: 28px; color: #a04a64;'
    );
    console.log(
      '%c¿curiosidad? mírate la consola de cosas.io — me encantan los detalles que la gente esconde aquí.',
      'color: #5a5a5a; font-style: italic;'
    );
  }
})();
