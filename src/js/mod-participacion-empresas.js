var formParticipacionEmpresas ='<form action="" id="formParticipacionEmpresas">\
                <h5 class="titulo-seccion"></h5>\
                <div class="row p10">\
                    <div class="col-lg-5">\
                        <div class="form-group">\
                            <label>TIPO DE OPERACIÓN</label>\
                            <select name="tipoOperacion" class="form-control CBOtipoOperacion" required></select>\
                        </div>\
                    </div>\
                    <div class="col-lg-5">\
                        <div class="form-group">\
                            <label>TIPO DE RELACIÓN</label>\
                            <select name="tipoRelacion" class="form-control CBOtipoRelacion" required></select>\
                        </div>\
                    </div>\
                </div>\
                <div class="row p10">\
                    <div class="col-lg-5">\
                        <div class="form-group">\
                            <label>NOMBRE DE LA EMPRESA, SOCIEDAD O ASOCIACIÓN</label>\
                            <input type="text" name="nombreEmpresaSociedadAsociacion" class="form-control" required>\
                        </div>\
                    </div>\
                    <div class="col-lg-2">\
                        <div class="form-group">\
                            <label>R.F.C.</label>\
                            <input type="text" name="rfc" class="form-control" maxlength="12" minlength="12" required>\
                        </div>\
                    </div>\
                    <div class="col-lg-5">\
                        <div class="form-group">\
                            <label>PORCENTAJE DE PARTICIPACIÓN DE ACUERDO A ESCRITURA</label>\
                            <input type="text" name="porcentajeParticipacion" class="form-control" required>\
                        </div>\
                    </div>\
                </div>\
                <div class="row p10">\
                    <div class="col-lg-3">\
                        <div class="form-group">\
                            <label>TIPO DE PARTICIPACIÓN</label>\
                            <select name="tipoParticipacion" class="form-control CBOtipoParticipacion" required></select>\
                        </div>\
                    </div>\
                    <div class="col-lg-5">\
                        <div class="form-group">\
                            <label>¿RECIBE REMUNERACIÓN POR SU PARTICIPACIÓN?</label>\
                            <select name="recibeRemuneracion" class="form-control CBOrecibeRemuneracion" required>\
                                <option value="true">SI</option>\
                                <option value="false">NO</option>\
                            </select>\
                        </div>\
                    </div>\
                    <div class="col-lg-3">\
                        <div class="form-group">\
                            <label>MONTO MENSUAL NETO</label>\
                            <input type="number" name="montoMensual" class="form-control" required>\
                        </div>\
                    </div>\
                    <div class="col-lg-1">\
                        <div class="form-group">\
                            <label>MONEDA</label>\
                            <select name="moneda" class="form-control CBOmoneda" required></select>\
                        </div>\
                    </div>\
                </div>\
                <div class="row p10">\
                    <div class="col-lg-4">\
                        <div class="form-group">\
                            <label>LUGAR DONDE SE UBICA</label>\
                            <select name="ubicacion" class="form-control CBOubicacion" required></select>\
                        </div>\
                    </div>\
                    <div class="col-lg-4">\
                        <div class="form-group">\
                            <label>PAÍS</label>\
                            <select name="pais" class="form-control CBOpais" required></select>\
                        </div>\
                    </div>\
                    <div class="col-lg-4">\
                        <div class="form-group">\
                            <label>ENTIDAD FEDERATIVA</label>\
                            <select name="entidadFederativa" class="form-control CBOentidadFederativa" required></select>\
                        </div>\
                    </div>\
                </div>\
                <div class="row p10">\
                    <div class="col-lg-6">\
                        <div class="form-group">\
                            <label>SECTOR PRODUCTIVO AL QUE PERTENECE</label>\
                            <select name="sector" class="form-control CBOsector" required></select>\
                        </div>\
                    </div>\
                    <div class="col-lg-6">\
                        <div class="form-group">\
                            <label>ESPECIFIQUE</label>\
                            <input type="text" name="especifique" class="form-control" required>\
                        </div>\
                    </div>\
                </div>\
                <div class="modal-footer">\
                  <button type="button" class="btn btn-secondary btnCerrar" data-uuid="">Cerrar</button>\
                  <button type="button" class="btn btn-primary btnAgregar">Agregar</button>\
                </div>\
            </form>';

            
function loadFuncionalidadParticipacionEmpresas(seccionNo, seccionName, seccionStatus){
    $(".btnAgregarParticipacionEmpresas").attr('data-seccion_name', seccionName);
    $(".btnAgregarParticipacionEmpresas").attr('data-seccion_no', seccionNo);
    //validar en que proceso se encuentra el modulo seleccionado.
    switch(seccionStatus){
        case "SIN_INFO": 
            //asginar valores predeterminados a catálogos(ayuda al usuario).
            $(".chkNinguno")[0].checked=false;
            $(".tbl" + seccionName).removeClass("hide").empty();
            $(".aclaracionesObservaciones").val("");
            $(".btnAgregar" + seccionName).removeClass("hide");
            $(".btnTerminar" + seccionName).removeClass("hide");        
        break;
        case "EN_PROCESO":
            var html="", uuidRow;
            Object.keys(jsonResult.declaracion.interes.participacion.participacion).forEach(function (row) {  
                uuidRow=generarUUID();              
                html+="<tr id='" + uuidRow + "'>";
                html+=" <td colspan='3'>";
                html+=" <div class='row' id='row" + uuidRow + "'>";
                html+="     <div class='col-lg-6 text-left'>" + jsonResult.declaracion.interes.participacion.participacion[row].nombreEmpresaSociedadAsociacion +"</div>";
                html+="     <div class='col-lg-3 text-center'>" + jsonResult.declaracion.interes.participacion.participacion[row].rfc + "</div>";
                html+="     <div class='col-lg-3 text-right'>";
                html+="         <button class='btn btn-sm btn-info btnEditar' data-uuid='" + uuidRow + "' data-operacion='MODIFICAR'>Editar</button>";
                html+="         <button class='btn btn-sm btn-danger btnEliminar' data-uuid='" + uuidRow + "' data-rfc='" + $("input[name='rfc']").val() + "'>Eliminar</button>";
                html+="     </div>";
                html+=" <div class='col-lg-12' id='form" + uuidRow + "'></div>";
                html+=" </div>";
                html+=" </td>";
                html+="</tr>";
                $(".tblParticipacionEmpresas tbody").append(html);
            });

            //cargar información guardada previamente.
            var infoSeccionGuardada = jsonResult.declaracion.interes.participacion.participacion;
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
            break;
        case "TERMINADO": 
        break;
    }                        

    $(".btnAgregarParticipacionEmpresas").on('click',function() {
        var seccionNo = this.dataset.seccion_no;
        var seccionName = this.dataset.seccion_name;
        //ocultar content table
        $("#contentSeccion" + seccionNo + " .formPrincipal").addClass("animated fadeOut").addClass("hide");                      
        //mostrar content form add/edit
        $("#contentSeccion" + seccionNo + " .formSecundario").html(formParticipacionEmpresas).removeClass("hide").addClass("animated fadeIn");
        $("#formParticipacionEmpresas .titulo-seccion").text("NUEVO REGISTRO");
        //asignar dataset a btn form add/edit.
        document.forms["form" + seccionName].getElementsByClassName("btnCerrar")[0].dataset.seccion_no = seccionNo;
        document.forms["form" + seccionName].getElementsByClassName("btnAgregar")[0].dataset.seccion_no = seccionNo;

        //catalogos que se usan en el modulo.
        loadCat(tipoOperacion, ".CBOtipoOperacion");
        loadCat(tipoRelacion, ".CBOtipoRelacion");
        loadCat(tipoParticipacion, ".CBOtipoParticipacion");
        loadCat(sector, ".CBOsector"); 

        //btn cerrar formulario.   
        $(".btnCerrar").on('click',function() {
            $("#contentSeccion" + this.dataset.seccion_no + " .formSecundario").html("").addClass("hide");
            $("#contentSeccion" + this.dataset.seccion_no + " .formPrincipal").removeClass("hide").addClass("animated fadeOut");
        }); 

        //btn agregar registro.
        $(".btnAgregar").on('click',function() {
            var uuidItem= generarUUID();
            captura.declaracion.interes.secciones[this.dataset.seccion_no] = "EN_PROCESO";
            jsonResult.declaracion.interes.participacion.ninguno = false;
            jsonResult.declaracion.interes.participacion.participacion[uuidItem] =
                {
                    "tipoOperacion": "AGREGAR",
                    "tipoRelacion": $("select[name='tipoRelacion'] option:selected").val(),
                    "nombreEmpresaSociedadAsociacion": $("input[name='nombreEmpresaSociedadAsociacion']").val(),
                    "rfc": $("input[name='rfc']").val(),
                    "porcentajeParticipacion": $("input[name='porcentajeParticipacion']").val(),
                    "tipoParticipacion": {
                        "clave": $("select[name='tipoParticipacion']").val(),
                        "valor": $("select[name='tipoParticipacion'] option:selected")[0].innerText
                    },
                    "recibeRemuneracion": true,
                    "montoMensual": {
                        "valor": $("input[name='montoMensual']").val(),
                        "moneda": "MXN"
                    },
                    "ubicacion": {
                        "pais": "MX",
                        "entidadFederativa": {
                            "clave": "01",
                            "valor": "Aguascalientes"
                        }
                    },
                    "sector": {
                        "clave": $("select[name='sector']").val(),
                        "valor": $("select[name='sector'] option:selected")[0].innerText
                    }
                };

            //agrega el registro a la tabla.
            addRowToTable(jsonResult.declaracion.interes.participacion.participacion[uuidItem], uuidItem, this.dataset.seccion_no, seccionName);            
            //ocultar content formulario add/edit.
            $("#contentSeccion" + this.dataset.seccion_no + " .formSecundario").html("").addClass("hide");
            //mostrar content table.
            $("#contentSeccion" + this.dataset.seccion_no + " .formPrincipal").removeClass("hide").addClass("animated fadeOut");
        });
    });
}

function addRowToTable(row, uuid, seccionNo, seccionName){
    var html="";
    html+="<tr id='" + uuid + "'>";
    html+=" <td colspan='3'>";
    html+="     <div class='row' id='row" + uuid + "'>";
    html+="         <div class='col-lg-6 text-left'>" + row.nombreEmpresaSociedadAsociacion +"</div>";
    html+="         <div class='col-lg-3 text-center'>" + row.rfc + "</div>";
    html+="         <div class='col-lg-3 text-right'>";
    html+="             <button class='btn btn-sm btn-info btnEditar' data-uuid='" + uuid + "' data-seccion_no='" + seccionNo + "' data-seccion_name='" + seccionName +"' data-operacion='MODIFICAR'>Editar</button>";
    html+="             <button class='btn btn-sm btn-danger btnEliminar' data-uuid='" + uuid + "'>Eliminar</button>";
    html+="         </div>";
    html+="         <div class='col-lg-12' id='form" + uuid + "'></div>";
    html+="     </div>";
    html+=" </td>";
    html+="</tr>";
    $(".tblParticipacionEmpresas tbody").append(html);
    
    //btn eliminar row de formulario.   
    $(".btnEliminar").on('click',function() { 
        //elimina item en object json.
        delete jsonResult.declaracion.interes.participacion.participacion[this.dataset.uuid];
        //elimina el tr de tabla.
        $("#" + this.dataset.uuid).remove();
    });

    //btn editar row de formulario.
    $(".btnEditar").on('click',function() {     
        var seccionName = this.dataset.seccion_name;    
        //ocultar content table.
        $("#contentSeccion" + this.dataset.seccion_no + " .formPrincipal").addClass("hide");
        //mostrar content formulario add/edit.
        $("#contentSeccion" + this.dataset.seccion_no + " .formSecundario").html(formParticipacionEmpresas).removeClass("hide");
        $("#formParticipacionEmpresas .titulo-seccion").text("EDITAR REGISTRO");
        //asignar dataset a btn form add/edit.
        document.forms["form" + seccionName].getElementsByClassName("btnCerrar")[0].dataset.seccion_no = seccionNo;
        document.forms["form" + seccionName].getElementsByClassName("btnAgregar")[0].dataset.seccion_no = seccionNo;
        document.forms["form" + seccionName].getElementsByClassName("btnAgregar")[0].innerText="Actualizar"
        //catalogos que se usan en el modulo.
        loadCat(tipoOperacion, ".CBOtipoOperacion");
        loadCat(tipoRelacion, ".CBOtipoRelacion");
        loadCat(tipoParticipacion, ".CBOtipoParticipacion");
        loadCat(sector, ".CBOsector"); 

        //cargar información.
        var infoSeccionGuardada = jsonResult.declaracion.interes.participacion.participacion[this.dataset.uuid];
        $.each(infoSeccionGuardada, function (index, item) {
            if(typeof item == "string"){ document.getElementsByName(index)[0].value = item; }
            else if(typeof item == "boolean"){ document.getElementsByName(index)[0].value = item; }
            else{
                switch(index){
                    case "tipoRelacion":
                    case "tipoParticipacion":
                    case "sector":
                        document.getElementsByName(index)[0].value = item.clave;
                        break;
                    default: 
                        /* $.each(item, function (subindex, subitem) {
                            document.getElementsByName(subindex)[0].value = subitem;
                        }); */ 
                    break;
                }
            }
        });

        //btn cerrar formulario.   
        $(".btnCerrar").on('click',function() {
            $("#contentSeccion" + this.dataset.seccion_no + " .formSecundario").html("").addClass("hide");
            $("#contentSeccion" + this.dataset.seccion_no + " .formPrincipal").removeClass("hide").addClass("animated fadeOut");
        });
        var uuidEdit = this.dataset.uuid;
        //btn agregar registro.
        $(".btnAgregar").on('click',function() {
            
            captura.declaracion.interes.secciones[this.dataset.seccion_no] = "EN_PROCESO";
            jsonResult.declaracion.interes.participacion.ninguno = false;
            jsonResult.declaracion.interes.participacion.participacion[uuidEdit] =
                {
                    "tipoOperacion": "AGREGAR",
                    "tipoRelacion": $("select[name='tipoRelacion'] option:selected").val(),
                    "nombreEmpresaSociedadAsociacion": $("input[name='nombreEmpresaSociedadAsociacion']").val(),
                    "rfc": $("input[name='rfc']").val(),
                    "porcentajeParticipacion": $("input[name='porcentajeParticipacion']").val(),
                    "tipoParticipacion": {
                        "clave": $("select[name='tipoParticipacion']").val(),
                        "valor": $("select[name='tipoParticipacion'] option:selected")[0].innerText
                    },
                    "recibeRemuneracion": true,
                    "montoMensual": {
                        "valor": $("input[name='montoMensual']").val(),
                        "moneda": "MXN"
                    },
                    "ubicacion": {
                        "pais": "MX",
                        "entidadFederativa": {
                            "clave": "01",
                            "valor": "Aguascalientes"
                        }
                    },
                    "sector": {
                        "clave": $("select[name='sector']").val(),
                        "valor": $("select[name='sector'] option:selected")[0].innerText
                    }
                };

            //agrega el registro a la tabla.
            //addRowToTable(jsonResult.declaracion.interes.participacion.participacion[uuidItem], uuidItem, this.dataset.seccion_no, seccionName);            
            //ocultar content formulario add/edit.
            $("#contentSeccion" + this.dataset.seccion_no + " .formSecundario").html("").addClass("hide");
            //mostrar content table.
            $("#contentSeccion" + this.dataset.seccion_no + " .formPrincipal").removeClass("hide").addClass("animated fadeOut");
        });        
    });

}