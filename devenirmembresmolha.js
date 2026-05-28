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
    Ouest: ["Port-au-Prince", "Carrefour", "Delmas", "Pétion-Ville", "Kenscoff"],
    Artibonite: ["Gonaïves", "Saint-Marc", "Verrettes", "L'Estère"],
    Centre: ["Hinche", "Mirebalais", "Saut-d'Eau"],
    GrandAnse: ["Jérémie", "Dame-Marie", "Anse-d'Hainault"],
    Nippes: ["Miragoâne", "Anse-à-Veau", "Petit-Trou-de-Nippes"],
    Nord: ["Cap-Haïtien", "Limonade", "Acul-du-Nord"],
    NordEst: ["Fort-Liberté", "Ouanaminthe", "Trou-du-Nord"],
    NordOuest: ["Port-de-Paix", "Saint-Louis-du-Nord", "Bombardopolis"],
    Sud: ["Les Cayes", "Aquin", "Cavaillon"],
    SudEst: ["Jacmel", "Bainet", "Marigot"]
};

// ATTACH EVENT SAFE (apre DOM ready)
document.addEventListener("DOMContentLoaded", () => {
    const dep = document.getElementById("departement");
    const communeSelect = document.getElementById("adresse");

    if (dep && communeSelect) {
        dep.addEventListener("change", function () {

            let value = this.value;

            communeSelect.innerHTML = '<option value="">Choisissez une commune</option>';

            if (communes[value]) {
                communes[value].forEach(c => {
                    let option = document.createElement("option");
                    option.value = c;
                    option.textContent = c;
                    communeSelect.appendChild(option);
                });
            }
        });
    }
});
