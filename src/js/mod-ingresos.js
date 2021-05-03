
window.initIngresos = function initIngresos(data){
    var seccion = JSON.parse(atob(data));
    var seccionName = seccion.moduloName.replace("modulo","");
    var form = "#form" + seccion.moduloName.replace("modulo", "")+ " ";
    var modulo = "#" + seccion.moduloName + " ";

    //cargar catalogos.
    loadCat(moneda, ".CBOmoneda");
    loadCat(tipoInstrumento, ".CBOtipoInstrumento");
    loadCat(tipoBienEnajenacionBienes, ".CBOtipoBienEnajenacionBienes");

    //validar status de la sección.
    switch(seccion.status){
        case "SIN_INFO": 
            //asginar valores predeterminados a catálogos(ayuda al usuario).
            $(form + ".CBOmoneda").val("MXN");  
            $(form + ".cantidad").val("0");
            $(form + "textarea[name='aclaracionesObservaciones']").val();
            $("#tableActividadIndustrial").empty();
            $("#tableActividadFinanciera").empty();
            $("#tableServiciosProfesionales").empty();
            $("#tableOtrosIngresos").empty();

            $(form + ".btnGuardar").removeClass("hide");
            $(form + ".btnTerminar").removeClass("hide");
            $(modulo + ".btnHabilitar").addClass("hide");
            $(form + ".CBOmoneda").prop("disabled", true);
        break;
        case "EN_PROCESO":
            //cargar información guardada previamente.
            window["loadInfo" + seccion.moduloName.replace("modulo","")](); 
            $(form + ".btnGuardar").removeClass("hide");
            $(form + ".btnTerminar").removeClass("hide");
            $(modulo + ".btnHabilitar").addClass("hide");
            $(form + ".CBOmoneda").prop("disabled", true);
            break;
        case "TERMINADO":
            //cargar información guardada previamente.
            window["loadInfo" + seccion.moduloName.replace("modulo","")]();           
            $(form + ":input").prop("disabled", true);

            $(form + ".btnEditar").addClass("hide");
            $(form + ".btnEliminar").addClass("hide");
            $(form + ".btnAgregar").addClass("hide");

            $(form + ".btnGuardar").addClass("hide");
            $(form + ".btnTerminar").addClass("hide");
            $(modulo + ".btnHabilitar").removeClass("hide").prop("disabled", false);
        break;
    }

    //funcionalidad a buttons
    $(form + ".btnGuardar").unbind("click");
    $(form + ".btnTerminar").unbind("click");
    $(modulo + ".btnHabilitar").unbind("click");
    
    $(form + ".btnGuardar").on('click',function() {
        if ($(".remuneracionMensualCargoPublicoCantidad").val() > 0){
            window["guardarForm" + seccionName](seccion.no, seccionName, seccion.apartado);
        } else {
            mensajeSwal('Error','El ingreso de la persona que declara debe ser mayor a 0','error');
        }
    });
    $(form + ".btnTerminar").on('click',function() {
        if ($(".remuneracionMensualCargoPublicoCantidad").val() > 0){
            window["guardarForm" + seccionName](seccion.no, seccionName, seccion.apartado);
            $(form + ".btnEditar").addClass("hide");
            $(form + ".btnEliminar").addClass("hide");
            $(form + ".btnAgregar").addClass("hide");
        } else {
            mensajeSwal('Error','El ingreso de la persona que declara debe ser mayor a 0','error');
        }
    });    
    $(modulo + ".btnHabilitar").on('click',function() {
        habilitarSeccion(seccion.apartado, seccion.no, seccionName);
        $(form + ".btnEditar").removeClass("hide");
        $(form + ".btnEliminar").removeClass("hide");
        $(form + ".btnAgregar").removeClass("hide");
        $(form + ".CBOmoneda").prop("disabled", true);
        $(form + ".cantidadDisabled").prop("disabled", true);
    });

    //modificación dependiente del tipo de declaración a presentar.
    switch(jsonResult.captura.tipo_declaracion){
        case "INICIAL":
            $(form + ".lblIngresos1").text("I.- REMUNERACIÓN MENSUAL NETA DEL DECLARANTE POR SU CARGO PÚBLICO (POR CONCEPTO DE SUELDOS, HONORARIOS, COMPENSACIONES, BONOS Y OTRAS PRESTACIONES)(CANTIDADES NETAS DESPUÉS DE IMPUESTOS)");
            $(form + ".lblIngresos2").text("II.- OTROS INGRESOS MENSUALES DEL DECLARANTE (SUMA DEL II.1 AL II.4)");
            $(form + ".lblIngresos3").text("A.- INGRESO MENSUAL NETO DEL DECLARANTE (SUMA DEL NUMERAL I Y II)");
            $(form + ".lblIngresos4").text("B.- INGRESO MENSUAL DE LA PAREJA Y/O DEPENDIENTES ECONÓMICOS (DESPUÉS DE IMPUESTOS)");
            $(form + ".lblIngresos5").text("C.- TOTAL DE INGRESOS MENSUALES NETOS PERCIBIDOS POR EL DECLARANTE, PAREJA Y/O DEPENDIENTES ECONÓMICOS (SUMA DE LOS APARTADOS A Y B)");
            $(form + ".lblIngresosOtrosIngresos").text("II.4.- OTROS INGRESOS NO CONSIDERADOS A LOS ANTERIORES (DESPUÉS DE IMPUESTOS)");
            $(form + ".content_ingresos_enajenacion_bienes").addClass("hide");
            $(form + "#tableEnajenacionBienes").empty();
            $(form + ".enajenacionBienesRemuneracionTotalCantidad").val("0");
            break;
        case "MODIFICACION":
            $(form + ".lblIngresos1").text("I.- REMUNERACIÓN ANUAL NETA DEL DECLARANTE POR SU CARGO PÚBLICO (POR CONCEPTO DE SUELDOS, HONORARIOS, COMPENSACIONES, BONOS, AGUINALDOS Y OTRAS PRESTACIONES) (CANTIDADES NETAS DESPUÉS DE IMPUESTOS)");
            $(form + ".lblIngresos2").text("II.- OTROS INGRESOS DEL DECLARANTE (SUMA DEL II.1 AL II.5)");
            $(form + ".lblIngresos3").text("A.- INGRESO ANUAL NETO DEL DECLARANTE (SUMA DEL NUMERAL I Y II)");
            $(form + ".lblIngresos4").text("B.- INGRESO ANUAL NETO DE LA PAREJA Y / O DEPENDIENTES ECONÓMICOS (DESPUÉS DE IMPUESTOS");
            $(form + ".lblIngresos5").text("C.- TOTAL DE INGRESOS ANUALES NETOS PERCIBIDOS POR EL DECLARANTE, PAREJA Y / O DEPENDIENTES ECONÓMICOS (SUMA DE LOS APARTADOS A Y B)");
            $(form + ".lblIngresosOtrosIngresos").text("II.5 - OTROS INGRESOS NO CONSIDERADOS ANTERIORMENTE (DESPUÉS DE IMPUESTOS)");
            $(form + ".content_ingresos_enajenacion_bienes").removeClass("hide");
            break;
        case "CONCLUSION":
            $(form + ".lblIngresos1").text("I.- REMUNERACIÓN NETA DEL AÑO EN CURSO A LA FECHA DE CONCLUSIÓN DEL EMPLEO, CARGO O COMISIÓN DEL DECLARANTE POR SU CARGO PÚBLICO (POR CONCEPTO DE SUELDOS, HONORARIOS, COMPENSACIONES, BONOS Y OTRAS PRESTACIONES) (CANTIDADES NETAS DESPUÉS DE IMPUESTOS)");
            $(form + ".lblIngresos2").text("II.- OTROS INGRESOS DEL DECLARANTE (SUMA DEL II.1 AL II.5)");
            $(form + ".lblIngresos3").text("A.- INGRESOS DEL DECLARANTE DEL AÑO EN CURSO A LA FECHA DE CONCLUSIÓN DEL EMPLEO, CARGO O COMISIÓN(SUMA DEL NUMERAL I Y II)");
            $(form + ".lblIngresos4").text("B.- INGRESOS DEL AÑO EN CURSO A LA FECHA DE CONCLUSIÓN DEL EMPLEO, CARGO O COMISIÓN DE LA PAREJA Y / O DEPENDIENTES ECONÓMICOS (DESPUÉS DE IMPUESTOS)");
            $(form + ".lblIngresos5").text("C.- TOTAL DE INGRESOS NETOS DEL AÑO EN CURSO A LA FECHA DE CONCLUSIÓN DEL EMPLEO, CARGO O COMISIÓN PERCIBIDOS POR EL DECLARANTE, PAREJA Y / O DEPENDIENTES ECONÓMICOS (SUMA DE LOS APARTADOS A Y B)");
            $(form + ".lblIngresosOtrosIngresos").text("II.5 - OTROS INGRESOS NO CONSIDERADOS A LOS ANTERIORES (DESPUÉS DE IMPUESTOS)");
            $(form + ".content_ingresos_enajenacion_bienes").removeClass("hide");
            break;
    } 

    $(".content_seccion").addClass("hide");
    $("#" + seccion.moduloName).removeClass("hide");
}

window.loadInfoIngresos = function loadInfoIngresos(){
    var nodo = jsonResult.declaracion.situacionPatrimonial.ingresos;

    $("input[name='remuneracionMensualCargoPublicoCantidad']").val(nodo.remuneracionMensualCargoPublico.valor);
    $("input[name='remuneracionMensualCargoPublicoMoneda']").val(nodo.remuneracionMensualCargoPublico.moneda);
    $("input[name='otrosIngresosMensualesTotalCantidad']").val(nodo.otrosIngresosMensualesTotal.valor);
    $("input[name='otrosIngresosMensualesTotalMoneda']").val(nodo.otrosIngresosMensualesTotal.moneda);

    pintarTablaActividadIndustrial();
    $("input[name='actividadIndustrialRemuneracionTotalCantidad']").val(nodo.actividadIndustialComercialEmpresarial.remuneracionTotal.valor);

    pintarTablaActividadFinanciera();
    $("input[name='actividadFinancieraRemuneracionTotalCantidad']").val(nodo.actividadFinanciera.remuneracionTotal.valor);

    pintarTablaServiciosProfesionales();
    $("input[name='serviciosProfesionalesRemuneracionTotalCantidad']").val(nodo.serviciosProfesionales.remuneracionTotal.valor);

    pintarTablaOtrosIngresos();
    $("input[name='otrosIngresosRemuneracionTotalCantidad']").val(nodo.otrosIngresos.remuneracionTotal.valor);
  
    $("input[name='ingresoMensualNetoDeclaranteCantidad']").val(nodo.ingresoMensualNetoDeclarante.valor);
    $("input[name='ingresoMensualNetoDeclaranteMoneda']").val(nodo.ingresoMensualNetoDeclarante.moneda);

    $("input[name='ingresoMensualNetoParejaDependienteCantidad']").val(nodo.ingresoMensualNetoParejaDependiente.valor);
    $("input[name='ingresoMensualNetoParejaDependienteMoneda']").val(nodo.ingresoMensualNetoParejaDependiente.moneda);

    $("input[name='totalIngresosMensualesNetosCantidad']").val(nodo.totalIngresosMensualesNetos.valor);
    $("input[name='totalIngresosMensualesNetosMoneda']").val(nodo.totalIngresosMensualesNetos.moneda);

    $("#formIngresos input[name='aclaracionesObservaciones']").val(nodo.aclaracionesObservaciones);
}

window.guardarFormIngresos = function guardarFormIngresos(seccionNo, seccionName, seccionApartado){       
    $("#form" + seccionName).validate({
        rules: {
            remuneracionMensualCargoPublicoCantidad : { required: true, maxlength: 50 },
            ingresoMensualNetoParejaDependienteCantidad : { required: true, maxlength: 50 },
        },
        messages: {
            remuneracionMensualCargoPublicoCantidad : { required: "Ingrese la remuneración mensual." },
            ingresoMensualNetoParejaDependienteCantidad : { required: "Escribe el ingreso mensual." },
        },
        // Make sure the form is submitted to the destination defined
        // in the "action" attribute of the form when valid
        submitHandler: function(form, btn) {
            var nodo = jsonResult.declaracion.situacionPatrimonial.ingresos;
            switch(jsonResult.captura.tipo_declaracion){
                case "INICIAL":
                    nodo.remuneracionMensualCargoPublico.valor =    parseInt($("input[name='remuneracionMensualCargoPublicoCantidad']").val());
                    nodo.remuneracionMensualCargoPublico.moneda =   $("select[name='remuneracionMensualCargoPublicoMoneda'] option:selected").val();
                    
                    nodo.otrosIngresosMensualesTotal.valor =        parseInt($("input[name='otrosIngresosMensualesTotalCantidad']").val());
                    nodo.otrosIngresosMensualesTotal.moneda =       $("select[name='otrosIngresosMensualesTotalMoneda'] option:selected").val();

                    nodo.ingresoMensualNetoDeclarante.valor =    parseInt($("input[name='ingresoMensualNetoDeclaranteCantidad']").val());
                    nodo.ingresoMensualNetoDeclarante.moneda =   $("select[name='ingresoMensualNetoDeclaranteMoneda'] option:selected").val();

                    nodo.ingresoMensualNetoParejaDependiente.valor =    parseInt($("input[name='ingresoMensualNetoParejaDependienteCantidad']").val());
                    nodo.ingresoMensualNetoParejaDependiente.moneda =   $("select[name='ingresoMensualNetoParejaDependienteMoneda'] option:selected").val();

                    nodo.totalIngresosMensualesNetos.valor =    parseInt($("input[name='totalIngresosMensualesNetosCantidad']").val());
                    nodo.totalIngresosMensualesNetos.moneda =   $("select[name='totalIngresosMensualesNetosMoneda'] option:selected").val();
                    break;
                case "MODIFICACION":
                    nodo.remuneracionAnualCargoPublico.valor =    parseInt($("input[name='remuneracionMensualCargoPublicoCantidad']").val());
                    nodo.remuneracionAnualCargoPublico.moneda =   $("select[name='remuneracionMensualCargoPublicoMoneda'] option:selected").val();
                    
                    nodo.otrosIngresosAnualesTotal.valor =        parseInt($("input[name='otrosIngresosMensualesTotalCantidad']").val());
                    nodo.otrosIngresosAnualesTotal.moneda =       $("select[name='otrosIngresosMensualesTotalMoneda'] option:selected").val();

                    nodo.ingresoAnualNetoDeclarante.valor =    parseInt($("input[name='ingresoMensualNetoDeclaranteCantidad']").val());
                    nodo.ingresoAnualNetoDeclarante.moneda =   $("select[name='ingresoMensualNetoDeclaranteMoneda'] option:selected").val();

                    nodo.ingresoAnualNetoParejaDependiente.valor =    parseInt($("input[name='ingresoMensualNetoParejaDependienteCantidad']").val());
                    nodo.ingresoAnualNetoParejaDependiente.moneda =   $("select[name='ingresoMensualNetoParejaDependienteMoneda'] option:selected").val();

                    nodo.totalIngresosAnualesNetos.valor =    parseInt($("input[name='totalIngresosMensualesNetosCantidad']").val());
                    nodo.totalIngresosAnualesNetos.moneda =   $("select[name='totalIngresosMensualesNetosMoneda'] option:selected").val();
                    break;
                case "CONCLUSION":
                    nodo.remuneracionConclusionCargoPublico.valor =    parseInt($("input[name='remuneracionMensualCargoPublicoCantidad']").val());
                    nodo.remuneracionConclusionCargoPublico.moneda =   $("select[name='remuneracionMensualCargoPublicoMoneda'] option:selected").val();
                    
                    nodo.otrosIngresosConclusionTotal.valor =        parseInt($("input[name='otrosIngresosMensualesTotalCantidad']").val());
                    nodo.otrosIngresosConclusionTotal.moneda =       $("select[name='otrosIngresosMensualesTotalMoneda'] option:selected").val();

                    nodo.ingresoConclusionNetoDeclarante.valor =    parseInt($("input[name='ingresoMensualNetoDeclaranteCantidad']").val());
                    nodo.ingresoConclusionNetoDeclarante.moneda =   $("select[name='ingresoMensualNetoDeclaranteMoneda'] option:selected").val();

                    nodo.ingresoConclusionNetoParejaDependiente.valor =    parseInt($("input[name='ingresoMensualNetoParejaDependienteCantidad']").val());
                    nodo.ingresoConclusionNetoParejaDependiente.moneda =   $("select[name='ingresoMensualNetoParejaDependienteMoneda'] option:selected").val();

                    nodo.totalIngresosConclusionNetos.valor =    parseInt($("input[name='totalIngresosMensualesNetosCantidad']").val());
                    nodo.totalIngresosConclusionNetos.moneda =   $("select[name='totalIngresosMensualesNetosMoneda'] option:selected").val();
                    break;
            }            

            nodo.aclaracionesObservaciones =   $("#formIngresos textarea[name='aclaracionesObservaciones']").val();
            //actualiza el status de la sección (en proceso/terminado)."situacion_patrimonial"
            actualizarStatusSeccion(seccionApartado, seccionNo, seccionName, btn.originalEvent.submitter.dataset.seccionstatus);
        }
    });    
}


/* -------------------------------------------------------------- */
/* ActividadIndustrial */
window.agregarActividadIndustrial = function agregarActividadIndustrial(){
//console.log ("inicio agregarActividadIndustrial");
    //PENDIENTE --> VALIDAR CAMPOS.
    if($("input[name='actividadIndustrialNombreRazonSocial']").val().length == 0){ mensajeSwal("Aviso","Ingrese el NOMBRE O RAZÓN SOCIAL","error");}
    else if($("input[name='actividadIndustrialTipoNegocio']").val().length == 0){ mensajeSwal("Aviso","Ingrese el TIPO DE NEGOCIO","error");}
    else if($("input[name='actividadIndustrialRemuneracionCantidad']").val().length == 0){ mensajeSwal("Aviso","Ingrese la REMUNERACIÓN","error");}
    else{
        if ($(".btnAgregarActividadIndustrial")[0].dataset.uuid){
            uuidItem = $(".btnAgregarActividadIndustrial")[0].dataset.uuid;
        }
        else{
            uuidItem= generarUUID();
        }    
        guardarActividadIndustrial(uuidItem);
    }
}
//console.log ("se agrego agregarActividadIndustrial");

window.guardarActividadIndustrial = function guardarActividadIndustrial(uuidItem){
    jsonResult.declaracion.situacionPatrimonial.ingresos.actividadIndustialComercialEmpresarial.actividades[uuidItem] = {
        "uuid":uuidItem,
        "remuneracion": {
          "valor":  parseInt($("input[name='actividadIndustrialRemuneracionCantidad']").val()),
          "moneda": $("select[name='actividadIndustrialRemuneracionMoneda'] option:selected").val()
        },
        "nombreRazonSocial":    $("input[name='actividadIndustrialNombreRazonSocial']").val().toUpperCase(),
        "tipoNegocio":          $("input[name='actividadIndustrialTipoNegocio']").val().toUpperCase()
      };
      //limpiar inputs
      $("input[name='actividadIndustrialNombreRazonSocial']").val("");
      $("input[name='actividadIndustrialTipoNegocio']").val("");
      $("input[name='actividadIndustrialRemuneracionCantidad']").val("");
      $(".btnAgregarActividadIndustrial").html('<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus" viewBox="0 0 16 16">\
                                                    <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>\
                                                </svg>\
                                                Agregar').attr("data-uuid","");
      pintarTablaActividadIndustrial();
}

window.pintarTablaActividadIndustrial = function pintarTablaActividadIndustrial(){
    let html="",remuneracionTotal=0;
    let lista = jsonResult.declaracion.situacionPatrimonial.ingresos.actividadIndustialComercialEmpresarial.actividades;
    Object.keys(lista).forEach(function (row) {
        var params = { uuid: lista[row].uuid, nombreRazonSocial: lista[row].nombreRazonSocial, tipoNegocio: lista[row].tipoNegocio, remuneracion: lista[row].remuneracion.valor, moneda: lista[row].remuneracion.moneda};
        remuneracionTotal+=lista[row].remuneracion.valor;
        html+="<tr id='" + lista[row].uuid + "'>";
        html+=" <td class='text-left'  style='width:40%;'>" + lista[row].nombreRazonSocial +"</td>";
        html+=" <td class='text-left'  style='width:30%;'>" + lista[row].tipoNegocio +"</td>";
        html+=" <td class='text-right' style='width:10%;'>" + lista[row].remuneracion.valor + " " + lista[row].remuneracion.moneda + "</td>";
        html+=" <td class='text-right' style='width:20%;'>";
        html+="     <button type='button' class='btn btn-sm btn-warning btnEditar' onclick='editarActividadIndustrial(\"" + btoa(JSON.stringify(params)) + "\");'>Editar</button>";
        html+="     <button type='button' class='btn btn-sm btn-danger btnEliminar' onclick='eliminarActividadIndustrial(\"" + btoa(JSON.stringify(params)) + "\");'>Eliminar</button>";              
        html+=" </td>";
        html+="</tr>";
    });
    $("#tableActividadIndustrial").empty().append(html);

    jsonResult.declaracion.situacionPatrimonial.ingresos.actividadIndustialComercialEmpresarial.remuneracionTotal.valor = remuneracionTotal;
    jsonResult.declaracion.situacionPatrimonial.ingresos.actividadIndustialComercialEmpresarial.remuneracionTotal.moneda = "MXN";
    $("input[name='actividadIndustrialRemuneracionTotalCantidad']").val(remuneracionTotal);
    sumaOtrosIngresos();
}

window.editarActividadIndustrial = function editarActividadIndustrial(data){
    let item = JSON.parse(atob(data));
    $("input[name='actividadIndustrialNombreRazonSocial']").val(item.nombreRazonSocial);
    $("input[name='actividadIndustrialTipoNegocio']").val(item.tipoNegocio);
    $("input[name='actividadIndustrialRemuneracionCantidad']").val(item.remuneracion);
    $(".btnAgregarActividadIndustrial").html('<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus" viewBox="0 0 16 16">\
                                                    <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>\
                                                </svg>\
                                                Actualizar').attr("data-uuid",item.uuid);
}

window.eliminarActividadIndustrial = function eliminarActividadIndustrial(data){
    let remuneracionTotal=0;
    let item = JSON.parse(atob(data));
    //elimina item en object json y tabla.
    delete jsonResult.declaracion.situacionPatrimonial.ingresos.actividadIndustialComercialEmpresarial.actividades[item.uuid];
    $("#" + item.uuid).remove();
    Object.keys(jsonResult.declaracion.situacionPatrimonial.ingresos.actividadIndustialComercialEmpresarial.actividades).forEach(function (row) {
        remuneracionTotal+=jsonResult.declaracion.situacionPatrimonial.ingresos.actividadIndustialComercialEmpresarial.actividades[row].remuneracion.valor;        
    });
    jsonResult.declaracion.situacionPatrimonial.ingresos.actividadIndustialComercialEmpresarial.remuneracionTotal.valor = remuneracionTotal;
    $("input[name='actividadIndustrialRemuneracionTotalCantidad']").val(remuneracionTotal);
    sumaOtrosIngresos();
}

/* -------------------------------------------------------------- */
/* ActividadFinanciera */
window.agregarActividadFinanciera = function agregarActividadFinanciera(){
    if($("input[name='actividadFinancieraRemuneracionCantidad']").val().length == 0){ mensajeSwal("Aviso","Ingrese la REMUNERACIÓN","error");}
    else{    
        if ($(".btnAgregarActividadFinanciera")[0].dataset.uuid){
            uuidItem = $(".btnAgregarActividadFinanciera")[0].dataset.uuid;
        }
        else{
            uuidItem= generarUUID();
        }    
        guardarActividadFinanciera(uuidItem);
    }
}

window.guardarActividadFinanciera = function guardarActividadFinanciera(uuidItem){
    jsonResult.declaracion.situacionPatrimonial.ingresos.actividadFinanciera.actividades[uuidItem] = {
        "uuid":uuidItem,
        "remuneracion": {
          "valor":  parseInt($("input[name='actividadFinancieraRemuneracionCantidad']").val()),
          "moneda": $("select[name='actividadFinancieraRemuneracionMoneda'] option:selected").val()
        },
        "tipoInstrumento": 
        {
            "clave":  $("select[name='tipoInstrumento'] option:selected").val(),
            "valor":  $("select[name='tipoInstrumento'] option:selected")[0].innerText,
          }          
      };
      //limpiar inputs
      $("input[name='actividadFinancieraRemuneracionCantidad']").val("");
      $(".btnAgregarActividadFinanciera").html('<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus" viewBox="0 0 16 16">\
                                                    <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>\
                                                </svg>\
                                                Agregar').attr("data-uuid","");
      pintarTablaActividadFinanciera();
}

window.pintarTablaActividadFinanciera = function pintarTablaActividadFinanciera(){
    let html="",remuneracionTotal=0;
    let lista = jsonResult.declaracion.situacionPatrimonial.ingresos.actividadFinanciera.actividades;
    Object.keys(lista).forEach(function (row) {
        var params = { uuid: lista[row].uuid, tipoInstrumento: lista[row].tipoInstrumento.clave, remuneracion: lista[row].remuneracion.valor, moneda: lista[row].remuneracion.moneda};
        remuneracionTotal+=lista[row].remuneracion.valor;
        html+="<tr id='" + lista[row].uuid + "'>";
        html+=" <td class='text-left'  style='width:40%;'>" + lista[row].tipoInstrumento.valor +"</td>";
        html+=" <td class='text-right' style='width:10%;'>" + lista[row].remuneracion.valor + " " + lista[row].remuneracion.moneda + "</td>";
        html+=" <td class='text-right' style='width:20%;'>";
        html+="     <button type='button' class='btn btn-sm btn-warning btnEditar' onclick='editarActividadFinanciera(\"" + btoa(JSON.stringify(params)) + "\");'>Editar</button>";
        html+="     <button type='button' class='btn btn-sm btn-danger btnEliminar' onclick='eliminarActividadFinanciera(\"" + btoa(JSON.stringify(params)) + "\");'>Eliminar</button>";              
        html+=" </td>";
        html+="</tr>";
    });
    $("#tableActividadFinanciera").empty().append(html);

    jsonResult.declaracion.situacionPatrimonial.ingresos.actividadFinanciera.remuneracionTotal.valor = remuneracionTotal;
    jsonResult.declaracion.situacionPatrimonial.ingresos.actividadFinanciera.remuneracionTotal.moneda = "MXN";
    $("input[name='actividadFinancieraRemuneracionTotalCantidad']").val(remuneracionTotal);
    sumaOtrosIngresos();
}

window.editarActividadFinanciera = function editarActividadFinanciera(data){
    let item = JSON.parse(atob(data));
    $("select[name='tipoInstrumento']").val(item.tipoInstrumento);
    $("input[name='actividadFinancieraRemuneracionCantidad']").val(item.remuneracion);
    $(".btnAgregarActividadFinanciera").html('<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus" viewBox="0 0 16 16">\
                                                    <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>\
                                                </svg>\
                                                Actualizar').attr("data-uuid",item.uuid);
}

window.eliminarActividadFinanciera = function eliminarActividadFinanciera(data){
    let remuneracionTotal=0;
    let item = JSON.parse(atob(data));
    //elimina item en object json y tabla.
    delete jsonResult.declaracion.situacionPatrimonial.ingresos.actividadFinanciera.actividades[item.uuid];
    $("#" + item.uuid).remove();
    
    Object.keys(jsonResult.declaracion.situacionPatrimonial.ingresos.actividadFinanciera.actividades).forEach(function (row) {
        remuneracionTotal+=jsonResult.declaracion.situacionPatrimonial.ingresos.actividadFinanciera.actividades[row].remuneracion.valor;        
    });
    jsonResult.declaracion.situacionPatrimonial.ingresos.actividadFinanciera.remuneracionTotal.valor = remuneracionTotal;
    $("input[name='actividadFinancieraRemuneracionTotalCantidad']").val(remuneracionTotal);
    sumaOtrosIngresos();
}
/* -------------------------------------------------------------- */
/* ServiciosProfesionales */
window.agregarServiciosProfesionales = function agregarServiciosProfesionales(){
    if($("input[name='tipoServicio']").val().length == 0){ mensajeSwal("Aviso","Ingrese el TIPO DE SERVICIO PRESTADO","error");}
    else if($("input[name='serviciosProfesionalesRemuneracionCantidad']").val().length == 0){ mensajeSwal("Aviso","Ingrese la REMUNERACIÓN","error");}
    else{
        if ($(".btnAgregarServiciosProfesionales")[0].dataset.uuid){
            uuidItem = $(".btnAgregarServiciosProfesionales")[0].dataset.uuid;
        }
        else{
            uuidItem= generarUUID();
        }    
        guardarServiciosProfesionales(uuidItem);
    }
}

window.guardarServiciosProfesionales = function guardarServiciosProfesionales(uuidItem){
    jsonResult.declaracion.situacionPatrimonial.ingresos.serviciosProfesionales.servicios[uuidItem] = {
        "uuid":uuidItem,
        "remuneracion": {
          "valor":  parseInt($("input[name='serviciosProfesionalesRemuneracionCantidad']").val()),
          "moneda": $("select[name='serviciosProfesionalesRemuneracionMoneda'] option:selected").val()
        },
        "tipoServicio": $("input[name='tipoServicio']").val().toUpperCase()
      };
      //limpiar inputs
      $("input[name='serviciosProfesionalesRemuneracionCantidad']").val("");
      $("input[name='tipoServicio']").val("");
      $(".btnAgregarServiciosProfesionales").html('<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus" viewBox="0 0 16 16">\
                                                    <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>\
                                                </svg>\
                                                Agregar').attr("data-uuid","");
      pintarTablaServiciosProfesionales();
}

window.pintarTablaServiciosProfesionales = function pintarTablaServiciosProfesionales(){
    let html="",remuneracionTotal=0;
    let lista = jsonResult.declaracion.situacionPatrimonial.ingresos.serviciosProfesionales.servicios;
    Object.keys(lista).forEach(function (row) {
        var params = { uuid: lista[row].uuid, tipoServicio: lista[row].tipoServicio, remuneracion: lista[row].remuneracion.valor, moneda: lista[row].remuneracion.moneda};
        remuneracionTotal+=lista[row].remuneracion.valor;
        html+="<tr id='" + lista[row].uuid + "'>";
        html+=" <td class='text-left'  style='width:40%;'>" + lista[row].tipoServicio +"</td>";
        html+=" <td class='text-right' style='width:10%;'>" + lista[row].remuneracion.valor + " " + lista[row].remuneracion.moneda + "</td>";
        html+=" <td class='text-right' style='width:20%;'>";
        html+="     <button type='button' class='btn btn-sm btn-warning btnEditar' onclick='editarServiciosProfesionales(\"" + btoa(JSON.stringify(params)) + "\");'>Editar</button>";
        html+="     <button type='button' class='btn btn-sm btn-danger btnEliminar' onclick='eliminarServiciosProfesionales(\"" + btoa(JSON.stringify(params)) + "\");'>Eliminar</button>";              
        html+=" </td>";
        html+="</tr>";
    });
    $("#tableServiciosProfesionales").empty().append(html);

    jsonResult.declaracion.situacionPatrimonial.ingresos.serviciosProfesionales.remuneracionTotal.valor = remuneracionTotal;
    jsonResult.declaracion.situacionPatrimonial.ingresos.serviciosProfesionales.remuneracionTotal.moneda = "MXN";
    $("input[name='serviciosProfesionalesRemuneracionTotalCantidad']").val(remuneracionTotal);
    sumaOtrosIngresos();
}

window.editarServiciosProfesionales = function editarServiciosProfesionales(data){
    let item = JSON.parse(atob(data));
    $("input[name='tipoServicio']").val(item.tipoServicio);
    $("input[name='serviciosProfesionalesRemuneracionCantidad']").val(item.remuneracion);
    $(".btnAgregarServiciosProfesionales").html('<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus" viewBox="0 0 16 16">\
                                                    <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>\
                                                </svg>\
                                                Actualizar').attr("data-uuid",item.uuid);
}

window.eliminarServiciosProfesionales = function eliminarServiciosProfesionales(data){
    let remuneracionTotal=0;
    let item = JSON.parse(atob(data));
    //elimina item en object json y tabla.
    delete jsonResult.declaracion.situacionPatrimonial.ingresos.serviciosProfesionales.servicios[item.uuid];
    $("#" + item.uuid).remove();
    Object.keys(jsonResult.declaracion.situacionPatrimonial.ingresos.serviciosProfesionales.servicios).forEach(function (row) {
        remuneracionTotal+=jsonResult.declaracion.situacionPatrimonial.ingresos.serviciosProfesionales.servicios[row].remuneracion.valor;        
    });
    jsonResult.declaracion.situacionPatrimonial.ingresos.serviciosProfesionales.remuneracionTotal.valor = remuneracionTotal;
    $("input[name='serviciosProfesionalesRemuneracionTotalCantidad']").val(remuneracionTotal);
    sumaOtrosIngresos();
}

/* -------------------------------------------------------------- */
/* EnajenacionBienes */
window.agregarEnajenacionBienes = function agregarEnajenacionBienes(){
    if($("#formIngresos input[name='enajenacionBienesRemuneracionCantidad']").val().length == 0){ mensajeSwal("Aviso","Ingrese la REMUNERACIÓN","error");}
    else{ 
        if ($("#formIngresos .btnAgregarEnajenacionBienes")[0].dataset.uuid){
            uuidItem = $("#formIngresos .btnAgregarEnajenacionBienes")[0].dataset.uuid;
        }
        else{
            uuidItem= generarUUID();
        }    
        guardarEnajenacionBienes(uuidItem);
    }
}

window.guardarEnajenacionBienes = function guardarEnajenacionBienes(uuidItem){
    jsonResult.declaracion.situacionPatrimonial.ingresos.enajenacionBienes.bienes[uuidItem] = {
        "uuid":uuidItem,
        "remuneracion": {
          "valor":  parseInt($("#formIngresos input[name='enajenacionBienesRemuneracionCantidad']").val()),
          "moneda": $("#formIngresos select[name='enajenacionBienesRemuneracionMoneda'] option:selected").val()
        },
        "tipoBienEnajenado": $("#formIngresos select[name='tipoBienEnajenado'] option:selected").val().toUpperCase()
      };
      //limpiar inputs
      $("#formIngresos input[name='enajenacionBienesRemuneracionCantidad']").val("");
      $("#formIngresos input[name='tipoIngreso']").val("");
      $("#formIngresos .btnAgregarEnajenacionBienes").html('<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus" viewBox="0 0 16 16">\
                                                    <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>\
                                                </svg>\
                                                Agregar').attr("data-uuid","");
      pintarTablaEnajenacionBienes();
}

window.pintarTablaEnajenacionBienes = function pintarTablaEnajenacionBienes(){
    let html="", remuneracionTotal=0;
    let lista = jsonResult.declaracion.situacionPatrimonial.ingresos.enajenacionBienes.bienes;
    Object.keys(lista).forEach(function (row) {
        var params = { uuid: lista[row].uuid, tipoBienEnajenado: lista[row].tipoBienEnajenado, remuneracion: lista[row].remuneracion.valor, moneda: lista[row].remuneracion.moneda};
        remuneracionTotal+=lista[row].remuneracion.valor;
        html+="<tr id='" + lista[row].uuid + "'>";
        html+=" <td class='text-left'  style='width:40%;'>" + lista[row].tipoBienEnajenado +"</td>";
        html+=" <td class='text-right' style='width:10%;'>" + lista[row].remuneracion.valor + " " + lista[row].remuneracion.moneda + "</td>";
        html+=" <td class='text-right' style='width:20%;'>";
        html+="     <button type='button' class='btn btn-sm btn-warning btnEditar' onclick='editarEnajenacionBienes(\"" + btoa(JSON.stringify(params)) + "\");'>Editar</button>";
        html+="     <button type='button' class='btn btn-sm btn-danger btnEliminar' onclick='eliminarEnajenacionBienes(\"" + btoa(JSON.stringify(params)) + "\");'>Eliminar</button>";              
        html+=" </td>";
        html+="</tr>";
    });
    $("#formIngresos #tableEnajenacionBienes").empty().append(html);

    jsonResult.declaracion.situacionPatrimonial.ingresos.enajenacionBienes.remuneracionTotal.valor = remuneracionTotal;
    jsonResult.declaracion.situacionPatrimonial.ingresos.enajenacionBienes.remuneracionTotal.moneda = "MXN";
    $("#formIngresos input[name='enajenacionBienesRemuneracionTotalCantidad']").val(remuneracionTotal);
    sumaOtrosIngresos();
}

window.editarEnajenacionBienes = function editarEnajenacionBienes(data){
    let item = JSON.parse(atob(data));
    $("#formIngresos select[name='tipoBienEnajenado']").val(item.tipoBienEnajenado);
    $("#formIngresos input[name='enajenacionBienesRemuneracionCantidad']").val(item.remuneracion);
    $("#formIngresos .btnAgregarEnajenacionBienes").html('<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus" viewBox="0 0 16 16">\
                                                    <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>\
                                                </svg>\
                                                Actualizar').attr("data-uuid",item.uuid);
}

window.eliminarEnajenacionBienes = function eliminarEnajenacionBienes(data){
    let remuneracionTotal=0;
    let item = JSON.parse(atob(data));
    //elimina item en object json y tabla.
    delete jsonResult.declaracion.situacionPatrimonial.ingresos.enajenacionBienes.bienes[item.uuid];
    $("#" + item.uuid).remove();
    Object.keys(jsonResult.declaracion.situacionPatrimonial.ingresos.enajenacionBienes.bienes).forEach(function (row) {
        remuneracionTotal+=jsonResult.declaracion.situacionPatrimonial.ingresos.enajenacionBienes.bienes[row].remuneracion.valor;        
    });
    jsonResult.declaracion.situacionPatrimonial.ingresos.enajenacionBienes.remuneracionTotal.valor = remuneracionTotal;
    $("#formIngresos input[name='enajenacionBienesRemuneracionTotalCantidad']").val(remuneracionTotal);
    sumaOtrosIngresos();
}

/* -------------------------------------------------------------- */
/* OtrosIngresos */
window.agregarOtrosIngresos = function agregarOtrosIngresos(){
    if($("input[name='tipoIngreso']").val().length == 0){ mensajeSwal("Aviso","Ingrese el TIPO DE INGRESO","error");}
    else if($("input[name='otrosIngresosRemuneracionCantidad']").val().length == 0){ mensajeSwal("Aviso","Ingrese la REMUNERACIÓN","error");}
    else{
        if ($(".btnAgregarOtrosIngresos")[0].dataset.uuid){
            uuidItem = $(".btnAgregarOtrosIngresos")[0].dataset.uuid;
        }
        else{
            uuidItem= generarUUID();
        }    
        guardarOtrosIngresos(uuidItem);
    }
}

window.guardarOtrosIngresos = function guardarOtrosIngresos(uuidItem){
    jsonResult.declaracion.situacionPatrimonial.ingresos.otrosIngresos.ingresos[uuidItem] = {
        "uuid":uuidItem,
        "remuneracion": {
          "valor":  parseInt($("input[name='otrosIngresosRemuneracionCantidad']").val()),
          "moneda": $("select[name='otrosIngresosRemuneracionMoneda'] option:selected").val()
        },
        "tipoIngreso": $("input[name='tipoIngreso']").val().toUpperCase()
      };
      //limpiar inputs
      $("input[name='otrosIngresosRemuneracionCantidad']").val("");
      $("input[name='tipoIngreso']").val("");
      $(".btnAgregarOtrosIngresos").html('<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus" viewBox="0 0 16 16">\
                                                    <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>\
                                                </svg>\
                                                Agregar').attr("data-uuid","");
      pintarTablaOtrosIngresos();
}

window.pintarTablaOtrosIngresos = function pintarTablaOtrosIngresos(){
    let html="", remuneracionTotal=0;
    let lista = jsonResult.declaracion.situacionPatrimonial.ingresos.otrosIngresos.ingresos;
    Object.keys(lista).forEach(function (row) {
        var params = { uuid: lista[row].uuid, tipoIngreso: lista[row].tipoIngreso, remuneracion: lista[row].remuneracion.valor, moneda: lista[row].remuneracion.moneda};
        remuneracionTotal+=lista[row].remuneracion.valor;
        html+="<tr id='" + lista[row].uuid + "'>";
        html+=" <td class='text-left'  style='width:40%;'>" + lista[row].tipoIngreso +"</td>";
        html+=" <td class='text-right' style='width:10%;'>" + lista[row].remuneracion.valor + " " + lista[row].remuneracion.moneda + "</td>";
        html+=" <td class='text-right' style='width:20%;'>";
        html+="     <button type='button' class='btn btn-sm btn-warning btnEditar' onclick='editarOtrosIngresos(\"" + btoa(JSON.stringify(params)) + "\");'>Editar</button>";
        html+="     <button type='button' class='btn btn-sm btn-danger btnEliminar' onclick='eliminarOtrosIngresos(\"" + btoa(JSON.stringify(params)) + "\");'>Eliminar</button>";              
        html+=" </td>";
        html+="</tr>";
    });
    $("#tableOtrosIngresos").empty().append(html);

    jsonResult.declaracion.situacionPatrimonial.ingresos.otrosIngresos.remuneracionTotal.valor = remuneracionTotal;
    jsonResult.declaracion.situacionPatrimonial.ingresos.otrosIngresos.remuneracionTotal.moneda = "MXN";
    $("input[name='otrosIngresosRemuneracionTotalCantidad']").val(remuneracionTotal);
    sumaOtrosIngresos();
}

window.editarOtrosIngresos = function editarOtrosIngresos(data){
    let item = JSON.parse(atob(data));
    $("input[name='tipoIngreso']").val(item.tipoIngreso);
    $("input[name='otrosIngresosRemuneracionCantidad']").val(item.remuneracion);
    $(".btnAgregarOtrosIngresos").html('<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus" viewBox="0 0 16 16">\
                                                    <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>\
                                                </svg>\
                                                Actualizar').attr("data-uuid",item.uuid);
}

window.eliminarOtrosIngresos = function eliminarOtrosIngresos(data){
    let remuneracionTotal=0;
    let item = JSON.parse(atob(data));
    //elimina item en object json y tabla.
    delete jsonResult.declaracion.situacionPatrimonial.ingresos.otrosIngresos.ingresos[item.uuid];
    $("#" + item.uuid).remove();
    Object.keys(jsonResult.declaracion.situacionPatrimonial.ingresos.otrosIngresos.ingresos).forEach(function (row) {
        remuneracionTotal+=jsonResult.declaracion.situacionPatrimonial.ingresos.otrosIngresos.ingresos[row].remuneracion.valor;        
    });
    jsonResult.declaracion.situacionPatrimonial.ingresos.otrosIngresos.remuneracionTotal.valor = remuneracionTotal;
    $("input[name='otrosIngresosRemuneracionTotalCantidad']").val(remuneracionTotal);
    sumaOtrosIngresos();
}

window.sumaOtrosIngresos = function sumaOtrosIngresos(){
    let total =0;
    let nodo = jsonResult.declaracion.situacionPatrimonial.ingresos;
    total += nodo.actividadIndustialComercialEmpresarial.remuneracionTotal.valor;
    total += nodo.actividadFinanciera.remuneracionTotal.valor;
    total += nodo.otrosIngresos.remuneracionTotal.valor;
    total += nodo.serviciosProfesionales.remuneracionTotal.valor;
    if (jsonResult.captura.tipo_declaracion !="INICIAL"){ total += nodo.enajenacionBienes.remuneracionTotal.valor; }

    $("input[name='otrosIngresosMensualesTotalCantidad']").val(total);

    let i = $("input[name='remuneracionMensualCargoPublicoCantidad']").val();
    let ii = $("input[name='otrosIngresosMensualesTotalCantidad']").val();
    $("input[name='ingresoMensualNetoDeclaranteCantidad']").val(parseInt(i)+ parseInt(ii));

    let a = $("input[name='ingresoMensualNetoDeclaranteCantidad']").val();
    let b = $("input[name='ingresoMensualNetoParejaDependienteCantidad']").val();
    $("input[name='totalIngresosMensualesNetosCantidad']").val(parseInt(a)+ parseInt(b));
}


$("input[name='remuneracionMensualCargoPublicoCantidad']").change(function() { 
    let i = $("input[name='remuneracionMensualCargoPublicoCantidad']").val();
    let ii = $("input[name='otrosIngresosMensualesTotalCantidad']").val();
    $("input[name='ingresoMensualNetoDeclaranteCantidad']").val(parseInt(i)+ parseInt(ii));

    let a = $("input[name='ingresoMensualNetoDeclaranteCantidad']").val();
    let b = $("input[name='ingresoMensualNetoParejaDependienteCantidad']").val();
    $("input[name='totalIngresosMensualesNetosCantidad']").val(parseInt(a)+ parseInt(b));
});

$("input[name='ingresoMensualNetoParejaDependienteCantidad']").change(function() { 
    let a = $("input[name='ingresoMensualNetoDeclaranteCantidad']").val();
    let b = $("input[name='ingresoMensualNetoParejaDependienteCantidad']").val();
    $("input[name='totalIngresosMensualesNetosCantidad']").val(parseInt(a)+ parseInt(b));
});
