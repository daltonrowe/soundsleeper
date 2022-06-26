import create from "zustand";

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
  tinFreq: 8000,
  tinReduce: 0,
  tinQ: 4,

  init: () => {
    const prevAudioContext = get().audioContext;
    if (prevAudioContext) return; // context has already been created

    const audioContext = new AudioContext();

    const audioSource = audioContext.createBufferSource();
    audioSource.loop = true;

    const gainNode = audioContext.createGain();

    const eqNode = audioContext.createBiquadFilter();
    eqNode.type = "peaking";
    eqNode.frequency.value = 8000;
    eqNode.Q.value = 4;

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
    if (!gainNode) return;

    gainNode.gain.value = gain;
  },

  setTinFreq: (khz) => {
    const { eqNode } = get();
    if (!eqNode) return;

    eqNode.frequency.value = khz;
    set({ tinFreq: khz });
  },

  setTinReduce: (gain) => {
    const { eqNode } = get();
    if (!eqNode) return;

    eqNode.gain.value = gain * -1;
    set({ tinReduce: gain });
  },

  setTinQ: (q) => {
    const { eqNode } = get();
    if (!eqNode) return;

    eqNode.Q.value = 6 - q;
    set({ tinQ: q });
  },
}));

export default useAudioController;
