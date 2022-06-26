import { GlobalStyles } from "@/components/GlobalStyles";
import logo from "@/assets/img/logo.svg";

function App() {
  return (
    <GlobalStyles>
      <div className="App">
        <img src={logo} className="App-logo" alt="logo" />
      </div>
    </GlobalStyles>
  );
}

export default App;
