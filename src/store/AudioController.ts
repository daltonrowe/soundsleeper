import create from 'zustand'

interface AudioControllerState {
  audioRef: HTMLAudioElement | null;
  audioContext: AudioContext | null;
  gainNode: GainNode | null;
  audioSource: AudioBufferSourceNode | null;

  init: () => void;
  fetchSrc: (url: string) => void;
  play: () => void;
}

const useAudioController = create<AudioControllerState>()((set, get) => ({
  audioRef: null,
  audioContext: null,
  gainNode: null,
  audioSource: null,

  init: () => set((state) => {
    if (state.audioContext) return {}; // context has already been created

    const audioContext = new AudioContext(); 
    const audioSource = audioContext.createBufferSource();
    audioSource.loop = true
    const gainNode = audioContext.createGain();

    audioSource
    .connect(gainNode)
    .connect(audioContext.destination)

    return {
      audioContext,
      audioSource,
      gainNode
    }
  }),

  fetchSrc: async (url) => {
    const audioContext = get().audioContext;
    const audioSource = get().audioSource;
    if (!audioContext || !audioSource) return;

    const response = await fetch(url);
    const arrayBuffer = await response.arrayBuffer();
    const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
    audioSource.buffer = audioBuffer
  },

  play: () => {
    const audioSource = get().audioSource;
    if (!audioSource) return

    audioSource.start()
  }
}))

export default useAudioController;