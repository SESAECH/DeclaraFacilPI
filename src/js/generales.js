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
                                $(".chkNinguno")[0].checked=false;
                                $(btnAgregar).removeClass("hide");
                                $(tabla).removeClass("hide");
                                $(btnTerminar).removeClass("hide");
                            }
                    });
                }
                else{
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
    $.each(municipios, function (index, item) {
        if (item.cve_agee === filtro){
            $(obj).append('<option value="' + item.cve_agem + '">' + item.nom_agem + '</option>');
        }                        
    });
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
        //display error message
        //show_alert("#msg_numeric", "warning", "<p>Solo Numer</p>");

        //$("#msg_pago").html("Digits Only").show().fadeOut("slow");
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