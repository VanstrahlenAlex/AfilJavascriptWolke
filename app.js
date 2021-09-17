let chess = [
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0]
];

// const función para seleccionar con el mouse 
const myFuncs = {
    "alfil":
    //elemento en el que estoy cuando doy click 
        (e) => {
        clearField();
        markPlace(e);
        let x = +e.target.dataset.x;
        let y = +e.target.dataset.y;

        //Me dibuja los posibles movimientos del alfil hacia abajo
        for (let i = 0; i < 8; i++) {
            for (let j = 0; j < 8; j++) {
                if (i == x && j == y) continue;
                if (j - i == y - x) {
                    $(`.chess-block[data-x=${i}][data-y=${j}]`).addClass('active');
                }
            }
        }
        //Me dibuja los posibles movimientos del alfil hacia arriba
        for (let i = 0; i < 8; i++) {
            for (let j = 0; j < 8; j++) {
                if (i == x && j == y) continue;
                if (i + j == x + y) {
                    $(`.chess-block[data-x=${i}][data-y=${j}]`).addClass('active');
                }
            }
        }

        changeBackgroundImage();
    }
};



const clearField = () => {

    $(".chess-block").removeClass("green active");

    $(".chess-block").css("backgroundImage", "none");
}

const markPlace = (e) => {
    e.target.classList.add("green");
}

var chosenFigure = "alfil";

// evento de seleccion de casilla 
const choose = (e) => {

    $(".figures").children(".piece").removeClass("green");

    e.target.parentNode.classList.add("green");

    $(".chess-block").unbind("click");

    $(".chess-block").bind("click", myFuncs[chosenFigure]);
    $(".descr span").text(chosenFigure);
    clearField();
};


const drawField = () => {
    let outStr = "";
    let m = 0;
    for (let i = 0; i < chess.length; i++) {
        let arr = chess[i];
        for (let j = 0; j < arr.length; j++) {
            m++;
            m % 2 == 0 ? outStr += `<div data-x=${i} data-y=${j} class = "chess-block black"></div>` : //atributos personalizados para el html
                outStr += `<div data-x=${i} data-y=${j} class = 'chess-block white'></div>`;
        }
        m++;
    }
    $(".field").html(outStr);
    $(".chess-block").bind("click", myFuncs[chosenFigure]);
    $(".piece").bind("click", choose);
    $("#boton").bind("click", posicion);

};

//funcion para asignar posición con los input
function posicion(e) {
    //elemento en el que estoy cuando doy click 

    clearField();
    markPlace(e);
    //variables para seleccionar un div con los input
    let x = parseInt($(".ancho").val());
    let y = parseInt($(".largo").val());
    $(".chess-block").removeClass('active');
    $(`.chess-block[data-x=${x}][data-y=${y}]`).addClass('active');

    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            if (i == x && j == y) continue;
            if (j - i == y - x) {
                $(`.chess-block[data-x=${i}][data-y=${j}]`).addClass('active');
            }
        }
    }

    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            if (i == x && j == y) continue;
            if (i + j == x + y) {
                $(`.chess-block[data-x=${i}][data-y=${j}]`).addClass('active');
            }
        }
    }

    changeBackgroundImage();

}


drawField();