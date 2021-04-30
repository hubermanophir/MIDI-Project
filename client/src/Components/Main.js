import React from "react";
import main from "../Utils/MainMidiFunction";
import {WebMidi} from "webmidi";
// const { WebMidi } = require("webmidi");

export default function Main() {
  const onClickHandler = (presetNumber, scene) => {
    // WebMidi.enable().then(() => {
    //   let axeFxIn = WebMidi.getOutputById("2- AXE-FX II MIDI Out").channels[1];
    //   axeFxIn.setProgram(presetNumber + 1, 1);
    //   axeFxIn.sendControlChange(34, scene - 1);
    // });
  };
  return (
    <div>
      <h1>Main</h1>
      <button onClick={onClickHandler}>Click to change preset</button>
    </div>
  );
}
