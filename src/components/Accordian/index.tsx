import { appWidth } from "@/store/constants";
import styled from "@emotion/styled";
import { useState } from "react";

const AccordianWrapper = styled("div")`
  width: ${appWidth}px;
`;

const AccordianInner = styled("div")<{ $open: boolean }>`
  display: ${(props) => (props.$open ? "block" : "none")};
`;

const AccordianTitle = styled("span")<{ $open: boolean }>`
  display: flex;
  justify-content: space-between;
  text-align: left;
  font-size: 14px;
  color: white;
  cursor: pointer;
  padding: 10px 0;
  margin-bottom: ${(props) => (props.$open ? "20" : "0")}px;

  &:hover {
    &:after {
      text-decoration: none;
      opacity: 0.6;
    }
  }

  &:after {
    content: "▲";
    transform: rotate(${(props) => (props.$open ? "0" : "180")}deg);
  }
`;

interface AccordianProps {
  title: string;
  children: JSX.Element;
}

function Accordian(props: AccordianProps) {
  const { title, children } = props;
  const [open, setOpen] = useState<boolean>(false);

  const onAccordianClick = () => {
    setOpen(!open);
  };

  return (
    <AccordianWrapper>
      <AccordianTitle $open={open} onClick={onAccordianClick}>
        {title}
      </AccordianTitle>
      <AccordianInner $open={open}>{children}</AccordianInner>
    </AccordianWrapper>
  );
}

export default Accordian;
