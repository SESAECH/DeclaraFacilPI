
window.initDatosGenerales = function initDatosGenerales(data){
    var seccion = JSON.parse(atob(data));
    var seccionName = seccion.moduloName.replace("modulo","");
    var form = "#form" + seccion.moduloName.replace("modulo", "")+ " ";
    var modulo = "#" + seccion.moduloName + " ";

    //cargar catalogos.
    loadCat(situacionPersonalEstadoCivil, form + ".CBOsituacionPersonalEstadoCivil");
    loadCat(regimenMatrimonial, form + ".CBOregimenMatrimonial");
    loadCat(paises, form + ".CBOpaisNacimiento");
    loadCat(paises, form + ".CBOnacionalidad");
    $("#formDatosGenerales select[name='situacionPersonalEstadoCivil']").val("SOL").trigger("change");
    //validar status de la sección.
    switch(seccion.status){
        case "SIN_INFO": 
            //asginar valores predeterminados a catálogos(ayuda al usuario).
            $(form + ".CBOpaisNacimiento").val("MX");
            $(form + ".CBOnacionalidad").val("MX");
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
        switch($("#formDatosGenerales select[name='situacionPersonalEstadoCivil']").val()){
            case "SOL":
            case "DIV":
            case "VIU":
                $("#formDatosGenerales select[name='regimenMatrimonial']").prop("disabled", true);
                break;
            default: 
                $("#formDatosGenerales select[name='regimenMatrimonial']").prop("disabled", false); 
                break;
        }
    });
    $(".content_seccion").addClass("hide");
    $("#" + seccion.moduloName).removeClass("hide");
}

window.guardarFormDatosGenerales = function guardarFormDatosGenerales(seccionNo, seccionName, seccionApartado){
    $.validator.addMethod("RFC", function (value, element) {
        if ( value !== '' ) {
            var patt = new RegExp("^[A-Z,Ñ,&]{3,4}[0-9]{2}[0-1][0-9][0-3][0-9][A-Z,0-9]?[A-Z,0-9]?[0-9,A-Z]?$");
            return patt.test(value.toUpperCase());
        } else {
            return false;
        }
    }, "Ingrese un RFC válido.");
    $.validator.addMethod("CURP", function (value, element) {
        if (value !== '') {
            var patt = new RegExp("^[A-Z][A,E,I,O,U,X][A-Z]{2}[0-9]{2}[0-1][0-9][0-3][0-9][M,H][A-Z]{2}[B,C,D,F,G,H,J,K,L,M,N,Ñ,P,Q,R,S,T,V,W,X,Y,Z]{3}[0-9,A-Z][0-9]$");
            return patt.test(value.toUpperCase());
        } else {
            return false;
        }
    }, "Ingrese una CURP válida.");
    $("#form" + seccionName).validate({
        rules: {
            nombre : { required: true, maxlength: 50 },
            primerApellido : { required: true },
            rfc : { required: true, minlength: 10, maxlength: 10, RFC: true },
            homoClave : { required: true, minlength: 3, maxlength: 3 },
            curp : { required: true, minlength: 18, maxlength: 18, CURP: true },
            personal : { required: true, email: true },
            casa : { required: false, number: true, minlength: 10, maxlength: 10 },
            celularPersonal : { required: true, number: true, minlength: 10, maxlength: 10 },
            situacionPersonalEstadoCivil : { required: true },
            regimenMatrimonial : { required: true },
            paisNacimiento : { required: true },
            nacionalidad : { required: true }
        },
        messages: {
            nombre : { required: "Ingrese el(los) nombre(s).", maxlength: "El máximo de caracteres es de 50." },
            primerApellido : { required: "Ingrese el primer apellido." },
            rfc : { required: "Ingrese el RFC.", minlength: "El minimo de caracteres es de 10.", maxlength: "El máximo de caracteres es de 10." },
            homoClave : { required: "Ingrese la homoclave.", minlength: "El mínimo de caracteres es de 3.", maxlength: "El máximo de caracteres es de 3." },
            curp : { required: "Ingrese la CURP.", minlength: "El mínimo de caracteres es de 18.", maxlength: "El máximo de caracteres es de 18." },
            institucional:{ required:"Ingrese el correo electrónico institucional", email:"Ingrese un correo válido."},
            personal : { required: "Ingrese el correo electrónico personal.", email: "El formato del correo electrónico no es válido." },
            casa : { number: "Solo se permiten caracteres numéricos.", minlength: "El mínimo de caracteres es de 10", maxlength: "El máximo de caracteres es de 10." },
            celularPersonal : { required: "Ingrese el número de celular personal.", number: "Solo se permiten caracteres numéricos.", minlength: "El mínimo de caracteres es de 10.", maxlength: "El máximo de caracteres es de 10." },
            situacionPersonalEstadoCivil : { required: "Seleccione el estado civil." },
            regimenMatrimonial : { required: "Seleccione el régimen matrimonial." },
            paisNacimiento : { required: "Selecione el país de nacimiento." },
            nacionalidad : { required: "Seleccione la nacionalidad." }
            
        },
        // Make sure the form is submitted to the destination defined
        // in the "action" attribute of the form when valid
        submitHandler: function(form, btn) {
            var root = jsonResult.declaracion.situacionPatrimonial.datosGenerales;
            root.nombre =           $("#formDatosGenerales input[name='nombre']").val().toUpperCase();
            root.primerApellido =   $("#formDatosGenerales input[name='primerApellido']").val().toUpperCase();
            root.segundoApellido =  $("#formDatosGenerales input[name='segundoApellido']").val().toUpperCase();
            root.curp =             $("#formDatosGenerales input[name='curp']").val().toUpperCase();
            root.rfc.rfc =          $("#formDatosGenerales input[name='rfc']").val().toUpperCase();
            root.rfc.homoClave =    $("#formDatosGenerales input[name='homoClave']").val().toUpperCase();
            root.correoElectronico.institucional =  $("#formDatosGenerales input[name='institucional']").val();
            root.correoElectronico.personal =       $("#formDatosGenerales input[name='personal']").val();
            root.telefono.casa =                    $("#formDatosGenerales input[name='casa']").val();
            root.telefono.celularPersonal =         $("#formDatosGenerales input[name='celularPersonal']").val();
            root.situacionPersonalEstadoCivil.clave = $("#formDatosGenerales select[name='situacionPersonalEstadoCivil'] option:selected").val();
            root.situacionPersonalEstadoCivil.valor = $("#formDatosGenerales select[name='situacionPersonalEstadoCivil'] option:selected")[0].innerText;
            root.regimenMatrimonial.clave =         $("#formDatosGenerales select[name='regimenMatrimonial'] option:selected").val();
            root.regimenMatrimonial.valor =         $("#formDatosGenerales select[name='regimenMatrimonial'] option:selected")[0].innerText;
            root.paisNacimiento =             $("#formDatosGenerales select[name='paisNacimiento'] option:selected").val();          
            root.nacionalidad =               $("#formDatosGenerales select[name='nacionalidad'] option:selected").val();        
            root.aclaracionesObservaciones =        $("#formDatosGenerales textarea[name='aclaracionesObservaciones']").val().toUpperCase();
            //actualiza el status de la sección (en proceso/terminado)."situacion_patrimonial"
            actualizarStatusSeccion(seccionApartado, seccionNo, seccionName, btn.originalEvent.submitter.dataset.seccionstatus);
        }
    });    
}

window.loadInfoDatosGenerales = function loadInfoDatosGenerales(){
    var infoSeccionGuardada = jsonResult.declaracion.situacionPatrimonial.datosGenerales;
    $.each(infoSeccionGuardada, function (index, item) {
        if(typeof item == "string"){ document.getElementsByName(index)[0].value = item; }
    });

    $("#formDatosGenerales input[name='rfc']").val(infoSeccionGuardada.rfc.rfc);
    $("#formDatosGenerales input[name='homoClave']").val(infoSeccionGuardada.rfc.homoClave);
    $("#formDatosGenerales input[name='institucional']").val(infoSeccionGuardada.correoElectronico.institucional);
    $("#formDatosGenerales input[name='personal']").val(infoSeccionGuardada.correoElectronico.personal);

    $("#formDatosGenerales input[name='casa']").val(infoSeccionGuardada.telefono.casa);
    $("#formDatosGenerales input[name='celularPersonal']").val(infoSeccionGuardada.telefono.celularPersonal);
    
    $("#formDatosGenerales select[name='situacionPersonalEstadoCivil']").val(infoSeccionGuardada.situacionPersonalEstadoCivil.clave).trigger("change");
    $("#formDatosGenerales select[name='regimenMatrimonial']").val(infoSeccionGuardada.regimenMatrimonial.clave);

    $("#formDatosGenerales select[name='paisNacimiento']").val(infoSeccionGuardada.paisNacimiento);
    $("#formDatosGenerales select[name='nacionalidad']").val(infoSeccionGuardada.nacionalidad);
}

$('#formDatosGenerales select[name="situacionPersonalEstadoCivil"]').on('change', function() {
    switch(this.value){
        case "SOL":
        case "DIV":
        case "VIU":
            $("#formDatosGenerales select[name='regimenMatrimonial']").val("NA").prop("disabled", true);
            $("#formDatosGenerales .CBOregimenMatrimonial option[value='NA']").removeClass("hide");
            break;
        default: 
            $("#formDatosGenerales .CBOregimenMatrimonial option[value='NA']").addClass("hide");
            $("#formDatosGenerales select[name='regimenMatrimonial']").val("SOC").prop("disabled", false); 
            break;
    }
                 
}); 

