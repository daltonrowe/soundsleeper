import { useRef, useEffect } from "react";
import useAudioController, { AudioState } from "@/store/AudioController";
import whiteNoiseUrl from "@/assets/audio/white-noise.wav";
import playIcon from "@/assets/img/play.svg";
import pauseIcon from "@/assets/img/pause.svg";
import silenceUrl from "@/assets/audio/silence.mp3";
import mediasessionImage from "@/assets/img/mediasession.png";

import { appWidth, borderRadius, greyBg, greyHoverBg } from "@/store/constants";
import styled from "@emotion/styled";

export const PlaybackButton = styled("button")`
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${appWidth}px;
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
    /* no bg for better touch appearance */
    background: ${greyBg};
  }

  img {
    height: 40%;
    width: auto;
  }
`;

// hidden audio element allows play in silent mode
const HiddenAudio = styled("audio")`
  display: none;
`;

function PlaybackControls() {
  const hiddenAudioRef = useRef<HTMLAudioElement | null>(null);
  const initialized = useAudioController((state) => state.initialized);
  const audioState = useAudioController((state) => state.audioState);

  const init = useAudioController((state) => state.init);
  const fetchSrc = useAudioController((state) => state.fetchSrc);
  const play = useAudioController((state) => state.play);
  const stop = useAudioController((state) => state.stop);

  const isPlaying = audioState === AudioState.PLAYING;
  const buttonIcon = !isPlaying ? playIcon : pauseIcon;

  const onButtonClick = () => {
    if (!initialized) {
      init(hiddenAudioRef.current);
      fetchSrc(whiteNoiseUrl);
    }

    !isPlaying ? play() : stop();
  };

  useEffect(() => {
    if ("mediaSession" in navigator) {
      navigator.mediaSession.metadata = new MediaMetadata({
        title: "Soundsleeper",
        artist: "",
        album: "",
        artwork: [
          {
            src: mediasessionImage,
            sizes: "627x627",
            type: "image/png",
          },
        ],
      });

      navigator.mediaSession.setActionHandler("play", play);
      navigator.mediaSession.setActionHandler("pause", stop);
    }
  }, [play, stop]);

  useEffect(() => {
    if ("mediaSession" in navigator) {
      if (audioState === AudioState.PLAYING) {
        navigator.mediaSession.playbackState = "playing";
        hiddenAudioRef.current?.play();
      } else {
        navigator.mediaSession.playbackState = "paused";
        hiddenAudioRef.current?.pause();
      }
    }
  }, [audioState]);

  return (
    <>
      <PlaybackButton onClick={onButtonClick}>
        <img src={buttonIcon} />
      </PlaybackButton>
      <HiddenAudio ref={hiddenAudioRef} src={silenceUrl} loop></HiddenAudio>
    </>
  );
}

export default PlaybackControls;
