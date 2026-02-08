document.addEventListener('DOMContentLoaded', () => {
  function createRaindrop() {
    const rainGif = document.createElement('img');
    rainGif.src = './img/pika.gif'; // Local GIF
    rainGif.alt = 'Rain animation';
    rainGif.className = 'rain-animation';

    // Random horizontal position (0–100vw)
    rainGif.style.left = `${Math.random() * 100}vw`;

    // Random animation duration and delay
    const duration = 2 + Math.random() * 2; // 2–4s
    const delay = Math.random() * 2;        // 0–2s
    rainGif.style.animationDuration = `${duration}s`;
    rainGif.style.animationDelay = `${delay}s`;

    // Optional: random scale for variation
    const scale = 0.5 + Math.random() * 0.5;
    rainGif.style.transform = `translateX(-50%) scale(${scale})`;

    // Append to body
    document.body.appendChild(rainGif);

    // Remove after animation completes
    setTimeout(() => {
      document.body.removeChild(rainGif);
    }, (duration + delay) * 1000);
  }

  setInterval(createRaindrop, 600);
});