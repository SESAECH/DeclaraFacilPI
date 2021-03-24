function  funcionalidadDesempenoServidorPublico(seccionNo, seccionName, seccionStatus){


}

function guardarFormDesempenoServidorPublico(seccionNo, seccionName){
    $("#form" + seccionName).validate({
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
            root.aclaracionesObservaciones = $("textarea[name='aclaracionesObservaciones']").val();
        
            //actualiza el status de la sección (en proceso/terminado).
            actualizarStatusSeccion("situacion_patrimonial", seccionNo, seccionName, btn.originalEvent.submitter.dataset.seccionstatus);            
        }
    });    
}