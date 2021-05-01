const express = require("express");
const app = express();
const cors = require("cors");
const fs = require("fs");
const { main, sceneFunc } = require("./MainFunction");
const data = require("./DB/presets.json");

app.use(cors());
app.use(express.json());

app.post("/change", async (req, res) => {
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
    await sceneFunc(scene);
    return res.send("success");
  } catch (error) {
    return res.status(500).send(error);
  }
});

app.get("/presets", (req, res) => {
  res.json(data);
});

module.exports = app;
