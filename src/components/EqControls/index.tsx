import useAudioController from "@/store/AudioController";
import styled from "@emotion/styled";
import { ChangeEvent } from "react";
import LabelGroup from "../LabelGroup";
import SectionWrapper from "../SectionWrapper";

function EqControls() {
  const setTinFreq = useAudioController((state) => state.setTinFreq);
  const setTinReduce = useAudioController((state) => state.setTinReduce);
  const setTinQ = useAudioController((state) => state.setTinQ);
  const tinFreq = useAudioController((state) => state.tinFreq);
  const tinReduce = useAudioController((state) => state.tinReduce);

  const onSetTinFreq = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setTinFreq(parseInt(value));
  };

  const onSetTinReduce = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setTinReduce(parseFloat(value));
  };

  const onSetTinQ = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setTinQ(parseInt(value));
  };

  const tinFreqNormalized = () => {
    return tinFreq / 1000;
  };

  const tinReducePerc = () => {
    if (!tinReduce) return 0;
    return Math.round((tinReduce / 20) * 100);
  };

  return (
    <SectionWrapper>
      <LabelGroup>
        <label htmlFor="tinEqRange">
          Tinnitus Frequency Band ({`${tinFreqNormalized()}kHz`})
        </label>
        <input
          id="tinEqRange"
          type="range"
          defaultValue={8000}
          min={0}
          max={22000}
          step={1000}
          onChange={onSetTinFreq}
        ></input>
      </LabelGroup>

      <LabelGroup>
        <label htmlFor="TinEqReduce">
          Tinnitus Band Reduction ({`${tinReducePerc()}%`})
        </label>
        <input
          id="TinEqReduce"
          type="range"
          defaultValue={16}
          min={0}
          max={20}
          step={0.2}
          onChange={onSetTinReduce}
        ></input>
      </LabelGroup>

      <LabelGroup>
        <label htmlFor="TinQ">Tinnitus Band Width</label>
        <input
          id="TinQ"
          type="range"
          defaultValue={4}
          min={0}
          max={9.8}
          step={0.2}
          onChange={onSetTinQ}
        ></input>
      </LabelGroup>
    </SectionWrapper>
  );
}

export default EqControls;
