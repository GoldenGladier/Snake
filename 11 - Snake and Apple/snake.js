var canvas = document.getElementById("lienzo");
ctx = canvas.getContext("2d");

var tableroPuntos = document.getElementById("tableroPuntos");
tabPuntos = tableroPuntos.getContext("2d");

var tabx = 0, taby = 0;
var black = true;
var tamano = 20;
var horizontal = false, vertical = false;
var moveX = 280, moveY = 280;
var appleX = randomApple(), appleY = randomApple();
var cuerpoX = [], cuerpoY = [];
var puntaje = 0;
var temporizador = null;
var botonPLay = document.getElementById("replay");
botonPLay.style.display = "none";
var colorOscuro = "#002b36", colorClaro = "#008c87";

/**************** Texto de Puntuaciones **************/
function puntos(){
tabPuntos.clearRect(0,0, tableroPuntos.width, tableroPuntos.height);
tabPuntos.font = "bold 30px sans-serif ";
tabPuntos.fillStyle = "#fff";
tabPuntos.textAlign = "center";
tabPuntos.fillText("PUNTAJE", tableroPuntos.width/2, 50);
tabPuntos.font = "bold 22px sans-serif ";
tabPuntos.fillStyle = "#fff";
tabPuntos.textAlign = "left";
tabPuntos.fillText("Puntos: " + puntaje, tableroPuntos.width/4, 150);
}
/**********************  GAME OVER      **************/
function gameOver(){
    moveX = -300;
    moveY = -150;
    direccion = null;
        cuerpoX = [];
        cuerpoY = [];
        puntaje = 0;
        appleX = -50, appleY = -50;
        for(var i = cuerpoX.length; i > 0; i--){
            cuerpoX.splice(i);
            cuerpoY.splice(i);
        }
        botonPLay.style.display = "inline";
        alert("C H O C A S T E");
        clearInterval(temporizador);
}
/**********************  RE-PLAY     **************/
function replay(){
    moveX = 280;
    moveY = 280;
    appleX = randomApple();
    appleY = randomApple();
    direccion = null;   
    snake.src = "images/snakeWait.png"
    invokeApple();
    temporizador = setInterval("run()", 150);
    botonPLay.style.display = "none";
}

/**************** Dibuja el tablero **************/
function tablero(){
ctx.fillStyle = (colorOscuro);
while(taby < 610){
        if(tabx < 600){
            ctx.fillRect(tabx, taby, tamano, tamano);
            tabx = tabx + tamano;
        }
        else{
            tabx = 0;
            taby = taby + tamano;
        }
            if(black == true){
                ctx.fillStyle = (colorClaro);
                black = false;
            }
            else{
                ctx.fillStyle = (colorOscuro);
                black = true;
            }
    }
    taby = 0;
    tabx = 0;
    black = true;
    ctx.fillStyle = (colorClaro);
}
/****************   Controles     **************/
var direccion = null;
var x = 0;
function movimiento(){
    if(direccion == "Derecha"){
        moveX += tamano;
        console.log(moveX);
    }
    if(direccion == "Izquierda"){
        moveX -= tamano;
        console.log(moveX);
    }
    if(direccion == "Arriba"){
        moveY -= tamano;
        console.log(moveY);
    }
    if(direccion == "Abajo"){
        moveY += tamano;
        console.log(moveY);
    }
    ctx.drawImage(snake, moveX, moveY, tamano, tamano);
}

function controles(event){
    var tecla = event.keyCode;
    if(horizontal == false){
        if(tecla == 39){  //DERECHA
          horizontal = true;  
          vertical = false;
          direccion = "Derecha";
          console.log(direccion);
          rotateSnake("right");
        }
        if(tecla == 37){  //IZQUIERDA
            horizontal = true;  
            vertical = false;
            direccion = "Izquierda";
            console.log(direccion);
            rotateSnake("left");
        }
    }
    if(vertical == false){
        if(tecla == 38){  //ARRIBA
          vertical = true;  
          horizontal = false;  
          direccion = "Arriba";
          console.log(direccion);
          rotateSnake("up");
        }
        if(tecla == 40){  //ABAJO
            vertical = true;  
            horizontal = false;  
            direccion = "Abajo";
            console.log(direccion);
            rotateSnake("down");
        }
    }
}
/****************   Girar Cabeza     **************/
function rotateSnake(codeEyes){
    if(codeEyes == "up"){
    snake.src = "images/snakeUp.png"
    }
    if(codeEyes == "down"){
    snake.src = "images/snakeDown.png"
    }
    if(codeEyes == "left"){
    snake.src = "images/snakeLeft.png"
    }
    if(codeEyes == "right"){
    snake.src = "images/snakeRight.png"
    }
}

/****************   Invocar manzana    **************/
function randomApple(){
    var random = (Math.floor(Math.random() * Math.floor(30))) * 20;
    return random;
}
function invokeApple(){
    ctx.drawImage(food, appleX, appleY, tamano, tamano); 
}
/****************   Comer Manzana      **************/
function eatApple(){
    if(moveX == appleX && moveY == appleY){
        appleX = randomApple();
        appleY = randomApple();
        puntaje += 1;
    }
}
/************** Agregar Y Dibujar Cuerpo ***********/
function dibujaCuerpo(){
    cuerpoX.unshift(moveX);
    cuerpoY.unshift(moveY);
    cuerpoX.splice((puntaje + 1));
    cuerpoY.splice((puntaje + 1));
    for(var i = 0; i < puntaje; i++){
    ctx.drawImage(body, cuerpoX[i], cuerpoY[i], tamano, tamano);
    }
}
/******* Detectar choques con cuerpo y pared *******/
function choques(){
    for(var contador = cuerpoX.length; contador > 1; contador--){
        if(cuerpoX[contador] == moveX && cuerpoY[contador] == moveY){
            gameOver();
        }
    }
}
function limites(){
    if(moveX < 0 || moveX > 590 || moveY < 0 || moveY > 590){
        gameOver();
    }
}
/****************** Funcion Principal *************/
function run(){
    puntos();
    limites();
    eatApple();
    tablero();
    dibujaCuerpo();
    invokeApple();
    movimiento();
    choques();
}
/****************** Preparando Assets *************/
var food = new Image();
food.src = "images/apple.png";
food.onload = invokeApple();

var snake = new Image();
snake.src = "images/snakeWait.png";
snake.onload = function() {
ctx.drawImage(snake, moveX, moveY, tamano, tamano);
}

var body = new Image();
body.src = "images/bodySnake.png";
body.onload = dibujaCuerpo();

temporizador = setInterval("run()", 150);