import useAudioController from "@/store/AudioController";
import styled from "@emotion/styled";
import { ChangeEvent, ChangeEventHandler } from "react";

const Wrapper = styled("div")<{ disabled: boolean }>`
  pointer-events: ${(props) => (props.disabled ? "none" : "initial")};
  opacity: ${(props) => (props.disabled ? 0.2 : 1)};
  margin-top: 20px;
`;

const LabelGroup = styled("div")`
  display: flex;
  flex-direction: column;
  color: white;
`;

function ControlPanel() {
  const initialized = useAudioController((state) => state.initialized);
  const setVolume = useAudioController((state) => state.setVolume);

  const onSetVolume = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setVolume(parseFloat(value));
  };

  return (
    <Wrapper disabled={!initialized}>
      <LabelGroup>
        <label htmlFor="masterVolume">Volume</label>
        <input
          id="masterVolume"
          type="range"
          min={0}
          max={1}
          step={0.1}
          onChange={onSetVolume}
        ></input>
      </LabelGroup>
    </Wrapper>
  );
}

export default ControlPanel;
