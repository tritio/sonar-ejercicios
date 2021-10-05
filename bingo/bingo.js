let bingoCard = [];
let nombre;
let turno = 0;
let arrayNumerosCarton = [];
let arrayNumerosSorteo = [];
let contadorLinea = 0;
let linea = [];
let linea1 = 0;
let linea2 = 0;
let linea3 = 0;

bingo();

function bingo() {
  while (!nombre) {
    nombre = prompt("Introduce tu nombre: ");
  }
  preguntarTurno();
}

function preguntarTurno() {
  turno++;
  if (turno < 2) {
    generarCarton();
    generarNumeroAleatorio();
  } else {
    generarNumeroAleatorio();
  }
  if (contadorLinea <= 1) {
    comprobarLinea();
  }
  if (haObtenidoBingo()) {
    console.log("Enhorabuena has obtenido bingo.");
  } else {
    let nuevoTurno = confirm("¿Deseas seguir jugando? ");
    if (nuevoTurno) {
      preguntarTurno();
    }
  }
}

function generarCarton() {
  for (let i = 0; i < 15; i++) {
    bingoCard.push({
      number: retornarNumeroSinRepetir(),
      matched: "false",
    });
  }
  console.log(
    "Aquí tienes tu cartón. Mucha suerte maj@, y recuerda, juega con responsabilidad."
  );
  console.table(bingoCard, ["number"]);
}

function retornarNumeroSinRepetir() {
  let numeroCarton = mathFloor(99);
  while (arrayNumerosCarton.includes(numeroCarton)) {
    numeroCarton = mathFloor(99);
  }
  arrayNumerosCarton.push(numeroCarton);
  return numeroCarton;
}

function generarNumeroAleatorio() {
  let numeroAleatorio = mathFloor(99);
  if (arrayNumerosSorteo.includes(numeroAleatorio)) {
    generarNumeroAleatorio();
  } else {
    arrayNumerosSorteo.push(numeroAleatorio);
    alert(`¡SALE DEL BOMBO EL NÚMERO: ***** ${numeroAleatorio} ***** !`);
    comprobarNumeroEnCarton(numeroAleatorio);
  }
}

function comprobarLinea() {
  for (let i = 0; i < 5; i++) {
    if (bingoCard[i].number === "X") {
      linea1++;
    }
  }
  if (linea1 === 5 && contadorLinea <= 1) {
    console.log("Han cantado LÍNEA 1 señoras y señores");
    linea1 = 0;
    contadorLinea++;
  } else {
    linea1 = 0;
  }
  for (let i = 5; i < 10; i++) {
    if (bingoCard[i].number === "X") {
      linea2++;
    }
  }
  if (linea2 === 5 && contadorLinea <= 1) {
    console.log("Han cantado LÍNEA 2 señoras y señores");
    linea2 = 0;
    contadorLinea++;
  } else {
    linea2 = 0;
  }
  for (let i = 10; i < 15; i++) {
    if (bingoCard[i].number === "X") {
      linea3++;
    }
  }
  if (linea3 === 5 && contadorLinea <= 1) {
    console.log("Han cantado LÍNEA 3 señoras y señores");
    linea3 = 0;
    contadorLinea++;
  } else {
    linea3 = 0;
  }
}

function comprobarNumeroEnCarton(numero) {
  for (let i = 0; i < bingoCard.length; i++) {
    if (bingoCard[i].number === numero) {
      bingoCard[i].number = "X";
      bingoCard[i].matched = "true";
      console.table(bingoCard, ["number"]);
    }
  }
  comprobarLinea();
}

function haObtenidoBingo() {
  let contador = 0;
  for (let i = 0; i < bingoCard.length; i++) {
    if (bingoCard[i].matched === "true") {
      contador++;
    }
  }
  if (contador === 15) {
    console.log("Han cantado bingo");
    return true;
  } else {
    return false;
  }
}

function mathFloor(numero) {
  return Math.floor(Math.random() * numero) + 1;
}
