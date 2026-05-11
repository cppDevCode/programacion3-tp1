const selectProducto=document.querySelector ('#producto')
const formPedido= document.querySelector ('#form-pedido')
const resultadoPedido=document.querySelector ('#resultado-pedido')

//Función cargar servicios

async function cargarServicios(){
    try{
        const reponse= await fetch ('http://localhost:3000/productos')
        const data= await reponse.json()

        selectProducto.innerHTML= '<option value="">Seleccione un producto</option>'
        data.forEach ((servicio) => {
            const option=document.createElement ('option')
            option.value= servicio.id

            if (servicio.stock > 0) {
                option.textContent= `${servicio.nombre} - $${servicio.precio} (Stock: ${servicio.stock})`
            } else {
                option.textContent= `${servicio.nombre} - SIN STOCK`
                option.disabled= true
            }
            selectProducto.append (option)
        })
    } catch (error) {
        console.error('Error al cargar los servicios:', error)
        resultadoPedido.textContent= 'Error al cargar los productos. Por favor, inténtelo de nuevo más tarde.'
    }
}

//Función enviar pedido

async function enviarPedido(evento) {
    evento.preventDefault()

    const producto = document.querySelector('#producto').value
    const nombre = document.querySelector('#nombre').value
    const apellido = document.querySelector('#apellido').value
    const email = document.querySelector('#email').value
    const calle = document.querySelector('#calle').value
    const numero = document.querySelector('#numero').value
    const ciudad = document.querySelector('#ciudad').value
    const CP = document.querySelector('#CP').value
    const opciones_de_pago = document.querySelector('#opciones_de_pago').value
    const numero_tarjeta = document.querySelector('#numero_tarjeta').value
    const vencimiento = document.querySelector('#vencimiento').value
    const cvv = document.querySelector('#cvv').value

    if (!producto || !nombre || !apellido || !email || !calle || !numero || !ciudad || !CP || !opciones_de_pago) {
        resultadoPedido.textContent= 'Por favor, complete todos los campos obligatorios.'
        return
    }

    try{
        const response = await fetch('http://localhost:3000/pedidos', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                producto,
                nombre,
                apellido,
                email,
                calle,
                numero,
                ciudad,
                CP,
                opciones_de_pago,
                numero_tarjeta,
                vencimiento,
                cvv
            })
        })
        const data = await response.json()
        
        console.log(response)
        console.log(data)
        
        if (response.ok) {
            resultadoPedido.innerHTML=`
            <strong> ${data.mensaje}</strong><br>
            Producto: ${data.detalle.producto}<br>
            Precio: $${data.detalle.precioUnitario}<br>
            Cliente: ${data.detalle.nombre} ${data.pedido.apellido}<br>
            Dirección: ${data.detalle.calle} ${data.detalle.numero}, ${data.detalle.ciudad}, CP: ${data.detalle.CP}<br>
            `
        } else {
            resultadoPedido.textContent= `${data.error}`
        }

    } catch (error) {
        console.error('Error al enviar el pedido:', error)
        resultadoPedido.textContent= 'Error al enviar el pedido. Por favor, inténtelo de nuevo más tarde.'
    }
}

cargarServicios()
formPedido.addEventListener('submit', enviarPedido)