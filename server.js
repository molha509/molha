// server.js
require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// GitHub webhook route
app.post("/github-webhook", (req, res) => {
    console.log("📦 GitHub webhook triggered:", req.body);
    res.status(200).send("OK");
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Node.js API running on port ${PORT}`));
