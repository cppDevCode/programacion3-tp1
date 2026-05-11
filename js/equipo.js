const seccionEquipo = document.querySelector("section.equipo");

document.addEventListener("DOMContentLoaded", async function () {
  const equipo = await obtenerEquipo();
  console.log(equipo);
  await renderizarEquipo(equipo);
});

async function obtenerEquipo() {
  try {
    const data = await fetch("http://localhost:3000/equipo");
    const dataJson = await data.json();
    return dataJson.equipo;
  } catch (error) {
    console.error("Sucedio un error al traer el equipo: ", error);
  }
}

async function renderizarEquipo(equipo) {
  equipo.forEach((integrante) => {
    seccionEquipo.innerHTML += `
        <div class="miembro_equipo" id="miembro-${integrante.id}">
          <h2>${integrante.nombre} ${integrante.apellido}</h2>
          <p>${integrante.rol}</p>
          <img src="../assets/img/team_member_1.jpg" alt="Foto de ${integrante.nombre} ${integrante.apellido}" />

          <details>
            <summary>Conocé más sobre ${integrante.nombre}</summary>
            <p>
              ${integrante.acerca}
            </p>
          </details>
        </div>`;
  });
}
