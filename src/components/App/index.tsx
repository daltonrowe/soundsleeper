import { GlobalStyles } from "@/components/GlobalStyles";
import logo from "@/assets/img/logo.svg";
import { useRef } from "react";
import useAudioController from "@/store/AudioController";
import whiteNoiseUrl from "@/assets/audio/white-noise.wav";

function App() {
  const audioElement = useRef(null);
  const init = useAudioController((state) => state.init);
  const setSrc = useAudioController((state) => state.setSrc);

  const onStart = () => {
    if (audioElement.current) init(audioElement.current);
  };

  const onSetSrc = () => {
    setSrc(whiteNoiseUrl);
  };

  return (
    <GlobalStyles>
      <div className="App">
        <img src={logo} className="App-logo" alt="logo" />
        <button onClick={onStart}>Init</button>
        <button onClick={onSetSrc}>Set to White Noise</button>
        <audio ref={audioElement}></audio>
      </div>
    </GlobalStyles>
  );
}

export default App;
