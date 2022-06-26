import logo from "@/assets/img/logo.svg";
import useAudioController, { AudioState } from "@/store/AudioController";
import whiteNoiseUrl from "@/assets/audio/white-noise.wav";
import { Logo } from "@/components/Logo";
import { AppLayout } from "@/components/AppLayout";
import { PlaybackButton } from "@/components/PlaybackButton";
import ControlPanel from "../ControlPanel";

function App() {
  const initialized = useAudioController((state) => state.initialized);
  const audioState = useAudioController((state) => state.audioState);

  const init = useAudioController((state) => state.init);
  const fetchSrc = useAudioController((state) => state.fetchSrc);
  const play = useAudioController((state) => state.play);
  const stop = useAudioController((state) => state.stop);

  const onPlay = () => {
    if (!initialized) {
      init();
      fetchSrc(whiteNoiseUrl);
    }

    play();
  };

  const onStop = () => {
    stop();
  };

  const isPlaying = audioState === AudioState.PLAYING;

  return (
    <AppLayout>
      <Logo src={logo} alt="SoundSleeper" />

      {!isPlaying ? (
        <PlaybackButton onClick={onPlay}>Play</PlaybackButton>
      ) : (
        <PlaybackButton onClick={onStop}>Stop</PlaybackButton>
      )}

      <ControlPanel />
    </AppLayout>
  );
}

export default App;
