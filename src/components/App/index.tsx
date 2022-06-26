import { GlobalStyles } from "@/components/GlobalStyles";
import logo from "@/assets/img/logo.svg";
import { useRef } from "react";
import useAudioController from "@/store/AudioController";
import whiteNoiseUrl from "@/assets/audio/white-noise.wav";

function App() {
  const audioElement = useRef(null);
  const init = useAudioController((state) => state.init);
  const setSrc = useAudioController((state) => state.setSrc);
  const play = useAudioController((state) => state.play);

  const onStart = () => {
    if (audioElement.current) init(audioElement.current);
  };

  const onSetSrc = () => {
    setSrc(whiteNoiseUrl);
  };

  const onPlay = () => {
    play();
  };

  return (
    <GlobalStyles>
      <div className="App">
        <img src={logo} className="App-logo" alt="logo" />
        <button onClick={onStart}>Init</button>
        <button onClick={onSetSrc}>White Noise</button>
        <button onClick={onPlay}>Play</button>
        <audio ref={audioElement} loop={true}></audio>
      </div>
    </GlobalStyles>
  );
}

export default App;
