import useAudioController, { AudioState } from "@/store/AudioController";
import whiteNoiseUrl from "@/assets/audio/white-noise.wav";
import playIcon from "@/assets/img/play.svg";
import pauseIcon from "@/assets/img/pause.svg";

import {
  borderRadius,
  greyActiveBg,
  greyBg,
  greyHoverBg,
} from "@/store/constants";
import styled from "@emotion/styled";

export const PlaybackButton = styled("button")`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 200px;
  height: 100px;
  appearance: none;
  border: none;
  border-radius: ${borderRadius};
  background: ${greyBg};
  cursor: pointer;

  &:hover {
    background: ${greyHoverBg};
  }

  &:active {
    background: ${greyActiveBg};
  }

  img {
    height: 40%;
    width: auto;
  }
`;

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
