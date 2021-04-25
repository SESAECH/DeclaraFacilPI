window.actualizarStatusSeccion = function actualizarStatusSeccion(declaracionSeccion, seccionNo, seccionName, status){
    jsonResult.captura.declaracion[declaracionSeccion].secciones[seccionNo].status= status;
    if(status ==="EN_PROCESO"){
        $(".status-seccion-" + declaracionSeccion + "-" + seccionNo).removeClass("indicador-status-success").addClass("indicador-status-process").text("EN PROCESO");
        mensajeSwal("Aviso","Sección guardada con exito.", "success");
    }
    else{
        $(".status-seccion-" + declaracionSeccion + "-" + seccionNo).removeClass("indicador-status").addClass("indicador-status-success").text("TERMINADO");
        $("#form" + seccionName +" :input").prop("disabled", true);
        $(".btnGuardar, .btnTerminar").addClass("hide");
        $(".btnHabilitar").removeClass("hide").prop("disabled", false);
        mensajeSwal("Aviso","Sección terminada con exito.", "success");
    }
    validarDeclaracionTerminada();
    //scroll top de la página.
    goTop();
}

window.habilitarSeccion = function habilitarSeccion(declaracionSeccion, seccionNo, seccionName){
    jsonResult.captura.declaracion[declaracionSeccion].secciones[seccionNo].status= "EN_PROCESO";
    $(".status-seccion-" + declaracionSeccion + "-" + seccionNo).removeClass("indicador-status-success").addClass("indicador-status-process").text("EN PROCESO");
    if (seccionName=="Pareja"){
        if(!jsonResult.declaracion.situacionPatrimonial.datosPareja.ninguno){
            $("#form" + seccionName +" :input").prop("disabled", false);            
        }        
        $("#checkNingunaPareja").prop("disabled", false);
        $("#formPareja .btnGuardar").prop("disabled", false).removeClass("hide");
        $("#formPareja .btnTerminar").prop("disabled", false).removeClass("hide");

        //$(".btnGuardar, .btnTerminar").removeClass("hide");
    }
    else{
        $("#form" + seccionName +" :input").prop("disabled", false);
        $(".btnGuardar, .btnTerminar").removeClass("hide");
    }        
    $(".btnHabilitar").addClass("hide");  
    validarDeclaracionTerminada();
    //scroll top de la página.
    goTop();  
}

window.setVaribleGlobal =  function setVaribleGlobal(campo, valor){
    if (campo=="domicilio"){
        if (valor=="MX"){
            $("#mex-tab").removeClass("hide");
            $("#ext-tab").addClass("hide");
            jsonResult.declaracion.situacionPatrimonial.domicilioDeclarante.domicilio="MX";
         }
        else{
            $("#mex-tab").removeClass("hide");
            $("#ext-tab").addClass("hide");
            jsonResult.declaracion.situacionPatrimonial.domicilioDeclarante.domicilio="EXT";
        }
    }
};
//window.setVaribleGlobal=setVaribleGlobal;


$(".chkNinguno").on("change",function() {
    console.log ("onchange de chkNinguno");
    console.log (this.dataset.form);
    var btnAgregar = "#modulo" + this.dataset.form + " .btnAgregar";
    var btnTerminar = "#modulo" + this.dataset.form + " .btnTerminar";
    var tabla = "#modulo" + this.dataset.form + " .tbl" + this.dataset.form;

    if(this.checked){     
        switch(this.dataset.form){
            case "ExperienciaLaboral":
                if (Object.keys(jsonResult.declaracion.situacionPatrimonial.experienciaLaboral.experiencia).length>0){
                    Swal.fire({
                        title: 'Aviso',
                        text:"Tiene registros capturados, ¿seguro quiere eliminarlos?",
                        showDenyButton: true,
                        showCancelButton: false,
                        confirmButtonText: "Continuar",
                        denyButtonText: "Cancelar",
                        }).then((result) => {
                            /* Read more about isConfirmed, isDenied below */
                            if (result.isConfirmed) {
                                //borrar info del jsonResult y de la tabla.
                                jsonResult.declaracion.situacionPatrimonial.experienciaLaboral.experiencia=[];
                                jsonResult.declaracion.situacionPatrimonial.experienciaLaboral.ninguno=true;
                                $(tabla + " tbody").empty();
                                //onhabilitar controles.
                                $(btnAgregar).addClass("hide");                                
                                $(btnTerminar).removeClass("hide");
                                $(tabla).addClass("hide");
                            } 
                            else if (result.isDenied) {
                                $("#modulo" + this.dataset.form + " .chkNinguno")[0].checked=false;
                                $(btnAgregar).removeClass("hide");                                
                                $(btnTerminar).removeClass("hide");
                                $(tabla).removeClass("hide");
                            }
                    });
                }
                else{
                    jsonResult.declaracion.situacionPatrimonial.experienciaLaboral.ninguno=true;
                    $(btnAgregar).addClass("hide");                
                    $(btnTerminar).removeClass("hide");
                    $(tabla).addClass("hide");
                }
                break;
            case "DependientesEconomicos":
                if (Object.keys(jsonResult.declaracion.situacionPatrimonial.datosDependienteEconomico.dependienteEconomico).length>0){
                    Swal.fire({
                        title: 'Aviso',
                        text:"Tiene registros capturados, ¿seguro quiere eliminarlos?",
                        showDenyButton: true,
                        showCancelButton: false,
                        confirmButtonText: "Continuar",
                        denyButtonText: "Cancelar",
                        }).then((result) => {
                            /* Read more about isConfirmed, isDenied below */
                            if (result.isConfirmed) {
                                //borrar info del jsonResult y de la tabla.
                                jsonResult.declaracion.situacionPatrimonial.datosDependienteEconomico.dependienteEconomico=[];
                                jsonResult.declaracion.situacionPatrimonial.datosDependienteEconomico.ninguno=true;
                                $(tabla + " tbody").empty();
                                //onhabilitar controles.
                                $(btnAgregar).addClass("hide");
                                $(tabla).addClass("hide");
                                $(btnTerminar).removeClass("hide");
                            } 
                            else if (result.isDenied) {
                                $("#moduloDependientesEconomicos .chkNinguno")[0].checked=false;
                                $(btnAgregar).removeClass("hide");
                                $(tabla).removeClass("hide");
                                $(btnTerminar).removeClass("hide");
                            }
                    });
                }
                else{
                    jsonResult.declaracion.situacionPatrimonial.datosDependienteEconomico.ninguno=true;
                    $(btnAgregar).addClass("hide");
                    $(tabla).addClass("hide");
                    $(btnTerminar).removeClass("hide");
                }                                
                break;
            case "Pareja":
                //PENDIENTE: LIMPIAR TODO EL FORMULARIO.
                $('.CBOlugarDondeReside').val("SE_DESCONOCE").change();
                $('.CBOactividadLaboral').val("NIN").change();
                $("#formPareja :input").prop("disabled", true);
                $("#checkNingunaPareja").prop("disabled", false);
                $("#formPareja .btnGuardar").prop("disabled", false);
                $("#formPareja .btnTerminar").prop("disabled", false);
                break;
            case "BienesInmuebles":
                if (Object.keys(jsonResult.declaracion.situacionPatrimonial.bienesInmuebles.bienInmueble).length>0){
                    Swal.fire({
                        title: 'Aviso',
                        text:"Tiene registros capturados, ¿seguro quiere eliminarlos?",
                        showDenyButton: true,
                        showCancelButton: false,
                        confirmButtonText: "Continuar",
                        denyButtonText: "Cancelar",
                        }).then((result) => {
                            /* Read more about isConfirmed, isDenied below */
                            if (result.isConfirmed) {
                                //borrar info del jsonResult y de la tabla.
                                jsonResult.declaracion.situacionPatrimonial.bienesInmuebles.bienInmueble=[];
                                jsonResult.declaracion.situacionPatrimonial.bienesInmuebles.ninguno=true;
                                $(tabla + " tbody").empty();
                                //inhabilitar controles.
                                $(btnAgregar).addClass("hide");
                                $(tabla).addClass("hide");
                                $(btnTerminar).removeClass("hide");
                            } 
                            else if (result.isDenied) {
                                $("#moduloBienesInmuebles .chkNinguno")[0].checked=false;
                                $(btnAgregar).removeClass("hide");
                                $(tabla).removeClass("hide");
                                $(btnTerminar).removeClass("hide");
                            }
                    });
                }
                else{
                    jsonResult.declaracion.situacionPatrimonial.bienesInmuebles.ninguno=true;
                    $(btnAgregar).addClass("hide");
                    $(tabla).addClass("hide");
                    $(btnTerminar).removeClass("hide");
                }                 
                break;
            case "Vehiculos": 
                if (Object.keys(jsonResult.declaracion.situacionPatrimonial.vehiculos.vehiculo).length>0){
                    Swal.fire({
                        title: 'Aviso',
                        text:"Tiene registros capturados, ¿seguro quiere eliminarlos?",
                        showDenyButton: true,
                        showCancelButton: false,
                        confirmButtonText: "Continuar",
                        denyButtonText: "Cancelar",
                        }).then((result) => {
                            /* Read more about isConfirmed, isDenied below */
                            if (result.isConfirmed) {
                                //borrar info del jsonResult y de la tabla.
                                jsonResult.declaracion.situacionPatrimonial.vehiculos.vehiculo=[];
                                jsonResult.declaracion.situacionPatrimonial.vehiculos.ninguno=true;
                                $(tabla + " tbody").empty();
                                //inhabilitar controles.
                                $(btnAgregar).addClass("hide");
                                $(tabla).addClass("hide");
                                $(btnTerminar).removeClass("hide");
                            } 
                            else if (result.isDenied) {
                                $("#moduloVehiculos .chkNinguno")[0].checked=false;
                                $(btnAgregar).removeClass("hide");
                                $(tabla).removeClass("hide");
                                $(btnTerminar).removeClass("hide");
                            }
                    });
                }
                else{
                    jsonResult.declaracion.situacionPatrimonial.vehiculos.ninguno=true;
                    $(btnAgregar).addClass("hide");
                    $(tabla).addClass("hide");
                    $(btnTerminar).removeClass("hide");
                }
            break;
            case "BienesMuebles": 
                if (Object.keys(jsonResult.declaracion.situacionPatrimonial.bienesMuebles.bienMueble).length>0){
                    Swal.fire({
                        title: 'Aviso',
                        text:"Tiene registros capturados, ¿seguro quiere eliminarlos?",
                        showDenyButton: true,
                        showCancelButton: false,
                        confirmButtonText: "Continuar",
                        denyButtonText: "Cancelar",
                        }).then((result) => {
                            /* Read more about isConfirmed, isDenied below */
                            if (result.isConfirmed) {
                                //borrar info del jsonResult y de la tabla.
                                jsonResult.declaracion.situacionPatrimonial.bienesMuebles.bienMueble=[];
                                jsonResult.declaracion.situacionPatrimonial.bienesMuebles.ninguno=true;
                                $(tabla + " tbody").empty();
                                //inhabilitar controles.
                                $(btnAgregar).addClass("hide");
                                $(tabla).addClass("hide");
                                $(btnTerminar).removeClass("hide");
                            } 
                            else if (result.isDenied) {
                                $("#moduloBienesMuebles .chkNinguno")[0].checked=false;
                                $(btnAgregar).removeClass("hide");
                                $(tabla).removeClass("hide");
                                $(btnTerminar).removeClass("hide");
                            }
                    });
                }
                else{
                    jsonResult.declaracion.situacionPatrimonial.bienesMuebles.ninguno=true;
                    $(btnAgregar).addClass("hide");
                    $(tabla).addClass("hide");
                    $(btnTerminar).removeClass("hide");
                }
            break;            
            case "Inversiones": 
                if (Object.keys(jsonResult.declaracion.situacionPatrimonial.inversiones.inversion).length>0){
                    Swal.fire({
                        title: 'Aviso',
                        text:"Tiene registros capturados, ¿seguro quiere eliminarlos?",
                        showDenyButton: true,
                        showCancelButton: false,
                        confirmButtonText: "Continuar",
                        denyButtonText: "Cancelar",
                        }).then((result) => {
                            /* Read more about isConfirmed, isDenied below */
                            if (result.isConfirmed) {
                                //borrar info del jsonResult y de la tabla.
                                jsonResult.declaracion.situacionPatrimonial.inversiones.inversion=[];
                                jsonResult.declaracion.situacionPatrimonial.inversiones.ninguno=true;
                                $(tabla + " tbody").empty();
                                //inhabilitar controles.
                                $(btnAgregar).addClass("hide");
                                $(tabla).addClass("hide");
                                $(btnTerminar).removeClass("hide");
                            } 
                            else if (result.isDenied) {
                                $("#moduloInversiones .chkNinguno")[0].checked=false;
                                $(btnAgregar).removeClass("hide");
                                $(tabla).removeClass("hide");
                                $(btnTerminar).removeClass("hide");
                            }
                    });
                }
                else{
                    jsonResult.declaracion.situacionPatrimonial.inversiones.ninguno=true;
                    $(btnAgregar).addClass("hide");
                    $(tabla).addClass("hide");
                    $(btnTerminar).removeClass("hide");
                }
            break;            
            case "Adeudos": 
                if (Object.keys(jsonResult.declaracion.situacionPatrimonial.adeudos.adeudo).length>0){
                    Swal.fire({
                        title: 'Aviso',
                        text:"Tiene registros capturados, ¿seguro quiere eliminarlos?",
                        showDenyButton: true,
                        showCancelButton: false,
                        confirmButtonText: "Continuar",
                        denyButtonText: "Cancelar",
                        }).then((result) => {
                            /* Read more about isConfirmed, isDenied below */
                            if (result.isConfirmed) {
                                //borrar info del jsonResult y de la tabla.
                                jsonResult.declaracion.situacionPatrimonial.adeudos.adeudo=[];
                                jsonResult.declaracion.situacionPatrimonial.adeudos.ninguno=true;
                                $(tabla + " tbody").empty();
                                //inhabilitar controles.
                                $(btnAgregar).addClass("hide");
                                $(tabla).addClass("hide");
                                $(btnTerminar).removeClass("hide");
                            } 
                            else if (result.isDenied) {
                                $("#moduloAdeudos .chkNinguno")[0].checked=false;
                                $(btnAgregar).removeClass("hide");
                                $(tabla).removeClass("hide");
                                $(btnTerminar).removeClass("hide");
                            }
                    });
                }
                else{
                    jsonResult.declaracion.situacionPatrimonial.adeudos.ninguno=true;
                    $(btnAgregar).addClass("hide");
                    $(tabla).addClass("hide");
                    $(btnTerminar).removeClass("hide");
                }
            break;
            case "PrestamoOComodato": 
                if (Object.keys(jsonResult.declaracion.situacionPatrimonial.prestamoOComodato.prestamo).length>0){
                    Swal.fire({
                        title: 'Aviso',
                        text:"Tiene registros capturados, ¿seguro quiere eliminarlos?",
                        showDenyButton: true,
                        showCancelButton: false,
                        confirmButtonText: "Continuar",
                        denyButtonText: "Cancelar",
                        }).then((result) => {
                            /* Read more about isConfirmed, isDenied below */
                            if (result.isConfirmed) {
                                //borrar info del jsonResult y de la tabla.
                                jsonResult.declaracion.situacionPatrimonial.prestamoOComodato.prestamo=[];
                                jsonResult.declaracion.situacionPatrimonial.prestamoOComodato.ninguno=true;
                                $(tabla + " tbody").empty();
                                //inhabilitar controles.
                                $(btnAgregar).addClass("hide");
                                $(tabla).addClass("hide");
                                $(btnTerminar).removeClass("hide");
                            } 
                            else if (result.isDenied) {
                                $("#moduloPrestamoOComodato .chkNinguno")[0].checked=false;
                                $(btnAgregar).removeClass("hide");
                                $(tabla).removeClass("hide");
                                $(btnTerminar).removeClass("hide");
                            }
                    });
                }
                else{
                    jsonResult.declaracion.situacionPatrimonial.prestamoOComodato.ninguno=true;
                    $(btnAgregar).addClass("hide");
                    $(tabla).addClass("hide");
                    $(btnTerminar).removeClass("hide");
                }
            break;            
            case "ParticipacionEmpresas":
                if (Object.keys(jsonResult.declaracion.interes.participacion.participacion).length>0){
                    Swal.fire({
                        title: 'Aviso',
                        text:"Tiene registros capturados, ¿seguro quiere eliminarlos?",
                        showDenyButton: true,
                        showCancelButton: false,
                        confirmButtonText: "Continuar",
                        denyButtonText: "Cancelar",
                        }).then((result) => {
                            /* Read more about isConfirmed, isDenied below */
                            if (result.isConfirmed) {
                                //borrar info del jsonResult y de la tabla.
                                jsonResult.declaracion.interes.participacion.participacion=[];
                                jsonResult.declaracion.interes.participacion.ninguno=true;
                                $(tabla + " tbody").empty();
                                //inhabilitar controles.
                                $(btnAgregar).addClass("hide");
                                $(tabla).addClass("hide");
                                $(btnTerminar).removeClass("hide");
                            } 
                            else if (result.isDenied) {
                                $("#moduloParticipacionEmpresas .chkNinguno")[0].checked=false;
                                $(btnAgregar).removeClass("hide");
                                $(tabla).removeClass("hide");
                                $(btnTerminar).removeClass("hide");
                            }
                    });
                }
                else{
                    jsonResult.declaracion.interes.participacion.ninguno=true;
                    $(btnAgregar).addClass("hide");
                    $(tabla).addClass("hide");
                    $(btnTerminar).removeClass("hide");
                }
            break;
            case "ParticipacionInstituciones":
                if (Object.keys(jsonResult.declaracion.interes.participacionTomaDecisiones.participacion).length>0){
                    Swal.fire({
                        title: 'Aviso',
                        text:"Tiene registros capturados, ¿seguro quiere eliminarlos?",
                        showDenyButton: true,
                        showCancelButton: false,
                        confirmButtonText: "Continuar",
                        denyButtonText: "Cancelar",
                        }).then((result) => {
                            /* Read more about isConfirmed, isDenied below */
                            if (result.isConfirmed) {
                                //borrar info del jsonResult y de la tabla.
                                jsonResult.declaracion.interes.participacionTomaDecisiones.participacion=[];
                                jsonResult.declaracion.interes.participacionTomaDecisiones.ninguno=true;
                                $(tabla + " tbody").empty();
                                //inhabilitar controles.
                                $(btnAgregar).addClass("hide");
                                $(tabla).addClass("hide");
                                $(btnTerminar).removeClass("hide");
                            } 
                            else if (result.isDenied) {
                                $("#moduloParticipacionInstituciones .chkNinguno")[0].checked=false;
                                $(btnAgregar).removeClass("hide");
                                $(tabla).removeClass("hide");
                                $(btnTerminar).removeClass("hide");
                            }
                    });
                }
                else{
                    jsonResult.declaracion.interes.participacionTomaDecisiones.ninguno=true;
                    $(btnAgregar).addClass("hide");
                    $(tabla).addClass("hide");
                    $(btnTerminar).removeClass("hide");
                }
            break;
            case "ApoyosPublicos":
                if (Object.keys(jsonResult.declaracion.interes.apoyos.apoyo).length>0){
                    Swal.fire({
                        title: 'Aviso',
                        text:"Tiene registros capturados, ¿seguro quiere eliminarlos?",
                        showDenyButton: true,
                        showCancelButton: false,
                        confirmButtonText: "Continuar",
                        denyButtonText: "Cancelar",
                        }).then((result) => {
                            /* Read more about isConfirmed, isDenied below */
                            if (result.isConfirmed) {
                                //borrar info del jsonResult y de la tabla.
                                jsonResult.declaracion.interes.apoyos.apoyo=[];
                                jsonResult.declaracion.interes.apoyos.ninguno=true;
                                $(tabla + " tbody").empty();
                                //inhabilitar controles.
                                $(btnAgregar).addClass("hide");
                                $(tabla).addClass("hide");
                                $(btnTerminar).removeClass("hide");
                            } 
                            else if (result.isDenied) {
                                $("#moduloApoyosPublico .chkNinguno")[0].checked=false;
                                $(btnAgregar).removeClass("hide");
                                $(tabla).removeClass("hide");
                                $(btnTerminar).removeClass("hide");
                            }
                    });
                }
                else{
                    jsonResult.declaracion.interes.apoyos.ninguno=true;
                    $(btnAgregar).addClass("hide");
                    $(tabla).addClass("hide");
                    $(btnTerminar).removeClass("hide");
                }
            break; 
            case "Representacion":
                if (Object.keys(jsonResult.declaracion.interes.representacion.representacion).length>0){
                    Swal.fire({
                        title: 'Aviso',
                        text:"Tiene registros capturados, ¿seguro quiere eliminarlos?",
                        showDenyButton: true,
                        showCancelButton: false,
                        confirmButtonText: "Continuar",
                        denyButtonText: "Cancelar",
                        }).then((result) => {
                            /* Read more about isConfirmed, isDenied below */
                            if (result.isConfirmed) {
                                //borrar info del jsonResult y de la tabla.
                                jsonResult.declaracion.interes.representacion.representacion=[];
                                jsonResult.declaracion.interes.representacion.ninguno=true;
                                $(tabla + " tbody").empty();
                                //inhabilitar controles.
                                $(btnAgregar).addClass("hide");
                                $(tabla).addClass("hide");
                                $(btnTerminar).removeClass("hide");
                            } 
                            else if (result.isDenied) {
                                $("#moduloRepresentacion .chkNinguno")[0].checked=false;
                                $(btnAgregar).removeClass("hide");
                                $(tabla).removeClass("hide");
                                $(btnTerminar).removeClass("hide");
                            }
                    });
                }
                else{
                    jsonResult.declaracion.interes.representacion.ninguno=true;
                    $(btnAgregar).addClass("hide");
                    $(tabla).addClass("hide");
                    $(btnTerminar).removeClass("hide");
                }
            break;  
            case "ClientesPrincipales":
                if (Object.keys(jsonResult.declaracion.interes.clientesPrincipales.cliente).length>0){
                    Swal.fire({
                        title: 'Aviso',
                        text:"Tiene registros capturados, ¿seguro quiere eliminarlos?",
                        showDenyButton: true,
                        showCancelButton: false,
                        confirmButtonText: "Continuar",
                        denyButtonText: "Cancelar",
                        }).then((result) => {
                            /* Read more about isConfirmed, isDenied below */
                            if (result.isConfirmed) {
                                //borrar info del jsonResult y de la tabla.
                                jsonResult.declaracion.interes.clientesPrincipales.cliente=[];
                                jsonResult.declaracion.interes.clientesPrincipales.ninguno=true;
                                $(tabla + " tbody").empty();
                                //inhabilitar controles.
                                $(btnAgregar).addClass("hide");
                                $(tabla).addClass("hide");
                                $(btnTerminar).removeClass("hide");
                            } 
                            else if (result.isDenied) {
                                $("#moduloClientesPrincipales .chkNinguno")[0].checked=false;
                                $(btnAgregar).removeClass("hide");
                                $(tabla).removeClass("hide");
                                $(btnTerminar).removeClass("hide");
                            }
                    });
                }
                else{
                    jsonResult.declaracion.interes.clientesPrincipales.ninguno=true;
                    $(btnAgregar).addClass("hide");
                    $(tabla).addClass("hide");
                    $(btnTerminar).removeClass("hide");
                }
            break;           
            case "BeneficiosPrivados":
                if (Object.keys(jsonResult.declaracion.interes.beneficiosPrivados.beneficio).length>0){
                    Swal.fire({
                        title: 'Aviso',
                        text:"Tiene registros capturados, ¿seguro quiere eliminarlos?",
                        showDenyButton: true,
                        showCancelButton: false,
                        confirmButtonText: "Continuar",
                        denyButtonText: "Cancelar",
                        }).then((result) => {
                            /* Read more about isConfirmed, isDenied below */
                            if (result.isConfirmed) {
                                //borrar info del jsonResult y de la tabla.
                                jsonResult.declaracion.interes.beneficiosPrivados.beneficio=[];
                                jsonResult.declaracion.interes.beneficiosPrivados.ninguno=true;
                                $(tabla + " tbody").empty();
                                //inhabilitar controles.
                                $(btnAgregar).addClass("hide");
                                $(tabla).addClass("hide");
                                $(btnTerminar).removeClass("hide");
                            } 
                            else if (result.isDenied) {
                                $("#moduloBeneficiosPrivados .chkNinguno")[0].checked=false;
                                $(btnAgregar).removeClass("hide");
                                $(tabla).removeClass("hide");
                                $(btnTerminar).removeClass("hide");
                            }
                    });
                }
                else{
                    jsonResult.declaracion.interes.beneficiosPrivados.ninguno=true;
                    $(btnAgregar).addClass("hide");
                    $(tabla).addClass("hide");
                    $(btnTerminar).removeClass("hide");
                }
            break;
            case "Fideicomisos":
                if (Object.keys(jsonResult.declaracion.interes.fideicomisos.fideicomiso).length>0){
                    Swal.fire({
                        title: 'Aviso',
                        text:"Tiene registros capturados, ¿seguro quiere eliminarlos?",
                        showDenyButton: true,
                        showCancelButton: false,
                        confirmButtonText: "Continuar",
                        denyButtonText: "Cancelar",
                        }).then((result) => {
                            /* Read more about isConfirmed, isDenied below */
                            if (result.isConfirmed) {
                                //borrar info del jsonResult y de la tabla.
                                jsonResult.declaracion.interes.fideicomisos.fideicomiso=[];
                                jsonResult.declaracion.interes.fideicomisos.ninguno=true;
                                $(tabla + " tbody").empty();
                                //inhabilitar controles.
                                $(btnAgregar).addClass("hide");
                                $(tabla).addClass("hide");
                                $(btnTerminar).removeClass("hide");
                            } 
                            else if (result.isDenied) {
                                $("#moduloFideicomisos .chkNinguno")[0].checked=false;
                                $(btnAgregar).removeClass("hide");
                                $(tabla).removeClass("hide");
                                $(btnTerminar).removeClass("hide");
                            }
                    });
                }
                else{
                    jsonResult.declaracion.interes.fideicomisos.ninguno=true;
                    $(btnAgregar).addClass("hide");
                    $(tabla).addClass("hide");
                    $(btnTerminar).removeClass("hide");
                }
            break;
        }
    }
    else{
        $(btnAgregar).removeClass("hide");
        $(tabla).removeClass("hide");
        $(btnTerminar).addClass("hide");
    }
});

//carga los catalogos(arrays)
window.loadCat = function (catalogo, obj){
    $(obj).empty();
    $.each(catalogo, function (index, item) {
        if (typeof item.clave !="undefined"){$(obj).append('<option value="' + item.clave + '">' + item.valor + '</option>');}
        else if (typeof item.cve_agem !="undefined"){$(obj).append('<option value="' + item.cve_agem + '">' + item.nom_agem + '</option>');}
        else if (typeof item.cve_agee !="undefined"){$(obj).append('<option value="' + item.cve_agee + '">' + item.nom_agee + '</option>');}
        else{$(obj).append('<option value="' + item + '">' + item + '</option>');}                    
    });

   //alert("Estamos cargando catalogo en: " + JSON.stringify(obj));
};
//window.loadCat = loadCat;

//module.hot.accept();
//carga los municipios.
window.loadMunicipios = function loadMunicipios(obj, filtro){
    $(obj).empty();
    $.each(municipios[filtro], function (index, item) {
        $(obj).append('<option value="' + item.clave + '">' + item.valor + '</option>');
    });

    $(obj).append($(obj + " option")
                              .remove().sort(function(a, b) {
                var at = $(a).text(),
                    bt = $(b).text();
                return (at > bt) ? 1 : ((at < bt) ? -1 : 0);
    }));
    $(obj).val("001");
};
//window.loadMunicipios = loadMunicipios;

//genera un uuid.
window.generarUUID  = function generarUUID() {
    var dt = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = (dt + Math.random() * 16) % 16 | 0;
        dt = Math.floor(dt / 16);
        return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
    return uuid;
};
//window.generarUUID = generarUUID;

//move to top site.
window.goTop = function goTop(){
    $('html, body').animate({
        scrollTop: 0//$(".titulo-seccion").offset().top
    }, 1000);
};
//window.goTop = goTop;

window.mensajeSwal = function mensajeSwal(titulo, mensaje, tipo){
    swal.fire({
        title: titulo,
        text: mensaje,
        icon: tipo,
        buttonsStyling: false,
        confirmButtonText: "Cerrar",
        showConfirmButton: true,
        customClass: {
            confirmButton: "btn btn-success"
        },
        closeOnConfirm: true
    });
};
//window.mensajeSwal = mensajeSwal;

window.oderByColumn = function oderByColumn(arreglo, COLUMN, orden) {
    function SortByName(a, b) {
        var result;
        var aName, bName;
        if (isNaN(a[COLUMN])) aName = replaceSpecialChars(a[COLUMN].toLowerCase());
        else aName = a[COLUMN];
        if (isNaN(b[COLUMN])) bName = replaceSpecialChars(b[COLUMN].toLowerCase());
        else bName = b[COLUMN];

        // console.log(aName,bName);
        if (orden == "ASC") {
            result = ((aName < bName) ? -1 : ((aName > bName) ? 1 : 0));
        } else if (orden == "DESC") {
            result = ((aName > bName) ? -1 : ((aName < bName) ? 1 : 0));
        }

        return result;
    }

    arreglo.sort(SortByName);
    return arreglo;
};
//window.oderByColumn =oderByColumn;


$(".numeric").keypress(function (e) {
    //if the letter is not digit then display error and don't type anything
    if (e.which !== 8 && e.which !== 0 && (e.which < 48 || e.which > 57)) {
        return false;
    }
});


window.format = function format(num) {
    var n = num.toString(), p = n.indexOf('.');
    return n.replace(/\d(?=(?:\d{3})+(?:\.|$))/g, function ($0, i) {
        return p < 0 || i < p ? ($0 + ',') : $0;
    });
}

window.validarDeclaracionTerminada = function validarDeclaracionTerminada(){
    let terminado=true;
    Object.keys(jsonResult.captura.declaracion.situacionPatrimonial.secciones).forEach(function (row) {
        if (jsonResult.captura.declaracion.situacionPatrimonial.secciones[row].status !="TERMINADO")   {
            terminado=false;
            return false;
        }
    });
    if (terminado){
        Object.keys(jsonResult.captura.declaracion.interes.secciones).forEach(function (row) {
            if (jsonResult.captura.declaracion.interes.secciones[row].status !="TERMINADO")   {
                terminado=false;
                return false;
            }
        }); 
    }
    if (terminado){ $("#btnTerminarDeclaracion").prop("disabled", false); }
    else{ $("#btnTerminarDeclaracion").prop("disabled", true); }
}


window.initConstanciaFiscal = function initConstanciaFiscal(data){
    var seccion = JSON.parse(atob(data));
    var seccionName = seccion.moduloName.replace("modulo","");
    var form = "#form" + seccion.moduloName.replace("modulo", "")+ " ";
    var modulo = "#" + seccion.moduloName + " ";

    switch(seccion.status){
        case "SIN_INFO":
            //asginar valores predeterminados a catálogos(ayuda al usuario).
            jsonResult.declaracion.fiscal.constanciaFiscal.constancia=true;
            $(modulo + "#constanciaFiscalSI")[0].checked=true;
            $(modulo + ".rdConstanciaFiscal").prop("disabled", false);
            $(modulo + "textarea[name='aclaracionesObservaciones']").val("");
            $(modulo + ".btnTerminar").removeClass("hide");
            $(modulo + ".btnHabilitar").addClass("hide");       
        break;
        case "EN_PROCESO":
            $(modulo + ".btnHabilitar").addClass("hide");
            $(modulo + ".btnTerminar").removeClass("hide");
            break;
        case "TERMINADO":
            if (jsonResult.declaracion.fiscal.constanciaFiscal.constancia){$(modulo + "#constanciaFiscalSI")[0].checked=true;}
            else{ $(modulo + "#constanciaFiscalNO")[0].checked=true;}                       
            $(modulo + "textarea[name='aclaracionesObservaciones']").val(jsonResult.declaracion.fiscal.constanciaFiscal.aclaracionesObservaciones).prop("disabled", true);
            $(modulo + ".rdConstanciaFiscal").prop("disabled", true);
            $(modulo + ".btnTerminar").addClass("hide");
            $(modulo + ".btnHabilitar").removeClass("hide");
        break;
    }

    $(modulo + ".btnTerminar").unbind("click");
    $(modulo + ".btnHabilitar").unbind("click");

    $(modulo + ".btnTerminar").on('click',function() {
        jsonResult.declaracion.fiscal.constanciaFiscal.aclaracionesObservaciones =  $(modulo + "textarea[name='aclaracionesObservaciones']").val().toUpperCase();
        jsonResult.declaracion.fiscal.constanciaFiscal.constancia = $(modulo + " input[type='radio'][name='rdConstanciaFiscal']:checked")[0].id == 'constanciaFiscalSI' ? true : false;
        $(modulo + "textarea[name='aclaracionesObservaciones']").prop("disabled", true);
        //inhabilitar controles del modulo.
        $(modulo + ".rdConstanciaFiscal").prop("disabled", true);
        $(modulo + ".btnTerminar").addClass("hide");
        //cambiar status.
        $(modulo + ".btnHabilitar").removeClass("hide");
        jsonResult.captura.declaracion[seccion.apartado].secciones[seccion.no].status= "TERMINADO";
        $(".status-seccion-" + seccion.apartado + "-" + seccion.no).removeClass("indicador-status indicador-status-process").addClass("indicador-status-success").text("TERMINADO");
        mensajeSwal("Aviso","Sección terminada con exito.", "success");
        validarDeclaracionTerminada();
    });
    
    $(modulo + ".btnHabilitar").on("click",function() {
        $(modulo + " input[type='radio'][name='rdConstanciaFiscal']").val(jsonResult.declaracion.fiscal.constanciaFiscal.constancia);
        $(modulo + ".rdConstanciaFiscal").prop("disabled", false);
        $(modulo + ".btnTerminar").removeClass("hide");
        $(modulo + "textarea[name='aclaracionesObservaciones']").prop("disabled", false);
        $(modulo + ".btnHabilitar").addClass("hide");

        jsonResult.captura.declaracion[seccion.apartado].secciones[seccion.no].status= "EN_PROCESO";
        $(".status-seccion-" + seccion.apartado + "-" + seccion.no).removeClass("indicador-status indicador-status-success").addClass("indicador-status-process").text("EN PROCESO");
        validarDeclaracionTerminada();
    });
    
    $(".content_seccion").addClass("hide");
    $("#" + seccion.moduloName).removeClass("hide");
    $(modulo + ".formPrincipal").removeClass("hide").addClass("animated fadeOut");

}