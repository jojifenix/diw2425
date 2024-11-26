
const dbNombre = 'miDB';
let baseDatos;
const peticion = indexedDB.open(dbNombre, 1);

peticion.onupgradeneeded = function(event) {
    baseDatos = event.target.result;
    const store = baseDatos.createObjectStore("personas", { keyPath: "id", autoIncrement: true });
    store.createIndex("nombre", "nombre", { unique: false });
};
peticion.onsuccess = function(event) {
    baseDatos = event.target.result;
    mostrarNombres();
};
peticion.onerror = function(event) {
    console.error("Error al abrir la base de datos", event);
};


function agregarNombre() {
    const nombreCampo = document.getElementById("nombreInput").value;
    if (nombreCampo.trim() === "") return;
    const transaccion = baseDatos.transaction(["personas"], "readwrite");
    const store = transaccion.objectStore("personas");
    const nuevoRegistro = { nombre: nombreCampo };
    store.add(nuevoRegistro);
    transaccion.oncomplete = function() {
        document.getElementById("nombreInput").value = "";
        mostrarNombres();
    };
    transaccion.onerror = function(event) {
        console.error("Error al agregar el nombre", event);
    };
}

function mostrarNombres() {
    const nombresList = document.getElementById("nombresList");
    nombresList.innerHTML = "";
    const transaccion = baseDatos.transaction(["personas"], "readonly");
    const store = transaccion.objectStore("personas");
    store.openCursor().onsuccess = function(event) {
        const cursor = event.target.result;
        if (cursor) {
            const item = document.createElement("li");
            item.textContent = cursor.value.nombre;
            nombresList.appendChild(item);
            cursor.continue();
        }
    };
}
