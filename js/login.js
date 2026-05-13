const form = document.getElementById("loginForm");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  //leo valores de inputs
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {
    // peticion añ endpoint login
    const response = await fetch("https://tp3-api-express-grupo6.onrender.com/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        //datos enviados a back
        email,
        contrasena: password,
      }),
    });

    const data = await response.json();

    // si no esta ok muestro error
    if (!response.ok) {
      alert(data.message);
      return;
    }

    //si esta ok
    //guardo id en local storage
    localStorage.setItem("idUsuario", data.id);

    alert(data.message);

    //voy al perfil del usuario
    window.location.href = "../perfil.html";
  } catch (error) {
    console.error("Error:", error);
    alert("Error al iniciar sesión");
  }
});
