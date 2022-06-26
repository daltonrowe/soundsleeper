import { borderRadius } from "@/constants";
import styled from "@emotion/styled";

export const PlaybackButton = styled("button")`
  display: block;
  width: 200px;
  height: 100px;
  appearance: none;
  border: none;
  border-radius: ${borderRadius};
  background: #666;
  cursor: pointer;

  &:hover {
    background: #777;
  }

  &:active {
    background: #555;
  }
`;
