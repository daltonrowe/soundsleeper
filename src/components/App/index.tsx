import { GlobalStyles } from "@/components/GlobalStyles";
import logo from "@/assets/img/logo.svg";
import { useRef } from "react";
import useAudioController from "@/store/AudioController";

function App() {
  const audioElement = useRef(null);
  const increase = useAudioController((state) => state.increase);
  const log = useAudioController((state) => state.log);

  const onStart = () => {
    increase(1);
    log();
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
