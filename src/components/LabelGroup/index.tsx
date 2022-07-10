import { appWidth } from "@/store/constants";
import styled from "@emotion/styled";

const LabelGroup = styled("div")`
  display: flex;
  width: ${appWidth}px;
  flex-direction: column;

  &:not(:last-of-type) {
    margin-bottom: 20px;
  }
`;

export default LabelGroup;
