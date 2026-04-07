// server.js

require('dotenv').config(); // Li tout kle sekre nan .env

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors"); // Pèmèt aksè cross-origin si ou bezwen
const morgan = require("morgan"); // Log request yo pou debogaj
const helmet = require("helmet"); // Sekirite HTTP headers
const path = require("path"); // Pou jere chemen fichye

const app = express();

// ====================== MIDDLEWARES ======================
app.use(helmet()); // Sekirite headers
app.use(cors()); // Aktive CORS
app.use(bodyParser.json()); // Parse JSON requests
app.use(bodyParser.urlencoded({ extended: true })); // Parse URL encoded
app.use(morgan("dev")); // Log requests nan console

// ====================== STATIC FILES ======================
app.use(express.static(path.join(__dirname, "public"))); // Si ou gen CSS, JS, img nan public/

// ====================== ROUTES ======================

// GitHub webhook route
app.post("/github-webhook", (req, res) => {
    console.log("📦 GitHub webhook triggered:", req.body);
    res.status(200).send("OK");
});

// Test route
app.get("/", (req, res) => {
    res.send("✅ MOLHA API is running!");
});

















































































// ====================== SERVER ======================
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Node.js API running on port ${PORT}`));
