document.addEventListener('DOMContentLoaded', function() {
    const formularioLogin = document.getElementById('loginForm')
    const formularioAgregarProducto = document.getElementById('formularioAgregarProducto')
    const formularioEliminarProducto = document.getElementById('formularioEliminarProducto')
    const formularioRegistrarVenta = document.getElementById('formularioVenta')
    const botonCerrarSesion = document.getElementById('cerrarSesion')
    const botonVolverAdmin = document.getElementById('volverAdmin')
    const listaProductos = document.getElementById('listaProductos')
    const listaVentas = document.getElementById('listaVentas')

    const USUARIOS = {
        'admin': 'admin',
        'empleado': 'empleado'
    }

    function obtenerProductos() {
        return JSON.parse(localStorage.getItem('productos')) || []
    }

    function guardarProductos(productos) {
        localStorage.setItem('productos', JSON.stringify(productos))
    }

    function obtenerVentas() {
        return JSON.parse(localStorage.getItem('ventas')) || []
    }

    function guardarVentas(ventas) {
        localStorage.setItem('ventas', JSON.stringify(ventas))
    }

    if (formularioLogin) {
        formularioLogin.addEventListener('submit', (event) => {
            event.preventDefault()
            const usuario = document.getElementById('usuario').value
            if (USUARIOS[usuario]) {
                window.location.href = usuario === 'admin' ? 'admin.html' : 'empleado.html'
            } else {
                alert('Usuario no reconocido')
            }
        })
    }

    if (botonCerrarSesion) {
        botonCerrarSesion.addEventListener('click', () => window.location.href = 'index.html')
    }

    if (botonVolverAdmin) {
        botonVolverAdmin.addEventListener('click', () => window.location.href = 'admin.html')
    }

    function mostrarProductos() {
        const productos = obtenerProductos()
        listaProductos.innerHTML = ''
        productos.forEach(producto => {
            const li = document.createElement('li')
            li.textContent = `${producto.nombre} - Stock: ${producto.stock} - Precio: ${producto.precio}`
            listaProductos.appendChild(li)
        })
    }

    function mostrarVentas() {
        const ventas = obtenerVentas()
        listaVentas.innerHTML = ''
        ventas.forEach(venta => {
            const li = document.createElement('li')
            li.textContent = `${venta.nombre} - Cantidad: ${venta.cantidad}`
            listaVentas.appendChild(li)
        })
    }

    if (formularioAgregarProducto) {
        formularioAgregarProducto.addEventListener('submit', (event) => {
            event.preventDefault()
            const nombre = document.getElementById('nombreProducto').value
            const cantidad = parseInt(document.getElementById('cantidadProducto').value)
            const precio = parseFloat(document.getElementById('precioProducto').value)
            const productos = obtenerProductos()
            const productoExistente = productos.find(p => p.nombre === nombre)

            if (productoExistente) {
                productoExistente.stock += cantidad
            } else {
                productos.push({ nombre, stock: cantidad, precio })
            }
            guardarProductos(productos)
            alert('Producto agregado')
            mostrarProductos()
        })
    }

    if (formularioEliminarProducto) {
        formularioEliminarProducto.addEventListener('submit', (event) => {
            event.preventDefault()
            const nombre = document.getElementById('nombreProductoEliminar').value
            let productos = obtenerProductos()
            productos = productos.filter(p => p.nombre !== nombre)
            guardarProductos(productos)
            alert('Producto eliminado')
            mostrarProductos()
        })
    }

    if (formularioRegistrarVenta) {
        formularioRegistrarVenta.addEventListener('submit', (event) => {
            event.preventDefault()
            const nombre = document.getElementById('nombreProductoVenta').value
            const cantidad = parseInt(document.getElementById('cantidadVenta').value)
            const productos = obtenerProductos()
            const producto = productos.find(p => p.nombre === nombre)

            if (producto && producto.stock >= cantidad) {
                producto.stock -= cantidad
                guardarProductos(productos)
                const ventas = obtenerVentas()
                const ventaExistente = ventas.find(v => v.nombre === nombre)

                if (ventaExistente) {
                    ventaExistente.cantidad += cantidad
                } else {
                    ventas.push({ nombre, cantidad })
                }
                guardarVentas(ventas)
                alert('Venta registrada')
            } else {
                alert('Stock insuficiente o producto no encontrado')
            }
        })
    }

    if (document.getElementById('listaProductos')) {
        mostrarProductos()
    }

    if (document.getElementById('listaVentas')) {
        mostrarVentas()
    }
})
