const express = require("express");
const axios = require("axios");
const cors = require("cors");

require("dotenv").config();

const app = express();
const port = 8080;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Express app listening at http://localhost:${port}`);
});
