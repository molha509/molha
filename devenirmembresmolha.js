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

        
        },

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
