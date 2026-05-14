const seccionPerfil = document.querySelector("section.perfil");

document.addEventListener("DOMContentLoaded", async function () {
  renderizarSpinner();

  const id = localStorage.getItem("idUsuario");

  if (!id) {
    window.location.href = "login.html";
    return;
  }

  const data = await obtenerPerfil(id);
  renderizarPerfil(data);
});

async function obtenerPerfil(id) {
  try {
    const respuesta = await fetch(`https://tp3-api-express-grupo6.onrender.com/perfil/${id}`);
    const dataJson = await respuesta.json();
    return dataJson;
  } catch (error) {
    console.error("Sucedio un error al traer el perfil: ", error);
    return { mensaje: "Error interno del servidor" };
  }
}

function renderizarPerfil(data) {
  seccionPerfil.innerHTML = "";

  if (data.mensaje) {
    seccionPerfil.innerHTML = `<p>${data.mensaje}. Recargue la pagina</p>`;
    return;
  }

  const pedidosHTML = data.ultimos_pedidos && data.ultimos_pedidos.length > 0
    ? data.ultimos_pedidos.map(pedido => `
        <div class="pedido-item">
          <p><strong>${pedido.nombre_servicio}</strong></p>
          <p>Fecha: ${pedido.fecha}</p>
        </div>
      `).join("")
    : "<p>No hay pedidos recientes</p>";

  seccionPerfil.innerHTML = `
    <div class="perfil-card">
      <img src="../assets/img/${data.foto}" alt="Foto de ${data.nombre}" class="perfil-foto" />
      <h2>${data.nombre}</h2>
      <p>${data.mail}</p>
      <p>Miembro desde: ${data.fecha_registro}</p>
    </div>
    <div class="perfil-pedidos">
      <h3>Últimos pedidos</h3>
      ${pedidosHTML}
    </div>
  `;
}

function renderizarSpinner() {
  seccionPerfil.innerHTML = '<img src="../assets/img/cargando.gif">';
}