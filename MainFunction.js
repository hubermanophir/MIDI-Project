const { WebMidi } = require("webmidi");

function main(presetNumber, scene) {
  WebMidi.enable().then(() => {
    let axeFxIn = WebMidi.getOutputById("2- AXE-FX II MIDI Out").channels[1];
    axeFxIn.setProgram(presetNumber + 1, 1);
    axeFxIn.sendControlChange(34, scene - 1);
  });
}

function sceneFunc(scene) {
  WebMidi.enable().then(() => {
    let axeFxIn = WebMidi.getOutputById("2- AXE-FX II MIDI Out").channels[1];
    axeFxIn.sendControlChange(34, scene - 1);
  });
}

function getAllDevices() {
  return WebMidi.enable().then(() => {
    const arr = WebMidi.outputs.map((output) => {
      return output.id;
    });
    return arr;
  });
}

module.exports = { main, sceneFunc, getAllDevices };
