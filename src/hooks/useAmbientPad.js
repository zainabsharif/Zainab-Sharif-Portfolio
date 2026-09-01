import { useEffect, useRef, useState } from "react";

const PAD_NOTES = [261.63, 329.63, 392.0, 493.88]; // C4 E4 G4 B4 — soft sustained bed
const LEAD_SCALE = [523.25, 587.33, 659.25, 783.99, 880.0, 783.99, 659.25, 587.33]; // C5 D5 E5 G5 A5 G5 E5 D5 — gentle up/down wander
const HARMONICS = [1, 2, 3]; // drawbar-style stacked octaves for an organ-like timbre
const HARMONIC_LEVELS = [1, 0.4, 0.16];
const VOLUME = 0.08;
const LEAD_GLIDE = 2.6; // seconds per note-to-note glide
const TICK_INTERVAL = 1; // seconds between clock ticks

export function useAmbientPad() {
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const ctxRef = useRef(null);
  const nodesRef = useRef(null);
  const mutedRef = useRef(false);
  const leadTimeoutRef = useRef(null);
  const tickTimeoutRef = useRef(null);

  const start = () => {
    if (!ctxRef.current) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      ctxRef.current = new AudioCtx();
    }
    const ctx = ctxRef.current;
    if (ctx.state === "suspended") ctx.resume();
    if (nodesRef.current) return;

    const master = ctx.createGain();
    master.gain.value = 0;
    master.connect(ctx.destination);
    master.gain.linearRampToValueAtTime(mutedRef.current ? 0 : VOLUME, ctx.currentTime + 2.5);

    const filter = ctx.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.value = 2200;
    filter.connect(master);

    const filterLfo = ctx.createOscillator();
    filterLfo.frequency.value = 0.04;
    const filterLfoGain = ctx.createGain();
    filterLfoGain.gain.value = 220;
    filterLfo.connect(filterLfoGain);
    filterLfoGain.connect(filter.frequency);
    filterLfo.start();

    const delay = ctx.createDelay(2);
    delay.delayTime.value = 0.55;
    const feedback = ctx.createGain();
    feedback.gain.value = 0.24;
    delay.connect(feedback);
    feedback.connect(delay);
    filter.connect(delay);
    delay.connect(master);

    // sustained organ-style pad — each note is 3 stacked harmonics (drawbar style), gently breathing
    const oscillators = PAD_NOTES.map((freq, i) => {
      const base = 0.6 / PAD_NOTES.length;
      const pan = (i / (PAD_NOTES.length - 1)) * 1.4 - 0.7;

      const g = ctx.createGain();
      g.gain.value = 0;
      g.gain.linearRampToValueAtTime(base, ctx.currentTime + 3);

      const vibrato = ctx.createOscillator();
      vibrato.frequency.value = 0.08 + i * 0.015;
      const vibratoGain = ctx.createGain();
      vibratoGain.gain.value = 2.5;
      vibrato.start();

      const swell = ctx.createOscillator();
      swell.frequency.value = 0.025 + i * 0.011;
      const swellGain = ctx.createGain();
      swellGain.gain.value = base * 0.3;
      swell.connect(swellGain);
      swellGain.connect(g.gain);
      swell.start();

      const panner = ctx.createStereoPanner ? ctx.createStereoPanner() : null;
      if (panner) panner.pan.value = pan;

      const harmonicOscs = HARMONICS.map((mult, h) => {
        const osc = ctx.createOscillator();
        osc.type = "sine";
        osc.frequency.value = freq * mult;
        osc.detune.value = (i - PAD_NOTES.length / 2) * 4;
        vibratoGain.connect(osc.detune);

        const hg = ctx.createGain();
        hg.gain.value = HARMONIC_LEVELS[h];
        osc.connect(hg);
        hg.connect(g);
        osc.start();
        return osc;
      });
      vibrato.connect(vibratoGain);

      if (panner) {
        g.connect(panner);
        panner.connect(filter);
      } else {
        g.connect(filter);
      }

      return { g, vibrato, swell, harmonicOscs };
    });

    // sweet, light lead voice that glides up and down through a gentle scale
    const lead = ctx.createOscillator();
    lead.type = "sine";
    lead.frequency.value = LEAD_SCALE[0];

    const shimmer = ctx.createOscillator(); // soft octave-up glassy layer
    shimmer.type = "sine";
    shimmer.frequency.value = LEAD_SCALE[0] * 2;

    const leadGain = ctx.createGain();
    leadGain.gain.value = 0;
    leadGain.gain.linearRampToValueAtTime(0.045, ctx.currentTime + 3);

    const shimmerGain = ctx.createGain();
    shimmerGain.gain.value = 0.011;

    lead.connect(leadGain);
    shimmer.connect(shimmerGain);
    leadGain.connect(filter);
    shimmerGain.connect(filter);
    lead.start();
    shimmer.start();

    let leadIndex = 0;
    const scheduleLead = () => {
      leadIndex = (leadIndex + 1) % LEAD_SCALE.length;
      const freq = LEAD_SCALE[leadIndex];
      const now = ctx.currentTime;
      lead.frequency.cancelScheduledValues(now);
      lead.frequency.setValueAtTime(lead.frequency.value, now);
      lead.frequency.linearRampToValueAtTime(freq, now + LEAD_GLIDE);
      shimmer.frequency.cancelScheduledValues(now);
      shimmer.frequency.setValueAtTime(shimmer.frequency.value, now);
      shimmer.frequency.linearRampToValueAtTime(freq * 2, now + LEAD_GLIDE);
      leadTimeoutRef.current = setTimeout(scheduleLead, LEAD_GLIDE * 1000);
    };
    leadTimeoutRef.current = setTimeout(scheduleLead, LEAD_GLIDE * 1000);

    // soft ticking-clock pulse underneath, dry and crisp — kept out of the reverb wash
    const scheduleTick = () => {
      const now = ctx.currentTime;
      const tickOsc = ctx.createOscillator();
      tickOsc.type = "sine";
      tickOsc.frequency.value = 1046.5;
      const tickGain = ctx.createGain();
      tickGain.gain.setValueAtTime(0, now);
      tickGain.gain.linearRampToValueAtTime(0.16, now + 0.004);
      tickGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.1);
      tickOsc.connect(tickGain);
      tickGain.connect(master);
      tickOsc.start(now);
      tickOsc.stop(now + 0.12);
      tickTimeoutRef.current = setTimeout(scheduleTick, TICK_INTERVAL * 1000);
    };
    tickTimeoutRef.current = setTimeout(scheduleTick, TICK_INTERVAL * 1000);

    nodesRef.current = { master, filterLfo, oscillators, lead, shimmer };
  };

  const stop = () => {
    const ctx = ctxRef.current;
    const nodes = nodesRef.current;
    if (leadTimeoutRef.current) {
      clearTimeout(leadTimeoutRef.current);
      leadTimeoutRef.current = null;
    }
    if (tickTimeoutRef.current) {
      clearTimeout(tickTimeoutRef.current);
      tickTimeoutRef.current = null;
    }
    if (!ctx || !nodes) return;
    const now = ctx.currentTime;
    nodes.master.gain.cancelScheduledValues(now);
    nodes.master.gain.setValueAtTime(nodes.master.gain.value, now);
    nodes.master.gain.linearRampToValueAtTime(0, now + 0.8);
    setTimeout(() => {
      nodes.oscillators.forEach(({ vibrato, swell, harmonicOscs }) => {
        vibrato.stop();
        swell.stop();
        harmonicOscs.forEach((osc) => osc.stop());
      });
      nodes.lead.stop();
      nodes.shimmer.stop();
      nodes.filterLfo.stop();
    }, 900);
    nodesRef.current = null;
  };

  const toggle = () => {
    setPlaying((p) => {
      const next = !p;
      if (next) start();
      else stop();
      return next;
    });
  };

  const toggleMute = () => {
    setMuted((m) => {
      const next = !m;
      mutedRef.current = next;
      const ctx = ctxRef.current;
      const nodes = nodesRef.current;
      if (ctx && nodes) {
        nodes.master.gain.cancelScheduledValues(ctx.currentTime);
        nodes.master.gain.linearRampToValueAtTime(next ? 0 : VOLUME, ctx.currentTime + 0.25);
      }
      return next;
    });
  };

  useEffect(() => {
    return () => {
      stop();
      ctxRef.current?.close();
    };
  }, []);

  return { playing, muted, toggle, toggleMute };
}
