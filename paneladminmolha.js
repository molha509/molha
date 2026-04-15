function login() {
    const pass = document.getElementById("password").value;

    if (!pass) {
        alert("Tanpri antre mot de passe a");
        return;
    }

    fetch("https://api.molha.org/admin/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ password: pass })
    })
    .then(res => res.json())
    .then(data => {
        if (data.success) {
            sessionStorage.setItem("admin_ok", "true");
            window.location.href = "Adminmolha.html";
        } else {
            alert("Mot de passe pa korek!");
        }
    })
    .catch(() => {
        alert("Erè koneksyon ak server la.");
    });
}
