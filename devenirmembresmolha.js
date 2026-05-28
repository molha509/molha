// ================================
// AUTO-REMPLISSAGE DATE DU JOUR
// ================================
document.addEventListener("DOMContentLoaded", () => {
    const dateJour = document.getElementById("dateJour");
    if (dateJour) {
        const today = new Date().toISOString().split("T")[0];
        dateJour.value = today;
    }
});

// ================================
// ENVOI DU FORMULAIRE VERS API MOLHA
// ================================
async function envoyerFormulaire(event) {
    event.preventDefault();
const form = event.target; // ✅ SA OU TE BLIYE A
    
    // ===== VARIABLES PRINCIPALES =====
    const membre = {
        nomprenom: document.getElementById("nomprenom").value.trim(),
        departement: document.getElementById("departement").value.trim(),
        datenaissance: document.getElementById("datenaissance").value.trim(),
        identite: document.getElementById("identite").value.trim(),
        lieunaissance: document.getElementById("lieunaissance").value.trim(),
        adresse: document.getElementById("adresse").value.trim(),
        phones: document.getElementById("phones").value.trim(),
        email: document.getElementById("email").value.trim(),
        profession: document.getElementById("profession").value.trim(),
        formations: document.getElementById("formations").value.trim(),

        
        

        // ===== REFERANS (2 LIGNES) =====
        references: {
            ref1_nom: document.getElementById("ref1_nom").value.trim(),
            ref1_phone: document.getElementById("ref1_phone").value.trim(),

            ref2_nom: document.getElementById("ref2_nom").value.trim(),
            ref2_phone: document.getElementById("ref2_phone").value.trim()
        },

        // ===== RAISON D’ADHÉSION =====
        motivation: document.getElementById("motivation").value.trim(),

        // ===== DATE DU JOUR AUTO =====
        dateInscription: document.getElementById("dateJour").value.trim()
    };

    // ===== VALIDATION CHAMPS OBLIGATOIRES =====
if (
    !membre.nomprenom ||
    !membre.departement ||
    !membre.datenaissance ||
    !membre.identite ||
    !membre.lieunaissance ||
    !membre.adresse ||
    !membre.phones ||
    !membre.email ||
    !membre.profession ||
    !membre.formations ||
    !membre.motivation
) {

    alert("Veuillez remplir tous les champs obligatoires.");
    return;
}




    
    try {
        const response = await fetch("https://api.molha.org/membresmolha", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(membre)
        });

        if (response.ok) {
            alert("Votre inscription a été envoyée avec succès !");
            form.reset(); // ✅ SA AP VIDE FÒM NAN
        } else {
            alert("Erreur lors de l’envoi. Veuillez réessayer.");
        }
    } catch (error) {
        console.error("Erreur:", error);
        alert("Impossible de contacter le serveur.");
    }
}


const dateInput = document.getElementById("datenaissance");

dateInput.addEventListener("input", function (e) {

    let value = e.target.value.replace(/\D/g, "");

    if (value.length > 2) {
        value = value.slice(0,2) + "/" + value.slice(2);
    }

    if (value.length > 5) {
        value = value.slice(0,5) + "/" + value.slice(5,9);
    }

    e.target.value = value;
});










const communes = {
    "Ouest": [
        "Port-au-Prince", "Carrefour", "Delmas", "Pétion-Ville", "Kenscoff",
        "Gressier", "Cité Soleil", "Tabarre", "Cornillon", "Fermathe"
    ],

    "Artibonite": [
        "Gonaïves", "Saint-Marc", "Verrettes", "L'Estère", "Grande-Saline",
        "Desdunes", "Petite-Rivière de l'Artibonite", "Marchand-Dessalines",
        "La Chapelle", "Liancourt"
    ],

    "Centre": [
        "Hinche", "Mirebalais", "Saut-d'Eau", "Boucan-Carré",
        "Thomonde", "Cerca-la-Source", "Cerca Carvajal"
    ],

    "Grand'Anse": [
        "Jérémie", "Dame-Marie", "Anse-d'Hainault", "Corail",
        "Beaumont", "Roseaux", "Chambellan", "Moron"
    ],

    "Nippes": [
        "Miragoâne", "Anse-à-Veau", "Petit-Trou-de-Nippes",
        "L'Asile", "Plaisance-du-Sud", "Arnaud"
    ],

    "Nord": [
        "Cap-Haïtien", "Limonade", "Acul-du-Nord", "Plaine-du-Nord",
        "Quartier-Morin", "Bahon", "Grande-Rivière du Nord"
    ],

    "Nord-Est": [
        "Fort-Liberté", "Ouanaminthe", "Trou-du-Nord",
        "Vallières", "Caracol", "Capotille", "Mont-Organisé"
    ],

    "Nord-Ouest": [
        "Port-de-Paix", "Saint-Louis-du-Nord", "Bombardopolis",
        "Jean-Rabel", "Môle-Saint-Nicolas", "Baie-de-Henne"
    ],

    "Sud": [
        "Les Cayes", "Aquin", "Cavaillon", "Chardonnières",
        "Port-à-Piment", "Les Anglais", "Tiburon", "Île-à-Vache"
    ],

    "Sud-Est": [
        "Jacmel", "Bainet", "Marigot", "Cayes-Jacmel",
        "La Vallée de Jacmel", "Belle-Anse", "Thiotte", "Anse-à-Pitres"
    ]
};

document.addEventListener("DOMContentLoaded", () => {

    const dep = document.getElementById("departement");
    const communeSelect = document.getElementById("commune_select");
    const adresseHidden = document.getElementById("adresse");

    dep.addEventListener("change", function () {

        let list = communes[this.value] || [];

        communeSelect.innerHTML = '<option value="">Choisissez une commune</option>';

        list.forEach(c => {
            let opt = document.createElement("option");
            opt.value = c;
            opt.textContent = c;
            communeSelect.appendChild(opt);
        });

        // reset hidden field
        adresseHidden.value = "";
    });

    communeSelect.addEventListener("change", function () {
        adresseHidden.value = this.value; // SA KI ENPÒTAN AN
    });

});
