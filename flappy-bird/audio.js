let audioContext = null;
let bgmGain = null;
let bgmTimer = null;
let bgmStep = 0;
const bgmStepMs = 150;
const bgmBassPattern = [130.81, null, 196, null, 220, null, 174.61, null, 130.81, 196, 220, 261.63, 174.61, null, 196, null];
const bgmLeadPattern = [523.25, null, 659.25, 783.99, null, 659.25, null, 587.33, 523.25, null, 659.25, 880, null, 783.99, 659.25, null];

function getAudioContext() {
  if (!audioContext) {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    audioContext = new AudioContextClass();
  }

  if (audioContext.state === "suspended") {
    audioContext.resume();
  }

  return audioContext;
}

function playTone(frequency, duration, volume = 0.08, type = "sine") {
  const context = getAudioContext();
  const oscillator = context.createOscillator();
  const gain = context.createGain();
  const now = context.currentTime;

  oscillator.type = type;
  oscillator.frequency.setValueAtTime(frequency, now);
  gain.gain.setValueAtTime(volume, now);
  gain.gain.exponentialRampToValueAtTime(0.001, now + duration);

  oscillator.connect(gain);
  gain.connect(context.destination);
  oscillator.start(now);
  oscillator.stop(now + duration);
}

function playGameOverSound() {
  const context = getAudioContext();
  const oscillator = context.createOscillator();
  const gain = context.createGain();
  const now = context.currentTime;

  oscillator.type = "sawtooth";
  oscillator.frequency.setValueAtTime(220, now);
  oscillator.frequency.exponentialRampToValueAtTime(90, now + 0.28);
  gain.gain.setValueAtTime(0.08, now);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.28);

  oscillator.connect(gain);
  gain.connect(context.destination);
  oscillator.start(now);
  oscillator.stop(now + 0.28);
}

function playBgmVoice(frequency, duration, volume, type) {
  const context = getAudioContext();
  const oscillator = context.createOscillator();
  const gain = context.createGain();
  const now = context.currentTime;

  oscillator.type = type;
  oscillator.frequency.setValueAtTime(frequency, now);
  gain.gain.setValueAtTime(volume, now);
  gain.gain.exponentialRampToValueAtTime(0.001, now + duration);

  oscillator.connect(gain);
  gain.connect(bgmGain);
  oscillator.start(now);
  oscillator.stop(now + duration);
}

function playBgmTick() {
  const context = getAudioContext();
  const buffer = context.createBuffer(1, 1, context.sampleRate);
  const source = context.createBufferSource();
  const gain = context.createGain();
  const now = context.currentTime;

  buffer.getChannelData(0)[0] = 1;
  source.buffer = buffer;
  gain.gain.setValueAtTime(0.018, now);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.035);

  source.connect(gain);
  gain.connect(bgmGain);
  source.start(now);
  source.stop(now + 0.035);
}

function playBgmStep() {
  const step = bgmStep % bgmLeadPattern.length;
  const bass = bgmBassPattern[step];
  const lead = bgmLeadPattern[step];

  if (bass) {
    playBgmVoice(bass, 0.13, 0.026, "triangle");
  }

  if (lead) {
    playBgmVoice(lead, 0.11, 0.016, "square");
  }

  if (step % 2 === 0) {
    playBgmTick();
  }

  bgmStep += 1;
}

function startBgm() {
  if (bgmTimer) {
    return;
  }

  const context = getAudioContext();

  bgmGain = context.createGain();
  bgmGain.gain.setValueAtTime(0.45, context.currentTime);
  bgmGain.connect(context.destination);
  bgmStep = 0;
  playBgmStep();
  bgmTimer = window.setInterval(playBgmStep, bgmStepMs);
}

function stopBgm() {
  if (!bgmTimer) {
    return;
  }

  window.clearInterval(bgmTimer);
  bgmTimer = null;

  if (bgmGain) {
    bgmGain.disconnect();
    bgmGain = null;
  }
}

window.gameSounds = {
  jump() {
    playTone(520, 0.08, 0.06, "triangle");
  },
  score() {
    playTone(820, 0.1, 0.07, "sine");
  },
  gameOver: playGameOverSound,
  startBgm,
  stopBgm,
};
