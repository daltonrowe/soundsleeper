import logo from "@/assets/img/logo.svg";
import { Logo } from "@/components/Logo";
import { AppLayout, AppLayoutInner } from "@/components/AppLayout";
import EqControls from "@/components/EqControls";
import PlaybackControls from "@/components/PlaybackControls";
import MainControls from "../MainControls";
import Accordian from "../Accordian";
import SectionWrapper from "../SectionWrapper";
import { useEffect } from "react";
import useAudioController from "@/store/AudioController";

function App() {
  const loadFromLocalStorage = useAudioController(
    (state) => state.loadFromLocalStorage
  );

  useEffect(() => {
    loadFromLocalStorage();
  }, []);

  return (
    <AppLayout>
      <AppLayoutInner>
        <Logo src={logo} alt="SoundSleeper" />
        <PlaybackControls />
        <MainControls />
        <SectionWrapper>
          <Accordian title="Tinnitus EQ">
            <EqControls />
          </Accordian>
        </SectionWrapper>
      </AppLayoutInner>
    </AppLayout>
  );
}

export default App;
