import { GlobalStyles } from "@/components/GlobalStyles";
import logo from "@/assets/img/logo.svg";
import { useRef } from "react";
import useAudioController from "@/store/AudioController";

function App() {
  const audioElement = useRef(null);
  const init = useAudioController((state) => state.init);

  const onStart = () => {
    if (audioElement.current) init(audioElement.current);
  };

  return (
    <GlobalStyles>
      <div className="App">
        <img src={logo} className="App-logo" alt="logo" />
      </div>
      <button onClick={onStart}>Start</button>
      <audio ref={audioElement}></audio>
    </GlobalStyles>
  );
}

export default App;
