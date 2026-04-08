export class GameAudio {
  private ctx: AudioContext | null = null;
  private master: GainNode | null = null;
  private fx: GainNode | null = null;
  private timer: ReturnType<typeof setTimeout> | null = null;
  private sched = 0;

  init(): void {
    try {
      this.ctx = new (
        window.AudioContext || (window as any).webkitAudioContext
      )();
      this.master = this.ctx.createGain();
      this.master.gain.value = 0.4;
      this.master.connect(this.ctx.destination);
      this.fx = this.ctx.createGain();
      this.fx.gain.value = 0.9;
      this.fx.connect(this.ctx.destination);
      this.sched = this.ctx.currentTime + 0.1;
      this._schedule(4);
    } catch {
      /* audio unavailable */
    }
  }

  stop(): void {
    if (this.timer) clearTimeout(this.timer);
    if (this.ctx) {
      try {
        this.ctx.close();
      } catch {
        /**/
      }
      this.ctx = null;
    }
  }

  shot(): void {
    if (!this.ctx || !this.fx) return;
    const { ctx, fx } = this,
      t = ctx.currentTime;
    const o = ctx.createOscillator(),
      g = ctx.createGain();
    o.frequency.setValueAtTime(220, t);
    o.frequency.exponentialRampToValueAtTime(40, t + 0.06);
    g.gain.setValueAtTime(3.5, t);
    g.gain.exponentialRampToValueAtTime(0.001, t + 0.07);
    o.connect(g);
    g.connect(fx);
    o.start(t);
    o.stop(t + 0.07);
    const s = ctx.createBufferSource(),
      f = ctx.createBiquadFilter(),
      g2 = ctx.createGain();
    s.buffer = this._nbuf(0.06);
    f.type = "bandpass";
    f.frequency.value = 3400;
    f.Q.value = 0.5;
    g2.gain.setValueAtTime(2.5, t);
    g2.gain.exponentialRampToValueAtTime(0.001, t + 0.06);
    s.connect(f);
    f.connect(g2);
    g2.connect(fx);
    s.start(t);
  }

  hurt(): void {
    if (!this.ctx || !this.fx) return;
    const { ctx, fx } = this,
      t = ctx.currentTime;
    const o = ctx.createOscillator(),
      g = ctx.createGain();
    o.type = "sawtooth";
    o.frequency.setValueAtTime(220, t);
    o.frequency.exponentialRampToValueAtTime(55, t + 0.3);
    g.gain.setValueAtTime(1, t);
    g.gain.exponentialRampToValueAtTime(0.001, t + 0.3);
    o.connect(g);
    g.connect(fx);
    o.start(t);
    o.stop(t + 0.3);
  }

  die(): void {
    if (!this.ctx || !this.fx) return;
    const { ctx, fx } = this,
      t = ctx.currentTime;
    [523, 415, 349, 261].forEach((freq, i) => {
      const o = ctx.createOscillator(),
        g = ctx.createGain();
      o.type = "sine";
      o.frequency.value = freq;
      const st = t + i * 0.1;
      g.gain.setValueAtTime(0.001, st);
      g.gain.linearRampToValueAtTime(0.8, st + 0.02);
      g.gain.setValueAtTime(0.7, st + 0.06);
      g.gain.exponentialRampToValueAtTime(0.001, st + 0.18);
      o.connect(g);
      g.connect(fx);
      o.start(st);
      o.stop(st + 0.2);
    });
  }

  private _nbuf(dur: number): AudioBuffer | null {
    if (!this.ctx) return null;
    const n = Math.ceil(this.ctx.sampleRate * dur);
    const b = this.ctx.createBuffer(1, n, this.ctx.sampleRate);
    const d = b.getChannelData(0);
    for (let i = 0; i < n; i++) d[i] = Math.random() * 2 - 1;
    return b;
  }

  private _kick(t: number): void {
    if (!this.ctx || !this.master) return;
    const { ctx, master } = this;
    const o = ctx.createOscillator(),
      g = ctx.createGain();
    o.frequency.setValueAtTime(160, t);
    o.frequency.exponentialRampToValueAtTime(22, t + 0.14);
    g.gain.setValueAtTime(4, t);
    g.gain.exponentialRampToValueAtTime(0.001, t + 0.16);
    o.connect(g);
    g.connect(master);
    o.start(t);
    o.stop(t + 0.16);
    const nb = this._nbuf(0.008);
    if (!nb) return;
    const s = ctx.createBufferSource(),
      g2 = ctx.createGain();
    s.buffer = nb;
    g2.gain.setValueAtTime(5, t);
    g2.gain.exponentialRampToValueAtTime(0.001, t + 0.008);
    s.connect(g2);
    g2.connect(master);
    s.start(t);
  }

  private _snare(t: number): void {
    if (!this.ctx || !this.master) return;
    const { ctx, master } = this;
    const nb = this._nbuf(0.22);
    if (!nb) return;
    const s = ctx.createBufferSource(),
      f = ctx.createBiquadFilter(),
      g = ctx.createGain();
    s.buffer = nb;
    f.type = "bandpass";
    f.frequency.value = 2800;
    f.Q.value = 0.7;
    g.gain.setValueAtTime(1.6, t);
    g.gain.exponentialRampToValueAtTime(0.001, t + 0.22);
    s.connect(f);
    f.connect(g);
    g.connect(master);
    s.start(t);
    const o = ctx.createOscillator(),
      g2 = ctx.createGain();
    o.type = "square";
    o.frequency.value = 200;
    g2.gain.setValueAtTime(0.3, t);
    g2.gain.exponentialRampToValueAtTime(0.001, t + 0.09);
    o.connect(g2);
    g2.connect(master);
    o.start(t);
    o.stop(t + 0.09);
  }

  private _hat(t: number, vol = 0.3): void {
    if (!this.ctx || !this.master) return;
    const { ctx, master } = this;
    const nb = this._nbuf(0.04);
    if (!nb) return;
    const s = ctx.createBufferSource(),
      f = ctx.createBiquadFilter(),
      g = ctx.createGain();
    s.buffer = nb;
    f.type = "highpass";
    f.frequency.value = 9500;
    g.gain.setValueAtTime(vol, t);
    g.gain.exponentialRampToValueAtTime(0.001, t + 0.04);
    s.connect(f);
    f.connect(g);
    g.connect(master);
    s.start(t);
  }

  private _chord(t: number, freq: number, dur: number): void {
    if (!this.ctx || !this.master) return;
    const { ctx, master } = this;
    [
      [1, 0],
      [1.498, 0.007],
      [2.003, 0.013],
    ].forEach(([ratio, det]) => {
      const o = ctx.createOscillator(),
        wf = ctx.createWaveShaper();
      const f = ctx.createBiquadFilter(),
        g = ctx.createGain();
      o.type = "sawtooth";
      o.frequency.value = freq * ratio * (1 + det);
      const cv = new Float32Array(256);
      for (let i = 0; i < 256; i++) {
        const x = i / 128 - 1;
        cv[i] = x < -0.3 ? -0.85 : x > 0.3 ? 0.85 : x * 2.8;
      }
      wf.curve = cv;
      f.type = "lowpass";
      f.frequency.value = 1400;
      f.Q.value = 1.5;
      g.gain.setValueAtTime(0.001, t);
      g.gain.linearRampToValueAtTime(0.19, t + 0.01);
      g.gain.setValueAtTime(0.17, t + dur - 0.05);
      g.gain.linearRampToValueAtTime(0.001, t + dur);
      o.connect(wf);
      wf.connect(f);
      f.connect(g);
      g.connect(master);
      o.start(t);
      o.stop(t + dur);
    });
  }

  private _sub(t: number, freq: number, dur: number): void {
    if (!this.ctx || !this.master) return;
    const { ctx, master } = this;
    const o = ctx.createOscillator(),
      g = ctx.createGain(),
      f = ctx.createBiquadFilter();
    o.type = "sine";
    o.frequency.value = freq / 2;
    f.type = "lowpass";
    f.frequency.value = 160;
    g.gain.setValueAtTime(0.001, t);
    g.gain.linearRampToValueAtTime(0.9, t + 0.01);
    g.gain.setValueAtTime(0.8, t + dur - 0.05);
    g.gain.linearRampToValueAtTime(0.001, t + dur);
    o.connect(f);
    f.connect(g);
    g.connect(master);
    o.start(t);
    o.stop(t + dur);
  }

  private _lead(t: number, freq: number, dur: number): void {
    if (!this.ctx || !this.master) return;
    const { ctx, master } = this;
    const o = ctx.createOscillator(),
      f = ctx.createBiquadFilter(),
      g = ctx.createGain();
    o.type = "square";
    o.frequency.value = freq;
    f.type = "lowpass";
    f.frequency.value = 900;
    f.Q.value = 1.2;
    g.gain.setValueAtTime(0.001, t);
    g.gain.linearRampToValueAtTime(0.09, t + 0.015);
    g.gain.setValueAtTime(0.07, t + dur - 0.04);
    g.gain.linearRampToValueAtTime(0.001, t + dur);
    o.connect(f);
    f.connect(g);
    g.connect(master);
    o.start(t);
    o.stop(t + dur);
  }

  private _schedule(bars: number): void {
    if (!this.ctx) return;
    const bpm = 100,
      beat = 60 / bpm,
      bar = beat * 4,
      h = beat * 0.5;
    const riffA: Array<[number, number]> = [
      [82.4, h],
      [87.3, h],
      [82.4, h],
      [82.4, h],
      [98, h],
      [87.3, h],
      [82.4, h],
      [73.4, h],
    ];
    const riffB: Array<[number, number]> = [
      [82.4, h],
      [82.4, h],
      [98, h],
      [110, h],
      [98, h],
      [87.3, h],
      [82.4, h],
      [87.3, h],
    ];

    for (let b = 0; b < bars; b++) {
      const t = this.sched + b * bar;
      [0, 0.25, 1.5, 2, 2.25, 3.5].forEach((off) => this._kick(t + off * beat));
      this._snare(t + beat);
      this._snare(t + beat * 3);
      this._snare(t + beat * 1.75);
      this._snare(t + beat * 2.75);
      for (let i = 0; i < 16; i++)
        this._hat(t + i * beat * 0.25, i % 4 === 0 ? 0.5 : 0.25);
      const riff = b % 4 < 2 ? riffA : riffB;
      let rt = t;
      for (const [freq, len] of riff) {
        this._chord(rt, freq, len * 0.72);
        this._sub(rt, freq, len * 0.85);
        rt += len;
      }
      if (b % 4 === 0)
        [164.8, 196, 220, 246.9, 220, 196, 174.6, 164.8].forEach((f, i) =>
          this._lead(t + i * beat * 0.5, f, beat * 0.38),
        );
    }

    this.sched += bar * bars;
    const ms = (this.sched - this.ctx.currentTime - bar) * 1000;
    this.timer = setTimeout(() => this._schedule(4), Math.max(50, ms));
  }
}
