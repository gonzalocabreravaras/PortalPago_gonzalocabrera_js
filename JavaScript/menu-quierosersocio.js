//✅ QUIERO SER SOCIO
function mostrarFormularioInscripcion() {
    const portalDynamic = document.getElementById('portal-dynamic');
    
    portalDynamic.innerHTML = `
        <h6 class="titulo-form">Por favor ingresa tus datos:</h6>
        <form id="form-inscripcion">
            <div class="mb-3">
                <input type="text" class="form-control" id="nombre" placeholder="Ingrese su nombre y apellido" required>
            </div>
            <div class="mb-3">
                <input type="text" class="form-control" id="rut" placeholder="Ingrese su Rut sin puntos y con guión" required>
            </div>
            <div class="mb-3">
                <label for="cuota" class="form-label" required>Seleccione su cuota mensual:</label>
                <select class="form-select" id="cuota" required>
                    <option value="5000">$5,000</option>
                    <option value="10000">$10,000</option>
                    <option value="15000">$15,000</option>
                    <option value="20000">$20,000</option>
                    <option value="25000">$25,000</option>
                    <option value="30000">$30,000</option>
                    <option value="35000">$35,000</option>
                    <option value="40000">$40,000</option>
                    <option value="45000">$45,000</option>
                    <option value="50000">$50,000</option>
                </select>
            </div>
            <button type="submit" class="btn btn-primary">Inscribirse</button>
            <button type="button" class="btn btn-outline-primary" id="volver-menu">Volver al menú principal</button>
            <div id="mensaje-error" class="text-danger mt-2"></div> <!-- Contenedor para mensajes de error -->
        </form>
    `;

    document.getElementById('form-inscripcion').addEventListener('submit', function(event) {
        event.preventDefault();
        registrarSocio();
    });

    document.getElementById('volver-menu').addEventListener('click', function() {
        mostrarMenuPrincipal();
    });
}

function registrarSocio() {
    const nombre = document.getElementById('nombre').value;
    const rut = document.getElementById('rut').value;
    const cuota = document.getElementById('cuota').value;
    const mensajeError = document.getElementById('mensaje-error');

    if (nombre && rut && cuota) {
        const socioExistente = socios.find(socio => socio.rut === rut);

        if (socioExistente) {
            mensajeError.textContent = "El RUT ya está registrado. Por favor, ingrese otro RUT.";
            mensajeError.classList.add('alert', 'alert-warning');
        } else {
            const nuevoSocio = {
                nombre: nombre,
                rut: rut,
                cuotaMensual: parseInt(cuota),
                cuotasPagadas: 0,
                historialPagos: []
            };

            socios.push(nuevoSocio);
            guardarPagosEnLocalStorage();
            mostrarAgradecimientoInscripcion();
        }
    } else {
        mensajeError.textContent = "Por favor completa todos los campos";
        mensajeError.classList.add('alert', 'alert-warning');
    }
}

// function mostrarAgradecimientoInscripcion() {
//     const modalInscripcionExitosa = new bootstrap.Modal(document.getElementById('modalInscripcionExitosa'));
//     modalInscripcionExitosa.show();

//     document.getElementById('ir-cuenta-socio').addEventListener('click', function() {
//         const socio = socios.find(s => s.rut === document.getElementById('rut').value);
//         mostrarMenuSocio(socio);
//         modalInscripcionExitosa.hide();
//     });

//     document.getElementById('volver-menu-principal').addEventListener('click', function() {
//         mostrarMenuPrincipal();
//         modalInscripcionExitosa.hide();
//     });
// } 👇🏼



function mostrarAgradecimientoInscripcion() {
    Swal.fire({
        title: 'Inscripción exitosa',
        text: '¡Tu inscripción ha sido exitosa!',
        icon: 'success',
        showCancelButton: true,
        confirmButtonText: 'Ir a mi cuenta',
        cancelButtonText: 'Volver al menú principal',
        customClass: {
            confirmButton: 'swal2-confirm',
            cancelButton: 'swal2-cancel'
        }
    }).then((result) => {
        if (result.isConfirmed) {
            const socio = socios.find(s => s.rut === document.getElementById('rut').value);
            mostrarMenuSocio(socio);
        } else {
            mostrarMenuPrincipal();
        }
    });
}

function cargarSociosDesdeLocalStorage() {
    const sociosGuardados = localStorage.getItem('socios');
    if (sociosGuardados) {
        socios = JSON.parse(sociosGuardados);
    } else {
        socios = [];
    }
}