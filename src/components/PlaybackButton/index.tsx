import { borderRadius } from "@/constants";
import styled from "@emotion/styled";

export const PlaybackButton = styled("button")`
  display: block;
  width: 150px;
  height: 150px;
  appearance: none;
  border: none;
  border-radius: 50%;
  background: #666;
  cursor: pointer;

  &:hover {
    background: #777;
  }

  &:active {
    background: #555;
  }
`;
