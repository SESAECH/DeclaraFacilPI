
window.initDesempenoServidorPublico = function initDesempenoServidorPublico(data){
    var seccion = JSON.parse(atob(data));
    var seccionName = seccion.moduloName.replace("modulo","");
    var form = "#form" + seccion.moduloName.replace("modulo", "")+ " ";
    var modulo = "#" + seccion.moduloName + " ";

    //cargar catalogos.
    loadCat(moneda, ".CBOmoneda");
    loadCat(tipoInstrumento, ".CBOtipoInstrumento");
    loadCat(tipoBienEnajenacionBienes, ".CBOtipoBienEnajenacionBienes");

    $(form + '.CBOtipoInstrumento').on('change', function() {
        $(form + ".content_tipoInstrumento_especifique").addClass("hide");
        $(form + ".content_tipoInstrumento_especifique input[name='tipoInstrumento_especifique']").val($(form + '.CBOtipoInstrumento option:selected')[0].innerText);
        if(this.value == "OTRO"){
            $(form + ".content_tipoInstrumento_especifique").removeClass("hide");
            $(form + ".content_tipoInstrumento_especifique input[name='tipoInstrumento_especifique']").val("");
        }        
    });

    //validar status de la sección.
    switch(seccion.status){
        case "SIN_INFO":
            //asginar valores predeterminados a catálogos(ayuda al usuario).
            jsonResult.declaracion[seccion.apartado][seccion.seccion].servidorPublicoAnioAnterior=false;
            $("#chkNingunoDesempenoServidorPublico").prop("disabled", false);
            $("#chkNingunoDesempenoServidorPublico")[0].checked=false;
            $("#chkNingunoDesempenoServidorPublico").trigger("change");
             //asginar valores predeterminados a catálogos(ayuda al usuario).
             $(form + ".CBOmoneda").val("MXN");  
             $(form + ".cantidad").val("0");
             $(form + ".CBOtipoInstrumento").val("CAP").trigger("change");
             $(form + "textarea[name='aclaracionesObservaciones']").val();
             $("#tableActividadIndustrial_actividadAnualAnterior").empty();
             $("#tableActividadFinanciera_actividadAnualAnterior").empty();
             $("#tableServiciosProfesionales_actividadAnualAnterior").empty();
             $("#tableOtrosIngresos_actividadAnualAnterior").empty();
 
             $(form + ".btnGuardar").removeClass("hide");
             $(form + ".btnTerminar").removeClass("hide");
             $(modulo + ".btnHabilitar").addClass("hide");
             $(form + ".CBOmoneda").prop("disabled", true);
         break;
        break;
        case "EN_PROCESO":
            if (jsonResult.declaracion[seccion.apartado][seccion.seccion].servidorPublicoAnioAnterior){
                window["loadInfo" + seccionName](seccion.no, seccionName);
                $("#chkNingunoDesempenoServidorPublico")[0].checked=false;                       
            }
            else{
                $("#chkNingunoDesempenoServidorPublico")[0].checked=true;
                $(modulo + "textarea[name='aclaracionesObservaciones']").val(jsonResult.declaracion[seccion.apartado][seccion.seccion].aclaracionesObservaciones).prop("disabled", true);

                $(modulo + ".btnEditar").addClass("hide");
                $(modulo + ".btnEliminar").addClass("hide");
                $(modulo + ".btnAgregar").addClass("hide");
            }            
            $(modulo + ".btnTerminar").removeClass("hide");
            $(modulo + ".btnHabilitar").addClass("hide");
            break;
        case "TERMINADO":
            $("#chkNingunoDesempenoServidorPublico").prop("disabled", true);
            if (!jsonResult.declaracion[seccion.apartado][seccion.seccion].servidorPublicoAnioAnterior){
                $("#chkNingunoDesempenoServidorPublico")[0].checked=true;
                $("#chkNingunoDesempenoServidorPublico").trigger("change");
                $(modulo + "textarea[name='aclaracionesObservaciones']").val(jsonResult.declaracion[seccion.apartado][seccion.seccion].aclaracionesObservaciones).prop("disabled", true);
            }
            else{
                window["loadInfo" + seccionName](seccion.no, seccionName);
                $("#form" + seccionName +" :input").prop("disabled", true);
                $(modulo + ".btnEditar").addClass("hide");
                $(modulo + ".btnEliminar").addClass("hide");
                $(modulo + ".btnAgregar").addClass("hide");

            }            
            $(modulo + ".btnGuardar").addClass("hide");
            $(modulo + ".btnTerminar").addClass("hide");
            $(modulo + ".btnHabilitar").removeClass("hide");
        break;
    }

    $(form + ".btnGuardar").unbind("click");
    $(form + ".btnTerminar").unbind("click");
    $(modulo + ".btnHabilitar").unbind("click");

    $(form + ".btnGuardar").on('click',function() {
        window["guardarForm" + seccionName](seccion.no, seccionName, seccion.apartado);
    });

    $(form + ".btnTerminar").on('click',function() {
        window["guardarForm" + seccionName](seccion.no, seccionName, seccion.apartado);
        $("#chkNingunoDesempenoServidorPublico").prop("disabled", true);
    });
    
    $(modulo + ".btnHabilitar").on("click",function() {
        $("#chkNingunoDesempenoServidorPublico").prop("disabled", false);
        $("#form" + seccionName +" :input").prop("disabled", false);

        $(modulo + ".btnTerminar").removeClass("hide");
        $(modulo + ".btnAgregar").removeClass("hide");
        $(modulo + ".btnEditar").removeClass("hide");
        $(modulo + ".btnEliminar").removeClass("hide");
        $(modulo + "textarea[name='aclaracionesObservaciones']").prop("disabled", false);
        $(modulo + ".btnHabilitar").addClass("hide");

        $(modulo + ".cantidadDisabled").prop("disabled", true);
        $(modulo + ".CBOmoneda").prop("disabled", true);
        

        jsonResult.captura.declaracion[seccion.apartado].secciones[seccion.no].status= "EN_PROCESO";
        $(".status-seccion-" + seccion.apartado + "-" + seccion.no).removeClass("indicador-status indicador-status-success").addClass("indicador-status-process").text("EN PROCESO");
        validarDeclaracionTerminada();
    });

    $(".content_seccion").addClass("hide");
    $("#" + seccion.moduloName).removeClass("hide");
}

window.loadInfoDesempenoServidorPublico = function loadInfoDesempenoServidorPublico(){
    let form="#formDesempenoServidorPublico ";
    let nodo = jsonResult.declaracion.situacionPatrimonial.actividadAnualAnterior;

    $(form + "input[name='fechaIngreso']").val(nodo.fechaIngreso);
    $(form + "input[name='fechaConclusion']").val(nodo.fechaConclusion);

    $(form + "input[name='remuneracionNetaCargoPublicoCantidad']").val(nodo.remuneracionNetaCargoPublico.valor);
    $(form + "select[name='remuneracionNetaCargoPublicoMoneda'] option:selected").val(nodo.remuneracionNetaCargoPublico.moneda);
    $(form + "input[name='otrosIngresosTotalCantidad']").val(nodo.otrosIngresosTotal.valor);
    $(form + "select[name='otrosIngresosTotalMoneda'] option:selected").val(nodo.otrosIngresosTotal.moneda);

    pintarTablaActividadIndustrial_aaa();
    $(form + "input[name='actividadIndustrialRemuneracionTotalCantidad']").val(nodo.actividadIndustialComercialEmpresarial.remuneracionTotal.valor);

    pintarTablaActividadFinanciera_aaa();
    $(form + "input[name='actividadFinancieraRemuneracionTotalCantidad']").val(nodo.actividadFinanciera.remuneracionTotal.valor);

    pintarTablaServiciosProfesionales_aaa();
    $(form + "input[name='serviciosProfesionalesRemuneracionTotalCantidad']").val(nodo.serviciosProfesionales.remuneracionTotal.valor);

    pintarTablaEnajenacionBienes_aaa();
    $(form + "input[name='enajenacionBienesRemuneracionTotalCantidad']").val(nodo.enajenacionBienes.remuneracionTotal.valor);
  
    pintarTablaOtrosIngresos_aaa();
    $(form + "input[name='otrosIngresosRemuneracionTotalCantidad']").val(nodo.otrosIngresos.remuneracionTotal.valor);
  

    $(form + "input[name='ingresoNetoDeclaranteCantidad']").val(nodo.ingresoNetoAnualDeclarante.valor);
    $(form + "select[name='ingresoNetoDeclaranteMoneda'] option:selected").val(nodo.ingresoNetoAnualDeclarante.moneda);

    $(form + "input[name='ingresoNetoParejaDependienteCantidad']").val(nodo.ingresoNetoAnualParejaDependiente.valor);
    $(form + "select[name='ingresoNetoParejaDependienteMoneda'] option:selected").val(nodo.ingresoNetoAnualParejaDependiente.moneda);

    $(form + "input[name='totalIngresosNetosCantidad']").val(nodo.totalIngresosNetosAnuales.valor);
    $(form + "select[name='totalIngresosNetosMoneda'] option:selected").val(nodo.totalIngresosNetosAnuales.moneda);

    $(form + "textarea[name='aclaracionesObservaciones']").val(nodo.aclaracionesObservaciones);  
}


window.guardarFormDesempenoServidorPublico = function guardarFormDesempenoServidorPublico(seccionNo, seccionName, seccionApartado){   
    let form="#formDesempenoServidorPublico ";
    if ($("#chkNingunoDesempenoServidorPublico")[0].checked){
        jsonResult.declaracion.situacionPatrimonial.actividadAnualAnterior={
            "servidorPublicoAnioAnterior": false,
            "fechaIngreso": "",
            "fechaConclusion": "",
            "remuneracionNetaCargoPublico": {
              "valor": 0,
              "moneda": "MXN"
            },
            "otrosIngresosTotal": {
              "valor": 0,
              "moneda": "MXN"
            },
            "actividadIndustialComercialEmpresarial": {
              "remuneracionTotal": {
                "valor": 0,
                "moneda": "MXN"
              },
              "actividades": {}
            },
            "actividadFinanciera": {
              "remuneracionTotal": {
                "valor": 0,
                "moneda": "MXN"
              },
              "actividades": {}
            },
            "serviciosProfesionales": {
              "remuneracionTotal": {
                "valor": 0,
                "moneda": "MXN"
              },
              "servicios": {}
            },
            "enajenacionBienes": {
              "remuneracionTotal": {
                "valor": 0,
                "moneda": "MXN"
              },
              "bienes": {}
            },
            "otrosIngresos": {
              "remuneracionTotal": {
                "valor": 0,
                "moneda": "MXN"
              },
              "ingresos": {}
            },
            "ingresoNetoAnualDeclarante": {
              "valor": 0,
              "moneda": "MXN"
            },
            "ingresoNetoAnualParejaDependiente": {
              "valor": 0,
              "moneda": "MXN"
            },
            "totalIngresosNetosAnuales": {
              "valor": 0,
              "moneda": "MXN"
            },
            "aclaracionesObservaciones": $("#formDesempenoServidorPublico textarea[name='aclaracionesObservaciones']").val().toUpperCase()
          };
          actualizarStatusSeccion(seccionApartado, seccionNo, seccionName, "TERMINADO");
    }
    else{
        if ($(form + "input[name='remuneracionNetaCargoPublicoCantidad']").val() > 0){
            $("#form" + seccionName).validate({
                rules: {
                    fechaIngreso:{ required: true, date:true },
                    fechaConclusion:{ required: true },
                    remuneracionNetaCargoPublicoCantidad : { required: true, maxlength: 50 },
                    ingresoNetoParejaDependienteCantidad : { required: true, maxlength: 50 },
                },
                messages: {
                    fechaIngreso:{ required: "Escribe la fecha de ingreso." },
                    fechaConclusion:{ required: "Escribe la fecha de conclusión"},
                    remuneracionNetaCargoPublicoCantidad : { required: "Ingrese la remuneración neta." },
                    ingresoNetoParejaDependienteCantidad : { required: "Escribe el ingreso neto." },
                },
                // Make sure the form is submitted to the destination defined
                // in the "action" attribute of the form when valid
                submitHandler: function(formIn, btn) {
                    let nodo = jsonResult.declaracion.situacionPatrimonial.actividadAnualAnterior;
                    let chk = $("#chkNingunoDesempenoServidorPublico")[0].checked;
                    nodo.servidorPublicoAnioAnterior= !chk;
                    nodo.fechaIngreso    =  $(form + "input[name='fechaIngreso']").val();
                    nodo.fechaConclusion =  $(form + "input[name='fechaConclusion']").val();
                    
                    nodo.remuneracionNetaCargoPublico.valor =    parseInt($(form + "input[name='remuneracionNetaCargoPublicoCantidad']").val());
                    nodo.remuneracionNetaCargoPublico.moneda =   $(form + "select[name='remuneracionNetaCargoPublicoMoneda'] option:selected").val();
                    nodo.otrosIngresosTotal.valor =        parseInt($(form + "input[name='otrosIngresosTotalCantidad']").val());
                    nodo.otrosIngresosTotal.moneda =       $(form + "select[name='otrosIngresosTotalMoneda'] option:selected").val();
    
                    nodo.ingresoNetoAnualDeclarante.valor =    parseInt($(form + "input[name='ingresoNetoDeclaranteCantidad']").val());
                    nodo.ingresoNetoAnualDeclarante.moneda =   $(form + "select[name='ingresoNetoDeclaranteMoneda'] option:selected").val();
    
                    nodo.ingresoNetoAnualParejaDependiente.valor =    parseInt($(form + "input[name='ingresoNetoParejaDependienteCantidad']").val());
                    nodo.ingresoNetoAnualParejaDependiente.moneda =   $(form + "select[name='ingresoNetoParejaDependienteMoneda'] option:selected").val();
    
                    nodo.totalIngresosNetosAnuales.valor =    parseInt($(form + "input[name='totalIngresosNetosCantidad']").val());
                    nodo.totalIngresosNetosAnuales.moneda =   $(form + "select[name='totalIngresosNetosMoneda'] option:selected").val();
    
                    nodo.aclaracionesObservaciones =   $(form + "textarea[name='aclaracionesObservaciones']").val().toUpperCase();      
                    actualizarStatusSeccion(seccionApartado, seccionNo, seccionName, btn.originalEvent.submitter.dataset.seccionstatus);
                    if (btn.originalEvent.submitter.dataset.seccionstatus=="TERMINADO"){
                        $("#chkNingunoDesempenoServidorPublico").prop("disabled", true);
                        $(form + ".btnAgregar").addClass("hide");
                        $(form + ".btnEditar").addClass("hide");
                        $(form + ".btnEliminar").addClass("hide");
                    }
                }
            });  
        } 
        else {
            mensajeSwal('Error','La remuneración neta del declarante debe ser mayor a 0','error');
        }

            
    }   
}


$("#chkNingunoDesempenoServidorPublico").on("change",function() {
    if(this.checked){
        $("#conetentFormDesempenoServidorPublico").addClass("hide");
        $("#formDesempenoServidorPublico .btnGuardar").addClass("hide");
        $("#formDesempenoServidorPublico .btnTerminar").removeClass("hide");
    }
    else{
        $("#conetentFormDesempenoServidorPublico").removeClass("hide");
        $("#formDesempenoServidorPublico .btnGuardar").removeClass("hide");
        $("#formDesempenoServidorPublico .btnTerminar").removeClass("hide");
    }
});



/* -------------------------------------------------------------- */
/* ActividadIndustrial */
window.agregarActividadIndustrial_aaa = function agregarActividadIndustrial_aaa(){ 
    let form="#formDesempenoServidorPublico ";   
    if($(form + "input[name='actividadIndustrialNombreRazonSocial']").val().length == 0){ mensajeSwal("Aviso","Ingrese el NOMBRE O RAZÓN SOCIAL","error");}
    else if($(form + "input[name='actividadIndustrialTipoNegocio']").val().length == 0){ mensajeSwal("Aviso","Ingrese el TIPO DE NEGOCIO","error");}
    else if($(form + "input[name='actividadIndustrialRemuneracionCantidad']").val().length == 0){ mensajeSwal("Aviso","Ingrese la REMUNERACIÓN","error");}
    else{
        if ($(form + ".btnAgregarActividadIndustrial")[0].dataset.uuid){
            uuidItem = $(form + ".btnAgregarActividadIndustrial")[0].dataset.uuid;
        }
        else{
            uuidItem= generarUUID();
        }    
        guardarActividadIndustrial_aaa(uuidItem);
    }
}

window.guardarActividadIndustrial_aaa = function guardarActividadIndustrial_aaa(uuidItem){
    let form="#formDesempenoServidorPublico ";
    jsonResult.declaracion.situacionPatrimonial.actividadAnualAnterior.actividadIndustialComercialEmpresarial.actividades[uuidItem] = {
        "uuid":uuidItem,
        "remuneracion": {
          "valor":  parseInt($(form + "input[name='actividadIndustrialRemuneracionCantidad']").val()),
          "moneda": $(form + "select[name='actividadIndustrialRemuneracionMoneda'] option:selected").val()
        },
        "nombreRazonSocial":    $(form + "input[name='actividadIndustrialNombreRazonSocial']").val().toUpperCase(),
        "tipoNegocio":          $(form + "input[name='actividadIndustrialTipoNegocio']").val().toUpperCase()
      };
      //limpiar inputs
      $(form + "input[name='actividadIndustrialNombreRazonSocial']").val("");
      $(form + "input[name='actividadIndustrialTipoNegocio']").val("");
      $(form + "input[name='actividadIndustrialRemuneracionCantidad']").val("");
      $(form + ".btnAgregarActividadIndustrial").html('<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus" viewBox="0 0 16 16">\
                                                    <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>\
                                                </svg>\
                                                Agregar').attr("data-uuid","");
      pintarTablaActividadIndustrial_aaa();
}

window.pintarTablaActividadIndustrial_aaa = function pintarTablaActividadIndustrial_aaa(){
    let form="#formDesempenoServidorPublico ";
    let html="",remuneracionTotal=0;
    let lista = jsonResult.declaracion.situacionPatrimonial.actividadAnualAnterior.actividadIndustialComercialEmpresarial.actividades;
    Object.keys(lista).forEach(function (row) {
        var params = { uuid: lista[row].uuid, nombreRazonSocial: lista[row].nombreRazonSocial, tipoNegocio: lista[row].tipoNegocio, remuneracion: lista[row].remuneracion.valor, moneda: lista[row].remuneracion.moneda};
        remuneracionTotal+=lista[row].remuneracion.valor;
        html+="<tr id='" + lista[row].uuid + "'>";
        html+=" <td class='text-left'  style='width:40%;'>" + lista[row].nombreRazonSocial +"</td>";
        html+=" <td class='text-left'  style='width:30%;'>" + lista[row].tipoNegocio +"</td>";
        html+=" <td class='text-right' style='width:10%;'>" + lista[row].remuneracion.valor + " " + lista[row].remuneracion.moneda + "</td>";
        html+=" <td class='text-right' style='width:20%;'>";
        html+="     <button type='button' class='btn btn-sm btn-warning btnEditar' onclick='editarActividadIndustrial_aaa(\"" + btoa(JSON.stringify(params)) + "\");'>Editar</button>";
        html+="     <button type='button' class='btn btn-sm btn-danger btnEliminar' onclick='eliminarActividadIndustrial_aaa(\"" + btoa(JSON.stringify(params)) + "\");'>Eliminar</button>";              
        html+=" </td>";
        html+="</tr>";
    });
    $("#tableActividadIndustrial_aaa").empty().append(html);

    jsonResult.declaracion.situacionPatrimonial.actividadAnualAnterior.actividadIndustialComercialEmpresarial.remuneracionTotal.valor = remuneracionTotal;
    jsonResult.declaracion.situacionPatrimonial.actividadAnualAnterior.actividadIndustialComercialEmpresarial.remuneracionTotal.moneda = "MXN";
    $(form + "input[name='actividadIndustrialRemuneracionTotalCantidad']").val(remuneracionTotal);
    sumaOtrosIngresos_aaa();
}

window.editarActividadIndustrial_aaa = function editarActividadIndustrial_aaa(data){
    let form="#formDesempenoServidorPublico ";
    let item = JSON.parse(atob(data));
    $(form + "input[name='actividadIndustrialNombreRazonSocial']").val(item.nombreRazonSocial);
    $(form + "input[name='actividadIndustrialTipoNegocio']").val(item.tipoNegocio);
    $(form + "input[name='actividadIndustrialRemuneracionCantidad']").val(item.remuneracion);
    $(form + ".btnAgregarActividadIndustrial").html('<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus" viewBox="0 0 16 16">\
                                                    <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>\
                                                </svg>\
                                                Actualizar').attr("data-uuid",item.uuid);
}

window.eliminarActividadIndustrial_aaa = function eliminarActividadIndustrial_aaa(data){
    let form="#formDesempenoServidorPublico ";
    let remuneracionTotal=0;
    let item = JSON.parse(atob(data));
    //elimina item en object json y tabla.
    delete jsonResult.declaracion.situacionPatrimonial.actividadAnualAnterior.actividadIndustialComercialEmpresarial.actividades[item.uuid];
    $("#" + item.uuid).remove();
    Object.keys(jsonResult.declaracion.situacionPatrimonial.actividadAnualAnterior.actividadIndustialComercialEmpresarial.actividades).forEach(function (row) {
        remuneracionTotal+=jsonResult.declaracion.situacionPatrimonial.actividadAnualAnterior.actividadIndustialComercialEmpresarial.actividades[row].remuneracion.valor;        
    });
    jsonResult.declaracion.situacionPatrimonial.actividadAnualAnterior.actividadIndustialComercialEmpresarial.remuneracionTotal.valor = remuneracionTotal;
    $(form + "input[name='actividadIndustrialRemuneracionTotalCantidad']").val(remuneracionTotal);
    sumaOtrosIngresos_aaa();
}

/* -------------------------------------------------------------- */
/* ActividadFinanciera */
window.agregarActividadFinanciera_aaa = function agregarActividadFinanciera_aaa(){
    let form="#formDesempenoServidorPublico ";
    if($(form + "input[name='actividadFinancieraRemuneracionCantidad']").val().length == 0){ mensajeSwal("Aviso","Ingrese la REMUNERACIÓN","error");}
    else{ 
        if ($(form + ".btnAgregarActividadFinanciera")[0].dataset.uuid){
            uuidItem = $(form + ".btnAgregarActividadFinanciera")[0].dataset.uuid;
        }
        else{
            uuidItem= generarUUID();
        }    
        guardarActividadFinanciera_aaa(uuidItem);
    }
}

window.guardarActividadFinanciera_aaa = function guardarActividadFinanciera_aaa(uuidItem){
    let form="#formDesempenoServidorPublico ";
    jsonResult.declaracion.situacionPatrimonial.actividadAnualAnterior.actividadFinanciera.actividades[uuidItem] = {
        "uuid":uuidItem,
        "remuneracion": {
          "valor":  parseInt($(form + "input[name='actividadFinancieraRemuneracionCantidad']").val()),
          "moneda": $(form + "select[name='actividadFinancieraRemuneracionMoneda'] option:selected").val()
        },
        "tipoInstrumento": 
        {
            "clave":  $(form + "select[name='tipoInstrumento'] option:selected").val(),
            "valor":  $(form  + "input[name='tipoInstrumento_especifique']").val().toUpperCase(),
          }          
      };
      //limpiar inputs
      $(form + "input[name='actividadFinancieraRemuneracionCantidad']").val("");
      $(form + ".btnAgregarActividadFinanciera").html('<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus" viewBox="0 0 16 16">\
                                                    <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>\
                                                </svg>\
                                                Agregar').attr("data-uuid","");
      pintarTablaActividadFinanciera_aaa();
}

window.pintarTablaActividadFinanciera_aaa = function pintarTablaActividadFinanciera_aaa(){
    let form="#formDesempenoServidorPublico ";
    let html="",remuneracionTotal=0;
    let lista = jsonResult.declaracion.situacionPatrimonial.actividadAnualAnterior.actividadFinanciera.actividades;
    Object.keys(lista).forEach(function (row) {
        var params = { uuid: lista[row].uuid, tipoInstrumento: lista[row].tipoInstrumento.clave, remuneracion: lista[row].remuneracion.valor, moneda: lista[row].remuneracion.moneda};
        remuneracionTotal+=lista[row].remuneracion.valor;
        html+="<tr id='" + lista[row].uuid + "'>";
        html+=" <td class='text-left'  style='width:40%;'>" + lista[row].tipoInstrumento.valor +"</td>";
        html+=" <td class='text-right' style='width:10%;'>" + lista[row].remuneracion.valor + " " + lista[row].remuneracion.moneda + "</td>";
        html+=" <td class='text-right' style='width:20%;'>";
        html+="     <button type='button' class='btn btn-sm btn-warning btnEditar' onclick='editarActividadFinanciera_aaa(\"" + btoa(JSON.stringify(params)) + "\");'>Editar</button>";
        html+="     <button type='button' class='btn btn-sm btn-danger btnEliminar' onclick='eliminarActividadFinanciera_aaa(\"" + btoa(JSON.stringify(params)) + "\");'>Eliminar</button>";              
        html+=" </td>";
        html+="</tr>";
    });
    $("#tableActividadFinanciera_aaa").empty().append(html);

    jsonResult.declaracion.situacionPatrimonial.actividadAnualAnterior.actividadFinanciera.remuneracionTotal.valor = remuneracionTotal;
    jsonResult.declaracion.situacionPatrimonial.actividadAnualAnterior.actividadFinanciera.remuneracionTotal.moneda = "MXN";
    $(form + "input[name='actividadFinancieraRemuneracionTotalCantidad']").val(remuneracionTotal);
    sumaOtrosIngresos_aaa();
}

window.editarActividadFinanciera_aaa = function editarActividadFinanciera_aaa(data){
    let form="#formDesempenoServidorPublico ";
    let item = JSON.parse(atob(data));
    $(form + "select[name='tipoInstrumento']").val(item.tipoInstrumento);
    $(form + "input[name='actividadFinancieraRemuneracionCantidad']").val(item.remuneracion);
    $(form + ".btnAgregarActividadFinanciera").html('<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus" viewBox="0 0 16 16">\
                                                    <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>\
                                                </svg>\
                                                Actualizar').attr("data-uuid",item.uuid);
}

window.eliminarActividadFinanciera_aaa = function eliminarActividadFinanciera_aaa(data){
    let form="#formDesempenoServidorPublico ";
    let remuneracionTotal=0;
    let item = JSON.parse(atob(data));
    //elimina item en object json y tabla.
    delete jsonResult.declaracion.situacionPatrimonial.actividadAnualAnterior.actividadFinanciera.actividades[item.uuid];
    $("#" + item.uuid).remove();
    Object.keys(jsonResult.declaracion.situacionPatrimonial.actividadAnualAnterior.actividadFinanciera.actividades).forEach(function (row) {
        remuneracionTotal+=jsonResult.declaracion.situacionPatrimonial.actividadAnualAnterior.actividadFinanciera.actividades[row].remuneracion.valor;        
    });
    jsonResult.declaracion.situacionPatrimonial.actividadAnualAnterior.actividadFinanciera.remuneracionTotal.valor = remuneracionTotal;
    $(form + "input[name='actividadFinancieraRemuneracionTotalCantidad']").val(remuneracionTotal);
    sumaOtrosIngresos_aaa();
}

/* -------------------------------------------------------------- */
/* ServiciosProfesionales */
window.agregarServiciosProfesionales_aaa = function agregarServiciosProfesionales_aaa(){
    let form="#formDesempenoServidorPublico ";
    if($(form + "input[name='tipoServicio']").val().length == 0){ mensajeSwal("Aviso","Ingrese el TIPO DE SERVICIO PRESTADO","error");}
    else if($(form + "input[name='serviciosProfesionalesRemuneracionCantidad']").val().length == 0){ mensajeSwal("Aviso","Ingrese la REMUNERACIÓN","error");}
    else{
        if ($(form + ".btnAgregarServiciosProfesionales")[0].dataset.uuid){
            uuidItem = $(form + ".btnAgregarServiciosProfesionales")[0].dataset.uuid;
        }
        else{
            uuidItem= generarUUID();
        }    
        guardarServiciosProfesionales_aaa(uuidItem);
    }
}

window.guardarServiciosProfesionales_aaa = function guardarServiciosProfesionales_aaa(uuidItem){
    let form="#formDesempenoServidorPublico ";
    jsonResult.declaracion.situacionPatrimonial.actividadAnualAnterior.serviciosProfesionales.servicios[uuidItem] = {
        "uuid":uuidItem,
        "remuneracion": {
          "valor":  parseInt($(form + "input[name='serviciosProfesionalesRemuneracionCantidad']").val()),
          "moneda": $(form + "select[name='serviciosProfesionalesRemuneracionMoneda'] option:selected").val()
        },
        "tipoServicio": $(form + "input[name='tipoServicio']").val().toUpperCase()
      };
      //limpiar inputs
      $(form + "input[name='serviciosProfesionalesRemuneracionCantidad']").val("");
      $(form + "input[name='tipoServicio']").val("");
      $(form + ".btnAgregarServiciosProfesionales").html('<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus" viewBox="0 0 16 16">\
                                                    <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>\
                                                </svg>\
                                                Agregar').attr("data-uuid","");
      pintarTablaServiciosProfesionales_aaa();
}

window.pintarTablaServiciosProfesionales_aaa = function pintarTablaServiciosProfesionales_aaa(){
    let form="#formDesempenoServidorPublico ";
    let html="",remuneracionTotal=0;
    let lista = jsonResult.declaracion.situacionPatrimonial.actividadAnualAnterior.serviciosProfesionales.servicios;
    Object.keys(lista).forEach(function (row) {
        var params = { uuid: lista[row].uuid, tipoServicio: lista[row].tipoServicio, remuneracion: lista[row].remuneracion.valor, moneda: lista[row].remuneracion.moneda};
        remuneracionTotal+=lista[row].remuneracion.valor;
        html+="<tr id='" + lista[row].uuid + "'>";
        html+=" <td class='text-left'  style='width:40%;'>" + lista[row].tipoServicio +"</td>";
        html+=" <td class='text-right' style='width:10%;'>" + lista[row].remuneracion.valor + " " + lista[row].remuneracion.moneda + "</td>";
        html+=" <td class='text-right' style='width:20%;'>";
        html+="     <button type='button' class='btn btn-sm btn-warning btnEditar' onclick='editarServiciosProfesionales_aaa(\"" + btoa(JSON.stringify(params)) + "\");'>Editar</button>";
        html+="     <button type='button' class='btn btn-sm btn-danger btnEliminar' onclick='eliminarServiciosProfesionales_aaa(\"" + btoa(JSON.stringify(params)) + "\");'>Eliminar</button>";              
        html+=" </td>";
        html+="</tr>";
    });
    $("#tableServiciosProfesionales_aaa").empty().append(html);

    jsonResult.declaracion.situacionPatrimonial.actividadAnualAnterior.serviciosProfesionales.remuneracionTotal.valor = remuneracionTotal;
    jsonResult.declaracion.situacionPatrimonial.actividadAnualAnterior.serviciosProfesionales.remuneracionTotal.moneda = "MXN";
    $(form + "input[name='serviciosProfesionalesRemuneracionTotalCantidad']").val(remuneracionTotal);
    sumaOtrosIngresos_aaa();
}

window.editarServiciosProfesionales_aaa = function editarServiciosProfesionales_aaa(data){
    let form="#formDesempenoServidorPublico ";
    let item = JSON.parse(atob(data));
    $(form + "input[name='tipoServicio']").val(item.tipoServicio);
    $(form + "input[name='serviciosProfesionalesRemuneracionCantidad']").val(item.remuneracion);
    $(form + ".btnAgregarServiciosProfesionales").html('<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus" viewBox="0 0 16 16">\
                                                    <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>\
                                                </svg>\
                                                Actualizar').attr("data-uuid",item.uuid);
}

window.eliminarServiciosProfesionales_aaa = function eliminarServiciosProfesionales_aaa(data){
    let form="#formDesempenoServidorPublico ";
    let remuneracionTotal=0;
    let item = JSON.parse(atob(data));
    //elimina item en object json y tabla.
    delete jsonResult.declaracion.situacionPatrimonial.actividadAnualAnterior.serviciosProfesionales.servicios[item.uuid];
    $("#" + item.uuid).remove();
    Object.keys(jsonResult.declaracion.situacionPatrimonial.actividadAnualAnterior.serviciosProfesionales.servicios).forEach(function (row) {
        remuneracionTotal+=jsonResult.declaracion.situacionPatrimonial.actividadAnualAnterior.serviciosProfesionales.servicios[row].remuneracion.valor;        
    });
    jsonResult.declaracion.situacionPatrimonial.actividadAnualAnterior.serviciosProfesionales.remuneracionTotal.valor = remuneracionTotal;
    $(form + "input[name='serviciosProfesionalesRemuneracionTotalCantidad']").val(remuneracionTotal);
    sumaOtrosIngresos_aaa();
}


/* -------------------------------------------------------------- */
/* EnajenacionBienes */
window.agregarEnajenacionBienes_aaa = function agregarEnajenacionBienes_aaa(){
    let form="#formDesempenoServidorPublico ";
    if($(form + "input[name='enajenacionBienesRemuneracionCantidad']").val().length == 0){ mensajeSwal("Aviso","Ingrese la REMUNERACIÓN","error");}
    else{ 
        if ($(form + ".btnAgregarEnajenacionBienes")[0].dataset.uuid){
            uuidItem = $(form + ".btnAgregarEnajenacionBienes")[0].dataset.uuid;
        }
        else{
            uuidItem= generarUUID();
        }    
        guardarEnajenacionBienes_aaa(uuidItem);
    }
}

window.guardarEnajenacionBienes_aaa = function guardarEnajenacionBienes_aaa(uuidItem){
    let form="#formDesempenoServidorPublico ";
    jsonResult.declaracion.situacionPatrimonial.actividadAnualAnterior.enajenacionBienes.bienes[uuidItem] = {
        "uuid":uuidItem,
        "remuneracion": {
          "valor":  parseInt($(form + "input[name='enajenacionBienesRemuneracionCantidad']").val()),
          "moneda": $(form + "select[name='enajenacionBienesRemuneracionMoneda'] option:selected").val()
        },
        "tipoBienEnajenado": $(form + "select[name='tipoBienEnajenado'] option:selected").val().toUpperCase()
      };
      //limpiar inputs
      $(form + "input[name='enajenacionBienesRemuneracionCantidad']").val("");
      $(form + "input[name='tipoIngreso']").val("");
      $(form + ".btnAgregarEnajenacionBienes").html('<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus" viewBox="0 0 16 16">\
                                                    <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>\
                                                </svg>\
                                                Agregar').attr("data-uuid","");
      pintarTablaEnajenacionBienes_aaa();
}

window.pintarTablaEnajenacionBienes_aaa = function pintarTablaEnajenacionBienes_aaa(){
    let form="#formDesempenoServidorPublico ";
    let html="", remuneracionTotal=0;
    let lista = jsonResult.declaracion.situacionPatrimonial.actividadAnualAnterior.enajenacionBienes.bienes;
    Object.keys(lista).forEach(function (row) {
        var params = { uuid: lista[row].uuid, tipoBienEnajenado: lista[row].tipoBienEnajenado, remuneracion: lista[row].remuneracion.valor, moneda: lista[row].remuneracion.moneda};
        remuneracionTotal+=lista[row].remuneracion.valor;
        html+="<tr id='" + lista[row].uuid + "'>";
        html+=" <td class='text-left'  style='width:40%;'>" + lista[row].tipoBienEnajenado +"</td>";
        html+=" <td class='text-right' style='width:10%;'>" + lista[row].remuneracion.valor + " " + lista[row].remuneracion.moneda + "</td>";
        html+=" <td class='text-right' style='width:20%;'>";
        html+="     <button type='button' class='btn btn-sm btn-warning btnEditar' onclick='editarEnajenacionBienes_aaa(\"" + btoa(JSON.stringify(params)) + "\");'>Editar</button>";
        html+="     <button type='button' class='btn btn-sm btn-danger btnEliminar' onclick='eliminarEnajenacionBienes_aaa(\"" + btoa(JSON.stringify(params)) + "\");'>Eliminar</button>";              
        html+=" </td>";
        html+="</tr>";
    });
    $("#tableEnajenacionBienes_aaa").empty().append(html);

    jsonResult.declaracion.situacionPatrimonial.actividadAnualAnterior.enajenacionBienes.remuneracionTotal.valor = remuneracionTotal;
    jsonResult.declaracion.situacionPatrimonial.actividadAnualAnterior.enajenacionBienes.remuneracionTotal.moneda = "MXN";
    $(form + "input[name='enajenacionBienesRemuneracionTotalCantidad']").val(remuneracionTotal);
    sumaOtrosIngresos_aaa();
}

window.editarEnajenacionBienes_aaa = function editarEnajenacionBienes_aaa(data){
    let form="#formDesempenoServidorPublico ";
    let item = JSON.parse(atob(data));
    $(form + "select[name='tipoBienEnajenado']").val(item.tipoBienEnajenado);
    $(form + "input[name='enajenacionBienesRemuneracionCantidad']").val(item.remuneracion);
    $(form + ".btnAgregarEnajenacionBienes").html('<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus" viewBox="0 0 16 16">\
                                                    <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>\
                                                </svg>\
                                                Actualizar').attr("data-uuid",item.uuid);
}

window.eliminarEnajenacionBienes_aaa = function eliminarEnajenacionBienes_aaa(data){
    let form="#formDesempenoServidorPublico ";
    let remuneracionTotal=0;
    let item = JSON.parse(atob(data));
    //elimina item en object json y tabla.
    delete jsonResult.declaracion.situacionPatrimonial.actividadAnualAnterior.enajenacionBienes.bienes[item.uuid];
    $("#" + item.uuid).remove();
    Object.keys(jsonResult.declaracion.situacionPatrimonial.actividadAnualAnterior.enajenacionBienes.bienes).forEach(function (row) {
        remuneracionTotal+=jsonResult.declaracion.situacionPatrimonial.actividadAnualAnterior.enajenacionBienes.bienes[row].remuneracion.valor;        
    });
    jsonResult.declaracion.situacionPatrimonial.actividadAnualAnterior.enajenacionBienes.remuneracionTotal.valor = remuneracionTotal;
    $(form + "input[name='enajenacionBienesRemuneracionTotalCantidad']").val(remuneracionTotal);
    sumaOtrosIngresos_aaa();
}

/* -------------------------------------------------------------- */
/* OtrosIngresos */
window.agregarOtrosIngresos_aaa = function agregarOtrosIngresos_aaa(){
    let form="#formDesempenoServidorPublico ";
    if($(form + "input[name='tipoIngreso']").val().length == 0){ mensajeSwal("Aviso","Ingrese el TIPO DE INGRESO","error");}
    else if($(form + "input[name='otrosIngresosRemuneracionCantidad']").val().length == 0){ mensajeSwal("Aviso","Ingrese la REMUNERACIÓN","error");}
    else{
        if ($(form + ".btnAgregarOtrosIngresos")[0].dataset.uuid){
            uuidItem = $(form + ".btnAgregarOtrosIngresos")[0].dataset.uuid;
        }
        else{
            uuidItem= generarUUID();
        }    
        guardarOtrosIngresos_aaa(uuidItem);
    }
}

window.guardarOtrosIngresos_aaa = function guardarOtrosIngresos_aaa(uuidItem){
    let form="#formDesempenoServidorPublico ";
    jsonResult.declaracion.situacionPatrimonial.actividadAnualAnterior.otrosIngresos.ingresos[uuidItem] = {
        "uuid":uuidItem,
        "remuneracion": {
          "valor":  parseInt($(form + "input[name='otrosIngresosRemuneracionCantidad']").val()),
          "moneda": $(form + "select[name='otrosIngresosRemuneracionMoneda'] option:selected").val()
        },
        "tipoIngreso": $(form + "input[name='tipoIngreso']").val().toUpperCase()
      };
      //limpiar inputs
      $(form + "input[name='otrosIngresosRemuneracionCantidad']").val("");
      $(form + "input[name='tipoIngreso']").val("");
      $(form + ".btnAgregarOtrosIngresos").html('<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus" viewBox="0 0 16 16">\
                                                    <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>\
                                                </svg>\
                                                Agregar').attr("data-uuid","");
      pintarTablaOtrosIngresos_aaa();
}

window.pintarTablaOtrosIngresos_aaa = function pintarTablaOtrosIngresos_aaa(){
    let form="#formDesempenoServidorPublico ";
    let html="", remuneracionTotal=0;
    let lista = jsonResult.declaracion.situacionPatrimonial.actividadAnualAnterior.otrosIngresos.ingresos;
    Object.keys(lista).forEach(function (row) {
        var params = { uuid: lista[row].uuid, tipoIngreso: lista[row].tipoIngreso, remuneracion: lista[row].remuneracion.valor, moneda: lista[row].remuneracion.moneda};
        remuneracionTotal+=lista[row].remuneracion.valor;
        html+="<tr id='" + lista[row].uuid + "'>";
        html+=" <td class='text-left'  style='width:40%;'>" + lista[row].tipoIngreso +"</td>";
        html+=" <td class='text-right' style='width:10%;'>" + lista[row].remuneracion.valor + " " + lista[row].remuneracion.moneda + "</td>";
        html+=" <td class='text-right' style='width:20%;'>";
        html+="     <button type='button' class='btn btn-sm btn-warning btnEditar' onclick='editarOtrosIngresos_aaa(\"" + btoa(JSON.stringify(params)) + "\");'>Editar</button>";
        html+="     <button type='button' class='btn btn-sm btn-danger btnEliminar' onclick='eliminarOtrosIngresos_aaa(\"" + btoa(JSON.stringify(params)) + "\");'>Eliminar</button>";              
        html+=" </td>";
        html+="</tr>";
    });
    $("#tableOtrosIngresos_aaa").empty().append(html);

    jsonResult.declaracion.situacionPatrimonial.actividadAnualAnterior.otrosIngresos.remuneracionTotal.valor = remuneracionTotal;
    jsonResult.declaracion.situacionPatrimonial.actividadAnualAnterior.otrosIngresos.remuneracionTotal.moneda = "MXN";
    $(form + "input[name='otrosIngresosRemuneracionTotalCantidad']").val(remuneracionTotal);
    sumaOtrosIngresos_aaa();
}

window.editarOtrosIngresos_aaa = function editarOtrosIngresos_aaa(data){
    let form="#formDesempenoServidorPublico ";
    let item = JSON.parse(atob(data));
    $(form + "input[name='tipoIngreso']").val(item.tipoIngreso);
    $(form + "input[name='otrosIngresosRemuneracionCantidad']").val(item.remuneracion);
    $(form + ".btnAgregarOtrosIngresos").html('<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus" viewBox="0 0 16 16">\
                                                    <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>\
                                                </svg>\
                                                Actualizar').attr("data-uuid",item.uuid);
}

window.eliminarOtrosIngresos_aaa = function eliminarOtrosIngresos_aaa(data){
    let form="#formDesempenoServidorPublico ";
    let remuneracionTotal=0;
    let item = JSON.parse(atob(data));
    //elimina item en object json y tabla.
    delete jsonResult.declaracion.situacionPatrimonial.actividadAnualAnterior.otrosIngresos.ingresos[item.uuid];
    $("#" + item.uuid).remove();
    Object.keys(jsonResult.declaracion.situacionPatrimonial.actividadAnualAnterior.otrosIngresos.ingresos).forEach(function (row) {
        remuneracionTotal+=jsonResult.declaracion.situacionPatrimonial.actividadAnualAnterior.otrosIngresos.ingresos[row].remuneracion.valor;        
    });
    jsonResult.declaracion.situacionPatrimonial.actividadAnualAnterior.otrosIngresos.remuneracionTotal.valor = remuneracionTotal;
    $(form + "input[name='otrosIngresosRemuneracionTotalCantidad']").val(remuneracionTotal);
    sumaOtrosIngresos_aaa();
}


/* -------------------------------------------------------------- */

window.sumaOtrosIngresos_aaa = function sumaOtrosIngresos_aaa(){
    let form="#formDesempenoServidorPublico ";
    let total =0;
    let nodo = jsonResult.declaracion.situacionPatrimonial.actividadAnualAnterior;
    total += nodo.actividadIndustialComercialEmpresarial.remuneracionTotal.valor;
    total += nodo.actividadFinanciera.remuneracionTotal.valor;
    total += nodo.otrosIngresos.remuneracionTotal.valor;
    total += nodo.serviciosProfesionales.remuneracionTotal.valor;
    total += nodo.enajenacionBienes.remuneracionTotal.valor;

    $(form + "input[name='otrosIngresosTotalCantidad']").val(total);

    let i = $(form + "input[name='remuneracionNetaCargoPublicoCantidad']").val();
    let ii = $(form + "input[name='otrosIngresosTotalCantidad']").val();
    $(form + "input[name='ingresoNetoDeclaranteCantidad']").val(parseInt(i)+ parseInt(ii));

    let a = $(form + "input[name='ingresoNetoDeclaranteCantidad']").val();
    let b = $(form + "input[name='ingresoNetoParejaDependienteCantidad']").val();
    $(form + "input[name='totalIngresosNetosCantidad']").val(parseInt(a)+ parseInt(b));
}

$("#formDesempenoServidorPublico input[name='remuneracionNetaCargoPublicoCantidad']").change(function() {
    //console.log("change remuneracionNetaCargoPublicoCantidad");
    let form="#formDesempenoServidorPublico "; 
    let i = $(form + "input[name='remuneracionNetaCargoPublicoCantidad']").val();
    let ii = $(form + "input[name='otrosIngresosTotalCantidad']").val();
    $(form + "input[name='ingresoNetoDeclaranteCantidad']").val(parseInt(i)+ parseInt(ii));

    let a = $(form + "input[name='ingresoNetoDeclaranteCantidad']").val();
    let b = $(form + "input[name='ingresoNetoParejaDependienteCantidad']").val();
    $(form + "input[name='totalIngresosNetosCantidad']").val(parseInt(a)+ parseInt(b));
});

$("#formDesempenoServidorPublico input[name='ingresoNetoParejaDependienteCantidad']").change(function() { 
    //console.log("change ingresoNetoParejaDependienteCantidad");
    let form="#formDesempenoServidorPublico ";
    let a = $(form + "input[name='ingresoNetoDeclaranteCantidad']").val();
    let b = $(form + "input[name='ingresoNetoParejaDependienteCantidad']").val();
    $(form + "input[name='totalIngresosNetosCantidad']").val(parseInt(a)+ parseInt(b));
});
