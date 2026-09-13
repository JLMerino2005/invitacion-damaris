document.addEventListener('DOMContentLoaded', () => {
  // Elementos
  const envelopeCover = document.getElementById('envelopeCover');
  const envelopeCard = document.getElementById('envelopeCard');
  const waxSeal = document.getElementById('waxSeal');
  const invitationContent = document.getElementById('invitationContent');
  const btnFoldBack = document.getElementById('btnFoldBack');
  const bgMusic = document.getElementById('bgMusic');
  const musicToggle = document.getElementById('musicToggle');
  const musicText = document.getElementById('musicText');
  const rsvpForm = document.getElementById('rsvpForm');

  let isEnvelopeOpen = false;

  // ========================================================
  // 1. ABRIR EL SOBRE + ACTIVAR MÚSICA AUTOMÁTICAMENTE
  // ========================================================
  function openEnvelope() {
    if (isEnvelopeOpen) return;
    isEnvelopeOpen = true;

    // Levantar solapa y deslizar tarjeta
    envelopeCard.classList.add('open');

    // Reproducir la música MP3
    playAudio();

    // Disparar confeti dorado y vino
    launchGoldenConfetti();

    // Transición suave hacia la invitación
    setTimeout(() => {
      envelopeCover.classList.add('fade-out');

      setTimeout(() => {
        invitationContent.classList.remove('hidden');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 350);
    }, 1100);
  }

  waxSeal.addEventListener('click', (e) => {
    e.stopPropagation();
    openEnvelope();
  });
  envelopeCard.addEventListener('click', openEnvelope);

  // Volver a guardar la invitación dentro del sobre
  btnFoldBack.addEventListener('click', () => {
    invitationContent.classList.add('hidden');
    setTimeout(() => {
      envelopeCover.classList.remove('fade-out');
      envelopeCard.classList.remove('open');
      isEnvelopeOpen = false;
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 400);
  });

  // ========================================================
  // 2. CONTROL DE MÚSICA
  // ========================================================
  function playAudio() {
    if (bgMusic) {
      bgMusic.volume = 0.5; // Volumen moderado para no aturdir
      bgMusic.play().then(() => {
        musicToggle.classList.add('playing');
        musicText.textContent = 'Pausar';
      }).catch(err => {
        console.log("Autoplay bloqueado hasta interacción:", err);
      });
    }
  }

  musicToggle.addEventListener('click', () => {
    if (!bgMusic) return;

    if (bgMusic.paused) {
      bgMusic.play();
      musicToggle.classList.add('playing');
      musicText.textContent = 'Pausar';
    } else {
      bgMusic.pause();
      musicToggle.classList.remove('playing');
      musicText.textContent = 'Música';
    }
  });

  // ========================================================
  // 3. EXPLOSIÓN DE CONFETI (DORADO Y VINO)
  // ========================================================
  function launchGoldenConfetti() {
    if (typeof confetti !== 'function') return;

    const colors = ['#d4a762', '#f3d49b', '#ffffff', '#7a1d28', '#ffd700'];

    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: colors
    });

    setTimeout(() => {
      confetti({
        particleCount: 50,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: colors
      });
      confetti({
        particleCount: 50,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: colors
      });
    }, 300);
  }

  // ========================================================
  // 4. CUENTA REGRESIVA DINÁMICA (10 de Octubre del 2026, 12:00 PM)
  // ========================================================
  const targetDate = new Date('2026-10-10T12:00:00').getTime();

  function updateCountdown() {
    const now = new Date().getTime();
    const distance = targetDate - now;

    if (distance <= 0) {
      document.getElementById('cdDays').innerText = '00';
      document.getElementById('cdHours').innerText = '00';
      document.getElementById('cdMins').innerText = '00';
      document.getElementById('cdSecs').innerText = '00';
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById('cdDays').innerText = String(days).padStart(2, '0');
    document.getElementById('cdHours').innerText = String(hours).padStart(2, '0');
    document.getElementById('cdMins').innerText = String(minutes).padStart(2, '0');
    document.getElementById('cdSecs').innerText = String(seconds).padStart(2, '0');
  }

  setInterval(updateCountdown, 1000);
  updateCountdown();

// ========================================================
  // ENVÍO DE CONFIRMACIÓN POR WHATSAPP (CORAZÓN BLANCO Y FLORES)
  // ========================================================
  rsvpForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Reemplaza por tu número con lada internacional (ej. México: 521XXXXXXXXXX)
    const hostNumber = '2231123835';

    const name = document.getElementById('guestName').value.trim();
    const attendance = document.querySelector('input[name="attendance"]:checked').value;
    const notes = document.getElementById('guestNotes').value.trim();

    // Saltos de línea limpios para WhatsApp (%0A) con corazones blancos y flores
    let text = '🤍 *Bautizo de Damaris Dariela - Confirmación* 🤍\n\n';
    text += '🌸 *Invitado(s):* ' + name + '\n';
    text += '🤍 *Respuesta:* ' + attendance + '\n';
    
    if (notes) {
      text += '🌸 *Dedicatoria:* "' + notes + '"\n';
    }

    // Usamos encodeURIComponent para asegurar que los emojis y los saltos de línea pasen intactos
    const encodedText = encodeURIComponent(text);
    const whatsappUrl = `https://api.whatsapp.com/send?phone=${hostNumber}&text=${encodedText}`;

    window.open(whatsappUrl, '_blank');
  });
});