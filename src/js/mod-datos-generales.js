
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
            window["loadInfo" + seccionName];
            $(form + ".btnGuardar").removeClass("hide");
            $(form + ".btnTerminar").removeClass("hide");
            $(modulo + ".btnHabilitar").addClass("hide");
            break;
        case "TERMINADO":
            //cargar información guardada previamente.
            window["loadInfo" + seccionName];           
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
};

window.guardarFormDatosGenerales = function guardarFormDatosGenerales(seccionNo, seccionName, seccionApartado){
    $.validator.addMethod("RFC", function (value, element) {
        if ( value !== '' ) {
            var patt = new RegExp("^[A-Z,Ñ,&]{3,4}[0-9]{2}[0-1][0-9][0-3][0-9][A-Z,0-9]?[A-Z,0-9]?[0-9,A-Z]?$");
            return patt.test(value);
        } else {
            return false;
        }
    }, "Ingrese un RFC válido.");
    $.validator.addMethod("CURP", function (value, element) {
        if (value !== '') {
            var patt = new RegExp("^[A-Z][A,E,I,O,U,X][A-Z]{2}[0-9]{2}[0-1][0-9][0-3][0-9][M,H][A-Z]{2}[B,C,D,F,G,H,J,K,L,M,N,Ñ,P,Q,R,S,T,V,W,X,Y,Z]{3}[0-9,A-Z][0-9]$");
            return patt.test(value);
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
            casa : { required: true, number: true, minlength: 10, maxlength: 10, TEL: true },
            celularPersonal : { required: true, number: true, minlength: 10, maxlength: 10, TEL: true },
            situacionPersonalEstadoCivil : { required: true },
            regimenMatrimonial : { required: true },
            paisNacimiento : { required: true },
            nacionalidad : { required: true }
        },
        messages: {
            nombre : { required: "Ingrese el nombre.", maxlength: "El máximo de caracteres es de 50." },
            primerApellido : { required: "Ingrese el primer apellido." },
            rfc : { required: "Ingrese el RFC.", minlength: "El minimo de caracteres es de 10.", maxlength: "El máximo de caracteres es de 10." },
            homoClave : { required: "Ingrese la homoclave.", minlength: "El mínimo de caracteres es de 3.", maxlength: "El máximo de caracteres es de 3." },
            curp : { required: "Ingrese la CURP.", minlength: "El mínimo de caracteres es de 18.", maxlength: "El máximo de caracteres es de 18." },
            personal : { required: "Ingrese el correo electrónico personal.", email: "El formato del correo electrónico no es válido." },
            casa : { required: "Ingrese el número telefónico de casa", number: "Solo se permiten caracteres numéricos.", minlength: "El mínimo de caracteres es de 10", maxlength: "El máximo de caracteres es de 10." },
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
            root.nombre =           $("#formDatosGenerales input[name='nombre']").val();
            root.primerApellido =   $("#formDatosGenerales input[name='primerApellido']").val();
            root.segundoApellido =  $("#formDatosGenerales input[name='segundoApellido']").val();
            root.curp =             $("#formDatosGenerales input[name='curp']").val();
            root.rfc.rfc =          $("#formDatosGenerales input[name='rfc']").val();
            root.rfc.homoClave =    $("#formDatosGenerales input[name='homoClave']").val();
            root.correoElectronico.institucional = $("#formDatosGenerales input[name='institucional']").val();
            root.correoElectronico.personal = $("#formDatosGenerales input[name='personal']").val();
            root.telefono.casa = $("#formDatosGenerales input[name='casa']").val();
            root.telefono.celularPersonal = $("#formDatosGenerales input[name='celularPersonal']").val();
            root.situacionPersonalEstadoCivil.clave = $("#formDatosGenerales select[name='situacionPersonalEstadoCivil'] option:selected").val();
            root.situacionPersonalEstadoCivil.valor = $("#formDatosGenerales select[name='situacionPersonalEstadoCivil'] option:selected")[0].innerText;
            root.regimenMatrimonial.clave = $("#formDatosGenerales select[name='regimenMatrimonial'] option:selected").val();
            root.regimenMatrimonial.valor = $("#formDatosGenerales select[name='regimenMatrimonial'] option:selected")[0].innerText;
            root.paisNacimiento.clave = $("#formDatosGenerales select[name='paisNacimiento'] option:selected").val();
            root.paisNacimiento.valor = $("#formDatosGenerales select[name='paisNacimiento'] option:selected")[0].innerText;
            root.nacionalidad.clave = $("#formDatosGenerales select[name='nacionalidad'] option:selected").val();
            root.nacionalidad.valor = $("#formDatosGenerales select[name='nacionalidad'] option:selected")[0].innerText;
            root.aclaracionesObservaciones = $("#formDatosGenerales textarea[name='aclaracionesObservaciones']").val();
            //actualiza el status de la sección (en proceso/terminado)."situacion_patrimonial"
            actualizarStatusSeccion(seccionApartado, seccionNo, seccionName, btn.originalEvent.submitter.dataset.seccionstatus);
        }
    });    
};

window.loadInfoDatosGenerales = function loadInfoDatosGenerales(){
    var infoSeccionGuardada = jsonResult.declaracion.situacionPatrimonial.datosGenerales;
    $.each(infoSeccionGuardada, function (index, item) {
        if(typeof item == "string"){ document.getElementsByName(index)[0].value = item; }
        else{
            switch(index){
                case "situacionPersonalEstadoCivil":
                case "regimenMatrimonial":
                case "paisNacimiento":
                case "nacionalidad":
                    document.getElementsByName(index)[0].value = item.clave;
                    break;
                default: 
                    $.each(item, function (subindex, subitem) {
                        document.getElementsByName(subindex)[0].value = subitem;
                    }); 
                break;
            }
        }
    });
};

/*
window.initDatosGenerales=initDatosGenerales;
window.loadInfoDatosGenerales=loadInfoDatosGenerales;
window.guardarFormDatosGenerales=guardarFormDatosGenerales;
*/