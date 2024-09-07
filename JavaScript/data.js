// DATOS 
const nombreInstitucion = "Club Deportivo Guillermo Saavedra ⚽";
const nombreInstitucionElement = document.getElementById('nombre-institucion');
nombreInstitucionElement.textContent = nombreInstitucion;

let socios = [];

// Función para cargar socios desde JSON
async function cargarSociosDesdeJSON() {
    try {
        const response = await fetch('DATA-BASE/socios.json');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error al cargar los datos del JSON:", error);
    }
}

// Función para cargar datos del localStorage o JSON
async function cargarSocios() {
    const sociosGuardados = localStorage.getItem('socios');
    
    if (sociosGuardados) {
        socios = JSON.parse(sociosGuardados);
    } else {
        socios = await cargarSociosDesdeJSON();
        guardarPagosEnLocalStorage();
    }
}

// Guardar los datos en localStorage
function guardarPagosEnLocalStorage() {
    localStorage.setItem('socios', JSON.stringify(socios));
}

// Cargar datos al inicio
cargarSocios().then(() => {
    mostrarMenuPrincipal();
});