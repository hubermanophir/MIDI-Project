const express = require("express");
const router = express.Router();
const fs = require("fs");
const { main, sceneFunc, getAllDevices } = require("../MainFunction.js");
const data = require("../DB/presets.json");

let MIDI_ID = "";
//POST-------------------------------------------------------------------
router.post("/change", async (req, res) => {
  console.log(req.body);
  const { presetNumber, scene } = req.body;
  try {
    await main(presetNumber, scene);
    return res.send("success");
  } catch (err) {
    console.log(err);
    return res.status(500).send("failed");
  }
});

router.post("/preset", (req, res) => {
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

router.post("/scene", async (req, res) => {
  const { scene } = req.body;
  try {
    await sceneFunc(scene);
    return res.send("success");
  } catch (error) {
    return res.status(500).send(error);
  }
});

router.post("/device", (req, res) => {
  MIDI_ID = req.body.id;
  res.send("success");
});

//GET---------------------------------------------------------------------
router.get("/presets", (req, res) => {
  res.json(data);
});

router.get("/outputs", async (req, res) => {
  const devices = await getAllDevices();
  console.log(devices);
  res.json(devices);
});

module.exports = router;
