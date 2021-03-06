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
    
    verVuelos();
    
    
    function verVuelos() {
        let nombreObligatorio = true;
        let nombreUsuario
        
        while (nombreObligatorio) {
            nombreUsuario = prompt('Hola, indíquenos su nombre: ');
            if(!nombreUsuario) {
                alert("Debe introducir un nombre")
            }else {
                nombreObligatorio = false;
            }      
        }
        console.log(`Bienvenido/a ${nombreUsuario}`);
        let costeMedio = 0;
        console.log('A continuación le indicamos todos los vuelos disponibles:');
        for (let i =0; i < flights.length; i++) {
            console.log(`El vuelo con origen: ${flights[i].from}, y destino: ${flights[i].to} tiene un coste de ${flights[i].cost} €
            y no realiza ninguna escala.`);
            costeMedio += flights[i].cost;
        }
        console.log(`el coste medio de los vuelos es: ${(costeMedio / flights.length).toFixed(3)} €`);
        let vuelosConEscala = flights.filter( escala => escala.scale === true);
        console.log(`Los vuelos que efectuan escala son: ${vuelosConEscala.length}`);
    
        console.log(`El destino de los últimos cinco vuelos del día son: `);
        for (let i = flights.length - 5  ; i < flights.length ; i++) {
            console.log(`${flights[i].to}`);
        }
    
    }
    
    
