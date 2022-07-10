import styled from "@emotion/styled";

export const AppLayout = styled("div")`
  width: 100vw;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-image: linear-gradient(to top left, #333, #111);
`;

export const AppLayoutInner = styled("div")`
  padding-bottom: 40px;
`;
