let valorPantalla = document.getElementById("screen");
let operacion;
let primerValor;
let operador;
let cleanAfterEqual = false;

document.querySelectorAll('button')
  .forEach((boton) => {
    boton.addEventListener("click", function() { 
        obtenerValor(boton)
    })
  });

function obtenerValor(valorBoton) {
    if(valorBoton.id.startsWith('n')) {
        let valor = valorBoton.id.toString().slice(1,2); 
        if(valorPantalla.innerHTML.startsWith('0') || cleanAfterEqual) {
            valorPantalla.innerHTML = '';
            cleanAfterEqual = false;
        }          
        valorPantalla.innerHTML += valor;          
    } else if (valorBoton.id === "comma") {
        if (cleanAfterEqual) {
            valorPantalla.innerHTML = '0';
            cleanAfterEqual = false;
        } else {
            valorPantalla.innerHTML += ".";  
        }
    }     
    else {
        operar(valorBoton.id)
    }
}

function operar(valor) {
    switch (valor) {
        case "ac":
            valorPantalla.innerHTML = 0;
            break;
        case "delete":
            let valor1;
            valor1 = valorPantalla.textContent.slice(0,-1);
            valorPantalla.innerHTML = valor1;            
            break;              
        case "divide":
        case "multiply":
        case "add":
        case "subtract":
            operacion = valor;
            limpiarPantalla();
            document.getElementById("equal").disabled = false;
            break;   
        case "equal": 
            calcularResultado();
            break;        
    }
}

function limpiarPantalla() {
    primerValor = valorPantalla.textContent;
    valorPantalla.innerHTML = 0;    
}

function calcularResultado() {
    switch (operacion) {
        case "divide":
            valorPantalla.innerHTML = (parseFloat(primerValor) / parseFloat(valorPantalla.textContent));
            break;
        case "multiply":
            valorPantalla.innerHTML = (parseFloat(primerValor) * parseFloat(valorPantalla.textContent));
            break;
        case "add":
            valorPantalla.innerHTML = (parseFloat(primerValor) + parseFloat(valorPantalla.textContent));
            break;
        case "subtract":
            valorPantalla.innerHTML = (parseFloat(primerValor) - parseFloat(valorPantalla.textContent));
        break;
    }   
    document.getElementById("equal").disabled = true; 
    cleanAfterEqual = true;
}


