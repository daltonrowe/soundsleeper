import create from 'zustand'

interface AudioControllerState {
  audioRef: HTMLAudioElement | null;
  audioContext: AudioContext | null;
  track: MediaElementAudioSourceNode | null;
  gainNode: GainNode | null;
  init: (audioRef: HTMLAudioElement) => void;
  setSrc: (url: string) => void;
  play: () => void;
}

const useAudioController = create<AudioControllerState>()((set, get) => ({
  audioRef: null,
  audioContext: null,
  track: null,
  gainNode: null,

  init: (audioRef) => set((state) => {
    if (state.audioContext) return {}; // context has already been created

    const audioContext = new AudioContext(); 
    const track = audioContext.createMediaElementSource(audioRef)
    const gainNode = audioContext.createGain();

    track
    .connect(gainNode)
    .connect(audioContext.destination)

    return {
      audioContext,
      audioRef,
      track,
      gainNode
    }
  }),

  setSrc: (url) => {
    const audioRef = get().audioRef;
    if (!audioRef) return;

    audioRef.src = url;
  },

  play: () => {
    const audioRef = get().audioRef;
    if (!audioRef) return;

    audioRef.play()
  }
}))

export default useAudioController;