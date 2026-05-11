let serviciosGrid = document.getElementById('serv-grid');

//creo el MODAL
const modal = document.createElement('div'); //crea un div
modal.id = 'modal-detalle'; //lo identifica para poder identificarlo en el css y en js
modal.innerHTML = `
  <div class="modal-overlay" id="modal-overlay">
    <div class="modal-contenido">
      <button class="modal-cerrar" id="modal-cerrar">✕</button>
      <div id="modal-body"></div>
    </div>
  </div>
`;
document.body.appendChild(modal); // agrega este modal al body
 // class=modal-overlay, modal-contenido, modal-cerrar.... clases que modifico estilo en css

//Cierro el modal 
document.getElementById('modal-cerrar').addEventListener('click', cerrarModal); //es el boton modal-cerrar
document.getElementById('modal-overlay').addEventListener('click', function(e) {
  if (e.target === this) cerrarModal();
});

function cerrarModal() {
  document.getElementById('modal-overlay').style.display = 'none'; //oculta el modal con display=none
}

async function abrirModal(id) {
  const modalBody = document.getElementById('modal-body');
  const overlay = document.getElementById('modal-overlay');
  modalBody.innerHTML = '<p>Cargando...</p>'; 
  overlay.style.display = 'flex';
  try {
    const respuesta = await fetch(`http://127.0.0.1:5000/servicios/${id}`);
    const servicio = await respuesta.json();
    if (!servicio || respuesta.status === 404) {
      modalBody.innerHTML = '<p>No se encontró el servicio.</p>';
      return;
    }

    let estrellas = '';
    for (let i = 0; i < servicio.puntaje; i++) estrellas += '★';
    modalBody.innerHTML = `
      <img src="../assets/img/${servicio.imagen}" alt="${servicio.nombre}" class="modal-imagen">
      <h2>${servicio.nombre}</h2>
      <p class="modal-estrellas">${estrellas}</p>
      <p>${servicio.descripcion}</p>
      <p><strong>Precio:</strong> $${servicio.precio}</p>
      <p><strong>Stock:</strong> ${servicio.stock > 0 ? servicio.stock + ' disponibles' : 'Sin stock'}</p>
      <a href="../pages/pedido.html" class="modal-btn">Comprar</a>
    `;
  } catch (error) {
    modalBody.innerHTML = `<p>Error al cargar el detalle: ${error}</p>`;
  }
}


document.addEventListener("DOMContentLoaded", async function() {
    if ( !serviciosGrid ) {
        serviciosGrid.innerHTML='<img src="../assets/img/cargando.gif">';
    }
try {
    const servicios = await cargaServicios("http://127.0.0.1:5000/servicios", null);
    if ( !servicios || servicios.length === 0) {
        serviciosGrid.innerHTML = '<h1>No se encontraron Juegos</h1>';
    }
    else {
       agregoCards(servicios);
    } } catch (error) {
        serviciosGrid.innerHTML = `<h1>Error al cargar los juegos: ${error}</h1>`;
    };    
    
});

async function cargaServicios(uri, parametro) {
    const ruta = !parametro? uri : uri + '/' + parametro
    const respuesta = await fetch(ruta);
    const jsonServicio = respuesta.json();
    return jsonServicio;
}

document.addEventListener('submit', async function (evento) {
    evento.preventDefault();
    const formularioBusqueda = document.getElementById('formulario-busqueda');
    if ( !serviciosGrid ) {
        serviciosGrid.innerHTML='<img src="../assets/img/cargando.gif">';
    }
try {
    const servicios = await cargaServicios('http://127.0.0.1:5000/servicios', 
            formularioBusqueda.inputBuscar.value);
    if ( !servicios || servicios.length === 0) {
        serviciosGrid.innerHTML = '<h1>No se encontraron Juegos</h1>';
    } else {
        agregoCards(servicios);
    }
    } catch (error) {
        serviciosGrid.innerHTML = `<h1>Error al cargar los juegos: ${error}</h1>`;
    }
});

function agregoCards (servicios) {
    serviciosGrid.innerHTML = '';
    servicios.forEach((serv) => {
        const articulo = document.createElement('article');
        let estrellas = '';
        if ( serv.puntaje != 0 ) {
            for (let i = 0; i< serv.puntaje; i++) {
                estrellas += '★';
            }
            for (let i = serv.puntaje; i < 5; i++) {
                estrellas += '☆';
            }
        } else {
            estrellas = '☆☆☆☆☆';
        }
        articulo.className = 'JuegoMasVendidoIdx JuegoMasVendidoS';
        articulo.id = serv.id;
        articulo.innerHTML = `
            <a href="../pages/pedido.html">                    
                <picture class="caratulaIdx">                        
                    <img src="../assets/img/${serv.imagen}">
                </picture>                    
                <p>${serv.nombre}</p>
                <p class="estrellasIdx">${estrellas}</p>
                <p class="topDescripcionIdx">${serv.descripcion}</p>
                
                
            </a>
        `;
        serviciosGrid.appendChild(articulo);
    });
}

