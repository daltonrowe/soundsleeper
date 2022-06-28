import useAudioController from "@/store/AudioController";
import styled from "@emotion/styled";
import { ChangeEvent } from "react";
import LabelGroup from "../LabelGroup";
import SectionWrapper from "../SectionWrapper";

const StyledSelect = styled("select")`
  padding: 10px;
`;

function MainControls() {
  const setVolume = useAudioController((state) => state.setVolume);
  const gain = useAudioController((state) => state.gain);

  const onSetVolume = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setVolume(parseFloat(value));
  };

  const gainPerc = () => {
    return gain * 100;
  };

  return (
    <SectionWrapper>
      <LabelGroup>
        <label htmlFor="soundSelect">Sounds</label>
        <StyledSelect name="soundSelect" id="soundSelect">
          <option value="white-noise">White Noise</option>
        </StyledSelect>
      </LabelGroup>

      <LabelGroup>
        <label htmlFor="masterVolume">Volume ({`${gainPerc()}%`})</label>
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
    </SectionWrapper>
  );
}

export default MainControls;
