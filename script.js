document.addEventListener('DOMContentLoaded', function() {
    const formularioLogin = document.getElementById('formularioLogin');
    const formularioRegistro = document.getElementById('formularioRegistro');
    const formularioCambioContraseña = document.getElementById('formularioCambioContraseña');
    const formularioCrearEmpleado = document.getElementById('formularioCrearEmpleado');
    const formularioAsignarHabitacion = document.getElementById('formularioAsignarHabitacion');
    const tablaReservas = document.getElementById('tablaReservas');
    const tablaHabitacionesEmpleado = document.getElementById('tablaHabitacionesEmpleado');
    const tablaHabitaciones = document.getElementById('tablaHabitaciones');
    const estadisticas = document.getElementById('estadisticas');

    // Inicializar habitaciones si no están ya en el localStorage
    if (!localStorage.getItem('habitaciones')) {
        const habitaciones = Array.from({ length: 30 }, (_, index) => ({ id: index + 1, ocupada: false, cliente: null, tiempo: 0 }));
        localStorage.setItem('habitaciones', JSON.stringify(habitaciones));
    }

    // Inicializar usuarios si no están ya en el localStorage
    if (!localStorage.getItem('usuarios')) {
        const usuarios = [
            { usuario: 'admin', contraseña: 'admin', rol: 'admin' },
            { usuario: 'empleado', contraseña: 'empleado', rol: 'empleado' }
        ];
        localStorage.setItem('usuarios', JSON.stringify(usuarios));
    }

    const urlParams = new URLSearchParams(window.location.search);
    const rol = urlParams.get('rol');

    if (rol && formularioLogin) {
        const rolInput = document.getElementById('rol');
        const registroCliente = document.getElementById('registroCliente');
        rolInput.value = rol;

        if (rol === 'cliente') {
            registroCliente.style.display = 'block';
        }

        formularioLogin.addEventListener('submit', function(event) {
            event.preventDefault();
            const usuario = document.getElementById('usuario').value;
            const contraseña = document.getElementById('contraseña').value;

            const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
            const usuarioEncontrado = usuarios.find(user => user.usuario === usuario && user.contraseña === contraseña && user.rol === rol);

            if (usuarioEncontrado) {
                localStorage.setItem('usuarioActual', JSON.stringify(usuarioEncontrado));
                if (rol === 'admin') {
                    window.location.href = 'admin.html';
                } else if (rol === 'empleado') {
                    window.location.href = 'empleado.html';
                } else if (rol === 'cliente') {
                    window.location.href = 'cliente.html';
                }
            } else {
                alert('Usuario o contraseña incorrectos');
            }
        });
    }

    if (formularioRegistro) {
        formularioRegistro.addEventListener('submit', function(event) {
            event.preventDefault();
            const nuevoUsuario = document.getElementById('nuevoUsuario').value;
            const nuevaContraseña = document.getElementById('nuevaContraseña').value;

            const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
            const usuarioExistente = usuarios.find(user => user.usuario === nuevoUsuario);

            if (usuarioExistente) {
                alert('El nombre de usuario ya está en uso');
            } else {
                usuarios.push({ usuario: nuevoUsuario, contraseña: nuevaContraseña, rol: 'cliente' });
                localStorage.setItem('usuarios', JSON.stringify(usuarios));
                alert('Registro exitoso. Ahora estás logueado.');
                localStorage.setItem('usuarioActual', JSON.stringify({ usuario: nuevoUsuario, contraseña: nuevaContraseña, rol: 'cliente' }));
                window.location.href = 'cliente.html';
            }
        });
    }

    if (formularioCambioContraseña) {
        formularioCambioContraseña.addEventListener('submit', function(event) {
            event.preventDefault();
            const usuarioCliente = document.getElementById('usuarioCliente').value;
            const nuevaContraseña = document.getElementById('nuevaContraseñaCliente').value;

            const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
            const cliente = usuarios.find(user => user.usuario === usuarioCliente && user.rol === 'cliente');

            if (cliente) {
                cliente.contraseña = nuevaContraseña;
                localStorage.setItem('usuarios', JSON.stringify(usuarios));
                alert('Contraseña cambiada con éxito');
            } else {
                alert('Cliente no encontrado');
            }
        });
    }

    if (formularioCrearEmpleado) {
        formularioCrearEmpleado.addEventListener('submit', function(event) {
            event.preventDefault();
            const usuarioEmpleado = document.getElementById('usuarioEmpleado').value;
            const contraseñaEmpleado = document.getElementById('contraseñaEmpleado').value;

            const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
            const usuarioExistente = usuarios.find(user => user.usuario === usuarioEmpleado);

            if (usuarioExistente) {
                alert('El nombre de usuario ya está en uso');
            } else {
                usuarios.push({ usuario: usuarioEmpleado, contraseña: contraseñaEmpleado, rol: 'empleado' });
                localStorage.setItem('usuarios', JSON.stringify(usuarios));
                alert('Empleado creado con éxito');
                actualizarEstadisticas();
            }
        });
    }

    if (formularioAsignarHabitacion) {
        formularioAsignarHabitacion.addEventListener('submit', function(event) {
            event.preventDefault();
            const nombreCliente = document.getElementById('nombreCliente').value;
            const tiempo = parseInt(document.getElementById('tiempoAsignacion').value, 10);

            asignarHabitacion(nombreCliente, tiempo);
        });
    }

    if (tablaReservas) {
        poblarReservas();
    }

    if (tablaHabitacionesEmpleado) {
        poblarHabitacionesEmpleado();
    }

    if (tablaHabitaciones) {
        poblarHabitacionesAdmin();
    }

    function asignarHabitacion(nombreCliente, tiempo) {
        const habitaciones = JSON.parse(localStorage.getItem('habitaciones')) || [];
        const reservas = JSON.parse(localStorage.getItem('reservas')) || [];

        const habitacion = habitaciones.find(h => !h.ocupada);

        if (habitacion) {
            habitacion.ocupada = true;
            habitacion.cliente = nombreCliente;
            habitacion.tiempo = tiempo;
            localStorage.setItem('habitaciones', JSON.stringify(habitaciones));

            reservas.push({ nombre: nombreCliente, habitacionId: habitacion.id, tiempo });
            localStorage.setItem('reservas', JSON.stringify(reservas));

            alert('Habitación asignada con éxito.');
            poblarHabitacionesEmpleado();
        } else {
            alert('No hay habitaciones disponibles.');
        }
    }

    function poblarReservas() {
        const reservas = JSON.parse(localStorage.getItem('reservas')) || [];
        const usuarioActual = JSON.parse(localStorage.getItem('usuarioActual')) || {};
        if (!tablaReservas) return;
        tablaReservas.innerHTML = '';
        reservas.forEach(reserva => {
            if (reserva.nombre === usuarioActual.usuario) {
                const fila = document.createElement('tr');
                fila.innerHTML = `
                    <td>${reserva.habitacionId}</td>
                    <td>${reserva.tiempo} días</td>
                `;
                tablaReservas.appendChild(fila);
            }
        });
    }

    function poblarHabitacionesEmpleado() {
        const habitaciones = JSON.parse(localStorage.getItem('habitaciones')) || [];
        if (!tablaHabitacionesEmpleado) return;
        tablaHabitacionesEmpleado.innerHTML = '';
        habitaciones.forEach(habitacion => {
            const fila = document.createElement('tr');
            fila.innerHTML = `
                <td>${habitacion.id}</td>
                <td>${habitacion.ocupada ? `Ocupada por ${habitacion.cliente}, Tiempo restante: ${habitacion.tiempo} días` : 'Disponible'}</td>
            `;
            tablaHabitacionesEmpleado.appendChild(fila);
        });
    }

    function poblarHabitacionesAdmin() {
        const habitaciones = JSON.parse(localStorage.getItem('habitaciones')) || [];
        if (!tablaHabitaciones) return;
        tablaHabitaciones.innerHTML = '';
        habitaciones.forEach((habitacion, index) => {
            const fila = document.createElement('tr');
            fila.innerHTML = `
                <td>${habitacion.id}</td>
                <td>${habitacion.cliente || 'Vacía'}</td>
                <td>${habitacion.tiempo} días</td>
                <td>${habitacion.ocupada ? `<button onclick="eliminarReserva(${index})">Cancelar Reserva</button>` : ''}</td>
            `;
            tablaHabitaciones.appendChild(fila);
        });
    }

    function actualizarEstadisticas() {
        const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
        const empleados = usuarios.filter(user => user.rol === 'empleado');
        const clientes = usuarios.filter(user => user.rol === 'cliente');

        if (estadisticas) {
            estadisticas.innerHTML = `
                Empleados: ${empleados.length} (${empleados.map(e => e.usuario).join(', ')})<br>
                Clientes: ${clientes.length} (${clientes.map(c => c.usuario).join(', ')})
            `;
        }
    }

    window.eliminarReserva = function(index) {
        const reservas = JSON.parse(localStorage.getItem('reservas')) || [];
        const habitaciones = JSON.parse(localStorage.getItem('habitaciones')) || [];

        const reserva = reservas[index];
        if (reserva) {
            const habitacion = habitaciones.find(h => h.id === reserva.habitacionId);
            if (habitacion) {
                habitacion.ocupada = false;
                habitacion.cliente = null;
                habitacion.tiempo = 0;
                localStorage.setItem('habitaciones', JSON.stringify(habitaciones));
            }

            reservas.splice(index, 1);
            localStorage.setItem('reservas', JSON.stringify(reservas));
            poblarHabitacionesAdmin();
        }
    }

    function cerrarSesion() {
        localStorage.removeItem('usuarioActual');
        window.location.href = 'login.html?rol=cliente';
    }

    if (estadisticas) {
        actualizarEstadisticas();
    }
});
