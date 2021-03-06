
window.initParticipacionEmpresas = function initParticipacionEmpresas(data){
    var seccion = JSON.parse(atob(data));
    var seccionName = seccion.moduloName.replace("modulo","");
    var form = "#form" + seccion.moduloName.replace("modulo", "")+ " ";
    var modulo = "#" + seccion.moduloName + " ";

    //validar status de la sección.
    switch(seccion.status){
        case "SIN_INFO":
            //asginar valores predeterminados a catálogos(ayuda al usuario).
            jsonResult.declaracion.interes.participacion.ninguno=true;
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
            if (jsonResult.declaracion.interes.participacion.ninguno){
                $(modulo + ".chkNinguno")[0].checked=true;                
            }
            $(modulo + ".btnAgregar").removeClass("hide");
            $(modulo + ".btnHabilitar").addClass("hide");
            $(modulo + ".btnTerminar").removeClass("hide");
            if (Object.keys(jsonResult.declaracion.interes.participacion.participacion).length > 0){
                $(modulo + ".btnAgregar").removeClass("hide");
            }
            else{
                $(modulo + ".btnAgregar").addClass("hide");
            }                     

            break;
        case "TERMINADO":
            window["pintarTabla" + seccionName](seccion.no, seccionName);
            $(modulo + ".chkNinguno").prop("disabled", true);
            if (jsonResult.declaracion.interes.participacion.ninguno){
                $(modulo + ".chkNinguno")[0].checked=true;         
            }
            $(modulo + "textarea[name='aclaracionesObservaciones']").val(jsonResult.declaracion.interes.participacion.aclaracionesObservaciones).prop("disabled", true);
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
        jsonResult.declaracion.interes.participacion.aclaracionesObservaciones =  $(modulo + "textarea[name='aclaracionesObservaciones']").val().toUpperCase();
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
        $(".status-seccion-" + seccion.apartado +"-" + seccion.no).removeClass("indicador-status indicador-status-process").addClass("indicador-status-success").text("TERMINADO");
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

//funcionalidad en boton agregar/actualizar registro.
window.funcionalidadGuardarRegistroParticipacionEmpresas = function funcionalidadGuardarRegistroParticipacionEmpresas(seccionNo, seccionName, modulo, accion, uuid=null){    
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
    loadCat(tipoRelacion, form + ".CBOtipoRelacion");
    loadCat(tipoParticipacion, form + ".CBOtipoParticipacion");
    loadCat(paises, form + ".CBOpais");
    loadCat(entidadFederativa, form + ".CBOentidadFederativa"); 
    loadCat(sector, form + ".CBOsector");
    loadCat(moneda, form + ".CBOmoneda");

    //$(form + ":input[type='text']").val("");
    $(form).trigger("reset");
    $(form + ".CBOpais").val("MX").trigger("change");
    $(form + ".content_entidadFederativa").removeClass("hide");
    $(form + ".CBOtipoParticipacion").val("SCIO").trigger("change");
    $(form + ".CBOsector").val("AGRI").trigger("change");
    

    $(form + '.CBOpais').on('change', function() {
        $(form + ".content_entidadFederativa").removeClass("hide");
        if(this.value != "MX"){
            $(form + ".content_entidadFederativa").addClass("hide");
        }        
    });
    $(form + '.CBOtipoParticipacion').on('change', function() {
        $(form + ".content_especifique_tipoParticipacion").addClass("hide");
        $(form + ".content_especifique_tipoParticipacion input[name='tipoParticipacion_especifique']").val($(form + '.CBOtipoParticipacion option:selected')[0].innerText);
        if(this.value == "OTRO"){
            $(form + ".content_especifique_tipoParticipacion").removeClass("hide");
            $(form + ".content_especifique_tipoParticipacion input[name='tipoParticipacion_especifique']").val("");
        }        
    });
    $(form + '.CBOsector').on('change', function() {
        $(form + ".content_especifique_sector").addClass("hide");
        $(form + ".content_especifique_sector input[name='sector_especifique']").val($(form + '.CBOsector option:selected')[0].innerText);
        if(this.value == "OTRO"){
            $(form + ".content_especifique_sector").removeClass("hide");
            $(form + ".content_especifique_sector input[name='sector_especifique']").val("");
        }        
    });

    $(form + '.CBOrecibeRemuneracion').on('change', function() {
        if (this.value == "false"){ $(form + "input[name='montoMensual']").val("0").prop("disabled", true); }
        else{ $(form + "input[name='montoMensual']").val("").prop("disabled", false); }             
    });

    $(form + '.CBOrecibeRemuneracion').val("false").trigger("change");

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

            var validacion=true;
            if ($("#form" + seccionName  + " select[name='recibeRemuneracion'] option:selected").val()=="true"){
                if (parseInt($("#form" + seccionName  + " input[name='montoMensual']").val())<1){
                    validacion=false;
                    mensajeSwal("Aviso", "Ingrese un monto mayor a 0.", "error");
                }
            }
            if (validacion){
                window["guardarRegistro" + seccionName](uuidItem, seccionNo, seccionName, modulo);
                window["pintarTabla" + seccionName](seccionNo, seccionName);
                //ocultar/mostrar formularos.
                $(modulo + ".formSecundario").addClass("hide");
                $(modulo + ".formPrincipal").removeClass("hide").addClass("animated fadeOut"); 
                $(modulo + ".btnTerminar").removeClass("hide");
                goTop();  
            } 
        }       
    });
}

//guardar registro en el JsonResult.
window.guardarRegistroParticipacionEmpresas = function guardarRegistroParticipacionEmpresas(uuidItem, seccionNo, seccionName, modulo){    
    var form="#form" + seccionName;
    jsonResult.declaracion.interes.participacion.ninguno=false;
    jsonResult.declaracion.interes.participacion.aclaracionesObservaciones =  $(modulo + " textarea[name='aclaracionesObservaciones']").val().toUpperCase();
    jsonResult.declaracion.interes.participacion.participacion[uuidItem] =
    {
        "uuid": uuidItem,
        "tipoOperacion": $(form  + " select[name='tipoOperacion'] option:selected").val(),
        "tipoRelacion": $(form  + " select[name='tipoRelacion'] option:selected").val(),
        "nombreEmpresaSociedadAsociacion": $(form  + " input[name='nombreEmpresaSociedadAsociacion']").val().toUpperCase(),
        "rfc": $(form + " input[name='rfc']").val().toUpperCase(),
        "porcentajeParticipacion": $(form  + " input[name='porcentajeParticipacion']").val(),
        "tipoParticipacion": {
          "clave": $(form  + " select[name='tipoParticipacion'] option:selected").val(),
          "valor": $(form  + " input[name='tipoParticipacion_especifique']").val(),
        },
        "recibeRemuneracion": $(form  + " select[name='recibeRemuneracion']").val() =="true" ? true: false,
        "montoMensual": {
          "valor":  parseInt($(form  + " input[name='montoMensual']").val()),
          "moneda": $(form  + " select[name='moneda'] option:selected").val(),
        },
        "ubicacion": {
          "pais": $(form  + " select[name='pais'] option:selected").val(),
          "entidadFederativa": {
            "clave": $(form  + " select[name='entidadFederativa'] option:selected").val(),
            "valor": $(form  + " select[name='entidadFederativa'] option:selected")[0].innerText,
          }
        },
        "sector": {
          "clave": $(form  + " select[name='sector'] option:selected").val(),
          "valor": $(form  + " input[name='sector_especifique']").val(),
        }
      };

    //cambiar status a captura.
    jsonResult.captura.declaracion.interes.secciones[seccionNo].status= "EN_PROCESO";
    $(".status-seccion-" + jsonResult.captura.declaracion.interes.secciones[seccionNo].apartado + "-" + seccionNo).removeClass("indicador-status indicador-status-success").addClass("indicador-status-process").text("EN PROCESO");
}

//pintar tabla html.
window.pintarTablaParticipacionEmpresas = function pintarTablaParticipacionEmpresas(seccionNo, seccionName){
    let html="";
    let lista = jsonResult.declaracion.interes.participacion.participacion;
    Object.keys(lista).forEach(function (row) {
        var params = { uuid: lista[row].uuid, seccionNo: seccionNo, seccionName: seccionName };
        html+="<tr id='" + lista[row].uuid + "'>";
        html+=" <td>" + lista[row].nombreEmpresaSociedadAsociacion +"</td>";
        html+=" <td>" + lista[row].rfc +"</td>";
        html+=" <td class='text-right'>" + lista[row].porcentajeParticipacion +"%</td>";
        html+=" <td class='text-right'>";
        html+="     <button class='btn btn-sm btn-warning btnEditar' onclick='editarParticipacionEmpresas(\"" + btoa(JSON.stringify(params)) + "\");'>Editar</button>";
        html+="     <button class='btn btn-sm btn-danger btnEliminar' onclick='eliminarParticipacionEmpresas(\"" + btoa(JSON.stringify(params)) + "\");'>Eliminar</button>";              
        html+=" </td>";
        html+="</tr>";
    });
    $(".tbl" + seccionName + " tbody").empty().append(html);
}

window.editarParticipacionEmpresas = function editarParticipacionEmpresas(data){
    var item = JSON.parse(atob(data));
    var modulo = "#modulo" + item.seccionName  + " ";
    window["funcionalidadGuardarRegistro" + item.seccionName](item.seccionNo, item.seccionName, modulo, "EDITAR", item.uuid);
    //cargar información del row seleccionado para editar.
    var nodo = jsonResult.declaracion.interes.participacion.participacion[item.uuid];

    $("#form" + item.seccionName + " select[name='tipoOperacion']").val(nodo.tipoOperacion);
    $("#form" + item.seccionName + " select[name='tipoRelacion']").val(nodo.tipoRelacion);
    $("#form" + item.seccionName + " input[name='nombreEmpresaSociedadAsociacion']").val(nodo.nombreEmpresaSociedadAsociacion);
    $("#form" + item.seccionName + " input[name='rfc']").val(nodo.rfc);
    $("#form" + item.seccionName + " input[name='porcentajeParticipacion']").val(nodo.porcentajeParticipacion);
    $("#form" + item.seccionName + " select[name='tipoParticipacion']").val(nodo.tipoParticipacion.clave).trigger("change");
    $("#form" + item.seccionName + " input[name='tipoParticipacion_especifique']").val(nodo.tipoParticipacion.valor);
    $("#form" + item.seccionName + " select[name='recibeRemuneracion']").val(nodo.recibeRemuneracion.toString()).trigger("change");
    $("#form" + item.seccionName + " input[name='montoMensual']").val(nodo.montoMensual.valor);
    $("#form" + item.seccionName + " select[name='moneda']").val(nodo.montoMensual.moneda);
    $("#form" + item.seccionName + " select[name='pais']").val(nodo.ubicacion.pais).trigger("change");
    $("#form" + item.seccionName + " select[name='entidadFederativa']").val(nodo.ubicacion.entidadFederativa.clave);
    $("#form" + item.seccionName + " select[name='sector']").val(nodo.sector.clave).trigger("change");
    $("#form" + item.seccionName + " input[name='sector_especifique']").val(nodo.sector.valor)
}

window.eliminarParticipacionEmpresas = function eliminarParticipacionEmpresas(data){
    var item = JSON.parse(atob(data));
    //elimina item en object json y tabla.
    delete jsonResult.declaracion.interes.participacion.participacion[item.uuid];
    $("#" + item.uuid).remove();
    if (Object.keys(jsonResult.declaracion.interes.participacion.participacion).length==0){
        $("#modulo" + item.seccionName + " .btnTerminar").addClass("hide");
    }
}
