window.initBeneficiosPrivados = function initBeneficiosPrivados(data){
    var seccion = JSON.parse(atob(data));
    var seccionName = seccion.moduloName.replace("modulo","");
    var form = "#form" + seccion.moduloName.replace("modulo", "")+ " ";
    var modulo = "#" + seccion.moduloName + " ";

    //validar status de la sección.
    switch(seccion.status){
        case "SIN_INFO":
            //asginar valores predeterminados a catálogos(ayuda al usuario).
            jsonResult.declaracion.interes.beneficiosPrivados.ninguno=true;
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
            if (jsonResult.declaracion.interes.beneficiosPrivados.ninguno){
                $(modulo + ".chkNinguno")[0].checked=true;                
            }
            $(modulo + ".btnAgregar").removeClass("hide");
            $(modulo + ".btnHabilitar").addClass("hide");
            $(modulo + ".btnTerminar").removeClass("hide");
            if (Object.keys(jsonResult.declaracion.interes.beneficiosPrivados.beneficio).length > 0){
                $(modulo + ".btnAgregar").removeClass("hide");
            }
            else{
                $(modulo + ".btnAgregar").addClass("hide");
            }                     

            break;
        case "TERMINADO":
            window["pintarTabla" + seccionName](seccion.no, seccionName);
            $(modulo + ".chkNinguno").prop("disabled", true);
            if (jsonResult.declaracion.interes.beneficiosPrivados.ninguno){
                $(modulo + ".chkNinguno")[0].checked=true;                
            }
            $(modulo + "textarea[name='aclaracionesObservaciones']").val(jsonResult.declaracion.interes.beneficiosPrivados.aclaracionesObservaciones).prop("disabled", true);
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
        jsonResult.declaracion.interes.beneficiosPrivados.aclaracionesObservaciones =  $(modulo + "textarea[name='aclaracionesObservaciones']").val().toUpperCase();
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

window.funcionalidadGuardarRegistroBeneficiosPrivados = function funcionalidadGuardarRegistroBeneficiosPrivados(seccionNo, seccionName, modulo, accion, uuid=null){    
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
    loadCat(tipoBeneficio, form + ".CBOtipoBeneficio");
    loadCat(beneficiariosPrograma, form + ".CBObeneficiario");
    loadCat(tipoPersona, form + ".CBOtipoPersona");
    loadCat(formaRecepcion, form + ".CBOformaRecepcion");
    loadCat(sector, form + ".CBOsector");
    loadCat(moneda, form + ".CBOmoneda");

    $(form + ":input[type='text']").val("");

    $(form + '.CBOtipoBeneficio').on('change', function() {
        $(form + ".content_especifique_tipoBeneficio").addClass("hide");
        $(form + ".content_especifique_tipoBeneficio input[name='tipoBeneficio_especifique']").val($(form + '.CBOtipoBeneficio option:selected')[0].innerText);
        if(this.value == "O"){
            $(form + ".content_especifique_tipoBeneficio").removeClass("hide");
            $(form + ".content_especifique_tipoBeneficio input[name='tipoBeneficio_especifique']").val("");
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
    
    $(form + ".CBOtipoBeneficio").val("S").trigger("change"); 
    $(form + ".CBOsector").val("AGRI").trigger("change"); 
    $(form + ".custom-control-input").prop("checked", false);

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
        let beneficiarios=[];
        $(".content_chk_beneficiarios .custom-control-input").each(function(index) {
            if (this.checked){beneficiarios.push({clave:this.dataset.clave, valor: this.dataset.valor});}            
        });
        if (beneficiarios.length==0){ mensajeSwal("Aviso", "Seleccione al menos 1 beneficiario.", "warning");}
        else{
            if( $("#form" + seccionName).valid()) {
                var uuidItem;
                if (accion=="EDITAR"){ uuidItem = uuid;}
                else{ uuidItem= generarUUID();}   
                window["guardarRegistro" + seccionName](uuidItem, seccionNo, seccionName, modulo, beneficiarios);
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
window.guardarRegistroBeneficiosPrivados = function guardarRegistroBeneficiosPrivados(uuidItem, seccionNo, seccionName, modulo, beneficiarios){    
    var form="#form" + seccionName;
    jsonResult.declaracion.interes.beneficiosPrivados.ninguno=false;
    jsonResult.declaracion.interes.beneficiosPrivados.aclaracionesObservaciones =  $(modulo + " textarea[name='aclaracionesObservaciones']").val();
    jsonResult.declaracion.interes.beneficiosPrivados.beneficio[uuidItem] =
    {
        "uuid": uuidItem,
        "tipoOperacion":    $(form  + " select[name='tipoOperacion'] option:selected").val(),
        "tipoPersona":      $(form  + " select[name='tipoPersona'] option:selected").val(),
        "tipoBeneficio": {
          "clave":          $(form  + " select[name='tipoBeneficio'] option:selected").val(),
          "valor":          $(form  + " select[name='tipoBeneficio'] option:selected")[0].innerText.toUpperCase(),
        },
        "beneficiario": beneficiarios,
        "otorgante": {
          "tipoPersona":        $(form  + " select[name='tipoPersona'] option:selected").val(),
          "nombreRazonSocial":  $(form  + " input[name='nombreRazonSocial']").val().toUpperCase(),
          "rfc":                $(form  + " input[name='rfc']").val().toUpperCase(),
        },
        "formaRecepcion":       $(form  + " select[name='formaRecepcion'] option:selected").val(),
        "especifiqueBeneficio": $(form  + " input[name='especifiqueBeneficio']").val().toUpperCase(),
        "montoMensualAproximado": {
          "valor":  parseInt($(form  + " input[name='montoMensualAproximado']").val()),
          "moneda": $(form  + " select[name='moneda'] option:selected").val(),
        },
        "sector": {
          "clave":  $(form  + " select[name='sector'] option:selected").val(),
          "valor": $(form  + " input[name='sector_especifique']").val().toUpperCase(),
        }
    };

    //cambiar status a captura.
    jsonResult.captura.declaracion.interes.secciones[seccionNo].status= "EN_PROCESO";
    $(".status-seccion-" + jsonResult.captura.declaracion.interes.secciones[seccionNo].apartado + "-" + seccionNo).removeClass("indicador-status indicador-status-success").addClass("indicador-status-process").text("EN PROCESO");
}

//pintar tabla html.
window.pintarTablaBeneficiosPrivados = function pintarTablaBeneficiosPrivados(seccionNo, seccionName){
    let html="";
    let lista = jsonResult.declaracion.interes.beneficiosPrivados.beneficio;
    Object.keys(lista).forEach(function (row) {
        let params = { uuid: lista[row].uuid, seccionNo: seccionNo, seccionName: seccionName };
        let beneficiarios="";
        $(lista[row].beneficiario).each(function(index, item) {
            beneficiarios += item.valor + ",";           
        });

        html+="<tr id='" + lista[row].uuid + "'>";
        html+=" <td>" + lista[row].tipoBeneficio.valor +"</td>";
        html+=" <td>" + beneficiarios.slice(0,-1) +"</td>";
        html+=" <td>" + lista[row].otorgante.nombreRazonSocial +"</td>";
        html+=" <td class='text-right'>";
        html+="     <button class='btn btn-sm btn-warning btnEditar' onclick='editarBeneficiosPrivados(\"" + btoa(JSON.stringify(params)) + "\");'>Editar</button>";
        html+="     <button class='btn btn-sm btn-danger btnEliminar' onclick='eliminarBeneficiosPrivados(\"" + btoa(JSON.stringify(params)) + "\");'>Eliminar</button>";              
        html+=" </td>";
        html+="</tr>";
    });
    $(".tbl" + seccionName + " tbody").empty().append(html);
}

window.editarBeneficiosPrivados = function editarBeneficiosPrivados(data){
    var item = JSON.parse(atob(data));
    var modulo = "#modulo" + item.seccionName  + " ";
    window["funcionalidadGuardarRegistro" + item.seccionName](item.seccionNo, item.seccionName, modulo, "EDITAR", item.uuid);
    //cargar información del row seleccionado para editar.
    var nodo = jsonResult.declaracion.interes.beneficiosPrivados.beneficio[item.uuid];

    $(nodo.beneficiario).each(function(index, item) {
        $("#chk" + item.clave).prop("checked", true);         
    });

    $("#form" + item.seccionName + " select[name='tipoOperacion']").val(nodo.tipoOperacion);
    $("#form" + item.seccionName + " select[name='tipoBeneficio']").val(nodo.tipoBeneficio.clave);
    $("#form" + item.seccionName + " input[name='especifique']").val();
    //$("#form" + item.seccionName + " select[name='beneficiario']").val(nodo.beneficiario.valor);
    $("#form" + item.seccionName + " select[name='tipoPersona']").val(nodo.otorgante.tipoPersona);
    $("#form" + item.seccionName + " input[name='nombreRazonSocial']").val(nodo.otorgante.nombreRazonSocial);
    $("#form" + item.seccionName + " input[name='rfc']").val(nodo.otorgante.rfc);
    $("#form" + item.seccionName + " select[name='formaRecepcion']").val(nodo.formaRecepcion);
    $("#form" + item.seccionName + " input[name='especifiqueBeneficio']").val(nodo.especifiqueBeneficio);
    $("#form" + item.seccionName + " input[name='montoMensualAproximado']").val(nodo.montoMensualAproximado.valor);
    $("#form" + item.seccionName + " select[name='moneda']").val(nodo.montoMensualAproximado.moneda);
    $("#form" + item.seccionName + " select[name='sector']").val(nodo.sector.clave);
    $("#form" + item.seccionName + " input[name='especifique']").val();
}

window.eliminarBeneficiosPrivados = function eliminarBeneficiosPrivados(data){
    var item = JSON.parse(atob(data));
    //elimina item en object json y tabla.
    delete jsonResult.declaracion.interes.beneficiosPrivados.beneficio[item.uuid];
    $("#" + item.uuid).remove();
    if (Object.keys(jsonResult.declaracion.interes.beneficiosPrivados.beneficio).length==0){
        $("#modulo" + item.seccionName + " .btnTerminar").addClass("hide");
    }
}
