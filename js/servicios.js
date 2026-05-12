let serviciosGrid = document.getElementById('serv-grid');

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