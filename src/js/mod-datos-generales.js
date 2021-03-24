
function initDatosGenerales(data){
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
}

function guardarFormDatosGenerales(seccionNo, seccionName, seccionApartado){
    $("#form" + seccionName).validate({
        rules: {
            nombre : { required: true, maxlength: 50},
            primerApellido : { required: true, },
            rfc:{ required: true, minlength: 10, maxlength:10},
            homoClave :{required: true, minlength: 3, maxlength:3}
        },
        messages : {
            nombre: { required: "Ingresa el nombre", maxlength: "Máximo de caracteres es 50."},
            primerApellido: { required: "Ingresa el primer apellido"},
            segundoApellido: { required: "Ingresa el segundo apellido"},
            rfc: { required: "Ingresa el rfc", minlength: "Minimo de 10 caractes."},
            homoClave: {
                required: "Ingresa la homoclave",
                minlength:"Minimo de caracteres es 3."
            }
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
}

function loadInfoDatosGenerales(){
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
}

window.initDatosGenerales=initDatosGenerales;
window.loadInfoDatosGenerales=loadInfoDatosGenerales;
window.guardarFormDatosGenerales=guardarFormDatosGenerales;