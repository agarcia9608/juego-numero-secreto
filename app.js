// Declaración de variables
let numeroSecreto;
let intentos;
let listaNumerosSorteados = [];
let numeroMaximo = 10;

// Función para asignar texto a un elemento HTML
function asignarTextoElemento(elemento, texto){
    let elementoHTML = document.querySelector(elemento);
    elementoHTML.innerHTML = texto;
    return;
}

// Función para verificar el intento del usuario
function verificarIntento() {
    let numeroDeUsuario = parseInt(document.getElementById('valorUsuario').value);

    // Verificar si el número ingresado es válido
    if (numeroDeUsuario === numeroSecreto){
        asignarTextoElemento('p',`Acertaste el número secreto en ${intentos} ${(intentos === 1) ? 'intento':'intentos'}!`);  
        document.getElementById('reiniciar').removeAttribute('disabled');
    }
    else{
        // Si el usuario no acertó el número secreto se le dan pistas para el siguiente intento
        if (numeroDeUsuario > numeroSecreto){
            asignarTextoElemento('p','El número secreto es menor!');
        }
        else{
            asignarTextoElemento('p','El número secreto es mayor!');
        }
        // Se incrementa el número de intentos
        intentos++;
        // Se limpia la caja de texto
        limpiarCaja();
    }
    return;
}

// Función para limpiar la caja de texto
function limpiarCaja(){
    document.querySelector('#valorUsuario').value = '';
    return;
}

// Función para generar un número aleatorio
function generarNumeroSecreto() {
    // Generar un número aleatorio entre 1 y el número máximo
    let numeroGenerado = Math.floor(Math.random() * numeroMaximo) + 1;
    // console.log(numeroGenerado); 
    // console.log(listaNumerosSorteados);

    // Verificar si el número generado ya fue sorteado
    if (listaNumerosSorteados.length == numeroMaximo){
        asignarTextoElemento('p', 'No hay más números para sortear!');
    } else {
        if (listaNumerosSorteados.includes(numeroGenerado)){
            // Recursividad para generar un nuevo número
            return generarNumeroSecreto();
        } else {
            listaNumerosSorteados.push(numeroGenerado);
            return numeroGenerado;
        }
    } 
}

// Función para establecer las condiciones iniciales del juego
function condicionesIniciales(){
    asignarTextoElemento('h1','Juego del número secreto!');
    asignarTextoElemento('p',`Indica un número del 1 al ${numeroMaximo}`); 
    numeroSecreto = generarNumeroSecreto();
    intentos = 1;
    return;
}

// Función para reiniciar el juego
function reiniciarJuego(){
    limpiarCaja();
    condicionesIniciales();
    //Deshabilitar el botón de reiniciar
    document.getElementById('reiniciar').setAttribute('disabled',true); 
}

condicionesIniciales();