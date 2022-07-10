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
  saveTimer: ReturnType<typeof setTimeout> | null;

  init: (audioRef: HTMLAudioElement | null) => void;
  fetchSrc: (url: string) => void;
  play: () => void;
  stop: () => void;
  setVolume: (gain: number) => void;
  setTinFreq: (khz: number) => void;
  setTinReduce: (gain: number) => void;
  setTinQ: (q: number) => void;
  saveToLocalStorage: () => void;
  loadFromLocalStorage: () => void;
  triggerSave: () => void;
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
  saveTimer: null,

  init: (audioRef: HTMLAudioElement | null) => {
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

    if (audioRef) audioRef.volume = 0;

    set({
      audioRef,
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
    const { audioRef, audioSource, audioContext, audioState, gainNode } = get();
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

    if (audioRef) audioRef.play();
    set({ audioState: AudioState.PLAYING });
  },

  stop: () => {
    const { audioSource, audioRef } = get();
    if (!audioSource) return;

    audioSource.disconnect();

    if (audioRef) audioRef.pause();
    set({ audioState: AudioState.STOPPED });
  },

  setVolume: (gain) => {
    const { gainNode, triggerSave } = get();
    set({ gain });
    triggerSave();

    if (!gainNode) return;
    gainNode.gain.value = gain;
  },

  setTinFreq: (khz) => {
    const { eqNode, triggerSave } = get();
    set({ tinFreq: khz });
    triggerSave();

    if (!eqNode) return;
    eqNode.frequency.value = khz;
  },

  setTinReduce: (gain) => {
    const { eqNode, triggerSave } = get();
    set({ tinReduce: gain });
    triggerSave();

    if (!eqNode) return;
    eqNode.gain.value = gain * -1;
  },

  setTinQ: (q) => {
    const { eqNode, triggerSave } = get();
    set({ tinQ: q });
    triggerSave();

    if (!eqNode) return;
    eqNode.Q.value = 10 - q;
  },

  saveToLocalStorage: () => {
    const { gain, tinFreq, tinReduce, tinQ } = get();

    const dataToSave = {
      gain,
      tinFreq,
      tinReduce,
      tinQ,
    };

    window.localStorage.setItem(
      "soundsleeper_settings",
      JSON.stringify(dataToSave)
    );
  },

  loadFromLocalStorage: () => {
    const { setVolume, setTinFreq, setTinReduce, setTinQ } = get();

    const rawDataToLoad = window.localStorage.getItem("soundsleeper_settings");
    if (!rawDataToLoad) return;

    try {
      const dataToLoad = JSON.parse(rawDataToLoad);
      setVolume(dataToLoad.gain);
      setTinFreq(dataToLoad.tinFreq);
      setTinReduce(dataToLoad.tinReduce);
      setTinQ(dataToLoad.tinQ);
      console.log("settings loaded!");
    } catch (err) {
      console.error("Error loading settings");
      window.localStorage.setItem("soundsleeper_settings", JSON.stringify({}));
    }
  },

  triggerSave: () => {
    let { saveTimer, saveToLocalStorage } = get();
    if (saveTimer) clearTimeout(saveTimer);

    set({
      saveTimer: setTimeout(() => {
        saveToLocalStorage();
      }, 500),
    });
  },
}));

export default useAudioController;
