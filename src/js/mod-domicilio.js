window.initDomicilio = function initDomicilio(data){
    var seccion = JSON.parse(atob(data));
    var seccionName = seccion.moduloName.replace("modulo","");
    var form = "#form" + seccion.moduloName.replace("modulo", "")+ " ";
    var modulo = "#" + seccion.moduloName + " ";

    //cargar catalogos.
    loadCat(entidadFederativa, ".CBOentidadFederativa");    
    loadCat(paises, ".CBOpais");
    
    $(form + ".CBOentidadFederativa").on('change', function() {
        loadMunicipios(form + ".CBOmunicipioAlcaldia", this.value);
    });
    $(form + '.rdDomicilio').click(function(){
        if(this.id =="domicilioMX"){
            $(form + "#domMexico").removeClass("hide");
            $(form + "#domExtranjero").addClass("hide");
            jsonResult.declaracion.situacionPatrimonial.domicilioDeclarante.domicilio="MX";
        }
        else{ 
            $(form + "#domExtranjero").removeClass("hide");
            $(form + "#domMexico").addClass("hide");
            jsonResult.declaracion.situacionPatrimonial.domicilioDeclarante.domicilio="EXT";
        }
    });
    //validar status de la sección.
    switch(seccion.status){
        case "SIN_INFO": 
            //asginar valores predeterminados a catálogos(ayuda al usuario).
            $("#domicilioMX").prop("checked", true);
            $(form + "#domMexico").removeClass("hide");
            //$(form + ".CBOpais").val("MX");
            $(form + ".CBOentidadFederativa").val("07").change();
            $(form + ".btnGuardar").removeClass("hide");
            $(form + ".btnTerminar").removeClass("hide");
            $(modulo + ".btnHabilitar").addClass("hide");
        break;
        case "EN_PROCESO":
            //cargar información guardada previamente.
            window["loadInfo" + seccionName](); 
            $(form + ".btnGuardar").removeClass("hide");
            $(form + ".btnTerminar").removeClass("hide");
            $(modulo + ".btnHabilitar").addClass("hide");
            break;
        case "TERMINADO":
            //cargar información guardada previamente.
            window["loadInfo" + seccionName]();           
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

window.guardarFormDomicilio = function guardarFormDomicilio(seccionNo, seccionName, seccionApartado){
    $("#form" + seccionName).validate({
        rules: {
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
        messages : {
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
            var root = jsonResult.declaracion.situacionPatrimonial.domicilioDeclarante;
            //domicilio mexico.
            root.domicilioMexico.calle = $("#domMexico input[name='calle']").val();
            root.domicilioMexico.numeroExterior = $("#domMexico input[name='numeroExterior']").val();
            root.domicilioMexico.numeroInterior = $("#domMexico input[name='numeroInterior']").val();
            root.domicilioMexico.coloniaLocalidad = $("#domMexico input[name='coloniaLocalidad']").val();
            root.domicilioMexico.municipioAlcaldia.clave = $("#domMexico select[name='municipioAlcaldia'] option:selected").val();
            root.domicilioMexico.municipioAlcaldia.valor = $("#domMexico select[name='municipioAlcaldia'] option:selected")[0].innerText;
            root.domicilioMexico.entidadFederativa.clave = $("#domMexico select[name='entidadFederativa'] option:selected").val();
            root.domicilioMexico.entidadFederativa.valor = $("#domMexico select[name='entidadFederativa'] option:selected")[0].innerText;
            root.domicilioMexico.codigoPostal = $("#domMexico input[name='codigoPostal']").val();
            
            //domicilio extranjero
            root.domicilioExtranjero.calle = $("#domExtranjero input[name='calle']").val();
            root.domicilioExtranjero.numeroExterior = $("#domExtranjero input[name='numeroExterior']").val();
            root.domicilioExtranjero.numeroInterior = $("#domExtranjero input[name='numeroInterior']").val();
            root.domicilioExtranjero.ciudadLocalidad = $("#domExtranjero input[name='ciudadLocalidad']").val();
            root.domicilioExtranjero.estadoProvincia = $("#domExtranjero input[name='estadoProvincia']").val();
            root.domicilioExtranjero.pais = $("#domExtranjero select[name='pais'] option:selected").val();
            root.domicilioExtranjero.codigoPostal = $("#domExtranjero input[name='codigoPostal']").val();

            //generales
            root.aclaracionesObservaciones = $("#formDomicilio textarea[name='aclaracionesObservaciones']").val().toUpperCase();
        
            //actualiza el status de la sección (en proceso/terminado).
            actualizarStatusSeccion(seccionApartado, seccionNo, seccionName, btn.originalEvent.submitter.dataset.seccionstatus);            
        }
    });    
}

window.loadInfoDomicilio = function loadInfoDomicilio(){
    var root = jsonResult.declaracion.situacionPatrimonial.domicilioDeclarante;

    if (jsonResult.declaracion.situacionPatrimonial.domicilioDeclarante.domicilio=="MX"){ 
        $("#domicilioMX").prop("checked", true); 
        $("#domMexico").removeClass("hide");
        $("#domExtranjero").addClass("hide");
    }
    else{ 
        $("#domicilioEXT").prop("checked", true); 
        $("#domExtranjero").removeClass("hide");
        $("#domMexico").addClass("hide");
    }
    //domicilio mexico.
    $("#domMexico input[name='calle']").val(root.domicilioMexico.calle);
    $("#domMexico input[name='numeroExterior']").val(root.domicilioMexico.numeroExterior);
    $("#domMexico input[name='numeroInterior']").val(root.domicilioMexico.numeroInterior);
    $("#domMexico input[name='coloniaLocalidad']").val(root.domicilioMexico.coloniaLocalidad);    
    $("#domMexico select[name='entidadFederativa']").val(root.domicilioMexico.entidadFederativa.clave).trigger("change");
    $("#domMexico select[name='municipioAlcaldia']").val(root.domicilioMexico.municipioAlcaldia.clave);
    $("#domMexico input[name='codigoPostal']").val(root.domicilioMexico.codigoPostal);

    //domicilio extranjero
    $("#domExtranjero input[name='calle']").val(root.domicilioExtranjero.calle);
    $("#domExtranjero input[name='numeroExterior']").val(root.domicilioExtranjero.numeroExterior);
    $("#domExtranjero input[name='numeroInterior']").val(root.domicilioExtranjero.numeroInterior);
    $("#domExtranjero input[name='ciudadLocalidad']").val(root.domicilioExtranjero.ciudadLocalidad);
    $("#domExtranjero input[name='estadoProvincia']").val(root.domicilioExtranjero.estadoProvincia);
    $("#domExtranjero select[name='pais']").val(root.domicilioExtranjero.pais);
    $("#domExtranjero input[name='codigoPostal']").val(root.domicilioExtranjero.codigoPostal);

    //generales
     $("textarea[name='aclaracionesObservaciones']").val(root.aclaracionesObservaciones);
}