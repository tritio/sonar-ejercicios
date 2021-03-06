// airlinesPro

let flights = [

    { id: 00, to: 'Bilbao', from: 'Barcelona', cost: 1600, scale: false },
    
    { id: 01, to: 'New York', from: 'Barcelona', cost: 700, scale: false },
    
    { id: 02, to: 'Los Angeles', from: 'Madrid', cost: 1100, scale: true },
    
    { id: 03, to: 'Paris', from: 'Barcelona', cost: 210, scale: false },
    
    { id: 04, to: 'Roma', from: 'Barcelona', cost: 150, scale: false },
    
    { id: 05, to: 'London', from: 'Madrid', cost: 200, scale: false },
    
    { id: 06, to: 'Madrid', from: 'Barcelona', cost: 90, scale: false },
    
    { id: 07, to: 'Tokyo', from: 'Madrid', cost: 1500, scale: true },
    
    { id: 08, to: 'Shangai', from: 'Barcelona', cost: 800, scale: true },
    
    { id: 09, to: 'Sydney', from: 'Barcelona', cost: 150, scale: true },
    
    { id: 10, to: 'Tel-Aviv', from: 'Madrid', cost: 150, scale: false } 
    ];
    
    var crearNuevoVuelo;
    var numeroDeVuelosMenor16 =  true;
    var precioSeleccionado;
    var opcionesSeleccionPrecio;
    var vueloABorrar;
    let vuelosArray = [];
    
    
    verVuelos();
    
    
    function verVuelos() {
        let nombreObligatorio = true;
        let nombreUsuario;
        while (nombreObligatorio) {
            nombreUsuario = prompt('Hola, indíquenos su nombre: ');
            if (!nombreUsuario) {
                alert("Debe indicar un nombre");
            } else {
                nombreObligatorio = false;
            }
        }
        console.log(`Bienvenido/a ${nombreUsuario}`);
        let costeMedio = 0;
        console.log('A continuación le indicamos todos los vuelos disponibles:');
        for (let i =0; i < flights.length; i++) {
            console.log(`El vuelo con origen: ${flights[i].from}, y destino: ${flights[i].to} tiene un coste de ${flights[i].cost} €
            y ${flights[i].scale ? 'realiza escala' : 'no realiza ninguna escala'}`);
            costeMedio += flights[i].cost;
        } 
    
        console.log(`el coste medio de los vuelos es: ${(costeMedio / flights.length).toFixed(3)} €`);
        let vuelosConEscala = flights.filter( escala => escala.scale === true);
        console.log(`Los vuelos que efectuan escala son: ${vuelosConEscala.length}`);
    
        console.log(`El destino de los últimos cinco vuelos del día son: `);
        for (let i = flights.length - 5  ; i < flights.length ; i++) {
            console.log(`${flights[i].to}`);
        }
    
        let indentificador = prompt('Indique el tipo de usuario (ADMIN/USER): ');
      
        switch(indentificador.toUpperCase()){
            case 'ADMIN':
                administrar();
                break;
            case 'USER':
                buscar();
                break;
            default:
                noCorrecto();
        }
    
    }    
    
        function administrar() {
            let seleccionarOpcion = prompt("Seleccione si desea agregar un vuelo (A) o borrar un vuelo (B): ");
            if(seleccionarOpcion.toUpperCase() === 'A') {
                agregarVuelo();
            } else if(seleccionarOpcion.toUpperCase() === 'B') {
                borrarVuelo();
            } else {
                alert("Debe seleccionar la opción A (agregar) o la opción B (borrar)");
                administrar();
            }
        }
    
        function noCorrecto() {
            let repetir = confirm("No ha seleccionado una opción correcta (ADMIN / USER), ¿desea volver al menú principal?:");
            if (repetir) {
                verVuelos();
            }
        }
       
        function agregarVuelo() {       
            let nuevoVueloFrom;
            let nuevoVueloTo;
            let nuevoVueloCost;
           
            crearNuevoVuelo = confirm(`¿Desea crear un nuevo vuelo? (S/N): `);
            if(flights.length >= 16) {
                numeroDeVuelosMenor16 = false;            
                alert("NO PUEDE CREAR MÁS DE 15 VUELOS");
            }
            if (numeroDeVuelosMenor16 && crearNuevoVuelo) {
                while (crearNuevoVuelo) {            
                    while(!nuevoVueloFrom) {
                        nuevoVueloFrom =  prompt('Agregue origen del vuelo: ');
                    }
                    while(!nuevoVueloTo) {                    
                        nuevoVueloTo =  prompt('Agregue destino del vuelo: ');
                    }
                    while(!nuevoVueloCost) {  
                        nuevoVueloCost =  prompt('Agregue el coste del vuelo: ');
                        if(isNaN(parseFloat(nuevoVueloCost))) {
                            alert("Debe introducir un número");
                            nuevoVueloCost = null;
                        }  
                    }              
    
                    let nuevoVueloScale =  prompt(`Indice si el vuelo tiene escala (true/false): `);                                
                    while( !(nuevoVueloScale.toUpperCase() =='TRUE' || nuevoVueloScale.toUpperCase() == 'FALSE') ) {
                        alert('Debe escribir true o false para indicar si el vuelo tiene o no escala');
                        nuevoVueloScale =  prompt(`Indice si el vuelo tiene escala (true/false): `);             
                    }  
                    
                    let nuevoVueloScaleBoolean = stringToBoolean(nuevoVueloScale);
                            
                    flights.push(
                        {
                            id: (flights.length -1) + 1, 
                            to: nuevoVueloTo,
                            from: nuevoVueloFrom,
                            cost: +nuevoVueloCost,
                            scale: nuevoVueloScaleBoolean
                        }
                    );
        
                    crearNuevoVuelo = false;
                }
                listarVuelos();
                agregarVuelo();
            }         
    
        }
    
        function buscar() {
           
            opcionesSeleccionPrecio  = prompt("Seleccione su búsqueda por precio. Teclee para más alto -> M, más bajo -> B , igual -> I");
            
            switch(opcionesSeleccionPrecio.toUpperCase()) {        
                case "M":
                    buscarPorPrecio('m');
                    break;
                case "B":
                    buscarPorPrecio('b');
                    break;
                case "I":
                    buscarPorPrecio('i');
                    break;
                default:
                    alert("NO ha seleccionado ninguna de las opciones");
                    buscar();
            }
        }
    
        function buscarPorPrecio(opcion) {        
            while(!precioSeleccionado) {
                precioSeleccionado = prompt("Introduzca el precio de su búsqueda: ");
                if(isNaN(parseFloat(precioSeleccionado))) {
                    alert("Debe introducir un precio válido (número)");
                    precioSeleccionado = null;
                }
            }
            let resultado;
            if (opcion === 'm') {
                resultado = flights.filter(vuelo => vuelo.cost > +precioSeleccionado);
                mostrarResultadosSeleccionarPorId(resultado);
            } else if (opcion === 'b') {
                resultado = flights.filter(vuelo => vuelo.cost < +precioSeleccionado);
                mostrarResultadosSeleccionarPorId(resultado);
            } else if (opcion === 'i') {
                resultado = flights.filter(vuelo => vuelo.cost === +precioSeleccionado);
                mostrarResultadosSeleccionarPorId(resultado);
            } else {
                alert("No ha seleccioonado una opción válida, por favor vuelva a intentarlo");
                buscar();
            }        
            let seleccionarPorId;
            while(!seleccionarPorId) {
                seleccionarPorId = prompt("seleccione del listado mostrado su vuelo por id: ");
                if(!seleccionarPorId) {
                    alert("Debe introducir un id");
                }
            } 
            let vueloAComprar = resultado.filter( vuelo => vuelo.id === +seleccionarPorId);        
           if (vueloAComprar.length > 0) {
                console.log(`Su vuelo comprado es el vuelo con id ${vueloAComprar[0].id}, desde ${vueloAComprar[0].from}
                             con destino a ${vueloAComprar[0].to} con un precio de ${vueloAComprar[0].cost}`); 
                console.log("Gracias por su compra, vuelva pronto.");
           } else {
               console.log("Lo sentimos, por el id seleccionado no hemos encontrado ningún vuelo");
           }
    
        }
    
        function mostrarResultadosSeleccionarPorId(resultados) {
            console.log("    =========================================================== ");
            console.log(`Los vuelos que coinciden con su BÚSQUEDA son: `);
            for(let i =  0; i < resultados.length; i++) {
                console.log(`Vuelo con id ${resultados[i].id}, que sale de ${resultados[i].from} a ${resultados[i].to} con un coste de ${resultados[i].cost}`);            
            }
            console.log("    =========================================================== ");       
        }
    
        function borrarVuelo() {
            listarVuelos();
            vueloABorrar =prompt("Seleccione el id del vuelo a borrar: ");
            flights = flights.filter(vuelo => vuelo.id !== +vueloABorrar);        
            let seguirBorrando = confirm("¿Desea borrar otro vuelo?:");
            if (seguirBorrando) {
                borrarVuelo();
            } else {
                console.log("Ha actualizado los vuelos. Aquí puede ver la actualización: ");
                listarVuelos();
            }   
        }
    
        function stringToBoolean(escala) {
            switch(escala.toLowerCase().trim()){
                case "true": return true;
                case "false": return false;
            }
        }
    
        function listarVuelos() {
            for (let i = 0; i < flights.length; i++) {
                console.log(`Vuelo ${flights[i].id}, con origen: ${flights[i].from}, y destino: ${flights[i].to} tiene un coste de ${flights[i].cost} €
                y ${flights[i].scale ? 'realiza escala' : 'no realiza ninguna escala'} `);        
            }
        }
       
