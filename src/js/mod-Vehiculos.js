var tercerosTemp={}, transmisoresTemp={};
window.initVehiculos = function initVehiculos(data){
    var seccion = JSON.parse(atob(data));
    var seccionName = seccion.moduloName.replace("modulo","");
    //var form = "#form" + seccion.moduloName.replace("modulo", "")+ " ";
    var modulo = "#" + seccion.moduloName + " ";

    //validar status de la sección.
    switch(seccion.status){
        case "SIN_INFO":
            //asginar valores predeterminados a catálogos(ayuda al usuario).
            jsonResult.declaracion.situacionPatrimonial.vehiculos.ninguno=true;
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
            if (jsonResult.declaracion.situacionPatrimonial.vehiculos.ninguno){
                $(modulo + ".chkNinguno")[0].checked=true;                
            }
            $(modulo + ".btnAgregar").removeClass("hide");
            $(modulo + ".btnHabilitar").addClass("hide");
            $(modulo + ".btnTerminar").removeClass("hide");
            if (Object.keys(jsonResult.declaracion.situacionPatrimonial.vehiculos.vehiculo).length > 0){
                $(modulo + ".btnAgregar").removeClass("hide");
            }
            else{
                $(modulo + ".btnAgregar").addClass("hide");
            }                     
            break;
        case "TERMINADO":
            window["pintarTabla" + seccionName](seccion.no, seccionName);
            $(modulo + ".chkNinguno").prop("disabled", true);
            if (jsonResult.declaracion.situacionPatrimonial.vehiculos.ninguno){
                $(modulo + ".chkNinguno")[0].checked=true;                
            }
            $(modulo + "textarea[name='aclaracionesObservaciones']").val(jsonResult.declaracion.situacionPatrimonial.vehiculos.aclaracionesObservaciones).prop("disabled", true);
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
        jsonResult.declaracion.situacionPatrimonial.vehiculos.aclaracionesObservaciones =  $(modulo + "textarea[name='aclaracionesObservaciones']").val().toUpperCase();        
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

window.funcionalidadGuardarRegistroVehiculos = function funcionalidadGuardarRegistroVehiculos(seccionNo, seccionName, modulo, accion, uuid=null){
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
    loadCat(formaAdquisicion, form + ".CBOformaAdquisicion");
    loadCat(formaPago, form + ".CBOformaPago");
    loadCat(titulares, form + ".CBOtitularBien");        
    loadCat(moneda, form + ".CBOmoneda");
    loadCat(motivoBaja, form + ".CBOmotivoBaja");
    loadCat(tipoPersona, form + ".CBOtipoPersona"); 
    loadCat(tipoVehiculo, form + ".CBOtipoVehiculo"); 
    loadCat(parentescoRelacion, form + ".CBOparentescoRelacion");   
    loadCat(entidadFederativa, form + ".CBOentidadFederativa");    
    loadCat(paises, form + ".CBOpais");

    $(form + '.CBOtitularBien').on('change', function() {
        $(".content_terceros").addClass("hide");
        let split = $(form + ".CBOtitularBien option:selected").val().split(";");
        if (split.length>1 || split[0] != "DEC"){
            $(".content_terceros").removeClass("hide");
        }                 
    });  

    $(form + '.CBOtipoVehiculo').on('change', function() {
        $(form + ".content_tipoVehiculo_especifique").addClass("hide");
        $(form + "input[name='tipoVehiculo_especifique']").val($(form + '.CBOtipoVehiculo option:selected')[0].innerText);
        if(this.value == "OTRO"){
            $(form + ".content_tipoVehiculo_especifique").removeClass("hide");
            $(form + "input[name='tipoVehiculo_especifique']").val("");
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

    $(form + '.content_transmisor .CBOtipoPersona').on('change', function() {
        if(this.value=="FISICA"){
            $(form + ".CBOparentescoRelacion option").removeClass("hide");    
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

    $(form + '.CBOpais').on('change', function() {
        $(form + ".ent_fed").addClass("hide");        
        if(this.value == "MX"){
            $(form + ".ent_fed").removeClass("hide");
        }
    });
    $(form).trigger("reset");
    //$(form + ":input[type='text']").val("");
    
    if(jsonResult.captura.tipo_declaracion == "INICIAL"){
        $("#form" + seccionName + " select[name='tipoOperacion']").val("AGREGAR").prop("disabled", true);
    } 

    $(form + '.CBOtipoVehiculo').val("AUMOT").trigger("change");
    //$(form + "input[name='tipoVehiculo_especifique']").val($(form + '.CBOtipoVehiculo option:selected')[0].innerText);
    $(form + '.CBOmoneda').val("MXN").prop("disabled", true);
    $(form + '.CBOtitularBien').val("DEC")  .trigger("change");
    $(form + '.CBOparentescoRelacion').val("ABU").trigger("change");
    $(form + '.CBOmotivoBaja').val("NA").trigger("change");
    $(form + ".CBOentidadFederativa").val("07").trigger("change");
    $(form + ".CBOpais").val("MX").trigger("change");
    $(form + '.CBOtipoPersona').val("FISICA").trigger("change");
    
    tercerosTemp={};
    transmisoresTemp={};
    $("#formVehiculos .tblTerceros tbody").empty();
    $("#formVehiculos .tblTransmisores tbody").empty();

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
        if($(form + ".content_terceros_nuevo input[name='nombreRazonSocial']").val().length==0){ mensajeSwal("Aviso","Ingresa el nombre / institución o razón social del tercero.", "warning")}
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
            pintarTablaVehiculosTerceros();
        }
    });

    $(form + ".btnAgregarTransmisor").on('click',function() {
        if($(form + ".content_transmisor_nuevo input[name='transmisor_nombreRazonSocial']").val().length==0){ mensajeSwal("Aviso","Ingresa el nombre/institución o razón social del transmisor.", "warning")}
        else if($(form + ".content_transmisor_nuevo input[name='transmisor_rfc']").val().length<12){ mensajeSwal("Aviso","Ingresa el RFC del transmisor.", "warning")}
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
            pintarTablaVehiculosTransmisores();
        }
    });
}

window.guardarRegistroVehiculos = function guardarRegistroVehiculos(uuidItem, seccionNo, seccionName, modulo){    
    var form="#form" + seccionName + " ";
    jsonResult.declaracion.situacionPatrimonial.vehiculos.ninguno=false;
    jsonResult.declaracion.situacionPatrimonial.vehiculos.aclaracionesObservaciones =  $(modulo + " textarea[name='aclaracionesObservaciones']").val();
    let split = $(form + ".CBOtitularBien option:selected").val().split(";");
    let titulares=[];
    $(split).each(function(index, item) {
        titulares.push({clave: titularesApoyo[item].clave,valor:titularesApoyo[item].valor });
    });

    jsonResult.declaracion.situacionPatrimonial.vehiculos.vehiculo[uuidItem] = {
        "uuid":uuidItem,
        "tipoOperacion": $(form + "select[name='tipoOperacion'] option:selected").val(),     
        "titular": titulares,
        "tipoVehiculo": {
          "clave": $(form + "select[name='tipoVehiculo'] option:selected").val(),
          "valor": $(form + "input[name='tipoVehiculo_especifique']").val().toUpperCase(),
        },
        "transmisor": transmisoresTemp,
        "tercero": tercerosTemp,
        "marca":    $(form + "input[name='marca']").val().toUpperCase(),
        "modelo":   $(form + "input[name='modelo']").val().toUpperCase(),
        "anio":     $(form + "input[name='anio']").val(),
        "numeroSerieRegistro":$(form + "input[name='numeroSerieRegistro']").val().toUpperCase(),
        "lugarRegistro": {
            "pais":   $(form + "select[name='pais'] option:selected").val(),
            "entidadFederativa": {
                "clave": $(form + "select[name='entidadFederativa'] option:selected").val(),
                "valor": $(form + "select[name='entidadFederativa'] option:selected")[0].innerText,
            }
        },
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

window.pintarTablaVehiculos = function pintarTablaVehiculos(seccionNo, seccionName){
    let html="";
    let lista = jsonResult.declaracion.situacionPatrimonial.vehiculos.vehiculo;
    Object.keys(lista).forEach(function (row) {
        var params = { uuid: lista[row].uuid, seccionNo: seccionNo, seccionName: seccionName };
        let datos=lista[row];
        let titulares="";
        $(datos.titular).each(function(index, item) { titulares+= item.valor + ","; });
       
        html+="<tr id='" + lista[row].uuid + "'>";
        html+=" <td>" + titulares.slice(0, -1) +"</td>";
        html+=" <td>" + datos.tipoVehiculo.valor +"</td>";
        html+=" <td>" + datos.marca + " / "+ datos.modelo +"</td>";
        html+=" <td class='text-right'>" + format(datos.valorAdquisicion.valor) + datos.valorAdquisicion.moneda +"</td>";               
        html+=" <td class='text-right'>";
        html+="     <button class='btn btn-sm btn-warning btnEditar' onclick='editarVehiculos(\"" + btoa(JSON.stringify(params)) + "\");'>Editar</button>";
        html+="     <button class='btn btn-sm btn-danger btnEliminar' onclick='eliminarVehiculos(\"" + btoa(JSON.stringify(params)) + "\");'>Eliminar</button>";              
        html+=" </td>";
        html+="</tr>";
    });
    $(".tbl" + seccionName + " tbody").empty().append(html);
}

window.editarVehiculos = function editarVehiculos(data){
    let item = JSON.parse(atob(data));
    let form = "#form" + item.seccionName  + " ";
    let modulo = "#modulo" + item.seccionName  + " ";
    window["funcionalidadGuardarRegistro" + item.seccionName](item.seccionNo, item.seccionName, modulo, "EDITAR", item.uuid);
    
    //cargar información del row seleccionado para editar.
    let nodo = jsonResult.declaracion.situacionPatrimonial.vehiculos.vehiculo[item.uuid];
    let titular="";
    $(nodo.titular).each(function(index, item) { titular+= item.clave + ";"; });   
    $(form + "select[name='titular']").val(titular.slice(0, -1)).trigger("change");    
    if(titular.slice(0,-1) !="DEC"){ 
        tercerosTemp = nodo.tercero; 
        pintarTablaVehiculosTerceros(); 
    }
    transmisoresTemp = nodo.transmisor;
    pintarTablaVehiculosTransmisores();

    $(form + "select[name='tipoOperacion']").val(nodo.tipoOperacion);
    
    $(form + "select[name='tipoVehiculo']").val(nodo.tipoVehiculo.clave).trigger("change");
    $(form + "input[name='tipoVehiculo_especifique']").val(nodo.tipoVehiculo.valor);

    $(form + "input[name='marca']").val(nodo.marca);
    $(form + "input[name='modelo']").val(nodo.modelo);
    $(form + "input[name='anio']").val(nodo.anio);
    $(form + "input[name='numeroSerieRegistro']").val(nodo.numeroSerieRegistro);
    $(form + "select[name='pais']").val(nodo.lugarRegistro.pais).trigger("change");
    $(form + "select[name='entidadFederativa']").val(nodo.lugarRegistro.entidadFederativa.clave);

    
    $(form + "select[name='formaAdquisicion']").val(nodo.formaAdquisicion.clave);
    $(form + "select[name='formaPago']").val(nodo.formaPago);        
    $(form + "input[name='valorAdquisicion']").val(nodo.valorAdquisicion.valor);
    $(form + "select[name='moneda']").val(nodo.valorAdquisicion.moneda);
    $(form + "input[name='fechaAdquisicion']").val(nodo.fechaAdquisicion);
    $(form + "select[name='motivoBaja']").val(nodo.motivoBaja.clave).trigger("change");
    $(form + "input[name='motivoBaja_especifique']").val(nodo.motivoBaja.valor);    
}

window.eliminarVehiculos = function eliminarVehiculos(data){
    var item = JSON.parse(atob(data));
    //elimina item en object json y tabla.
    delete jsonResult.declaracion.situacionPatrimonial.vehiculos.vehiculo[item.uuid];
    $("#" + item.uuid).remove();
    if (Object.keys(jsonResult.declaracion.situacionPatrimonial.vehiculos.vehiculo).length==0){
        $("#modulo" + item.seccionName + " .btnTerminar").addClass("hide");
    }
}


window.pintarTablaVehiculosTerceros = function pintarTablaVehiculosTerceros(){
    let html="";
    Object.keys(tercerosTemp).forEach(function (row) {        
        let datos = tercerosTemp[row];
        html+="<tr id='" + datos.uuid + "'>";
        html+=" <td>" + datos.tipoPersona +"</td>";
        html+=" <td>" + datos.nombreRazonSocial +"</td>";        
        html+=" <td>" + datos.rfc + "</td>";        
        html+=" <td class='text-right'>";
        html+="     <button class='btn btn-sm btn-danger btnEliminar' onclick='eliminarVehiculosTerceros(\"" + btoa(JSON.stringify(datos)) + "\");'>Eliminar</button>";              
        html+=" </td>";
        html+="</tr>";
    });
    $("#formVehiculos .tblTerceros tbody").empty().append(html);
}

window.eliminarVehiculosTerceros = function eliminarVehiculosTerceros(data){
    var item = JSON.parse(atob(data));
    //elimina item en object json y tabla.
    delete tercerosTemp[item.uuid];
    $("#" + item.uuid).remove();   
}


window.pintarTablaVehiculosTransmisores = function pintarTablaVehiculosTransmisores(){
    let html="";
    Object.keys(transmisoresTemp).forEach(function (row) {        
        let datos = transmisoresTemp[row];
        html+="<tr id='" + datos.uuid + "'>";
        html+=" <td>" + datos.tipoPersona +"</td>";
        html+=" <td>" + datos.nombreRazonSocial +"</td>";        
        html+=" <td>" + datos.rfc + "</td>";     
        html+=" <td>" + datos.relacion.valor + "</td>";        
        html+=" <td class='text-right'>";
        html+="     <button class='btn btn-sm btn-danger btnEliminar' onclick='eliminarVehiculosTransmisores(\"" + btoa(JSON.stringify(datos)) + "\");'>Eliminar</button>";              
        html+=" </td>";
        html+="</tr>";
    });
    $("#formVehiculos .tblTransmisores tbody").empty().append(html);
}

window.eliminarVehiculosTransmisores = function eliminarVehiculosTransmisores(data){
    var item = JSON.parse(atob(data));
    //elimina item en object json y tabla.
    delete transmisoresTemp[item.uuid];
    $("#" + item.uuid).remove();   
}