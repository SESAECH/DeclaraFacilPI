window.initApoyosPublicos = function initApoyosPublicos(data){
    var seccion = JSON.parse(atob(data));
    var seccionName = seccion.moduloName.replace("modulo","");
    var form = "#form" + seccion.moduloName.replace("modulo", "")+ " ";
    var modulo = "#" + seccion.moduloName + " ";

    //validar status de la sección.
    switch(seccion.status){
        case "SIN_INFO":
            //asginar valores predeterminados a catálogos(ayuda al usuario).
            jsonResult.declaracion.interes.apoyos.ninguno=true;
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
            if (Object.keys(jsonResult.declaracion.interes.apoyos.apoyo).length > 0){
                $(modulo + ".btnAgregar").removeClass("hide");
            }
            else{
                $(modulo + ".btnAgregar").addClass("hide");
            }                     

            break;
        case "TERMINADO":
            window["pintarTabla" + seccionName](seccion.no, seccionName);
            if (jsonResult.declaracion.interes.apoyos.ninguno){
                $(modulo + ".chkNinguno")[0].checked=true;
                $(modulo + ".chkNinguno").prop("disabled", true);
            }
            $(modulo + "textarea[name='aclaracionesObservaciones']").val(jsonResult.declaracion.interes.apoyos.aclaracionesObservaciones).prop("disabled", true);
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
        jsonResult.declaracion.interes.apoyos.aclaracionesObservaciones =  $(modulo + "textarea[name='aclaracionesObservaciones']").val().toUpperCase();
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

window.funcionalidadGuardarRegistroApoyosPublicos = function funcionalidadGuardarRegistroApoyosPublicos(seccionNo, seccionName, modulo, accion, uuid=null){    
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
    loadCat(tipoPersona, form + ".CBOtipoPersona");
    loadCat(beneficiariosPrograma, form + ".CBObeneficiarioPrograma");
    loadCat(nivelOrdenGobierno, form + ".CBOnivelOrdenGobierno");
    loadCat(tipoApoyo, form + ".CBOtipoApoyo");
    loadCat(formaRecepcion, form + ".CBOformaRecepcion");
    loadCat(entidadFederativa, form + ".CBOentidadFederativa"); 
    loadCat(moneda, form + ".CBOmoneda");

    $(form + ":input[type='text']").val("");

    $(form + ".CBObeneficiarioPrograma").val("DC").trigger("change");    
    $(form + ".CBOtipoApoyo").val("SUB").trigger("change");    
    $(form + ".content_beneficiarioPrograma_especifique input[name='beneficiarioPrograma_especifique']").val($(form + '.CBObeneficiarioPrograma option:selected')[0].innerText);
    $(form + ".content_tipoApoyo_especifique input[name='tipoApoyo_especifique']").val($(form + '.CBOtipoApoyo option:selected')[0].innerText);

    $(form + '.CBObeneficiarioPrograma').on('change', function() {
        $(form + ".content_beneficiarioPrograma_especifique").addClass("hide");
        $(form + ".content_beneficiarioPrograma_especifique input[name='beneficiarioPrograma_especifique']").val($(form + '.CBObeneficiarioPrograma option:selected')[0].innerText);
        if(this.value == "OTRO"){
            $(form + ".content_beneficiarioPrograma_especifique").removeClass("hide");
            $(form + ".content_beneficiarioPrograma_especifique input[name='beneficiarioPrograma_especifique']").val("");
        }        
    });

    $(form + '.CBOtipoApoyo').on('change', function() {
        $(form + ".content_tipoApoyo_especifique").addClass("hide");
        $(form + ".content_tipoApoyo_especifique input[name='tipoApoyo_especifique']").val($(form + '.CBOtipoApoyo option:selected')[0].innerText);
        if(this.value == "OTRO"){
            $(form + ".content_tipoApoyo_especifique").removeClass("hide");
            $(form + ".content_tipoApoyo_especifique input[name='tipoApoyo_especifique']").val("");
        }        
    });

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
window.guardarRegistroApoyosPublicos = function guardarRegistroApoyosPublicos(uuidItem, seccionNo, seccionName, modulo){    
    var form="#form" + seccionName;
    jsonResult.declaracion.interes.apoyos.ninguno=false;
    jsonResult.declaracion.interes.apoyos.aclaracionesObservaciones =  $(modulo + " textarea[name='aclaracionesObservaciones']").val();
    jsonResult.declaracion.interes.apoyos.apoyo[uuidItem] =
    {
        "uuid": uuidItem,
        "tipoOperacion":$(form  + " select[name='tipoOperacion'] option:selected").val(),
        "tipoPersona":  $(form  + " select[name='tipoPersona'] option:selected").val(),
        "beneficiarioPrograma": {
          "clave":  $(form  + " select[name='beneficiarioPrograma'] option:selected").val(),
          "valor": $(form  + " input[name='beneficiarioPrograma_especifique']").val(),
        },
        "nombrePrograma": $(form  + " input[name='nombrePrograma']").val(),
        "institucionOtorgante": $(form  + " input[name='institucionOtorgante']").val(),
        "nivelOrdenGobierno":  $(form  + " select[name='nivelOrdenGobierno'] option:selected").val(),
        "tipoApoyo": {
          "clave": $(form  + " select[name='tipoApoyo'] option:selected").val(),
          "valor": $(form  + " input[name='tipoApoyo_especifique']").val(),
        },
        "formaRecepcion": $(form  + " select[name='formaRecepcion'] option:selected").val(),
        "montoApoyoMensual": {
          "valor":  parseInt($(form  + " input[name='montoApoyoMensual']").val()),
          "moneda": $(form  + " select[name='moneda'] option:selected").val(),
        },
        "especifiqueApoyo": $(form  + " input[name='especifiqueApoyo']").val(),
      }

    //cambiar status a captura.
    jsonResult.captura.declaracion.interes.secciones[seccionNo].status= "EN_PROCESO";
    $(".status-seccion-" + jsonResult.captura.declaracion.interes.secciones[seccionNo].apartado + "-" + seccionNo).removeClass("indicador-status indicador-status-success").addClass("indicador-status-process").text("EN PROCESO");
}

//pintar tabla html.
window.pintarTablaApoyosPublicos = function pintarTablaApoyosPublicos(seccionNo, seccionName){
    let html="";
    let lista = jsonResult.declaracion.interes.apoyos.apoyo;
    Object.keys(lista).forEach(function (row) {
        var params = { uuid: lista[row].uuid, seccionNo: seccionNo, seccionName: seccionName };
        html+="<tr id='" + lista[row].uuid + "'>";
        html+=" <td>" + lista[row].nombrePrograma +"</td>";
        html+=" <td>" + lista[row].institucionOtorgante +"</td>";
        html+=" <td class='text-right'>";
        html+="     <button class='btn btn-sm btn-warning btnEditar' onclick='editarApoyosPublicos(\"" + btoa(JSON.stringify(params)) + "\");'>Editar</button>";
        html+="     <button class='btn btn-sm btn-danger btnEliminar' onclick='eliminarApoyosPublicos(\"" + btoa(JSON.stringify(params)) + "\");'>Eliminar</button>";              
        html+=" </td>";
        html+="</tr>";
    });
    $(".tbl" + seccionName + " tbody").empty().append(html);
}

window.editarApoyosPublicos = function editarApoyosPublicos(data){
    var item = JSON.parse(atob(data));
    var modulo = "#modulo" + item.seccionName  + " ";
    window["funcionalidadGuardarRegistro" + item.seccionName](item.seccionNo, item.seccionName, modulo, "EDITAR", item.uuid);
    //cargar información del row seleccionado para editar.
    var nodo = jsonResult.declaracion.interes.apoyos.apoyo[item.uuid];

    $("#form" + item.seccionName + " select[name='tipoOperacion']").val(nodo.tipoOperacion);
    $("#form" + item.seccionName + " select[name='tipoPersona']").val(nodo.tipoPersona);
    $("#form" + item.seccionName + " select[name='beneficiarioPrograma']").val(nodo.beneficiarioPrograma.clave).trigger("change");
    $("#form" + item.seccionName + " input[name='beneficiarioPrograma_especifique']").val(nodo.beneficiarioPrograma.valor);
    $("#form" + item.seccionName + " input[name='nombrePrograma']").val(nodo.nombrePrograma);
    $("#form" + item.seccionName + " input[name='institucionOtorgante']").val(nodo.institucionOtorgante);
    $("#form" + item.seccionName + " select[name='nivelOrdenGobierno']").val(nodo.nivelOrdenGobierno);
    $("#form" + item.seccionName + " select[name='tipoApoyo']").val(nodo.tipoApoyo.clave).trigger("change");
    $("#form" + item.seccionName + " input[name='tipoApoyo_especifique']").val(nodo.tipoApoyo.valor)
    $("#form" + item.seccionName + " input[name='especifique']").val(nodo.especifiqueApoyo);
    $("#form" + item.seccionName + " select[name='formaRecepcion']").val(nodo.formaRecepcion);
    $("#form" + item.seccionName + " input[name='montoApoyoMensual']").val(nodo.montoApoyoMensual.valor);
    $("#form" + item.seccionName + " select[name='moneda']").val(nodo.montoApoyoMensual.moneda);
    $("#form" + item.seccionName + " input[name='especifiqueApoyo']").val(nodo.especifiqueApoyo);
}

window.eliminarApoyosPublicos = function eliminarApoyosPublicos(data){
    var item = JSON.parse(atob(data));
    //elimina item en object json y tabla.
    delete jsonResult.declaracion.interes.apoyos.apoyo[item.uuid];
    $("#" + item.uuid).remove();
    if (Object.keys(jsonResult.declaracion.interes.apoyos.apoyo).length==0){
        $("#modulo" + item.seccionName + " .btnTerminar").addClass("hide");
    }
}
