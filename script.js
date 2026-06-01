// alpefe.me · minimal reveal on scroll + typing effect in terminal

(function () {
  // ───── reveal on scroll ─────
  const items = document.querySelectorAll('[data-reveal]');
  const reveal = (el) => el.classList.add('is-in');

  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            reveal(e.target);
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.05, rootMargin: '0px 0px -40px 0px' }
    );
    items.forEach((el) => io.observe(el));

    // Safety net: if anything is still hidden after 1.5s, reveal it.
    setTimeout(() => {
      document.querySelectorAll('[data-reveal]:not(.is-in)').forEach(reveal);
    }, 1500);
  } else {
    items.forEach(reveal);
  }

  // ───── type-in terminal lines ─────
  const body = document.querySelector('.terminal-body');
  if (!body) return;

  const lines = body.querySelectorAll('span');
  // Wrap each visual "line" (prompt..out) into a span if not already.
  // Strategy: rebuild body incrementally.
  const raw = body.innerHTML;
  body.innerHTML = '';

  // Split into discrete lines by detecting "prompt" markers
  const segments = raw
    .split(/(?=<span class="prompt">)/)
    .map((s) => s.trim())
    .filter(Boolean);

  let i = 0;
  const typeNext = () => {
    if (i >= segments.length) {
      // ensure cursor is at the end
      const c = document.createElement('span');
      c.className = 'cursor';
      c.textContent = '_';
      body.appendChild(c);
      return;
    }
    const seg = segments[i];
    // If it's a prompt line, animate char-by-char; if it's an <out>, fade in.
    const isPrompt = seg.includes('class="prompt"');
    const wrap = document.createElement('span');
    if (isPrompt) {
      // type each character
      const tmp = document.createElement('span');
      tmp.innerHTML = seg;
      const text = tmp.textContent;
      wrap.innerHTML = '';
      let j = 0;
      const tick = () => {
        if (j > text.length) {
          body.appendChild(wrap);
          body.appendChild(document.createTextNode('\n'));
          i++;
          setTimeout(typeNext, 90);
          return;
        }
        wrap.textContent = text.slice(0, j);
        j++;
        setTimeout(tick, 12);
      };
      tick();
    } else {
      wrap.innerHTML = seg;
      wrap.style.opacity = '0';
      wrap.style.transition = 'opacity 220ms';
      body.appendChild(wrap);
      body.appendChild(document.createTextNode('\n'));
      requestAnimationFrame(() => (wrap.style.opacity = '1'));
      i++;
      setTimeout(typeNext, 220);
    }
  };
  // small initial delay so reveal animation lands first
  setTimeout(typeNext, 350);
})();
