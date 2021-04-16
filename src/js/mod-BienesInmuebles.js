var tercerosTemp={}, transmisoresTemp={};

window.initBienesInmuebles = function initBienesInmuebles(data){
    var seccion = JSON.parse(atob(data));
    var seccionName = seccion.moduloName.replace("modulo","");
    form = "#form" + seccion.moduloName.replace("modulo", "")+ " ";
    var modulo = "#" + seccion.moduloName + " ";
    
    //validar status de la sección.
    switch(seccion.status){
        case "SIN_INFO":
            //asginar valores predeterminados a catálogos(ayuda al usuario).
            jsonResult.declaracion.situacionPatrimonial.bienesInmuebles.ninguno=true;
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
            if (Object.keys(jsonResult.declaracion.situacionPatrimonial.bienesInmuebles.bienInmueble).length > 0){
                $(modulo + ".btnAgregar").removeClass("hide"); 
            }
            else{ $(modulo + ".btnAgregar").addClass("hide"); }
            break;
        case "TERMINADO":
            window["pintarTabla" + seccionName](seccion.no, seccionName);
            $(modulo + ".chkNinguno").prop("disabled", true);
            if (jsonResult.declaracion.situacionPatrimonial.bienesInmuebles.ninguno){
                $(modulo + ".chkNinguno")[0].checked=true;                
            }
            $(modulo + "textarea[name='aclaracionesObservaciones']").val(jsonResult.declaracion.situacionPatrimonial.bienesInmuebles.aclaracionesObservaciones).prop("disabled", true);
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
        jsonResult.declaracion.situacionPatrimonial.bienesInmuebles.aclaracionesObservaciones =  $(modulo + "textarea[name='aclaracionesObservaciones']").val();
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

//funcionalidad en boton agregar/actualizar registro.
window.funcionalidadGuardarRegistroBienesInmuebles = function funcionalidadGuardarRegistroBienesInmuebles(seccionNo, seccionName, modulo, accion, uuid=null){    
    var form = "#form" + seccionName + " ";
    //ocultar/mostrar formularios
    $(modulo + ".formPrincipal").addClass("animated fadeOut").addClass("hide");                      
    $(modulo + ".formSecundario").removeClass("hide").addClass("animated fadeIn");    
    $(form + ".titulo-seccion").text(accion + " REGISTRO");

    if (accion=="EDITAR"){
        $(form + ".btnAgregar").data("uuid", uuid);
        $(form + ".btnAgregar").html('<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check" viewBox="0 0 16 16"><path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z"/></svg> Actualizar');
    }

    $(form + ":input").val("");

    //catalogos que se usan en el modulo.
    loadCat(tipoOperacion, form + ".CBOtipoOperacion");
    loadCat(tipoInmueble, form + ".CBOtipoInmueble");
    loadCat(titulares, form + ".CBOtitular");
    loadCat(entidadFederativa, form + ".CBOentidadFederativa");    
    loadCat(paises, form + ".CBOpais");
    loadCat(unidadMedida, form + ".CBOunidad");
    loadCat(formaAdquisicion, form + ".CBOformaAdquisicion");
    loadCat(formaPago, form + ".CBOformaPago");
    loadCat(parentescoRelacion, form + ".CBOparentescoRelacion");   
    loadCat(moneda, form + ".CBOmoneda");
    loadCat(lugarDondeReside, form + ".CBOlugarDondeReside");
    loadCat(valorConformeA, form + ".CBOvalorConformeA");
    loadCat(motivoBaja, form + ".CBOmotivoBaja");
    loadCat(tipoPersona, form + ".CBOtipoPersona"); 

    $(form + '.CBOtitular').on('change', function() {
        $(".content_terceros").addClass("hide");
        let split = $(form + ".CBOtitular option:selected").val().split(";");
        if (split.length>1 || split[0] != "DEC"){
            $(".content_terceros").removeClass("hide");
        }                 
    });  

    $(form + ' .CBOtipoInmueble').on('change', function() {
        $(form + ".content_tipo_inmueble_especifique").addClass("hide");
        $(form + "input[name='especifique']").val($(form + "select[name='tipoInmueble'] option:selected")[0].innerText);
        if(this.value == "OTRO"){
            $(form + ".content_tipo_inmueble_especifique").removeClass("hide");
            $(form + "input[name='especifique']").val("");
        }
    });

    $(form + '.CBOrelacion').on('change', function() {
        $(form + ".content_relacion_transmisor_especifique").addClass("hide");
        $(form + ".content_relacion_transmisor_especifique input[name='especifique']").val($(form + "select[name='relacion'] option:selected")[0].innerText);
        if(this.value == "OTRO"){
            $(form + ".content_relacion_transmisor_especifique").removeClass("hide");
            $(form + ".content_relacion_transmisor_especifique input[name='especifique']").val("");
        }
    });
    
    $(form + '.CBOparentescoRelacion').on('change', function() {
        $(form + ".content_transmisor_relacion_especifique").addClass("hide");
        $(form + ".content_transmisor_relacion_especifique input[name='transmisor_relacion_especifique']").val($(form + '.CBOparentescoRelacion option:selected')[0].innerText);
        if(this.value == "OTRO"){
            $(form + ".content_transmisor_relacion_especifique").removeClass("hide");
            $(form + ".content_transmisor_relacion_especifique input[name='transmisor_relacion_especifique']").val("");
            $(form + '.CBOparentescoRelacion').val("ABU").trigger("change");
        }        
    });

    $(form + '.CBOubicacionInmueble').on('change', function() {
        $(form + ".contentUbicacionInmueble").addClass("hide");
        if(this.value == "MX"){
            $(form + "#ubicacionInmuebleMxContent").removeClass("hide");
        }
        else if(this.value == "EX"){
            $(form + "#ubicacionInmuebleExContent").removeClass("hide");
        }
    });

    $(form + ".CBOentidadFederativa").on('change', function() {
        loadMunicipios(form + ".CBOmunicipioAlcaldia", this.value);
    });

    $(form + '.CBOmotivoBaja').on('change', function() {
        $(form + ".content_motivoBaja_especifique").addClass("hide");
        $(form + ".content_motivoBaja_especifique input[name='motivoBaja_especifique']").val($(form + '.CBOmotivoBaja option:selected')[0].innerText);
        if(this.value == "OTRO"){
            $(form + ".content_motivoBaja_especifique").removeClass("hide");
            $(form + ".content_motivoBaja_especifique input[name='motivoBaja_especifique']").val("");
        }        
    });

    $(form + '.CBOtipoInmueble').val("CASA").trigger("change");
    $(form + '.CBOtitular').val("DEC")  .trigger("change");
    $(form + '.CBOubicacionInmueble').val("MX").trigger("change");
    $(form + "#ubicacionInmuebleMxContent").removeClass("hide");
    $(form + "#ubicacionInmuebleExContent").addClass("hide");
    $(form + ".CBOentidadFederativa").val("07").trigger("change");     
    $(form + '.CBOmotivoBaja').val("NA").trigger("change");
    $(form + '.CBOtipoPersona').val("FISICA")
    
    if(jsonResult.captura.tipo_declaracion == "INICIAL"){
        $(form + "select[name='tipoOperacion']").val("AGREGAR").prop("disabled", true);
    }

    tercerosTemp={};
    transmisoresTemp={};
    $("#formBienesInmuebles .tblTerceros tbody").empty();
    $("#formBienesInmuebles .tblTransmisores tbody").empty();

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
    
    //btn agregar registro.
    $(form + ".btnAgregar").on('click',function() {
        if( $("#form" + seccionName).valid() ) {
            let guardar=false;
            let split = $(form + ".CBOtitular  option:selected").val().split(";");
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
                guardarRegistroBienesInmuebles(uuidItem, seccionNo, seccionName, modulo);
                pintarTablaBienesInmuebles(seccionNo, seccionName);       
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
        else if($(form + ".content_terceros_nuevo input[name='rfc']").val().length==0){ mensajeSwal("Aviso","Ingresa el RFC del tercero.", "warning")}
        else{
            let uuid=generarUUID();
            tercerosTemp[uuid]={
                "uuid":                 uuid,
                "tipoPersona":          $(form + ".content_terceros_nuevo select[name='tipoPersona'] option:selected").val(),
                "nombreRazonSocial":    $(form + ".content_terceros_nuevo input[name='nombreRazonSocial']").val(),
                "rfc":                  $(form + ".content_terceros_nuevo input[name='rfc']").val(),
            };
            $(form + ".content_terceros_nuevo input[name='nombreRazonSocial']").val("");
            $(form + ".content_terceros_nuevo input[name='rfc']").val("");
            pintarTablaBienesInmueblesTerceros();
        }
    });

    $(form + ".btnAgregarTransmisor").on('click',function() {
        if($(form + ".content_transmisor_nuevo input[name='transmisor_nombreRazonSocial']").val().length==0){ mensajeSwal("Aviso","Ingresa el nombre/institución o razón social del transmisor.", "warning")}
        else if($(form + ".content_transmisor_nuevo input[name='transmisor_relacion_especifique']").val().length==0){ mensajeSwal("Aviso","Seleccione la relación del transmisor.", "warning")}
        else{
            let uuid=generarUUID();
            transmisoresTemp[uuid]={
                "uuid":                 uuid,
                "tipoPersona":          $(form + ".content_transmisor_nuevo select[name='transmisor_tipoPersona'] option:selected").val(),
                "nombreRazonSocial":    $(form + ".content_transmisor_nuevo input[name='transmisor_nombreRazonSocial']").val(),
                "rfc":                  $(form + ".content_transmisor_nuevo input[name='transmisor_rfc']").val(),
                "relacion": {
                    "clave": $(form + ".content_transmisor_nuevo select[name='transmisor_relacion'] option:selected").val(),
                    "valor": $(form + ".content_transmisor_nuevo input[name='transmisor_relacion_especifique']").val()
                  }
            };
            $(form + ".content_transmisor_nuevo input[name='transmisor_nombreRazonSocial']").val("");
            $(form + ".content_transmisor_nuevo input[name='transmisor_rfc']").val("");
            $(form + '.CBOparentescoRelacion').val("ABU").trigger("change");
            pintarTablaBienesInmueblesTransmisores();
        }
    });    
}

//guardar registro en el JsonResult.
window.guardarRegistroBienesInmuebles = function guardarRegistroBienesInmuebles(uuidItem, seccionNo, seccionName, modulo){    
    jsonResult.declaracion.situacionPatrimonial.bienesInmuebles.ninguno=false;
    jsonResult.declaracion.situacionPatrimonial.bienesInmuebles.aclaracionesObservaciones =  $(modulo + " textarea[name='aclaracionesObservaciones']").val().toUpperCase();
    let split = $(form + ".CBOtitular option:selected").val().split(";");
    let titulares=[];
    $(split).each(function(index, item) {
        titulares.push({clave: titularesApoyo[item].clave,valor:titularesApoyo[item].valor });
    });

    jsonResult.declaracion.situacionPatrimonial.bienesInmuebles.bienInmueble[uuidItem] =
    {
        "uuid": uuidItem,
        "tipoOperacion":    $("#form" + seccionName + " select[name='tipoOperacion'] option:selected").val(),
        "tipoInmueble": {
          "clave": $("#form" + seccionName + " select[name='tipoInmueble'] option:selected").val(),
          "valor": $("#form" + seccionName + " input[name='especifique']").val()
        },
        "titular": titulares,
        "porcentajePropiedad": $("#form" + seccionName + " input[name='porcentajePropiedad']").val(),
        "superficieTerreno": {
          "valor": $("#form" + seccionName + " input[name='superficieTerreno']").val(),
          "unidad": $("#form" + seccionName + " select[name='superficieTerreno_unidad'] option:selected").val()
        },
        "superficieConstruccion": {
          "valor":  $("#form" + seccionName + " input[name='superficieConstruccion']").val(),
          "unidad": $("#form" + seccionName + " select[name='superficieConstruccion_unidad'] option:selected").val()
        },
        "tercero": tercerosTemp,
        "transmisor": transmisoresTemp,
        "formaAdquisicion": {
          "clave": $("#form" + seccionName + " select[name='formaAdquisicion'] option:selected").val(),
          "valor": $("#form" + seccionName + " select[name='formaAdquisicion'] option:selected")[0].innerText
        },
        "formaPago": $("#form" + seccionName + " select[name='formaPago'] option:selected").val(),
        "valorAdquisicion": {
          "valor":  $("#form" + seccionName + " input[name='valorAdquisicion']").val(),
          "moneda": $("#form" + seccionName + " select[name='moneda'] option:selected").val()
        },
        "fechaAdquisicion":     $("#form" + seccionName + " input[name='fechaAdquisicion']").val(),
        "datoIdentificacion":   $("#form" + seccionName + " input[name='datoIdentificacion']").val(),
        "valorConformeA":       $("#form" + seccionName + " select[name='valorConformeA'] option:selected").val(),
        "motivoBaja": {
            "clave": $("#form" + seccionName + " select[name='motivoBaja'] option:selected").val(),
            "valor": $("#form" + seccionName + " input[name='motivoBaja_especifique']").val()
        },
        "ubicacionInmueble": $("#form" + seccionName + " .CBOubicacionInmueble option:selected").val()
    };
    
    if ($("#form" + seccionName + " .CBOubicacionInmueble option:selected").val()=="MX"){
        jsonResult.declaracion.situacionPatrimonial.bienesInmuebles.bienInmueble[uuidItem].domicilioMexico={
            "calle":              $("#ubicacionInmuebleMxContent input[name='calle']").val().toUpperCase(),
            "numeroExterior":     $("#ubicacionInmuebleMxContent input[name='numeroExterior']").val().toUpperCase(),
            "numeroInterior":     $("#ubicacionInmuebleMxContent input[name='numeroInterior']").val(),
            "coloniaLocalidad":   $("#ubicacionInmuebleMxContent input[name='coloniaLocalidad']").val().toUpperCase(),
            "municipioAlcaldia": {
                "clave":        $("#ubicacionInmuebleMxContent select[name='municipioAlcaldia'] option:selected").val(),
                "valor":        $("#ubicacionInmuebleMxContent select[name='municipioAlcaldia'] option:selected")[0].innerText
            },
            "entidadFederativa": {
                "clave":        $("#ubicacionInmuebleMxContent select[name='entidadFederativa'] option:selected").val(),
                "valor":        $("#ubicacionInmuebleMxContent select[name='entidadFederativa'] option:selected")[0].innerText
            },
            "codigoPostal":   $("#ubicacionInmuebleMxContent input[name='codigoPostal']").val()
        };
        /* jsonResult.declaracion.situacionPatrimonial.bienesInmuebles.bienInmueble[uuidItem].domicilioExtranjero={
            "calle": "",
            "numeroExterior": "",
            "numeroInterior": "",
            "ciudadLocalidad": "",
            "estadoProvincia": "",
            "pais": "MX",
            "codigoPostal": ""
        }; */
    }
    else{
        /* jsonResult.declaracion.situacionPatrimonial.bienesInmuebles.bienInmueble[uuidItem].domicilioMexico={
            "calle":              "",
            "numeroExterior":     "",
            "numeroInterior":     "",
            "coloniaLocalidad":   "",
            "municipioAlcaldia": {
                "clave":       "102",
                "valor":        "TUXTLA GUTIERREZ",
            },
            "entidadFederativa": {
                "clave":        "07",
                "valor":        "CHIAPAS",
            },
            "codigoPostal":   "",
        }; */
        jsonResult.declaracion.situacionPatrimonial.bienesInmuebles.bienInmueble[uuidItem].domicilioExtranjero={
            "calle":              $("#ubicacionInmuebleExContent input[name='calle']").val().toUpperCase(),
            "numeroExterior":     $("#ubicacionInmuebleExContent input[name='numeroExterior']").val().toUpperCase(),
            "numeroInterior":     $("#ubicacionInmuebleExContent input[name='numeroInterior']").val(),
            "ciudadLocalidad":    $("#ubicacionInmuebleExContent input[name='ciudadLocalidad']").val().toUpperCase(),
            "estadoProvincia":    $("#ubicacionInmuebleExContent input[name='estadoProvincia']").val().toUpperCase(),
            "pais":               $("#ubicacionInmuebleExContent select[name='pais'] option:selected").val(),
            "codigoPostal":       $("#ubicacionInmuebleExContent input[name='codigoPostal']").val()
        };        
    }
    //cambiar status a captura.
    jsonResult.captura.declaracion.situacionPatrimonial.secciones[seccionNo].status= "EN_PROCESO";
    $(".status-seccion-" + jsonResult.captura.declaracion.situacionPatrimonial.secciones[seccionNo].apartado + "-" + seccionNo).removeClass("indicador-status indicador-status-success").addClass("indicador-status-process").text("EN PROCESO");
}


//pintar tabla html.
window.pintarTablaBienesInmuebles = function pintarTablaBienesInmuebles(seccionNo, seccionName){
    let html="";
    let lista = jsonResult.declaracion.situacionPatrimonial.bienesInmuebles.bienInmueble;
    Object.keys(lista).forEach(function (row) {
        var params = { uuid: lista[row].uuid, seccionNo: seccionNo, seccionName: seccionName };
        let datos=lista[row];
        let titulares="";
        $(datos.titular).each(function(index, item) { titulares+= item.valor + ","; });
       
        html+="<tr id='" + datos.uuid + "'>";
        html+=" <td>" + titulares.slice(0, -1) +"</td>";
        html+=" <td>" + datos.tipoInmueble.valor + "</td>";
        html+=" <td>" + datos.valorConformeA + "</td>";
        html+=" <td class='text-right'>" + format(datos.valorAdquisicion.valor) + datos.valorAdquisicion.moneda + "</td>";        
        html+=" <td class='text-right'>";
        html+="     <button class='btn btn-sm btn-warning btnEditar' onclick='editarBienesInmuebles(\"" + btoa(JSON.stringify(params)) + "\");'>Editar</button>";
        html+="     <button class='btn btn-sm btn-danger btnEliminar' onclick='eliminarBienesInmuebles(\"" + btoa(JSON.stringify(params)) + "\");'>Eliminar</button>";              
        html+=" </td>";
        html+="</tr>";
    });
    $(".tbl" + seccionName + " tbody").empty().append(html);
}

window.editarBienesInmuebles = function editarBienesInmuebles(data){
    let item = JSON.parse(atob(data));
    let modulo = "#modulo" + item.seccionName  + " ";
    let form = "#formBienesInmuebles ";

    window["funcionalidadGuardarRegistro" + item.seccionName](item.seccionNo, item.seccionName, modulo, "EDITAR", item.uuid);
    
    //cargar información del row seleccionado para editar.
    var nodo = jsonResult.declaracion.situacionPatrimonial.bienesInmuebles.bienInmueble[item.uuid];
    let titular="";
    $(nodo.titular).each(function(index, item) { titular+= item.clave + ";"; });   
    $(form + "select[name='titular']").val(titular.slice(0, -1)).trigger("change");    
    if(titular.slice(0,-1) !="DEC"){ 
        tercerosTemp = nodo.tercero; 
        pintarTablaBienesInmueblesTerceros(); 
    }
    transmisoresTemp = nodo.transmisor;
    pintarTablaBienesInmueblesTransmisores();

    $(form + "select[name='tipoOperacion']").val(nodo.tipoOperacion);
    $(form + "select[name='tipoInmueble']").val(nodo.tipoInmueble.clave).trigger("change");
    //$(form + "select[name='nombre']").val(nodo.titular[0].clave);

    $(form + "input[name='porcentajePropiedad']").val(nodo.porcentajePropiedad);

    $(form + "input[name='superficieTerreno']").val(nodo.superficieTerreno.valor);
    $(form + "select[name='superficieTerreno_unidad']").val(nodo.superficieTerreno.unidad);
    $(form + "input[name='superficieConstruccion']").val(nodo.superficieConstruccion.valor);
    $(form + "select[name='superficieConstruccion_unidad']").val(nodo.superficieConstruccion.unidad);

    $(form + "select[name='formaAdquisicion']").val(nodo.formaAdquisicion.clave);
    $(form + "select[name='formaPago']").val(nodo.formaPago);

    $(form + "input[name='valorAdquisicion']").val(nodo.valorAdquisicion.valor);
    $(form + "select[name='moneda']").val(nodo.valorAdquisicion.moneda);
    $(form + "input[name='fechaAdquisicion']").val(nodo.fechaAdquisicion);
    $(form + "input[name='datoIdentificacion']").val(nodo.datoIdentificacion);
    $(form + "select[name='valorConformeA']").val(nodo.valorConformeA);
    $(form + "select[name='motivoBaja']").val(nodo.motivoBaja.clave).trigger("change");
    $(form + ".CBOubicacionInmueble").val(nodo.ubicacionInmueble).trigger("change");
    if(nodo.ubicacionInmueble=="MX"){        
        //domicilio mexico.
        $(form + "#ubicacionInmuebleMxContent input[name='calle']").val(nodo.domicilioMexico.calle);
        $(form + "#ubicacionInmuebleMxContent input[name='numeroExterior']").val(nodo.domicilioMexico.numeroExterior);
        $(form + "#ubicacionInmuebleMxContent input[name='numeroInterior']").val(nodo.domicilioMexico.numeroInterior);
        $(form + "#ubicacionInmuebleMxContent input[name='coloniaLocalidad']").val(nodo.domicilioMexico.coloniaLocalidad);
        $(form + "#ubicacionInmuebleMxContent select[name='entidadFederativa']").val(nodo.domicilioMexico.entidadFederativa.clave).change();
        $(form + "#ubicacionInmuebleMxContent select[name='municipioAlcaldia']").val(nodo.domicilioMexico.municipioAlcaldia.clave);    
        $(form + "#ubicacionInmuebleMxContent input[name='codigoPostal']").val(nodo.domicilioMexico.codigoPostal);
    }
    else{
        //domicilio extranjero
        $(form + "#ubicacionInmuebleExContent input[name='calle']").val(nodo.domicilioExtranjero.calle);
        $(form + "#domDependienteExContent input[name='numeroExterior']").val(nodo.domicilioExtranjero.numeroExterior);
        $(form + "#domDependienteExContent input[name='numeroInterior']").val(nodo.domicilioExtranjero.numeroInterior);
        $(form + "#domDependienteExContent input[name='ciudadLocalidad']").val(nodo.domicilioExtranjero.ciudadLocalidad);
        $(form + "#domDependienteExContent input[name='estadoProvincia']").val(nodo.domicilioExtranjero.estadoProvincia);
        $(form + "#domDependienteExContent select[name='pais']").val(nodo.domicilioExtranjero.pais);
        $(form + "#domDependienteExContent input[name='codigoPostal']").val(nodo.domicilioExtranjero.codigoPostal); 
    }
}

window.eliminarBienesInmuebles = function eliminarBienesInmuebles(data){
    var item = JSON.parse(atob(data));
    //elimina item en object json y tabla.
    delete jsonResult.declaracion.situacionPatrimonial.bienesInmuebles.bienInmueble[item.uuid];
    $("#" + item.uuid).remove();
    if (Object.keys(jsonResult.declaracion.situacionPatrimonial.bienesInmuebles.bienInmueble).length==0){
        $("#modulo" + item.seccionName + " .btnTerminar").addClass("hide");
    }
}




window.pintarTablaBienesInmueblesTerceros = function pintarTablaBienesInmueblesTerceros(){
    let html="";
    Object.keys(tercerosTemp).forEach(function (row) {        
        let datos = tercerosTemp[row];
        html+="<tr id='" + datos.uuid + "'>";
        html+=" <td>" + datos.tipoPersona +"</td>";
        html+=" <td>" + datos.nombreRazonSocial +"</td>";        
        html+=" <td>" + datos.rfc + "</td>";        
        html+=" <td class='text-right'>";
        html+="     <button class='btn btn-sm btn-danger btnEliminar' onclick='eliminarBienesInmueblesTerceros(\"" + btoa(JSON.stringify(datos)) + "\");'>Eliminar</button>";              
        html+=" </td>";
        html+="</tr>";
    });
    $("#formBienesInmuebles .tblTerceros tbody").empty().append(html);
}

window.eliminarBienesInmueblesTerceros = function eliminarBienesInmueblesTerceros(data){
    var item = JSON.parse(atob(data));
    //elimina item en object json y tabla.
    delete tercerosTemp[item.uuid];
    $("#" + item.uuid).remove();   
}


window.pintarTablaBienesInmueblesTransmisores = function pintarTablaBienesInmueblesTransmisores(){
    let html="";
    Object.keys(transmisoresTemp).forEach(function (row) {        
        let datos = transmisoresTemp[row];
        html+="<tr id='" + datos.uuid + "'>";
        html+=" <td>" + datos.tipoPersona +"</td>";
        html+=" <td>" + datos.nombreRazonSocial +"</td>";        
        html+=" <td>" + datos.rfc + "</td>";     
        html+=" <td>" + datos.relacion.valor + "</td>";        
        html+=" <td class='text-right'>";
        html+="     <button class='btn btn-sm btn-danger btnEliminar' onclick='eliminarBienesInmueblesTransmisores(\"" + btoa(JSON.stringify(datos)) + "\");'>Eliminar</button>";              
        html+=" </td>";
        html+="</tr>";
    });
    $("#formBienesInmuebles .tblTransmisores tbody").empty().append(html);
}

window.eliminarBienesInmueblesTransmisores = function eliminarBienesInmueblesTransmisores(data){
    var item = JSON.parse(atob(data));
    //elimina item en object json y tabla.
    delete transmisoresTemp[item.uuid];
    $("#" + item.uuid).remove();   
}