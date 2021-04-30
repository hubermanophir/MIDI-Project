const { WebMidi } = require("webmidi");

const main = async () => {
  await WebMidi.enable();
  let axeFxIn = WebMidi.getOutputById("2- AXE-FX II MIDI Out").channels[1];
  //   console.log(axeFxIn);
  //   axeFxIn.sendChannelMode(123, 1);
  //   const axeFxMidi = WebMidi.getOutputById("2- AXE-FX II MIDI Out");

  axeFxIn.setProgram(127, 1);
  axeFxIn.sendControlChange(34, 2);
  //   axeFxIn.sendControlChange(34, 0);
};
main();
