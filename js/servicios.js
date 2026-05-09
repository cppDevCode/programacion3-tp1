document.addEventListener("DOMContentLoaded", async function() {
    let serviciosGrid = document.getElementById('serv-grid');
    if ( !serviciosGrid ) {
        serviciosGrid.innerHTML='<img src="../assets/img/cargando.gif">';
    }
try {
    const servicios = await cargaServicios();
    if ( !servicios || servicios.length === 0) {
        serviciosGrid.innerHTML = '<h1>No se encontraron Juegos</h1>';
    }
    else {
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
    } } catch (error) {
        serviciosGrid.innerHTML = `<h1>Error al cargar los juegos: ${error}</h1>`;
    };    
    
});

async function cargaServicios() {
    const respuesta = await fetch("http://127.0.0.1:3000/servicios");
    const jsonServicio = respuesta.json();
    return jsonServicio;
}

const formularioBusqueda = document.getElementById("formulario-busqueda");

document.addEventListener('submit', async function (evento) {
    evento.preventDefault();
    
});