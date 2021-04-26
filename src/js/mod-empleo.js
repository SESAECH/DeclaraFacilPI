
window.initEmpleoCargoComision = function initEmpleoCargoComision(data){
    var seccion = JSON.parse(atob(data));
    var seccionName = seccion.moduloName.replace("modulo","");
    var form = "#form" + seccion.moduloName.replace("modulo", "")+ " ";
    var modulo = "#" + seccion.moduloName + " ";

    //cargar catalogos.
    loadCat(tipoOperacion, form + ".CBOtipoOperacion");
    loadCat(nivelOrdenGobierno, form + ".CBOnivelOrdenGobierno");
    loadCat(ambitoPublico, form + ".CBOambitoPublico");
    loadCat(trueFalse, form + ".CBOcontratadoPorHonorarios");
    loadCat(entidadFederativa, form + ".CBOentidadFederativa");
    loadCat(paises, form + ".CBOpais");

    $(form + ".CBOentidadFederativa").on('change', function() {
        loadMunicipios(form + ".CBOmunicipioAlcaldia", this.value);
    });
        if(jsonResult.captura.tipo_declaracion == "INICIAL"){
            $(form + "select[name='tipoOperacion']").val("AGREGAR").prop("disabled", true);
        }
        if(jsonResult.captura.tipo_declaracion == "INTERESES"){
        $(form + "select[name='tipoOperacion']").val("SIN_CAMBIOS").prop("disabled", true);
    }
    $(form + '.rdDomicilio').click(function(){
        if(this.id =="domicilioEmpMX"){
            $(form + "#domEmpMexico").removeClass("hide");
            $(form + "#domEmpExtranjero").addClass("hide");
            jsonResult.declaracion.situacionPatrimonial.datosEmpleoCargoComision.domicilio="MX";
        }
        else{ 
            $(form + "#domEmpExtranjero").removeClass("hide");
            $(form + "#domEmpMexico").addClass("hide");
            jsonResult.declaracion.situacionPatrimonial.datosEmpleoCargoComision.domicilio="EXT";
        }
    });

    //validar status de la sección.
    switch(seccion.status){
        case "SIN_INFO": 
            //asginar valores predeterminados a catálogos(ayuda al usuario).
            $(form + "#domicilioEmpMX").prop("checked", true);
            $(form + "#domEmpMexico").removeClass("hide");
            $(form + "domEmpExtranjero").addClass("hide");
            $(form + ".CBOpais").val("MX");
            $(form + ".CBOentidadFederativa").val("07").change();
            $(form + ".btnGuardar").removeClass("hide");
            $(form + ".btnTerminar").removeClass("hide");
            $(modulo + ".btnHabilitar").addClass("hide");
        break;
        case "EN_PROCESO":
            //cargar información guardada previamente.
            window["loadInfo" + seccionName](form);
            $(form + ".btnGuardar").removeClass("hide");
            $(form + ".btnTerminar").removeClass("hide");
            $(modulo + ".btnHabilitar").addClass("hide");
            break;
        case "TERMINADO":
            //cargar información guardada previamente.
            window["loadInfo" + seccionName](form);           
            $(form + ":input").prop("disabled", true);

            $(form + ".btnGuardar").addClass("hide");
            $(form + ".btnTerminar").addClass("hide");
            $(modulo + ".btnHabilitar").removeClass("hide").prop("disabled", false);
        break;
    }

    //funcionalidad a buttons
    $(form + ".btnGuardar").unbind("click");
    $(form + ".btnTerminar").unbind("click");
    $(modulo + ".btnHabilitar").unbind("click");

    $(form + ".btnGuardar").on('click',function() {
        window["guardarForm" + seccionName](seccion.no, seccionName, seccion.apartado);
    });
    $(form + ".btnTerminar").on('click',function() {
        window["guardarForm" + seccionName](seccion.no, seccionName, seccion.apartado);        
    });    
    $(modulo + ".btnHabilitar").on('click',function() {
        habilitarSeccion(seccion.apartado, seccion.no, seccionName);
    });
    $(".content_seccion").addClass("hide");
    $("#" + seccion.moduloName).removeClass("hide");
}

window.guardarFormEmpleoCargoComision = function guardarFormEmpleoCargoComision(seccionNo, seccionName,  seccionApartado){    
    var formulario = "#form" + seccionName + " ";
    $(formulario).validate({
        rules: {
            nivelOrdenGobierno : { required: true },
            ambitoPublico : { required: true },
            nombreEntePublico : { required: true },
            areaAdscripcion : { required: true },
            empleoCargoComision : { required: true },
            contratadoPorHonorarios : { required: true },
            nivelEmpleoCargoComision : { required: true },
            funcionPrincipal : { required: true },
            fechaTomaPosesion : { required: true },
            telefono : { required: true, number: true, minlength: 10, maxlength: 10 },
            entidadFederativa : { required: true },
            municipioAlcaldia : { required: true },
            calle : { required: true },
            numeroExterior : { required: true },
            coloniaLocalidad : { required: true },
            codigoPostal : { required: true, number: true, minlength: 5, maxlength: 5 },
            ciudadLocalidad : { required: true },
            estadoProvincia : { required: true },
            pais : { required: true }
        },
        messages: {
            nivelOrdenGobierno : { required: "Seleccione el orden de gobierno." },
            ambitoPublico : { required: "Seleccione el ámbito público." },
            nombreEntePublico: { required: "Ingrese el nombre del ente público."},
            areaAdscripcion : { required: "Ingrese el área de adscripción." },
            empleoCargoComision: { required: "Ingrese el empleo, cargo o comisión." },
            contratadoPorHonorarios : { required: "Seleccione si o no está contratado por honorarios." },
            nivelEmpleoCargoComision : { required: "Ingrese el nivel del empleo, cargo o comisión." },
            funcionPrincipal : { required : "Ingrese la función principal." },
            fechaTomaPosesion : { required: "Ingrese la fecha de posesión."},
            telefono : { required: "Ingrese el número telefónico de oficina", number: "Solo se permiten caracteres numéricos.", minlength: "El mínimo de caracteres es de 10", maxlength: "El máximo de caracteres es de 10." },
            entidadFederativa: { required: "Seleccione la entidad federativa." },
            municipioAlcaldia: { required: "Seleccione el municipio o alcaldía." },
            calle: { required: "Ingrese la calle." },
            numeroExterior : { required: "Ingrese el número exterior." },
            coloniaLocalidad : { required: "Ingrese la colonia o localidad." },
            codigoPostal : { required: "Ingrese el C.P.", number: "Solo se permiten caracteres numéricos.", minlength: "El mínimo de caracteres es de 5.", maxlength: "El máximo de caracteres es de 5." },
            ciudadLocalidad : { required: "Ingrese la ciudad o localidad." },
            estadoProvincia : { required: "Ingrese el estado o provincia." },
            pais : { required: "Selecione el país." }
        },
        // Make sure the form is submitted to the destination defined
        // in the "action" attribute of the form when valid
        submitHandler: function(form, btn) {
            var root = jsonResult.declaracion.situacionPatrimonial.datosEmpleoCargoComision;
            let honorarios = $(formulario + "select[name='contratadoPorHonorarios'] option:selected").val() =="false" ? false: true;
            root.tipoOperacion =                $(formulario + "select[name='tipoOperacion'] option:selected").val();
            root.nivelOrdenGobierno =           $(formulario + "select[name='nivelOrdenGobierno'] option:selected").val();
            root.ambitoPublico =                $(formulario + "select[name='ambitoPublico'] option:selected").val();
            root.nombreEntePublico =            $(formulario + "input[name='nombreEntePublico']").val().toUpperCase();
            root.areaAdscripcion =              $(formulario + "input[name='areaAdscripcion']").val().toUpperCase();
            root.empleoCargoComision =          $(formulario + "input[name='empleoCargoComision']").val().toUpperCase();
            root.contratadoPorHonorarios =     honorarios;
            root.nivelEmpleoCargoComision =     $(formulario + "input[name='nivelEmpleoCargoComision']").val().toUpperCase();
            root.funcionPrincipal =             $(formulario + "input[name='funcionPrincipal']").val().toUpperCase();
            root.fechaTomaPosesion =            $(formulario + "input[name='fechaTomaPosesion']").val();
            root.telefonoOficina.telefono =     $(formulario + "input[name='telefono'] ").val();
            root.telefonoOficina.extension =    $(formulario + "input[name='extension']").val();

            if (jsonResult.declaracion.situacionPatrimonial.datosEmpleoCargoComision.domicilio =="MX"){
                //domicilio mexico.
                root.domicilioMexico.calle = $("#domEmpMexico input[name='calle']").val().toUpperCase();
                root.domicilioMexico.numeroExterior = $("#domEmpMexico input[name='numeroExterior']").val();
                root.domicilioMexico.numeroInterior = $("#domEmpMexico input[name='numeroInterior']").val();
                root.domicilioMexico.coloniaLocalidad = $("#domEmpMexico input[name='coloniaLocalidad']").val().toUpperCase();
                root.domicilioMexico.municipioAlcaldia.clave = $("#domEmpMexico select[name='municipioAlcaldia'] option:selected").val();
                root.domicilioMexico.municipioAlcaldia.valor = $("#domEmpMexico select[name='municipioAlcaldia'] option:selected")[0].innerText;
                root.domicilioMexico.entidadFederativa.clave = $("#domEmpMexico select[name='entidadFederativa'] option:selected").val();
                root.domicilioMexico.entidadFederativa.valor = $("#domEmpMexico select[name='entidadFederativa'] option:selected")[0].innerText;
                root.domicilioMexico.codigoPostal = $("#domEmpMexico input[name='codigoPostal']").val();

                //domicilio extranjero
                root.domicilioExtranjero.calle = "";
                root.domicilioExtranjero.numeroExterior = "";
                root.domicilioExtranjero.numeroInterior = "";
                root.domicilioExtranjero.ciudadLocalidad = "";
                root.domicilioExtranjero.estadoProvincia = "";
                root.domicilioExtranjero.pais = "MX"
                root.domicilioExtranjero.codigoPostal = "";
            }
            else{
                $("#domEmpMexico select[name='entidadFederativa'] option:selected").val("07").trigger("change");
                //domicilio mexico.
                root.domicilioMexico.calle = "";
                root.domicilioMexico.numeroExterior = "";
                root.domicilioMexico.numeroInterior = "";
                root.domicilioMexico.coloniaLocalidad = "";
                root.domicilioMexico.municipioAlcaldia.clave = $("#domEmpMexico select[name='municipioAlcaldia'] option:selected").val();
                root.domicilioMexico.municipioAlcaldia.valor = $("#domEmpMexico select[name='municipioAlcaldia'] option:selected")[0].innerText;
                root.domicilioMexico.entidadFederativa.clave = $("#domEmpMexico select[name='entidadFederativa'] option:selected").val();
                root.domicilioMexico.entidadFederativa.valor = $("#domEmpMexico select[name='entidadFederativa'] option:selected")[0].innerText;
                root.domicilioMexico.codigoPostal = "";

                //domicilio extranjero
                root.domicilioExtranjero.calle = $("#domEmpExtranjero input[name='calle']").val().toUpperCase();
                root.domicilioExtranjero.numeroExterior = $("#domEmpExtranjero input[name='numeroExterior']").val();
                root.domicilioExtranjero.numeroInterior = $("#domEmpExtranjero input[name='numeroInterior']").val();
                root.domicilioExtranjero.ciudadLocalidad = $("#domEmpExtranjero input[name='ciudadLocalidad']").val().toUpperCase();
                root.domicilioExtranjero.estadoProvincia = $("#domEmpExtranjero input[name='estadoProvincia']").val().toUpperCase();
                root.domicilioExtranjero.pais = $("#domEmpExtranjero select[name='pais'] option:selected").val();
                root.domicilioExtranjero.codigoPostal = $("#domEmpExtranjero input[name='codigoPostal']").val();
            }                                            
            root.aclaracionesObservaciones = $(formulario + "textarea[name='aclaracionesObservaciones']").val().toUpperCase();
            //actualiza el status de la sección (en proceso/terminado).
            actualizarStatusSeccion(seccionApartado, seccionNo, seccionName, btn.originalEvent.submitter.dataset.seccionstatus);
        }
    });    
}

window.loadInfoEmpleoCargoComision = function loadInfoEmpleoCargoComision(form){
    var root = jsonResult.declaracion.situacionPatrimonial.datosEmpleoCargoComision;
    
    $(form + "select[name='tipoOperacion']").val(root.tipoOperacion);
    $(form + "select[name='nivelOrdenGobierno']").val(root.nivelOrdenGobierno);
    $(form + "select[name='ambitoPublico']").val(root.ambitoPublico);
    $(form + "input[name='nombreEntePublico']").val(root.nombreEntePublico);
    $(form + "input[name='areaAdscripcion']").val(root.areaAdscripcion );
    $(form + "input[name='empleoCargoComision']").val(root.empleoCargoComision);
    $(form + "select[name='contratadoPorHonorarios']").val(root.contratadoPorHonorarios);
    $(form + "input[name='nivelEmpleoCargoComision']").val(root.nivelEmpleoCargoComision);
    $(form + "input[name='funcionPrincipal']").val(root.funcionPrincipal);
    $(form + "input[name='fechaTomaPosesion']").val(root.fechaTomaPosesion);
    $(form + "input[name='telefono'] ").val(root.telefonoOficina.telefono);
    $(form + "input[name='extension']").val(root.telefonoOficina.extension);
    if (root.domicilio=="MX"){
        $(form + "#domicilioEmpMX").prop("checked", true);
        $(form + "#domEmpMexico").removeClass("hide");
        $(form + "#domEmpExtranjero").addClass("hide");
    }
    else{
        $(form + "#domicilioEmpEXT").prop("checked", true);
        $(form + "#domEmpExtranjero").removeClass("hide");
        $(form + "#domEmpMexico").addClass("hide");
    }
    //domicilio mexico.
    $("#domEmpMexico input[name='calle']").val(root.domicilioMexico.calle);
    $("#domEmpMexico input[name='numeroExterior']").val(root.domicilioMexico.numeroExterior);
    $("#domEmpMexico input[name='numeroInterior']").val(root.domicilioMexico.numeroInterior);
    $("#domEmpMexico input[name='coloniaLocalidad']").val(root.domicilioMexico.coloniaLocalidad);    
    $("#domEmpMexico select[name='entidadFederativa']").val(root.domicilioMexico.entidadFederativa.clave).trigger("change");
    $("#domEmpMexico select[name='municipioAlcaldia']").val(root.domicilioMexico.municipioAlcaldia.clave);
    $("#domEmpMexico input[name='codigoPostal']").val(root.domicilioMexico.codigoPostal);

    //domicilio extranjero
    $("#domEmpExtranjero input[name='calle']").val(root.domicilioExtranjero.calle);
    $("#domEmpExtranjero input[name='numeroExterior']").val(root.domicilioExtranjero.numeroExterior);
    $("#domEmpExtranjero input[name='numeroInterior']").val(root.domicilioExtranjero.numeroInterior);
    $("#domEmpExtranjero input[name='ciudadLocalidad']").val(root.domicilioExtranjero.ciudadLocalidad);
    $("#domEmpExtranjero input[name='estadoProvincia']").val(root.domicilioExtranjero.estadoProvincia);
    $("#domEmpExtranjero select[name='pais']").val(root.domicilioExtranjero.pais);
    $("#domEmpExtranjero input[name='codigoPostal']").val(root.domicilioExtranjero.codigoPostal);

    //generales
     $(form + "textarea[name='aclaracionesObservaciones']").val(root.aclaracionesObservaciones);
}