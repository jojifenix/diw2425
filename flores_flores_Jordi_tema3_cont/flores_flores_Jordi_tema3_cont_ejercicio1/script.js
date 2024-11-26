// Variables para interactuar con el DOM
const player = document.getElementById('player');
const inputVideos = document.getElementById('inputVideos');
const eventLog = document.getElementById('eventLog');

let listaDeVideos = []; // Guarda las URLs de los videos
let indiceVideo = 0;    // Indice para controlar el video actual

// Iniciar la reproducción de la lista de videos
function iniciarLista() {
    // Obtener URLs de la entrada de texto y procesarlas
    listaDeVideos = inputVideos.value.split(',').map(url => url.trim());
    indiceVideo = 0;

    if (listaDeVideos.length > 0) {
        cargarYReproducir();
    } else {
        agregarMensaje("No se ha ingresado ninguna URL.");
    }
}

// Cargar y reproducir un video de la lista
function cargarYReproducir() {
    if (indiceVideo < listaDeVideos.length) {
        const urlVideo = listaDeVideos[indiceVideo];
        player.src = urlVideo;

        // Control de error si el video no se carga
        player.onerror = () => {
            agregarMensaje(`El archivo de video "${urlVideo}" no se encuentra.`);
            siguienteVideo();
        };

        // Iniciar reproducción y manejar errores
        player.play().then(() => {
            agregarMensaje(`Reproduciendo: ${urlVideo}`);
        }).catch(error => {
            agregarMensaje("Error al reproducir el video.");
            siguienteVideo();
        });
    }
}

// Avanzar al siguiente video en la lista
function siguienteVideo() {
    indiceVideo++;
    if (indiceVideo < listaDeVideos.length) {
        cargarYReproducir();
    } else {
        agregarMensaje("Fin de la lista de reproducción.");
    }
}

// Eventos para mostrar en el log
player.onended = () => {
    agregarMensaje("Video terminado.");
    siguienteVideo();
};

player.onplay = () => agregarMensaje("Reproducción en curso.");
player.onpause = () => agregarMensaje("Video en pausa.");
player.onvolumechange = () => agregarMensaje(`Volumen: ${player.volume * 100}%`);
player.onseeking = () => agregarMensaje("Buscando en el video...");
player.onseeked = () => agregarMensaje("Posición encontrada.");
player.onwaiting = () => agregarMensaje("Cargando video...");
player.onloadeddata = () => agregarMensaje("Datos de video cargados.");
player.oncanplay = () => agregarMensaje("Video listo para reproducir.");
player.oncanplaythrough = () => agregarMensaje("Reproducción sin interrupciones lista.");

// Mostrar mensajes en el log
function agregarMensaje(mensaje) {
    const hora = new Date().toLocaleTimeString();
    eventLog.innerHTML += `<p>[${hora}] ${mensaje}</p>`;
    eventLog.scrollTop = eventLog.scrollHeight;
}
