import useAudioController, { AudioState } from "@/store/AudioController";
import whiteNoiseUrl from "@/assets/audio/white-noise.wav";
import { PlaybackButton } from "@/components/PlaybackButton";
import playIcon from "@/assets/img/play.svg";
import pauseIcon from "@/assets/img/pause.svg";

function PlaybackControls() {
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
    <>
      {!isPlaying ? (
        <PlaybackButton onClick={onPlay}>
          <img src={playIcon} />
        </PlaybackButton>
      ) : (
        <PlaybackButton onClick={onStop}>
          <img src={pauseIcon} />
        </PlaybackButton>
      )}
    </>
  );
}

export default PlaybackControls;
