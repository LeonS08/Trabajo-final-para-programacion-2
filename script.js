document.addEventListener('DOMContentLoaded', function() {
    const adminButton = document.getElementById('adminButton');
    const empleadoButton = document.getElementById('empleadoButton');
    const loginAdminForm = document.getElementById('loginAdminForm');
    const loginEmpleadoForm = document.getElementById('loginEmpleadoForm');
    const backToMenuButton = document.getElementById('backToMenu');
    const logoutButton = document.getElementById('logoutButton');
    const productList = document.getElementById('productList');
    const salesList = document.getElementById('salesList');
    const addProductForm = document.getElementById('addProductForm');
    const saleForm = document.getElementById('saleForm');
    const removeProductForm = document.getElementById('removeProductForm');

    // Inicializar datos si no están en localStorage
    if (!localStorage.getItem('usuarios')) {
        const usuarios = [
            { usuario: 'admin', rol: 'admin' },
            { usuario: 'empleado', rol: 'empleado' }
        ];
        localStorage.setItem('usuarios', JSON.stringify(usuarios));
    }

    if (!localStorage.getItem('productos')) {
        const productos = [
            { nombre: 'Producto 1', stock: 10, ventas: 0 },
            { nombre: 'Producto 2', stock: 5, ventas: 0 }
        ];
        localStorage.setItem('productos', JSON.stringify(productos));
    }

    // Función para manejar la selección del rol
    if (adminButton) {
        adminButton.addEventListener('click', function() {
            window.location.href = 'login-admin.html';
        });
    }

    if (empleadoButton) {
        empleadoButton.addEventListener('click', function() {
            window.location.href = 'login-empleado.html';
        });
    }

    // Función para manejar el inicio de sesión del administrador
    if (loginAdminForm) {
        loginAdminForm.addEventListener('submit', function(event) {
            event.preventDefault();
            const username = document.getElementById('adminUsername').value;
            const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
            const usuario = usuarios.find(u => u.usuario === username && u.rol === 'admin');

            if (usuario) {
                localStorage.setItem('usuarioActual', username);
                window.location.href = 'admin.html';
            } else {
                alert('Usuario incorrecto.');
            }
        });
    }

    // Función para manejar el inicio de sesión del empleado
    if (loginEmpleadoForm) {
        loginEmpleadoForm.addEventListener('submit', function(event) {
            event.preventDefault();
            const username = document.getElementById('empleadoUsername').value;
            const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
            const usuario = usuarios.find(u => u.usuario === username && u.rol === 'empleado');

            if (usuario) {
                localStorage.setItem('usuarioActual', username);
                window.location.href = 'empleado.html';
            } else {
                alert('Usuario incorrecto.');
            }
        });
    }

    // Función para mostrar productos y ventas
    function mostrarProductosYVentas() {
        const productos = JSON.parse(localStorage.getItem('productos')) || [];

        if (productList) {
            productList.innerHTML = '';
            productos.forEach(producto => {
                const li = document.createElement('li');
                li.textContent = `Nombre: ${producto.nombre}, Stock: ${producto.stock}, Ventas: ${producto.ventas}`;
                productList.appendChild(li);
            });
        }

        if (salesList) {
            salesList.innerHTML = '';
            productos.forEach(producto => {
                const li = document.createElement('li');
                li.textContent = `Nombre: ${producto.nombre}, Ventas: ${producto.ventas}`;
                salesList.appendChild(li);
            });
        }
    }

    // Función para manejar el cierre de sesión
    if (logoutButton) {
        logoutButton.addEventListener('click', function() {
            localStorage.removeItem('usuarioActual');
            window.location.href = 'index.html';
        });
    }

    // Función para manejar la adición de productos
    if (addProductForm) {
        addProductForm.addEventListener('submit', function(event) {
            event.preventDefault();
            const nombre = document.getElementById('productName').value;
            const stock = parseInt(document.getElementById('productStock').value, 10);

            const productos = JSON.parse(localStorage.getItem('productos')) || [];
            productos.push({ nombre, stock, ventas: 0 });
            localStorage.setItem('productos', JSON.stringify(productos));

            mostrarProductosYVentas();
        });
    }

    // Función para manejar la eliminación de productos
    if (removeProductForm) {
        removeProductForm.addEventListener('submit', function(event) {
            event.preventDefault();
            const nombre = document.getElementById('removeProductName').value;

            let productos = JSON.parse(localStorage.getItem('productos')) || [];
            productos = productos.filter(p => p.nombre !== nombre);
            localStorage.setItem('productos', JSON.stringify(productos));

            mostrarProductosYVentas();
        });
    }

    // Función para manejar la venta de productos
    if (saleForm) {
        saleForm.addEventListener('submit', function(event) {
            event.preventDefault();
            const nombre = document.getElementById('saleProductName').value;
            const cantidad = parseInt(document.getElementById('saleQuantity').value, 10);

            const productos = JSON.parse(localStorage.getItem('productos')) || [];
            const producto = productos.find(p => p.nombre === nombre);

            if (producto && producto.stock >= cantidad) {
                producto.stock -= cantidad;
                producto.ventas += cantidad;
                localStorage.setItem('productos', JSON.stringify(productos));
                mostrarProductosYVentas();
            } else {
                alert('Stock insuficiente o producto no encontrado.');
            }
        });
    }

    // Mostrar productos y ventas al cargar la página
    if (productList || salesList) {
        mostrarProductosYVentas();
    }

    // Función para regresar al menú principal
    if (backToMenuButton) {
        backToMenuButton.addEventListener('click', function() {
            window.location.href = 'index.html';
        });
    }
});
