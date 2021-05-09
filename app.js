const express = require("express");
const app = express();
const cors = require("cors");
const fs = require("fs");
const { main, sceneFunc, getAllDevices } = require("./MainFunction");
const data = require("./DB/presets.json");

app.use(cors());
app.use(express.json());

let MIDI_ID = "";

//POST-------------------------------------------------------------------
app.post("/change", async (req, res) => {
  console.log(req.body);
  const { presetNumber, scene } = req.body;
  try {
    await main(presetNumber, scene, MIDI_ID);
    return res.send("success");
  } catch (err) {
    console.log(err);
    return res.status(500).send("failed");
  }
});

app.post("/preset", (req, res) => {
  const { name, number, presetNumber, scene } = req.body;
  const obj = {
    name,
    number,
    presetNumber,
    scene,
  };
  const arr = [...data];
  arr.push(obj);
  fs.writeFile("./DB/presets.json", JSON.stringify(arr), (err) => {
    if (err) {
      return res.status(500).send("error");
    } else {
      return res.send("success");
    }
  });
});

app.post("/scene", async (req, res) => {
  const { scene } = req.body;
  try {
    await sceneFunc(scene, MIDI_ID);
    return res.send("success");
  } catch (error) {
    return res.status(500).send(error);
  }
});

app.post("/device", (req, res) => {
  MIDI_ID = req.body.id;
  res.send("success");
});

//GET---------------------------------------------------------------------
app.get("/presets", (req, res) => {
  res.json(data);
});

app.get("/outputs", async (req, res) => {
  const devices = await getAllDevices();
  console.log(devices);
  res.json(devices);
});

module.exports = app;
