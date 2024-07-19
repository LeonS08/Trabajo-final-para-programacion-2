document.addEventListener('DOMContentLoaded', function() {
    const formularioLogin = document.getElementById('formularioLogin');
    const formularioReservas = document.getElementById('formularioReservas');
    const tablaReservas = document.getElementById('tablaReservas')?.getElementsByTagName('tbody')[0];

    if (formularioLogin) {
        formularioLogin.addEventListener('submit', function(event) {
            event.preventDefault();
            const usuario = document.getElementById('usuario').value;
            const rol = document.getElementById('rol').value;
            if (rol === 'admin') {
                window.location.href = 'admin.html';
            } else if (rol === 'empleado') {
                window.location.href = 'empleado.html';
            } else if (rol === 'cliente') {
                window.location.href = 'cliente.html';
            }
        });
    }

    if (formularioReservas) {
        formularioReservas.addEventListener('submit', function(event) {
            event.preventDefault();
            const nombre = document.getElementById('nombreReserva').value;
            const habitacion = document.getElementById('habitacionReserva').value;
            agregarReserva(nombre, habitacion);
        });
    }

    if (tablaReservas) {
        poblarReservas();
    }

    function agregarReserva(nombre, habitacion) {
        const reservas = JSON.parse(localStorage.getItem('reservas')) || [];
        reservas.push({ nombre, habitacion });
        localStorage.setItem('reservas', JSON.stringify(reservas));
        poblarReservas();
    }

    function poblarReservas() {
        const reservas = JSON.parse(localStorage.getItem('reservas')) || [];
        if (!tablaReservas) return; // Verifica si tablaReservas está definido
        tablaReservas.innerHTML = '';
        reservas.forEach((reserva, index) => {
            const fila = document.createElement('tr');
            fila.innerHTML = `
                <td>${reserva.nombre}</td>
                <td>${reserva.habitacion}</td>
                ${formularioReservas ? `<td><button onclick="eliminarReserva(${index})">Eliminar</button></td>` : ''}
            `;
            tablaReservas.appendChild(fila);
        });
    }

    window.eliminarReserva = function(index) {
        const reservas = JSON.parse(localStorage.getItem('reservas')) || [];
        reservas.splice(index, 1);
        localStorage.setItem('reservas', JSON.stringify(reservas));
        poblarReservas();
    }

    window.cerrarSesion = function() {
        window.location.href = 'index.html';
    }
});
