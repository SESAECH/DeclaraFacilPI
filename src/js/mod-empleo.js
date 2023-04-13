
window.initEmpleoCargoComision = function initEmpleoCargoComision(data){
    var seccion = JSON.parse(atob(data));
    var seccionName = seccion.moduloName.replace("modulo","");
    var form = "#form" + seccion.moduloName.replace("modulo", "")+ " ";
    var formOtro = "#formOtroEmpleoCargoComision ";
    var modulo = "#" + seccion.moduloName + " ";

    //cargar catalogos.
    loadCat(tipoOperacion, form + ".CBOtipoOperacion");
    loadCat(nivelOrdenGobierno, form + ".CBOnivelOrdenGobierno");
    loadCat(ambitoPublico, form + ".CBOambitoPublico");
    loadCat(trueFalse, form + ".CBOcontratadoPorHonorarios");
    loadCat(entidadFederativa, form + ".CBOentidadFederativa");
    loadCat(paises, form + ".CBOpais");
    
    loadCat(entidadFederativa, formOtro + ".CBOentidadFederativaOtro");
    loadCat(nivelOrdenGobierno, formOtro + ".CBOnivelOrdenGobierno");
    loadCat(ambitoPublico, formOtro + ".CBOambitoPublico");
    loadCat(trueFalse, formOtro + ".CBOcontratadoPorHonorarios");
    loadCat(paises, formOtro + ".CBOpais");
    
    $(form + ".CBOentidadFederativa").on('change', function() {
        loadMunicipios(form + ".CBOmunicipioAlcaldia", this.value);
    });
    
    $(formOtro + ".CBOentidadFederativaOtro").on('change', function() {
        loadMunicipios(formOtro + ".CBOmunicipioAlcaldiaOtro", this.value);
    });
    
    $("#contentOtroEmpleoCargoComision0").addClass("hide");
    $("#contentOtroEmpleoCargoComision1").addClass("hide");
    $("#contentOtroEmpleoCargoComision2").addClass("hide");
    $("#btnAgregarOtrosEmpleos").addClass("hide");
    $("#tblOtrosEmpleos").addClass("hide");

    $("#chkOtroEmpleoCargoComision")[0].checked=false;

    switch(jsonResult.captura.tipo_declaracion){
        case "INICIAL":            
            $(form + "select[name='tipoOperacion']").val("AGREGAR").prop("disabled", true);
            $(".lblFechaTomaPosesion").text("FECHA DE TOMA DE POSESIÓN");
            break;
        case "MODIFICACION":            
            $(".lblFechaTomaPosesion").text("FECHA DE TOMA DE POSESIÓN");
            $("#contentOtroEmpleoCargoComision0").removeClass("hide");
            $("#contentOtroEmpleoCargoComision1").removeClass("hide");            
            break;
        case "CONCLUSION":
            $(".lblFechaTomaPosesion").text("FECHA DE CONCLUSIÓN");
            break;
        case "INTERESES":
            $(form + "select[name='tipoOperacion']").val("SIN_CAMBIOS").prop("disabled", true);
            $(".lblFechaTomaPosesion").text("FECHA DE TOMA DE POSESIÓN");
            break;
    }
    
    $("#chkOtroEmpleoCargoComision").on('click',function() {
        if(this.checked){
            $("#btnAgregarOtrosEmpleos").removeClass("hide");
            $("#tblOtrosEmpleos").removeClass("hide");

            $(form + ".btnGuardar").removeClass("hide");
            $(form + ".btnTerminar").addClass("hide");
        }
        else{
            if (Object.keys(jsonResult.declaracion.situacionPatrimonial.datosEmpleoCargoComision.otroEmpleoCargoComision).length>0){
                Swal.fire({
                    title: 'Aviso',
                    text:"Tiene registros capturados, ¿seguro quiere eliminarlos?",
                    showDenyButton: true,
                    showCancelButton: false,
                    confirmButtonText: "Continuar",
                    denyButtonText: "Cancelar",
                    }).then((result) => {
                        if (result.isConfirmed) {
                            jsonResult.declaracion.situacionPatrimonial.datosEmpleoCargoComision.otroEmpleoCargoComision={};
                            $("#tblOtrosEmpleos tbody").empty();
                            $("#tblOtrosEmpleos").addClass("hide");
                            $("#btnAgregarOtrosEmpleos").addClass("hide");
                            
                            $(form + ".btnGuardar").removeClass("hide");
                            $(form + ".btnTerminar").removeClass("hide");
                        }
                        else{
                            $("#chkOtroEmpleoCargoComision")[0].checked=true;
                        }
                });
            }
            else{
                jsonResult.declaracion.situacionPatrimonial.datosEmpleoCargoComision.otroEmpleoCargoComision={};
                $("#tblOtrosEmpleos tbody").empty();
                $("#tblOtrosEmpleos").addClass("hide");
                $("#btnAgregarOtrosEmpleos").addClass("hide");
                            
                $(form + ".btnGuardar").removeClass("hide");
                $(form + ".btnTerminar").removeClass("hide");
            }
        }
    });

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

    $(formOtro + '.rdDomicilioOtro').click(function(){
        if(this.id =="domicilioEmpMXOtro"){
            $(formOtro + "#domEmpMexicoOtro").removeClass("hide");
            $(formOtro + "#domEmpExtranjeroOtro").addClass("hide");
        }
        else{ 
            $(formOtro + "#domEmpExtranjeroOtro").removeClass("hide");
            $(formOtro + "#domEmpMexicoOtro").addClass("hide");
        }
    });

    //validar status de la sección.
    switch(seccion.status){
        case "SIN_INFO": 
            //asginar valores predeterminados a catálogos(ayuda al usuario).
            $(form + "#domicilioEmpMX").prop("checked", true);
            $(form + "#domEmpMexico").removeClass("hide");
            $(form + "#domEmpExtranjero").addClass("hide");

            $(formOtro + "#domicilioEmpMXOtro").prop("checked", true);
            $(formOtro + "#domEmpMexicoOtro").removeClass("hide");
            $(formOtro + "#domEmpExtranjeroOtro").addClass("hide");

            jsonResult.declaracion.situacionPatrimonial.datosEmpleoCargoComision.domicilio="MX";            

            $(form + ".CBOpais").val("MX");
            $(form + ".CBOentidadFederativa").val("07").change();
            $(formOtro + ".CBOentidadFederativaOtro").val("07").change();

            $(form + ".btnGuardar").removeClass("hide");
            $(form + ".btnTerminar").removeClass("hide");
            $(modulo + ".btnHabilitar").addClass("hide");
        break;
        case "EN_PROCESO":
            //cargar información guardada previamente.
            window["loadInfo" + seccionName](form, seccion.no, seccionName);
            $(form + ".btnGuardar").removeClass("hide");
            $(form + ".btnTerminar").removeClass("hide");
            if(jsonResult.captura.tipo_declaracion === "MODIFICACION"){
                if($("#chkOtroEmpleoCargoComision")[0].checked){
                    if (Object.keys(jsonResult.declaracion.situacionPatrimonial.datosEmpleoCargoComision.otroEmpleoCargoComision).length===0){
                        $(form + ".btnTerminar").addClass("hide");
                    }
                }
            }
            $(modulo + ".btnHabilitar").addClass("hide");
            break;
        case "TERMINADO":
            //cargar información guardada previamente.
            window["loadInfo" + seccionName](form, seccion.no, seccionName);           
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

    $("#btnAgregarOtrosEmpleos").unbind("click");
    $("#btnAgregarOtroEmpleoOK").unbind("click");
    $("#btnCerrarOtroEmpleo").unbind("click");
    
    $(form + ".btnGuardar").on('click',function() {
        window["guardarForm" + seccionName](seccion.no, seccionName, seccion.apartado);
    });
    $(form + ".btnTerminar").on('click',function() {
        window["guardarForm" + seccionName](seccion.no, seccionName, seccion.apartado);        
    });    
    $(modulo + ".btnHabilitar").on('click',function() {
        habilitarSeccion(seccion.apartado, seccion.no, seccionName);
        //$(form + ".CBOtipoOperacion").prop("disabled", true);
    });

    //----------------------------------------------------------------------------
    //-----agregar otros empleos    
    $("#btnAgregarOtrosEmpleos").on('click',function() {
        window.accion = "NUEVO";
        window.uuidOtro = "";

        $("#btnAgregarOtroEmpleoOK").html('<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check" viewBox="0 0 16 16"><path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z"/></svg> Agregar');

        $(form + ".btnGuardar").addClass("hide");
        $(form + ".btnTerminar").addClass("hide");
        $(modulo + ".btnHabilitar").addClass("hide");
        
        $("#contentOtroEmpleoCargoComision1").addClass("hide");
        let validator = $("#formOtroEmpleoCargoComision").validate();
        validator.resetForm();

        $("#formOtroEmpleoCargoComision")[0].reset();
        $(formOtro + ".CBOentidadFederativaOtro").val("07").change();
        $("#domicilioEmpMXOtro")[0].checked=true;
        $("#formOtroEmpleoCargoComision #domEmpMexicoOtro").removeClass("hide");
        $("#formOtroEmpleoCargoComision #domEmpExtranjeroOtro").addClass("hide");

        //$("#btnAgregarOtrosEmpleos").addClass("click");
        $("#tblOtrosEmpleos").addClass("hide"); 
        $("#contentOtroEmpleoCargoComision2").removeClass("hide");
    });
    
    $("#btnCerrarOtroEmpleo").on('click',function() {
        $(form + ".btnGuardar").removeClass("hide");
        if(Object.keys(jsonResult.declaracion.situacionPatrimonial.datosEmpleoCargoComision.otroEmpleoCargoComision).length){
            $(form + ".btnTerminar").removeClass("hide");
        }        
        $("#btnAgregarOtrosEmpleos").removeClass("click");
        $("#tblOtrosEmpleos").removeClass("hide"); 
        $("#contentOtroEmpleoCargoComision2").addClass("hide");
        $("#contentOtroEmpleoCargoComision1").removeClass("hide");
    });

    $("#btnAgregarOtroEmpleoOK").on('click',function(event) {   
        event.preventDefault();     
        window["guardarOtroEmpleoCargoComision"]("", seccion.no, seccionName, "NUEVO");
        //return false;
        //guardarOtroEmpleoCargoComision("", seccion.no, seccionName, "NUEVO"); 
    });
    //----------------------------------------------------------------------------

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
            fechaTomaPosesion : { required: "Ingrese la fecha."},
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
            
            if(jsonResult.captura.tipo_declaracion === "MODIFICACION"){
                if($("#chkOtroEmpleoCargoComision")[0].checked){
                    root.cuentaConOtroCargoPublico=true;
                }
            }
            //actualiza el status de la sección (en proceso/terminado).
            actualizarStatusSeccion(seccionApartado, seccionNo, seccionName, btn.originalEvent.submitter.dataset.seccionstatus);
        }
    });    
}

window.loadInfoEmpleoCargoComision = function loadInfoEmpleoCargoComision(form, seccionNo, seccionName){
    var root = jsonResult.declaracion.situacionPatrimonial.datosEmpleoCargoComision;
    
    $(form + "select[name='tipoOperacion']").val(root.tipoOperacion);
    $(form + "select[name='nivelOrdenGobierno']").val(root.nivelOrdenGobierno);
    $(form + "select[name='ambitoPublico']").val(root.ambitoPublico);
    $(form + "input[name='nombreEntePublico']").val(root.nombreEntePublico);
    $(form + "input[name='areaAdscripcion']").val(root.areaAdscripcion );
    $(form + "input[name='empleoCargoComision']").val(root.empleoCargoComision);
    $(form + "select[name='contratadoPorHonorarios']").val(root.contratadoPorHonorarios.toString());
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

    //otro empleo    
    if(jsonResult.captura.tipo_declaracion === "MODIFICACION"){
        $("#chkOtroEmpleoCargoComision")[0].checked = root.cuentaConOtroCargoPublico;
        $(form + "select[name='contratadoPorHonorariosOtro']").val("false");
        if(root.cuentaConOtroCargoPublico){
            pintarTablaOtrosEmpleos(seccionNo, seccionName);
            $("#btnAgregarOtrosEmpleos").removeClass("hide");       
        }
    }
}

window.guardarOtroEmpleoCargoComision = function guardarOtroEmpleoCargoComision(uuidItem, seccionNo, seccionName, accion){    
    var formulario = "#formOtroEmpleoCargoComision ";    
    $(formulario).validate({
        rules: {            
            entidadFederativaOtro : { required: true },
            municipioAlcaldiaOtro : { required: true },
            calleOtro : { required: true },
            numeroExteriorOtro : { required: true },
            coloniaLocalidadOtro : { required: true },
            codigoPostalOtro : { required: true, number: true, minlength: 5, maxlength: 5 },
            ciudadLocalidadOtro : { required: true },
            estadoProvinciaOtro : { required: true },
            paisOtro : { required: true },
            nivelOrdenGobiernoOtro : { required: true },
            ambitoPublicoOtro : { required: true },
            nombreEntePublicoOtro : { required: true },
            areaAdscripcionOtro : { required: true },
            empleoCargoComisionOtro : { required: true },
            contratadoPorHonorariosOtro : { required: true },
            nivelEmpleoCargoComisionOtro : { required: true },
            funcionPrincipalOtro : { required: true },
            fechaTomaPosesionOtro : { required: true },
            telefonoOtro : { required: true, number: true, minlength: 10, maxlength: 10 },
        },
        messages: {
            nivelOrdenGobiernoOtro : { required: "Seleccione el orden de gobierno." },
            ambitoPublicoOtro : { required: "Seleccione el ámbito público." },
            nombreEntePublicoOtro: { required: "Ingrese el nombre del ente público."},
            areaAdscripcionOtro : { required: "Ingrese el área de adscripción." },
            empleoCargoComisionOtro: { required: "Ingrese el empleo, cargo o comisión." },
            contratadoPorHonorariosOtro : { required: "Seleccione si o no está contratado por honorarios." },
            nivelEmpleoCargoComisionOtro : { required: "Ingrese el nivel del empleo, cargo o comisión." },
            funcionPrincipalOtro : { required : "Ingrese la función principal." },
            fechaTomaPosesionOtro : { required: "Ingrese la fecha."},
            telefonoOtro : { required: "Ingrese el número telefónico de oficina", number: "Solo se permiten caracteres numéricos.", minlength: "El mínimo de caracteres es de 10", maxlength: "El máximo de caracteres es de 10." },
            entidadFederativaOtro: { required: "Seleccione la entidad federativa." },
            municipioAlcaldiaOtro: { required: "Seleccione el municipio o alcaldía." },
            calleOtro: { required: "Ingrese la calle." },
            numeroExteriorOtro : { required: "Ingrese el número exterior." },
            coloniaLocalidadOtro : { required: "Ingrese la colonia o localidad." },
            codigoPostalOtro : { required: "Ingrese el C.P.", number: "Solo se permiten caracteres numéricos.", minlength: "El mínimo de caracteres es de 5.", maxlength: "El máximo de caracteres es de 5." },
            ciudadLocalidadOtro : { required: "Ingrese la ciudad o localidad." },
            estadoProvinciaOtro : { required: "Ingrese el estado o provincia." },
            paisOtro : { required: "Selecione el país." }
        }
    }); 

    if( $(formulario).valid()) {
        var root = jsonResult.declaracion.situacionPatrimonial.datosEmpleoCargoComision;
        if(jsonResult.captura.tipo_declaracion === "MODIFICACION"){
            if($("#chkOtroEmpleoCargoComision")[0].checked){
                if (window.accion === "NUEVO"){ uuidItem = generarUUID(); }
                else{ uuidItem = window.uuidOtro; }

                let honorariosOtro = $(formulario + "select[name='contratadoPorHonorariosOtro'] option:selected").val() =="false" ? false: true;
                let domicilioOtro = $(formulario + "#domicilioEmpMXOtro")[0].checked ? "MX":"EXT";
                root.cuentaConOtroCargoPublico=true;
                root.otroEmpleoCargoComision[uuidItem]={
                    uuid: uuidItem,
                    nivelOrdenGobierno: $(formulario + "select[name='nivelOrdenGobiernoOtro'] option:selected").val(),
                    ambitoPublico: $(formulario + "select[name='ambitoPublicoOtro'] option:selected").val(),
                    nombreEntePublico: $(formulario + "input[name='nombreEntePublicoOtro']").val().toUpperCase(),
                    areaAdscripcion: $(formulario + "input[name='areaAdscripcionOtro']").val().toUpperCase(),
                    empleoCargoComision: $(formulario + "input[name='empleoCargoComisionOtro']").val().toUpperCase(),
                    contratadoPorHonorarios: honorariosOtro,
                    nivelEmpleoCargoComision: $(formulario + "input[name='nivelEmpleoCargoComisionOtro']").val().toUpperCase(),
                    funcionPrincipal: $(formulario + "input[name='funcionPrincipalOtro']").val().toUpperCase(),
                    fechaTomaPosesion:$(formulario + "input[name='fechaTomaPosesionOtro']").val(),
                    telefonoOficina:{
                        telefono: $(formulario + "input[name='telefonoOtro']").val(),
                        extension: $(formulario + "input[name='extensionOtro']").val()
                    },
                    domicilio: domicilioOtro,
                    domicilioMexico: {
                        calle: "",
                        numeroExterior: "",
                        numeroInterior: "",
                        coloniaLocalidad: "",
                        municipioAlcaldia: {
                          clave: "",
                          valor: ""
                        },
                        entidadFederativa: {
                          clave: "",
                          valor: ""
                        },
                        codigoPostal: ""
                    },
                    domicilioExtranjero: {
                        calle: "",
                        numeroExterior: "",
                        numeroInterior: "",
                        ciudadLocalidad: "",
                        estadoProvincia: "",
                        pais: "MX",
                        codigoPostal: ""
                    },
                    aclaracionesObservaciones: $(formulario + "textarea[name='aclaracionesObservacionesOtro']").val().toUpperCase()
                };

                if (root.otroEmpleoCargoComision[uuidItem].domicilio == "MX"){
                    //domicilio mexico.
                    root.otroEmpleoCargoComision[uuidItem].domicilioMexico.calle = $("#domEmpMexicoOtro input[name='calleOtro']").val().toUpperCase();
                    root.otroEmpleoCargoComision[uuidItem].domicilioMexico.numeroExterior = $("#domEmpMexicoOtro input[name='numeroExteriorOtro']").val();
                    root.otroEmpleoCargoComision[uuidItem].domicilioMexico.numeroInterior = $("#domEmpMexicoOtro input[name='numeroInteriorOtro']").val();
                    root.otroEmpleoCargoComision[uuidItem].domicilioMexico.coloniaLocalidad = $("#domEmpMexicoOtro input[name='coloniaLocalidadOtro']").val().toUpperCase();
                    root.otroEmpleoCargoComision[uuidItem].domicilioMexico.municipioAlcaldia.clave = $("#domEmpMexicoOtro select[name='municipioAlcaldiaOtro'] option:selected").val();
                    root.otroEmpleoCargoComision[uuidItem].domicilioMexico.municipioAlcaldia.valor = $("#domEmpMexicoOtro select[name='municipioAlcaldiaOtro'] option:selected")[0].innerText;
                    root.otroEmpleoCargoComision[uuidItem].domicilioMexico.entidadFederativa.clave = $("#domEmpMexicoOtro select[name='entidadFederativaOtro'] option:selected").val();
                    root.otroEmpleoCargoComision[uuidItem].domicilioMexico.entidadFederativa.valor = $("#domEmpMexicoOtro select[name='entidadFederativaOtro'] option:selected")[0].innerText;
                    root.otroEmpleoCargoComision[uuidItem].domicilioMexico.codigoPostal = $("#domEmpMexicoOtro input[name='codigoPostalOtro']").val();
    
                    //domicilio extranjero
                    root.otroEmpleoCargoComision[uuidItem].domicilioExtranjero.calle = "";
                    root.otroEmpleoCargoComision[uuidItem].domicilioExtranjero.numeroExterior = "";
                    root.otroEmpleoCargoComision[uuidItem].domicilioExtranjero.numeroInterior = "";
                    root.otroEmpleoCargoComision[uuidItem].domicilioExtranjero.ciudadLocalidad = "";
                    root.otroEmpleoCargoComision[uuidItem].domicilioExtranjero.estadoProvincia = "";
                    root.otroEmpleoCargoComision[uuidItem].domicilioExtranjero.pais = "MX"
                    root.otroEmpleoCargoComision[uuidItem].domicilioExtranjero.codigoPostal = "";
                }
                else{
                    $("#domEmpMexicoOtro select[name='entidadFederativaOtro'] option:selected").val("07").trigger("change");
                    //domicilio mexico.
                    root.otroEmpleoCargoComision[uuidItem].domicilioMexico.calle = "";
                    root.otroEmpleoCargoComision[uuidItem].domicilioMexico.numeroExterior = "";
                    root.otroEmpleoCargoComision[uuidItem].domicilioMexico.numeroInterior = "";
                    root.otroEmpleoCargoComision[uuidItem].domicilioMexico.coloniaLocalidad = "";
                    root.otroEmpleoCargoComision[uuidItem].domicilioMexico.municipioAlcaldia.clave = $("#domEmpMexicoOtro select[name='municipioAlcaldiaOtro'] option:selected").val();
                    root.otroEmpleoCargoComision[uuidItem].domicilioMexico.municipioAlcaldia.valor = $("#domEmpMexicoOtro select[name='municipioAlcaldiaOtro'] option:selected")[0].innerText;
                    root.otroEmpleoCargoComision[uuidItem].domicilioMexico.entidadFederativa.clave = $("#domEmpMexicoOtro select[name='entidadFederativaOtro'] option:selected").val();
                    root.otroEmpleoCargoComision[uuidItem].domicilioMexico.entidadFederativa.valor = $("#domEmpMexicoOtro select[name='entidadFederativaOtro'] option:selected")[0].innerText;
                    root.otroEmpleoCargoComision[uuidItem].domicilioMexico.codigoPostal = "";
    
                    //domicilio extranjero
                    root.otroEmpleoCargoComision[uuidItem].domicilioExtranjero.calle = $("#domEmpExtranjeroOtro input[name='calleOtro']").val().toUpperCase();
                    root.otroEmpleoCargoComision[uuidItem].domicilioExtranjero.numeroExterior = $("#domEmpExtranjeroOtro input[name='numeroExteriorOtro']").val();
                    root.otroEmpleoCargoComision[uuidItem].domicilioExtranjero.numeroInterior = $("#domEmpExtranjeroOtro input[name='numeroInteriorOtro']").val();
                    root.otroEmpleoCargoComision[uuidItem].domicilioExtranjero.ciudadLocalidad = $("#domEmpExtranjeroOtro input[name='ciudadLocalidadOtro']").val().toUpperCase();
                    root.otroEmpleoCargoComision[uuidItem].domicilioExtranjero.estadoProvincia = $("#domEmpExtranjeroOtro input[name='estadoProvinciaOtro']").val().toUpperCase();
                    root.otroEmpleoCargoComision[uuidItem].domicilioExtranjero.pais = $("#domEmpExtranjeroOtro select[name='paisOtro'] option:selected").val();
                    root.otroEmpleoCargoComision[uuidItem].domicilioExtranjero.codigoPostal = $("#domEmpExtranjeroOtro input[name='codigoPostalOtro']").val();
                }
                
                pintarTablaOtrosEmpleos(seccionNo, seccionName);  
                
                $("#contentOtroEmpleoCargoComision1").removeClass("hide");
                $("#contentOtroEmpleoCargoComision2").addClass("hide");
                $("#btnAgregarOtrosEmpleos").removeClass("hide");

                $("#formEmpleoCargoComision .btnGuardar").removeClass("hide");
                $("#formEmpleoCargoComision .btnTerminar").removeClass("hide");
                $("#moduloEmpleoCargoComision .btnHabilitar").addClass("hide");
            }
        }
    }
    else{
        console.log("invalido");
    }    
}

window.pintarTablaOtrosEmpleos = function pintarTablaOtrosEmpleos(seccionNo, seccionName){
    var html="";
    const lista = jsonResult.declaracion.situacionPatrimonial.datosEmpleoCargoComision.otroEmpleoCargoComision;
    Object.keys(lista).forEach(function (row) {
        var params = { uuid: lista[row].uuid, seccionNo: seccionNo, seccionName: seccionName };
        html+="<tr id='" + lista[row].uuid + "'>";
        html+=" <td>" + lista[row].nivelOrdenGobierno +"</td>";
        html+=" <td>" + lista[row].ambitoPublico +"</td>";
        html+=" <td>" + lista[row].nombreEntePublico +"</td>";
        html+=" <td class='text-right'>";
        html+="     <button type='button' class='btn btn-sm btn-warning btnEditar' onclick='editarOtroEmpleo(\"" + btoa(JSON.stringify(params)) + "\");'>Editar</button>";
        html+="     <button type='button' class='btn btn-sm btn-danger btnEliminar' onclick='eliminarOtroEmpleo(\"" + btoa(JSON.stringify(params)) + "\");'>Eliminar</button>";              
        html+=" </td>";
        html+="</tr>";
    });
    $(".tblOtrosEmpleos tbody").empty().append(html);
    $("#tblOtrosEmpleos").removeClass("hide"); 
}

window.editarOtroEmpleo = function editarOtroEmpleo(data){
    let formOtro = "#formOtroEmpleoCargoComision ";
    let form ="#formEmpleoCargoComision ";
    let modulo ="#moduloEmpleoCargoComision ";    

    let dataItem = JSON.parse(atob(data));
    let root = jsonResult.declaracion.situacionPatrimonial.datosEmpleoCargoComision.otroEmpleoCargoComision;
    let item = root[dataItem.uuid];
    
    window.accion = "EDITAR";
    window.uuidOtro = dataItem.uuid;

    //let validator = $("#formOtroEmpleoCargoComision").validate();
    //validator.resetForm();
    $("#formOtroEmpleoCargoComision").trigger("reset");

    //$(formOtro + "select[name='tipoOperacion']").val(item.tipoOperacion);
    $(formOtro + "select[name='nivelOrdenGobiernoOtro']").val(item.nivelOrdenGobierno);
    $(formOtro + "select[name='ambitoPublicoOtro']").val(item.ambitoPublico);
    $(formOtro + "input[name='nombreEntePublicoOtro']").val(item.nombreEntePublico);
    $(formOtro + "input[name='areaAdscripcionOtro']").val(item.areaAdscripcion );
    $(formOtro + "input[name='empleoCargoComisionOtro']").val(item.empleoCargoComision);
    $(formOtro + "select[name='contratadoPorHonorariosOtro']").val(item.contratadoPorHonorarios.toString());
    $(formOtro + "input[name='nivelEmpleoCargoComisionOtro']").val(item.nivelEmpleoCargoComision);
    $(formOtro + "input[name='funcionPrincipalOtro']").val(item.funcionPrincipal);
    $(formOtro + "input[name='fechaTomaPosesionOtro']").val(item.fechaTomaPosesion);
    $(formOtro + "input[name='telefonoOtro'] ").val(item.telefonoOficina.telefono);
    $(formOtro + "input[name='extensionOtro']").val(item.telefonoOficina.extension);

    if (item.domicilio=="MX"){
        $(formOtro + "#domicilioEmpMXOtro").prop("checked", true);
        $(formOtro + "#domEmpMexicoOtro").removeClass("hide");
        $(formOtro + "#domEmpExtranjeroOtro").addClass("hide");
    }
    else{
        $(formOtro + "#domicilioEmpEXTOtro").prop("checked", true);
        $(formOtro + "#domEmpExtranjeroOtro").removeClass("hide");
        $(formOtro + "#domEmpMexicoOtro").addClass("hide");
    }
    //domicilio mexico.
    $("#domEmpMexicoOtro input[name='calleOtro']").val(item.domicilioMexico.calle);
    $("#domEmpMexicoOtro input[name='numeroExteriorOtro']").val(item.domicilioMexico.numeroExterior);
    $("#domEmpMexicoOtro input[name='numeroInteriorOtro']").val(item.domicilioMexico.numeroInterior);
    $("#domEmpMexicoOtro input[name='coloniaLocalidadOtro']").val(item.domicilioMexico.coloniaLocalidad);    
    $("#domEmpMexicoOtro select[name='entidadFederativaOtro']").val(item.domicilioMexico.entidadFederativa.clave).trigger("change");
    $("#domEmpMexicoOtro select[name='municipioAlcaldiaOtro']").val(item.domicilioMexico.municipioAlcaldia.clave);
    $("#domEmpMexicoOtro input[name='codigoPostalOtro']").val(item.domicilioMexico.codigoPostal);

    //domicilio extranjero
    $("#domEmpExtranjeroOtro input[name='calleOtro']").val(item.domicilioExtranjero.calle);
    $("#domEmpExtranjeroOtro input[name='numeroExteriorOtro']").val(item.domicilioExtranjero.numeroExterior);
    $("#domEmpExtranjeroOtro input[name='numeroInteriorOtro']").val(item.domicilioExtranjero.numeroInterior);
    $("#domEmpExtranjeroOtro input[name='ciudadLocalidadOtro']").val(item.domicilioExtranjero.ciudadLocalidad);
    $("#domEmpExtranjeroOtro input[name='estadoProvinciaOtro']").val(item.domicilioExtranjero.estadoProvincia);
    $("#domEmpExtranjeroOtro select[name='paisOtro']").val(item.domicilioExtranjero.pais);
    $("#domEmpExtranjeroOtro input[name='codigoPostalOtro']").val(item.domicilioExtranjero.codigoPostal);

    //generales
    $(formOtro + "textarea[name='aclaracionesObservacionesOtro']").val(item.aclaracionesObservaciones);

    $(form + ".btnGuardar").addClass("hide");
    $(form + ".btnTerminar").addClass("hide");
    $(modulo + ".btnHabilitar").addClass("hide");     
            
    $("#btnAgregarOtrosEmpleos").addClass("click");    
    $("#contentOtroEmpleoCargoComision1").addClass("hide");
    $("#contentOtroEmpleoCargoComision2").removeClass("hide");        
    $("#tblOtrosEmpleos").addClass("hide");
    
    $("#btnAgregarOtroEmpleoOK").html('<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check" viewBox="0 0 16 16"><path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z"/></svg> Actualizar');   
}

window.eliminarOtroEmpleo = function eliminarOtroEmpleo(data){
    var item = JSON.parse(atob(data));
    //elimina item en object json y tabla.
    delete jsonResult.declaracion.situacionPatrimonial.datosEmpleoCargoComision.otroEmpleoCargoComision[item.uuid];
    $("#" + item.uuid).remove();
    if (Object.keys(jsonResult.declaracion.situacionPatrimonial.datosEmpleoCargoComision.otroEmpleoCargoComision).length==0){
        $("#modulo" + item.seccionName + " .btnTerminar").addClass("hide");
    }
}

window.accion = "";
window.uuidOtro ="";

$("#formEmpleoCargoComision select[name='nivelOrdenGobierno']").on("change",function() {
    console.log ("onchange de nivelOrdenGobierno");
    console.log(this.value);
    $("#formEmpleoCargoComision select[name='ambitoPublico']").prop("disabled", false);
    if(this.value === "MUNICIPAL_ALCALDIA"){
        $("#formEmpleoCargoComision select[name='ambitoPublico']").val("EJECUTIVO");
        $("#formEmpleoCargoComision select[name='ambitoPublico']").prop("disabled", true);
    }
});

$("#formOtroEmpleoCargoComision select[name='nivelOrdenGobiernoOtro']").on("change",function() {
    console.log ("onchange de nivelOrdenGobierno");
    console.log(this.value);
    $("#formOtroEmpleoCargoComision select[name='ambitoPublicoOtro']").prop("disabled", false);
    if(this.value === "MUNICIPAL_ALCALDIA"){
        $("#formOtroEmpleoCargoComision select[name='ambitoPublicoOtro']").val("EJECUTIVO");
        $("#formOtroEmpleoCargoComision select[name='ambitoPublicoOtro']").prop("disabled", true);
    }
});