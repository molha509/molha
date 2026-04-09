// server.js

require('dotenv').config(); // Li tout kle sekre nan .env

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors"); // Pèmèt aksè cross-origin si ou bezwen
const mongoose = require("mongoose");
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











// =====================================
// 🔹 ROUTE /membresmolha
// =====================================
app.get('/membresmolha', (req, res) => {
  res.json({ message: "Bienvenue sur la page membres Molha!" });
});











// =====================================
// 🔗 CONNEXION MONGODB (env) – VERSYON MODÈN
// =====================================
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("💾 MongoDB connecté avec succès"))
    .catch(err => console.error("❌ Erreur MongoDB :", err));






// =====================================
// 🧩 SCHEMA MEMBRES MOLHA
// =====================================
const membreSchema = new mongoose.Schema({

    nomprenom: String,
    departement: String,
    organisation: String,
    reconnaissance: String,
    datenaissance: String,
    identite: String,
    lieunaissance: String,
    adresse: String,
    phones: String,
    email: String,
    profession: String,
    formations: String,

    comiteExecutif: {
        ligne1_nom: String,

        ligne1_id: String,

        ligne2_nom: String,
        ligne2_id: String,

        ligne3_nom: String,
        ligne3_id: String,

        ligne4_nom: String,
        ligne4_id: String,

        ligne5_nom: String,
        ligne5_id: String
    },

    references: {
        ref1_nom: String,
        ref1_phone: String,

        ref2_nom: String,
        ref2_phone: String
    },

    motivation: String,
    dateInscription: String,

    dateCreated: {
        type: Date,
        default: Date.now
    }
});

const MembresMolha = mongoose.model("membresmolha", membreSchema);


// =====================================
// 📨 ROUTE AJOUT MEMBRES MOLHA
// =====================================
app.post("/membresmolha", async (req, res) => {
    try {
        const nouveauMembre = new MembresMolha(req.body);
        await nouveauMembre.save();

        res.status(200).json({ 
            success: true, 
            message: "Inscription enregistrée avec succès !" 
        });

        console.log("🆕 Nouveau membre enregistré :", req.body);

    } catch (error) {
        console.error("❌ ERREUR AJOUT MEMBRE :", error);

        res.status(500).json({
            success: false,
            message: "Erreur lors de l'enregistrement du membre."
        });
    }
});














































































// =====================================
// 🚀 DÉMARRAGE SERVEUR
// =====================================
const PORT = 3000;
app.listen(PORT, () => console.log(`🚀 API MOLHA running on port ${PORT}`));
