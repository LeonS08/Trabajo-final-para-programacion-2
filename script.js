document.addEventListener('DOMContentLoaded', () => {
    const carrito = []

    function obtenerProductos() {
        return JSON.parse(localStorage.getItem('productos') || '[]')
    }

    function guardarProductos(productos) {
        localStorage.setItem('productos', JSON.stringify(productos))
    }

    function obtenerVentas() {
        return JSON.parse(localStorage.getItem('ventas') || '[]')
    }

    function guardarVentas(ventas) {
        localStorage.setItem('ventas', JSON.stringify(ventas))
    }

    function obtenerEmpleados() {
        return JSON.parse(localStorage.getItem('empleados') || '[]')
    }

    function guardarEmpleados(empleados) {
        localStorage.setItem('empleados', JSON.stringify(empleados))
    }

    const botonIniciarAdmin = document.getElementById('iniciarAdmin')
    const botonIniciarEmpleado = document.getElementById('iniciarEmpleado')

    if (botonIniciarAdmin) {
        botonIniciarAdmin.addEventListener('click', () => {
            window.location.href = 'login-admin.html'
        })
    }

    if (botonIniciarEmpleado) {
        botonIniciarEmpleado.addEventListener('click', () => {
            window.location.href = 'login-empleado.html'
        })
    }

    const formLoginAdmin = document.getElementById('formLoginAdmin')
    const mensajeErrorAdmin = document.getElementById('mensajeErrorAdmin')

    if (formLoginAdmin) {
        formLoginAdmin.addEventListener('submit', (e) => {
            e.preventDefault()
            const usuario = document.getElementById('usuarioAdmin').value
            const password = document.getElementById('passwordAdmin').value

            if (usuario === 'admin' && password === 'admin') {
                window.location.href = 'admin.html'
            } else {
                mensajeErrorAdmin.textContent = 'Usuario o contraseña incorrectos'
            }
        })
    }

    const formLoginEmpleado = document.getElementById('formLoginEmpleado')
    const mensajeErrorEmpleado = document.getElementById('mensajeErrorEmpleado')

    if (formLoginEmpleado) {
        formLoginEmpleado.addEventListener('submit', (e) => {
            e.preventDefault()
            const usuario = document.getElementById('usuarioEmpleado').value
            const password = document.getElementById('passwordEmpleado').value
            const empleados = obtenerEmpleados()

            const empleado = empleados.find(e => e.usuario === usuario && e.password === password)

            if (empleado) {
                window.location.href = 'ventas.html'
            } else {
                mensajeErrorEmpleado.textContent = 'Usuario o contraseña incorrectos'
            }
        })
    }

    const irStock = document.getElementById('irStock')
    const irVentas = document.getElementById('irVentas')
    const irEmpleados = document.getElementById('irEmpleados')
    const cerrarSesion = document.getElementById('cerrarSesion')

    if (irStock) {
        irStock.addEventListener('click', () => {
            window.location.href = 'stock.html'
        })
    }

    if (irVentas) {
        irVentas.addEventListener('click', () => {
            window.location.href = 'ventas.html'
        })
    }

    if (irEmpleados) {
        irEmpleados.addEventListener('click', () => {
            window.location.href = 'empleados.html'
        })
    }

    if (cerrarSesion) {
        cerrarSesion.addEventListener('click', () => {
            window.location.href = 'index.html'
        })
    }

    const volverVentas = document.getElementById('volverVentas')

    if (volverVentas) {
        volverVentas.addEventListener('click', () => {
            window.location.href = 'index.html'
        })
    }

    const volverAdmin = document.getElementById('volverAdmin')
    const formAgregarProducto = document.getElementById('formAgregarProducto')
    const formModificarProducto = document.getElementById('formModificarProducto')
    const formEliminarProducto = document.getElementById('formEliminarProducto')
    const listaStock = document.getElementById('listaStock')
    const totalStock = document.getElementById('totalStock')
    const listaVentas = document.getElementById('listaVentas')
    const totalVentas = document.getElementById('totalVentas')

    if (volverAdmin) {
        volverAdmin.addEventListener('click', () => {
            window.location.href = 'admin.html'
        })
    }

    function mostrarProductos() {
        const productos = obtenerProductos()
        listaStock.innerHTML = ''
        let totalDinero = 0

        productos.forEach(p => {
            const li = document.createElement('li')
            li.textContent = `ID: ${p.id} - Nombre: ${p.nombre} - Cantidad: ${p.cantidad} - Precio por Unidad: ${p.precio}`
            listaStock.appendChild(li)
            totalDinero += p.precio * p.cantidad
        })

        totalStock.textContent = `Total Dinero: ${totalDinero.toFixed(2)}`
    }

    function mostrarVentas() {
        const ventas = obtenerVentas()
        listaVentas.innerHTML = ''
        let totalGanancias = 0

        ventas.forEach(v => {
            const li = document.createElement('li')
            li.textContent = `ID: ${v.id} - Nombre: ${v.nombre} - Cantidad: ${v.cantidad} - Precio Total: ${v.precioTotal}`
            listaVentas.appendChild(li)
            totalGanancias += v.precioTotal
        })

        totalVentas.textContent = `Total Ganancias: ${totalGanancias.toFixed(2)}`
    }

if (formModificarVenta) {
    formModificarVenta.addEventListener('submit', (e) => {
        e.preventDefault()
        const idNombre = document.getElementById('idNombreVentaModificar').value
        const cantidad = parseInt(document.getElementById('cantidadVentaModificar').value)
        const ventas = obtenerVentas()

        const venta = ventas.find(v => v.id == idNombre || v.nombre === idNombre)

        if (venta) {
            if (cantidad >= 0) {
                venta.cantidad = cantidad
                venta.precioTotal = venta.precioTotal / (venta.cantidad || 1) * cantidad
                guardarVentas(ventas)
                mostrarVentas()
            } else {
                alert('La cantidad no puede ser negativa.')
            }
        } else {
            alert('No se encontró la venta con el ID o nombre proporcionado.')
        }
    })
}

if (formEliminarVenta) {
    formEliminarVenta.addEventListener('submit', (e) => {
        e.preventDefault()
        const idNombre = document.getElementById('idNombreVentaEliminar').value
        let ventas = obtenerVentas()

        ventas = ventas.filter(v => v.id != idNombre && v.nombre !== idNombre)
        guardarVentas(ventas)
        mostrarVentas()
    })
}


if (formAgregarProducto) {
    formAgregarProducto.addEventListener('submit', (e) => {
        e.preventDefault()
        const nombre = document.getElementById('nombreProducto').value;
        const cantidad = parseInt(document.getElementById('cantidadProducto').value)
        const precio = parseFloat(document.getElementById('precioProducto').value)
        const productos = obtenerProductos()
        
        const productoExistente = productos.find(p => p.nombre === nombre)
        if (productoExistente) {
            alert('El nombre del producto ya existe en el stock.')
            return
        }

        const id = productos.length ? productos[productos.length - 1].id + 1 : 1
        productos.push({ id, nombre, cantidad, precio, precioTotal: precio })
        guardarProductos(productos)
        mostrarProductos()
    })
}


    if (formModificarProducto) {
        formModificarProducto.addEventListener('submit', (e) => {
            e.preventDefault()
            const idNombre = document.getElementById('idNombreModificar').value
            const cantidad = parseInt(document.getElementById('cantidadModificar').value)
            const precio = parseFloat(document.getElementById('precioModificar').value)
            const productos = obtenerProductos()

            const producto = productos.find(p => p.id == idNombre || p.nombre === idNombre)

            if (producto) {
                if (cantidad) producto.cantidad = cantidad
                if (precio) producto.precio = precio
                producto.precioTotal = producto.precio * producto.cantidad

                guardarProductos(productos)
                mostrarProductos()
            }
        })
    }

    if (formEliminarProducto) {
        formEliminarProducto.addEventListener('submit', (e) => {
            e.preventDefault()
            const idNombre = document.getElementById('idNombreEliminar').value
            let productos = obtenerProductos()

            productos = productos.filter(p => p.id != idNombre && p.nombre !== idNombre)
            guardarProductos(productos)
            mostrarProductos()
        })
    }

    const formRegistrarProducto = document.getElementById('formRegistrarProducto')
    const confirmarCompra = document.getElementById('confirmarCompra')
    const montoPago = document.getElementById('montoPago')
    const totalCarrito = document.getElementById('totalCarrito')
    const listaCarrito = document.getElementById('listaCarrito')
    const totalDevolver = document.getElementById('totalDevolver')
    let carritoCompra = []

    function actualizarCarrito() {
        listaCarrito.innerHTML = ''
        let total = 0

        carritoCompra.forEach(c => {
            const li = document.createElement('li')
            li.textContent = `ID: ${c.id} - Nombre: ${c.nombre} - Cantidad: ${c.cantidad} - Precio Total: ${c.precioTotal}`
            listaCarrito.appendChild(li)
            total += c.precioTotal
        })

        totalCarrito.textContent = `Total Carrito: ${total.toFixed(2)}`
    }

if (formRegistrarProducto) {
    formRegistrarProducto.addEventListener('submit', (e) => {
        e.preventDefault()
        const idNombre = document.getElementById('idNombreProducto').value
        const cantidad = parseInt(document.getElementById('cantidadProducto').value)
        const productos = obtenerProductos()
        const producto = productos.find(p => p.id == idNombre || p.nombre === idNombre)

        if (producto) {
            const productoEnCarrito = carritoCompra.find(c => c.id === producto.id)
            if (productoEnCarrito) {
                alert('El producto ya está en el carrito.')
                return
            }

            carritoCompra.push({
                id: producto.id,
                nombre: producto.nombre,
                cantidad: cantidad,
                precioTotal: producto.precio * cantidad
            })
            actualizarCarrito()
        }
    })
}


    if (confirmarCompra) {
        confirmarCompra.addEventListener('click', () => {
            const pago = parseFloat(montoPago.value)
            const totalCarritoValue = carritoCompra.reduce((total, item) => total + item.precioTotal, 0)
            if (pago >= totalCarritoValue) {
                const devolver = pago - totalCarritoValue
                totalDevolver.textContent = `Total a Devolver: ${devolver.toFixed(2)}`

                const ventas = obtenerVentas()
                carritoCompra.forEach(c => {
                    ventas.push({
                        id: c.id,
                        nombre: c.nombre,
                        cantidad: c.cantidad,
                        precioTotal: c.precioTotal
                    })
                })
                guardarVentas(ventas)
                carritoCompra = []
                actualizarCarrito()
            } else {
                totalDevolver.textContent = `Dinero insuficiente, faltan ${totalCarritoValue - pago.toFixed(2)}`
            }
        })
    }

    if (document.getElementById('stock')) {
        mostrarProductos()
        mostrarVentas()
    }

    if (document.getElementById('ventas')) {
        mostrarVentas()
    }

    if (document.getElementById('empleados')) {
        const listaEmpleados = document.getElementById('listaEmpleados')
        const formAgregarEmpleado = document.getElementById('formAgregarEmpleado')
        const formModificarEmpleado = document.getElementById('formModificarEmpleado')
        const formEliminarEmpleado = document.getElementById('formEliminarEmpleado')
        const volverAdminEmpleados = document.getElementById('volverAdminEmpleados')

        function mostrarEmpleados() {
            const empleados = obtenerEmpleados()
            listaEmpleados.innerHTML = ''
            empleados.forEach(e => {
                const li = document.createElement('li')
                li.textContent = `Usuario: ${e.usuario}`
                listaEmpleados.appendChild(li)
            })
        }

        if (formAgregarEmpleado) {
            formAgregarEmpleado.addEventListener('submit', (e) => {
                e.preventDefault()
                const nombre = document.getElementById('nombreEmpleado').value
                const password = document.getElementById('passwordEmpleado').value
                const empleados = obtenerEmpleados()

                empleados.push({ usuario: nombre, password });
                guardarEmpleados(empleados)
                mostrarEmpleados()
            })
        }

        if (formModificarEmpleado) {
            formModificarEmpleado.addEventListener('submit', (e) => {
                e.preventDefault()
                const usuario = document.getElementById('usuarioModificar').value
                const nuevaPassword = document.getElementById('nuevaPasswordEmpleado').value
                const empleados = obtenerEmpleados()

                const empleado = empleados.find(e => e.usuario === usuario)
                if (empleado) {
                    empleado.password = nuevaPassword
                    guardarEmpleados(empleados)
                    mostrarEmpleados()
                }
            })
        }

        if (formEliminarEmpleado) {
            formEliminarEmpleado.addEventListener('submit', (e) => {
                e.preventDefault()
                const usuario = document.getElementById('usuarioEliminar').value
                let empleados = obtenerEmpleados()

                empleados = empleados.filter(e => e.usuario !== usuario)
                guardarEmpleados(empleados)
                mostrarEmpleados()
            })
        }

        if (volverAdminEmpleados) {
            volverAdminEmpleados.addEventListener('click', () => {
                window.location.href = 'admin.html'
            })
        }

        mostrarEmpleados()
    }
})
