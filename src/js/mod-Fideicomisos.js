window.initFideicomisos = function initFideicomisos(data){
    var seccion = JSON.parse(atob(data));
    var seccionName = seccion.moduloName.replace("modulo","");
    var form = "#form" + seccion.moduloName.replace("modulo", "")+ " ";
    var modulo = "#" + seccion.moduloName + " ";

    //validar status de la sección.
    switch(seccion.status){
        case "SIN_INFO":
            //asginar valores predeterminados a catálogos(ayuda al usuario).
            jsonResult.declaracion.interes.fideicomisos.ninguno=true;
            $(modulo + ".chkNinguno").prop("disabled", false);
            $(modulo + ".chkNinguno")[0].checked=false;
            $(modulo + "textarea[name='aclaracionesObservaciones']").val("");
            $(modulo + ".btnAgregar").removeClass("hide");
            $(modulo + ".btnTerminar").addClass("hide");
            $(modulo + ".btnHabilitar").addClass("hide");
            $(modulo + ".formSecundario").addClass("hide");           
        break;
        case "EN_PROCESO":
            window["pintarTabla" + seccionName](seccion.no, seccionName);
            $(modulo + ".btnAgregar").removeClass("hide");
            $(modulo + ".btnHabilitar").addClass("hide");
            $(modulo + ".btnTerminar").removeClass("hide");
            if (Object.keys(jsonResult.declaracion.interes.fideicomisos.fideicomiso).length > 0){
                $(modulo + ".btnAgregar").removeClass("hide");
            }
            else{
                $(modulo + ".btnAgregar").addClass("hide");
            }                     

            break;
        case "TERMINADO":
            window["pintarTabla" + seccionName](seccion.no, seccionName);
            if (jsonResult.declaracion.interes.fideicomisos.ninguno){
                $(modulo + ".chkNinguno")[0].checked=true;
                $(modulo + ".chkNinguno").prop("disabled", true);
            }
            $(modulo + "textarea[name='aclaracionesObservaciones']").val(jsonResult.declaracion.interes.fideicomisos.aclaracionesObservaciones).prop("disabled", true);
            $(modulo + ".btnEditar").addClass("hide");
            $(modulo + ".btnEliminar").addClass("hide");
            $(modulo + ".btnAgregar").addClass("hide");
            $(modulo + ".btnTerminar").addClass("hide");
            $(modulo + ".btnHabilitar").removeClass("hide");
        break;
    }

    $(modulo + ".btnAgregar").unbind("click");
    $(modulo + ".btnTerminar").unbind("click");
    $(modulo + ".btnHabilitar").unbind("click");

    $(modulo + ".btnAgregar").on('click',function() {
        window["funcionalidadGuardarRegistro" + seccionName](seccion.no, seccionName, modulo, "NUEVO");
    });

    $(modulo + ".btnTerminar").on('click',function() {
        jsonResult.declaracion.interes.fideicomisos.aclaracionesObservaciones =  $(modulo + "textarea[name='aclaracionesObservaciones']").val().toUpperCase();
        $(modulo + "textarea[name='aclaracionesObservaciones']").prop("disabled", true);
        //inhabilitar controles del modulo.
        $(modulo + ".chkNinguno").prop("disabled", true);
        $(modulo + ".btnTerminar").addClass("hide");
        $(modulo + ".btnAgregar").addClass("hide");
        $(modulo + ".btnEditar").addClass("hide");
        $(modulo + ".btnEliminar").addClass("hide");
        //cambiar status.
        $(modulo + ".btnHabilitar").removeClass("hide");
        jsonResult.captura.declaracion[seccion.apartado].secciones[seccion.no].status= "TERMINADO";
        $(".status-seccion-" + seccion.apartado + "-" + seccion.no).removeClass("indicador-status indicador-status-process").addClass("indicador-status-success").text("TERMINADO");
        mensajeSwal("Aviso","Sección terminada con exito.", "success");
        validarDeclaracionTerminada();
    });
    
    $(modulo + ".btnHabilitar").on("click",function() {
        $(modulo + ".chkNinguno").prop("disabled", false);
        $(modulo + ".btnTerminar").removeClass("hide");
        $(modulo + ".btnAgregar").removeClass("hide");
        $(modulo + ".btnEditar").removeClass("hide");
        $(modulo + ".btnEliminar").removeClass("hide");
        $(modulo + "textarea[name='aclaracionesObservaciones']").prop("disabled", false);
        $(modulo + ".btnHabilitar").addClass("hide");

        if ($(modulo + ".chkNinguno")[0].checked){
            $(modulo + ".btnAgregar").addClass("hide");
        }
        else{
            $(modulo + ".btnAgregar").removeClass("hide");
        } 

        jsonResult.captura.declaracion[seccion.apartado].secciones[seccion.no].status= "EN_PROCESO";
        $(".status-seccion-" + seccion.apartado + "-" + seccion.no).removeClass("indicador-status indicador-status-success").addClass("indicador-status-process").text("EN PROCESO");
        validarDeclaracionTerminada();
    });
    
    $(".content_seccion").addClass("hide");
    $("#" + seccion.moduloName).removeClass("hide");
    $(modulo + ".formSecundario").addClass("hide");
    $(modulo + ".formPrincipal").removeClass("hide").addClass("animated fadeOut");
}

window.funcionalidadGuardarRegistroFideicomisos = function funcionalidadGuardarRegistroFideicomisos(seccionNo, seccionName, modulo, accion, uuid=null){    
    var form = "#form" + seccionName + " ";
    //ocultar/mostrar formularios
    $(modulo + ".formPrincipal").addClass("animated fadeOut").addClass("hide");                      
    $(modulo + ".formSecundario").removeClass("hide").addClass("animated fadeIn");    
    $(form + ".titulo-seccion").text(accion + " REGISTRO");

    if (accion=="EDITAR"){
        $(form + ".btnAgregar").data("uuid", uuid);
        $(form + ".btnAgregar").html('<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check" viewBox="0 0 16 16"><path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z"/></svg> Actualizar');
    }
    else{
        $(form + ".btnAgregar").data("uuid", "");
        $(form + ".btnAgregar").html('<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check" viewBox="0 0 16 16"><path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z"/></svg> Agregar');
    }

    //catalogos que se usan en el modulo.
    loadCat(tipoOperacion, form + ".CBOtipoOperacion");
    loadCat(tipoFideicomiso, form + ".CBOtipoFideicomiso");
    loadCat(tipoRelacion, form + ".CBOtipoRelacion");
    loadCat(tipoParticipacionFideicomiso, form + ".CBOtipoParticipacionFideicomiso");
    loadCat(tipoPersona, form + ".CBOtipoPersona");
    loadCat(sector, form + ".CBOsector");

    $(form + ":input[type='text']").val("");

    $(form + '.CBOsector').on('change', function() {
        $(form + ".content_especifique_sector").addClass("hide");
        $(form + ".content_especifique_sector input[name='sector_especifique']").val($(form + '.CBOsector option:selected')[0].innerText);
        if(this.value == "OTRO"){
            $(form + ".content_especifique_sector").removeClass("hide");
            $(form + ".content_especifique_sector input[name='sector_especifique']").val("");
        }        
    });
    $(form + ".CBOsector").val("AGRI").trigger("change");

    if(jsonResult.captura.tipo_declaracion == "INICIAL"){
        $(form + "select[name='tipoOperacion']").val("AGREGAR").prop("disabled", true);
    }
    
    $("#form" + seccionName).validate().resetForm();

    $(form + ".btnCerrar").unbind("click");
    $(form + ".btnAgregar").unbind("click");

     //btn cerrar formulario.   
     $(form + ".btnCerrar").on('click',function() {
        $(modulo + ".formSecundario").addClass("hide");
        $(modulo + ".formPrincipal").removeClass("hide").addClass("animated fadeOut");
    }); 

    //btn agregar registro.
    $(form + ".btnAgregar").on('click',function() {
        if( $("#form" + seccionName).valid() ) {
            var uuidItem;
            if (accion=="EDITAR"){ uuidItem = uuid;}
            else{ uuidItem= generarUUID();}   
            window["guardarRegistro" + seccionName](uuidItem, seccionNo, seccionName, modulo);
            window["pintarTabla" + seccionName](seccionNo, seccionName);
            //ocultar/mostrar formularos.
            $(modulo + ".formSecundario").addClass("hide");
            $(modulo + ".formPrincipal").removeClass("hide").addClass("animated fadeOut"); 
            $(modulo + ".btnTerminar").removeClass("hide");
            goTop();   
        }       
    });
}

//guardar registro en el JsonResult.
window.guardarRegistroFideicomisos = function guardarRegistroFideicomisos(uuidItem, seccionNo, seccionName, modulo){    
    var form="#form" + seccionName;
    jsonResult.declaracion.interes.fideicomisos.ninguno=false;
    jsonResult.declaracion.interes.fideicomisos.aclaracionesObservaciones =  $(modulo + " textarea[name='aclaracionesObservaciones']").val().toUpperCase();
    jsonResult.declaracion.interes.fideicomisos.fideicomiso[uuidItem] =
    {
        "uuid": uuidItem,
        "tipoOperacion":    $(form  + " select[name='tipoOperacion'] option:selected").val(),
        "tipoRelacion":  $(form  + " select[name='tipoRelacion'] option:selected").val(),
        "tipoFideicomiso": $(form  + " select[name='tipoFideicomiso'] option:selected").val(),
        "tipoParticipacion": $(form  + " select[name='tipoParticipacion'] option:selected").val(),
        "rfcFideicomiso": $(form  + " input[name='rfcFideicomiso']").val(),
        "fideicomitente": {
          "tipoPersona":  $(form  + " select[name='fideicomitente_tipoPersona'] option:selected").val(),
          "nombreRazonSocial": $(form  + " input[name='fideicomitente_nombreRazonSocial']").val(),
          "rfc": $(form  + " input[name='fideicomitente_rfc']").val(),
        },
        "fiduciario": {
          "nombreRazonSocial": $(form  + " input[name='fiduciario_nombreRazonSocial']").val(),
          "rfc":  $(form  + " input[name='fiduciario_rfc']").val(),
        },
        "fideicomisario": {
          "tipoPersona":  $(form  + " select[name='fideicomisario_tipoPersona'] option:selected").val(),
          "nombreRazonSocial": $(form  + " input[name='fideicomisario_nombreRazonSocial']").val(),
          "rfc": $(form  + " input[name='fideicomisario_rfc']").val(),
        },
        "sector": {
          "clave": $(form  + " select[name='sector']").val(),
          "valor": $(form  + " input[name='sector_especifique']").val(),
        },
        "extranjero": $(form  + " select[name='extranjero'] option:selected").val(),
      };

    //cambiar status a captura.
    jsonResult.captura.declaracion.interes.secciones[seccionNo].status= "EN_PROCESO";
    $(".status-seccion-" + jsonResult.captura.declaracion.interes.secciones[seccionNo].apartado + "-" + seccionNo).removeClass("indicador-status indicador-status-success").addClass("indicador-status-process").text("EN PROCESO");
}

//pintar tabla html.
window.pintarTablaFideicomisos = function pintarTablaFideicomisos(seccionNo, seccionName){
    let html="";
    let lista = jsonResult.declaracion.interes.fideicomisos.fideicomiso;
    Object.keys(lista).forEach(function (row) {
        var params = { uuid: lista[row].uuid, seccionNo: seccionNo, seccionName: seccionName };
        html+="<tr id='" + lista[row].uuid + "'>";
        html+=" <td>" + lista[row].fideicomitente.nombreRazonSocial +"</td>";
        html+=" <td>" + lista[row].fideicomitente.rfc +"</td>";
        html+=" <td class='text-right'>";
        html+="     <button class='btn btn-sm btn-warning btnEditar' onclick='editarFideicomisos(\"" + btoa(JSON.stringify(params)) + "\");'>Editar</button>";
        html+="     <button class='btn btn-sm btn-danger btnEliminar' onclick='eliminarFideicomisos(\"" + btoa(JSON.stringify(params)) + "\");'>Eliminar</button>";              
        html+=" </td>";
        html+="</tr>";
    });
    $(".tbl" + seccionName + " tbody").empty().append(html);
}

window.editarFideicomisos = function editarFideicomisos(data){
    var item = JSON.parse(atob(data));
    var modulo = "#modulo" + item.seccionName  + " ";
    window["funcionalidadGuardarRegistro" + item.seccionName](item.seccionNo, item.seccionName, modulo, "EDITAR", item.uuid);
    //cargar información del row seleccionado para editar.
    var nodo = jsonResult.declaracion.interes.fideicomisos.fideicomiso[item.uuid];

    $("#form" + item.seccionName + " select[name='tipoOperacion']").val(nodo.tipoOperacion);
    $("#form" + item.seccionName + " select[name='tipoRelacion']").val(nodo.tipoRelacion);
    $("#form" + item.seccionName + " select[name='tipoFideicomiso']").val(nodo.tipoFideicomiso);
    $("#form" + item.seccionName + " select[name='tipoParticipacion']").val(nodo.tipoParticipacion);
    $("#form" + item.seccionName + " input[name='rfcFideicomiso']").val(nodo.rfcFideicomiso);

    $("#form" + item.seccionName + " select[name='fideicomitente_tipoPersona']").val(nodo.fideicomitente.tipoPersona);
    $("#form" + item.seccionName + " input[name='fideicomitente_nombreRazonSocial']").val(nodo.fideicomitente.nombreRazonSocial);
    $("#form" + item.seccionName + " input[name='fideicomitente_rfc']").val(nodo.fideicomitente.rfc);

    $("#form" + item.seccionName + " input[name='fiduciario_nombreRazonSocial']").val(nodo.fiduciario.nombreRazonSocial);
    $("#form" + item.seccionName + " input[name='fiduciario_rfc']").val(nodo.fiduciario.rfc);

    $("#form" + item.seccionName + " select[name='fideicomisario_tipoPersona']").val(nodo.fideicomisario.tipoPersona);
    $("#form" + item.seccionName + " input[name='fideicomisario_nombreRazonSocial']").val(nodo.fideicomisario.nombreRazonSocial);
    $("#form" + item.seccionName + " input[name='fideicomisario_rfc']").val(nodo.fideicomisario.rfc);

    $("#form" + item.seccionName + " select[name='sector']").val(nodo.sector.clave); 
    $("#form" + item.seccionName + " input[name='sector_especifique']").val(nodo.sector.valor);
    $("#form" + item.seccionName + " select[name='extranjero']").val(nodo.extranjero);
}      

window.eliminarFideicomisos = function eliminarFideicomisos(data){
    var item = JSON.parse(atob(data));
    //elimina item en object json y tabla.
    delete jsonResult.declaracion.interes.fideicomisos.fideicomiso[item.uuid];
    $("#" + item.uuid).remove();
    if (Object.keys(jsonResult.declaracion.interes.fideicomisos.fideicomiso).length==0){
        $("#modulo" + item.seccionName + " .btnTerminar").addClass("hide");
    }
}
