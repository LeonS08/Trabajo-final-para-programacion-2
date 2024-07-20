document.addEventListener('DOMContentLoaded', function() {
    // Inicializar habitaciones si no están ya en el localStorage
    if (!localStorage.getItem('habitaciones')) {
        const habitaciones = Array.from({ length: 30 }, (_, index) => ({ id: index + 1, ocupada: false, cliente: null, tiempo: 0 }));
        localStorage.setItem('habitaciones', JSON.stringify(habitaciones));
    }

    // Otros códigos...

    if (formularioAsignarHabitacion) {
        formularioAsignarHabitacion.addEventListener('submit', function(event) {
            event.preventDefault();
            const nombreCliente = document.getElementById('nombreCliente').value;
            const tiempo = parseInt(document.getElementById('tiempoAsignacion').value, 10);

            asignarHabitacion(nombreCliente, tiempo);
        });
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

        // Buscar la primera habitación vacía
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

    function poblarHabitacionesEmpleado() {
        const habitaciones = JSON.parse(localStorage.getItem('habitaciones')) || [];
        if (!tablaHabitacionesEmpleado) return;
        tablaHabitacionesEmpleado.innerHTML = '';
        habitaciones.forEach(habitacion => {
            const fila = document.createElement('tr');
            fila.innerHTML = `
                <td>${habitacion.id}</td>
                <td>${habitacion.ocupada ? `Ocupada por ${habitacion.cliente}, Tiempo restante: ${habitacion.tiempo} horas` : 'Disponible'}</td>
            `;
            tablaHabitacionesEmpleado.appendChild(fila);
        });
    }

    function poblarHabitacionesAdmin() {
        const habitaciones = JSON.parse(localStorage.getItem('habitaciones')) || [];
        if (!tablaHabitaciones) return;
        tablaHabitaciones.innerHTML = '';
        habitaciones.forEach(habitacion => {
            const fila = document.createElement('tr');
            fila.innerHTML = `
                <td>${habitacion.id}</td>
                <td>${habitacion.cliente || 'Vacía'}</td>
                <td>${habitacion.tiempo} horas</td>
            `;
            tablaHabitaciones.appendChild(fila);
        });
    }

    function asignarReserva(nombre, tiempo) {
        const habitaciones = JSON.parse(localStorage.getItem('habitaciones')) || [];
        const reservas = JSON.parse(localStorage.getItem('reservas')) || [];
        
        // Buscar la primera habitación vacía
        const habitacion = habitaciones.find(h => !h.ocupada);

        if (habitacion) {
            habitacion.ocupada = true;
            habitacion.cliente = nombre;
            habitacion.tiempo = tiempo;
            localStorage.setItem('habitaciones', JSON.stringify(habitaciones));

            reservas.push({ nombre, habitacionId: habitacion.id, tiempo });
            localStorage.setItem('reservas', JSON.stringify(reservas));

            alert('Reserva asignada con éxito.');
        } else {
            alert('No hay habitaciones disponibles.');
        }
    }

    function poblarReservas() {
        const reservas = JSON.parse(localStorage.getItem('reservas')) || [];
        if (!tablaReservas) return;
        tablaReservas.innerHTML = '';
        reservas.forEach(reserva => {
            const fila = document.createElement('tr');
            fila.innerHTML = `
                <td>${reserva.nombre}</td>
                <td>${reserva.habitacionId}</td>
                <td>${reserva.tiempo} horas</td>
            `;
            tablaReservas.appendChild(fila);
        });
    }

    function actualizarEstadisticas() {
        const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
        const empleados = usuarios.filter(user => user.rol === 'empleado');
        const clientes = usuarios.filter(user => user.rol === 'cliente');

        estadisticas.innerHTML = `
            Empleados: ${empleados.length} (${empleados.map(e => e.usuario).join(', ')})<br>
            Clientes: ${clientes.length} (${clientes.map(c => c.usuario).join(', ')})
        `;
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
            poblarReservas();
        }
    }

    window.cerrarSesion = function() {
        window.location.href = 'index.html';
    }

    if (estadisticas) {
        actualizarEstadisticas();
    }
});
