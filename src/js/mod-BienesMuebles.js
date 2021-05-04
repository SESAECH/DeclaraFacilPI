var tercerosTemp={}, transmisoresTemp={};
window.initBienesMuebles = function initBienesMuebles(data){
    var seccion = JSON.parse(atob(data));
    var seccionName = seccion.moduloName.replace("modulo","");
    //var form = "#form" + seccion.moduloName.replace("modulo", "")+ " ";
    var modulo = "#" + seccion.moduloName + " ";

    //validar status de la sección.
    switch(seccion.status){
        case "SIN_INFO":
            //asginar valores predeterminados a catálogos(ayuda al usuario).
            jsonResult.declaracion.situacionPatrimonial.bienesMuebles.ninguno=true;
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
            if (jsonResult.declaracion.situacionPatrimonial.bienesMuebles.ninguno){
                $(modulo + ".chkNinguno")[0].checked=true;                
            }
            $(modulo + ".btnAgregar").removeClass("hide");
            $(modulo + ".btnHabilitar").addClass("hide");
            $(modulo + ".btnTerminar").removeClass("hide");
            if (Object.keys(jsonResult.declaracion.situacionPatrimonial.bienesMuebles.bienMueble).length > 0){
                $(modulo + ".btnAgregar").removeClass("hide");
            }
            else{
                $(modulo + ".btnAgregar").addClass("hide");
            }                     
            break;
        case "TERMINADO":
            window["pintarTabla" + seccionName](seccion.no, seccionName);
            $(modulo + ".chkNinguno").prop("disabled", true);
            if (jsonResult.declaracion.situacionPatrimonial.bienesMuebles.ninguno){
                $(modulo + ".chkNinguno")[0].checked=true;                
            }
            $(modulo + "textarea[name='aclaracionesObservaciones']").val(jsonResult.declaracion.situacionPatrimonial.bienesMuebles.aclaracionesObservaciones).prop("disabled", true);
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
        jsonResult.declaracion.situacionPatrimonial.bienesMuebles.aclaracionesObservaciones =  $(modulo + "textarea[name='aclaracionesObservaciones']").val().toUpperCase();
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

window.funcionalidadGuardarRegistroBienesMuebles = function funcionalidadGuardarRegistroBienesMuebles(seccionNo, seccionName, modulo, accion, uuid=null){
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
    loadCat(tipoBienBienesMuebles, form + ".CBOtipoBien");
    loadCat(formaAdquisicion, form + ".CBOformaAdquisicion");
    loadCat(formaPago, form + ".CBOformaPago");
    loadCat(titulares, form + ".CBOtitularBien");        
    loadCat(moneda, form + ".CBOmoneda");
    loadCat(motivoBaja, form + ".CBOmotivoBaja");
    loadCat(tipoPersona, form + ".CBOtipoPersona");  
    loadCat(parentescoRelacion, form + ".CBOparentescoRelacion");   
    
    $(form + '.CBOtitularBien').on('change', function() {
        $(".content_terceros").addClass("hide");
        let split = $(form + ".CBOtitularBien option:selected").val().split(";");
        if (split.length>1 || split[0] != "DEC"){
            $(".content_terceros").removeClass("hide");
        }                 
    });  

    $(form + '.CBOtipoBien').on('change', function() {
        $(form + ".content_tipoBien_especifique").addClass("hide");
        $(form + ".content_tipoBien_especifique input[name='tipoBien_especifique']").val($(form + '.CBOtipoBien option:selected')[0].innerText);
        if(this.value == "OTRO"){
            $(form + ".content_tipoBien_especifique").removeClass("hide");
            $(form + ".content_tipoBien_especifique input[name='tipoBien_especifique']").val("");
        }        
    });

    $(form + '.CBOmotivoBaja').on('change', function() {
        $(form + ".content_motivoBaja_especifique").addClass("hide");
        $(form + ".content_motivoBaja_especifique input[name='motivoBaja_especifique']").val($(form + '.CBOmotivoBaja option:selected')[0].innerText);
        if(this.value == "OTRO"){
            $(form + ".content_motivoBaja_especifique").removeClass("hide");
            $(form + ".content_motivoBaja_especifique input[name='motivoBaja_especifique']").val("");
        }        
    });

    $(form + '.CBOtipoPersona').on('change', function() {
        if(this.value=="FISICA"){
            $(form + ".CBOparentescoRelacion option").removeClass("hide");
            $(form + ".CBOparentescoRelacion option[value='NIN']").addClass("hide");
            $(form + ".CBOparentescoRelacion option[value='OTRO']").addClass("hide");    
            $(form + '.CBOparentescoRelacion').val("ABU").trigger("change");        
        }
        else{
            $(form + ".CBOparentescoRelacion option").addClass("hide");
            $(form + ".CBOparentescoRelacion option[value='NIN']").removeClass("hide");
            $(form + ".CBOparentescoRelacion option[value='OTRO']").removeClass("hide");
            $(form + '.CBOparentescoRelacion').val("NIN").trigger("change");
        }
        
    }); 

    $(form + '.CBOparentescoRelacion').on('change', function() {
        $(form + ".content_transmisor_relacion_especifique").addClass("hide");
        $(form + ".content_transmisor_relacion_especifique input[name='transmisor_relacion_especifique']").val($(form + '.CBOparentescoRelacion option:selected')[0].innerText);
        if(this.value == "OTRO"){
            $(form + ".content_transmisor_relacion_especifique").removeClass("hide");
            $(form + ".content_transmisor_relacion_especifique input[name='transmisor_relacion_especifique']").val("");
        }        
    });

    $(form + ":input[type='text']").val("");
    
    if(jsonResult.captura.tipo_declaracion == "INICIAL"){
        $("#form" + seccionName + " select[name='tipoOperacion']").val("AGREGAR").prop("disabled", true);
    } 

    $(form + '.CBOtipoBien').val("MECA").trigger("change");
    $(form + '.CBOmoneda').val("MXN");
    $(form + '.CBOtitularBien').val("DEC").trigger("change");
    $(form + '.CBOpais').val("MX");
    $(form + '.CBOparentescoRelacion').val("ABU").trigger("change");
    $(form + '.CBOmotivoBaja').val("NA").trigger("change");
    $(form + '.CBOtipoPersona').val("FISICA").trigger("change");
    
    tercerosTemp={};
    transmisoresTemp={};
    $("#formBienesMuebles .tblTerceros tbody").empty();
    $("#formBienesMuebles .tblTransmisores tbody").empty();

    $("#form" + seccionName).validate().resetForm();

    $(form + ".btnCerrar").unbind("click");
    $(form + ".btnAgregar").unbind("click");
    $(form + ".btnAgregarTercero").unbind("click");
    $(form + ".btnAgregarTransmisor").unbind("click");
    
     //btn cerrar formulario.   
     $(form + ".btnCerrar").on('click',function() {
        $(modulo + ".formSecundario").addClass("hide");
        $(modulo + ".formPrincipal").removeClass("hide").addClass("animated fadeOut");
    });     

    //btn guardar.
    $(form + ".btnAgregar").on('click',function() {
        if( $("#form" + seccionName).valid()) {
            let guardar=false;
            let split = $(form + ".CBOtitularBien  option:selected").val().split(";");
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
            if (Object.keys(transmisoresTemp).length==0){ guardar=false; mensajeSwal("Aviso", "Agregue al menos 1 transmisor.", "warning");}
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
        else if($(form + ".content_terceros_nuevo input[name='rfc']").val().length<12){ mensajeSwal("Aviso","Ingresa el RFC del tercero.", "warning")}
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
            pintarTablaBienesMueblesTerceros();
        }
    });

    $(form + ".btnAgregarTransmisor").on('click',function() {
        if($(form + ".content_transmisor_nuevo input[name='transmisor_nombreRazonSocial']").val().length==0){ mensajeSwal("Aviso","Ingresa el NOMBRE / INSTITUCIÓN O RAZÓN SOCIAL del transmisor.", "warning")}
        else if($(form + ".content_terceros_nuevo input[name='transmisor_rfc']").val().length<12){ mensajeSwal("Aviso","Ingresa el RFC del transmisor.", "warning")}
        else if($(form + ".content_transmisor_nuevo input[name='transmisor_relacion_especifique']").val().length==0){ mensajeSwal("Aviso","Seleccione la relación del transmisor.", "warning")}
        else{
            let uuid=generarUUID();
            transmisoresTemp[uuid]={
                "uuid":                 uuid,
                "tipoPersona":          $(form + ".content_transmisor_nuevo select[name='transmisor_tipoPersona'] option:selected").val(),
                "nombreRazonSocial":    $(form + ".content_transmisor_nuevo input[name='transmisor_nombreRazonSocial']").val().toUpperCase(),
                "rfc":                  $(form + ".content_transmisor_nuevo input[name='transmisor_rfc']").val().toUpperCase(),
                "relacion": {
                    "clave": $(form + ".content_transmisor_nuevo select[name='transmisor_relacion'] option:selected").val(),
                    "valor": $(form + ".content_transmisor_nuevo input[name='transmisor_relacion_especifique']").val().toUpperCase()
                  }
            };
            $(form + ".content_transmisor_nuevo input[name='transmisor_nombreRazonSocial']").val("");
            $(form + ".content_transmisor_nuevo input[name='transmisor_rfc']").val("");
            $(form + '.CBOparentescoRelacion').val("ABU").trigger("change");
            pintarTablaBienesMueblesTransmisores();
        }
    });

}

window.guardarRegistroBienesMuebles = function guardarRegistroBienesMuebles(uuidItem, seccionNo, seccionName, modulo){    
    var form="#form" + seccionName + " ";
    jsonResult.declaracion.situacionPatrimonial.bienesMuebles.ninguno=false;
    jsonResult.declaracion.situacionPatrimonial.bienesMuebles.aclaracionesObservaciones =  $(modulo + " textarea[name='aclaracionesObservaciones']").val().toUpperCase();
    let split = $(form + ".CBOtitularBien option:selected").val().split(";");
    let titulares=[];
    $(split).each(function(index, item) {
        titulares.push({clave: titularesApoyo[item].clave,valor:titularesApoyo[item].valor });
    });

    jsonResult.declaracion.situacionPatrimonial.bienesMuebles.bienMueble[uuidItem] = {
        "uuid":uuidItem,
        "tipoOperacion": $(form + "select[name='tipoOperacion'] option:selected").val(),     
        "titular": titulares,
        "tipoBien": {
          "clave": $(form + "select[name='tipoBien'] option:selected").val(),
          "valor": $(form + "input[name='tipoBien_especifique']").val(),
        },
        "transmisor": transmisoresTemp,
        "tercero": tercerosTemp,
        "descripcionGeneralBien": $(form + "input[name='descripcionGeneralBien']").val().toUpperCase(),
        "formaAdquisicion": {
          "clave": $(form + "select[name='formaAdquisicion'] option:selected").val(),
          "valor": $(form + "select[name='formaAdquisicion'] option:selected")[0].innerText,
        },
        "formaPago": $(form + "select[name='formaPago'] option:selected").val(),
        "valorAdquisicion": {
          "valor": parseInt($(form + "input[name='valorAdquisicion']").val()),
          "moneda": $(form + "select[name='moneda'] option:selected").val(),  
        },
        "fechaAdquisicion": $(form + "input[name='fechaAdquisicion']").val(),
        "motivoBaja": {
          "clave": $(form + "select[name='motivoBaja'] option:selected").val(),
          "valor": $(form + "input[name='motivoBaja_especifique']").val()
        }
    };

    //cambiar status a captura.
    jsonResult.captura.declaracion.situacionPatrimonial.secciones[seccionNo].status= "EN_PROCESO";
    $(".status-seccion-" + jsonResult.captura.declaracion.situacionPatrimonial.secciones[seccionNo].apartado + "-" + seccionNo).removeClass("indicador-status indicador-status-success").addClass("indicador-status-process").text("EN PROCESO");
}

window.pintarTablaBienesMuebles = function pintarTablaBienesMuebles(seccionNo, seccionName){
    let html="";
    let lista = jsonResult.declaracion.situacionPatrimonial.bienesMuebles.bienMueble;
    Object.keys(lista).forEach(function (row) {
        var params = { uuid: lista[row].uuid, seccionNo: seccionNo, seccionName: seccionName };
        let datos=lista[row];
        let titulares="";
        $(datos.titular).each(function(index, item) { titulares+= item.valor + ","; });
       
        html+="<tr id='" + lista[row].uuid + "'>";
        html+=" <td>" + titulares.slice(0, -1) +"</td>";
        html+=" <td>" + datos.tipoBien.valor +"</td>";
        html+=" <td class='text-right'>" + format(datos.valorAdquisicion.valor) + datos.valorAdquisicion.moneda +"</td>";            
        html+=" <td>" + datos.fechaAdquisicion + "</td>";        
        html+=" <td class='text-right'>";
        html+="     <button class='btn btn-sm btn-warning btnEditar' onclick='editarBienesMuebles(\"" + btoa(JSON.stringify(params)) + "\");'>Editar</button>";
        html+="     <button class='btn btn-sm btn-danger btnEliminar' onclick='eliminarBienesMuebles(\"" + btoa(JSON.stringify(params)) + "\");'>Eliminar</button>";              
        html+=" </td>";
        html+="</tr>";
    });
    $(".tbl" + seccionName + " tbody").empty().append(html);
}

window.editarBienesMuebles = function editarBienesMuebles(data){
    let item = JSON.parse(atob(data));
    let form = "#form" + item.seccionName  + " ";
    let modulo = "#modulo" + item.seccionName  + " ";
    window["funcionalidadGuardarRegistro" + item.seccionName](item.seccionNo, item.seccionName, modulo, "EDITAR", item.uuid);
    
    //cargar información del row seleccionado para editar.
    let nodo = jsonResult.declaracion.situacionPatrimonial.bienesMuebles.bienMueble[item.uuid];
    let titular="";
    $(nodo.titular).each(function(index, item) { titular+= item.clave + ";"; });   
    $(form + "select[name='titular']").val(titular.slice(0, -1)).trigger("change");    
    if(titular.slice(0,-1) !="DEC"){ 
        tercerosTemp = nodo.tercero; 
        pintarTablaBienesMueblesTerceros(); 
    }
    transmisoresTemp = nodo.transmisor;
    pintarTablaBienesMueblesTransmisores();

    $(form + "select[name='tipoOperacion']").val(nodo.tipoOperacion);
    $(form + "select[name='tipoBien']").val(nodo.tipoBien.clave).trigger("change");
    $(form + "input[name='tipoBien_especifique']").val(nodo.tipoBien.valor);
    $(form + "input[name='descripcionGeneralBien']").val(nodo.descripcionGeneralBien);
    $(form + "input[name='formaAdquisicion']").val(nodo.formaAdquisicion.valor);
    $(form + "input[name='formaAdquisicion']").val(nodo.formaAdquisicion.moneda);
    $(form + "input[name='formaPago']").val(nodo.formaPago);
    $(form + "input[name='valorAdquisicion']").val(nodo.valorAdquisicion.valor);
    $(form + "select[name='moneda']").val(nodo.valorAdquisicion.moneda);
    $(form + "input[name='fechaAdquisicion']").val(nodo.fechaAdquisicion);
    $(form + "select[name='motivoBaja']").val(nodo.motivoBaja.clave).trigger("change");
    $(form + "input[name='motivoBaja_especifique']").val(nodo.motivoBaja.valor);    
}

window.eliminarBienesMuebles = function eliminarBienesMuebles(data){
    var item = JSON.parse(atob(data));
    //elimina item en object json y tabla.
    delete jsonResult.declaracion.situacionPatrimonial.bienesMuebles.bienMueble[item.uuid];
    $("#" + item.uuid).remove();
    if (Object.keys(jsonResult.declaracion.situacionPatrimonial.bienesMuebles.bienMueble).length==0){
        $("#modulo" + item.seccionName + " .btnTerminar").addClass("hide");
    }
}



window.pintarTablaBienesMueblesTerceros = function pintarTablaBienesMueblesTerceros(){
    let html="";
    Object.keys(tercerosTemp).forEach(function (row) {        
        let datos = tercerosTemp[row];
        html+="<tr id='" + datos.uuid + "'>";
        html+=" <td>" + datos.tipoPersona +"</td>";
        html+=" <td>" + datos.nombreRazonSocial +"</td>";        
        html+=" <td>" + datos.rfc + "</td>";        
        html+=" <td class='text-right'>";
        html+="     <button class='btn btn-sm btn-danger btnEliminar' onclick='eliminarBienesMueblesTerceros(\"" + btoa(JSON.stringify(datos)) + "\");'>Eliminar</button>";              
        html+=" </td>";
        html+="</tr>";
    });
    $("#formBienesMuebles .tblTerceros tbody").empty().append(html);
}

window.eliminarBienesMueblesTerceros = function eliminarBienesMueblesTerceros(data){
    var item = JSON.parse(atob(data));
    //elimina item en object json y tabla.
    delete tercerosTemp[item.uuid];
    $("#" + item.uuid).remove();   
}


window.pintarTablaBienesMueblesTransmisores = function pintarTablaBienesMueblesTransmisores(){
    let html="";
    Object.keys(transmisoresTemp).forEach(function (row) {        
        let datos = transmisoresTemp[row];
        html+="<tr id='" + datos.uuid + "'>";
        html+=" <td>" + datos.tipoPersona +"</td>";
        html+=" <td>" + datos.nombreRazonSocial +"</td>";        
        html+=" <td>" + datos.rfc + "</td>";     
        html+=" <td>" + datos.relacion.valor + "</td>";        
        html+=" <td class='text-right'>";
        html+="     <button class='btn btn-sm btn-danger btnEliminar' onclick='eliminarBienesMueblesTransmisores(\"" + btoa(JSON.stringify(datos)) + "\");'>Eliminar</button>";              
        html+=" </td>";
        html+="</tr>";
    });
    $("#formBienesMuebles .tblTransmisores tbody").empty().append(html);
}

window.eliminarBienesMueblesTransmisores = function eliminarBienesMueblesTransmisores(data){
    var item = JSON.parse(atob(data));
    //elimina item en object json y tabla.
    delete transmisoresTemp[item.uuid];
    $("#" + item.uuid).remove();   
}