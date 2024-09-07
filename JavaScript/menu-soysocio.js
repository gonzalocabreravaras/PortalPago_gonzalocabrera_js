//✅ MENU PRINCIPAL
mostrarMenuPrincipal();

function mostrarMenuPrincipal() {
    const portalDynamic = document.getElementById('portal-dynamic');
    
    portalDynamic.innerHTML = `
        <div class="menu-principal">
            <button class="btn btn-primary btn-lg">Soy socio</button>
            <button class="btn btn-outline-primary btn-lg">Quiero ser socio</button>
        </div>
    `;

    document.querySelector('.btn-primary').addEventListener('click', function() {
        mostrarFormularioRUT();
    });

    document.querySelector('.btn-outline-primary').addEventListener('click', function() {
        mostrarFormularioInscripcion();
    });
}

//✅ SOY SOCIO
function mostrarFormularioRUT() {
    const portalDynamic = document.getElementById('portal-dynamic');
    
    portalDynamic.innerHTML = `
        <h5>Por favor ingrese su RUT sin puntos y con guión</h5>
        <input type="text" id="rut-socio" class="form-control" placeholder="Ej: 18556332-2">
        <button class="btn btn-primary mt-3">Continuar</button>
        <button class="btn btn-outline-primary mt-3">Volver atrás</button>
        <div id="mensaje-error" class="text-danger mt-2"></div>
    `;

    document.querySelector('.btn-primary').addEventListener('click', function() {
        verificarRUT();
    });

    document.querySelector('.btn-outline-primary').addEventListener('click', function() {
        mostrarMenuPrincipal();
    });
}

function verificarRUT() {
    const rutSocio = document.getElementById('rut-socio').value;
    const socio = socios.find(socio => socio.rut === rutSocio);
    const mensajeError = document.getElementById('mensaje-error');

    if (socio) {
        mensajeError.textContent = "";
        mensajeError.classList.remove('alert', 'alert-warning');
        mostrarMenuSocio(socio);
    } else {
        mensajeError.textContent = "RUT no encontrado. Por favor verifica tu RUT o regístrate como socio.";
        mensajeError.classList.add('alert', 'alert-warning');
    }
}

//✅ SUBMENU SOY SOCIO
function mostrarMenuSocio(socio) {
    const portalDynamic = document.getElementById('portal-dynamic');
    
    portalDynamic.innerHTML = `
        <h4>Hola <strong>${socio.nombre}</strong> 👋🏼</h4>
        <h5>¿Qué quieres hacer hoy?</h5>
        <ul class="list-group">
            <li class="list-group-item list-group-item-action"><a href="#" id="pagar-cuota">1. Pagar cuota mensual</a></li>
            <li class="list-group-item list-group-item-action"><a href="#" id="ver-total">2. Historial de pagos</a></li>
            <li class="list-group-item list-group-item-action"><a href="#" id="dejar-socio">3. Dejar de ser socio</a></li>
            <li class="list-group-item list-group-item-action"><a href="#" id="volver-menu">4. Salir al menú principal</a></li>
        </ul>
    `;

    document.querySelector('#pagar-cuota').addEventListener('click', function(event) {
        event.preventDefault();
        mostrarMenuPago(socio);
    });

    document.querySelector('#ver-total').addEventListener('click', function(event) {
        event.preventDefault();
        mostrarHistorialPagos(socio);
    });

    document.querySelector('#dejar-socio').addEventListener('click', function(event) {
        event.preventDefault();
        dejarDeSerSocio(socio);
    });

    document.querySelector('#volver-menu').addEventListener('click', function() {
        mostrarMenuPrincipal();
    });
}

//✅ PAGAR CUOTA -SOY SOCIO
function mostrarMenuPago(socio) {
    const portalDynamic = document.getElementById('portal-dynamic');

    portalDynamic.innerHTML = `
        <h5>Selecciona una opción:</h5>
        <ul class="list-group">
            <li class="list-group-item list-group-item-action">
                <a href="#" id="pagar-cuota">1. Pagar cuota mensual (${formatearMonto(socio.cuotaMensual)})</a>
            </li>
            <li class="list-group-item list-group-item-action">
                <a href="#" id="volver-menu">2. Volver al menú anterior</a>
            </li>
        </ul>
    `;

    document.querySelector('#pagar-cuota').addEventListener('click', function() {
        confirmarPago(socio);
    });

    document.querySelector('#volver-menu').addEventListener('click', function() {
        mostrarMenuSocio(socio);
    });
}

// function confirmarPago(socio) {
//     const monto = formatearMonto(socio.cuotaMensual);
//     const mensajeConfirmacion = `¿Confirmas el pago de la cuota mensual de ${monto}?`;

//     document.getElementById('mensaje-confirmacion').textContent = mensajeConfirmacion;

//     const modalConfirmacion = new bootstrap.Modal(document.getElementById('modalConfirmacion'));
//     modalConfirmacion.show();

//     document.getElementById('confirmar-pago').addEventListener('click', function() {
//         pagarCuotaMensual(socio);
//         modalConfirmacion.hide();
//     });
// }👇🏼

function confirmarPago(socio) {
    Swal.fire({
        title: 'Confirmación de pago',
        text: `¿Confirmas el pago de la cuota mensual de ${formatearMonto(socio.cuotaMensual)}?`,
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Sí, pagar',
        cancelButtonText: 'Cancelar',
        customClass: {
            confirmButton: 'swal2-confirm',
            cancelButton: 'swal2-cancel'
        }
    }).then((result) => {
        if (result.isConfirmed) {
            pagarCuotaMensual(socio);
        }
    });
}


// function mostrarAgradecimiento(socio) {
//     const modalAgradecimiento = new bootstrap.Modal(document.getElementById('modalAgradecimiento'));
//     document.getElementById('mensaje-agradecimiento').textContent = "¡Muchas gracias! 🫡 El pago se ha realizado exitosamente.";
//     modalAgradecimiento.show();

//     document.getElementById('cerrar-agradecimiento').addEventListener('click', function() {
//         modalAgradecimiento.hide();
//         mostrarMenuSocio(socio);
//     });

//     modalAgradecimiento._element.addEventListener('hidden.bs.modal', function() {
//         mostrarMenuSocio(socio);
//     });
// }👇🏼

function mostrarAgradecimiento(socio) {
    Swal.fire({
        title: '¡Muchas gracias!',
        text: 'El pago se ha realizado exitosamente.',
        icon: 'success',
        confirmButtonText: 'Aceptar',
        customClass: {
            confirmButton: 'swal2-confirm'
        }
    }).then(() => {
        mostrarMenuSocio(socio);
    });
}


function formatearMonto(monto) {
    const montoEntero = Math.round(monto);
    return `$${montoEntero.toLocaleString('es-CL')}`;
}

function pagarCuotaMensual(socio) {
    socio.cuotasPagadas += socio.cuotaMensual;

    const nuevoPago = {
        fecha: new Date().toISOString().split('T')[0],
        monto: socio.cuotaMensual
    };
    socio.historialPagos.push(nuevoPago);

    guardarPagosEnLocalStorage();

    mostrarAgradecimiento(socio);
}

//✅ HISTORIAL DE PAGO -SOY SOCIO
function mostrarHistorialPagos(socio) {
    const portalDynamic = document.getElementById('portal-dynamic');
    const filas = socio.historialPagos.map(pago => `
        <tr>
            <td>${pago.fecha}</td>
            <td>${formatearMonto(pago.monto)}</td>
        </tr>
    `).join('');

    const totalPagos = socio.historialPagos.reduce((total, pago) => total + pago.monto, 0);

    portalDynamic.innerHTML = `
        <h5>Historial de Pagos</h5>
        <table class="table table-hover">
            <thead>
                <tr>
                    <th>Fecha</th>
                    <th>Monto</th>
                </tr>
            </thead>
            <tbody id="cuerpo-historial">
                ${filas}
            </tbody>
        </table>
        <div class="mt-3">
            <strong>Total Pagado: ${formatearMonto(totalPagos)}</strong>
        </div>
        <button class="btn btn-outline-primary mt-3" id="volver-menu">Volver al menú anterior</button>
    `;

    document.getElementById('volver-menu').addEventListener('click', function() {
        mostrarMenuSocio(socio);
    });
}

//✅ DEJAR DE SER SOCIO - SOY SOCIO
// function dejarDeSerSocio(socio) {
//     const mensajeConfirmacion = `¿Estás seguro de que deseas dejar de ser socio? Esta acción no se puede deshacer.`;
//     document.getElementById('mensaje-confirmacion-dejar-socio').textContent = mensajeConfirmacion;

//     const modalConfirmacion = new bootstrap.Modal(document.getElementById('modalConfirmacionDejarSocio'));
//     modalConfirmacion.show();

//     document.getElementById('confirmar-dejar-socio').addEventListener('click', function() {
//         console.log('Confirmar clickeado');
//         eliminarSocio(socio.rut);
//         modalConfirmacion.hide();
//         mostrarMenuPrincipal();
//     });
// }👇🏼

function dejarDeSerSocio(socio) {
    Swal.fire({
        title: 'Confirmación',
        text: '¿Estás seguro de que deseas dejar de ser socio? Esta acción no se puede deshacer.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sí, estoy seguro',
        cancelButtonText: 'Cancelar',
        customClass: {
            confirmButton: 'swal2-confirm',
            cancelButton: 'swal2-cancel'
        }
    }).then((result) => {
        if (result.isConfirmed) {
            eliminarSocio(socio.rut);
            mostrarMenuPrincipal();
        }
    });
}


function eliminarSocio(rut) {
    socios = socios.filter(socio => socio.rut !== rut);

    guardarPagosEnLocalStorage();
    console.log('Socio eliminado:', rut);
}

function guardarPagosEnLocalStorage() {
    localStorage.setItem('socios', JSON.stringify(socios));
}