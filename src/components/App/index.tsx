import logo from "@/assets/img/logo.svg";
import { Logo } from "@/components/Logo";
import { AppLayout, AppLayoutInner } from "@/components/AppLayout";
import EqControls from "@/components/EqControls";
import PlaybackControls from "@/components/PlaybackControls";
import MainControls from "../MainControls";
import Accordian from "../Accordian";
import SectionWrapper from "../SectionWrapper";

function App() {
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
