// const { WebMidi } = require("webmidi");
import WebMidi from "webmidi";

export default function main(presetNumber, scene) {
  WebMidi.enable().then(() => {
    let axeFxIn = WebMidi.getOutputById("2- AXE-FX II MIDI Out").channels[1];
    axeFxIn.setProgram(presetNumber + 1, 1);
    axeFxIn.sendControlChange(34, scene - 1);
  });
}
