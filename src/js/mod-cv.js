var formCV = '<form action="" id="formCV">\
<h5 class="titulo-seccion"></h5>\
<div class="row p10">\
    <div class="col-lg-6">\
        <div class="form-group">\
            <label>TIPO DE OPERACIÓN</label>\
            <select name="tipoOperacion" class="form-control CBOtipoOperacion"></select>\
        </div>\
    </div>\
    <div class="col-lg-6">\
        <div class="form-group">\
            <label>NIVEL</label>\
            <select name="nivel" class="form-control CBOnivel"></select>\
        </div>\
    </div> \
    <div class="col-lg-8">\
        <div class="form-group">\
            <label>NOMBRE</label>\
            <input type="text" name="nombre" class="form-control" required>\
        </div>\
    </div>\
    <div class="col-lg-4">\
        <div class="form-group">\
            <label>UBICACIÓN</label>\
            <select name="ubicacion" class="form-control CBOubicacion"></select>\
        </div>\
    </div>\
    <div class="col-lg-8">\
        <div class="form-group">\
            <label>CARRERA O ÁREA DE CONOCIMIENTO</label>\
            <input type="text" name="carreraAreaConocimiento" class="form-control" required>\
        </div>\
    </div>\
    <div class="col-lg-4">\
        <div class="form-group">\
            <label>ESTATUS</label>\
            <select name="estatus" class="form-control CBOestatus"></select>\
        </div>\
    </div>\
    <div class="col-lg-4">\
        <div class="form-group">\
            <label>DOCUMENTO OBTENIDO</label>\
            <select name="documentoObtenido" class="form-control CBOdocumentoObtenido"></select>\
        </div>\
    </div>\
    <div class="col-lg-4">\
        <div class="form-group">\
            <label>FECHA DE OBTENCIÓN DEL DOCUMENTO</label>\
            <input type="date" name="fechaObtencion" class="form-control" required>\
        </div>\
    </div>\
</div>\
<div class="row p10">\
    <div class="col-lg-12 text-right">\
        <button type="button" class="btn btn-light btnAgregar">\
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check" viewBox="0 0 16 16">\
                <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z"/>\
            </svg>\
            Agregar\
        </button>\
        <button type="button" class="btn btn-secondary btnCerrar" data-uuid="">\
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x" viewBox="0 0 16 16">\
                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>\
            </svg>\
            Cerrar\
        </button>\
    </div>\
</div>\
</form>';
window.formCV = formCV;


function initCV(data){
    var seccion = JSON.parse(atob(data));
    var seccionName = seccion.moduloName.replace("modulo","");
    var form = "#form" + seccion.moduloName.replace("modulo", "")+ " ";
    var modulo = "#" + seccion.moduloName + " ";

    //validar status de la sección.
    switch(seccion.status){
        case "SIN_INFO": 
            //asginar valores predeterminados a catálogos(ayuda al usuario).          
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
            if (Object.keys(jsonResult.declaracion.situacionPatrimonial.datosCurricularesDeclarante.escolaridad).length > 0){
                $(modulo + ".btnTerminar").removeClass("hide");
            }
            else{
                $(modulo + ".btnTerminar").addClass("hide");
            }        
            break;
        case "TERMINADO":
            window["pintarTabla" + seccionName](seccion.no, seccionName);
            $(modulo + "textarea[name='aclaracionesObservaciones']").val(jsonResult.declaracion.situacionPatrimonial.datosCurricularesDeclarante.aclaracionesObservaciones).prop("disabled", true);
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
        funcionalidadGuardarRegistroCV(seccion.no, seccionName, modulo, "NUEVO");
    });

    $(modulo + ".btnTerminar").on('click',function() {
        jsonResult.declaracion.situacionPatrimonial.datosCurricularesDeclarante.aclaracionesObservaciones =  $(modulo + "textarea[name='aclaracionesObservaciones']").val();
        $(modulo + "textarea[name='aclaracionesObservaciones']").prop("disabled", true);
        //inhabilitar controles del modulo.
        $(modulo + ".btnTerminar").addClass("hide");
        $(modulo + ".btnAgregar").addClass("hide");
        $(modulo + ".btnEditar").addClass("hide");
        $(modulo + ".btnEliminar").addClass("hide");
        //cambiar status.
        $(modulo + ".btnHabilitar").removeClass("hide");
        captura.declaracion[seccion.apartado].secciones[seccion.no].status= "TERMINADO";
        $(".status-seccion-patrimonial-" + seccion.no).removeClass("indicador-status indicador-status-process").addClass("indicador-status-success").text("TERMINADO");
    });
    
    $(modulo + ".btnHabilitar").on("click",function() {  
        $(modulo + ".btnTerminar").removeClass("hide");
        $(modulo + ".btnAgregar").removeClass("hide");
        $(modulo + ".btnEditar").removeClass("hide");
        $(modulo + ".btnEliminar").removeClass("hide");
        $(modulo + "textarea[name='aclaracionesObservaciones']").prop("disabled", false);
        $(modulo + ".btnHabilitar").addClass("hide");
        captura.declaracion[seccion.apartado].secciones[seccion.no].status= "EN_PROCESO";
        $(".status-seccion-patrimonial-" + seccion.no).removeClass("indicador-status indicador-status-success").addClass("indicador-status-process").text("EN PROCESO");
    });

    $(".content_seccion").addClass("hide");
    $("#" + seccion.moduloName).removeClass("hide");
}
window.initCV = initCV;

function pintarTablaCV(seccionNo, seccionName){
    var html="";
    const lista = jsonResult.declaracion.situacionPatrimonial.datosCurricularesDeclarante.escolaridad;//.sort((a, b) => b.fechaObtencion - a.fechaObtencion);
    Object.keys(lista.sort((a, b) => b.fechaObtencion - a.fechaObtencion)).forEach(function (row) {
        var params = { uuid: lista[row].uuid, seccionNo: seccionNo, seccionName: seccionName };
        html+="<tr id='" + lista[row].uuid + "'>";
        html+=" <td>" + lista[row].fechaObtencion +"</td>";
        html+=" <td>" + lista[row].nivel.valor +"</td>";
        html+=" <td>" + lista[row].institucionEducativa.nombre +"</td>";
        html+=" <td>" + lista[row].documentoObtenido +"</td>";
        html+=" <td class='text-right'>";
        html+="     <button class='btn btn-sm btn-warning btnEditar' onclick='editarCV(\"" + btoa(JSON.stringify(params)) + "\");'>Editar</button>";
        html+="     <button class='btn btn-sm btn-danger btnEliminar' onclick='eliminarCV(\"" + btoa(JSON.stringify(params)) + "\");'>Eliminar</button>";              
        html+=" </td>";
        html+="</tr>";
    });
    $(".tbl" + seccionName + " tbody").empty().append(html);
}
window.pintarTabla = pintarTabla;

function editarCV(data){
    var item = JSON.parse(atob(data));
    var modulo = "#modulo" + item.seccionName  + " ";
    funcionalidadGuardarRegistroCV(item.seccionNo, item.seccionName, modulo, "EDITAR", item.uuid);
    //cargar información del row seleccionado para editar.
    var nodo = jsonResult.declaracion.situacionPatrimonial.datosCurricularesDeclarante.escolaridad[item.uuid];
    $("#form" + item.seccionName + " select[name='tipoOperacion']").val(nodo.tipoOperacion);
    $("#form" + item.seccionName + " select[name='nivel']").val(nodo.nivel.clave);
    $("#form" + item.seccionName + " input[name='nombre']").val(nodo.institucionEducativa.nombre);
    $("#form" + item.seccionName + " select[name='ubicacion']").val(nodo.institucionEducativa.ubicacion);
    $("#form" + item.seccionName + " input[name='carreraAreaConocimiento']").val(nodo.carreraAreaConocimiento);
    $("#form" + item.seccionName + " select[name='estatus']").val(nodo.estatus);
    $("#form" + item.seccionName + " select[name='documentoObtenido']").val(nodo.documentoObtenido);
    $("#form" + item.seccionName + " input[name='fechaObtencion']").val(nodo.fechaObtencion);    
}
window.editarCV =editarCV;


function eliminarCV(data){
    var item = JSON.parse(atob(data));
    //elimina item en object json y tabla.
    delete jsonResult.declaracion.situacionPatrimonial.datosCurricularesDeclarante.escolaridad[item.uuid];
    $("#" + item.uuid).remove();
    if (Object.keys(jsonResult.declaracion.situacionPatrimonial.datosCurricularesDeclarante.escolaridad).length==0){
        $("#modulo" + item.seccionName + " .btnTerminar").addClass("hide");
    }
}
window.eliminarCV = eliminarCV;

function funcionalidadGuardarRegistroCV(seccionNo, seccionName, modulo, accion, uuid=null){
    var form = "#form" + seccionName + " ";
    //ocultar/mostrar formularios
    $(modulo + ".formPrincipal").addClass("animated fadeOut").addClass("hide");                      
    $(modulo + ".formSecundario").html(formCV).removeClass("hide").addClass("animated fadeIn");    
    $(form + ".titulo-seccion").text(accion + " REGISTRO");

    if (accion=="EDITAR"){
        $(form + ".btnAgregar").data("uuid", uuid);
        $(form + ".btnAgregar").html('<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check" viewBox="0 0 16 16"><path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z"/></svg> Actualizar');
    }
    //catalogos que se usan en el modulo.
    loadCat(tipoOperacion, form + ".CBOtipoOperacion");
    loadCat(nivel, form + ".CBOnivel");
    loadCat(extranjero, form + ".CBOubicacion");
    loadCat(estatus, form + ".CBOestatus"); 
    loadCat(documentoObtenido, form + ".CBOdocumentoObtenido");

    if(captura.tipo_declaracion == "INICIAL"){
        $(form + "select[name='tipoOperacion']").val("AGREGAR").prop("disabled", true);
    }

    $(form + ".btnCerrar").unbind("click");
    $(form + ".btnAgregar").unbind("click");

    //btn cerrar formulario.   
    $(form + ".btnCerrar").on('click',function() {
        $(modulo + ".formSecundario").html("").addClass("hide");
        $(modulo + ".formPrincipal").removeClass("hide").addClass("animated fadeOut");
    }); 

    //btn agregar registro.
    $(form + ".btnAgregar").on('click',function() {
        var uuidItem;
        if (accion=="EDITAR"){ uuidItem = uuid;}
        else{ uuidItem= generarUUID();}       
        guardarRegistroCV(uuidItem, seccionNo, seccionName, modulo);
        pintarTablaCV(seccionNo, seccionName);       
        //ocultar/mostrar formularos.
        $(modulo + ".formSecundario").html("").addClass("hide");
        $(modulo + ".formPrincipal").removeClass("hide").addClass("animated fadeOut"); 
        $(modulo + ".btnTerminar").removeClass("hide");
        goTop();          
    });
}
window.funcionalidadGuardarRegistroCV = funcionalidadGuardarRegistroCV;

//guaradr registro en el JsonResult.
function guardarRegistroCV(uuidItem, seccionNo, seccionName, modulo){
    var form="#form" + seccionName;
    jsonResult.declaracion.situacionPatrimonial.datosCurricularesDeclarante.aclaracionesObservaciones =  $(modulo + "textarea[name='aclaracionesObservaciones']").val();
    jsonResult.declaracion.situacionPatrimonial.datosCurricularesDeclarante.escolaridad[uuidItem] =
    {
        "uuid": uuidItem,
        "tipoOperacion": $(form + " select[name='tipoOperacion'] option:selected").val(),
        "nivel": {
          "clave": $(form + " select[name='nivel'] option:selected").val(),
          "valor": $(form + " select[name='nivel'] option:selected")[0].innerText,
        },
        "institucionEducativa": {
          "nombre": $(form + " input[name='nombre']").val().toUpperCase(),
          "ubicacion": $(form + " select[name='ubicacion'] option:selected").val()
        },
        "carreraAreaConocimiento": $(form + " input[name='carreraAreaConocimiento']").val().toUpperCase(),
        "estatus": $(form + " select[name='estatus'] option:selected").val(),
        "documentoObtenido": $(form + " select[name='documentoObtenido'] option:selected").val(),
        "fechaObtencion": $(form + " input[name='fechaObtencion']").val()
    };
    //cambiar status a captura.
    captura.declaracion.situacion_patrimonial.secciones[seccionNo].status= "EN_PROCESO";
    $(".status-seccion-patrimonial-" + seccionNo).removeClass("indicador-status, indicador-status-success").addClass("indicador-status-process").text("EN PROCESO");
}
window.guardarRegistroCV = guardarRegistroCV;
