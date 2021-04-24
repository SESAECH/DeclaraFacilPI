window.cargarFileDeclaracion = function cargarFileDeclaracion(data){
    try {
        let avanceCaptura = JSON.parse(atob(data));
        jsonResult.captura = avanceCaptura.captura;
        jsonResult.declaracion ={};
        $("input[name='nameContralor']").val(jsonResult.captura.contralor);
        Object.keys(avanceCaptura.captura.declaracion.situacionPatrimonial.secciones).forEach(function (index) {
            var item = avanceCaptura.captura.declaracion.situacionPatrimonial.secciones[index];
            if (!jsonResult.declaracion[item.apartado]){jsonResult.declaracion[item.apartado] = {};}
            if (!jsonResult.declaracion[item.apartado][item.seccion]){jsonResult.declaracion[item.apartado][item.seccion] = {};}
            jsonResult.declaracion[item.apartado][item.seccion] = avanceCaptura.declaracion[item.apartado][item.seccion];
            if (item.status =="EN_PROCESO"){
                $(".status-seccion-" + item.apartado + "-" + item.no).removeClass("indicador-status-success").addClass("indicador-status-process").text("EN PROCESO");
            }
            else if (item.status =="TERMINADO"){
                $(".status-seccion-" + item.apartado + "-" + item.no).removeClass("indicador-status").addClass("indicador-status-success").text("TERMINADO");
            }            
        });
        Object.keys(avanceCaptura.captura.declaracion.interes.secciones).forEach(function (index) {
            var item = avanceCaptura.captura.declaracion.interes.secciones[index];
            if (!jsonResult.declaracion[item.apartado]){jsonResult.declaracion[item.apartado] = {};}
            if (!jsonResult.declaracion[item.apartado][item.seccion]){jsonResult.declaracion[item.apartado][item.seccion] = {};}
            jsonResult.declaracion[item.apartado][item.seccion] = avanceCaptura.declaracion[item.apartado][item.seccion];
            if (item.status =="EN_PROCESO"){
                $(".status-seccion-" + item.apartado + "-" + item.no).removeClass("indicador-status-success").addClass("indicador-status-process").text("EN PROCESO");
            }
            else if (item.status =="TERMINADO"){
                $(".status-seccion-" + item.apartado + "-" + item.no).removeClass("indicador-status").addClass("indicador-status-success").text("TERMINADO");
            }            
        });

        validarDeclaracionTerminada();
        $("#modalIniciar").modal("hide");
    } catch(e) {
        alert("El archivo esta dañado, no se puede cargar al sistema."); // error in the above string (in this case, yes)!
    }
}