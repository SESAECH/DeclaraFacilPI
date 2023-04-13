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
        //console.log(avanceCaptura);
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
                  //jsonResult.declaracion ={};
                  $("input[name='nameContralor']").val(avanceCaptura.captura.contralor);
                  $("#cboAnioEjercicio").val(avanceCaptura.captura.anio);
/*                    jsonResult.declaracion.situacionPatrimonial.datosGenerales = avanceCaptura.declaracion.situacionPatrimonial.datosGenerales;
                    jsonResult.declaracion.situacionPatrimonial.domicilioDeclarante = avanceCaptura.declaracion.situacionPatrimonial.domicilioDeclarante;
                    jsonResult.declaracion.situacionPatrimonial.datosCurricularesDeclarante = avanceCaptura.declaracion.situacionPatrimonial.datosCurricularesDeclarante;
                    jsonResult.declaracion.situacionPatrimonial.datosEmpleoCargoComision = avanceCaptura.declaracion.situacionPatrimonial.datosEmpleoCargoComision;
                    jsonResult.declaracion.situacionPatrimonial.experienciaLaboral = avanceCaptura.declaracion.situacionPatrimonial.experienciaLaboral;
*/
                    // cargamos declaracion de situacion patrimonial                    

                    if (jsonResult.captura.formato =='COMPLETA'){
                          if (jsonResult.captura.tipo_declaracion == 'INTERESES'){
                            maxindice = 3;
                            avanceCaptura.captura.declaracion.situacionPatrimonial.secciones[2] = avanceCaptura.captura.declaracion.situacionPatrimonial.secciones[4];
                            avanceCaptura.captura.declaracion.situacionPatrimonial.secciones[2].no = 2;
                          } else {maxindice = 16;}  }
                       else {
                         maxindice = 7;
                         if (avanceCaptura.captura.formato=="COMPLETA"){
                           avanceCaptura.captura.declaracion.situacionPatrimonial.secciones[6] = avanceCaptura.captura.declaracion.situacionPatrimonial.secciones[8];
                           avanceCaptura.captura.declaracion.situacionPatrimonial.secciones[6].no = 6;
                         }
                       }
                    Object.keys(avanceCaptura.captura.declaracion.situacionPatrimonial.secciones).forEach(function (index) {
                        if (index<maxindice && index !=9){
                            var item = avanceCaptura.captura.declaracion.situacionPatrimonial.secciones[index];
                            //console.log (item);
                            /*
                            if(item.moduloName == 'moduloIngresos'){
                              if (jsonResult.captura.formato=='COMPLETA'){item.no=8;}
                              if (jsonResult.captura.formato=='SIMPLIFICADA'){item.no=6;}
                            }
                            */

                            if (!jsonResult.declaracion[item.apartado]){jsonResult.declaracion[item.apartado] = {};}
                            if (!jsonResult.declaracion[item.apartado][item.seccion]){jsonResult.declaracion[item.apartado][item.seccion] = {};}
                            jsonResult.declaracion[item.apartado][item.seccion] = avanceCaptura.declaracion[item.apartado][item.seccion];

                            if(item.moduloName == 'moduloIngresos'){

                              let oldrow = jsonResult.declaracion.situacionPatrimonial.ingresos;
                              let remuneracionCargoPublico = oldrow.remuneracionMensualCargoPublico ?? oldrow.remuneracionAnualCargoPublico ?? oldrow.remuneracionConclusionCargoPublico ?? {};
                              let otrosIngresos = oldrow.otrosIngresosMensualesTotal ?? oldrow.otrosIngresosAnualesTotal ?? oldrow.otrosIngresosConclusionTotal;
                              let ingresosDeclarante = oldrow.ingresoMensualNetoDeclarante ?? oldrow.ingresoAnualNetoDeclarante ?? oldrow.ingresoConclusionNetoDeclarante;
                              let ingresosParejaDependiente = oldrow.ingresoMensualNetoParejaDependiente ?? oldrow.ingresoAnualNetoParejaDependiente ?? oldrow.ingresoConclusionNetoParejaDependiente;
                              let totalIngresos = oldrow.totalIngresosMensualesNetos ?? oldrow.totalIngresosAnualesNetos ?? oldrow.totalIngresosConclusionNetos;

                              delete jsonResult.declaracion.situacionPatrimonial.ingresos.enajenacionBienes; // no tiene caso cargar los datos de enajenacionBienes

                              delete jsonResult.declaracion.situacionPatrimonial.ingresos.remuneracionMensualCargoPublico;
                              delete jsonResult.declaracion.situacionPatrimonial.ingresos.remuneracionAnualCargoPublico;
                              delete jsonResult.declaracion.situacionPatrimonial.ingresos.remuneracionConclusionCargoPublico;

                              delete jsonResult.declaracion.situacionPatrimonial.ingresos.otrosIngresosMensualesTotal;
                              delete jsonResult.declaracion.situacionPatrimonial.ingresos.otrosIngresosAnualesTotal;
                              delete jsonResult.declaracion.situacionPatrimonial.ingresos.otrosIngresosConclusionTotal;

                              delete jsonResult.declaracion.situacionPatrimonial.ingresos.ingresoMensualNetoDeclarante;
                              delete jsonResult.declaracion.situacionPatrimonial.ingresos.ingresoAnualNetoDeclarante;
                              delete jsonResult.declaracion.situacionPatrimonial.ingresos.ingresoConclusionNetoDeclarante;

                              delete jsonResult.declaracion.situacionPatrimonial.ingresos.ingresoMensualNetoParejaDependiente;
                              delete jsonResult.declaracion.situacionPatrimonial.ingresos.ingresoAnualNetoParejaDependiente;
                              delete jsonResult.declaracion.situacionPatrimonial.ingresos.ingresoConclusionNetoParejaDependiente;

                              delete jsonResult.declaracion.situacionPatrimonial.ingresos.totalIngresosMensualesNetos;
                              delete jsonResult.declaracion.situacionPatrimonial.ingresos.totalIngresosAnualesNetos;
                              delete jsonResult.declaracion.situacionPatrimonial.ingresos.totalIngresosConclusionNetos;

                              switch (jsonResult.captura.tipo_declaracion) {
                                      case "INICIAL":
                                        jsonResult.declaracion.situacionPatrimonial.ingresos.remuneracionMensualCargoPublico = remuneracionCargoPublico;
                                        jsonResult.declaracion.situacionPatrimonial.ingresos.otrosIngresosMensualesTotal = otrosIngresos;
                                        jsonResult.declaracion.situacionPatrimonial.ingresos.ingresoMensualNetoDeclarante = ingresosDeclarante;
                                        jsonResult.declaracion.situacionPatrimonial.ingresos.ingresoMensualNetoParejaDependiente = ingresosParejaDependiente;
                                        jsonResult.declaracion.situacionPatrimonial.ingresos.totalIngresosMensualesNetos= totalIngresos;
                                        break;

                                      case "MODIFICACION":
                                        jsonResult.declaracion.situacionPatrimonial.ingresos.remuneracionAnualCargoPublico = remuneracionCargoPublico;
                                        jsonResult.declaracion.situacionPatrimonial.ingresos.otrosIngresosAnualesTotal = otrosIngresos;
                                        jsonResult.declaracion.situacionPatrimonial.ingresos.ingresoAnualNetoDeclarante = ingresosDeclarante;
                                        jsonResult.declaracion.situacionPatrimonial.ingresos.ingresoAnualNetoParejaDependiente = ingresosParejaDependiente;
                                        jsonResult.declaracion.situacionPatrimonial.ingresos.totalIngresosAnualesNetos= totalIngresos;
                                        jsonResult.declaracion.situacionPatrimonial.ingresos.enajenacionBienes={};
                                        jsonResult.declaracion.situacionPatrimonial.ingresos.enajenacionBienes.bienes={};
                                        jsonResult.declaracion.situacionPatrimonial.ingresos.enajenacionBienes.remuneracionTotal={};
                                        jsonResult.declaracion.situacionPatrimonial.ingresos.enajenacionBienes.remuneracionTotal.valor='0';
                                        jsonResult.declaracion.situacionPatrimonial.ingresos.enajenacionBienes.remuneracionTotal.moneda='MXN';
                                        break;

                                      case "CONCLUSION":
                                        jsonResult.declaracion.situacionPatrimonial.ingresos.remuneracionConclusionCargoPublico = remuneracionCargoPublico;
                                        jsonResult.declaracion.situacionPatrimonial.ingresos.otrosIngresosConclusionTotal = otrosIngresos;
                                        jsonResult.declaracion.situacionPatrimonial.ingresos.ingresoConclusionNetoDeclarante = ingresosDeclarante;
                                        jsonResult.declaracion.situacionPatrimonial.ingresos.ingresoConclusionNetoParejaDependiente = ingresosParejaDependiente;
                                        jsonResult.declaracion.situacionPatrimonial.ingresos.totalIngresosConclusionNetos= totalIngresos;
                                        jsonResult.declaracion.situacionPatrimonial.ingresos.enajenacionBienes={};
                                        jsonResult.declaracion.situacionPatrimonial.ingresos.enajenacionBienes.bienes={};
                                        jsonResult.declaracion.situacionPatrimonial.ingresos.enajenacionBienes.remuneracionTotal={};
                                        jsonResult.declaracion.situacionPatrimonial.ingresos.enajenacionBienes.remuneracionTotal.valor='0';
                                        jsonResult.declaracion.situacionPatrimonial.ingresos.enajenacionBienes.remuneracionTotal.moneda='MXN';
                                        break;
                                    }

                            }

                            if (index == 13){
                              let lista = jsonResult.declaracion.situacionPatrimonial.inversiones.inversion
                              Object.keys(lista).forEach(function (row) {
                                let oldrow = jsonResult.declaracion.situacionPatrimonial.inversiones.inversion[row];
            //                    console.log(oldrow);
                                let saldo = oldrow.saldoSituacionActual ?? oldrow.saldoDiciembreAnterior ?? oldrow.datosFechaConclusion ;
              //                  console.log(saldo);
                                delete jsonResult.declaracion.situacionPatrimonial.inversiones.inversion[row].saldoSituacionActual;
                                delete jsonResult.declaracion.situacionPatrimonial.inversiones.inversion[row].saldoDiciembreAnterior;
                                delete jsonResult.declaracion.situacionPatrimonial.inversiones.inversion[row].saldoFechaConclusion;
                              switch (jsonResult.captura.tipo_declaracion) {
                                      case "INICIAL":
                                        jsonResult.declaracion.situacionPatrimonial.inversiones.inversion[row].saldoSituacionActual = saldo;
                                        break;

                                      case "MODIFICACION":
                                        jsonResult.declaracion.situacionPatrimonial.inversiones.inversion[row].saldoDiciembreAnterior = saldo;
                                        break;

                                      case "CONCLUSION":
                                        jsonResult.declaracion.situacionPatrimonial.inversiones.inversion[row].saldoFechaConclusion = saldo;
                                        break;
                                    }
                              }
                            );}

                            if (index == 14){
                              let lista = jsonResult.declaracion.situacionPatrimonial.adeudos.adeudo
                              Object.keys(lista).forEach(function (row) {
                                let oldrow = jsonResult.declaracion.situacionPatrimonial.adeudos.adeudo[row];
                                let saldo = oldrow.saldoInsolutoSituacionActual ?? oldrow.saldoInsolutoDiciembreAnterior ?? oldrow.saldoInsolutoFechaConclusion ;
                                delete jsonResult.declaracion.situacionPatrimonial.adeudos.adeudo[row].saldoInsolutoSituacionActual;
                                delete jsonResult.declaracion.situacionPatrimonial.adeudos.adeudo[row].saldoInsolutoDiciembreAnterior;
                                delete jsonResult.declaracion.situacionPatrimonial.adeudos.adeudo[row].saldoInsolutoFechaConclusion;
                              switch (jsonResult.captura.tipo_declaracion) {
                                      case "INICIAL":
                                        jsonResult.declaracion.situacionPatrimonial.adeudos.adeudo[row].saldoInsolutoSituacionActual = saldo;
                                        break;

                                      case "MODIFICACION":
                                        jsonResult.declaracion.situacionPatrimonial.adeudos.adeudo[row].saldoInsolutoDiciembreAnterior = saldo;
                                        break;

                                      case "CONCLUSION":
                                        jsonResult.declaracion.situacionPatrimonial.adeudos.adeudo[row].saldoInsolutoFechaConclusion = saldo;
                                        break;
                                    }
                              }
                            );}
                            //console.log (jsonResult.captura.declaracion[item.apartado].secciones[item.no]);
                            jsonResult.captura.declaracion[item.apartado].secciones[item.no].status = 'EN_PROCESO';
                            $(".status-seccion-" + item.apartado + "-" + item.no).removeClass("indicador-status-success").addClass("indicador-status-process").text("EN PROCESO");
                            //correccion a array
                            if (typeof jsonResult.declaracion[item.apartado] != 'undefined') {if (Object.keys(jsonResult.declaracion[item.apartado][item.seccion]).length == 0){jsonResult.declaracion[item.apartado][item.seccion]={}}}
                        }
                    });
                    //cargamos declaracion de intereses si aplica
                    if (avanceCaptura.declaracion.interes != 'undefined' && jsonResult.captura.formato == 'COMPLETA'){

                    Object.keys(avanceCaptura.captura.declaracion.interes.secciones).forEach(function (index) {
                        var item = avanceCaptura.captura.declaracion.interes.secciones[index];
                        //console.log( item );
                        if (!jsonResult.declaracion[item.apartado]){jsonResult.declaracion[item.apartado] = {};}
                        if (!jsonResult.declaracion[item.apartado][item.seccion]){jsonResult.declaracion[item.apartado][item.seccion] = {};}
                        jsonResult.declaracion[item.apartado][item.seccion] = avanceCaptura.declaracion[item.apartado][item.seccion];
                        jsonResult.captura.declaracion[item.apartado].secciones[item.no].status = 'EN_PROCESO';
                        $(".status-seccion-" + item.apartado + "-" + item.no).removeClass("indicador-status-success").addClass("indicador-status-process").text("EN PROCESO");
                        //correccion a array
                        if (typeof jsonResult.declaracion[item.apartado] != 'undefined') {if (Object.keys(jsonResult.declaracion[item.apartado][item.seccion]).length == 0){jsonResult.declaracion[item.apartado][item.seccion]={}}}
                    });
                    /*
                    if (typeof jsonResult.declaracion.interes != 'undefined') {
                        //corrección a array.
                        if (Object.keys(jsonResult.declaracion.interes.participacion.participacion).length==0){
                            jsonResult.declaracion.interes.participacion.participacion={};
                        }

                      } */
                    }

                    //otro empleo
                    //console.log("trabajando...");
                    if(jsonResult.captura.tipo_declaracion === "MODIFICACION"){
                      if(typeof jsonResult.declaracion.situacionPatrimonial.datosEmpleoCargoComision.cuentaConOtroCargoPublico == 'undefined'){
                        jsonResult.declaracion.situacionPatrimonial.datosEmpleoCargoComision.cuentaConOtroCargoPublico=false;
                        jsonResult.declaracion.situacionPatrimonial.datosEmpleoCargoComision.otroEmpleoCargoComision={};
                      }
                    }
                    //----------------

                }
              });
        }
        else{ //es el mismo tipo de declaracion
            jsonResult.captura = avanceCaptura.captura;
            //console.log (jsonResult.captura);
            //console.log(avanceCaptura.captura);
            jsonResult.declaracion ={};
            $("input[name='nameContralor']").val(jsonResult.captura.contralor);
            $("#cboAnioEjercicio").val(jsonResult.captura.anio);
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

            //otro empleo
            if(jsonResult.captura.tipo_declaracion === "MODIFICACION"){
              if(typeof jsonResult.declaracion.situacionPatrimonial.datosEmpleoCargoComision.cuentaConOtroCargoPublico == 'undefined'){
                jsonResult.declaracion.situacionPatrimonial.datosEmpleoCargoComision.cuentaConOtroCargoPublico=false;
                jsonResult.declaracion.situacionPatrimonial.datosEmpleoCargoComision.otroEmpleoCargoComision={};
              }
            }
            //----------------

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
              ); //cierre de modal
            }
        }  //fin mismo tipo de declaracion

      validarDeclaracionTerminada();
      $("#modalIniciar").modal("hide");
    }  //cierre bloque de carga
    catch(e) {
        alert("El archivo esta dañado, no se puede cargar al sistema."); // error in the above string (in this case, yes)!
    }
}
