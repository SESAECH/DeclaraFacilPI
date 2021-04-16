window.initPrestamoOComodato = function initPrestamoOComodato(data){
    var seccion = JSON.parse(atob(data));
    var seccionName = seccion.moduloName.replace("modulo","");
    var form = "#form" + seccion.moduloName.replace("modulo", "")+ " ";
    var modulo = "#" + seccion.moduloName + " ";

    //validar status de la sección.
    switch(seccion.status){
        case "SIN_INFO":
            //asginar valores predeterminados a catálogos(ayuda al usuario).
            jsonResult.declaracion.situacionPatrimonial.prestamoOComodato.ninguno=true;
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
            if (Object.keys(jsonResult.declaracion.situacionPatrimonial.prestamoOComodato.prestamo).length > 0){
                $(modulo + ".btnAgregar").removeClass("hide");
            }
            else{
                $(modulo + ".btnAgregar").addClass("hide");
            }                     
            break;
        case "TERMINADO":
            window["pintarTabla" + seccionName](seccion.no, seccionName);
            $(modulo + ".chkNinguno").prop("disabled", true);
            if (jsonResult.declaracion.situacionPatrimonial.prestamoOComodato.ninguno){
                $(modulo + ".chkNinguno")[0].checked=true;                
            }
            $(modulo + "textarea[name='aclaracionesObservaciones']").val(jsonResult.declaracion.situacionPatrimonial.prestamoOComodato.aclaracionesObservaciones).prop("disabled", true);
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
        jsonResult.declaracion.situacionPatrimonial.prestamoOComodato.aclaracionesObservaciones =  $(modulo + "textarea[name='aclaracionesObservaciones']").val().toUpperCase();
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

window.funcionalidadGuardarRegistroPrestamoOComodato = function funcionalidadGuardarRegistroPrestamoOComodato(seccionNo, seccionName, modulo, accion, uuid=null){
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
    loadCat(tipoPersona, form + ".CBOtipoDuenoTitular");
    loadCat(entidadFederativa, form + ".CBOentidadFederativa");    
    loadCat(paises, form + ".CBOpais");
    loadCat(moneda, form + ".CBOmoneda");
    loadCat(tipoVehiculo, form + ".CBOtipoVehiculo");
    loadCat(tipoInmueble, form + ".CBOtipoInmueble");
    

    $(form + '.CBOtipoBien').on('change', function() {
        $(".contentPrestamoOComodato_tipoBien").addClass("hide");
        if(this.value == "INM"){
            $("#contentPrestamoOComodato_tipoBien_inmueble").removeClass("hide");
        }
        else if(this.value == "VEH"){
            $("#contentPrestamoOComodato_tipoBien_vehiculo").removeClass("hide");
        }
    });

    $(form + '.rdDomicilio').click(function(){
        if(this.id =="domicilioMXPrestamoOComodato"){
            $(form + "#domMexico").removeClass("hide");
            $(form + "#domExtranjero").addClass("hide");            
        }
        else{ 
            $(form + "#domExtranjero").removeClass("hide");
            $(form + "#domMexico").addClass("hide");
        }
    });

    $(form + "#contentPrestamoOComodato_tipoBien_inmueble .CBOentidadFederativa").on('change', function() {
        loadMunicipios(form + ".CBOmunicipioAlcaldia", this.value);
    });        
    
    $(form + ":input[type='text']").val("");
    if(jsonResult.captura.tipo_declaracion == "INICIAL"){
        $("#form" + seccionName + " select[name='tipoOperacion']").val("AGREGAR").prop("disabled", true);
    }    
    $(form + '.CBOtipoBien').val("INM").trigger("change");
    $(form + '#domicilioMXPrestamoOComodato').prop("checked", true);
    $(form + "#domMexico").removeClass("hide");
    $(form + "#domExtranjero").addClass("hide");   
    $(form + ".CBOentidadFederativa").val("07").trigger("change");
    $(form + ".CBOpais").val("AF");
    $(form + ".CBOtipoInmueble").val("CASA");
    $(form + "#contentPrestamoOComodato_tipoBien_inmueble input[name='especifique']").val($(form + '.CBOtipoInmueble option:selected')[0].innerText);
    $("#contentPrestamoOComodato_tipoBien_inmueble .tipo_inmueble_especifique").addClass("hide");

    $(form + "#contentPrestamoOComodato_tipoBien_vehiculo .CBOpais").val("MX");
    $("#contentPrestamoOComodato_tipoBien_vehiculo .ent_fed").removeClass("hide");
    $(form + '.CBOtipoVehiculo').val("AUMOT");
    $(form + "#contentPrestamoOComodato_tipoBien_vehiculo input[name='especifique']").val($(form + '.CBOtipoVehiculo option:selected')[0].innerText);
    $("#contentPrestamoOComodato_tipoBien_vehiculo .tipo_vehiculo_especifique").addClass("hide");
    $(form + ".CBOtipoDuenoTitular").val("FISICA");

    $(form + '.CBOtipoInmueble').on('change', function() {
        $("#contentPrestamoOComodato_tipoBien_inmueble .tipo_inmueble_especifique").addClass("hide");
        $(form + "#contentPrestamoOComodato_tipoBien_inmueble input[name='especifique']").val($(form + '.CBOtipoInmueble option:selected')[0].innerText);
        if(this.value == "OTRO"){
            $("#contentPrestamoOComodato_tipoBien_inmueble .tipo_inmueble_especifique").removeClass("hide");
            $(form + "#contentPrestamoOComodato_tipoBien_inmueble input[name='especifique']").val("");
        }        
    });

    $(form + '.CBOtipoVehiculo').on('change', function() {
        $("#contentPrestamoOComodato_tipoBien_vehiculo .tipo_vehiculo_especifique").addClass("hide");
        $(form + "#contentPrestamoOComodato_tipoBien_vehiculo input[name='especifique']").val($(form + '.CBOtipoVehiculo option:selected')[0].innerText);
        if(this.value == "OTRO"){
            $("#contentPrestamoOComodato_tipoBien_vehiculo .tipo_vehiculo_especifique").removeClass("hide");
            $(form + "#contentPrestamoOComodato_tipoBien_vehiculo input[name='especifique']").val("");
        }        
    });
    $(form + '#contentPrestamoOComodato_tipoBien_vehiculo .CBOpais').on('change', function() {
        $("#contentPrestamoOComodato_tipoBien_vehiculo .ent_fed").addClass("hide");        
        if(this.value == "MX"){
            $("#contentPrestamoOComodato_tipoBien_vehiculo .ent_fed").removeClass("hide");
        }
    });

    $("#form" + seccionName).validate().resetForm();
    
    $(form + ".btnCerrar").unbind("click");
    $(form + ".btnAgregar").unbind("click");

     //btn cerrar formulario.   
     $(form + ".btnCerrar").on('click',function() {
        $(modulo + ".formSecundario").addClass("hide");
        $(modulo + ".formPrincipal").removeClass("hide").addClass("animated fadeOut");
    }); 
    //validate
    
    //btn guardar.
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

window.guardarRegistroPrestamoOComodato = function guardarRegistroPrestamoOComodato(uuidItem, seccionNo, seccionName, modulo){    
    var form="#form" + seccionName + " ";
    jsonResult.declaracion.situacionPatrimonial.prestamoOComodato.ninguno=false;
    jsonResult.declaracion.situacionPatrimonial.prestamoOComodato.aclaracionesObservaciones =  $(modulo + " textarea[name='aclaracionesObservaciones']").val();
    jsonResult.declaracion.situacionPatrimonial.prestamoOComodato.prestamo[uuidItem] =
    {
        "uuid": uuidItem,
        "tipoOperacion":        $(form + "select[name='tipoOperacion'] option:selected").val(),
        "duenoTitular": {
          "tipoDuenoTitular":   $(form + "select[name='tipoDuenoTitular'] option:selected").val(),
          "nombreTitular":      $(form + "input[name='nombreTitular'] ").val(),
          "rfc":                $(form + "input[name='rfc']").val(),
          "relacionConTitular": $(form + "input[name='relacionConTitular']").val(),
        }
      };

      if ($(form + "select[name='tipoBien'] option:selected").val()=="INM"){
        if($(form + 'input:radio[name=domicilio]:checked')[0].id =="domicilioMXPrestamoOComodato"){
            jsonResult.declaracion.situacionPatrimonial.prestamoOComodato.prestamo[uuidItem].tipoBien={
                "inmueble": {
                    "tipoInmueble": {
                      "clave": $(form + "#contentPrestamoOComodato_tipoBien_inmueble select[name='tipoInmueble'] option:selected").val(),
                      "valor": $(form + "#contentPrestamoOComodato_tipoBien_inmueble select[name='tipoInmueble'] option:selected")[0].innerText,
                    },
                    "domicilioMexico": {
                      "calle":              $(form + "#contentPrestamoOComodato_tipoBien_inmueble #domMexico input[name='calle']").val(),
                      "numeroExterior":     $(form + "#contentPrestamoOComodato_tipoBien_inmueble #domMexico input[name='numeroExterior']").val(),
                      "numeroInterior":     $(form + "#contentPrestamoOComodato_tipoBien_inmueble #domMexico input[name='numeroInterior']").val(),
                      "coloniaLocalidad":   $(form + "#contentPrestamoOComodato_tipoBien_inmueble #domMexico input[name='coloniaLocalidad']").val(),
                      "municipioAlcaldia": {
                        "clave":            $(form + "#contentPrestamoOComodato_tipoBien_inmueble #domMexico select[name='municipioAlcaldia'] option:selected").val(),
                        "valor":            $(form + "#contentPrestamoOComodato_tipoBien_inmueble #domMexico select[name='municipioAlcaldia'] option:selected")[0].innerText,
                      },
                      "entidadFederativa": {
                        "clave":            $(form + "#contentPrestamoOComodato_tipoBien_inmueble #domMexico select[name='entidadFederativa'] option:selected").val(),
                        "valor":            $(form + "#contentPrestamoOComodato_tipoBien_inmueble #domMexico select[name='entidadFederativa'] option:selected")[0].innerText,
                      },
                      "codigoPostal":       $(form + "#contentPrestamoOComodato_tipoBien_inmueble #domMexico input[name='codigoPostal']").val(),
                    }
                }            
            };
        }
        else{
            jsonResult.declaracion.situacionPatrimonial.prestamoOComodato.prestamo[uuidItem].tipoBien={
                "inmueble": {
                    "tipoInmueble": {
                        "clave": $(form + "#contentPrestamoOComodato_tipoBien_inmueble select[name='tipoInmueble'] option:selected").val(),
                        "valor": $(form + "#contentPrestamoOComodato_tipoBien_inmueble select[name='tipoInmueble'] option:selected")[0].innerText,
                    },
                    "domicilioExtranjero": {
                      "calle":              $(form + "#contentPrestamoOComodato_tipoBien_inmueble #domExtranjero input[name='calle']").val(),
                      "numeroExterior":     $(form + "#contentPrestamoOComodato_tipoBien_inmueble #domExtranjero input[name='numeroExterior']").val(),
                      "numeroInterior":     $(form + "#contentPrestamoOComodato_tipoBien_inmueble #domExtranjero input[name='numeroInterior']").val(),
                      "ciudadLocalidad":    $(form + "#contentPrestamoOComodato_tipoBien_inmueble #domExtranjero input[name='ciudadLocalidad']").val(),
                      "estadoProvincia":    $(form + "#contentPrestamoOComodato_tipoBien_inmueble #domExtranjero input[name='estadoProvincia']").val(),
                      "pais":               $(form + "#contentPrestamoOComodato_tipoBien_inmueble #domExtranjero select[name='pais'] option:selected").val(),
                      "codigoPostal":       $(form + "#contentPrestamoOComodato_tipoBien_inmueble #domExtranjero input[name='codigoPostal']").val(),
                    }
                  }            
            };
        }        
      }
      else if ($(form + " select[name='tipoBien'] option:selected").val()=="VEH"){
        jsonResult.declaracion.situacionPatrimonial.prestamoOComodato.prestamo[uuidItem].tipoBien={
            "vehiculo": {
                "tipo": {
                  "clave": $(form + "#contentPrestamoOComodato_tipoBien_vehiculo select[name='tipo'] option:selected").val(),
                  "valor": $(form + "#contentPrestamoOComodato_tipoBien_vehiculo input[name='especifique']").val(),
                },
                "marca":    $(form + "#contentPrestamoOComodato_tipoBien_vehiculo input[name='marca']").val(),
                "modelo":   $(form + "#contentPrestamoOComodato_tipoBien_vehiculo input[name='modelo']").val(),
                "anio":     $(form + "#contentPrestamoOComodato_tipoBien_vehiculo input[name='anio']").val(),
                "numeroSerieRegistro":$(form + "#contentPrestamoOComodato_tipoBien_vehiculo input[name='numeroSerieRegistro']").val(),
                "lugarRegistro": {
                  "pais":   $(form + "#contentPrestamoOComodato_tipoBien_vehiculo select[name='pais'] option:selected").val(),
                  "entidadFederativa": {
                    "clave": $(form + "#contentPrestamoOComodato_tipoBien_vehiculo select[name='entidadFederativa'] option:selected").val(),
                    "valor": $(form + "#contentPrestamoOComodato_tipoBien_vehiculo select[name='entidadFederativa'] option:selected")[0].innerText,
                    }
                }
            }
        };
      }

    //cambiar status a captura.
    jsonResult.captura.declaracion.situacionPatrimonial.secciones[seccionNo].status= "EN_PROCESO";
    $(".status-seccion-" + jsonResult.captura.declaracion.situacionPatrimonial.secciones[seccionNo].apartado + "-" + seccionNo).removeClass("indicador-status indicador-status-success").addClass("indicador-status-process").text("EN PROCESO");
}

window.pintarTablaPrestamoOComodato = function pintarTablaPrestamoOComodato(seccionNo, seccionName){
    let html="";
    let lista = jsonResult.declaracion.situacionPatrimonial.prestamoOComodato.prestamo;
    Object.keys(lista).forEach(function (row) {
        var params = { uuid: lista[row].uuid, seccionNo: seccionNo, seccionName: seccionName };
        let tipo="",datos="";
        if (Object.keys(lista[row].tipoBien)[0]=="inmueble"){
            tipo="INMUEBLE";
            datos=lista[row].tipoBien.inmueble.tipoInmueble.valor;
        }
        else{
            tipo="VEHICULO";
            datos= lista[row].tipoBien.vehiculo.tipo.valor + " / " + lista[row].tipoBien.vehiculo.marca  + " / " + lista[row].tipoBien.vehiculo.modelo;
        }

        html+="<tr id='" + lista[row].uuid + "'>";
        html+=" <td>" + tipo +"</td>";
        html+=" <td>" + datos +"</td>";        
        html+=" <td>" + lista[row].duenoTitular.nombreTitular + "</td>";        
        html+=" <td class='text-right'>";
        html+="     <button class='btn btn-sm btn-warning btnEditar' onclick='editarPrestamoOComodato(\"" + btoa(JSON.stringify(params)) + "\");'>Editar</button>";
        html+="     <button class='btn btn-sm btn-danger btnEliminar' onclick='eliminarPrestamoOComodato(\"" + btoa(JSON.stringify(params)) + "\");'>Eliminar</button>";              
        html+=" </td>";
        html+="</tr>";
    });
    $(".tbl" + seccionName + " tbody").empty().append(html);
}


window.editarPrestamoOComodato = function editarPrestamoOComodato(data){
    let item = JSON.parse(atob(data));
    let form = "#form" + item.seccionName  + " ";
    let modulo = "#modulo" + item.seccionName  + " ";
    window["funcionalidadGuardarRegistro" + item.seccionName](item.seccionNo, item.seccionName, modulo, "EDITAR", item.uuid);
    
    //cargar información del row seleccionado para editar.
    var nodo = jsonResult.declaracion.situacionPatrimonial.prestamoOComodato.prestamo[item.uuid];
    
    $(form + "select[name='tipoOperacion']").val(nodo.tipoOperacion);    
    $(form + "select[name='tipoDuenoTitular']").val(nodo.duenoTitular.tipoDuenoTitular);
    $(form + "input[name='nombreTitular'] ").val(nodo.duenoTitular.nombreTitular);
    $(form + "input[name='rfc']").val(nodo.duenoTitular.rfc);
    $(form + "input[name='relacionConTitular']").val(nodo.duenoTitular.relacionConTitular);
    
    if(Object.keys(nodo.tipoBien)[0]=="inmueble"){
        $(form + ".CBOtipoBien").val("INM").trigger("change");
        $(form + "#contentPrestamoOComodato_tipoBien_inmueble select[name='tipoInmueble']").val(nodo.tipoBien.inmueble.tipoInmueble.clave).trigger("change");
        if(Object.keys(nodo.tipoBien.inmueble).indexOf("domicilioMexico")>-1){
            $(form + '#domicilioMXPrestamoOComodato').prop("checked", true);
            $("#contentPrestamoOComodato_tipoBien_inmueble #domExtranjero").addClass("hide");
            $("#contentPrestamoOComodato_tipoBien_inmueble #domMexico").removeClass("hide");
            $(form + "#contentPrestamoOComodato_tipoBien_inmueble #domMexico input[name='calle']").val(nodo.tipoBien.inmueble.domicilioMexico.calle);
            $(form + "#contentPrestamoOComodato_tipoBien_inmueble #domMexico input[name='numeroExterior']").val(nodo.tipoBien.inmueble.domicilioMexico.numeroExterior);
            $(form + "#contentPrestamoOComodato_tipoBien_inmueble #domMexico input[name='numeroInterior']").val(nodo.tipoBien.inmueble.domicilioMexico.numeroInterior);
            $(form + "#contentPrestamoOComodato_tipoBien_inmueble #domMexico input[name='coloniaLocalidad']").val(nodo.tipoBien.inmueble.domicilioMexico.coloniaLocalidad);
            $(form + "#contentPrestamoOComodato_tipoBien_inmueble #domMexico select[name='municipioAlcaldia']").val(nodo.tipoBien.inmueble.domicilioMexico.municipioAlcaldia.clave);
            $(form + "#contentPrestamoOComodato_tipoBien_inmueble #domMexico select[name='entidadFederativa']").val(nodo.tipoBien.inmueble.domicilioMexico.entidadFederativa.clave);            
            $(form + "#contentPrestamoOComodato_tipoBien_inmueble #domMexico input[name='codigoPostal']").val(nodo.tipoBien.inmueble.domicilioMexico.codigoPostal);            
        }
        else{
            $(form + '#domicilioEXTPrestamoOComodato').prop("checked", true);
            $("#contentPrestamoOComodato_tipoBien_inmueble #domMexico").addClass("hide");
            $("#contentPrestamoOComodato_tipoBien_inmueble #domExtranjero").removeClass("hide");
            $(form + "#contentPrestamoOComodato_tipoBien_inmueble #domExtranjero input[name='calle']").val(nodo.tipoBien.inmueble.domicilioExtranjero.calle);
            $(form + "#contentPrestamoOComodato_tipoBien_inmueble #domExtranjero input[name='numeroExterior']").val(nodo.tipoBien.inmueble.domicilioExtranjero.numeroExterior);
            $(form + "#contentPrestamoOComodato_tipoBien_inmueble #domExtranjero input[name='numeroInterior']").val(nodo.tipoBien.inmueble.domicilioExtranjero.numeroInterior);
            $(form + "#contentPrestamoOComodato_tipoBien_inmueble #domExtranjero input[name='ciudadLocalidad']").val(nodo.tipoBien.inmueble.domicilioExtranjero.ciudadLocalidad);
            $(form + "#contentPrestamoOComodato_tipoBien_inmueble #domExtranjero input[name='estadoProvincia']").val(nodo.tipoBien.inmueble.domicilioExtranjero.estadoProvincia);
            $(form + "#contentPrestamoOComodato_tipoBien_inmueble #domExtranjero select[name='pais']").val(nodo.tipoBien.inmueble.domicilioExtranjero.pais);
            $(form + "#contentPrestamoOComodato_tipoBien_inmueble #domExtranjero input[name='codigoPostal']").val(nodo.tipoBien.inmueble.domicilioExtranjero.codigoPostal);            
        }
    }
    else if(Object.keys(nodo.tipoBien)[0]=="vehiculo"){
        $(form + ".CBOtipoBien").val("VEH").trigger("change");
        $(form + "#contentPrestamoOComodato_tipoBien_vehiculo select[name='tipo']").val(nodo.tipoBien.vehiculo.tipo.clave).trigger("change");
        $(form + "#contentPrestamoOComodato_tipoBien_vehiculo input[name='especifique']").val(nodo.tipoBien.vehiculo.tipo.valor);
        $(form + "#contentPrestamoOComodato_tipoBien_vehiculo input[name='marca']").val(nodo.tipoBien.vehiculo.marca);
        $(form + "#contentPrestamoOComodato_tipoBien_vehiculo input[name='modelo']").val(nodo.tipoBien.vehiculo.modelo);
        $(form + "#contentPrestamoOComodato_tipoBien_vehiculo input[name='anio']").val(nodo.tipoBien.vehiculo.anio);
        $(form + "#contentPrestamoOComodato_tipoBien_vehiculo input[name='numeroSerieRegistro']").val(nodo.tipoBien.vehiculo.numeroSerieRegistro);
        $(form + "#contentPrestamoOComodato_tipoBien_vehiculo select[name='pais']").val(nodo.tipoBien.vehiculo.lugarRegistro.pais);
        $(form + "#contentPrestamoOComodato_tipoBien_vehiculo select[name='entidadFederativa']").val(nodo.tipoBien.vehiculo.lugarRegistro.entidadFederativa.clave);
    }                       
}

window.eliminarPrestamoOComodato = function eliminarPrestamoOComodato(data){
    var item = JSON.parse(atob(data));
    //elimina item en object json y tabla.
    delete jsonResult.declaracion.situacionPatrimonial.prestamoOComodato.prestamo[item.uuid];
    $("#" + item.uuid).remove();
    if (Object.keys(jsonResult.declaracion.situacionPatrimonial.prestamoOComodato.prestamo).length==0){
        $("#modulo" + item.seccionName + " .btnTerminar").addClass("hide");
    }
}