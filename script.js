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
const playContainer = document.getElementById('waflash-play-button-container');
const playButton = document.getElementById('waflash-play-button');
const waflashStatus = document.getElementById('waflashStatus');

if (canvas && !/Mobi/i.test(navigator.userAgent)) {
  canvas.focus();
}

function setStatus(message, isError = false) {
  if (!waflashStatus) return;
  waflashStatus.textContent = message;
  waflashStatus.style.display = 'block';
  waflashStatus.style.color = isError ? '#ffb3b3' : '#d5d5d5';
}

async function loadFlashGame() {
  if (playContainer) {
    playContainer.style.display = 'none';
  }
  setStatus('게임 로딩 중… 잠시만 기다려주세요.');

  try {
    const WAFLASH_BASE_URL = 'https://cdn.waflash.org/player/';
    const WAFLASH_TIMESTAMP = '2026033101';
    const module = await import(`${WAFLASH_BASE_URL}waflash-player.min.js?${WAFLASH_TIMESTAMP}`);
    if (!module || typeof module.createWaflash !== 'function') {
      throw new Error('WAFlash player 모듈을 불러오지 못했습니다.');
    }

    const fileLink = document.querySelector('figure.fileblock a')?.href;
    if (!fileLink) {
      throw new Error('게임 SWF 파일 링크를 찾을 수 없습니다.');
    }
    module.createWaflash(fileLink, {});
    setStatus('게임이 준비되었습니다. 캔버스를 클릭하여 시작하세요.');
  } catch (error) {
    console.warn('WAFlash player load failed.', error);
    setStatus('게임을 불러오는 중 오류가 발생했습니다. 다시 시도해주세요.', true);
    if (playContainer) {
      playContainer.style.display = 'flex';
    }
  }
}

if (playButton) {
  playButton.addEventListener('click', loadFlashGame);
}

loadFlashGame();
