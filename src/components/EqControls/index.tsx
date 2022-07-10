import useAudioController from "@/store/AudioController";
import { ChangeEvent } from "react";
import EqVisualizer from "../EqVisualizer";
import Label from "../Label";
import LabelGroup from "../LabelGroup";
import { RangeSlider } from "../RangeSlider";
import SectionWrapper from "../SectionWrapper";

function EqControls() {
  const setTinFreq = useAudioController((state) => state.setTinFreq);
  const setTinReduce = useAudioController((state) => state.setTinReduce);
  const setTinQ = useAudioController((state) => state.setTinQ);
  const tinFreq = useAudioController((state) => state.tinFreq);
  const tinReduce = useAudioController((state) => state.tinReduce);
  const tinQ = useAudioController((state) => state.tinQ);

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
    <>
      <EqVisualizer freq={tinFreq} reduce={tinReduce} q={tinQ} />

      <LabelGroup>
        <Label htmlFor="tinEqRange">
          Tinnitus Frequency Band ({`${tinFreqNormalized()}kHz`})
        </Label>
        <RangeSlider
          id="tinEqRange"
          type="range"
          value={tinFreq}
          min={1000}
          max={22000}
          step={1000}
          onChange={onSetTinFreq}
        ></RangeSlider>
      </LabelGroup>

      <LabelGroup>
        <Label htmlFor="TinEqReduce">
          Tinnitus Band Reduction ({`${tinReducePerc()}%`})
        </Label>
        <RangeSlider
          id="TinEqReduce"
          type="range"
          value={tinReduce}
          min={0}
          max={20}
          step={0.2}
          onChange={onSetTinReduce}
        ></RangeSlider>
      </LabelGroup>

      <LabelGroup>
        <Label htmlFor="TinQ">Tinnitus Band Width</Label>
        <RangeSlider
          id="TinQ"
          type="range"
          value={tinQ}
          min={0}
          max={10}
          step={0.2}
          onChange={onSetTinQ}
        ></RangeSlider>
      </LabelGroup>
    </>
  );
}

export default EqControls;
