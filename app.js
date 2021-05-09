const express = require("express");
const app = express();
const cors = require("cors");

const api = require("./routes/index");

app.use(cors());
app.use(express.json());
app.use("/api", api);

let MIDI_ID = "";

module.exports = app;
