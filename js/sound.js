/**
 * KINETIX SOUND ENGINE (Web Audio API)
 * Genera efectos de sonido futuristas y elegantes en tiempo real sin requerir archivos de audio externos.
 */
class SoundEngine {
    constructor() {
        this.ctx = null;
        this.enabled = true;
        this.initOnFirstInteraction();
    }

    init() {
        if (!this.ctx) {
            const AudioContext = window.AudioContext || window.webkitAudioContext;
            if (AudioContext) {
                this.ctx = new AudioContext();
            }
        }
        if (this.ctx && this.ctx.state === 'suspended') {
            this.ctx.resume();
        }
    }

    initOnFirstInteraction() {
        const unlock = () => {
            this.init();
            document.removeEventListener('click', unlock);
            document.removeEventListener('keydown', unlock);
        };
        document.addEventListener('click', unlock, { once: true });
        document.addEventListener('keydown', unlock, { once: true });
    }

    toggle() {
        this.enabled = !this.enabled;
        return this.enabled;
    }

    // Sonido sutil al pasar el mouse por botones y tarjetas
    hover() {
        if (!this.enabled || !this.ctx) return;
        try {
            const now = this.ctx.currentTime;
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();

            osc.type = 'sine';
            osc.frequency.setValueAtTime(320, now);
            osc.frequency.exponentialRampToValueAtTime(480, now + 0.05);

            gain.gain.setValueAtTime(0.015, now);
            gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.05);

            osc.connect(gain);
            gain.connect(this.ctx.destination);

            osc.start(now);
            osc.stop(now + 0.05);
        } catch (e) {
            // Audio no soportado o bloqueado
        }
    }

    // Sonido de clic moderno y preciso
    click() {
        if (!this.enabled || !this.ctx) return;
        try {
            const now = this.ctx.currentTime;
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();

            osc.type = 'triangle';
            osc.frequency.setValueAtTime(650, now);
            osc.frequency.exponentialRampToValueAtTime(200, now + 0.04);

            gain.gain.setValueAtTime(0.04, now);
            gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.04);

            osc.connect(gain);
            gain.connect(this.ctx.destination);

            osc.start(now);
            osc.stop(now + 0.04);
        } catch (e) {}
    }

    // Sonido al agregar al carrito (acorde cristalino)
    addToCart() {
        if (!this.enabled || !this.ctx) return;
        try {
            const now = this.ctx.currentTime;
            const freqs = [523.25, 659.25, 783.99, 1046.50]; // Acorde C Mayor brillante
            
            freqs.forEach((freq, idx) => {
                const osc = this.ctx.createOscillator();
                const gain = this.ctx.createGain();
                const start = now + idx * 0.035;

                osc.type = 'sine';
                osc.frequency.setValueAtTime(freq, start);

                gain.gain.setValueAtTime(0.03, start);
                gain.gain.exponentialRampToValueAtTime(0.0001, start + 0.25);

                osc.connect(gain);
                gain.connect(this.ctx.destination);

                osc.start(start);
                osc.stop(start + 0.25);
            });
        } catch (e) {}
    }

    // Sonido al aplicar cupón o éxito de checkout
    success() {
        if (!this.enabled || !this.ctx) return;
        try {
            const now = this.ctx.currentTime;
            const notes = [440, 554.37, 659.25, 880];
            notes.forEach((freq, i) => {
                const osc = this.ctx.createOscillator();
                const gain = this.ctx.createGain();
                const start = now + (i * 0.06);

                osc.type = 'sine';
                osc.frequency.setValueAtTime(freq, start);

                gain.gain.setValueAtTime(0.04, start);
                gain.gain.exponentialRampToValueAtTime(0.0001, start + 0.4);

                osc.connect(gain);
                gain.connect(this.ctx.destination);

                osc.start(start);
                osc.stop(start + 0.4);
            });
        } catch (e) {}
    }

    // Sonido futurista de cambio de color/ángulo
    switch() {
        if (!this.enabled || !this.ctx) return;
        try {
            const now = this.ctx.currentTime;
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();

            osc.type = 'sine';
            osc.frequency.setValueAtTime(400, now);
            osc.frequency.exponentialRampToValueAtTime(800, now + 0.08);

            gain.gain.setValueAtTime(0.025, now);
            gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.08);

            osc.connect(gain);
            gain.connect(this.ctx.destination);

            osc.start(now);
            osc.stop(now + 0.08);
        } catch (e) {}
    }

    // Sonido al abrir drawer o modal
    modalOpen() {
        if (!this.enabled || !this.ctx) return;
        try {
            const now = this.ctx.currentTime;
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();

            osc.type = 'sine';
            osc.frequency.setValueAtTime(220, now);
            osc.frequency.exponentialRampToValueAtTime(440, now + 0.12);

            gain.gain.setValueAtTime(0.03, now);
            gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.12);

            osc.connect(gain);
            gain.connect(this.ctx.destination);

            osc.start(now);
            osc.stop(now + 0.12);
        } catch (e) {}
    }
}

window.soundEngine = new SoundEngine();
