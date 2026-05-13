const seccionEquipo = document.querySelector("section.equipo");

document.addEventListener("DOMContentLoaded", async function () {
  renderizarSpinner();
  const data = await obtenerEquipo();
  await renderizarEquipo(data);
});

async function obtenerEquipo() {
  try {
    const data = await fetch("https://tp3-api-express-grupo6.onrender.com/equipo");
    const dataJson = await data.json();
    return dataJson;
  } catch (error) {
    console.error("Sucedio un error al traer el equipo: ", error);
    return { mensaje: "Error interno del servidor" };
  }
}

async function renderizarEquipo(data) {
  seccionEquipo.innerHTML = "";

  if (data.mensaje) {
    seccionEquipo.innerHTML = `<p>${data.mensaje}. Recargue la pagina</p>`;
    return;
  }
  data.equipo.forEach((integrante) => {
    seccionEquipo.innerHTML += `
        <div class="miembro_equipo" id="miembro-${integrante.id}">
          <h2>${integrante.nombre} ${integrante.apellido}</h2>
          <p>${integrante.rol}</p>
          <img src="../assets/img/${integrante.imagen}" alt="Foto de ${integrante.nombre} ${integrante.apellido}" />

          <details>
            <summary>Conocé más sobre ${integrante.nombre}</summary>
            <p>
              ${integrante.acerca}
            </p>
          </details>
        </div>`;
  });
}

function renderizarSpinner() {
  seccionEquipo.innerHTML = '<img src="../assets/img/cargando.gif">';
}
