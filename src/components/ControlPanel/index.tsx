import useAudioController from "@/store/AudioController";
import styled from "@emotion/styled";
import { ChangeEvent, ChangeEventHandler } from "react";

const Wrapper = styled("div")<{ disabled: boolean }>`
  pointer-events: ${(props) => (props.disabled ? "none" : "initial")};
  opacity: ${(props) => (props.disabled ? 0.2 : 1)};
  margin-top: 40px;
`;

const LabelGroup = styled("div")`
  display: flex;
  width: 200px;
  flex-direction: column;
  color: white;

  label {
    font-size: 12px;
  }

  &:not(:last-of-type) {
    margin-bottom: 30px;
  }
`;

function ControlPanel() {
  const initialized = useAudioController((state) => state.initialized);
  const setVolume = useAudioController((state) => state.setVolume);
  const setTinFreq = useAudioController((state) => state.setTinFreq);
  const setTinReduce = useAudioController((state) => state.setTinReduce);
  const setTinQ = useAudioController((state) => state.setTinQ);
  const tinFreq = useAudioController((state) => state.tinFreq);
  const tinReduce = useAudioController((state) => state.tinReduce);

  const onSetVolume = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setVolume(parseFloat(value));
  };

  const onSetTinFreq = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setTinFreq(parseInt(value));
  };

  const onSetTinReduce = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setTinReduce(parseFloat(value));
  };

  const onSetTinQ = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setTinQ(parseInt(value));
  };

  const tinFreqNormalized = () => {
    return tinFreq / 1000;
  };

  const tinReducePerc = () => {
    if (!tinReduce) return 0;
    return Math.round((tinReduce / 20) * 100);
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
          defaultValue={1}
          step={0.1}
          onChange={onSetVolume}
        ></input>
      </LabelGroup>

      <LabelGroup>
        <label htmlFor="tinEqRange">
          Tinnitus Frequency Band ({`${tinFreqNormalized()}kHz`})
        </label>
        <input
          id="tinEqRange"
          type="range"
          defaultValue={8000}
          min={0}
          max={22000}
          step={1000}
          onChange={onSetTinFreq}
        ></input>
      </LabelGroup>

      <LabelGroup>
        <label htmlFor="TinEqReduce">
          Tinnitus Band Reduction ({`${tinReducePerc()}%`})
        </label>
        <input
          id="TinEqReduce"
          type="range"
          defaultValue={0}
          min={0}
          max={20}
          step={0.2}
          onChange={onSetTinReduce}
        ></input>
      </LabelGroup>

      <LabelGroup>
        <label htmlFor="TinQ">Tinnitus Band Width</label>
        <input
          id="TinQ"
          type="range"
          defaultValue={4}
          min={0}
          max={100}
          step={5}
          onChange={onSetTinQ}
        ></input>
      </LabelGroup>
    </Wrapper>
  );
}

export default ControlPanel;
