// 1) Array de audios
const arrayAudios=[
    "audio1.mp3",
    "audio2.mp3",
    "audio3.mp3"
]

let indicePrincipio=0;//establecer índice inicial del array
let reproAudio=document.getElementById('reproAudio');/*Accedemos a un elemento HTML
con este id, el resultado lo guarda en una variable reproAudio( nuestra variable ahora
contiene el reproductor de audio HTML*/

//Asociamos el array de audios a esta variable 
reproAudio.src=arrayAudios[indicePrincipio];

// Funciones
function reproducir() {
    reproAudio.play();
    document.getElementById('info').innerText = "Reproduciendo: " + arrayAudios[indicePrincipio];
}

function detener() {
    reproAudio.pause();
    reproAudio.currentTime = 0;
    document.getElementById('info').innerText = "Reproductor en pausa.";
}

function siguiente() {
    indicePrincipio = (indicePrincipio + 1) % arrayAudios.length;
    reproAudio.src = arrayAudios[indicePrincipio];
    reproducir();
}


function anterior() {
    indicePrincipio = (indicePrincipio - 1 + arrayAudios.length) % arrayAudios.length;
    reproAudio.src = arrayAudios[indicePrincipio];
    reproducir();
}


function aleatorio() {
    indicePrincipio = Math.floor(Math.random() * arrayAudios.length);
    reproAudio.src = arrayAudios[indicePrincipio];
    reproducir();
}

