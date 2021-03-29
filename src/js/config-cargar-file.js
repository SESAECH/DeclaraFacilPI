window.cargarFileDeclaracion = function cargarFileDeclaracion(data){
    try {
        let avanceCaptura = JSON.parse(data);
        /* $.each(avanceCaptura.metadatos.secciones, function (index, item) {
            jsonResult.declaracion.situacionPatrimonial.datosGenerales = avanceCaptura.situacionPatrimonial.datosGenerales;

            switch(item){
                case "moduloDatosGenerales":
                    
                    break;
           }
        }); */

        Object.keys(avanceCaptura.metadatos.secciones).forEach(function (index) {
            var item = avanceCaptura.metadatos.secciones[index];
            jsonResult.declaracion[item.apartado][item.seccion] = avanceCaptura.declaracion[item.apartado][item.seccion];
        });
        

    } catch(e) {
        alert (e);
        alert("El archivo esta dañado, no se puede cargar al sistema."); // error in the above string (in this case, yes)!
    }
};

//window.cargarFileDeclaracion = cargarFileDeclaracion;