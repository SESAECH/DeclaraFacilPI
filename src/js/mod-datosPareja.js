var form="#formPareja ";

window.initPareja = function initPareja(data){
    var seccion = JSON.parse(atob(data));
    var seccionName = seccion.moduloName.replace("modulo","");
    var form = "#form" + seccion.moduloName.replace("modulo", "")+ " ";
    var modulo = "#" + seccion.moduloName + " ";

    //cargar catalogos.    
    loadCat(relacionConDeclarante, form + ".CBOrelacionConDeclarante");
    loadCat(entidadFederativa, form + ".CBOentidadFederativa");    
    loadCat(paises, form + ".CBOpais");
    loadCat(nivelOrdenGobierno, form + ".CBOnivelOrdenGobierno");
    loadCat(ambitoPublico, form + ".CBOambitoPublico");
    loadCat(sector, form + ".CBOsector");
    loadCat(moneda, form + ".CBOmoneda");
    loadCat(lugarDondeReside, form + ".CBOlugarDondeReside");
    loadCat(actividadLaboral, form + ".CBOactividadLaboral");
    loadCat(tipoOperacion, form + ".CBOtipoOperacion");

    $(form + ".CBOentidadFederativa").on('change', function() {
        loadMunicipios(form + ".CBOmunicipioAlcaldia", this.value);
    });
    if(jsonResult.captura.tipo_declaracion == "INICIAL"){
        $(form + "select[name='tipoOperacion']").val("AGREGAR").prop("disabled", true);
    }
    //validar en que proceso se encuentra el modulo seleccionado.
    $(form + '.CBOlugarDondeReside').on('change', function() {
        $(form + ".contentDomPareja").addClass("hide");
        if(this.value == "MÉXICO"){
            $("#domParejaMxContent").removeClass("hide");
        }
        else if(this.value == "EXTRANJERO"){
            $("#domParejaExContent").removeClass("hide");
        }
    });

    $(form + '.CBOactividadLaboral').on('change', function() {        
        if(this.value == "PUB"){                                            
            $("#laboralParejaPubContent").removeClass("hide");
            $("#laboralParejaPriContent").addClass("hide");
        }
        else if(this.value == "PRI"){                                            
            $("#laboralParejaPubContent").addClass("hide");
            $("#laboralParejaPriContent").removeClass("hide");
        }
        else{
            $("#laboralParejaPubContent").addClass("hide");
            $("#laboralParejaPriContent").addClass("hide");
        }
    });

    //validar status de la sección.
    switch(seccion.status){
        case "SIN_INFO":
            //asginar valores predeterminados a catálogos(ayuda al usuario).
            jsonResult.declaracion[seccion.apartado][seccion.seccion].ninguno=false;
            $("#chkNingunoPareja").prop("disabled", false);
            $("#chkNingunoPareja")[0].checked=false;
            $("#chkNingunoPareja").trigger("change");
             //asginar valores predeterminados a catálogos(ayuda al usuario).
             $(form +'.CBOlugarDondeReside').val("MÉXICO").change();
             $(form +'.CBOactividadLaboral').val("NIN").change();
             $(form +".CBOentidadFederativa").val("07").change();
             $(form +".CBOmoneda").val("MXN");
 
             $(form + ".btnGuardar").removeClass("hide");
             $(form + ".btnTerminar").removeClass("hide");
             $(modulo + ".btnHabilitar").addClass("hide");
        break;
        case "EN_PROCESO":
            window["loadInfo" + seccionName](seccionName);            
            $(".btnGuardar, .btnTerminar").removeClass("hide");
            $(".btnHabilitar").addClass("hide");           
            break;
        case "TERMINADO":
            window["loadInfo" + seccionName](seccionName);     
            $("#form" + seccionName +" :input").prop("disabled", true);
            $("#chkNingunoPareja").prop("disabled", true);        
            $(modulo + ".btnGuardar").addClass("hide");
            $(modulo + ".btnTerminar").addClass("hide");
            $(modulo + ".btnHabilitar").removeClass("hide").prop("disabled", false);;
        break;
    }

    $(form + ".btnGuardar").unbind("click");
    $(form + ".btnTerminar").unbind("click");
    $(modulo + ".btnHabilitar").unbind("click");

    $(form + ".btnGuardar").on('click',function() {
        window["guardarForm" + seccionName](seccion.no, seccionName, seccion.apartado);
    });

    $(modulo + ".btnTerminar").on('click',function() {        
        window["guardarForm" + seccionName](seccion.no, seccionName, seccion.apartado);
    });
    
    $(modulo + ".btnHabilitar").on("click",function() {

        habilitarSeccion(seccion.apartado, seccion.no, seccionName);
        $("#chkNingunoPareja").prop("disabled", false);
        $(form +" :input").prop("disabled", false);
        $(modulo + "textarea[name='aclaracionesObservaciones']").prop("disabled", false);
        if ($("#chkNingunoPareja")[0].checked){
            $(form + ".btnGuardar").addClass("hide");
        }
        else{
            $(form + ".btnGuardar").removeClass("hide");
        }
        
    });

    $(".content_seccion").addClass("hide");
    $("#" + seccion.moduloName).removeClass("hide");
}

$("#chkNingunoPareja").on("change",function() {
    if(this.checked){
        $("#parejaContent").addClass("hide");
        $(form + ".btnGuardar").addClass("hide");
        $(form + ".btnTerminar").removeClass("hide");
    }
    else{
        $("#parejaContent").removeClass("hide");
        $(form + ".btnGuardar").removeClass("hide");
        $(form + ".btnTerminar").removeClass("hide");
    }
});

//--------------------------------------------------------------//

function f11uncionalidadPareja(seccionNo, seccionName, seccionStatus){
    document.forms["form" + seccionName].getElementsByClassName("btnGuardar")[0].dataset.seccion_no = seccionNo; ;
    document.forms["form" + seccionName].getElementsByClassName("btnGuardar")[0].dataset.seccion_name = seccionName; ;
    //cargar catalogos.    
    loadCat(relacionConDeclarante, ".CBOrelacionConDeclarante");
    loadCat(entidadFederativa, ".CBOentidadFederativa");    
    loadCat(paises, ".CBOpais");
    loadCat(nivelOrdenGobierno, ".CBOnivelOrdenGobierno");
    loadCat(ambitoPublico, ".CBOambitoPublico");
    loadCat(sector, ".CBOsector");
    loadCat(moneda, ".CBOmoneda");
    loadCat(lugarDondeReside, ".CBOlugarDondeReside");
    loadCat(actividadLaboral, ".CBOactividadLaboral");
    loadCat(tipoOperacion, ".CBOtipoOperacion");
    
    $("#form" + seccionName + " .CBOentidadFederativa").on('change', function() {
        loadMunicipios(".CBOmunicipioAlcaldia", this.value);
    });
    if(captura.tipo_declaracion == "INICIAL"){
        $("#form" + seccionName + " select[name='tipoOperacion']").val("AGREGAR").prop("disabled", true);
    }
    //validar en que proceso se encuentra el modulo seleccionado.
    $('.CBOlugarDondeReside').on('change', function() {
        $(".contentDomPareja").addClass("hide");
        if(this.value == "MÉXICO"){
            $("#domParejaMxContent").removeClass("hide");
        }
        else if(this.value == "EXTRANJERO"){
            $("#domParejaExContent").removeClass("hide");
        }
    });

    $('.CBOactividadLaboral').on('change', function() {        
        if(this.value == "PUB"){                                            
            $("#laboralParejaPubContent").removeClass("hide");
            $("#laboralParejaPriContent").addClass("hide");
        }
        else if(this.value == "PRI"){                                            
            $("#laboralParejaPubContent").addClass("hide");
            $("#laboralParejaPriContent").removeClass("hide");
        }
        else{
            $("#laboralParejaPubContent").addClass("hide");
            $("#laboralParejaPriContent").addClass("hide");
        }
    });

    switch(seccionStatus){
        case "SIN_INFO": 
            //asginar valores predeterminados a catálogos(ayuda al usuario).
            $('.CBOlugarDondeReside').val("MÉXICO").change();
            $('.CBOactividadLaboral').val("NIN").change();
            $(".CBOentidadFederativa").val("07").change();
            $(".CBOmoneda").val("MXN");
            $("#contentSeccion" + seccionNo + " textarea[name='aclaracionesObservaciones']").val("");
            $(".btnGuardar, .btnTerminar").removeClass("hide");
            $(".btnHabilitar").addClass("hide");
            break;
        case "EN_PROCESO":
            loadInfoPareja(seccionName);
            $(".btnGuardar, .btnTerminar").removeClass("hide");
            $(".btnHabilitar").addClass("hide");
            break;
        case "TERMINADO":            
            loadInfoPareja(seccionName);
            $("#form" + seccionName +" :input").prop("disabled", true);

            $(".btnGuardar, .btnTerminar").addClass("hide");
            $(".btnHabilitar").removeClass("hide").prop("disabled", false);
            break;
    }    
    
    //funcionalidad a buttons
    $(".btnGuardar").on('click',function() {
        guardarFormPareja(seccionNo, seccionName);
    });
    $(".btnTerminar").on('click',function() {
        guardarFormPareja(seccionNo, seccionName);
    });
    $(".btnHabilitar").on("click",function() {
        habilitarSeccion("situacion_patrimonial", seccionNo, seccionName);
    });    
}

function guardarFormPareja(seccionNo, seccionName, seccionApartado){
    if ($("#chkNingunoPareja")[0].checked){
        $("#chkNingunoPareja").prop("disabled", true);
        jsonResult.declaracion[seccionApartado].datosPareja= {
            "ninguno": true,
            "tipoOperacion": "AGREGAR",
            "nombre": "",
            "primerApellido": "",
            "segundoApellido": "",
            "fechaNacimiento": "",
            "rfc": "",
            "relacionConDeclarante": "",
            "ciudadanoExtranjero": false,
            "curp": "",
            "esDependienteEconomico": false,
            "habitaDomicilioDeclarante": false,
            "lugarDondeReside": "NINGUNO",
            "domicilioMexico": {
              "calle": "",
              "numeroExterior": "",
              "numeroInterior": "",
              "coloniaLocalidad": "",
              "municipioAlcaldia": {
                "clave": "",
                "valor": ""
              },
              "entidadFederativa": {
                "clave": "",
                "valor": ""
              },
              "codigoPostal": ""
            },
            "domicilioExtranjero": {
              "calle": "",
              "numeroExterior": "",
              "numeroInterior": "",
              "ciudadLocalidad": "",
              "estadoProvincia": "",
              "pais": "MX",
              "codigoPostal": ""
            },
            "actividadLaboral": {
              "clave": "NIN ",
              "valor": "NINGUNO"
            },
            "actividadLaboralSectorPublico": {
              "nivelOrdenGobierno": "",
              "ambitoPublico": "",
              "nombreEntePublico": "",
              "areaAdscripcion": "",
              "empleoCargoComision": "",
              "funcionPrincipal": "",
              "salarioMensualNeto": {
                "valor": 0,
                "moneda": "MXN"
              },
              "fechaIngreso": ""
            },
            "actividadLaboralSectorPrivadoOtro": {
              "nombreEmpresaSociedadAsociacion": "",
              "empleoCargoComision": "",
              "rfc": "",
              "fechaIngreso": "",
              "sector": {
                "clave": "AGRI",
                "valor": "AGRICULTURA"
              },
              "salarioMensualNeto": {
                "valor": 0,
                "moneda": "MXN"
              },
              "proveedorContratistaGobierno": false
            },
            "aclaracionesObservaciones": $("#form" + seccionName + " textarea[name='aclaracionesObservaciones']").val()
          };
          actualizarStatusSeccion(seccionApartado, seccionNo, seccionName, "TERMINADO"); 
    }
    else{
    /* $.validator.addMethod("RFC", function (value, element) {
        if ( value !== '' ) {
            var patt = new RegExp("^[A-Z,Ñ,&]{3,4}[0-9]{2}[0-1][0-9][0-3][0-9][A-Z,0-9]?[A-Z,0-9]?[0-9,A-Z]?$");
            return patt.test(value);
        } else {
            return false;
        }
    }, "Ingrese un RFC válido."); */
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
            tipoOperacion : { required: true },
            nombre : { required: true, maxlength: 50 },
            primerApellido : { required: true },
            fechaNacimiento : { required: true },
            /* rfc : { required: true, minlength: 12, maxlength: 13 }, */
            curp : { required: true, minlength: 18, maxlength: 18, CURP: true },
            relacionConDeclarante : { required: true },
            esDependienteEconomico : { required: true },
            ciudadanoExtranjero : { required: true },
            habitaDomicilioDeclarante : { required: true },
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
            // empleoCargoComision : { required: true },
            /* rfc : { required: true, minlength: 10, maxlength: 10, RFC: true }, */
            // fechaIngreso : { required: true },
            sector : { required: true },
            // salarioMensualNeto : { required: true, number: true },
            proveedorContratistaGobierno : { required: true }
        },
        messages: {
            tipoOperacion : { required: "Selecione el tipo de operación." },
            nombre : { required: "Ingrese el nombre.", maxlength: "El máximo de caracteres es de 50." },
            primerApellido : { required: "Ingrese el primer apellido." },
            fechaNacimiento : { required: "Ingrese la fecha de nacimmiento." },
           /*  rfc : { required: "Ingrese el RFC.", minlength: "El minimo de caracteres es de 12.", maxlength: "El máximo de caracteres es de 13." }, */
            curp : { required: "Ingrese la CURP.", minlength: "El mínimo de caracteres es de 18.", maxlength: "El máximo de caracteres es de 18." },
            relacionConDeclarante : { required: "Seleccione la relación con el declarante." },
            esDependienteEconomico : { required: "Seleccione si es dependiente económico." },
            ciudadanoExtranjero : { required: "Seleccione si es ciudadano extranjero." },
            habitaDomicilioDeclarante : { required: "Seleccione si habita el domicilio del declarante." },
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
            // empleoCargoComision : { required: "Ingrese el empleo, cargo o comisión." },
            rfc : { required: "Ingrese el RFC.", minlength: "El minimo de caracteres es de 12.", maxlength: "El máximo de caracteres es de 13." },
            // fechaIngreso : { required: "Ingrese la fecha de ingreso." },
            sector : { required: "Seleccione el sector." },
            // salarioMensualNeto : { required: "Ingrese el salario mensual neto.", number: "Solo se permiten caracteres numéricos." },
            proveedorContratistaGobierno : { required: "Seleccione si es contratista de gobierno." }
        },
        // Make sure the form is submitted to the destination defined
        // in the "action" attribute of the form when valid
        submitHandler: function(form, btn) {
            var root = jsonResult.declaracion.situacionPatrimonial.datosPareja;

            root.ninguno =                  $("#chkNingunoPareja")[0].checked;
            root.tipoOperacion =            $("#form" + seccionName + " select[name='tipoOperacion']").val();
            root.nombre =                   $("#form" + seccionName + " input[name='nombre']").val();
            root.primerApellido =           $("#form" + seccionName + " input[name='primerApellido']").val();
            root.segundoApellido =          $("#form" + seccionName + " input[name='segundoApellido']").val();
            root.fechaNacimiento =          $("#form" + seccionName + " input[name='fechaNacimiento']").val();
            root.rfc =                      $("#form" + seccionName + " input[name='rfc']").val();
            root.relacionConDeclarante =    $("#form" + seccionName + " select[name='relacionConDeclarante'] option:selected").val();            
            root.curp =                     $("#form" + seccionName + " input[name='curp']").val();

            root.esDependienteEconomico =   $("#form" + seccionName + " input[type='radio'][name='esDependienteEconomico']:checked").val().toLowerCase() == 'true' ? true : false;
            root.ciudadanoExtranjero =      $("#form" + seccionName + " input[type='radio'][name='ciudadanoExtranjero']:checked").val().toLowerCase() == 'true' ? true : false;
            root.habitaDomicilioDeclarante = $("#form" + seccionName + " input[type='radio'][name='habitaDomicilioDeclarante']:checked").val().toLowerCase() == 'true' ? true : false;

            root.lugarDondeReside =         $("#form" + seccionName + " select[name='lugarDondeReside'] option:selected").val();
            
            //domicilio mexico.
            root.domicilioMexico.calle =                    $("#domParejaMxContent input[name='calle']").val();
            root.domicilioMexico.numeroExterior =           $("#domParejaMxContent input[name='numeroExterior']").val();
            root.domicilioMexico.numeroInterior =           $("#domParejaMxContent input[name='numeroInterior']").val();
            root.domicilioMexico.coloniaLocalidad =         $("#domParejaMxContent input[name='coloniaLocalidad']").val();
            root.domicilioMexico.municipioAlcaldia.clave =  $("#domParejaMxContent select[name='municipioAlcaldia'] option:selected").val();
            root.domicilioMexico.municipioAlcaldia.valor =  $("#domParejaMxContent select[name='municipioAlcaldia'] option:selected")[0].innerText;
            root.domicilioMexico.entidadFederativa.clave =  $("#domParejaMxContent select[name='entidadFederativa'] option:selected").val();
            root.domicilioMexico.entidadFederativa.valor =  $("#domParejaMxContent select[name='entidadFederativa'] option:selected")[0].innerText;
            root.domicilioMexico.codigoPostal =             $("#domParejaMxContent input[name='codigoPostal']").val();
            
            //domicilio extranjero
            root.domicilioExtranjero.calle =                $("#domParejaExContent input[name='calle']").val();
            root.domicilioExtranjero.numeroExterior =       $("#domParejaExContent input[name='numeroExterior']").val();
            root.domicilioExtranjero.numeroInterior =       $("#domParejaExContent input[name='numeroInterior']").val();
            root.domicilioExtranjero.ciudadLocalidad =      $("#domParejaExContent input[name='ciudadLocalidad']").val();
            root.domicilioExtranjero.estadoProvincia =      $("#domParejaExContent input[name='estadoProvincia']").val();
            root.domicilioExtranjero.pais =                 $("#domParejaExContent select[name='pais'] option:selected").val();
            root.domicilioExtranjero.codigoPostal =         $("#domParejaExContent input[name='codigoPostal']").val();

            root.actividadLaboral.clave =  $("#form" + seccionName + " select[name='actividadLaboral'] option:selected").val();
            root.actividadLaboral.valor =  $("#form" + seccionName + " select[name='actividadLaboral'] option:selected")[0].innerText;
            
            root.actividadLaboralSectorPublico.nivelOrdenGobierno =         $("#laboralParejaPubContent select[name='nivelOrdenGobierno'] option:selected").val();
            root.actividadLaboralSectorPublico.ambitoPublico =              $("#laboralParejaPubContent select[name='ambitoPublico'] option:selected").val();
            root.actividadLaboralSectorPublico.nombreEntePublico =          $("#laboralParejaPubContent input[name='nombreEntePublico']").val();
            root.actividadLaboralSectorPublico.areaAdscripcion =            $("#laboralParejaPubContent input[name='areaAdscripcion']").val();
            root.actividadLaboralSectorPublico.empleoCargoComision =        $("#laboralParejaPubContent input[name='empleoCargoComision']").val();
            root.actividadLaboralSectorPublico.funcionPrincipal =           $("#laboralParejaPubContent input[name='funcionPrincipal']").val();
            root.actividadLaboralSectorPublico.salarioMensualNeto.valor =   $("#laboralParejaPubContent input[name='valor']").val();
            root.actividadLaboralSectorPublico.salarioMensualNeto.moneda =  $("#laboralParejaPubContent select[name='moneda'] option:selected").val();
            root.actividadLaboralSectorPublico.fechaIngreso =               $("#laboralParejaPubContent input[name='fechaIngreso']").val();

            root.actividadLaboralSectorPrivadoOtro.nombreEmpresaSociedadAsociacion =    $("#laboralParejaPriContent input[name='nombreEmpresaSociedadAsociacion']").val();
            root.actividadLaboralSectorPrivadoOtro.empleoCargoComision =                $("#laboralParejaPriContent input[name='empleoCargoComision']").val();
            root.actividadLaboralSectorPrivadoOtro.rfc =                                $("#laboralParejaPriContent input[name='rfc']").val();
            root.actividadLaboralSectorPrivadoOtro.fechaIngreso =                       $("#laboralParejaPriContent input[name='fechaIngreso']").val();
            root.actividadLaboralSectorPrivadoOtro.sector.clave =                       $("#laboralParejaPriContent select[name='sector'] option:selected").val();
            root.actividadLaboralSectorPrivadoOtro.sector.valor =                       $("#laboralParejaPriContent select[name='sector'] option:selected")[0].innerText;
            root.actividadLaboralSectorPrivadoOtro.salarioMensualNeto.valor =           $("#laboralParejaPriContent input[name='valor']").val();
            root.actividadLaboralSectorPrivadoOtro.salarioMensualNeto.moneda =          $("#laboralParejaPriContent select[name='moneda'] option:selected").val();
            root.actividadLaboralSectorPrivadoOtro.proveedorContratistaGobierno =       $("#laboralParejaPriContent input[type='radio'][name='proveedorContratistaGobierno']:checked").val().toLowerCase() == 'true' ? true : false;
            //generales
            root.aclaracionesObservaciones = $("#form" + seccionName + " textarea[name='aclaracionesObservaciones']").val();
        
            //actualiza el status de la sección (en proceso/terminado).
            actualizarStatusSeccion(seccionApartado, seccionNo, seccionName, btn.originalEvent.submitter.dataset.seccionstatus);            
        }
    });
    }
}

function loadInfoPareja(seccionName){
    var root = jsonResult.declaracion.situacionPatrimonial.datosPareja;
    if (root.ninguno){
        $("#chkNingunoPareja")[0].checked=true;
        $("#chkNingunoPareja").trigger("change");
    }
    else{
        $("#chkNingunoPareja")[0].checked=false;
        $("#chkNingunoPareja").trigger("change");
        $("#form" + seccionName + " select[name='tipoOperacion']").val(root.tipoOperacion);
        $("#form" + seccionName + " input[name='nombre']").val(root.nombre);
        $("#form" + seccionName + " input[name='primerApellido']").val(root.primerApellido);
        $("#form" + seccionName + " input[name='segundoApellido']").val(root.segundoApellido);
        $("#form" + seccionName + " input[name='fechaNacimiento']").val(root.fechaNacimiento);
        $("#form" + seccionName + " input[name='rfc']").val(root.rfc);
        $("#form" + seccionName + " select[name='relacionConDeclarante']").val(root.relacionConDeclarante);            
        $("#form" + seccionName + " input[name='curp']").val(root.curp);
    
        $("#form" + seccionName + " input[type='radio'][name='esDependienteEconomico']").val(root.esDependienteEconomico);
        $("#form" + seccionName + " input[type='radio'][name='ciudadanoExtranjero']").val(root.ciudadanoExtranjero);
        $("#form" + seccionName + " input[type='radio'][name='habitaDomicilioDeclarante']").val(root.habitaDomicilioDeclarante);

        $("#form" + seccionName + " select[name='lugarDondeReside']").val(root.lugarDondeReside).change();

        //domicilio mexico.
        $("#domParejaMxContent input[name='calle']").val(root.domicilioMexico.calle);
        $("#domParejaMxContent input[name='numeroExterior']").val(root.domicilioMexico.numeroExterior);
        $("#domParejaMxContent input[name='numeroInterior']").val(root.domicilioMexico.numeroInterior);
        $("#domParejaMxContent input[name='coloniaLocalidad']").val(root.domicilioMexico.coloniaLocalidad);
        $("#domParejaMxContent select[name='entidadFederativa']").val(root.domicilioMexico.entidadFederativa.clave).change();
        $("#domParejaMxContent select[name='municipioAlcaldia']").val(root.domicilioMexico.municipioAlcaldia.clave);    
        $("#domParejaMxContent input[name='codigoPostal']").val(root.domicilioMexico.codigoPostal);
        
        //domicilio extranjero
        $("#domParejaExContent input[name='calle']").val(root.domicilioExtranjero.calle);
        $("#domParejaExContent input[name='numeroExterior']").val(root.domicilioExtranjero.numeroExterior);
        $("#domParejaExContent input[name='numeroInterior']").val(root.domicilioExtranjero.numeroInterior);
        $("#domParejaExContent input[name='ciudadLocalidad']").val(root.domicilioExtranjero.ciudadLocalidad);
        $("#domParejaExContent input[name='estadoProvincia']").val(root.domicilioExtranjero.estadoProvincia);
        $("#domParejaExContent select[name='pais']").val(root.domicilioExtranjero.pais);
        $("#domParejaExContent input[name='codigoPostal']").val(root.domicilioExtranjero.codigoPostal);
    
        $("#form" + seccionName + " select[name='actividadLaboral']").val(root.actividadLaboral.clave).change();
        
        $("#laboralParejaPubContent select[name='nivelOrdenGobierno']").val(root.actividadLaboralSectorPublico.nivelOrdenGobierno);
        $("#laboralParejaPubContent select[name='ambitoPublico']").val(root.actividadLaboralSectorPublico.ambitoPublico);
        $("#laboralParejaPubContent input[name='nombreEntePublico']").val(root.actividadLaboralSectorPublico.nombreEntePublico);
        $("#laboralParejaPubContent input[name='areaAdscripcion']").val(root.actividadLaboralSectorPublico.areaAdscripcion);
        $("#laboralParejaPubContent input[name='empleoCargoComision']").val(root.actividadLaboralSectorPublico.empleoCargoComision);
        $("#laboralParejaPubContent input[name='funcionPrincipal']").val(root.actividadLaboralSectorPublico.funcionPrincipal);
        $("#laboralParejaPubContent input[name='valor']").val(root.actividadLaboralSectorPublico.salarioMensualNeto.valor);
        $("#laboralParejaPubContent select[name='moneda']").val(root.actividadLaboralSectorPublico.salarioMensualNeto.moneda);
        $("#laboralParejaPubContent input[name='fechaIngreso']").val(root.actividadLaboralSectorPublico.fechaIngreso);
    
        $("#laboralParejaPriContent input[name='nombreEmpresaSociedadAsociacion']").val(root.actividadLaboralSectorPrivadoOtro.nombreEmpresaSociedadAsociacion);
        $("#laboralParejaPriContent input[name='empleoCargoComision']").val(root.actividadLaboralSectorPrivadoOtro.empleoCargoComision);
        $("#laboralParejaPriContent input[name='rfc']").val(root.actividadLaboralSectorPrivadoOtro.rfc);
        $("#laboralParejaPriContent input[name='fechaIngreso']").val(root.actividadLaboralSectorPrivadoOtro.fechaIngreso);
        $("#laboralParejaPriContent select[name='sector']").val(root.actividadLaboralSectorPrivadoOtro.sector.clave);    
        $("#laboralParejaPriContent input[name='valor']").val(root.actividadLaboralSectorPrivadoOtro.salarioMensualNeto.valor);
        $("#laboralParejaPriContent select[name='moneda']").val(root.actividadLaboralSectorPrivadoOtro.salarioMensualNeto.moneda);
        $("#laboralParejaPriContent input[type='radio'][name='proveedorContratistaGobierno']").val(root.actividadLaboralSectorPrivadoOtro.proveedorContratistaGobierno);
        //generales
        $("#form" + seccionName + " textarea[name='aclaracionesObservaciones']").val(root.aclaracionesObservaciones);        
    }  
}