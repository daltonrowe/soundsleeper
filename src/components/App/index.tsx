import { GlobalStyles } from "@/components/GlobalStyles";
import logo from "@/assets/img/logo.svg";
import { useRef } from "react";
import useAudioController from "@/store/AudioController";
import whiteNoiseUrl from "@/assets/audio/white-noise.wav";

function App() {
  const audioElement = useRef(null);
  const init = useAudioController((state) => state.init);
  const fetchSrc = useAudioController((state) => state.fetchSrc);
  const play = useAudioController((state) => state.play);
  const stop = useAudioController((state) => state.stop);

  const onStart = () => {
    init();
  };

  const onFetchSrc = () => {
    fetchSrc(whiteNoiseUrl);
  };

  const onPlay = () => {
    play();
  };

  const onStop = () => {
    stop();
  };

  return (
    <GlobalStyles>
      <div className="App">
        <img src={logo} className="App-logo" alt="logo" />
        <button onClick={onStart}>Init</button>
        <button onClick={onFetchSrc}>White Noise</button>
        <button onClick={onPlay}>Play</button>
        <button onClick={onStop}>Stop</button>
      </div>
    </GlobalStyles>
  );
}

export default App;
