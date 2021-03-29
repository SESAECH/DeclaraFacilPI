
window.funcionalidadDependientesEconomicos = function funcionalidadDependientesEconomicos(seccionNo, seccionName, seccionStatus){
    $(".btnAgregarDependientesEconomicos").attr('data-seccion_name', seccionName);
    $(".btnAgregarDependientesEconomicos").attr('data-seccion_no', seccionNo);
    $("#modulo"+seccionName + " .formSecundario").addClass("hide");
    //validar en que proceso se encuentra el modulo seleccionado.
    switch(seccionStatus){
        case "SIN_INFO": 
            //asginar valores predeterminados a catálogos(ayuda al usuario).
            jsonResult.declaracion.situacionPatrimonial.datosDependienteEconomico.ninguno=true;
            $("#contentSeccion" + seccionNo + " textarea[name='aclaracionesObservaciones']").val("");
            $(".btnAgregar" + seccionName).removeClass("hide");
            $(".btnTerminar" + seccionName).addClass("hide");
            $(".formSecundario").addClass("hide");
        break;
        case "EN_PROCESO":
            funcionalidadTablaDependientesEconomicos(seccionNo, seccionName);
            $(".btnAgregar" + seccionName).removeClass("hide");
            $(".btnTerminar" + seccionName).removeClass("hide");
            $(".btnHabilitar" + seccionName).addClass("hide");
            break;
        case "TERMINADO":
            funcionalidadTablaDependientesEconomicos(seccionNo, seccionName);   
            if (jsonResult.declaracion.situacionPatrimonial.datosDependienteEconomico.ninguno){
                $(".chkNinguno")[0].checked=true;
            }
            $("#contentSeccion" + seccionNo +" textarea[name='aclaracionesObservaciones']").val(jsonResult.declaracion.situacionPatrimonial.datosDependienteEconomico.aclaracionesObservaciones).prop("disabled", true);

            $(".btnEditar, .btnEliminar").addClass("hide");
            $(".btnAgregar" + seccionName).addClass("hide");
            $(".btnTerminar" + seccionName).addClass("hide");
            $(".btnHabilitar" + seccionName).removeClass("hide");
        break;
    }

    $(".btnAgregarDependientesEconomicos").on('click',function() {
        funcionalidadGuardarRegistroDependientesEconomicos(this.dataset.seccion_no, this.dataset.seccion_name, "NUEVO");
        $(".CBOlugarDondeReside").val("MÉXICO").change();
        $(".CBOentidadFederativa").val("07").change();
        $(".CBOpais").val("MX");
        $(".CBOactividadLaboral").val("NIN").change();
    });

    $(".btnTerminarDependientesEconomicos").on('click',function() {
        jsonResult.declaracion.situacionPatrimonial.datosDependienteEconomico.aclaracionesObservaciones =  $("#contentSeccion" + seccionNo + " textarea[name='aclaracionesObservaciones']").val();
        //inhabilitar controles del modulo.
        $(".btnTerminarDependientesEconomicos, .btnAgregarDependientesEconomicos, .btnEditar, .btnEliminar").addClass("hide");
        $(".chkNinguno").prop("disabled", true);
        $("#contentSeccion" + seccionNo +" textarea[name='aclaracionesObservaciones']").prop("disabled", true);
        //cambiar status.
        $(".btnHabilitarDependientesEconomicos").removeClass("hide");
        captura.declaracion.situacion_patrimonial.secciones[seccionNo].status= "TERMINADO";
        $(".status-seccion-patrimonial-" + seccionNo).removeClass("indicador-status indicador-status-process").addClass("indicador-status-success").text("TERMINADO");
    });
    
    $(".btnHabilitarDependientesEconomicos").on("click",function() {        
        //inhabilitar controles del modulo.
        if (jsonResult.declaracion.situacionPatrimonial.datosDependienteEconomico.ninguno){
            $(".btnTerminarDependientesEconomicos").removeClass("hide");
        }
        else{
            $(".btnTerminarDependientesEconomicos, .btnAgregarDependientesEconomicos, .btnEditar, .btnEliminar").removeClass("hide");
        }
        $(".chkNinguno").prop("disabled", false);
        $("#contentSeccion" + seccionNo + " textarea[name='aclaracionesObservaciones']").prop("disabled", false);
        //cambiar status.
        $(".btnHabilitarDependientesEconomicos").addClass("hide");
        captura.declaracion.situacion_patrimonial.secciones[seccionNo].status= "EN_PROCESO";
        $(".status-seccion-patrimonial-" + seccionNo).removeClass("indicador-status indicador-status-success").addClass("indicador-status-process").text("EN PROCESO");
    });
};

//funcionalidad tabla html y buttons.
window.funcionalidadTablaDependientesEconomicos = function funcionalidadTablaDependientesEconomicos(seccionNo, seccionName){
    pintarTablaDependientesEconomicos(seccionNo, seccionName);
    //funcionalidad de buttons del registro.    
    $(".btnEliminar").on('click',function() { 
        //elimina item en object json y tabla.
        delete jsonResult.declaracion.situacionPatrimonial.datosDependienteEconomico.dependienteEconomico[this.dataset.uuid];
        $("#" + this.dataset.uuid).remove();       
        if (Object.keys(jsonResult.declaracion.situacionPatrimonial.datosDependienteEconomico.dependienteEconomico).length==0){
            $(".btnTerminar" + this.dataset.seccion_name).addClass("hide");
        }
    });

    $(".btnEditar").on('click',function() {
        funcionalidadGuardarRegistroDependientesEconomicos(this.dataset.seccion_no, this.dataset.seccion_name, "EDITAR", this.dataset.uuid);
        //cargar información del row seleccionado para editar.
        var nodo = jsonResult.declaracion.situacionPatrimonial.datosDependienteEconomico.dependienteEconomico[this.dataset.uuid];
        $("#form" + this.dataset.seccion_name + " select[name='tipoOperacion']").val(nodo.tipoOperacion);
        $("#form" + this.dataset.seccion_name + " input[name='nombre']").val(nodo.nombre);
        $("#form" + this.dataset.seccion_name + " input[name='primerApellido']").val(nodo.primerApellido);
        $("#form" + this.dataset.seccion_name + " input[name='segundoApellido']").val(nodo.segundoApellido);
        $("#form" + this.dataset.seccion_name + " input[name='fechaNacimiento']").val(nodo.fechaNacimiento);
        $("#form" + this.dataset.seccion_name + " input[name='rfc']").val(nodo.rfc);
        $("#form" + this.dataset.seccion_name + " input[name='parentescoRelacion']").val(nodo.parentescoRelacion.clave);
        $("#form" + this.dataset.seccion_name + " input[name='extranjero']").val(nodo.extranjero);
        $("#form" + this.dataset.seccion_name + " input[name='curp']").val(nodo.curp);
        $("#form" + this.dataset.seccion_name + " input[name='habitaDomicilioDeclarante']").val(nodo.habitaDomicilioDeclarante);
        $("#form" + this.dataset.seccion_name + " select[name='lugarDondeReside']").val(nodo.lugarDondeReside);


        $("#form" + this.dataset.seccion_name + " select[name='ambitoSector']").val(nodo.ambitoSector.clave);
        if(nodo.ambitoSector.clave =="PUB"){            
            $("#form" + this.dataset.seccion_name + " select[name='nivelOrdenGobierno']").val(nodo.nivelOrdenGobierno);
            $("#form" + this.dataset.seccion_name + " select[name='ambitoPublico']").val(nodo.ambitoPublico);
            $("#form" + this.dataset.seccion_name + " input[name='nombreEntePublico']").val(nodo.nombreEntePublico);
            $("#form" + this.dataset.seccion_name + " input[name='areaAdscripcion']").val(nodo.areaAdscripcion);
            $("#form" + this.dataset.seccion_name + " input[name='empleoCargoComision']").val(nodo.empleoCargoComision);
            $("#form" + this.dataset.seccion_name + " input[name='funcionPrincipal']").val(nodo.funcionPrincipal);
        }
        else{
            $("#form" + this.dataset.seccion_name + " input[name='nombreEmpresaSociedadAsociacion']").val(nodo.nombreEmpresaSociedadAsociacion);
            $("#form" + this.dataset.seccion_name + " input[name='rfc']").val(nodo.rfc);
            $("#form" + this.dataset.seccion_name + " input[name='area']").val(nodo.area);
            $("#form" + this.dataset.seccion_name + " input[name='puesto']").val(nodo.puesto);
            $("#form" + this.dataset.seccion_name + " select[name='sector']").val(nodo.sector.clave);
        }
        $("#form" + this.dataset.seccion_name + " input[name='fechaIngreso']").val(nodo.fechaIngreso);
        $("#form" + this.dataset.seccion_name + " input[name='fechaEgreso']").val(nodo.fechaEgreso);
        $("#form" + this.dataset.seccion_name + " select[name='ubicacion']").val(nodo.ubicacion);
        loadFormAmbitoSectorDependientesEconomicos();
    });
};

//pintar tabla html.
window.pintarTablaDependientesEconomicos = function pintarTablaDependientesEconomicos(seccionNo, seccionName){
    var html="";
    const lista = jsonResult.declaracion.situacionPatrimonial.datosDependienteEconomico.dependienteEconomico;//.sort((a, b) => b.fechaObtencion - a.fechaObtencion);
    Object.keys(lista.sort((a, b) => b.fechaIngreso - a.fechaIngreso)).forEach(function (row) {
        html+="<tr id='" + lista[row].uuid + "'>";
        html+=" <td>" + lista[row].nombre + " " + lista[row].primerApellido + " " + lista[row].segundoApellido +"</td>";
        html+=" <td>" + lista[row].parentescoRelacion.valor +"</td>";
        html+=" <td>" + lista[row].habitaDomicilioDeclarante== true ? "Sí":"No" +"</td>";
        html+=" <td>" + lista[row].actividadLaboral.valor +"</td>";
        html+=" <td class='text-right'>";
        html+="     <button class='btn btn-sm btn-warning btnEditar' data-uuid='" + lista[row].uuid + "' data-seccion_no='" + seccionNo + "' data-seccion_name='" + seccionName + "'>Editar</button>";
        html+="     <button class='btn btn-sm btn-danger btnEliminar' data-uuid='" + lista[row].uuid + "' data-seccion_name='" + seccionName + "'>Eliminar</button>";              
        html+=" </td>";
        html+="</tr>";
    });
    $(".tbl" + seccionName + " tbody").empty().append(html);
};

//guardar registro en el JsonResult.
window.guardarRegistroDependientesEconomicos = function guardarRegistroDependientesEconomicos(uuidItem, seccionNo, seccionName){
    var form="#form" + seccionName;
    var root = 
    jsonResult.declaracion.situacionPatrimonial.datosDependienteEconomico.ninguno=false;
    jsonResult.declaracion.situacionPatrimonial.datosDependienteEconomico.aclaracionesObservaciones =  $("#contentSeccion" + seccionNo + " textarea[name='aclaracionesObservaciones']").val();
    jsonResult.declaracion.situacionPatrimonial.datosDependienteEconomico.dependienteEconomico[uuidItem]={
        "tipoOperacion":        $(form + " select[name='tipoOperacion'] option:selected").val(),
        "nombre":               $(form + " input[name='nombre']").val().toUpperCase(),
        "primerApellido":       $(form + " input[name='primerApellido']").val().toUpperCase(),
        "segundoApellido":      $(form + " input[name='segundoApellido']").val().toUpperCase(),
        "fechaNacimiento":      $(form + " input[name='fechaNacimiento']").val(),
        "rfc":                  $(form + " input[name='rfc']").val().toUpperCase(),
        "parentescoRelacion": {
          "clave":              $(form + " select[name='parentescoRelacion'] option:selected").val(),
          "valor":              $(form + " select[name='parentescoRelacion'] option:selected")[0].innerText.toUpperCase()
        },
        "extranjero":           $(form + " input[name='extranjero']")[0].checked,
        "curp":                 $(form + " input[name='curp']").val().toUpperCase(),
        "habitaDomicilioDeclarante": $(form + " input[name='habitaDomicilioDeclarante']")[0].checked,
        "lugarDondeReside":     $(form + " select[name='lugarDondeReside'] option:selected").val(),
        "domicilioMexico": {
          "calle":              $("#domDependienteMxContent input[name='calle']").val().toUpperCase(),
          "numeroExterior":     $("#domDependienteMxContent input[name='numeroExterior']").val(),
          "numeroInterior":     $("#domDependienteMxContent input[name='numeroInterior']").val(),
          "coloniaLocalidad":   $("#domDependienteMxContent input[name='coloniaLocalidad']").val().toUpperCase(),
          "municipioAlcaldia": {
            "clave":            $("#domDependienteMxContent select[name='municipioAlcaldia'] option:selected").val(),
            "valor":            $("#domDependienteMxContent select[name='municipioAlcaldia'] option:selected")[0].innerText.toUpperCase()
          },
          "entidadFederativa": {
            "clave":            $("#domDependienteMxContent select[name='entidadFederativa'] option:selected").val(),
            "valor":            $("#domDependienteMxContent select[name='entidadFederativa'] option:selected")[0].innerText.toUpperCase()
          },
          "codigoPostal":       $("#domDependienteMxContent input[name='codigoPostal']").val()
        },
        "domicilioExtranjero": {
          "calle":              $("#domDependienteExContent input[name='calle']").val().toUpperCase(),
          "numeroExterior":     $("#domDependienteExContent input[name='numeroExterior']").val(),
          "numeroInterior":     $("#domDependienteExContent input[name='numeroInterior']").val(),
          "ciudadLocalidad":    $("#domDependienteExContent input[name='ciudadLocalidad']").val().toUpperCase(),
          "estadoProvincia":    $("#domDependienteExContent input[name='estadoProvincia']").val().toUpperCase(),
          "pais":               $("#domDependienteExContent select[name='pais'] option:selected").val(),
          "codigoPostal":       $("#domDependienteExContent input[name='codigoPostal']").val()
        },
        "actividadLaboral": {
          "clave": $(form  + " select[name='actividadLaboral'] option:selected").val(),
          "valor": $(form  + " select[name='actividadLaboral'] option:selected")[0].innerText.toUpperCase()
        },
        "actividadLaboralSectorPublico": {
            "nivelOrdenGobierno":   $("#laboralDependientePubContent select[name='nivelOrdenGobierno'] option:selected").val(),
            "ambitoPublico":        $("#laboralDependientePubContent select[name='ambitoPublico'] option:selected").val(),
            "nombreEntePublico":    $("#laboralDependientePubContent input[name='nombreEntePublico']").val().toUpperCase(),
            "areaAdscripcion":      $("#laboralDependientePubContent input[name='areaAdscripcion']").val().toUpperCase(),
            "empleoCargoComision":  $("#laboralDependientePubContent input[name='empleoCargoComision']").val().toUpperCase(),
            "funcionPrincipal":     $("#laboralDependientePubContent input[name='funcionPrincipal']").val().toUpperCase(),
            "fechaIngreso":         $("#laboralDependientePubContent input[name='fechaIngreso']").val(),
            "salarioMensualNeto": {
                "moneda":           $("#laboralDependientePubContent select[name='moneda'] option:selected").val(),
                "valor":            $("#laboralDependientePubContent input[name='valor']").val(),
              }
        },
        "actividadLaboralSectorPrivadoOtro": {
            "nombreEmpresaSociedadAsociacion":  $("#laboralDependientePriContent input[name='nombreEmpresaSociedadAsociacion']").val().toUpperCase(),
            "rfc":                              $("#laboralDependientePriContent input[name='rfc']").val(),
            "empleoCargo":                      $("#laboralDependientePriContent input[name='empleoCargo']").val().toUpperCase(),
            "fechaIngreso":                     $("#laboralDependientePriContent input[name='fechaIngreso']").val(),
            "salarioMensualNeto": {
                "moneda":                       $("#laboralDependientePriContent select[name='moneda'] option:selected").val(),
                "valor":                        $("#laboralDependientePriContent input[name='valor']").val(),
              }
        },
        "proveedorContratistaGobierno": $(form + " input[name='proveedorContratistaGobierno']")[0].checked,
        "sector": {
          "clave": $(form  + " select[name='sector'] option:selected").val(),
          "valor": $(form  + " select[name='sector'] option:selected")[0].innerText.toUpperCase()
        }
    };   
    //cambiar status a captura.
    captura.declaracion.situacion_patrimonial.secciones[seccionNo].status= "EN_PROCESO";
    $(".status-seccion-patrimonial-" + seccionNo).removeClass("indicador-status indicador-status-success").addClass("indicador-status-process").text("EN PROCESO");
};

//funcionalidad en boton agregar/actualizar registro.
window.funcionalidadGuardarRegistroDependientesEconomicos = function funcionalidadGuardarRegistroDependientesEconomicos(seccionNo, seccionName, accion, uuid=null){
    //ocultar/mostrar formularios
    $("#contentSeccion" + seccionNo + " .formPrincipal").addClass("animated fadeOut").addClass("hide");                      
    $("#contentSeccion" + seccionNo + " .formSecundario").removeClass("hide").addClass("animated fadeIn");
    //limpiar inputs
    $("#form" + seccionName + " .titulo-seccion").text(accion + " REGISTRO");
        
    //asignar dataset a btn form add/edit.
    document.forms["form" + seccionName].getElementsByClassName("btnCerrar")[0].dataset.seccion_no = seccionNo;
    document.forms["form" + seccionName].getElementsByClassName("btnCerrar")[0].dataset.seccion_name = seccionName;

    document.forms["form" + seccionName].getElementsByClassName("btnAgregar")[0].dataset.seccion_no = seccionNo;
    document.forms["form" + seccionName].getElementsByClassName("btnAgregar")[0].dataset.seccion_name = seccionName;
    if (accion=="EDITAR"){
        document.forms["form" + seccionName].getElementsByClassName("btnAgregar")[0].dataset.uuid = uuid;
        $("#form" + seccionName + " .btnAgregar").html('<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check" viewBox="0 0 16 16"><path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z"/></svg> Actualizar');    
    }
    //catalogos que se usan en el modulo.
    loadCat(tipoOperacion, ".CBOtipoOperacion");
    loadCat(parentescoRelacion, ".CBOparentescoRelacion");
    loadCat(relacionConDeclarante, ".CBOrelacionConDeclarante");
    loadCat(entidadFederativa, ".CBOentidadFederativa");    
    loadCat(paises, ".CBOpais");
    loadCat(nivelOrdenGobierno, ".CBOnivelOrdenGobierno");
    loadCat(ambitoPublico, ".CBOambitoPublico");
    loadCat(sector, ".CBOsector");
    loadCat(moneda, ".CBOmoneda");
    loadCat(lugarDondeReside, ".CBOlugarDondeReside");
    loadCat(actividadLaboral, ".CBOactividadLaboral");
    
     //validar en que proceso se encuentra el modulo seleccionado.
     $("#form" + seccionName + ' .CBOlugarDondeReside').on('change', function() {
        $(".domDependienteContent").addClass("hide");
        if(this.value == "MÉXICO"){
            $("#domDependienteMxContent").removeClass("hide");
        }
        else if(this.value == "EXTRANJERO"){
            $("#domDependienteExContent").removeClass("hide");
        }
    });

    $("#form" + seccionName + " .CBOentidadFederativa").on('change', function() {
        loadMunicipios("#form" + seccionName + " .CBOmunicipioAlcaldia", this.value);
    });

    $("#form" + seccionName + ' .CBOactividadLaboral').on('change', function() {        
        if(this.value == "PUB"){                                            
            $("#laboralDependientePubContent").removeClass("hide");
            $("#laboralDependientePriContent").addClass("hide");
        }
        else if(this.value == "PRI"){                                            
            $("#laboralDependientePubContent").addClass("hide");
            $("#laboralDependientePriContent").removeClass("hide");
        }
        else{
            $("#laboralDependientePubContent").addClass("hide");
            $("#laboralDependientePriContent").addClass("hide");
        }
    });

    if(captura.tipo_declaracion == "INICIAL"){
        $("#form" + seccionName + " select[name='tipoOperacion']").val("AGREGAR").prop("disabled", true);
    }
    loadFormAmbitoSectorDependientesEconomicos();
    //btn cerrar formulario.   
    $(".btnCerrar").on('click',function() {
        $("#contentSeccion" + this.dataset.seccion_no + " .formSecundario").html("").addClass("hide");
        $("#contentSeccion" + this.dataset.seccion_no + " .formPrincipal").removeClass("hide").addClass("animated fadeOut");
    }); 

    //btn agregar registro.
    $(".btnAgregar").on('click',function() {
        var uuidItem;
        if (accion=="EDITAR"){ uuidItem = this.dataset.uuid;}
        else{ uuidItem= generarUUID();}       
        guardarRegistroDependientesEconomicos(uuidItem, this.dataset.seccion_no, this.dataset.seccion_name);
        funcionalidadTablaDependientesEconomicos(this.dataset.seccion_no, this.dataset.seccion_name);         
        //ocultar/mostrar formularos.
        $("#contentSeccion" + this.dataset.seccion_no + " .formSecundario").html("").addClass("hide");
        $("#contentSeccion" + this.dataset.seccion_no + " .formPrincipal").removeClass("hide").addClass("animated fadeOut"); 
        $(".btnTerminar" + this.dataset.seccion_name).removeClass("hide");
        goTop();          
    });
};

window.loadFormAmbitoSectorDependientesEconomicos = function loadFormAmbitoSectorDependientesEconomicos(){
    $(".laboralDependienteContent").addClass("hide");
    if($("select[name='ambitoSector'] option:selected").val() =="PUB"){ $("#laboralDependientePubContent").removeClass("hide");}
    else{$("#laboralDependientePriContent").removeClass("hide");}
};