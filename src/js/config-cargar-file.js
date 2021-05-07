window.cargarFileDeclaracion = function cargarFileDeclaracion(data){
        //console.log('d:'+data+':');
        let avanceCaptura;
        //console.log($.isNumeric(data.substring(0,1)));
     try {       
        if ($.isNumeric(data.substring(0,1))){
            //console.log(data);
            let zip = '['+data+']';
            //console.log(zip);
            let unzip = pako.inflate(JSON.parse(zip),{to:'string'});
            //console.log(unzip);
            avanceCaptura = JSON.parse(unzip);
            //console.log(avanceCaptura);
            } else{
            avanceCaptura = JSON.parse(atob(data));
            //console.log(avanceCaptura);
          }

        let mismoFormato = true;
        avanceCaptura.captura.formato == jsonResult.captura.formato ? mismoFormato = true: mismoFormato = false;
        if (mismoFormato){ avanceCaptura.captura.tipo_declaracion == jsonResult.captura.tipo_declaracion ? mismoFormato = true: mismoFormato = false;}

        if (!mismoFormato){
            swal.fire({
                title: "AVANCE:" + avanceCaptura.captura.formato + " | " + avanceCaptura.captura.tipo_declaracion,
                text:"El avance no corresponde al tipo de declaración que seleccionó, ¿Desea continuar con la carga del avance?",
                showCancelButton: true,
                confirmButtonText: "Continuar",
                cancelButtonText: "Salir",
                customClass: {
                    confirmButton: "btn btn-light"
                },
              }).then((result) => {
                if (result.isConfirmed) {
                    jsonResult.declaracion.situacionPatrimonial.datosGenerales = avanceCaptura.declaracion.situacionPatrimonial.datosGenerales;
                    jsonResult.declaracion.situacionPatrimonial.domicilioDeclarante = avanceCaptura.declaracion.situacionPatrimonial.domicilioDeclarante;
                    jsonResult.declaracion.situacionPatrimonial.datosCurricularesDeclarante = avanceCaptura.declaracion.situacionPatrimonial.datosCurricularesDeclarante;
                    jsonResult.declaracion.situacionPatrimonial.datosEmpleoCargoComision = avanceCaptura.declaracion.situacionPatrimonial.datosEmpleoCargoComision;
                    jsonResult.declaracion.situacionPatrimonial.experienciaLaboral = avanceCaptura.declaracion.situacionPatrimonial.experienciaLaboral;
                    jsonResult.captura.declaracion.situacionPatrimonial.secciones[1].status="TERMINADO";
                    jsonResult.captura.declaracion.situacionPatrimonial.secciones[2].status="TERMINADO";
                    if (jsonResult.captura.tipo_declaracion != "INTERESES") {
                        jsonResult.captura.declaracion.situacionPatrimonial.secciones[3].status="TERMINADO";
                        jsonResult.captura.declaracion.situacionPatrimonial.secciones[4].status="TERMINADO";
                        jsonResult.captura.declaracion.situacionPatrimonial.secciones[5].status="TERMINADO";
                        }

                    $("input[name='nameContralor']").val(jsonResult.captura.contralor);
                    Object.keys(avanceCaptura.captura.declaracion.situacionPatrimonial.secciones).forEach(function (index) {
                        if (index<6){
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
                        }           
                    });
                    validarDeclaracionTerminada();
                    $("#modalIniciar").modal("hide");
                }
              });
        }
        else{
            jsonResult.captura = avanceCaptura.captura;
            //console.log (jsonResult.captura);
            //console.log(avanceCaptura.captura);
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

            if (typeof jsonResult.declaracion.interes != 'undefined') {
                //corrección a array.
                if (Object.keys(jsonResult.declaracion.interes.participacion.participacion).length==0){
                    jsonResult.declaracion.interes.participacion.participacion={};
                }
              }
            if (typeof avanceCaptura.captura.declaracion.fiscal !='undefined') {
                Object.keys(avanceCaptura.captura.declaracion.fiscal.secciones).forEach(function (index) {
                    var item = avanceCaptura.captura.declaracion.fiscal.secciones[index];
                    if (!jsonResult.declaracion[item.apartado]){jsonResult.declaracion[item.apartado] = {};}
                    if (!jsonResult.declaracion[item.apartado][item.seccion]){jsonResult.declaracion[item.apartado][item.seccion] = {};}
                    jsonResult.declaracion[item.apartado][item.seccion] = avanceCaptura.declaracion[item.apartado][item.seccion];
                    if (item.status =="EN_PROCESO"){
                        $(".status-seccion-" + item.apartado + "-" + item.no).removeClass("indicador-status-success").addClass("indicador-status-process").text("EN PROCESO");
                    }
                    else if (item.status =="TERMINADO"){
                        $(".status-seccion-" + item.apartado + "-" + item.no).removeClass("indicador-status").addClass("indicador-status-success").text("TERMINADO");
                    }            
                }
                );
            }

            validarDeclaracionTerminada();
            $("#modalIniciar").modal("hide");
        }
    }
    catch(e) {
        alert("El archivo esta dañado, no se puede cargar al sistema."); // error in the above string (in this case, yes)!
    }
}