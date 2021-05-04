window.formDependientesEconomicos='<form action="" id="formDependientesEconomicos">\
<h5 class="titulo-seccion"></h5>\
                                   <div class="row">\
                                       <div class="col-lg-4">\
                                           <div class="form-group">\
                                               <label>TIPO DE OPERACIÓN</label>\
                                               <select name="tipoOperacion" class="form-control CBOtipoOperacion"></select>\
                                           </div>\
                                       </div>\
                                       <div class="col-lg-6">\
                                           <div class="form-group">\
                                               <label>PARENTESCO O RELACIÓN CON EL DECLARANTE</label>\
                                               <select name="parentescoRelacion" class="form-control CBOparentescoRelacion">\
                                               </select>\
                                           </div>\
                                       </div>\
                                   </div>\
                                   <div class="row">\
                                       <div class="col-lg-4">\
                                           <div class="form-group">\
                                               <label>NOMBRE(S)</label>\
                                               <input type="text" name="nombre" class="form-control" required>\
                                           </div>\
                                       </div>\
                                       <div class="col-lg-4">\
                                           <div class="form-group">\
                                               <label>PRIMER APELLIDO</label>\
                                               <input type="text" name="primerApellido" class="form-control" required>\
                                           </div>\
                                       </div>\
                                       <div class="col-lg-4">\
                                           <div class="form-group">\
                                               <label>SEGUNDO APELLIDO</label>\
                                               <input type="text" name="segundoApellido" class="form-control">\
                                           </div>\
                                       </div>\
                                   </div>\
                                   <div class="row">\
                                       <div class="col-lg-4">\
                                           <div class="form-group">\
                                               <label>FECHA DE NACIMIENTO</label>\
                                               <input type="date" name="fechaNacimiento" class="form-control" required>\
                                           </div>\
                                       </div>\
                                       <div class="col-lg-4">\
                                           <div class="form-group">\
                                               <label>RFC</label>\
                                               <input type="text" name="rfc" class="form-control" maxlength="13" required>\
                                           </div>\
                                       </div>\
                                       <div class="col-lg-4">\
                                           <div class="form-group">\
                                               <label>CURP</label>\
                                               <input type="text" name="curp" class="form-control" maxlength="18" required>\
                                           </div>\
                                       </div>\
                                   </div>\
                                   <div class="row">\
                                       <div class="col-lg-6">\
                                           <div class="row">\
                                               <div class="col-lg-12">\
                                                   <label id="labelcheckPareja">¿ES CIUDADANO EXTRANJERO?</label>\
                                               </div>\
                                           </div>\
                                           <div class="form-check form-check-inline">\
                                               <input class="form-check-input" type="radio" name="extranjero" id="radioExtranjero1" value="true">\
                                               <label class="form-check-label" for="radioExtranjero1">SI</label>\
                                           </div>\
                                           <div class="form-check form-check-inline">\
                                               <input class="form-check-input" type="radio" name="extranjero" id="radioExtranjero2" value="false" checked>\
                                               <label class="form-check-label" for="radioExtranjero2">NO</label>\
                                           </div>\
                                       </div>\
                                       <div class="col-lg-6">\
                                           <div class="row">\
                                               <div class="col-lg-12">\
                                                   <label id="labelcheckPareja">¿HABITA EN EL DOMICILIO DEL DECLARANTE?</label>\
                                               </div>\
                                           </div>\
                                           <div class="form-check form-check-inline">\
                                               <input class="form-check-input" type="radio" name="habitaDomicilioDeclarante" id="radioHabitaEnDom1" value="true">\
                                               <label class="form-check-label" for="radioHabitaEnDom1">SI</label>\
                                           </div>\
                                           <div class="form-check form-check-inline">\
                                               <input class="form-check-input" type="radio" name="habitaDomicilioDeclarante" id="radioHabitaEnDom2" value="false">\
                                               <label class="form-check-label" for="radioHabitaEnDom2">NO</label>\
                                           </div>\
                                       </div>\
                                   </div>\
                                   <div class="row">\
                                       <div class="col-lg-6">\
                                           <div class="form-group">\
                                               <label>LUGAR DONDE RESIDE</label>\
                                               <select name="lugarDondeReside" class="form-control CBOlugarDondeReside">\
                                                   <option value="OPC">Seleccione una opción...</option>\
                                                   <option value="MX">MÉXICO</option>\
                                                   <option value="EXT">EXTRANJERO</option>\
                                                   <option value="NOC">SE DESCONOCE</option>\
                                               </select>\
                                           </div>\
                                       </div>\
                                   </div>\
                                   <div class="row hide" id="domDependienteTitulo">\
                                       <div class="col-lg-12 text-center">\
                                           <h6>DOMICILIO DEL DEPENDIENTE ECONÓMICO</h6>\
                                       </div>\
                                   </div>\
                                   <div class="row">\
                                       <div class="col-lg-12 domDependienteContent hide" id="domDependienteMxContent">\
                                           <div class="row">\
                                            <div class="col-lg-6">\
                                                <div class="form-group">\
                                                    <label>ENTIDAD FEDERATIVA</label>\
                                                    <select name="entidadFederativa" class="form-control CBOentidadFederativa" required></select>\
                                                    </div>\
                                                </div>\
                                                <div class="col-lg-6">\
                                                <div class="form-group">\
                                                    <label>MUNICIPIO/ALCALDÍA</label>\
                                                    <select name="municipioAlcaldia" class="form-control CBOmunicipioAlcaldia" required></select>\
                                                </div>\
                                            </div>\
                                               <div class="col-lg-6">\
                                                   <div class="form-group">\
                                                       <label>CALLE</label>\
                                                       <input type="text" name="calle" class="form-control" required>\
                                                   </div>\
                                               </div>\
                                               <div class="col-lg-3">\
                                                   <div class="form-group">\
                                                       <label>NÚMERO EXTERIOR</label>\
                                                       <input type="text" name="numeroExterior" class="form-control" required>\
                                                   </div>\
                                               </div>\
                                               <div class="col-lg-3">\
                                                   <div class="form-group">\
                                                       <label>NÚMERO INTERIOR</label>\
                                                       <input type="text" name="numeroInterior" class="form-control">\
                                                   </div>\
                                               </div>\
                                           </div>\
                                           <div class="row">\
                                               <div class="col-lg-6">\
                                                   <div class="form-group">\
                                                       <label>COLONIA/LOCALIDAD</label>\
                                                       <input type="text" name="coloniaLocalidad" class="form-control" required>\
                                                   </div>\
                                               </div>\
                                               <div class="col-lg-3">\
                                                   <div class="form-group">\
                                                       <label>CÓDIGO POSTAL</label>\
                                                       <input type="text" name="codigoPostal" class="form-control numeric" maxlength="5" required>\
                                                   </div>\
                                               </div>\
                                           </div>\
                                       </div>\
                                       <div class="col-lg-12 domDependienteContent hide" id="domDependienteExContent">\
                                           <div class="row">\
                                               <div class="col-lg-6">\
                                                   <div class="form-group">\
                                                       <label>CALLE</label>\
                                                       <input type="text" name="calle" class="form-control" required>\
                                                   </div>\
                                               </div>\
                                               <div class="col-lg-3">\
                                                   <div class="form-group">\
                                                       <label>NÚMERO EXTERIOR</label>\
                                                       <input type="text" name="numeroExterior" class="form-control" required>\
                                                   </div>\
                                               </div>\
                                               <div class="col-lg-3">\
                                                   <div class="form-group">\
                                                       <label>NÚMERO INTERIOR</label>\
                                                       <input type="text" name="numeroInterior" class="form-control">\
                                                   </div>\
                                               </div>\
                                           </div>\
                                           <div class="row">\
                                               <div class="col-lg-6">\
                                                   <div class="form-group">\
                                                       <label>CIUDAD/LOCALIDAD</label>\
                                                       <input type="text" name="ciudadLocalidad" class="form-control" required>\
                                                   </div>\
                                               </div>\
                                               <div class="col-lg-6">\
                                                   <div class="form-group">\
                                                       <label>ESTADO/PROVINCIA</label>\
                                                       <input type="text" name="estadoProvincia" class="form-control" required>\
                                                   </div>\
                                               </div>\
                                           </div>\
                                           <div class="row">\
                                               <div class="col-lg-6">\
                                                   <div class="form-group">\
                                                       <label>PAÍS</label>\
                                                       <select name="pais" class="form-control CBOpais" required></select>\
                                                   </div>\
                                               </div>\
                                               <div class="col-lg-6">\
                                                   <div class="form-group">\
                                                       <label>CÓDIGO POSTAL</label>\
                                                       <input type="text" name="codigoPostal" class="form-control numeric" maxlength="5" required>\
                                                   </div>\
                                               </div>\
                                           </div>\
                                       </div>\
                                   </div>\
                                   <div class="row">\
                                       <div class="col-lg-6">\
                                           <div class="form-group">\
                                               <label>ACTIVIDAD LABORAL</label>\
                                               <select name="actividadLaboral" class="form-control CBOactividadLaboral">\
                                                   <option value="OPC">Seleccione una opción...</option>\
                                                   <option value="PUB">PÚBLICO</option>\
                                                   <option value="PRI">PRIVADO</option>\
                                                   <option value="OTR">OTRO(ESPECIFIQUE)</option>\
                                                   <option value="NIN">NINGUNO</option>\
                                               </select>\
                                           </div>\
                                       </div>\
                                   </div>\
                                   <div class="row">\
                                       <div class="col-lg-12 laboralDependienteContent hide" id="laboralDependientePubContent">\
                                           <div class="row">\
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
                                           </div>\
                                           <div class="row">\
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
                                           </div>\
                                           <div class="row">\
                                               <div class="col-lg-6">\
                                                   <div class="form-group">\
                                                       <label>EMPLEO, CARGO O COMISIÓN</label>\
                                                       <input type="text" name="empleoCargoComision" class="form-control" required>\
                                                   </div>\
                                               </div>\
                                               <div class="col-lg-6">\
                                                   <div class="form-group">\
                                                       <label>ESPECIFIQUE FUNCIÓN PRINCIPAL</label>\
                                                       <input type="text" name="funcionPrincipal" class="form-control" required>\
                                                   </div>\
                                               </div>\
                                           </div>\
                                           <div class="row">\
                                               <div class="col-lg-6">\
                                                   <div class="form-group">\
                                                       <label>FECHA DE INGRESO AL EMPLEO</label>\
                                                       <input type="date" name="fechaIngreso" class="form-control" required>\
                                                   </div>\
                                               </div>\
                                               <div class="col-lg-6">\
                                                   <div class="row">\
                                                       <div class="col-md-6">\
                                                           <div class="form-group">\
                                                               <label>SALARIO MENSUAL NETO</label>\
                                                               <input type="text" name="valor" class="form-control numeric" required>\
                                                           </div>\
                                                       </div>\
                                                       <div class="col-md-6">\
                                                           <div class="form-group">\
                                                               <label>MONEDA</label>\
                                                               <select name="moneda" class="form-control CBOmoneda"></select>\
                                                           </div>\
                                                       </div>\
                                                   </div>\
                                               </div>\
                                           </div>\
                                       </div>\
                                       <div class="col-lg-12 laboralDependienteContent hide" id="laboralDependientePriContent">\
                                           <div class="row">\
                                               <div class="col-lg-12">\
                                                   <div class="form-group">\
                                                       <label>NOMBRE DE LA EMPRESA, SOCIEDAD O ASOCIACIÓN</label>\
                                                       <input type="text" name="nombreEmpresaSociedadAsociacion" class="form-control" required>\
                                                   </div>\
                                               </div>\
                                           </div>\
                                           <div class="row">\
                                               <div class="col-lg-6">\
                                                   <div class="form-group">\
                                                       <label>RFC</label>\
                                                       <input type="text" name="rfc" class="form-control" required>\
                                                   </div>\
                                               </div>\
                                               <div class="col-lg-6">\
                                                   <div class="form-group">\
                                                       <label>EMPLEO O CARGO</label>\
                                                       <input type="text" name="empleoCargoComision" class="form-control" required>\
                                                   </div>\
                                               </div>\
                                           </div>\
                                           <div class="row">\
                                               <div class="col-lg-6">\
                                                   <div class="form-group">\
                                                       <label>FECHA DE INGRESO AL EMPLEO</label>\
                                                       <input type="date" name="fechaIngreso" class="form-control" required>\
                                                   </div>\
                                               </div>\
                                               <div class="col-lg-6">\
                                                   <div class="form-group">\
                                                       <label>SECTOR AL QUE PERTENECE</label>\
                                                       <select name="sector" class="form-control CBOsector"></select>\
                                                   </div>\
                                               </div>\
                                           </div>\
                                           <div class="row">\
                                               <div class="col-lg-6">\
                                                   <div class="row">\
                                                       <div class="col-lg-12">\
                                                           <label id="labelcheckPareja">¿ES PROOVEDOR O CONTRATISTA DE GOBIERNO?</label>\
                                                       </div>\
                                                   </div>\
                                                   <div class="form-check form-check-inline">\
                                                       <input class="form-check-input" type="radio" name="proveedorContratistaGobierno" id="radioDependienteProveGob1" value="true">\
                                                       <label class="form-check-label" for="radioDependienteProveGob1">SI</label>\
                                                   </div>\
                                                   <div class="form-check form-check-inline">\
                                                       <input class="form-check-input" type="radio" name="proveedorContratistaGobierno" id="radioDependienteProveGob2" value="false" checked>\
                                                       <label class="form-check-label" for="radioDependienteProveGob2">NO</label>\
                                                   </div>\
                                               </div>\
                                               <div class="col-lg-6">\
                                                   <div class="row">\
                                                       <div class="col-md-6">\
                                                           <div class="form-group">\
                                                               <label>SALARIO MENSUAL NETO</label>\
                                                               <input type="text" name="valor" class="form-control numeric" required>\
                                                           </div>\
                                                       </div>\
                                                       <div class="col-md-6">\
                                                           <div class="form-group">\
                                                               <label>MONEDA</label>\
                                                               <select name="moneda" class="form-control CBOmoneda"></select>\
                                                           </div>\
                                                       </div>\
                                                   </div>\
                                               </div>\
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

window.initDependientesEconomicos = function initDependientesEconomicos(data){
    var seccion = JSON.parse(atob(data));
    var seccionName = seccion.moduloName.replace("modulo","");
    var form = "#form" + seccion.moduloName.replace("modulo", "")+ " ";
    var modulo = "#" + seccion.moduloName + " ";

    //validar status de la sección.
    switch(seccion.status){
        case "SIN_INFO":
            //asginar valores predeterminados a catálogos(ayuda al usuario).
            jsonResult.declaracion.situacionPatrimonial.datosDependienteEconomico.ninguno=true;
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
            $(modulo + ".btnAgregar").addClass("hide");
            $(modulo + ".btnHabilitar").addClass("hide");
            $(modulo + ".btnTerminar").addClass("hide");
            if (Object.keys(jsonResult.declaracion.situacionPatrimonial.datosDependienteEconomico.dependienteEconomico).length > 0){
                $(modulo + ".btnAgregar").removeClass("hide");
                $(modulo + ".btnTerminar").removeClass("hide");
            }
            else{
                $(modulo + ".btnAgregar").removeClass("hide");
            }                     

            break;
        case "TERMINADO":
            window["pintarTabla" + seccionName](seccion.no, seccionName);
            $(modulo + ".chkNinguno").prop("disabled", true);
            if (jsonResult.declaracion.situacionPatrimonial.datosDependienteEconomico.ninguno){
                $(modulo + ".chkNinguno")[0].checked=true;                
            }
            $(modulo + "textarea[name='aclaracionesObservaciones']").val(jsonResult.declaracion.situacionPatrimonial.datosDependienteEconomico.aclaracionesObservaciones).prop("disabled", true);
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
        window["funcionalidadGuardarRegistro" + seccionName](seccion.no, seccionName, modulo, "NUEVO");
    });

    $(modulo + ".btnTerminar").on('click',function() {
        jsonResult.declaracion.situacionPatrimonial.datosDependienteEconomico.aclaracionesObservaciones =  $(modulo + "textarea[name='aclaracionesObservaciones']").val();
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
window.pintarTablaDependientesEconomicos = function pintarTablaDependientesEconomicos(seccionNo, seccionName){
    let html="";
    let lista = jsonResult.declaracion.situacionPatrimonial.datosDependienteEconomico.dependienteEconomico;
    Object.keys(lista).forEach(function (row) {
        var params = { uuid: lista[row].uuid, seccionNo: seccionNo, seccionName: seccionName };
        html+="<tr id='" + lista[row].uuid + "'>";
        html+=" <td>" + lista[row].parentescoRelacion.valor +"</td>";
        html+=" <td>" + lista[row].nombre + " " + lista[row].primerApellido + " " + lista[row].segundoApellido +"</td>";        
        html+=" <td class='text-right'>";
        html+="     <button class='btn btn-sm btn-warning btnEditar' onclick='editarDependientesEconomicos(\"" + btoa(JSON.stringify(params)) + "\");'>Editar</button>";
        html+="     <button class='btn btn-sm btn-danger btnEliminar' onclick='eliminarDependientesEconomicos(\"" + btoa(JSON.stringify(params)) + "\");'>Eliminar</button>";              
        html+=" </td>";
        html+="</tr>";
    });
    $(".tbl" + seccionName + " tbody").empty().append(html);
}

window.editarDependientesEconomicos = function editarDependientesEconomicos(data){
    var item = JSON.parse(atob(data));
    var modulo = "#modulo" + item.seccionName  + " ";
    window["funcionalidadGuardarRegistro" + item.seccionName](item.seccionNo, item.seccionName, modulo, "EDITAR", item.uuid);
    
    //cargar información del row seleccionado para editar.
    var nodo = jsonResult.declaracion.situacionPatrimonial.datosDependienteEconomico.dependienteEconomico[item.uuid];
    $("#form" + item.seccionName + " select[name='tipoOperacion']").val(nodo.tipoOperacion);

    $("#form" + item.seccionName + " input[name='nombre']").val(nodo.nombre);
    $("#form" + item.seccionName + " input[name='primerApellido']").val(nodo.primerApellido);
    $("#form" + item.seccionName + " input[name='segundoApellido']").val(nodo.segundoApellido);

    $("#form" + item.seccionName + " input[name='fechaNacimiento']").val(nodo.fechaNacimiento);
    $("#form" + item.seccionName + " input[name='rfc']").val(nodo.rfc);
    $("#form" + item.seccionName + " input[name='curp']").val(nodo.curp);
    $("#form" + item.seccionName + " select[name='parentescoRelacion']").val(nodo.parentescoRelacion.clave);

    if(nodo.extranjero){ $("#form" + item.seccionName + " #radioExtranjero1").prop("checked", true);}
    else{$("#form" + item.seccionName + " #radioExtranjero2").prop("checked", true);}

    if(nodo.habitaDomicilioDeclarante){ $("#form" +item.seccionName + " #radioHabitaEnDom1").prop("checked", true);}
    else{$("#form" + item.seccionName + " #radioHabitaEnDom2").prop("checked", true);}

    $("#form" + item.seccionName + " select[name='lugarDondeReside']").val(nodo.lugarDondeReside).change();

    //domicilio mexico.
    $("#domDependienteMxContent input[name='calle']").val(nodo.domicilioMexico.calle);
    $("#domDependienteMxContent input[name='numeroExterior']").val(nodo.domicilioMexico.numeroExterior);
    $("#domDependienteMxContent input[name='numeroInterior']").val(nodo.domicilioMexico.numeroInterior);
    $("#domDependienteMxContent input[name='coloniaLocalidad']").val(nodo.domicilioMexico.coloniaLocalidad);
    $("#domDependienteMxContent select[name='entidadFederativa']").val(nodo.domicilioMexico.entidadFederativa.clave).change();
    $("#domDependienteMxContent select[name='municipioAlcaldia']").val(nodo.domicilioMexico.municipioAlcaldia.clave);    
    $("#domDependienteMxContent input[name='codigoPostal']").val(nodo.domicilioMexico.codigoPostal);
    
    //domicilio extranjero
    $("#domDependienteExContent input[name='calle']").val(nodo.domicilioExtranjero.calle);
    $("#domDependienteExContent input[name='numeroExterior']").val(nodo.domicilioExtranjero.numeroExterior);
    $("#domDependienteExContent input[name='numeroInterior']").val(nodo.domicilioExtranjero.numeroInterior);
    $("#domDependienteExContent input[name='ciudadLocalidad']").val(nodo.domicilioExtranjero.ciudadLocalidad);
    $("#domDependienteExContent input[name='estadoProvincia']").val(nodo.domicilioExtranjero.estadoProvincia);
    $("#domDependienteExContent select[name='pais']").val(nodo.domicilioExtranjero.pais);
    $("#domDependienteExContent input[name='codigoPostal']").val(nodo.domicilioExtranjero.codigoPostal);       
    
    $("#form" + item.seccionName + " select[name='actividadLaboral']").val(nodo.actividadLaboral.clave).change();
        
    $("#laboralDependientePubContent select[name='nivelOrdenGobierno']").val(nodo.actividadLaboralSectorPublico.nivelOrdenGobierno);
    $("#laboralDependientePubContent select[name='ambitoPublico']").val(nodo.actividadLaboralSectorPublico.ambitoPublico);
    $("#laboralDependientePubContent input[name='nombreEntePublico']").val(nodo.actividadLaboralSectorPublico.nombreEntePublico);
    $("#laboralDependientePubContent input[name='areaAdscripcion']").val(nodo.actividadLaboralSectorPublico.areaAdscripcion);
    $("#laboralDependientePubContent input[name='empleoCargoComision']").val(nodo.actividadLaboralSectorPublico.empleoCargoComision);
    $("#laboralDependientePubContent input[name='funcionPrincipal']").val(nodo.actividadLaboralSectorPublico.funcionPrincipal);
    $("#laboralDependientePubContent input[name='valor']").val(nodo.actividadLaboralSectorPublico.salarioMensualNeto.valor);
    $("#laboralDependientePubContent select[name='moneda']").val(nodo.actividadLaboralSectorPublico.salarioMensualNeto.moneda);
    $("#laboralDependientePubContent input[name='fechaIngreso']").val(nodo.actividadLaboralSectorPublico.fechaIngreso);

    $("#laboralDependientePriContent input[name='nombreEmpresaSociedadAsociacion']").val(nodo.actividadLaboralSectorPrivadoOtro.nombreEmpresaSociedadAsociacion);
    $("#laboralDependientePriContent input[name='empleoCargoComision']").val(nodo.actividadLaboralSectorPrivadoOtro.empleoCargo);
    $("#laboralDependientePriContent input[name='rfc']").val(nodo.actividadLaboralSectorPrivadoOtro.rfc);
    $("#laboralDependientePriContent input[name='fechaIngreso']").val(nodo.actividadLaboralSectorPrivadoOtro.fechaIngreso);
    $("#laboralDependientePriContent select[name='sector']").val(nodo.sector.clave);    
    $("#laboralDependientePriContent input[name='valor']").val(nodo.actividadLaboralSectorPrivadoOtro.salarioMensualNeto.valor);
    $("#laboralDependientePriContent select[name='moneda']").val(nodo.actividadLaboralSectorPrivadoOtro.salarioMensualNeto.moneda);
    nodo.proveedorContratistaGobierno ? $("#laboralDependientePriContent #radioDependienteProveGob1").prop("checked", true): $("#laboralDependientePriContent #radioDependienteProveGob2").prop("checked", true);  
        //generales
    $("#form" + item.seccionName + " textarea[name='aclaracionesObservaciones']").val(nodo.aclaracionesObservaciones); 
}

window.eliminarDependientesEconomicos = function eliminarDependientesEconomicos(data){
    var item = JSON.parse(atob(data));
    //elimina item en object json y tabla.
    delete jsonResult.declaracion.situacionPatrimonial.datosDependienteEconomico.dependienteEconomico[item.uuid];
    $("#" + item.uuid).remove();
    if (Object.keys(jsonResult.declaracion.situacionPatrimonial.datosDependienteEconomico.dependienteEconomico).length==0){
        $("#modulo" + item.seccionName + " .btnTerminar").addClass("hide");
    }
}

//guardar registro en el JsonResult.
window.guardarRegistroDependientesEconomicos = function guardarRegistroDependientesEconomicos(uuidItem, seccionNo, seccionName, modulo){    
    var form="#form" + seccionName;
    jsonResult.declaracion.situacionPatrimonial.datosDependienteEconomico.ninguno=false;
    jsonResult.declaracion.situacionPatrimonial.datosDependienteEconomico.aclaracionesObservaciones =  $(modulo + " textarea[name='aclaracionesObservaciones']").val().toUpperCase();
    jsonResult.declaracion.situacionPatrimonial.datosDependienteEconomico.dependienteEconomico[uuidItem] =
    {
        "uuid": uuidItem,
        "tipoOperacion":        $("#form" + seccionName + " select[name='tipoOperacion'] option:selected").val(),
        "nombre":               $("#form" + seccionName + " input[name='nombre']").val().toUpperCase(),
        "primerApellido":       $("#form" + seccionName + " input[name='primerApellido']").val().toUpperCase(),
        "segundoApellido":      $("#form" + seccionName + " input[name='segundoApellido']").val().toUpperCase(),
        "fechaNacimiento":      $("#form" + seccionName + " input[name='fechaNacimiento']").val(),
        "rfc":                  $("#form" + seccionName + " input[name='rfc']").val().toUpperCase(),
        "parentescoRelacion": {
          "clave": $("#form" + seccionName + " select[name='parentescoRelacion'] option:selected").val(),
          "valor": $("#form" + seccionName + " select[name='parentescoRelacion'] option:selected")[0].innerText
        },
        "extranjero": $("#form" + seccionName + " input[type='radio'][name='extranjero']:checked").val().toLowerCase() == 'true' ? true : false,
        "curp": $("#form" + seccionName + " input[name='curp']").val().toUpperCase(),
        "habitaDomicilioDeclarante": $("#form" + seccionName + " input[type='radio'][name='habitaDomicilioDeclarante']:checked").val().toLowerCase() == 'true' ? true : false,
        "lugarDondeReside": $("#form" + seccionName + " select[name='lugarDondeReside'] option:selected").val(),
        "domicilioMexico": {
          "calle":              $("#domDependienteMxContent input[name='calle']").val().toUpperCase(),
          "numeroExterior":     $("#domDependienteMxContent input[name='numeroExterior']").val().toUpperCase(),
          "numeroInterior":     $("#domDependienteMxContent input[name='numeroInterior']").val(),
          "coloniaLocalidad":   $("#domDependienteMxContent input[name='coloniaLocalidad']").val().toUpperCase(),
          "municipioAlcaldia": {
            "clave":        $("#domDependienteMxContent select[name='municipioAlcaldia'] option:selected").val(),
            "valor":        $("#domDependienteMxContent select[name='municipioAlcaldia'] option:selected")[0].innerText.toUpperCase()
          },
          "entidadFederativa": {
            "clave":        $("#domDependienteMxContent select[name='entidadFederativa'] option:selected").val(),
            "valor":        $("#domDependienteMxContent select[name='entidadFederativa'] option:selected")[0].innerText.toUpperCase()
          },
          "codigoPostal":   $("#domDependienteMxContent input[name='codigoPostal']").val()
        },
        "domicilioExtranjero": {
          "calle":              $("#domDependienteExContent input[name='calle']").val().toUpperCase(),
          "numeroExterior":     $("#domDependienteExContent input[name='numeroExterior']").val().toUpperCase(),
          "numeroInterior":     $("#domDependienteExContent input[name='numeroInterior']").val(),
          "ciudadLocalidad":    $("#domDependienteExContent input[name='ciudadLocalidad']").val().toUpperCase(),
          "estadoProvincia":    $("#domDependienteExContent input[name='estadoProvincia']").val().toUpperCase(),
          "pais":               $("#domDependienteExContent select[name='pais'] option:selected").val(),
          "codigoPostal":       $("#domDependienteExContent input[name='codigoPostal']").val()
        },
        "actividadLaboral": {
          "clave": $("#form" + seccionName + " select[name='actividadLaboral'] option:selected").val(),
          "valor": $("#form" + seccionName + " select[name='actividadLaboral'] option:selected")[0].innerText
        },
        "actividadLaboralSectorPublico": {
          "nivelOrdenGobierno":     $("#laboralDependientePubContent select[name='nivelOrdenGobierno'] option:selected").val(),
          "ambitoPublico":          $("#laboralDependientePubContent select[name='ambitoPublico'] option:selected").val(),
          "nombreEntePublico":      $("#laboralDependientePubContent input[name='nombreEntePublico']").val().toUpperCase(),
          "areaAdscripcion":        $("#laboralDependientePubContent input[name='areaAdscripcion']").val().toUpperCase(),
          "empleoCargoComision":    $("#laboralDependientePubContent input[name='empleoCargoComision']").val().toUpperCase(),
          "funcionPrincipal":       $("#laboralDependientePubContent input[name='funcionPrincipal']").val().toUpperCase(),
          "salarioMensualNeto": {
            "valor":                $("#laboralDependientePubContent input[name='valor']").val(),
            "moneda":               $("#laboralDependientePubContent select[name='moneda'] option:selected").val()
          },
          "fechaIngreso":           $("#laboralDependientePubContent input[name='fechaIngreso']").val()
        },
        "actividadLaboralSectorPrivadoOtro": {
          "nombreEmpresaSociedadAsociacion": $("#laboralDependientePriContent input[name='nombreEmpresaSociedadAsociacion']").val().toUpperCase(),
          "rfc":                            $("#laboralDependientePriContent input[name='rfc']").val().toUpperCase(),
          "empleoCargo":                    $("#laboralDependientePriContent input[name='empleoCargoComision']").val().toUpperCase(),
          "fechaIngreso":                   $("#laboralDependientePriContent input[name='fechaIngreso']").val(),
          "salarioMensualNeto": {
            "valor":                        $("#laboralDependientePriContent input[name='valor']").val(),
            "moneda":                       $("#laboralDependientePriContent select[name='moneda'] option:selected").val()
          }
        },
        "proveedorContratistaGobierno": $("#laboralDependientePriContent input[type='radio'][name='proveedorContratistaGobierno']:checked").val().toLowerCase() == 'true' ? true : false,
        "sector": {
          "clave": $("#laboralDependientePriContent select[name='sector'] option:selected").val(),
          "valor": $("#laboralDependientePriContent select[name='sector'] option:selected")[0].innerText
        }
      };

    //cambiar status a captura.
    jsonResult.captura.declaracion.situacionPatrimonial.secciones[seccionNo].status= "EN_PROCESO";
    $(".status-seccion-" + jsonResult.captura.declaracion.situacionPatrimonial.secciones[seccionNo].apartado + "-" + seccionNo).removeClass("indicador-status indicador-status-success").addClass("indicador-status-process").text("EN PROCESO");
}

//funcionalidad en boton agregar/actualizar registro.
window.funcionalidadGuardarRegistroDependientesEconomicos = function funcionalidadGuardarRegistroDependientesEconomicos(seccionNo, seccionName, modulo, accion, uuid=null){    
    var form = "#form" + seccionName + " ";
    //ocultar/mostrar formularios
    $(modulo + ".formPrincipal").addClass("animated fadeOut").addClass("hide");                      
    $(modulo + ".formSecundario").html(formDependientesEconomicos).removeClass("hide").addClass("animated fadeIn");    
    $(form + ".titulo-seccion").text(accion + " REGISTRO");
    $(".numeric").keypress(function (e) {        
        if (e.which !== 8 && e.which !== 0 && (e.which < 48 || e.which > 57)) {            
            return false;
        }
    });

    if (accion=="EDITAR"){
        $(form + ".btnAgregar").data("uuid", uuid);
        $(form + ".btnAgregar").html('<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check" viewBox="0 0 16 16"><path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z"/></svg> Actualizar');
    }

   
    //catalogos que se usan en el modulo.
    loadCat(tipoOperacion, form + ".CBOtipoOperacion");
    loadCat(parentescoRelacion, form + ".CBOparentescoRelacion");
    loadCat(relacionConDeclarante, form + ".CBOrelacionConDeclarante");
    loadCat(entidadFederativa, form + ".CBOentidadFederativa");    
    loadCat(paises, form + ".CBOpais");
    loadCat(nivelOrdenGobierno, form + ".CBOnivelOrdenGobierno");
    loadCat(ambitoPublico, form + ".CBOambitoPublico");
    loadCat(sector, form + ".CBOsector");
    loadCat(moneda, form + ".CBOmoneda");
    loadCat(lugarDondeReside, form + ".CBOlugarDondeReside");
    loadCat(actividadLaboral, form + ".CBOactividadLaboral");

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

    if(jsonResult.captura.tipo_declaracion == "INICIAL"){
        $("#form" + seccionName + " select[name='tipoOperacion']").val("AGREGAR").prop("disabled", true);
    }
    loadFormAmbitoSectorDependientesEconomicos();
    $("#domDependienteMxContent").removeClass("hide");
    $("#domDependienteMxContent select[name='entidadFederativa']").val("07").trigger("change");
    $("#form" + seccionName + " #radioHabitaEnDom1").prop("checked", true);
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
            nombre : { required: true, maxlength: 50 },
            primerApellido : { required: true },
            fechaNacimiento : { required: true },
            rfc : { required: true, maxlength: 13 },
            curp : { required: true,  maxlength: 18 },
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
            sector : { required: true },
            proveedorContratistaGobierno : { required: true }           
        },
        messages: {
            tipoOperacion : { required: "Seleccione el tipo de operación." },
            nombre : { required: "Ingrese el nombre(s).", maxlength: "El máximo de caracteres es de 50." },
            primerApellido : { required: "Ingrese el primer apellido." },
            fechaNacimiento : { required: "Ingrese la fecha de nacimmiento." },
            rfc : { required: "Ingrese el RFC.", minlength: "El mínimo de caracteres es de 12.", maxlength: "El máximo de caracteres es de 13." },
            curp : { required: "Ingrese la CURP.", minlength: "El mínimo de caracteres es de 18.", maxlength: "El máximo de caracteres es de 18." },
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
            empleoCargoComision : { required: "Ingrese el empleo, cargo." },
            funcionPrincipal : { required: "Ingrese la función principal." },
            salarioMensualNeto : { required: "Ingrese el salario mensual neto.", number: "Solo se permiten caracteres numéricos." },
            moneda : { required: "Seleccione el tipo de moneda." },
            fechaIngreso : { required: "Ingrese la fecha de ingreso." },
            nombreEmpresaSociedadAsociacion : { required: "Ingrese el nombre de la empresa, sociedad o asociación." },
            sector : { required: "Seleccione el sector." },
            proveedorContratistaGobierno : { required: "Seleccione si es contratista de gobierno." }
        }
    });

    //btn agregar registro.
    $(form + ".btnAgregar").on('click',function() {
        if( $("#form" + seccionName).valid() ) {
            var uuidItem;
            if (accion=="EDITAR"){ uuidItem = uuid;}
            else{ uuidItem= generarUUID();}       
            guardarRegistroDependientesEconomicos(uuidItem, seccionNo, seccionName, modulo);
            pintarTablaDependientesEconomicos(seccionNo, seccionName);       
            //ocultar/mostrar formularos.
            $(modulo + ".formSecundario").html("").addClass("hide");
            $(modulo + ".formPrincipal").removeClass("hide").addClass("animated fadeOut"); 
            $(modulo + ".btnTerminar").removeClass("hide");
            goTop();   
        }       
    });
}

window.loadFormAmbitoSectorDependientesEconomicos = function loadFormAmbitoSectorDependientesEconomicos(){
    $(".laboralDependienteContent").addClass("hide");
    if($("#formDependientesEconomicos select[name='ambitoSector'] option:selected").val() =="PUB"){ $("#laboralDependientePubContent").removeClass("hide");}
    else{$("#laboralDependientePriContent").removeClass("hide");}
}

