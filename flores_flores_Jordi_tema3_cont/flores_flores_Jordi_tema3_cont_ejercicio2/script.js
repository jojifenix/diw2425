// Referencias a los elementos en la página
const canvasArea = document.getElementById('canvasArea');
const ctx = canvasArea.getContext('2d');
const inputTexto = document.getElementById('inputTexto');

let mensaje = '';      
let posicionX = 0;     
let desplazamiento = 3; 
let animacionCorriendo = false;   


function activarAnimacion() {
    mensaje = inputTexto.value; 
    posicionX = 0;              
    animacionCorriendo = true;  

    iniciarMovimientoTexto(); 
}


function iniciarMovimientoTexto() {
    if (!animacionCorriendo) return;

    
    ctx.clearRect(0, 0, canvasArea.width, canvasArea.height);

    
    ctx.font = '20px Arial';
    ctx.fillStyle = 'darkred';
    ctx.fillText(mensaje, posicionX, canvasArea.height / 2);

    
    posicionX += desplazamiento;

    
    if (posicionX > canvasArea.width) {
        posicionX = -ctx.measureText(mensaje).width;
    }

    
    requestAnimationFrame(iniciarMovimientoTexto);
}


window.addEventListener('beforeunload', () => {
    animacionCorriendo = false;
});
