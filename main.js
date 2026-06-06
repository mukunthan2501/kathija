/* ============================================================
   KATHIJA — Luxury Romantic Website
   main.js
   ============================================================ */

/* ── MOBILE NAV ─────────────────────────────────────────── */
const navToggle = document.getElementById('nav-toggle');
const navLinks  = document.querySelector('.nav-links');

if (navToggle) {
  navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    navToggle.textContent = navLinks.classList.contains('open') ? '✕' : '☰';
  });
  navLinks.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      navLinks.classList.remove('open');
      navToggle.textContent = '☰';
    });
  });
}

/* ── COUNTDOWN ───────────────────────────────────────────── */
function updateCountdown() {
  const target = new Date('2026-06-08T00:00:00');
  const now    = new Date();
  const diff   = target - now;

  const pad = n => String(n).padStart(2, '0');

  if (diff <= 0) {
    ['cd-d','cd-h','cd-m','cd-s'].forEach(id => document.getElementById(id).textContent = '00');
    document.querySelector('.countdown-label').textContent = '✦ Today is our day ✦';
    return;
  }

  document.getElementById('cd-d').textContent = pad(Math.floor(diff / 86400000));
  document.getElementById('cd-h').textContent = pad(Math.floor((diff % 86400000) / 3600000));
  document.getElementById('cd-m').textContent = pad(Math.floor((diff % 3600000)  / 60000));
  document.getElementById('cd-s').textContent = pad(Math.floor((diff % 60000)    / 1000));
}

updateCountdown();
setInterval(updateCountdown, 1000);

/* ── PASSWORD / LOVE LETTER ──────────────────────────────── */
function checkPw() {
  const val = document.getElementById('pw-input').value.toLowerCase().trim();
  const err = document.getElementById('pw-error');

  if (val === 'kathija') {
    err.textContent = '';
    document.getElementById('pw-row').style.display = 'none';
    document.getElementById('env-icon').textContent = '💌';
    document.getElementById('env-sub').textContent  = 'Your letter awaits ♡';

    const letter = document.getElementById('letter-content');
    letter.style.display = 'block';
    letter.classList.add('open');
  } else {
    err.textContent = "That's not the right password, love. Try again.";
    const input = document.getElementById('pw-input');
    input.style.borderColor = 'var(--rose)';
    setTimeout(() => { input.style.borderColor = ''; }, 2000);
  }
}

// expose for inline onclick & allow Enter key
window.checkPw = checkPw;

document.getElementById('pw-btn').addEventListener('click', checkPw);
document.getElementById('pw-input').addEventListener('keydown', e => {
  if (e.key === 'Enter') checkPw();
});

/* ── BUCKET LIST ─────────────────────────────────────────── */
const blGroups = [
  { list: 'bl-travel', count: 'travel-count', fill: 'travel-fill' },
  { list: 'bl-dining', count: 'dining-count', fill: 'dining-fill' },
  { list: 'bl-exp',    count: 'exp-count',    fill: 'exp-fill'    },
];

function toggleBl(el) {
  el.classList.toggle('checked');
  updateProgress();
}
window.toggleBl = toggleBl;

function updateProgress() {
  blGroups.forEach(({ list, count, fill }) => {
    const ul    = document.getElementById(list);
    if (!ul) return;
    const items = ul.querySelectorAll('.bl-item');
    const done  = [...items].filter(i => i.classList.contains('checked')).length;
    const total = items.length;
    document.getElementById(count).textContent = `${done} / ${total}`;
    document.getElementById(fill).style.width  = `${Math.round((done / total) * 100)}%`;
  });
}

/* ── MUSIC PLAYER ────────────────────────────────────────── */
const audio    = document.getElementById('song');
const playBtn  = document.getElementById('play-btn');
const artEl    = document.querySelector('.player-art');
const lyrics   = document.querySelectorAll('.lyrics-line');
const progFill = document.getElementById('progress-fill');
const timeCur  = document.getElementById('time-cur');
const timeTot  = document.getElementById('time-tot');

let usingRealAudio = false;

/* Try to wire up real audio if the file exists */
audio.addEventListener('loadedmetadata', () => {
  usingRealAudio = true;
  timeTot.textContent = fmt(Math.floor(audio.duration));
  document.querySelector('.no-audio-note').style.display = 'none';
});

audio.addEventListener('timeupdate', () => {
  if (!usingRealAudio) return;
  const cur = Math.floor(audio.currentTime);
  const dur = Math.floor(audio.duration) || 263;
  progFill.style.width = `${(cur / dur) * 100}%`;
  timeCur.textContent  = fmt(cur);
  updateLyrics(cur);
});

audio.addEventListener('ended', () => {
  playBtn.textContent = '▶';
  playBtn.classList.remove('playing');
  artEl.classList.remove('spinning');
});

/* Simulated playback fallback */
let elapsed  = 0;
let totalSec = 263;
let simTimer = null;
let isPlaying = false;

function togglePlay() {
  isPlaying = !isPlaying;

  if (isPlaying) {
    playBtn.textContent = '⏸';
    playBtn.classList.add('playing');
    artEl.classList.add('spinning');

    if (usingRealAudio) {
      audio.play().catch(() => startSim());
    } else {
      startSim();
    }
  } else {
    playBtn.textContent = '▶';
    playBtn.classList.remove('playing');
    artEl.classList.remove('spinning');
    if (usingRealAudio) audio.pause();
    stopSim();
  }
}
window.togglePlay = togglePlay;

function startSim() {
  stopSim();
  simTimer = setInterval(() => {
    elapsed++;
    if (elapsed >= totalSec) elapsed = 0;
    progFill.style.width = `${(elapsed / totalSec) * 100}%`;
    timeCur.textContent  = fmt(elapsed);
    updateLyrics(elapsed);
  }, 1000);
}

function stopSim() {
  clearInterval(simTimer);
  simTimer = null;
}

function skipBack() {
  if (usingRealAudio) { audio.currentTime = Math.max(0, audio.currentTime - 10); }
  else { elapsed = Math.max(0, elapsed - 10); }
}
function skipFwd() {
  if (usingRealAudio) { audio.currentTime = Math.min(audio.duration - 1, audio.currentTime + 10); }
  else { elapsed = Math.min(totalSec - 1, elapsed + 10); }
}
window.skipBack = skipBack;
window.skipFwd  = skipFwd;

function seekSong(e) {
  const bar  = document.getElementById('seek-bar');
  const rect = bar.getBoundingClientRect();
  const pct  = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
  if (usingRealAudio && audio.duration) {
    audio.currentTime = pct * audio.duration;
  } else {
    elapsed = Math.floor(pct * totalSec);
  }
}
window.seekSong = seekSong;

function fmt(s) {
  s = Math.floor(s);
  return `${Math.floor(s / 60)}:${s % 60 < 10 ? '0' : ''}${s % 60}`;
}

function updateLyrics(cur) {
  let active = null;
  lyrics.forEach(l => {
    if (cur >= parseInt(l.dataset.time)) active = l;
  });
  lyrics.forEach(l => l.classList.remove('active'));
  if (active) {
    active.classList.add('active');
    active.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }
}

/* ── SCROLL REVEAL ───────────────────────────────────────── */
const observer = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
