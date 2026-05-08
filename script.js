const menuButton = document.querySelector('.mobile-menu');
const frontMenu = document.getElementById('custom_front_menu');
if (menuButton && frontMenu) {
  menuButton.addEventListener('click', () => {
    frontMenu.style.display = frontMenu.style.display === 'block' ? 'none' : 'block';
  });
  document.addEventListener('click', (event) => {
    if (!frontMenu.contains(event.target) && !menuButton.contains(event.target)) {
      frontMenu.style.display = 'none';
    }
  });
}

const canvas = document.getElementById('canvas');
const playButton = document.getElementById('waflash-play-button-container');
if (canvas) {
  if (!/Mobi/i.test(navigator.userAgent)) {
    canvas.focus();
  }
}

async function loadFlashGame() {
  try {
    const WAFLASH_BASE_URL = 'https://cdn.waflash.org/player/';
    const WAFLASH_TIMESTAMP = '2026033101';
    const module = await import(`${WAFLASH_BASE_URL}waflash-player.min.js?${WAFLASH_TIMESTAMP}`);
    if (module && typeof module.createWaflash === 'function') {
      const fileLink = document.querySelector('figure.fileblock a')?.href;
      if (fileLink) {
        module.createWaflash(fileLink, {});
      }
    }
  } catch (error) {
    console.warn('WAFlash player load failed.', error);
  }
}

loadFlashGame();
