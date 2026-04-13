const API_URL = "https://api.molha.org/membresmolha";

// ===============================
// CHARGEMENT INITIAL
// ===============================
document.addEventListener("DOMContentLoaded", () => {
    chargerMembres();
});

// ===============================
// CHARGER TOUS LES MEMBRES
// ===============================
async function chargerMembres() {
    try {
        const res = await fetch(API_URL);
        const data = await res.json();

        afficherMembres(data);

    } catch (error) {
        console.error("Erreur chargement:", error);
        alert("Erreur de chargement des membres");
    }
}

// ===============================
// AFFICHER TABLE
// ===============================
function afficherMembres(membres) {
    const tbody = document.querySelector("#tableMembres tbody");
    tbody.innerHTML = "";

    membres.forEach(membre => {
        const tr = document.createElement("tr");

        tr.innerHTML = `
            <td>${membre.nomprenom || ""}</td>
            <td>${membre.email || ""}</td>
            <td>${membre.phones || ""}</td>
            <td>${membre.identite || ""}</td>
            <td>
                <button onclick="voir('${membre._id}')">Voir</button>
                <button onclick="modifier('${membre._id}')">Modifier</button>
                <button onclick="supprimer('${membre._id}')">Supprimer</button>
            </td>
        `;

        tbody.appendChild(tr);
    });
}

// ===============================
// SEARCH MULTI-CRITERES (ENTER)
// ===============================
document.getElementById("search").addEventListener("keypress", async (e) => {
    if (e.key === "Enter") {

        const value = e.target.value.trim();

        if (!value) {
            chargerMembres();
            return;
        }

        try {
            const res = await fetch(`${API_URL}/search?q=${encodeURIComponent(value)}`);
            const data = await res.json();

            afficherMembres(data);

        } catch (error) {
            console.error("Erreur search:", error);
        }
    }
});

// ===============================
// VOIR (READ ONLY POPUP)
// ===============================
async function voir(id) {
    try {
        const res = await fetch(`${API_URL}/${id}`);
        const m = await res.json();

        const details = `
            <p><strong>Nom:</strong> ${m.nomprenom || ""}</p>
            <p><strong>Email:</strong> ${m.email || ""}</p>
            <p><strong>Téléphone:</strong> ${m.phones || ""}</p>
            <p><strong>CIN/NIF:</strong> ${m.identite || ""}</p>
            <p><strong>Adresse:</strong> ${m.adresse || ""}</p>
            <p><strong>Motivation:</strong> ${m.motivation || ""}</p>
        `;

        document.getElementById("detailsMembre").innerHTML = details;
        document.getElementById("modalVoir").style.display = "block";

    } catch (error) {
        console.error(error);
    }
}

// ===============================
// MODIFIER (CHARGER FORM)
// ===============================
let currentId = null;

async function modifier(id) {
    currentId = id;

    try {
        const res = await fetch(`${API_URL}/${id}`);
        const m = await res.json();

        document.getElementById("edit_nom").value = m.nomprenom || "";
        document.getElementById("edit_email").value = m.email || "";
        document.getElementById("edit_phone").value = m.phones || "";
        document.getElementById("edit_identite").value = m.identite || "";

        document.getElementById("modalEdit").style.display = "block";

    } catch (error) {
        console.error(error);
    }
}

// ===============================
// SAVE MODIFICATION (PUT MONGODB)
// ===============================
document.getElementById("formEdit").addEventListener("submit", async (e) => {
    e.preventDefault();

    const updated = {
        nomprenom: document.getElementById("edit_nom").value.trim(),
        email: document.getElementById("edit_email").value.trim(),
        phones: document.getElementById("edit_phone").value.trim(),
        identite: document.getElementById("edit_identite").value.trim()
    };

    try {
        await fetch(`${API_URL}/${currentId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(updated)
        });

        alert("Modification enregistrée avec succès ✅");

        fermerModal("modalEdit");
        chargerMembres();

    } catch (error) {
        console.error(error);
        alert("Erreur modification");
    }
});

// ===============================
// SUPPRIMER
// ===============================
async function supprimer(id) {
    if (!confirm("Voulez-vous vraiment supprimer ce membre ?")) return;

    try {
        await fetch(`${API_URL}/${id}`, {
            method: "DELETE"
        });

        chargerMembres();

    } catch (error) {
        console.error(error);
    }
}

// ===============================
// EXPORT CSV
// ===============================
function exportCSV() {
    fetch(API_URL)
        .then(res => res.json())
        .then(data => {

            let csv = "Nom,Email,Téléphone,CIN/NIF,Adresse\n";

            data.forEach(m => {
                csv += `"${m.nomprenom || ""}","${m.email || ""}","${m.phones || ""}","${m.identite || ""}","${m.adresse || ""}"\n`;
            });

            const blob = new Blob([csv], { type: "text/csv" });
            const url = window.URL.createObjectURL(blob);

            const a = document.createElement("a");
            a.href = url;
            a.download = "membresmolha.csv";
            a.click();

            window.URL.revokeObjectURL(url);
        });
}

// ===============================
// FERMER MODALS
// ===============================
function fermerModal(id) {
    document.getElementById(id).style.display = "none";
}
