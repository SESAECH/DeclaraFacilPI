
window.initBienesInmuebles = function initBienesInmuebles(data){
    var seccion = JSON.parse(atob(data));
    var seccionName = seccion.moduloName.replace("modulo","");
    var form = "#form" + seccion.moduloName.replace("modulo", "")+ " ";
    var modulo = "#" + seccion.moduloName + " ";

    //validar status de la sección.
    switch(seccion.status){
        case "SIN_INFO":
            //asginar valores predeterminados a catálogos(ayuda al usuario).
            jsonResult.declaracion.situacionPatrimonial.bienesInmuebles.ninguno=true;
            $(modulo + ".chkNinguno").prop("disabled", false);
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


//pintar tabla html.
window.pintarTablaBienesInmuebles = function pintarTablaBienesInmuebles(seccionNo, seccionName){
    let html="";
    let lista = jsonResult.declaracion.situacionPatrimonial.bienesInmuebles.bienInmueble;
    Object.keys(lista).forEach(function (row) {
        var params = { uuid: lista[row].uuid, seccionNo: seccionNo, seccionName: seccionName };
        html+="<tr id='" + lista[row].uuid + "'>";
        html+=" <td>" + lista[row].tipoInmueble.valor + "</td>";
        html+=" <td>" + lista[row].titular[0].valor + "</td>";        
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
    $(form + "select[name='tipoOperacion']").val(nodo.tipoOperacion);
    $(form + "select[name='tipoInmueble']").val(nodo.tipoInmueble.clave);
    $(form + "select[name='nombre']").val(nodo.titular[0].clave);

    $(form + "input[name='porcentajePropiedad']").val(nodo.porcentajePropiedad);

    $(form + "input[name='superficieTerreno']").val(nodo.superficieTerreno.valor);
    $(form + "select[name='superficieTerreno_unidad']").val(nodo.superficieTerreno.unidad);
    $(form + "input[name='superficieConstruccion']").val(nodo.superficieConstruccion.valor);
    $(form + "select[name='superficieConstruccion_unidad']").val(nodo.superficieConstruccion.unidad);

    $(form + "input[name='tercero_tipoPersona']").val(nodo.tercero[0].tipoPersona);
    $(form + "input[name='tercero_nombreRazonSocial']").val(nodo.tertercero[0].nombreRazonSocial);
    $(form + "input[name='tercero_rfc']").val(nodo.tercero[0].rfc);

    $(form + "input[name='transmisor_tipoPersona']").val(nodo.transmisor[0].tipoPersona);
    $(form + "input[name='transmisor_nombreRazonSocial']").val(nodo.transmisor[0].nombreRazonSocial);
    $(form + "input[name='transmisor_rfc']").val(nodo.transmisor[0].rfc);
    $(form + "select[name='relacion']").val(nodo.transmisor[0].relacion);

    $(form + "select[name='formaAdquisicion']").val(nodo.formaAdquisicion.clave);
    $(form + "select[name='formaPago']").val(nodo.formaPago);

    $(form + "input[name='valorAdquisicion']").val(nodo.valorAdquisicion.valor);
    $(form + "select[name='moneda']").val(nodo.valorAdquisicion.moneda);
    $(form + "input[name='fechaAdquisicion']").val(nodo.fechaAdquisicion);
    $(form + "input[name='datoIdentificacion']").val(nodo.datoIdentificacion);
    $(form + "select[name='valorConformeA']").val(nodo.valorConformeA);
    $(form + "select[name='motivoBaja']").val(nodo.motivoBaja.clave);
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
    
    
          
    
    $(form + "#form" + item.seccionName + " select[name='actividadLaboral']").val(nodo.actividadLaboral.clave).change();
        
    $("#laboralDependientePubContent select[name='nivelOrdenGobierno']").val(nodo.actividadLaboralSectorPublico.nivelOrdenGobierno);
    $("#laboralDependientePubContent select[name='ambitoPublico']").val(nodo.actividadLaboralSectorPublico.ambitoPublico);
    $("#laboralDependientePubContent input[name='nombreEntePublico']").val(nodo.actividadLaboralSectorPublico.nombreEntePublico);
    $("#laboralDependientePubContent input[name='areaAdscripcion']").val(nodo.actividadLaboralSectorPublico.areaAdscripcion);
    $("#laboralDependientePubContent input[name='empleoCargoComision']").val(nodo.actividadLaboralSectorPublico.empleoCargoComision);
    $("#laboralDependientePubContent input[name='funcionPrincipal']").val(nodo.actividadLaboralSectorPublico.funcionPrincipal);
    $("#laboralDependientePubContent input[name='valor']").val(nodo.actividadLaboralSectorPublico.salarioMensualNeto.valor);
    $("#laboralDependientePubContent select[name='moneda']").val(nodo.actividadLaboralSectorPublico.salarioMensualNeto.moneda);
    $("#laboralDependientePubContent input[name='fechaIngreso']").val(nodo.actividadLaboralSectorPublico.fechaIngreso);

    $("#laboralDependientePriContent input[name='nombreEmpresaSociedadAsociacion']").val(nodo.actividadLaboralSectorPrivadoOtro.nombreEmpresaSociedadAsociacion);
    $("#laboralDependientePriContent input[name='empleoCargo']").val(nodo.actividadLaboralSectorPrivadoOtro.empleoCargo);
    $("#laboralDependientePriContent input[name='rfc']").val(nodo.actividadLaboralSectorPrivadoOtro.rfc);
    $("#laboralDependientePriContent input[name='fechaIngreso']").val(nodo.actividadLaboralSectorPrivadoOtro.fechaIngreso);
    $("#laboralDependientePriContent select[name='sector']").val(nodo.sector.clave);    
    $("#laboralDependientePriContent input[name='valor']").val(nodo.actividadLaboralSectorPrivadoOtro.salarioMensualNeto.valor);
    $("#laboralDependientePriContent select[name='moneda']").val(nodo.actividadLaboralSectorPrivadoOtro.salarioMensualNeto.moneda);
    $("#laboralDependientePriContent input[type='radio'][name='proveedorContratistaGobierno']").val(nodo.actividadLaboralSectorPrivadoOtro.proveedorContratistaGobierno);        
        //generales
    $("#form" + item.seccionName + " textarea[name='aclaracionesObservaciones']").val(nodo.aclaracionesObservaciones); 
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
    loadCat(tipoOperacion, ".CBOtipoOperacion");
    loadCat(tipoInmueble, ".CBOtipoInmueble");
    loadCat(titularBien, ".CBOtitular");
    loadCat(entidadFederativa, ".CBOentidadFederativa");    
    loadCat(paises, ".CBOpais");
    loadCat(unidadMedida, ".CBOunidad");
    loadCat(parentescoRelacion, ".CBOrelacion");
    loadCat(formaAdquisicion, ".CBOformaAdquisicion");
    loadCat(formaPago, ".CBOformaPago");
    
    loadCat(moneda, ".CBOmoneda");
    loadCat(lugarDondeReside, ".CBOlugarDondeReside");
    loadCat(valorConformeA, ".CBOvalorConformeA");
    loadCat(motivoBaja, ".CBOmotivoBaja");

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

    $(form + ".CBOmotivoBaja").on('change', function() {
        $(form + ".content_motivoBaja_especifique").addClass("hide");
        if ($(form + ".CBOmotivoBaja option:selected")[0].innerText =="OTRO"){
            $(form + ".content_motivoBaja_especifique").removeClass("hide");
            $(form + "input[name='motivoBaja_especifique']").val("");
        }
        else{
            $(form + "input[name='motivoBaja_especifique']").val($(form + ".CBOmotivoBaja option:selected")[0].innerText);
        }       
    });

    $(form + '.CBOubicacionInmueble').val("MX").trigger("change");
    $(form + "#ubicacionInmuebleMxContent").removeClass("hide");
    $(form + "#ubicacionInmuebleExContent").addClass("hide");
    $(form + ".CBOentidadFederativa").val("07").trigger("change");     
    $(form + "input[name='motivoBaja_especifique']").val($(form + ".CBOmotivoBaja option:selected")[0].innerText);
    $(form + '.CBOtipoPersona').val("FISICA")
    
    if(jsonResult.captura.tipo_declaracion == "INICIAL"){
        $(form + "select[name='tipoOperacion']").val("AGREGAR").prop("disabled", true);
    }

    $(form + ".btnCerrar").unbind("click");
    $(form + ".btnAgregar").unbind("click");

     //btn cerrar formulario.   
     $(form + ".btnCerrar").on('click',function() {
        $(modulo + ".formSecundario").addClass("hide");
        $(modulo + ".formPrincipal").removeClass("hide").addClass("animated fadeOut");
    }); 
    
/*     $("#form" + seccionName).validate({
        rules: {
            tipoOperacion : { required: true },
            nombre : { required: true, maxlength: 50 },
            primerApellido : { required: true },
            fechaNacimiento : { required: true },
            rfc : { required: true, minlength: 12, maxlength: 13 },
            curp : { required: true, minlength: 18, maxlength: 18 },
            lugarDondeReside : { required: true },
            calle : { required: true },
            numeroExterior : { required: true },
            coloniaLocalidad : { required: true },
            municipioAlcaldia : { required: true },
            entidadFederativa : { required: true },
            codigoPostal : { required: true, number: true, minlength: 5, maxlength: 5 },
            ciudadLocalidad : { required: true },
            estadoProvincia : { required: true },
            pais : { required: true },
            actividadLaboral : { required: true },
            nivelOrdenGobierno : { required: true },
            ambitoPublico : { required: true },
            nombreEntePublico : { required: true },
            areaAdscripcion : { required: true },
            empleoCargoComision : { required: true },
            funcionPrincipal : { required: true },
            salarioMensualNeto : { required: true, number: true },
            moneda : { required: true },
            fechaIngreso : { required: true },
            nombreEmpresaSociedadAsociacion : { required: true },
            sector : { required: true },
            proveedorContratistaGobierno : { required: true }           
        },
        messages: {
            tipoOperacion : { required: "Seleccione el tipo de operación." },
            nombre : { required: "Ingrese el nombre.", maxlength: "El máximo de caracteres es de 50." },
            primerApellido : { required: "Ingrese el primer apellido." },
            fechaNacimiento : { required: "Ingrese la fecha de nacimmiento." },
            rfc : { required: "Ingrese el RFC.", minlength: "El minimo de caracteres es de 12.", maxlength: "El máximo de caracteres es de 13." },
            curp : { required: "Ingrese la CURP.", minlength: "El mínimo de caracteres es de 18.", maxlength: "El máximo de caracteres es de 18." },
            lugarDondeReside : { required: "Seleccione el lugar donde reside." },
            calle : { required: "Ingrese la calle." },
            numeroExterior : { required: "Ingrese el número exterior." },
            coloniaLocalidad : { required: "Ingrese la colonia o localidad." },
            municipioAlcaldia : { required: "Seleccione el municipio o alcaldía." },
            entidadFederativa : { required: "Seleccione la entidad federativa." },
            codigoPostal : { required: "Ingrese el C.P.", number: "Solo se permiten caracteres numéricos.", minlength: "El mínimo de caracteres es de 5.", maxlength: "El máximo de caracteres es de 5." },
            ciudadLocalidad : { required: "Ingrese la ciudad o localidad." },
            estadoProvincia : { required: "Ingrese el estado o provincia." },
            pais : { required: "Seleccione el país." },
            actividadLaboral : { required: "Ingrese la activiad laboral." },
            nivelOrdenGobierno : { required: "Seleccione el orden de gobierno." },
            ambitoPublico : { required: "Seleccione el ámbito público." },
            nombreEntePublico : { required: "Ingrese el nombre del ente público." },
            areaAdscripcion : { required: "Ingrese el área de adscripción." },
            empleoCargoComision : { required: "Ingrese el empleo, cargo o comisión." },
            funcionPrincipal : { required: "Ingrese la función principal." },
            salarioMensualNeto : { required: "Ingrese el salario mensual neto.", number: "Solo se permiten caracteres numéricos." },
            moneda : { required: "Seleccione el tipo de moneda." },
            fechaIngreso : { required: "Ingrese la fecha de ingreso." },
            nombreEmpresaSociedadAsociacion : { required: "Ingrese el nombre de la empresa, sociedad o asociación." },
            sector : { required: "Seleccione el sector." },
            proveedorContratistaGobierno : { required: "Seleccione si es contratista de gobierno." }
        }
    }); */

    //btn agregar registro.
    $(form + ".btnAgregar").on('click',function() {
        if( $("#form" + seccionName).valid() ) {
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
    });
}


//guardar registro en el JsonResult.
window.guardarRegistroBienesInmuebles = function guardarRegistroBienesInmuebles(uuidItem, seccionNo, seccionName, modulo){    
    jsonResult.declaracion.situacionPatrimonial.bienesInmuebles.ninguno=false;
    jsonResult.declaracion.situacionPatrimonial.bienesInmuebles.aclaracionesObservaciones =  $(modulo + " textarea[name='aclaracionesObservaciones']").val();
    jsonResult.declaracion.situacionPatrimonial.bienesInmuebles.bienInmueble[uuidItem] =
    {
        "uuid": uuidItem,
        "tipoOperacion":    $("#form" + seccionName + " select[name='tipoOperacion'] option:selected").val(),
        "tipoInmueble": {
          "clave": $("#form" + seccionName + " select[name='tipoInmueble'] option:selected").val(),
          "valor": $("#form" + seccionName + " select[name='tipoInmueble'] option:selected")[0].innerText
        },
        "titular": [
          {
            "clave": $("#form" + seccionName + " select[name='titular'] option:selected").val(),
            "valor": $("#form" + seccionName + " select[name='titular'] option:selected")[0].innerText
          }
        ],
        "porcentajePropiedad": $("#form" + seccionName + " input[name='porcentajePropiedad']").val(),
        "superficieTerreno": {
          "valor": $("#form" + seccionName + " input[name='superficieTerreno']").val(),
          "unidad": $("#form" + seccionName + " select[name='superficieTerreno_unidad'] option:selected").val()
        },
        "superficieConstruccion": {
          "valor":  $("#form" + seccionName + " input[name='superficieConstruccion']").val(),
          "unidad": $("#form" + seccionName + " select[name='superficieConstruccion_unidad'] option:selected").val()
        },
        "tercero": [
          {
            "tipoPersona":      $("#form" + seccionName + " select[name='tercero_tipoPersona'] option:selected").val(),
            "nombreRazonSocial": $("#form" + seccionName + " input[name='tercero_nombreRazonSocial']").val(),
            "rfc":              $("#form" + seccionName + " input[name='tercero_rfc']").val(),
          }
        ],
        "transmisor": [
          {
            "tipoPersona":          $("#form" + seccionName + " select[name='transmisor_tipoPersona'] option:selected").val(),
            "nombreRazonSocial":    $("#form" + seccionName + " input[name='transmisor_nombreRazonSocial']").val(),
            "rfc":                  $("#form" + seccionName + " input[name='transmisor_rfc']").val(),
            "relacion": {
              "clave": $("#form" + seccionName + " select[name='relacion'] option:selected").val(),
              "valor": $("#form" + seccionName + " select[name='relacion'] option:selected")[0].innerText
            }
          }
        ],
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
        }
    };
    
    if ($(modulo + ".CBOubicacionInmueble option:selected").val()=="MX"){
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
        jsonResult.declaracion.situacionPatrimonial.bienesInmuebles.bienInmueble[uuidItem].domicilioExtranjero={
            "calle": "",
            "numeroExterior": "",
            "numeroInterior": "",
            "ciudadLocalidad": "",
            "estadoProvincia": "",
            "pais": "MX",
            "codigoPostal": ""
        };
    }
    else{
        jsonResult.declaracion.situacionPatrimonial.bienesInmuebles.bienInmueble[uuidItem].domicilioMexico={
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
        };
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
