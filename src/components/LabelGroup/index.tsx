import styled from "@emotion/styled";

const LabelGroup = styled("div")`
  display: flex;
  width: 200px;
  flex-direction: column;

  &:not(:last-of-type) {
    margin-bottom: 20px;
  }
`;

export default LabelGroup;