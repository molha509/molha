// ======================================================
// MOLHA HOME PAGE SCRIPT
// ======================================================

// PAGE LOAD
document.addEventListener("DOMContentLoaded", () => {
  console.log("MOLHA Home Loaded");

  initButtons();
  initScrollEffect();
});


// ======================================================
// BUTTON INTERACTIONS
// ======================================================

function initButtons() {

  const btnDecouvrir = document.querySelector(".btn.red");
  const btnProgramme = document.querySelector(".btn.dark");

  if (btnDecouvrir) {
    btnDecouvrir.addEventListener("click", () => {
      alert("Bienvenue sur le site officiel du MOLHA !");
    });
  }

  if (btnProgramme) {
    btnProgramme.addEventListener("click", () => {
      alert("Les programmes seront bientôt disponibles.");
    });
  }
}


// ======================================================
// SCROLL EFFECT (Navbar)
// ======================================================

function initScrollEffect() {
  const navbar = document.querySelector(".navbar");

  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      navbar.style.background = "#111";
      navbar.style.color = "white";
    } else {
      navbar.style.background = "white";
      navbar.style.color = "black";
    }
  });
}
