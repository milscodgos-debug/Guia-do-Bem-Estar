document.addEventListener('DOMContentLoaded', () => {
  const year = new Date().getFullYear();
  const footer = document.querySelector('footer p');
  if (footer) {
    footer.textContent = `© ${year} Guia do Bem Estar`;
  }

  const timerPanel = document.getElementById('timerPanel');
  const timerDisplay = document.getElementById('timerDisplay');
  const timerButton = document.getElementById('timerButton');

  if (!timerPanel || !timerDisplay || !timerButton) return;

  let timerSeconds = 0;
  let timerInterval = null;
  let isRunning = false;

  window.startTimer = function (seconds) {
    timerSeconds = seconds;
    timerPanel.hidden = false;
    renderTimer();
    if (timerInterval) {
      clearInterval(timerInterval);
    }
    isRunning = false;
    timerButton.textContent = 'Iniciar';
  };

  window.toggleTimer = function () {
    if (!timerSeconds) return;
    if (isRunning) {
      clearInterval(timerInterval);
      isRunning = false;
      timerButton.textContent = 'Continuar';
    } else {
      isRunning = true;
      timerButton.textContent = 'Pausar';
      timerInterval = setInterval(() => {
        timerSeconds -= 1;
        renderTimer();
        if (timerSeconds <= 0) {
          clearInterval(timerInterval);
          isRunning = false;
          timerButton.textContent = 'Reiniciar';
        }
      }, 1000);
    }
  };

  function renderTimer() {
    const minutes = Math.floor(timerSeconds / 60).toString().padStart(2, '0');
    const seconds = (timerSeconds % 60).toString().padStart(2, '0');
    timerDisplay.textContent = `${minutes}:${seconds}`;
  }
});
