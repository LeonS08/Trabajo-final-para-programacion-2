document.addEventListener('DOMContentLoaded', () => {
    const inicio = document.getElementById('inicio');
    const loginAdmin = document.getElementById('loginAdmin');
    const loginEmpleado = document.getElementById('loginEmpleado');
    const panelAdmin = document.getElementById('panelAdmin');
    const stock = document.getElementById('stock');
    const empleados = document.getElementById('empleados');
    const ventas = document.getElementById('ventas');

    const botonIrStock = document.getElementById('irStock');
    const botonIrVentas = document.getElementById('irVentas');
    const botonIrEmpleados = document.getElementById('irEmpleados');
    const botonCerrarSesion = document.getElementById('cerrarSesion');

    const botonVolverAdmin = document.getElementById('volverAdmin');
    const botonVolverAdminEmpleados = document.getElementById('volverAdminEmpleados');
    const botonVolverVentas = document.getElementById('volverVentas');

    const formLoginAdmin = document.getElementById('formLoginAdmin');
    const formLoginEmpleado = document.getElementById('formLoginEmpleado');
    const formAgregarProducto = document.getElementById('formAgregarProducto');
    const formModificarProducto = document.getElementById('formModificarProducto');
    const formEliminarProducto = document.getElementById('formEliminarProducto');
    const formRegistrarProducto = document.getElementById('formRegistrarProducto');
    const formModificarVenta = document.getElementById('formModificarVenta');
    const formEliminarVenta = document.getElementById('formEliminarVenta');
    const formAgregarEmpleado = document.getElementById('formAgregarEmpleado');
    const formModificarEmpleado = document.getElementById('formModificarEmpleado');
    const formEliminarEmpleado = document.getElementById('formEliminarEmpleado');

    const mensajeErrorAdmin = document.getElementById('mensajeErrorAdmin');
    const mensajeErrorEmpleado = document.getElementById('mensajeErrorEmpleado');

    const listaStock = document.getElementById('listaStock');
    const totalStock = document.getElementById('totalStock');
    const listaVentas = document.getElementById('listaVentas');
    const totalVentas = document.getElementById('totalVentas');

    const listaCarrito = document.getElementById('listaCarrito');
    const totalCarrito = document.getElementById('totalCarrito');
    const montoPago = document.getElementById('montoPago');
    const confirmarCompra = document.getElementById('confirmarCompra');
    const totalDevolver = document.getElementById('totalDevolver');

    let carrito = [];

    // Utilidades de almacenamiento
    function guardarProductos(productos) {
        localStorage.setItem('productos', JSON.stringify(productos));
    }

    function obtenerProductos() {
        return JSON.parse(localStorage.getItem('productos')) || [];
    }

    function guardarVentas(ventas) {
        localStorage.setItem('ventas', JSON.stringify(ventas));
    }

    function obtenerVentas() {
        return JSON.parse(localStorage.getItem('ventas')) || [];
    }

    function guardarEmpleados(empleados) {
        localStorage.setItem('empleados', JSON.stringify(empleados));
    }

    function obtenerEmpleados() {
        return JSON.parse(localStorage.getItem('empleados')) || [];
    }

    // Mostrar productos
    function mostrarProductos() {
        const productos = obtenerProductos();
        const listaProductos = document.getElementById('listaStock');
        const totalDineroElement = document.getElementById('totalStock');

        if (listaProductos && totalDineroElement) {
            listaProductos.innerHTML = '';

            let totalDinero = 0;
            productos.forEach(producto => {
                const li = document.createElement('li');
                li.textContent = `ID: ${producto.id} - Nombre: ${producto.nombre} - Cantidad: ${producto.cantidad} - Precio por Unidad: ${producto.precio} - Precio Total: ${producto.precioTotal}`;
                listaProductos.appendChild(li);
                totalDinero += producto.precioTotal;
            });

            totalDineroElement.textContent = `Total Dinero: ${totalDinero.toFixed(2)}`;
        }
    }

    // Mostrar ventas
    function mostrarVentas() {
        const ventas = obtenerVentas();
        const listaVentas = document.getElementById('listaVentas');
        const totalGananciasElement = document.getElementById('totalVentas');

        if (listaVentas && totalGananciasElement) {
            listaVentas.innerHTML = '';

            let totalGanancias = 0;
            ventas.forEach(venta => {
                const li = document.createElement('li');
                li.textContent = `ID: ${venta.id} - Nombre: ${venta.nombre} - Cantidad Vendida: ${venta.cantidad} - Precio Total: ${venta.precioTotal}`;
                listaVentas.appendChild(li);
                totalGanancias += venta.precioTotal;
            });

            totalGananciasElement.textContent = `Total Ganancias: ${totalGanancias.toFixed(2)}`;
        }
    }

    // Mostrar empleados
    function mostrarEmpleados() {
        const empleados = obtenerEmpleados();
        const listaEmpleados = document.getElementById('listaEmpleados');

        if (listaEmpleados) {
            listaEmpleados.innerHTML = '';

            empleados.forEach(empleado => {
                const li = document.createElement('li');
                li.textContent = `Usuario: ${empleado.usuario}`;
                listaEmpleados.appendChild(li);
            });
        }
    }

    // Funcionalidad de navegación
    document.getElementById('iniciarAdmin').addEventListener('click', () => {
        window.location.href = 'login-admin.html';
    });

    document.getElementById('iniciarEmpleado').addEventListener('click', () => {
        window.location.href = 'login-empleado.html';
    });

    formLoginAdmin.addEventListener('submit', (e) => {
        e.preventDefault();
        const usuario = document.getElementById('usuarioAdmin').value;
        const password = document.getElementById('passwordAdmin').value;

        if (usuario === 'admin' && password === 'admin') {
            window.location.href = 'admin.html';
        } else {
            mensajeErrorAdmin.textContent = 'Usuario o contraseña incorrectos';
        }
    });

    formLoginEmpleado.addEventListener('submit', (e) => {
        e.preventDefault();
        const usuario = document.getElementById('usuarioEmpleado').value;
        const password = document.getElementById('passwordEmpleado').value;

        const empleados = obtenerEmpleados();
        const empleado = empleados.find(e => e.usuario === usuario && e.password === password);

        if (empleado) {
            window.location.href = 'ventas.html';
        } else {
            mensajeErrorEmpleado.textContent = 'Usuario o contraseña incorrectos';
        }
    });

    botonIrStock.addEventListener('click', () => {
        window.location.href = 'stock.html';
    });

    botonIrVentas.addEventListener('click', () => {
        window.location.href = 'ventas.html';
    });

    botonIrEmpleados.addEventListener('click', () => {
        window.location.href = 'empleados.html';
    });

    botonCerrarSesion.addEventListener('click', () => {
        window.location.href = 'index.html';
    });

    botonVolverAdmin.addEventListener('click', () => {
        window.location.href = 'admin.html';
    });

    botonVolverAdminEmpleados.addEventListener('click', () => {
        window.location.href = 'admin.html';
    });

    botonVolverVentas.addEventListener('click', () => {
        const url = (document.getElementById('panelAdmin')) ? 'admin.html' : 'empleados.html';
        window.location.href = url;
    });

    // Agregar producto
    formAgregarProducto.addEventListener('submit', (e) => {
        e.preventDefault();
        const nombre = document.getElementById('nombreProducto').value;
        const cantidad = parseInt(document.getElementById('cantidadProducto').value);
        const precio = parseFloat(document.getElementById('precioProducto').value);
        const productos = obtenerProductos();
        const id = productos.length ? productos[productos.length - 1].id + 1 : 1;
        const precioTotal = precio * cantidad;

        productos.push({ id, nombre, cantidad, precio, precioTotal });
        guardarProductos(productos);
        mostrarProductos();
    });

    // Modificar producto
    formModificarProducto.addEventListener('submit', (e) => {
        e.preventDefault();
        const idNombre = document.getElementById('idNombreModificar').value;
        const cantidad = parseInt(document.getElementById('cantidadModificar').value);
        const precio = parseFloat(document.getElementById('precioModificar').value);
        const productos = obtenerProductos();

        const producto = productos.find(p => p.id == idNombre || p.nombre === idNombre);

        if (producto) {
            if (cantidad) producto.cantidad = cantidad;
            if (precio) producto.precio = precio;
            producto.precioTotal = producto.precio * producto.cantidad;

            guardarProductos(productos);
            mostrarProductos();
        }
    });

    // Eliminar producto
    formEliminarProducto.addEventListener('submit', (e) => {
        e.preventDefault();
        const idNombre = document.getElementById('idNombreEliminar').value;
        let productos = obtenerProductos();

        productos = productos.filter(p => p.id != idNombre && p.nombre !== idNombre);
        guardarProductos(productos);
        mostrarProductos();
    });

    // Registrar venta
    formRegistrarProducto.addEventListener('submit', (e) => {
        e.preventDefault();
        const nombreCliente = document.getElementById('nombreCliente').value;
        const idNombreProducto = document.getElementById('idNombreProducto').value;
        const cantidad = parseInt(document.getElementById('cantidadProducto').value);
        const productos = obtenerProductos();
        const producto = productos.find(p => p.id == idNombreProducto || p.nombre === idNombreProducto);

        if (producto && producto.cantidad >= cantidad) {
            const precioTotal = producto.precio * cantidad;
            carrito.push({ id: producto.id, nombre: producto.nombre, cantidad, precioTotal });

            producto.cantidad -= cantidad;
            producto.precioTotal = producto.precio * producto.cantidad;
            guardarProductos(productos);

            mostrarCarrito();
            mostrarProductos();
        } else {
            alert('Producto no disponible o cantidad insuficiente');
        }
    });

    function mostrarCarrito() {
        const listaCarrito = document.getElementById('listaCarrito');
        const totalCarrito = document.getElementById('totalCarrito');
        let total = 0;

        listaCarrito.innerHTML = '';

        carrito.forEach(item => {
            const li = document.createElement('li');
            li.textContent = `ID: ${item.id} - Nombre: ${item.nombre} - Cantidad: ${item.cantidad} - Precio Total: ${item.precioTotal}`;
            listaCarrito.appendChild(li);
            total += item.precioTotal;
        });

        totalCarrito.textContent = `Total Carrito: ${total.toFixed(2)}`;
    }

    // Confirmar compra
    confirmarCompra.addEventListener('click', () => {
        const monto = parseFloat(montoPago.value);
        const total = carrito.reduce((acc, item) => acc + item.precioTotal, 0);

        if (monto >= total) {
            const totalDevolver = monto - total;
            document.getElementById('totalDevolver').textContent = `Total a Devolver: ${totalDevolver.toFixed(2)}`;
            const ventas = obtenerVentas();

            carrito.forEach(item => {
                ventas.push({ id: item.id, nombre: item.nombre, cantidad: item.cantidad, precioTotal: item.precioTotal });
            });

            guardarVentas(ventas);
            carrito = [];
            mostrarCarrito();
            document.getElementById('totalDevolver').textContent = 'Total a Devolver: 0';
        } else {
            alert(`Dinero insuficiente. Faltan ${total - monto}`);
        }
    });

    // Modificar venta
    formModificarVenta.addEventListener('submit', (e) => {
        e.preventDefault();
        const idNombre = document.getElementById('idNombreVenta').value;
        const cantidad = parseInt(document.getElementById('cantidadVenta').value);
        const precio = parseFloat(document.getElementById('precioVenta').value);
        const ventas = obtenerVentas();

        const venta = ventas.find(v => v.id == idNombre || v.nombre === idNombre);

        if (venta) {
            if (cantidad) venta.cantidad = cantidad;
            if (precio) venta.precioTotal = precio * venta.cantidad;

            guardarVentas(ventas);
            mostrarVentas();
        }
    });

    // Eliminar venta
    formEliminarVenta.addEventListener('submit', (e) => {
        e.preventDefault();
        const idNombre = document.getElementById('idNombreEliminarVenta').value;
        let ventas = obtenerVentas();

        ventas = ventas.filter(v => v.id != idNombre && v.nombre !== idNombre);
        guardarVentas(ventas);
        mostrarVentas();
    });

    // Agregar empleado
    formAgregarEmpleado.addEventListener('submit', (e) => {
        e.preventDefault();
        const nombre = document.getElementById('nombreEmpleado').value;
        const password = document.getElementById('passwordEmpleado').value;
        const empleados = obtenerEmpleados();
        const usuario = nombre;

        empleados.push({ usuario, password });
        guardarEmpleados(empleados);
        mostrarEmpleados();
    });

    // Modificar empleado
    formModificarEmpleado.addEventListener('submit', (e) => {
        e.preventDefault();
        const usuario = document.getElementById('usuarioModificar').value;
        const nuevaPassword = document.getElementById('nuevaPasswordEmpleado').value;
        const empleados = obtenerEmpleados();

        const empleado = empleados.find(e => e.usuario === usuario);

        if (empleado) {
            empleado.password = nuevaPassword;
            guardarEmpleados(empleados);
            mostrarEmpleados();
        }
    });

    // Eliminar empleado
    formEliminarEmpleado.addEventListener('submit', (e) => {
        e.preventDefault();
        const usuario = document.getElementById('usuarioEliminar').value;
        let empleados = obtenerEmpleados();

        empleados = empleados.filter(e => e.usuario !== usuario);
        guardarEmpleados(empleados);
        mostrarEmpleados();
    });

    // Mostrar datos iniciales
    mostrarProductos();
    mostrarVentas();
    mostrarEmpleados();
});
