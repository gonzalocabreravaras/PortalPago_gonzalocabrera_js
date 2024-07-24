// DATOS 
const nombreInstitucion = ("Club Deportivo Guillermo Saavedra ⚽");

const socios = [
    { rut: "18421472-5", nombre: "Alexis Sanchez", cuotasPagadas: 0 },
    { rut: "17563442-3", nombre: "Claudio Bravo", cuotasPagadas: 0 },
    { rut: "18452883-0", nombre: "Cristiano Ronaldo", cuotasPagadas: 0 },
];


// FUNCIONAL
const bienvenidaPortal = alert( "Hola, bienvenid@ al portal de"+ " " + nombreInstitucion );

let menuPrincipal = parseInt(prompt("Por favor ingresa una opción: \n 1-Soy socio \n 2-Quiero ser socio \n 3-Salir"));

while(menuPrincipal !== 3) {
    switch(menuPrincipal) {
        case 1:
            let rutSocio = prompt("Por favor ingrese su rut sin puntos y con guión (Ej: 18556332-2)")
            const socio = socios.find(socio => socio.rut === rutSocio);
            if (socio) {
                alert("Hola " + socio.nombre + " 👋🏼 Bienvenid@ de nuevo!");

                // SUBMENU SOCIOS
                let menuSocio;
                do {
                    menuSocio = parseInt(prompt("¿Qué quieres hacer hoy? 😊 \n Por favor ingresa una opción: \n 1-Pagar cuota mensual \n 2-Ver total de cuotas pagadas \n 3-Volver al menú principal"))
                    
                    switch(menuSocio) {
                        case 1:
                            pagarCuotaMensual(socio);
                            break
                        case 2:
                            mostrarTotalCuotas(socio);
                            break
                        case 3:
                            alert("Volviendo al menú principal...");
                            break 
                        default:  
                            alert("Opción incorrecta. Por favor selecciona una opción de la lista");
                            break      
                    }

                }

                while (menuSocio !== 3);
                

            } else {
                alert("RUT no encontrado. Por favor verifica tu RUT o regístrate como socio.");
            }
            break
    
        case 2:
            let nuevoNombre = prompt("Por favor ingresa tu nombre y apellido (Ej. Alejandro Garnacho)");
            let nuevoRut = prompt("Por favor ingresa tu rut sin puntos y con guión (Ej: 18556332-2)");
            socios.push({ rut: nuevoRut, nombre: nuevoNombre });
            console.log("Nuevo socio registrado:", nuevoRut, nuevoNombre);
            alert("Gracias por registrarte " + nuevoNombre + " 🫱🏻‍🫲🏻 Juntos llegaremos muy lejos!");
            break;

        case 3:
            alert("Saliendo...")
            break
            
        default:
            alert("Opción incorrecta. Por favor selecciona una opción de la lista");
            break
            
    
    }

    menuPrincipal = parseInt(prompt("Por favor ingresa una opción: \n 1-Soy socio \n 2-Quiero ser socio \n 3-Salir"));
    
}

console.log(socios);

// FUNCIONES
function pagarCuotaMensual(socio) {
    let montoCuota = parseFloat(prompt("Por favor ingresa el valor sin signos ni puntos (Ej: 5000)"));
    confirm("¿Confirmas el pago?")
    alert("¡Muchas gracias! 🫡 El pago se ha realizado exitosamente");

    actualizarCuotasPagadas(socio, montoCuota);
}


function mostrarTotalCuotas(socio) {
    alert("El total de cuotas pagadas a la fecha es: " + socio.cuotasPagadas);
}

function actualizarCuotasPagadas(socio, montoCuota){
    socio.cuotasPagadas += montoCuota;
}



