const express = require("express");
const app = express();
const cors = require("cors");
const { main } = require("./MainFunction");

app.use(cors());
app.use(express.json());

app.post("/preset", async (req, res) => {
  const { presetNumber, scene } = req.body;
  try {
    await main(presetNumber, scene);
    return res.send("success");
  } catch (err) {
    console.log(err);
    return res.status(500).send("failed");
  }
});

// app.get("/test", (req, res) => {
//   res.send("test");
// });

module.exports = app;
