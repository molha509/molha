// ======================================================
// MOLHA HOME PAGE SCRIPT (STABLE VERSION)
// ======================================================

document.addEventListener("DOMContentLoaded", () => {

  console.log("MOLHA UI READY");

  initScrollNavbar();
  initButtons();
  initMobileMenu();

});


// ======================================================
// NAVBAR SCROLL EFFECT
// ======================================================
function initScrollNavbar() {

  const navbar = document.querySelector(".navbar");

  if (!navbar) return;

  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      navbar.style.boxShadow = "0 2px 10px rgba(0,0,0,0.2)";
    } else {
      navbar.style.boxShadow = "none";
    }
  });

}


// ======================================================
// BUTTON ACTIONS
// ======================================================
function initButtons() {

  const btnDecouvrir = document.querySelector(".btn.red");
  const btnProgrammes = document.querySelector(".btn.dark");

  if (btnDecouvrir) {
    btnDecouvrir.addEventListener("click", (e) => {
      e.preventDefault();
      window.scrollTo({
        top: document.body.scrollHeight / 2,
        behavior: "smooth"
      });
    });
  }

  if (btnProgrammes) {
    btnProgrammes.addEventListener("click", (e) => {
      e.preventDefault();
      alert("Section programmes bientôt disponible.");
    });
  }

}


// ======================================================
// MOBILE MENU (RESPONSIVE)
// ======================================================
function initMobileMenu() {

  const menu = document.querySelector(".menu");

  // kreye bouton hamburger dinamikman
  const btn = document.createElement("div");
  btn.innerHTML = "☰";
  btn.style.fontSize = "25px";
  btn.style.cursor = "pointer";

  const navbar = document.querySelector(".navbar");

  if (!menu || !navbar) return;

  navbar.insertBefore(btn, menu);

  btn.addEventListener("click", () => {
    if (menu.style.display === "flex") {
      menu.style.display = "none";
    } else {
      menu.style.display = "flex";
      menu.style.flexDirection = "column";
      menu.style.position = "absolute";
      menu.style.top = "70px";
      menu.style.left = "0";
      menu.style.background = "white";
      menu.style.width = "100%";
      menu.style.padding = "20px";
    }
  });

}






let deferredPrompt;

window.addEventListener("beforeinstallprompt", (e) => {

  e.preventDefault();

  deferredPrompt = e;

  document.getElementById("installBtn").style.display = "block";
});

document.getElementById("installBtn").addEventListener("click", async () => {

  if (deferredPrompt) {

    deferredPrompt.prompt();

    await deferredPrompt.userChoice;

    deferredPrompt = null;
  }
});
