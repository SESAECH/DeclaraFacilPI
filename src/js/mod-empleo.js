
function initEmpleoCargoComision(data){
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
    if(captura.tipo_declaracion == "INICIAL"){
        $(form + "select[name='tipoOperacion']").val("AGREGAR").prop("disabled", true);
    }

    //validar status de la sección.
    switch(seccion.status){
        case "SIN_INFO": 
            //asginar valores predeterminados a catálogos(ayuda al usuario).
            $(form + ".CBOpais").val("MX");
            $(form + ".CBOentidadFederativa").val("07").change();
            $(form + ".btnGuardar").removeClass("hide");
            $(form + ".btnTerminar").removeClass("hide");
            $(modulo + ".btnHabilitar").addClass("hide");
        break;
        case "EN_PROCESO":
            //cargar información guardada previamente.
            window["loadInfo" + seccionName];
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

function guardarFormEmpleoCargoComision(seccionNo, seccionName,  seccionApartado){
    var formulario = "#form" + seccionName + " ";
    $(formulario).validate({
        rules: {
            nombre : { required: true, maxlength: 50},
            primerApellido : { required: true, },
            rfc:{ required: true, minlength: 10, maxlength:10},
            homoClave :{required: true, minlength: 3, maxlength:3}
        },
        messages : {
            nombre: { required: "Ingresa el nombre", maxlength: "Máximo de caracteres es 50."},
            primerApellido: { required: "Ingresa el primerApellido"},
            segundoApellido: { required: "Ingresa el primerApellido"},
            rfc: { required: "Ingresa el rfc", minlength: "Minimo de 10 caractes."},
            homoClave: {
                required: "Ingresa la homoclave",
                minlength:"Minimo de caracteres es 3."
            }
        },
        // Make sure the form is submitted to the destination defined
        // in the "action" attribute of the form when valid
        submitHandler: function(form, btn) {
            var root = jsonResult.declaracion.situacionPatrimonial.datosEmpleoCargoComision;
            root.tipoOperacion =                $(formulario + "select[name='tipoOperacion'] option:selected").val();
            root.nivelOrdenGobierno =           $(formulario + "select[name='nivelOrdenGobierno'] option:selected").val();
            root.ambitoPublico =                $(formulario + "select[name='ambitoPublico'] option:selected").val();
            root.nombreEntePublico =            $(formulario + "input[name='nombreEntePublico']").val();
            root.areaAdscripcion =              $(formulario + "input[name='areaAdscripcion']").val();
            root.empleoCargoComision =          $(formulario + "input[name='empleoCargoComision']").val();
            root.contratadoPorHonorarios =      $(formulario + "select[name='contratadoPorHonorarios'] option:selected").val();
            root.nivelEmpleoCargoComision =     $(formulario + "input[name='nivelEmpleoCargoComision']").val();
            root.funcionPrincipal =             $(formulario + "input[name='funcionPrincipal']").val();
            root.fechaTomaPosesion =            $(formulario + "input[name='fechaTomaPosesion']").val();
            root.telefonoOficina.telefono =     $(formulario + "input[name='telefono'] ").val();
            root.telefonoOficina.extension =    $(formulario + "input[name='extension']").val();

            //domicilio mexico.
            root.domicilioMexico.calle = $("#domEmpMexico input[name='calle']").val();
            root.domicilioMexico.numeroExterior = $("#domEmpMexico input[name='numeroExterior']").val();
            root.domicilioMexico.numeroInterior = $("#domEmpMexico input[name='numeroInterior']").val();
            root.domicilioMexico.coloniaLocalidad = $("#domEmpMexico input[name='coloniaLocalidad']").val();
            root.domicilioMexico.municipioAlcaldia.clave = $("#domEmpMexico select[name='municipioAlcaldia'] option:selected").val();
            root.domicilioMexico.municipioAlcaldia.valor = $("#domEmpMexico select[name='municipioAlcaldia'] option:selected")[0].innerText;
            root.domicilioMexico.entidadFederativa.clave = $("#domEmpMexico select[name='entidadFederativa'] option:selected").val();
            root.domicilioMexico.entidadFederativa.valor = $("#domEmpMexico select[name='entidadFederativa'] option:selected")[0].innerText;
            root.domicilioMexico.codigoPostal = $("#domEmpMexico input[name='codigoPostal']").val();
            
            //domicilio extranjero
            root.domicilioExtranjero.calle = $("#domEmpExtranjero input[name='calle']").val();
            root.domicilioExtranjero.numeroExterior = $("#domEmpExtranjero input[name='numeroExterior']").val();
            root.domicilioExtranjero.numeroInterior = $("#domEmpExtranjero input[name='numeroInterior']").val();
            root.domicilioExtranjero.ciudadLocalidad = $("#domEmpExtranjero input[name='ciudadLocalidad']").val();
            root.domicilioExtranjero.estadoProvincia = $("#domEmpExtranjero input[name='estadoProvincia']").val();
            root.domicilioExtranjero.pais = $("#domEmpExtranjero select[name='pais'] option:selected").val();
            root.domicilioExtranjero.codigoPostal = $("#domEmpExtranjero input[name='codigoPostal']").val();
            
            root.aclaracionesObservaciones = $(formulario + "textarea[name='aclaracionesObservaciones']").val();
            //actualiza el status de la sección (en proceso/terminado).
            actualizarStatusSeccion(seccionApartado, seccionNo, seccionName, btn.originalEvent.submitter.dataset.seccionstatus);
        }
    });    
}

function loadInfoEmpleoCargoComision(form){
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

    //domicilio mexico.
    $("#domEmpMexico input[name='calle']").val(root.domicilioMexico.calle);
    $("#domEmpMexico input[name='numeroExterior']").val(root.domicilioMexico.numeroExterior);
    $("#domEmpMexico input[name='numeroInterior']").val(root.domicilioMexico.numeroInterior);
    $("#domEmpMexico input[name='coloniaLocalidad']").val(root.domicilioMexico.coloniaLocalidad);
    $("#domEmpMexico select[name='municipioAlcaldia']").val(root.domicilioMexico.municipioAlcaldia.clave);
    $("#domEmpMexico select[name='entidadFederativa']").val(root.domicilioMexico.entidadFederativa.clave);
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