import create from "zustand";
import {
  initialGain,
  initialTinFreq,
  initialTinQ,
  initialTinReduce,
} from "./constants";

export enum AudioState {
  NOTSTARTED = "NOTSTARTED",
  PLAYING = "PLAYING",
  STOPPED = "STOPPED",
}

interface AudioControllerState {
  initialized: boolean;
  audioState: AudioState;
  audioRef: HTMLAudioElement | null;
  audioContext: AudioContext | null;
  audioSource: AudioBufferSourceNode | null;
  audioSourceData: AudioBuffer | null;
  gainNode: GainNode | null;
  gain: number;
  eqNode: BiquadFilterNode | null;
  tinFreq: number;
  tinReduce: number;
  tinQ: number;

  init: () => void;
  fetchSrc: (url: string) => void;
  play: () => void;
  stop: () => void;
  setVolume: (gain: number) => void;
  setTinFreq: (khz: number) => void;
  setTinReduce: (gain: number) => void;
  setTinQ: (q: number) => void;
}

const useAudioController = create<AudioControllerState>()((set, get) => ({
  initialized: false,
  audioState: AudioState.NOTSTARTED,
  audioRef: null,
  audioContext: null,
  gainNode: null,
  eqNode: null,
  audioSource: null,
  audioSourceData: null,
  gain: initialGain,
  tinFreq: initialTinFreq,
  tinReduce: initialTinReduce,
  tinQ: initialTinQ,

  init: () => {
    const prevAudioContext = get().audioContext;
    const { gain, tinFreq, tinReduce, tinQ } = get();
    if (prevAudioContext) return; // context has already been created

    // @ts-ignore
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    const audioContext = new AudioContext();

    const audioSource = audioContext.createBufferSource();
    audioSource.loop = true;

    const gainNode = audioContext.createGain();
    gainNode.gain.value = gain;

    const eqNode = audioContext.createBiquadFilter();
    eqNode.type = "peaking";
    eqNode.frequency.value = tinFreq;
    eqNode.gain.value = tinReduce * -1;
    eqNode.Q.value = tinQ;

    audioSource
      .connect(gainNode)
      .connect(eqNode)
      .connect(audioContext.destination);

    set({
      audioContext,
      audioSource,
      gainNode,
      eqNode,
      initialized: true,
    });
  },

  fetchSrc: async (url) => {
    const { audioContext, audioSource } = get();
    if (!audioContext || !audioSource || audioSource.buffer) return;

    const response = await fetch(url);
    const arrayBuffer = await response.arrayBuffer();
    const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);

    audioSource.buffer = audioBuffer;
    set({ audioSourceData: audioBuffer });
  },

  play: () => {
    const { audioSource, audioContext, audioState, gainNode } = get();
    if (!audioSource || !audioContext || !gainNode) return;

    switch (audioState) {
      case AudioState.NOTSTARTED:
        audioSource.start();
        break;

      case AudioState.STOPPED:
        audioSource.connect(gainNode);
        break;

      default:
        // do nothing
        break;
    }

    set({ audioState: AudioState.PLAYING });
  },

  stop: () => {
    const { audioSource } = get();
    if (!audioSource) return;

    audioSource.disconnect();
    set({ audioState: AudioState.STOPPED });
  },

  setVolume: (gain) => {
    const { gainNode } = get();
    set({ gain });

    if (!gainNode) return;
    gainNode.gain.value = gain;
  },

  setTinFreq: (khz) => {
    const { eqNode } = get();
    set({ tinFreq: khz });

    if (!eqNode) return;
    eqNode.frequency.value = khz;
  },

  setTinReduce: (gain) => {
    const { eqNode } = get();
    set({ tinReduce: gain });

    if (!eqNode) return;
    eqNode.gain.value = gain * -1;
  },

  setTinQ: (q) => {
    const { eqNode } = get();
    set({ tinQ: q });

    if (!eqNode) return;
    eqNode.Q.value = 10 - q;
  },
}));

export default useAudioController;
