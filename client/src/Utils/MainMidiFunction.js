const { WebMidi } = require("webmidi");

const main = async (presetNumber, scene) => {
  await WebMidi.enable();
  let axeFxIn = WebMidi.getOutputById("2- AXE-FX II MIDI Out").channels[1];
  axeFxIn.setProgram(presetNumber, 0);
  axeFxIn.sendControlChange(34, scene);
};

module.exports = { main };
