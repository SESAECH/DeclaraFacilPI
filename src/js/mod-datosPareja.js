

function funcionalidadPareja(seccionNo, seccionName, seccionStatus){
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
window.funcionalidadPareja = funcionalidadPareja;

function guardarFormPareja(seccionNo, seccionName){
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
            var root = jsonResult.declaracion.situacionPatrimonial.datosPareja;

            root.ninguno =                  $("#checkNingunaPareja")[0].checked;
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
            actualizarStatusSeccion("situacion_patrimonial", seccionNo, seccionName, btn.originalEvent.submitter.dataset.seccionstatus);            
        }
    });
}

function loadInfoPareja(seccionName){
    var root = jsonResult.declaracion.situacionPatrimonial.datosPareja;
    if (root.ninguno){
        $("#checkNingunaPareja")[0].checked=true;
    }
    else{
        $("#checkNingunaPareja")[0].checked=false;
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
window.loadInfoPareja = loadInfoPareja;
