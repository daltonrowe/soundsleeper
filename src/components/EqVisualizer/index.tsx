import { borderRadius, greyBg } from "@/store/constants";
import styled from "@emotion/styled";

const EqWrapper = styled("div")`
  display: flex;
  justify-content: space-between;
  height: 60px;
  margin-bottom: 20px;
  overflow: hidden;
  border-radius: ${borderRadius};
`;

const EqBar = styled("div")<{ height: number }>`
  position: relative;
  flex: 1 1 auto;
  height: 100%;
  background-color: #222;

  &:after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: ${(props) => props.height * 100}%;
    background-color: #444;
  }

  &:not(:last-of-type) {
    margin-right: 1px;
  }
`;

interface EqVisualizerProps {
  freq: number;
  reduce: number;
  q: number;
}

function EqVisualizer(props: EqVisualizerProps) {
  const { freq, reduce, q } = props;

  // this math is suspect at best
  const calcHeight = (index: number): number => {
    const percReduce = 1 - reduce / 20;
    const freqBand = index * 1000;
    const distance = Math.abs(freq - freqBand) / (2000 * q);
    const bandReduce = 1 * distance + percReduce;
    return bandReduce;
  };

  return (
    <EqWrapper>
      {[...Array(22).keys()].map((key) => (
        <EqBar key={`eq-bar-${key}`} height={calcHeight(key)}></EqBar>
      ))}
    </EqWrapper>
  );
}

export default EqVisualizer;
