let intentos = 0;
let numeroSecreto = 0;
let numeroSecretoList = [];
let vidasDisponibles = 0;
let puntosTotales = 0;
let primeraRonda = true;

// numero de jugadas no repetibles..{1,2,3,4,5,6,7,8,9};
let maximoNro = 9;

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


function htmlImgCreator(idContenedor, url) {
    let imagen = document.createElement("img");
    imagen.src = url;
    imagen.tagName = "vida-img";
    document.getElementById(idContenedor).appendChild(imagen);
}


function htmlImgCreatorPus(idContenedor, url, ancho, alto) {
    let imagen = document.createElement("img");
    imagen.src = url;
    imagen.width = ancho;
    imagen.height = alto;
    imagen.tagName = "vida-img";
    document.getElementById(idContenedor).appendChild(imagen);
}

function htmlRemoveContDIV(idDiv, tipoElemento) {
    let div = document.getElementById(idDiv);

    // Obtener la primera imagen dentro del div
    let img = div.getElementsByTagName(tipoElemento)[0]; 
    if (img) {
        div.removeChild(img);
    }
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
    htmlImgUpdate("meme", "img/bravo.jpeg")
    vidas();
    console.log(`vidasDisponibles: ${vidasDisponibles}`);
}

function limpiarCampo() {
    document.querySelector('#valorUsuario').value = '';
}


function resetMeme() {
    htmlImgUpdate("meme", "img/intriga.png");
    htmlTxtUpdate('horaactual', '');
    htmlRemoveContDIV('imghuev','img');

}


function vidas() {
    let contenedorVidas = document.getElementById("vidas");
    contenedorVidas.innerHTML = ''; // Limpiar el contenedor de vidas

    for (let i = 0; i < vidasDisponibles; i++) {
        htmlImgCreator("vidas", "img/life.png");
    }

}

function horaActual() {
    let date = new Date();
    htmlTxtUpdate('horaactual', `<h3>¿Te parece? ${(date.getHours == 1 ) ? 'Es la' : 'son las'}  ${date.getHours()} : ${date.getMinutes()}</h3>`);
    htmlImgUpdate("meme","");
    htmlImgCreator("imghuev", "img/hueviando.jpg");

}



// TEXTOS

function textosIniciales() {
    htmlTxtUpdate('titulo', 'Numero Secreto');
    htmlTxtUpdate('reglamento', "Vidas iniciales 3 <br/> Por cada acierto en el primer intento suma una vida y 3 puntos extras <br /> Cada acierto suma 1 punto <br />");
    htmlTxtUpdate('texto-parrafo', `Indica un numero del 1 al ${maximoNro}`);
}


// DESARROLLO

function scorer(punto) {
    puntosTotales = puntosTotales + punto;

    intentos = 0;
    htmlTxtUpdate('score', `${puntosTotales}`);
    console.log(`puntos ${puntosTotales}`);
}


function juego() {
    textosIniciales();
    reiniciarJuego();
}

function juegoTerminado() {
    primeraRonda = false;

    document.getElementById('reiniciar').removeAttribute('disabled');
    document.getElementById('intentar').disabled = true;

    htmlTxtUpdate('vidas', `<h3 class="--bs-warning">GAME OVER</h3>`);
    htmlTxtUpdate('texto-parrafo', `Se esfumaron tus ${vidasDisponibles} chances`);
    htmlImgUpdate("meme", "img/game-over.png");
}


function reiniciarJuego() {
    if (primeraRonda) {
        //resetMeme();
    } else {
        horaActual();
    }
    parametrosIniciales();
    limpiarCampo();
    vidas();

}

function generarNumeroSecreto() {

    numeroSecretoTemp = (Math.floor(Math.random() * maximoNro) + 1);

    if (numeroSecretoList.includes(numeroSecretoTemp)) {
        if (numeroSecretoList.length == maximoNro) {
            htmlTxtUpdate('texto-parrafo', `Se alcanzó el maximo (${maximoNro}) numero de jugadas`);
        } else {
            numeroSecretoTemp = generarNumeroSecreto();
        }
        // agregar corte de recursividad
    } else {
        numeroSecretoList.push(numeroSecretoTemp);
        console.log(`Nro Scr. numeroSecretoList[ult]: ${numeroSecretoList[numeroSecretoList.length - 1]}`);
    }
}


function verificarNumero() {
    let valorUsuario = parseInt(document.getElementById('valorUsuario').value);

    if (isNaN(valorUsuario)) {
        htmlTxtUpdate('texto-parrafo', 'Debes ingresar un número');
        htmlImgUpdate("meme", "img/lol.png");
    } else {
        intentos++;
        if (numeroSecretoList[numeroSecretoList.length - 1] == valorUsuario) {
            if (intentos == 1) {
                htmlTxtUpdate('texto-parrafo', `Epa! +1 vida`);
                agregarVida();
                scorer(3);
            } else {
                htmlTxtUpdate('texto-parrafo', `de casualidad ... en ${(intentos != 0) ? intentos : ''} ${(intentos == 0) ? 'la primera' : 'veces'}`);
                htmlImgUpdate("meme", "img/feliz.png");
                scorer(1);
            }
            generarNumeroSecreto();

        } else {
            descontarVida();
            limpiarCampo();
            if (valorUsuario > numeroSecretoList[numeroSecretoList.length - 1]) {
                htmlTxtUpdate('texto-parrafo', 'Ole... más bajo');
                htmlImgUpdate("meme", "img/enojado.png");
            } else {
                htmlTxtUpdate('texto-parrafo', 'mmm.. mas alto');
                htmlImgUpdate("meme", "img/enojado.png");
            }

            if (vidasDisponibles > 0 && document.getElementById("vidas").children.length === 0) {
                juegoTerminado();
            }
        }
        limpiarCampo();
    }
    return;
}



function parametrosIniciales() {
    // Restableciendo parametros
    intentos = 0;
    vidasDisponibles = 3;
    puntosTotales = 0;

    htmlTxtUpdate('score', `${puntosTotales}`);


    document.getElementById('score').value = '';
    document.getElementById('score').value = '';
    document.getElementById('intentar').disabled = false;
    document.getElementById('reiniciar').disabled = true;

    generarNumeroSecreto();

}





juego();


