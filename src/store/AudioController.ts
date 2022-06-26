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

  init: () => void;
  fetchSrc: (url: string) => void;
  play: () => void;
  stop: () => void;
  setVolume: (gain: number) => void;
}

const useAudioController = create<AudioControllerState>()((set, get) => ({
  initialized: false,
  audioState: AudioState.NOTSTARTED,
  audioRef: null,
  audioContext: null,
  gainNode: null,
  audioSource: null,
  audioSourceData: null,

  init: () => {
    const prevAudioContext = get().audioContext;
    if (prevAudioContext) return; // context has already been created

    const audioContext = new AudioContext();
    const audioSource = audioContext.createBufferSource();
    audioSource.loop = true;
    const gainNode = audioContext.createGain();

    audioSource.connect(gainNode).connect(audioContext.destination);

    set({
      audioContext,
      audioSource,
      gainNode,
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
}));

export default useAudioController;
