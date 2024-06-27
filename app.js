let intentos = 1;
let numeroSecreto = 0;
let numeroSecretoList = [];
let maximoNro = 10;
let vidasDisponibles = 3;
let puntosTotales = 0;

// HTML Intermediarios

function htmlTxtUpdate(idelemento, texto) {
    let elementoHtml = document.getElementById(idelemento);
    elementoHtml.innerHTML = texto;
    return;
}

function htmlImgUpdate(id, url) {
    let imgHtml = document.getElementById(id);
    imgHtml.src = url;
    return;
}


function htmlImgCreator(idContenedor,url) {
    let imagen = document.createElement("img");
    imagen.src = url;
    imagen.tagName = "vida-img";
    document.getElementById(idContenedor).appendChild(imagen);
}


function htmlImgCreatorPlus(idContenedor, url,ancho, alto) {
    let imagen = document.createElement("img");
    imagen.src = url;
    imagen.width = ancho;
    imagen.height = alto;
    document.getElementById(idContenedor).appendChild(imagen);
}

// MICROS


function descontarVida() {
    //verifica hijos (vidas...)
    let vidas = document.getElementById("vidas");
    if (vidas && vidas.children.length > 0) {
        vidas.removeChild(vidas.lastChild);
    }
}

function agregarVida() {
    vidasDisponibles++;
    vidas();
}



function limpiarCampo() {
    document.querySelector('#valorUsuario').value = '';
}


function resetMeme() {
    htmlImgUpdate("meme", "img/intriga.png");
}


function vidas() {
    let contenedorVidas = document.getElementById("vidas");
    contenedorVidas.innerHTML = ''; // Limpiar el contenedor de vidas

    for (let i = 0; i < vidasDisponibles; i++) {
        htmlImgCreator("vidas","img/life.png");
    }

}

// TEXTOS

function textosIniciales() {
    htmlTxtUpdate('titulo', 'Numero Secreto');
    htmlTxtUpdate('reglamento', "Vidas iniciales 3 <br/> Por cada acierto en el primer intento suma una vida y 3 puntos extras <br /> Cada acierto suma 1 punto <br />");
    htmlTxtUpdate('texto-parrafo', `Indica un numero del 1 al ${maximoNro}`);
}


// DESARROLLO

function scorer() {
    if (intentos == 0) {
        puntosTotales = puntosTotales + 3;
    } else {
        puntosTotales = puntosTotales + 1;
    }
    htmlTxtUpdate('score', `${puntosTotales}`);
}


function juego() {
    // mensajes iniciales
    textosIniciales();
    reiniciarJuego();
    condicionesIniciales()
    puntosTotales = 0;
}

function juegoTerminado() {
    //restableciendo opciones
    document.getElementById('reiniciar').removeAttribute('disabled');
    document.getElementById('intentar').disabled=true
    htmlTxtUpdate('vidas', `<h3 class="--bs-warning">GAME OVER</h3>`);
    htmlTxtUpdate('texto-parrafo', `Se esfumaron tus ${vidasDisponibles} intentos`);
    htmlImgUpdate("meme","img/game-over.png");
}


function reiniciarJuego() {
    limpiarCampo();
    condicionesIniciales();

    resetMeme();
}



function generarNumeroSecreto() {
    numeroSecretoTemp = (Math.floor(Math.random() * maximoNro) + 1);
    if (numeroSecretoList.includes(numeroSecretoTemp)) {
        if (numeroSecretoList.length == maximoNro) {
            htmlTxtUpdate('texto-parrafo', `Se alcanzó el maximo (${maximoNro}) numero de jugadas`);
        } else {
            generarNumeroSecreto();
        }
        // agregar corte de recursividad
    } else {
        numeroSecretoList.push(numeroSecretoTemp);
        return numeroSecretoTemp;
    }
}



function verificarNumero() {
    let valorUsuario = parseInt(document.getElementById('valorUsuario').value);
    if (isNaN(valorUsuario)) {
        htmlTxtUpdate('texto-parrafo', 'Debes ingresar un número');
        htmlImgUpdate("meme", "img/lol.png");
    } else {
        if (numeroSecreto === valorUsuario) {
            if (intentos == 0) {
                htmlTxtUpdate('texto-parrafo', `Epa! +1 vida`);
                agregarVida();
                scorer();
            } else {
                htmlTxtUpdate('texto-parrafo', `de casualidad ... en ${(intentos != 0) ? intentos : ''} ${(intentos == 0) ? 'la primera' : 'veces'}`);
                htmlImgUpdate("meme", "img/feliz.png");
                
                scorer();
            }

        } else {
            descontarVida();
            limpiarCampo();
            if (valorUsuario > numeroSecreto) {
                htmlTxtUpdate('texto-parrafo', 'Ole... más bajo');
                htmlImgUpdate("meme", "img/enojado.png");
            } else {
                htmlTxtUpdate('texto-parrafo', 'mmm.. mas alto');
                htmlImgUpdate("meme", "img/enojado.png");
            }
            intentos++;
            if (vidasDisponibles > 0 && document.getElementById("vidas").children.length === 0) {
                juegoTerminado();
            }
            console.log(`Intentos: ${intentos}`);
        }
    }
    return;
}



function condicionesIniciales() {
    document.getElementById('intentar').disabled=false;
    document.getElementById('reiniciar').disabled=true;

    numeroSecreto = generarNumeroSecreto();
    vidas();
    
    console.log(numeroSecreto);
}


juego();


