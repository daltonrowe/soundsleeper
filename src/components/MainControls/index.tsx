import useAudioController from "@/store/AudioController";
import {
  borderRadius,
  greyActiveBg,
  greyBg,
  greyHoverBg,
} from "@/store/constants";
import styled from "@emotion/styled";
import { ChangeEvent } from "react";
import Label from "../Label";
import LabelGroup from "../LabelGroup";
import { RangeSlider } from "../RangeSlider";
import SectionWrapper from "../SectionWrapper";

const StyledSelect = styled("select")`
  padding: 10px;
  appearance: none;
  background: transparent;
  color: white;
  border: 2px solid #666;
  border-radius: ${borderRadius};
  border: 2px solid ${greyBg};
  cursor: pointer;

  &:hover {
    border: 2px solid ${greyHoverBg};
  }

  &:active {
    border: 2px solid ${greyActiveBg};
  }
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
        <Label htmlFor="soundSelect">Track</Label>
        <StyledSelect name="soundSelect" id="soundSelect">
          <option value="white-noise">White Noise</option>
        </StyledSelect>
      </LabelGroup>

      <LabelGroup>
        <Label htmlFor="masterVolume">Volume ({`${gainPerc()}%`})</Label>
        <RangeSlider
          id="masterVolume"
          type="range"
          min={0}
          max={1}
          defaultValue={1}
          step={0.1}
          onChange={onSetVolume}
        ></RangeSlider>
      </LabelGroup>
    </SectionWrapper>
  );
}

export default MainControls;
