
window.formExperienciaLaboral='<form action="" id="formExperienciaLaboral">\
                                <h5 class="titulo-seccion"></h5>\
                                <div class="row p10">\
                                    <div class="col-lg-6">\
                                        <div class="form-group">\
                                            <label>TIPO DE OPERACIÓN</label>\
                                            <select name="tipoOperacion" class="form-control CBOtipoOperacion"></select>\
                                        </div>\
                                    </div>\
                                    <div class="col-lg-6">\
                                        <div class="form-group">\
                                            <label>ÁMBITO/SECTOR EN QUE LABORASTE</label>\
                                            <select name="ambitoSector" class="form-control CBOambitoSector" onchange="loadFormAmbitoSector();"></select>\
                                        </div>\
                                    </div>\
                                </div>\
                                <div class="row p10 hide ambitoSectorContent" id="publicoContent" style="padding-bottom: 0px !important;">\
                                    <div class="col-lg-6">\
                                        <div class="form-group">\
                                            <label>NIVEL/ORDEN DE GOBIERNO</label>\
                                            <select name="nivelOrdenGobierno" class="form-control CBOnivelOrdenGobierno"></select>\
                                        </div>\
                                    </div>\
                                    <div class="col-lg-6">\
                                        <div class="form-group">\
                                            <label>ÁMBITO PÚBLICO</label>\
                                            <select name="ambitoPublico" class="form-control CBOambitoPublico"></select>\
                                        </div>\
                                    </div>\
                                    <div class="col-lg-6">\
                                        <div class="form-group">\
                                            <label>NOMBRE DEL ENTE PÚBLICO</label>\
                                            <input type="text" name="nombreEntePublico" class="form-control" required>\
                                        </div>\
                                    </div>\
                                    <div class="col-lg-6">\
                                        <div class="form-group">\
                                            <label>ÁREA DE ADSCRIPCIÓN</label>\
                                            <input type="text" name="areaAdscripcion" class="form-control" required>\
                                        </div>\
                                    </div>\
                                    <div class="col-lg-6">\
                                        <div class="form-group">\
                                            <label>EMPLEO, CARGO O COMISIÓN</label>\
                                            <input type="text" name="empleoCargoComision" class="form-control" required>\
                                        </div>\
                                    </div>\
                                    <div class="col-lg-6">\
                                        <div class="form-group">\
                                            <label>FUNCIÓN PRINCIPAL</label>\
                                            <input type="text" name="funcionPrincipal" class="form-control" required>\
                                        </div>\
                                    </div>\
                                </div>\
                                <div class="row p10 hide ambitoSectorContent" id="privadoContent" style="padding-bottom: 0px !important;">\
                                    <div class="col-lg-12">\
                                        <div class="form-group">\
                                            <label>NOMBRE DE LA EMPRESA, SOCIEDAD O ASOCIACIÓN</label>\
                                            <input type="text" name="nombreEmpresaSociedadAsociacion" class="form-control" required>\
                                        </div>\
                                    </div>\
                                    <div class="col-lg-6">\
                                        <div class="form-group">\
                                            <label>RFC</label>\
                                            <input type="text" name="rfc" class="form-control" maxlength="13" required>\
                                        </div>\
                                    </div>\
                                    <div class="col-lg-6">\
                                        <div class="form-group">\
                                            <label>SECTOR AL QUE PERTENECE</label>\
                                            <select name="sector" class="form-control CBOsector"></select>\
                                        </div>\
                                        <div class="form-group content_sector_especifique hide"><label>ESPECIFIQUE</label> <input name="sector_especifique" class="form-control" required></div>\
                                    </div>\
                                    <div class="col-lg-6">\
                                        <div class="form-group">\
                                            <label>ÁREA</label>\
                                            <input type="text" name="area" class="form-control" required>\
                                        </div>\
                                    </div>\
                                    <div class="col-lg-6">\
                                        <div class="form-group">\
                                            <label>PUESTO</label>\
                                            <input type="text" name="puesto" class="form-control" required>\
                                        </div>\
                                    </div>\
                                </div>\
                                <div class="row p10" style="padding-top:0px !important;">\
                                    <div class="col-lg-4">\
                                        <div class="form-group">\
                                            <label>FECHA DE INGRESO</label>\
                                            <input type="date" name="fechaIngreso" class="form-control" required>\
                                        </div>\
                                    </div>\
                                    <div class="col-lg-4">\
                                        <div class="form-group">\
                                            <label>FECHA DE EGRESO</label>\
                                            <input type="date" name="fechaEgreso" class="form-control" required>\
                                        </div>\
                                    </div>\
                                    <div class="col-lg-4">\
                                        <div class="form-group">\
                                            <label>LUGAR DONDE SE UBICA</label>\
                                            <select name="ubicacion" class="form-control CBOubicacion"></select>\
                                        </div>\
                                    </div>\
                                </div>\
                                <div class="row p10">\
                                    <div class="col-lg-12 text-right">\
                                        <button type="button" class="btn btn-light btnAgregar">\
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check" viewBox="0 0 16 16">\
                                                <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z"/>\
                                            </svg>\
                                            Agregar\
                                        </button>\
                                        <button type="button" class="btn btn-secondary btnCerrar" data-uuid="">\
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x" viewBox="0 0 16 16">\
                                                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>\
                                            </svg>\
                                            Cerrar\
                                        </button>\
                                    </div>\
                                </div>\
                            </form>';


window.initExperienciaLaboral = function initExperienciaLaboral(data){
    var seccion = JSON.parse(atob(data));
    var seccionName = seccion.moduloName.replace("modulo","");
    var form = "#form" + seccion.moduloName.replace("modulo", "")+ " ";
    var modulo = "#" + seccion.moduloName + " ";

    //validar status de la sección.
    switch(seccion.status){
        case "SIN_INFO":
            //asginar valores predeterminados a catálogos(ayuda al usuario).
            jsonResult.declaracion.situacionPatrimonial.experienciaLaboral.ninguno=true;
            $(modulo + ".chkNinguno").prop("disabled", false);
            $(modulo + ".chkNinguno")[0].checked=false;   
            $(modulo + "textarea[name='aclaracionesObservaciones']").val("");
            $(modulo + ".btnAgregar").removeClass("hide");
            $(modulo + ".btnTerminar").addClass("hide");
            $(modulo + ".btnHabilitar").addClass("hide");
            $(modulo + ".formSecundario").addClass("hide");           
        break;
        case "EN_PROCESO":
            window["pintarTabla" + seccionName](seccion.no, seccionName);
            if (jsonResult.declaracion.situacionPatrimonial.bienesInmuebles.ninguno){
                $(modulo + ".chkNinguno")[0].checked=true;                
            }
            $(modulo + ".btnAgregar").removeClass("hide");
            $(modulo + ".btnHabilitar").addClass("hide");
            $(modulo + ".btnTerminar").removeClass("hide");
            if (Object.keys(jsonResult.declaracion.situacionPatrimonial.experienciaLaboral.experiencia).length > 0){
                $(modulo + ".btnAgregar").removeClass("hide");
            }
            else{
                $(modulo + ".btnAgregar").addClass("hide");
            }                     

            break;
        case "TERMINADO":
            window["pintarTabla" + seccionName](seccion.no, seccionName);
            $(modulo + ".chkNinguno").prop("disabled", true);
            if (jsonResult.declaracion.situacionPatrimonial.experienciaLaboral.ninguno){
                $(modulo + ".chkNinguno")[0].checked=true;                
            }
            $(modulo + "textarea[name='aclaracionesObservaciones']").val(jsonResult.declaracion.situacionPatrimonial.experienciaLaboral.aclaracionesObservaciones).prop("disabled", true);
            $(modulo + ".btnEditar").addClass("hide");
            $(modulo + ".btnEliminar").addClass("hide");
            $(modulo + ".btnAgregar").addClass("hide");
            $(modulo + ".btnTerminar").addClass("hide");
            $(modulo + ".btnHabilitar").removeClass("hide");
        break;
    }

    $(modulo + ".btnAgregar").unbind("click");
    $(modulo + ".btnTerminar").unbind("click");
    $(modulo + ".btnHabilitar").unbind("click");

    $(modulo + ".btnAgregar").on('click',function() {
        funcionalidadGuardarRegistroExperienciaLaboral(seccion.no, seccionName, modulo, "NUEVO");
    });

    $(modulo + ".btnTerminar").on('click',function() {
        jsonResult.declaracion.situacionPatrimonial.experienciaLaboral.aclaracionesObservaciones =  $(modulo + "textarea[name='aclaracionesObservaciones']").val();
        $(modulo + "textarea[name='aclaracionesObservaciones']").prop("disabled", true);
        //inhabilitar controles del modulo.
        $(modulo + ".chkNinguno").prop("disabled", true);
        $(modulo + ".btnTerminar").addClass("hide");
        $(modulo + ".btnAgregar").addClass("hide");
        $(modulo + ".btnEditar").addClass("hide");
        $(modulo + ".btnEliminar").addClass("hide");
        //cambiar status.
        $(modulo + ".btnHabilitar").removeClass("hide");
        jsonResult.captura.declaracion[seccion.apartado].secciones[seccion.no].status= "TERMINADO";
        $(".status-seccion-" + seccion.apartado +"-" + seccion.no).removeClass("indicador-status indicador-status-process").addClass("indicador-status-success").text("TERMINADO");
        mensajeSwal("Aviso","Sección terminada con exito.", "success");
        validarDeclaracionTerminada();
    });
    
    $(modulo + ".btnHabilitar").on("click",function() {
        $(modulo + ".chkNinguno").prop("disabled", false);
        $(modulo + ".btnTerminar").removeClass("hide");
        $(modulo + ".btnAgregar").removeClass("hide");
        $(modulo + ".btnEditar").removeClass("hide");
        $(modulo + ".btnEliminar").removeClass("hide");
        $(modulo + "textarea[name='aclaracionesObservaciones']").prop("disabled", false);
        $(modulo + ".btnHabilitar").addClass("hide");

        if ($(modulo + ".chkNinguno")[0].checked){
            $(modulo + ".btnAgregar").addClass("hide");
        }
        else{
            $(modulo + ".btnAgregar").removeClass("hide");
        } 

        jsonResult.captura.declaracion[seccion.apartado].secciones[seccion.no].status= "EN_PROCESO";
        $(".status-seccion-" + seccion.apartado +"-" + seccion.no).removeClass("indicador-status indicador-status-success").addClass("indicador-status-process").text("EN PROCESO");
        validarDeclaracionTerminada();
    });

    $(".content_seccion").addClass("hide");
    $("#" + seccion.moduloName).removeClass("hide");
    $(modulo + ".formSecundario").html("").addClass("hide");
    $(modulo + ".formPrincipal").removeClass("hide").addClass("animated fadeOut");
}


//pintar tabla html.
window.pintarTablaExperienciaLaboral = function pintarTablaExperienciaLaboral(seccionNo, seccionName){
    let html="";
    let lista = jsonResult.declaracion.situacionPatrimonial.experienciaLaboral.experiencia;//.sort((a, b) => b.fechaObtencion - a.fechaObtencion);
    //Object.keys(lista.sort((a, b) => b.fechaIngreso - a.fechaIngreso)).forEach(function (row) {
    Object.keys(lista).forEach(function (row) {
        var params = { uuid: lista[row].uuid, seccionNo: seccionNo, seccionName: seccionName };
        html+="<tr id='" + lista[row].uuid + "'>";
        html+=" <td>" + lista[row].fechaIngreso +"</td>";
        lista[row].ambitoSector.clave ==="PUB" ? html+=" <td>" + lista[row].nombreEntePublico +"</td>" : html+=" <td>" + lista[row].nombreEmpresaSociedadAsociacion +"</td>" ;
        lista[row].ambitoSector.clave ==="PUB" ? html+=" <td>" + lista[row].areaAdscripcion +"</td>": html+=" <td>" + lista[row].area +"</td>";
        lista[row].ambitoSector.clave ==="PUB" ? html+=" <td>" + lista[row].empleoCargoComision +"</td>": html+=" <td>" + lista[row].puesto +"</td>";
        html+=" <td class='text-right'>";
        html+="     <button class='btn btn-sm btn-warning btnEditar' onclick='editarExperienciaLaboral(\"" + btoa(JSON.stringify(params)) + "\");'>Editar</button>";
        html+="     <button class='btn btn-sm btn-danger btnEliminar' onclick='eliminarExperienciaLaboral(\"" + btoa(JSON.stringify(params)) + "\");'>Eliminar</button>";              
        html+=" </td>";
        html+="</tr>";
    });
    $(".tbl" + seccionName + " tbody").empty().append(html);
}

window.editarExperienciaLaboral = function editarExperienciaLaboral(data){
    var item = JSON.parse(atob(data));
    var modulo = "#modulo" + item.seccionName  + " ";
    funcionalidadGuardarRegistroExperienciaLaboral(item.seccionNo, item.seccionName, modulo, "EDITAR", item.uuid);
    //cargar información del row seleccionado para editar.
    var nodo = jsonResult.declaracion.situacionPatrimonial.experienciaLaboral.experiencia[item.uuid];
    $("#form" + item.seccionName + " select[name='tipoOperacion']").val(nodo.tipoOperacion);
    $("#form" + item.seccionName + " select[name='ambitoSector']").val(nodo.ambitoSector.clave);
    if(nodo.ambitoSector.clave =="PUB"){            
        $("#form" + item.seccionName + " select[name='nivelOrdenGobierno']").val(nodo.nivelOrdenGobierno);
        $("#form" + item.seccionName + " select[name='ambitoPublico']").val(nodo.ambitoPublico);
        $("#form" + item.seccionName + " input[name='nombreEntePublico']").val(nodo.nombreEntePublico);
        $("#form" + item.seccionName + " input[name='areaAdscripcion']").val(nodo.areaAdscripcion);
        $("#form" + item.seccionName + " input[name='empleoCargoComision']").val(nodo.empleoCargoComision);
        $("#form" + item.seccionName + " input[name='funcionPrincipal']").val(nodo.funcionPrincipal);
    }
    else{
        $("#form" + item.seccionName + " input[name='nombreEmpresaSociedadAsociacion']").val(nodo.nombreEmpresaSociedadAsociacion);
        $("#form" + item.seccionName + " input[name='rfc']").val(nodo.rfc);
        $("#form" + item.seccionName + " input[name='area']").val(nodo.area);
        $("#form" + item.seccionName + " input[name='puesto']").val(nodo.puesto);
        $("#form" + item.seccionName + " select[name='sector']").val(nodo.sector.clave);
    }
    $("#form" + item.seccionName + " input[name='fechaIngreso']").val(nodo.fechaIngreso);
    $("#form" + item.seccionName + " input[name='fechaEgreso']").val(nodo.fechaEgreso);
    $("#form" + item.seccionName + " select[name='ubicacion']").val(nodo.ubicacion);
    loadFormAmbitoSector();   
}

window.eliminarExperienciaLaboral = function eliminarExperienciaLaboral(data){
    var item = JSON.parse(atob(data));
    //elimina item en object json y tabla.
    delete jsonResult.declaracion.situacionPatrimonial.experienciaLaboral.experiencia[item.uuid];
    $("#" + item.uuid).remove();
    if (Object.keys(jsonResult.declaracion.situacionPatrimonial.experienciaLaboral.experiencia).length==0){
        $("#modulo" + item.seccionName + " .btnTerminar").addClass("hide");
    }
}

//guardar registro en el JsonResult.
window.guardarRegistroExperienciaLaboral = function guardarRegistroExperienciaLaboral(uuidItem, seccionNo, seccionName, modulo){    
    var form="#form" + seccionName;
    jsonResult.declaracion.situacionPatrimonial.experienciaLaboral.ninguno=false;
    jsonResult.declaracion.situacionPatrimonial.experienciaLaboral.aclaracionesObservaciones =  $(modulo + " textarea[name='aclaracionesObservaciones']").val();
    if ($("select[name='ambitoSector'] option:selected").val()=="PUB"){
        jsonResult.declaracion.situacionPatrimonial.experienciaLaboral.experiencia[uuidItem] =
        {
            "uuid": uuidItem,
            "tipoOperacion": $(form  + " select[name='tipoOperacion'] option:selected").val(),
            "ambitoSector": {
              "clave": $(form  + " select[name='ambitoSector'] option:selected").val(),
              "valor": $(form  + " select[name='ambitoSector'] option:selected")[0].innerText,
            },
            "nivelOrdenGobierno":   $(form  + " select[name='nivelOrdenGobierno'] option:selected").val(),
            "ambitoPublico":        $(form  + " select[name='ambitoPublico'] option:selected").val(),
            "nombreEntePublico":    $(form  + " input[name='nombreEntePublico']").val().toUpperCase(),
            "areaAdscripcion":      $(form  + " input[name='areaAdscripcion']").val().toUpperCase(),
            "empleoCargoComision":  $(form  + " input[name='empleoCargoComision']").val().toUpperCase(),
            "funcionPrincipal":     $(form  + " input[name='funcionPrincipal']").val().toUpperCase(),
            "fechaIngreso":         $(form  + " input[name='fechaIngreso']").val(),
            "fechaEgreso":          $(form  + " input[name='fechaEgreso']").val(),
            "ubicacion":            $(form  + " select[name='ubicacion'] option:selected").val(),
        };
    }
    else{
        jsonResult.declaracion.situacionPatrimonial.experienciaLaboral.experiencia[uuidItem] =
        {
            "uuid": uuidItem,
            "tipoOperacion": $(form + " select[name='tipoOperacion'] option:selected").val(),
            "ambitoSector": {
              "clave": $(form + " select[name='ambitoSector'] option:selected").val(),
              "valor": $(form + " select[name='ambitoSector'] option:selected")[0].innerText,
            },
            "nombreEmpresaSociedadAsociacion": $(form  + " input[name='nombreEmpresaSociedadAsociacion']").val().toUpperCase(),
            "rfc":      $(form + " input[name='rfc']").val().toUpperCase(),
            "area":     $(form + " input[name='area']").val().toUpperCase(),
            "puesto":   $(form + " input[name='puesto']").val().toUpperCase(),
            "sector": {
                "clave": $(form + " select[name='sector'] option:selected").val(),
                "valor": $(form  + " input[name='sector_especifique']").val().toUpperCase(),
              },
            "fechaIngreso": $(form + " input[name='fechaIngreso']").val(),
            "fechaEgreso":  $(form + " input[name='fechaEgreso']").val(),
            "ubicacion":    $(form + " select[name='ubicacion'] option:selected").val(),
        };
    }
    //cambiar status a captura.
    jsonResult.captura.declaracion.situacionPatrimonial.secciones[seccionNo].status= "EN_PROCESO";
    $(".status-seccion-" + jsonResult.captura.declaracion.situacionPatrimonial.secciones[seccionNo].apartado + "-" + seccionNo).removeClass("indicador-status indicador-status-success").addClass("indicador-status-process").text("EN PROCESO");
}

//funcionalidad en boton agregar/actualizar registro.
window.funcionalidadGuardarRegistroExperienciaLaboral = function funcionalidadGuardarRegistroExperienciaLaboral(seccionNo, seccionName, modulo, accion, uuid=null){    
    var form = "#form" + seccionName + " ";
    //ocultar/mostrar formularios
    $(modulo + ".formPrincipal").addClass("animated fadeOut").addClass("hide");                      
    $(modulo + ".formSecundario").html(formExperienciaLaboral).removeClass("hide").addClass("animated fadeIn");    
    $(form + ".titulo-seccion").text(accion + " REGISTRO");

    if (accion=="EDITAR"){
        $(form + ".btnAgregar").data("uuid", uuid);
        $(form + ".btnAgregar").html('<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check" viewBox="0 0 16 16"><path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z"/></svg> Actualizar');
    }

    //catalogos que se usan en el modulo.
    loadCat(tipoOperacion, form + ".CBOtipoOperacion");
    loadCat(ambitoSector, form + ".CBOambitoSector");
    loadCat(nivelOrdenGobierno, form + ".CBOnivelOrdenGobierno");
    loadCat(ambitoPublico, form + ".CBOambitoPublico");
    loadCat(extranjero, form + ".CBOubicacion"); 
    loadCat(sector, form + ".CBOsector");

    $(form + '.CBOsector').on('change', function() {
        $(form + ".content_sector_especifique").addClass("hide");
        $(form + ".content_sector_especifique input[name='sector_especifique']").val($(form + '.CBOsector option:selected')[0].innerText);
        if(this.value == "OTRO"){
            $(form + ".content_sector_especifique").removeClass("hide");
            $(form + ".content_sector_especifique input[name='sector_especifique']").val("");
        }        
    });

    if(jsonResult.captura.tipo_declaracion == "INICIAL"){
        $(form + "select[name='tipoOperacion']").val("AGREGAR").prop("disabled", true);
    }
    loadFormAmbitoSector();
    $(form + '.CBOsector').val("AGRI").trigger("change");

    $(form + ".btnCerrar").unbind("click");
    $(form + ".btnAgregar").unbind("click");

     //btn cerrar formulario.   
     $(form + ".btnCerrar").on('click',function() {
        $(modulo + ".formSecundario").html("").addClass("hide");
        $(modulo + ".formPrincipal").removeClass("hide").addClass("animated fadeOut");
    }); 
    
    $("#form" + seccionName).validate({
        rules: {
            tipoOperacion : { required: true },
            ambitoSector : { required: true },
            nivelOrdenGobierno : { required: true },
            ambitoPublico : { required: true },
            nombreEntePublico : { required: true },
            areaAdscripcion : { required: true },
            empleoCargoComision : { required: true },
            funcionPrincipal : { required: true },
            fechaIngreso : { required: true },
            fechaEgreso : { required: true },
            ubicacion : { required: true }
        },
        messages: {
            tipoOperacion : { required: "Seleccione el tipo de operación." },
            ambitoSector: { required: "Seleccione el ámbito o sector en el que laboraste." },
            nivelOrdenGobierno : { required: "Seleccione el orden de gobierno." },
            ambitoPublico : { required: "Seleccione el ámbito público." },
            nombreEntePublico : { required: "Ingrese el nombre del ente público." },
            areaAdscripcion : { required: "Ingrese el área de adscripción." },
            empleoCargoComision : { required: "Ingrese el empleo, cargo o comisión." },
            funcionPrincipal : { required: "Ingrese la función principal." },
            fechaIngreso : { required: "Ingrese la fecha de ingreso." },
            fechaEgreso : { required: "Ingrese la fecha de egreso." },
            ubicacion : { required: "Seleccione la ubicación." }
        }
    });

    //btn agregar registro.
    $(form + ".btnAgregar").on('click',function() {
        if( $("#form" + seccionName).valid() ) {
            var uuidItem;
            if (accion=="EDITAR"){ uuidItem = uuid;}
            else{ uuidItem= generarUUID();}       
            guardarRegistroExperienciaLaboral(uuidItem, seccionNo, seccionName, modulo);
            pintarTablaExperienciaLaboral(seccionNo, seccionName);       
            //ocultar/mostrar formularos.
            $(modulo + ".formSecundario").html("").addClass("hide");
            $(modulo + ".formPrincipal").removeClass("hide").addClass("animated fadeOut"); 
            $(modulo + ".btnTerminar").removeClass("hide");
            goTop();   
        }       
    });
}

window.loadFormAmbitoSector = function loadFormAmbitoSector(){
    $("#formExperienciaLaboral .ambitoSectorContent").addClass("hide");
    if($("#formExperienciaLaboral select[name='ambitoSector'] option:selected").val() =="PUB"){ $("#publicoContent").removeClass("hide");}
    else{$("#privadoContent").removeClass("hide");}
}

