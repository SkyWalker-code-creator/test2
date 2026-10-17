const AudioPlayer = {
  el: new Audio('music.mp3'),
  isPlaying: false,
  btn: null,
  slider: null,

  init() {
    this.el.loop = true;
    const savedVol = localStorage.getItem('musicVolume');
    if (savedVol !== null) this.el.volume = parseFloat(savedVol);
    else this.el.volume = 0.5;

    this.slider = document.getElementById('musicVol');
    if (this.slider) {
      this.slider.value = this.el.volume;
      this.slider.addEventListener('input', (e) => {
        this.el.volume = e.target.value;
        localStorage.setItem('musicVolume', e.target.value);
      });
    }

    const playBtn = document.getElementById('musicToggle');
    if (playBtn) {
      playBtn.addEventListener('click', () => this.toggle());
    }
  },

  toggle() {
    const playBtn = document.getElementById('musicToggle');
    if (this.isPlaying) {
      this.el.pause();
      this.isPlaying = false;
      if (playBtn) { playBtn.textContent = 'Play'; playBtn.style.background = 'var(--blue)'; }
    } else {
      this.el.play().then(() => {
        this.isPlaying = true;
        if (playBtn) { playBtn.textContent = 'Pause'; playBtn.style.background = 'var(--red)'; }
      }).catch(err => {
        if (window.App) App.notify('Ошибка: Убедитесь, что music.mp3 лежит рядом с index.html', 'error');
      });
    }
  }
};