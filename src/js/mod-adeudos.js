var tercerosTemp={};
window.initAdeudos = function initAdeudos(data){
    var seccion = JSON.parse(atob(data));
    var seccionName = seccion.moduloName.replace("modulo","");
    //var form = "#form" + seccion.moduloName.replace("modulo", "")+ " ";
    var modulo = "#" + seccion.moduloName + " ";

    //validar status de la sección.
    switch(seccion.status){
        case "SIN_INFO":
            //asginar valores predeterminados a catálogos(ayuda al usuario).
            jsonResult.declaracion.situacionPatrimonial.adeudos.ninguno=true;
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
            if (jsonResult.declaracion.situacionPatrimonial.adeudos.ninguno){
                $(modulo + ".chkNinguno")[0].checked=true;                
            }

            $(modulo + ".btnAgregar").removeClass("hide");
            $(modulo + ".btnHabilitar").addClass("hide");
            $(modulo + ".btnTerminar").removeClass("hide");
            if (Object.keys(jsonResult.declaracion.situacionPatrimonial.adeudos.adeudo).length > 0){
                $(modulo + ".btnAgregar").removeClass("hide");
            }
            else{
                $(modulo + ".btnAgregar").addClass("hide");
            }                     
            break;
        case "TERMINADO":
            window["pintarTabla" + seccionName](seccion.no, seccionName);
            $(modulo + ".chkNinguno").prop("disabled", true);
            if (jsonResult.declaracion.situacionPatrimonial.adeudos.ninguno){
                $(modulo + ".chkNinguno")[0].checked=true;                
            }
            $(modulo + "textarea[name='aclaracionesObservaciones']").val(jsonResult.declaracion.situacionPatrimonial.adeudos.aclaracionesObservaciones).prop("disabled", true);
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
        jsonResult.declaracion.situacionPatrimonial.adeudos.aclaracionesObservaciones =  $(modulo + "textarea[name='aclaracionesObservaciones']").val().toUpperCase();
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
        $(".status-seccion-" + seccion.apartado +"-" + seccion.no).removeClass("indicador-status indicador-status-success").addClass("indicador-status-process").text("EN PROCESO");
        validarDeclaracionTerminada();
    });

    $(".content_seccion").addClass("hide");
    $("#" + seccion.moduloName).removeClass("hide");
    $(modulo + ".formSecundario").addClass("hide");
    $(modulo + ".formPrincipal").removeClass("hide").addClass("animated fadeOut");
}

window.funcionalidadGuardarRegistroAdeudos = function funcionalidadGuardarRegistroAdeudos(seccionNo, seccionName, modulo, accion, uuid=null){
    var form = "#form" + seccionName + " ";

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

    loadCat(tipoOperacion, form + ".CBOtipoOperacion");
    loadCat(tipoAdeudo, form + ".CBOtipoAdeudo");
    loadCat(titulares, form + ".CBOtitularAdeudo");        
    loadCat(moneda, form + ".CBOmoneda");
    loadCat(paises, form + ".CBOpais");
    loadCat(tipoPersona, form + ".CBOtipoPersona");
    /* loadCat(tipoInmueble, ".CBOtipoInmueble"); */
    
    $(form + '.CBOtipoAdeudo').on('change', function() {
        $(form + ".tipoAdeudo_especifique").addClass("hide");
        $(form + ".tipoAdeudo_especifique input[name='especifique']").val($(form + '.CBOtipoAdeudo option:selected')[0].innerText);
        if(this.value == "OTRO"){
            $(form + ".tipoAdeudo_especifique").removeClass("hide");
            $(form + ".tipoAdeudo_especifique input[name='especifique']").val("");
        }        
    });      
    
    $(form + '.CBOtitularAdeudo').on('change', function() {
        $(".content_terceros").addClass("hide");
        let split = $(form + ".CBOtitularAdeudo option:selected").val().split(";");
        if (split.length>1 || split[0] != "DEC"){
            $(".content_terceros").removeClass("hide");
        }                 
    });  

    $(form + ":input[type='text']").val("");
    switch(jsonResult.captura.tipo_declaracion){
        case "INICIAL":
            $("#form" + seccionName + " select[name='tipoOperacion']").val("AGREGAR").prop("disabled", true);
            $(form + ".adeudos_saldolbl").text("SALDO INSOLUTO (SITUACIÓN ACTUAL)");
            $(form + ".content_porcentajeIncrementoDecremento").addClass("hide");
        break;
        case "MODIFICACION": 
        $(form + ".adeudos_saldolbl").text("SALDO INSOLUTO AL 31 DE DICIEMBRE DEL AÑO INMEDIATO ANTERIOR");
            $(form + ".content_porcentajeIncrementoDecremento").removeClass("hide");
        break;
        case "CONCLUSION": 
        $(form + ".adeudos_saldolbl").text("SALDO INSOLUTO A LA FECHA DE CONCLUSIÓN DEL EMPLEO");
            $(form + ".content_porcentajeIncrementoDecremento").removeClass("hide");
        break;
    }
    
    $(form + '.CBOtipoAdeudo').val("CHIP").trigger("change");
    $(form + '.CBOmoneda').val("MXN");
    $(form + '.CBOtitularAdeudo').val("DEC").trigger("change");
    $(form + '.CBOpais').val("MX");
    
    tercerosTemp={};
    $("#formAdeudos .tblTerceros tbody").empty();

    $("#form" + seccionName).validate().resetForm();

    $(form + ".btnCerrar").unbind("click");
    $(form + ".btnAgregar").unbind("click");
    $(form + ".btnAgregarTercero").unbind("click");

     //btn cerrar formulario.   
     $(form + ".btnCerrar").on('click',function() {
        $(modulo + ".formSecundario").addClass("hide");
        $(modulo + ".formPrincipal").removeClass("hide").addClass("animated fadeOut");
    }); 
    //validate
    

    //btn guardar.
    $(form + ".btnAgregar").on('click',function() {
        if( $("#form" + seccionName).valid()) {
            let guardar=false;
            let split = $(form + ".CBOtitularAdeudo option:selected").val().split(";");
            if (split.length==1){ 
                if (split[0]=="DEC"){ tercerosTemp=[]; guardar=true;}
                else{
                    if(Object.keys(tercerosTemp).length==0){ mensajeSwal("Aviso", "Agregue los datos del tercero.", "warning");}
                    else{ guardar=true;}
                }
            }
            else{
                if(Object.keys(tercerosTemp).length==0){ mensajeSwal("Aviso", "Agregue los datos del tercero.", "warning");}
                else{ guardar=true;}        
            }

            if (guardar){
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
        }       
    });

    $(form + ".btnAgregarTercero").on('click',function() {
        if($(form + ".content_terceros_nuevo input[name='nombreRazonSocial']").val().length==0){ mensajeSwal("Aviso","Ingresa el NOMBRE / INSTITUCIÓN O RAZÓN SOCIAL del tercero.", "warning")}
        else if($(form + ".content_terceros_nuevo input[name='rfc']").val().length==0){ mensajeSwal("Aviso","Ingresa el RFC del tercero.", "warning")}
        else{
            let uuid=generarUUID();
            tercerosTemp[uuid]={
                "uuid":                 uuid,
                "tipoPersona":          $(form + ".content_terceros_nuevo select[name='tipoPersona'] option:selected").val(),
                "nombreRazonSocial":    $(form + ".content_terceros_nuevo input[name='nombreRazonSocial']").val().toUpperCase(),
                "rfc":                  $(form + ".content_terceros_nuevo input[name='rfc']").val().toUpperCase(),
            };
            $(form + ".content_terceros_nuevo input[name='nombreRazonSocial']").val("");
            $(form + ".content_terceros_nuevo input[name='rfc']").val("");
            pintarTablaAdeudosTerceros();
        }
    });

}

window.guardarRegistroAdeudos = function guardarRegistroAdeudos(uuidItem, seccionNo, seccionName, modulo){    
    var form="#form" + seccionName + " ";
    jsonResult.declaracion.situacionPatrimonial.adeudos.ninguno=false;
    jsonResult.declaracion.situacionPatrimonial.adeudos.aclaracionesObservaciones =  $(modulo + " textarea[name='aclaracionesObservaciones']").val();
    let split = $(form + ".CBOtitularAdeudo option:selected").val().split(";");
    let titulares=[];
    $(split).each(function(index, item) {
        titulares.push({clave: titularesApoyo[item].clave,valor:titularesApoyo[item].valor });
    });

    jsonResult.declaracion.situacionPatrimonial.adeudos.adeudo[uuidItem] = {
        "uuid":uuidItem,
        "tipoOperacion": $(form + "select[name='tipoOperacion'] option:selected").val(),
        "titular": titulares,
        "tipoAdeudo": {
          "clave": $(form + "select[name='tipoAdeudo'] option:selected").val(),
          "valor": $(form + "input[name='especifique']").val().toUpperCase(),
        },
        "numeroCuentaContrato": $(form + "input[name='numeroCuentaContrato']").val().toUpperCase(),
        "fechaAdquisicion":     $(form + "input[name='fechaAdquisicion']").val(),
        "montoOriginal": {
          "valor":  parseInt($(form + "input[name='montoOriginal']").val()),
          "moneda": $(form + "select[name='montoOriginal_moneda'] option:selected").val(),
        },
        "otorganteCredito": {
          "tipoPersona":        $(form + "select[name='tipoPersonaOtorgante'] option:selected").val(),
          "nombreInstitucion":  $(form + "input[name='nombreInstitucion']").val().toUpperCase(),
          "rfc":                $(form + "input[name='otorganteCredito_rfc']").val().toUpperCase(),
        },
        "tercero": tercerosTemp,
        "localizacionAdeudo": {
          "pais": $(form + "select[name='pais'] option:selected").val(),
        }
      };

    switch(jsonResult.captura.tipo_declaracion){
        case "INICIAL": 
            jsonResult.declaracion.situacionPatrimonial.adeudos.adeudo[uuidItem].saldoInsolutoSituacionActual= {
                    "valor":  parseInt($(form + "input[name='saldoInsolutoSituacionActual']").val()),
                    "moneda": $(form + "select[name='saldoInsolutoSituacionActual_moneda'] option:selected").val(),
            };
        break;
        case "MODIFICACION": 
            jsonResult.declaracion.situacionPatrimonial.adeudos.adeudo[uuidItem].saldoInsolutoDiciembreAnterior = {
                    "valor":  parseInt($(form + "input[name='saldoInsolutoSituacionActual']").val()),
                    "moneda": $(form + "select[name='saldoInsolutoSituacionActual_moneda'] option:selected").val(),
                };
            jsonResult.declaracion.situacionPatrimonial.adeudos.adeudo[uuidItem].porcentajeIncrementoDecremento = parseInt($(form + "select[name='porcentajeIncrementoDecremento_simbolo'] option:selected").val() + $(form + "input[name='porcentajeIncrementoDecremento']").val());
        break;
        case "CONCLUSION": 
            jsonResult.declaracion.situacionPatrimonial.adeudos.adeudo[uuidItem].saldoInsolutoFechaConclusion = {
                    "valor":  parseInt($(form + "input[name='saldoInsolutoSituacionActual']").val()),
                    "moneda": $(form + "select[name='saldoInsolutoSituacionActual_moneda'] option:selected").val(),
                };
            jsonResult.declaracion.situacionPatrimonial.adeudos.adeudo[uuidItem].porcentajeIncrementoDecremento = parseInt($(form + "select[name='porcentajeIncrementoDecremento_simbolo'] option:selected").val() + $(form + "input[name='porcentajeIncrementoDecremento']").val());            
        break;
    }
    //cambiar status a captura.
    jsonResult.captura.declaracion.situacionPatrimonial.secciones[seccionNo].status= "EN_PROCESO";
    $(".status-seccion-" + jsonResult.captura.declaracion.situacionPatrimonial.secciones[seccionNo].apartado + "-" + seccionNo).removeClass("indicador-status indicador-status-success").addClass("indicador-status-process").text("EN PROCESO");
}

window.pintarTablaAdeudos = function pintarTablaAdeudos(seccionNo, seccionName){
    let html="";
    let lista = jsonResult.declaracion.situacionPatrimonial.adeudos.adeudo;
    Object.keys(lista).forEach(function (row) {
        var params = { uuid: lista[row].uuid, seccionNo: seccionNo, seccionName: seccionName };
        let datos=lista[row];
        let titulares="", saldo="", saldoMoneda="";
        $(datos.titular).each(function(index, item) { titulares+= item.valor + ","; });

        switch(jsonResult.captura.tipo_declaracion){
            case "INICIAL": 
                saldo = format(datos.saldoInsolutoSituacionActual.valor);
                saldoMoneda = datos.saldoInsolutoSituacionActual.moneda;
                break;
            case "MODIFICACION": 
                saldo = format(datos.saldoInsolutoDiciembreAnterior.valor);
                saldoMoneda = datos.saldoInsolutoDiciembreAnterior.moneda;
                break;
            case "CONCLUSION": 
                saldo = format(datos.saldoInsolutoFechaConclusion.valor);
                saldoMoneda = datos.saldoInsolutoFechaConclusion.moneda;
                break;
        }

        html+="<tr id='" + lista[row].uuid + "'>";
        html+=" <td>" + titulares.slice(0, -1) +"</td>";
        html+=" <td>" + datos.tipoAdeudo.valor +"</td>";
        html+=" <td>" + datos.otorganteCredito.nombreInstitucion +"</td>";        
        html+=" <td>" + format(datos.montoOriginal.valor) + datos.montoOriginal.moneda + "</td>";        
        html+=" <td>" + saldo + saldoMoneda + "</td>";        
        html+=" <td class='text-right'>";
        html+="     <button class='btn btn-sm btn-warning btnEditar' onclick='editarAdeudos(\"" + btoa(JSON.stringify(params)) + "\");'>Editar</button>";
        html+="     <button class='btn btn-sm btn-danger btnEliminar' onclick='eliminarAdeudos(\"" + btoa(JSON.stringify(params)) + "\");'>Eliminar</button>";              
        html+=" </td>";
        html+="</tr>";
    });
    $(".tbl" + seccionName + " tbody").empty().append(html);
}

window.editarAdeudos = function editarAdeudos(data){
    let item = JSON.parse(atob(data));
    let form = "#form" + item.seccionName  + " ";
    let modulo = "#modulo" + item.seccionName  + " ";
    window["funcionalidadGuardarRegistro" + item.seccionName](item.seccionNo, item.seccionName, modulo, "EDITAR", item.uuid);
    
    //cargar información del row seleccionado para editar.
    let nodo = jsonResult.declaracion.situacionPatrimonial.adeudos.adeudo[item.uuid];
    let titular="";
    $(nodo.titular).each(function(index, item) { titular+= item.clave + ";"; });    
    $(form + "select[name='tipoOperacion']").val(nodo.tipoOperacion);
    $(form + "select[name='titularBien']").val(titular.slice(0, -1)).trigger("change");    
    if(titular.slice(0,-1) !="DEC"){ 
        tercerosTemp = nodo.tercero; 
        pintarTablaAdeudosTerceros(); 
    }

    $(form + "select[name='tipoAdeudo']").val(nodo.tipoAdeudo.clave).trigger("change");
    $(form + "input[name='especifique']").val(nodo.tipoAdeudo.valor);
    $(form + "input[name='numeroCuentaContrato']").val(nodo.numeroCuentaContrato);
    $(form + "input[name='fechaAdquisicion']").val(nodo.fechaAdquisicion);
    $(form + "input[name='montoOriginal']").val(nodo.montoOriginal.valor);
    $(form + "select[name='montoOriginal_moneda']").val(nodo.montoOriginal.moneda);
    //$(form + "input[name='saldoInsolutoSituacionActual']").val(nodo.saldoInsolutoSituacionActual.valor);
    //$(form + "select[name='saldoInsolutoSituacionActual_moneda']").val(nodo.saldoInsolutoSituacionActual.moneda);
    $(form + "select[name='tipoPersonaOtorgante']").val(nodo.otorganteCredito.tipoPersona);
    $(form + "input[name='nombreInstitucion']").val(nodo.otorganteCredito.nombreInstitucion);
    $(form + "input[name='otorganteCredito_rfc']").val(nodo.otorganteCredito.rfc);
    $(form + "select[name='pais']").val(nodo.localizacionAdeudo.pais);
    
    switch(jsonResult.captura.tipo_declaracion){        
        case "INICIAL": 
            $(form + "input[name='saldoInsolutoSituacionActual']").val(nodo.saldoInsolutoSituacionActual.valor);
            $(form + "select[name='saldoInsolutoSituacionActual_moneda']").val(nodo.saldoInsolutoSituacionActual.moneda);
            $(form + ".content_porcentajeIncrementoDecremento").addClass("hide");
        break;
        case "MODIFICACION": 
            $(form + "input[name='saldoInsolutoSituacionActual']").val(nodo.saldoInsolutoDiciembreAnterior.valor); 
            $(form + "select[name='saldoInsolutoSituacionActual_moneda']").val(nodo.saldoInsolutoDiciembreAnterior.moneda);
            if (nodo.porcentajeIncrementoDecremento<0) {
                $(form + "select[name='porcentajeIncrementoDecremento_simbolo']").val("-");
                $(form + "input[name='porcentajeIncrementoDecremento']").val(nodo.porcentajeIncrementoDecremento);
            }
            else{
                $(form + "select[name='porcentajeIncrementoDecremento_simbolo']").val("+");
                $(form + "input[name='porcentajeIncrementoDecremento']").val(nodo.porcentajeIncrementoDecremento);
            }
            $(form + ".content_porcentajeIncrementoDecremento").removeClass("hide");
            break;
        case "CONCLUSION": 
            $(form + "input[name='saldoInsolutoSituacionActual']").val(nodo.saldoInsolutoFechaConclusion.valor);
            $(form + "select[name='saldoInsolutoSituacionActual_moneda']").val(nodo.saldoInsolutoFechaConclusion.moneda);
            if (nodo.porcentajeIncrementoDecremento<0) {
                $(form + "select[name='porcentajeIncrementoDecremento_simbolo']").val("-");
                $(form + "input[name='porcentajeIncrementoDecremento']").val(nodo.porcentajeIncrementoDecremento);
            }
            else{
                $(form + "select[name='porcentajeIncrementoDecremento_simbolo']").val("+");
                $(form + "input[name='porcentajeIncrementoDecremento']").val(nodo.porcentajeIncrementoDecremento);
            }
            $(form + ".content_porcentajeIncrementoDecremento").removeClass("hide");
        break;
    }

}

window.eliminarAdeudos = function eliminarAdeudos(data){
    var item = JSON.parse(atob(data));
    //elimina item en object json y tabla.
    delete jsonResult.declaracion.situacionPatrimonial.adeudos.adeudo[item.uuid];
    $("#" + item.uuid).remove();
    if (Object.keys(jsonResult.declaracion.situacionPatrimonial.adeudos.adeudo).length==0){
        $("#modulo" + item.seccionName + " .btnTerminar").addClass("hide");
    }
}




window.pintarTablaAdeudosTerceros = function pintarTablaAdeudosTerceros(){
    let html="";
    Object.keys(tercerosTemp).forEach(function (row) {        
        let datos = tercerosTemp[row];
        html+="<tr id='" + datos.uuid + "'>";
        html+=" <td>" + datos.tipoPersona +"</td>";
        html+=" <td>" + datos.nombreRazonSocial +"</td>";        
        html+=" <td>" + datos.rfc + "</td>";        
        html+=" <td class='text-right'>";
        //html+="     <button class='btn btn-sm btn-warning btnEditar' onclick='editarPrestamoOComodato(\"" + btoa(JSON.stringify(datos)) + "\");'>Editar</button>";
        html+="     <button class='btn btn-sm btn-danger btnEliminar' onclick='eliminarAdeudosTerceros(\"" + btoa(JSON.stringify(datos)) + "\");'>Eliminar</button>";              
        html+=" </td>";
        html+="</tr>";
    });
    $("#formAdeudos .tblTerceros tbody").empty().append(html);
}

window.eliminarAdeudosTerceros = function eliminarAdeudosTerceros(data){
    var item = JSON.parse(atob(data));
    //elimina item en object json y tabla.
    delete tercerosTemp[item.uuid];
    $("#" + item.uuid).remove();   
}