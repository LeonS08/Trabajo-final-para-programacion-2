document.addEventListener('DOMContentLoaded', () => {
    const listaVentas = document.getElementById('listaVentas');
    const formularioRegistrarVenta = document.getElementById('formularioRegistrarVenta');
    const formularioPago = document.getElementById('formularioPago');
    const totalVenta = document.getElementById('totalVenta');
    const cambioCliente = document.getElementById('cambioCliente');
    const confirmarCompra = document.getElementById('confirmarCompra');
    const otraVenta = document.getElementById('otraVenta');

    let totalDeLaVenta = 0;

    function obtenerProductos() {
        return JSON.parse(localStorage.getItem('productos')) || [];
    }

    function obtenerVentas() {
        return JSON.parse(localStorage.getItem('ventas')) || [];
    }

    function guardarVentas(ventas) {
        localStorage.setItem('ventas', JSON.stringify(ventas));
    }

    function mostrarVentas() {
        const ventas = obtenerVentas();
        listaVentas.innerHTML = '';
        totalDeLaVenta = 0;
        ventas.forEach(venta => {
            const producto = obtenerProductos().find(p => p.id === venta.id || p.nombre === venta.nombre);
            const precioTotalProducto = producto.precio * venta.cantidad;
            totalDeLaVenta += precioTotalProducto;

            const li = document.createElement('li');
            li.textContent = `${venta.nombre || 'ID:' + venta.id} - Cantidad: ${venta.cantidad} - Precio Total: ${precioTotalProducto}`;
            listaVentas.appendChild(li);
        });
        if (totalVenta) {
            totalVenta.textContent = `Total de la Venta: ${totalDeLaVenta}`;
        }
    }

    if (formularioRegistrarVenta) {
        formularioRegistrarVenta.addEventListener('submit', (event) => {
            event.preventDefault();
            const nombre = document.getElementById('nombreProductoVenta').value;
            const id = parseInt(document.getElementById('idProductoVenta').value);
            const cantidad = parseInt(document.getElementById('cantidadVenta').value);
            const productos = obtenerProductos();

            let producto;
            if (nombre) {
                producto = productos.find(p => p.nombre === nombre);
            } else if (!isNaN(id)) {
                producto = productos.find(p => p.id === id);
            }

            if (producto && producto.stock >= cantidad) {
                producto.stock -= cantidad;
                producto.precioTotal = producto.stock * producto.precio;
                localStorage.setItem('productos', JSON.stringify(productos));

                const ventas = obtenerVentas();
                const ventaExistente = ventas.find(v => v.id === producto.id || v.nombre === producto.nombre);

                if (ventaExistente) {
                    ventaExistente.cantidad += cantidad;
                } else {
                    ventas.push({ id: producto.id, nombre: producto.nombre, cantidad });
                }
                guardarVentas(ventas);
                alert('Venta registrada');
            } else {
                alert('Stock insuficiente o producto no encontrado');
            }
            mostrarVentas();
        });
    }

    if (formularioPago) {
        formularioPago.addEventListener('submit', (event) => {
            event.preventDefault();
            const pagoCliente = parseFloat(document.getElementById('pagoCliente').value);
            const cambio = pagoCliente - totalDeLaVenta;
            cambioCliente.textContent = `Cambio a Devolver: ${cambio.toFixed(2)}`;
        });
    }

    if (confirmarCompra) {
        confirmarCompra.addEventListener('click', () => {
            guardarVentas([]);
            mostrarVentas();
            cambioCliente.textContent = `Cambio a Devolver: 0`;
            alert('Compra confirmada');
        });
    }

    if (otraVenta) {
        otraVenta.addEventListener('click', () => {
            guardarVentas([]);
            mostrarVentas();
            totalVenta.textContent = 'Total de la Venta: 0';
            cambioCliente.textContent = 'Cambio a Devolver: 0';
            alert('Lista de ventas limpia. Puedes iniciar otra venta.');
        });
    }

    mostrarVentas();
});
