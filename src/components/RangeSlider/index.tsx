import { accent, borderRadius, greyBg } from "@/store/constants";
import styled from "@emotion/styled";

export const RangeSlider = styled("input")`
  appearance: none;
  background: ${greyBg};
  outline: none;
  border-radius: ${borderRadius};
  overflow: hidden;
  cursor: pointer;

  &::-webkit-slider-thumb {
    background: ${accent};
    width: 20px;
    height: 30px;
    appearance: none;
  }
`;
