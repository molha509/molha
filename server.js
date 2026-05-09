// server.js

require('dotenv').config(); // Li tout kle sekre nan .env

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors"); // Pèmèt aksè cross-origin si ou bezwen
const mongoose = require("mongoose");
const morgan = require("morgan"); // Log request yo pou debogaj
const helmet = require("helmet"); // Sekirite HTTP headers
const path = require("path"); // Pou jere chemen fichye
const bcrypt = require("bcrypt");

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
    datenaissance: String,
    identite: String,
    lieunaissance: String,
    adresse: String,
    phones: String,
    email: String,
    profession: String,
    formations: String,

    

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



// ================================
// VALIDATION CHAMPS OBLIGATOIRES
// ================================
const {
    nomprenom,
    departement,
    datenaissance,
    identite,
    lieunaissance,
    adresse,
    phones,
    email,
    profession,
    formations,
    motivation
} = req.body;

if (
    !nomprenom ||
    !departement ||
    !datenaissance ||
    !identite ||
    !lieunaissance ||
    !adresse ||
    !phones ||
    !email ||
    !profession ||
    !formations ||
    !motivation
) {
    return res.status(400).json({
        success: false,
        message: "Champs obligatoires manquants"
    });
}



        
        const nouveauMembre = new MembresMolha(req.body);
        await nouveauMembre.save();

        res.status(200).json({ 
            success: true, 
            message: "Inscription enregistrée avec succès !" 
        });

        console.log("🆕 Nouveau membre enregistré :", req.body);

        // 📩 EMAIL NOTIFICATION ADMIN (SAFE - BACKEND ONLY)
        fetch(process.env.GAS_WEBHOOK_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                nom: req.body.nomprenom,
                email: req.body.email,
                telephone: req.body.phones,
                secret: process.env.GAS_SECRET
            })
        }).catch(err => console.log("Email error:", err));

    } catch (error) {
        console.error("❌ ERREUR AJOUT MEMBRE :", error);

        res.status(500).json({
            success: false,
            message: "Erreur lors de l'enregistrement du membre."
        });
    }
});

        
























/////////////////////////////////////////////////////
// 🔐 ADMIN ROUTES - MOLHA MEMBERS CONTROL PANEL
// ⚠️ SAFE BLOCK - does NOT affect existing logic
/////////////////////////////////////////////////////

// ======================
// GET ALL MEMBRES
// ======================
app.get("/membresmolha", async (req, res) => {
    try {
        const data = await MembresMolha.find().sort({ dateCreated: -1 });
        res.json(data);
    } catch (error) {
        res.status(500).json({ message: "Erreur serveur GET ALL" });
    }
});

// ======================
// GET ONE MEMBER BY ID
// ======================
app.get("/membresmolha/:id", async (req, res) => {
    try {
        const data = await MembresMolha.findById(req.params.id);
        res.json(data);
    } catch (error) {
        res.status(500).json({ message: "Erreur GET BY ID" });
    }
});

// ======================
// SEARCH MULTI-CRITERES
// ======================
app.get("/membresmolha/search", async (req, res) => {
    try {
        const q = req.query.q || "";

        const regex = new RegExp(q, "i");

        const result = await MembresMolha.find({
            $or: [
                { nomprenom: regex },
                { identite: regex },
                { phones: regex },
                { email: regex }
            ]
        });

        res.json(result);

    } catch (error) {
        res.status(500).json({ message: "Erreur SEARCH" });
    }
});

// ======================
// UPDATE MEMBER
// ======================
app.put("/membresmolha/:id", async (req, res) => {
    try {
        const updated = await MembresMolha.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        res.json({
            success: true,
            message: "Membre modifié avec succès",
            data: updated
        });

    } catch (error) {
        res.status(500).json({ message: "Erreur UPDATE" });
    }
});

// ======================
// DELETE MEMBER
// ======================
app.delete("/membresmolha/:id", async (req, res) => {
    try {
        await MembresMolha.findByIdAndDelete(req.params.id);

        res.json({
            success: true,
            message: "Membre supprimé avec succès"
        });

    } catch (error) {
        res.status(500).json({ message: "Erreur DELETE" });
    }
});





















// ======================
// ADMIN LOGIN
// ======================
app.post("/admin/login", async (req, res) => {
    try {
        const { password } = req.body;

        const hash = process.env.ADMIN_PASSWORD_HASH;

        const match = await bcrypt.compare(password, hash);

        if (match) {
            res.json({ success: true });
        } else {
            res.json({ success: false });
        }

    } catch (error) {
        res.status(500).json({ success: false });
    }
});


































































// =====================================
// 🚀 DÉMARRAGE SERVEUR
// =====================================
const PORT = 3000;
app.listen(PORT, () => console.log(`🚀 API MOLHA running on port ${PORT}`));
