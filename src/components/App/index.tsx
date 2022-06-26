import logo from "@/assets/img/logo.svg";
import { Logo } from "@/components/Logo";
import { AppLayout } from "@/components/AppLayout";
import EqControls from "@/components/EqControls";
import PlaybackControls from "@/components/PlaybackControls";

function App() {
  return (
    <AppLayout>
      <Logo src={logo} alt="SoundSleeper" />
      <PlaybackControls />
      <EqControls />
    </AppLayout>
  );
}

export default App;
