const express = require("express");
const app = require("./app");
const PORT = 8080;
const path = require("path");

// app.use(express.static(path.join(__dirname, "build")));

// app.use("/", (req, res) => {
//   res.sendFile(path.join(__dirname, "build"));
// });
app.use(express.static("client/build"));

app.listen(PORT, () => {
  console.log(`server live on port ${PORT}`);
});
