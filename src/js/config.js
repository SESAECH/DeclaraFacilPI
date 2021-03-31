//alertar del cerrado, y forzar mayusculas
$(document).ready(function() {

                console.log( "ready!" );
                $("#contentSelectTipoDeclaracion").removeClass("hide");
                window.onbeforeunload = function () {
                    return 'Are you really want to perform the action?';
                }
                $("input[type=text]").keyup(function () {  
                    $(this).val($(this).val().toUpperCase());  
                });
            });


//configuración de sistema.
document.title = "DeclaraFácil | Gobierno del Estado de Chiapas";
$(".sistemaTitulo").html("DeclaraFácil PI | <small>Versión Portable</small>");
$(".sistemaPiePagina1").text("Secretaría Ejecutiva del Sistema Anticorrupción del Estado de Chiapas");

$("#sidebarMenu").addClass("hide");
$("#contentMain").removeClass("col-md-9 col-lg-9").addClass("col-12");

//------------------------------------------------------------------------------------------//
//varibles globales.
//arreglo con valores de la captura del usuario.
/* window.captura ={
    "tipo_declaracion":"",
    "formato":"",
    "status_gral":"",
    "declaracion":[]
}; */
//------------------------------------------------------------------------------------------//
//seleccionar el tipo y formato de declaración que se va a capturar.
//button seleccionar tipo de declaración
$('.btnSelectTipoDeclaracion').on('click',function() {
    jsonResult.captura.tipo_declaracion = this.dataset.tipo;
    $("#contentSelectFormatoDeclaracion").removeClass("hide");
});

//button seleccionar formato de declaración.
$('.btnSelectFormatoDeclaracion').on('click',function() {
    var htmlSecciones = "";

    $("#sidebarMenu").removeClass("hide");
    $("#contentMain").removeClass("col-12").addClass("col-md-9 col-lg-9");

    //variables globales de captura.
    jsonResult.captura.formato = this.dataset.formato;
    
    jsonResult.captura.declaracion =  declaraciones[jsonResult.captura.formato.toLowerCase()];    
    jsonResult.captura.status_gral = "EN_PROCESO";

    //configurar jsonResult.
    if (jsonResult.captura.formato =="COMPLETA"){
        if (jsonResult.captura.tipo_declaracion=="MODIFICACION"){
            delete jsonResult.declaracion.situacionPatrimonial.actividadAnualAnterior;
        }
    }
    else{
        delete jsonResult.declaracion.interes;
        delete jsonResult.declaracion.situacionPatrimonial.vehiculos;
        delete jsonResult.declaracion.situacionPatrimonial.prestamoOComodato;
        delete jsonResult.declaracion.situacionPatrimonial.inversiones;
        delete jsonResult.declaracion.situacionPatrimonial.datosPareja;
        delete jsonResult.declaracion.situacionPatrimonial.datosDependienteEconomico;
        delete jsonResult.declaracion.situacionPatrimonial.bienesInmuebles;
        delete jsonResult.declaracion.situacionPatrimonial.bienesMuebles;
        delete jsonResult.declaracion.situacionPatrimonial.adeudos;
        if (jsonResult.captura.tipo_declaracion=="MODIFICACION"){
            delete jsonResult.declaracion.situacionPatrimonial.actividadAnualAnterior;
        }
    }
    //variables de apoyo en json.
    jsonResult.declaracion.situacionPatrimonial.domicilioDeclarante.domicilio="MX";
    jsonResult.declaracion.situacionPatrimonial.datosEmpleoCargoComision.domicilio="MX";

    //titulo del formulario de captura.
    $(".titulo-declaracion-captura").text("DECLARACIÓN " + jsonResult.captura.tipo_declaracion + " | " + jsonResult.captura.formato);

    //pintar secciones.
    htmlSecciones+='<h6 class="text-muted p10">Situación Patrimonial</h6>';
    $.each(jsonResult.captura.declaracion.situacionPatrimonial.secciones, function(index, item){
        htmlSecciones+='<li class="nav-item">\
                            <a class="nav-link lnk' + item.moduloName + '" href="javascript:void(0);" onclick="iniciarModulo(\'' + btoa(JSON.stringify(item)) + '\');">\
                                <span class="indicador">' + item.no + '</span>\
                                <span>' + item.titulo + '</span>\
                                <span class="indicador-status status-seccion-'+ item.apartado + '-' + item.no +' float-right">PENDIENTE</span>\
                            </a>\
                        </li>';                          
    });
    if (Object.keys(jsonResult.captura.declaracion.interes.secciones).length > 0){
        htmlSecciones+='<h6 class="text-muted p10">Intereses</h6>';
        $.each(jsonResult.captura.declaracion.interes.secciones, function(index, item){
            htmlSecciones+='<li class="nav-item">\
                            <a class="nav-link lnk' + item.moduloName + '" href="javascript:void(0);" onclick="iniciarModulo(\'' + btoa(JSON.stringify(item)) + '\');">\
                                <span class="indicador">' + item.no + '</span>\
                                <span>' + item.titulo + '</span>\
                                <span class="indicador-status status-seccion-'+ item.apartado + '-' + item.no +' float-right">PENDIENTE</span>\
                            </a>\
                        </li>';
        });
    }

    $("#menuSecciones").empty().append(htmlSecciones);  
    //ocultar/mostrar controles base.
    $("#contentSelectTipoDeclaracion").addClass("hide");
    $("#contentHeaderDeclaracion").removeClass("hide");

    $("#btnGuardarAvance").removeClass("hide");
    $("#btnTerminarDeclaracion").removeClass("hide");
    $("#modalIniciar").modal("show");
}); 

document.getElementById('inputfile')
            .addEventListener('change', function() {
              
            var fr=new FileReader();
            fr.onload=function(){
                cargarFileDeclaracion(fr.result);
                document.getElementById('output')
                        .textContent=fr.result;
            }
              
            fr.readAsText(this.files[0]);
        });

window.regresarAlInicio = function regresarAlInicio(){
    jsonResult.captura.tipo_declaracion = "";    
    jsonResult.captura.formato = "";
    jsonResult.captura.declaracion =  [];
    jsonResult.captura.status_gral = "";
    $("#sidebarMenu").addClass("hide");
    $("#contentMain").removeClass("col-md-9 col-lg-9").addClass("col-12");
        
    $("#contentSelectTipoDeclaracion").removeClass("hide");
    $("#contentHeaderDeclaracion").addClass("hide");

    $("#btnGuardarAvance").addClass("hide");
    $("#btnTerminarDeclaracion").addClass("hide");
    $("#modalIniciar").modal("hide");

    $(".btnSelectTipoDeclaracion").removeClass("active");
    $(".btnSelectFormatoDeclaracion").removeClass("active");     
    
    //ocultar content de captura.
    $(".content_seccion").addClass("hide");
    $("#contentCapturaDeclaracion, #contentSelectFormatoDeclaracion").addClass("hide"); 
};


//------------------------------------------------------------------------------------------//
//secciones de declaraciones.
window.declaraciones={
    "completa":{
        "situacionPatrimonial":{
            "secciones":{
                "1":{"no":1,"titulo":"Datos generales", "moduloName":"moduloDatosGenerales", "status":"SIN_INFO",       "apartado": "situacionPatrimonial", "seccion": "", "help": "ayuda de moduloDatosGenerales" },
                "2":{"no":2,"titulo":"Domicilio del Declarante", "moduloName":"moduloDomicilio", "status":"SIN_INFO",   "apartado": "situacionPatrimonial", "seccion": "", "help": "ayuda de moduloDomicilio" },
                "3":{"no":3,"titulo":"Datos curriculares del Declarante", "moduloName":"moduloCV", "status":"SIN_INFO", "apartado": "situacionPatrimonial", "seccion": "", "help": "ayuda de moduloCV"},
                "4":{"no":4,"titulo":"Datos del empleo, cargo o comisión", "moduloName":"moduloEmpleoCargoComision", "status":"SIN_INFO", "apartado": "situacionPatrimonial", "seccion": "", "help": "ayuda de moduloEmpleoCargoComision"},
                "5":{"no":5,"titulo":"Experiencia laboral", "moduloName":"moduloExperienciaLaboral", "status":"SIN_INFO",   "apartado": "situacionPatrimonial", "seccion": "", "help": "ayuda de moduloExperienciaLaboral"},
                "6":{"no":6,"titulo":"Datos de la Pareja", "moduloName":"moduloPareja", "status":"SIN_INFO",                "apartado": "situacionPatrimonial", "seccion": "", "help": "ayuda de moduloPareja"},
                "7":{"no":7,"titulo":"Datos del dependiente económico", "moduloName":"moduloDependientesEconomicos", "status":"SIN_INFO", "apartado": "situacionPatrimonial", "seccion": "", "help": "ayuda de moduloDependientesEconomicos"},
                "8":{"no":8,"titulo":"Ingresos netos del Declarante, Pareja y/o dependientes económicos", "moduloName":"moduloIngresos", "status":"SIN_INFO", "apartado": "situacionPatrimonial", "seccion": "", "help": "ayuda de moduloIngresos"},
                "9":{"no":9,"titulo":"¿Te desempeñaste como servidor público el año inmediato anterior?", "moduloName":"moduloDesempenoServidorPublico", "status":"SIN_INFO", "apartado": "situacionPatrimonial", "seccion": "", "help": "ayuda de moduloDesempenoServidorPublico"},
                "10":{"no":10,"titulo":"Bienes inmuebles", "moduloName":"moduloBienesInmuebles", "status":"SIN_INFO", "apartado": "situacionPatrimonial", "seccion": "", "help": "ayuda de moduloBienesInmuebles"},
                "11":{"no":11,"titulo":"Vehículos.", "moduloName":"moduloVehiculos", "status":"SIN_INFO", "apartado": "situacionPatrimonial", "seccion": "", "help": "ayuda de moduloVehiculos"},
                "12":{"no":12,"titulo":"Bienes muebles", "moduloName":"moduloBienesMuebles", "status":"SIN_INFO", "apartado": "situacionPatrimonial", "seccion": "", "help": "ayuda de moduloBienesMuebles"},
                "13":{"no":13,"titulo":"Inversiones, cuentas bancarias y otro tipo de valores/activos.", "moduloName":"moduloInversiones", "status":"SIN_INFO", "apartado": "situacionPatrimonial", "seccion": "", "help": "ayuda de moduloInversiones"},
                "14":{"no":14,"titulo":"Adeudos/pasivos", "moduloName":"moduloAdeudos", "status":"SIN_INFO", "apartado": "situacionPatrimonial", "seccion": "", "help": "ayuda de moduloAdeudos"},
                "15":{"no":15,"titulo":"Préstamo o comodato por terceros", "moduloName":"moduloPrestamos", "status":"SIN_INFO", "apartado": "situacionPatrimonial", "seccion": "", "help": "ayuda de moduloPrestamos"}
            }
        },
        "interes":{
            "secciones":{
                "1":{"no":1,"titulo":"Participación en empresas, sociedades o asociaciones.", "moduloName":"moduloParticipacionEmpresas", "status":"SIN_INFO", "apartado": "interes", "seccion": "", "help": "ayuda de moduloParticipacionEmpresas"},
                "2":{"no":2,"titulo":"¿Participa en alguna de estas instituciones?", "moduloName":"moduloParticipacionInstituciones", "status":"SIN_INFO", "apartado": "interes", "seccion": "", "help": "ayuda de moduloParticipacionInstituciones"},
                "3":{"no":3,"titulo":"Apoyos o beneficios públicos.", "moduloName":"moduloApoyosPublicos", "status":"SIN_INFO", "apartado": "interes", "seccion": "", "help": "ayuda de moduloApoyosPublicos"},
                "4":{"no":4,"titulo":"Representación.", "moduloName":"moduloRepresentacion", "status":"SIN_INFO", "apartado": "interes", "seccion": "", "help": "ayuda de moduloRepresentacion"},
                "5":{"no":5,"titulo":"Clientes principales", "moduloName":"moduloClientesPrincipales", "status":"SIN_INFO", "apartado": "interes", "seccion": "", "help": "ayuda de moduloClientesPrincipales"},
                "6":{"no":6,"titulo":"Beneficios privados", "moduloName":"moduloBeneficiosPrivados", "status":"SIN_INFO", "apartado": "interes", "seccion": "", "help": "ayuda de moduloBeneficiosPrivados"},
                "7":{"no":7,"titulo":"Fideicomisos", "moduloName":"moduloFideicomisos", "status":"SIN_INFO", "apartado": "interes", "seccion": "", "help": "ayuda de moduloFideicomisos"}
            }
        }
    },
    "simplificada":{
        "situacionPatrimonial":{
            "secciones":{
                "1":{"no":1,"titulo":"Datos generales", "moduloName":"moduloDatosGenerales", "status":"SIN_INFO", "apartado": "situacionPatrimonial", "seccion": "datosGenerales", "help": "ayuda de moduloDatosGenerales" },
                "2":{"no":2,"titulo":"Domicilio del Declarante", "moduloName":"moduloDomicilio", "status":"SIN_INFO" , "apartado": "situacionPatrimonial", "seccion": "domicilioDeclarante", "help": "ayuda de moduloDomicilio"},
                "3":{"no":3,"titulo":"Datos curriculares del Declarante", "moduloName":"moduloCV", "status":"SIN_INFO" , "apartado": "situacionPatrimonial", "seccion": "datosCurricularesDeclarante", "help": "ayuda de moduloCV"},
                "4":{"no":4,"titulo":"Datos del empleo, cargo o comisión", "moduloName":"moduloEmpleoCargoComision", "status":"SIN_INFO" , "apartado": "situacionPatrimonial", "seccion": "datosEmpleoCargoComision", "help": "ayuda de moduloEmpleoCargoComision"},
                "5":{"no":5,"titulo":"Experiencia laboral", "moduloName":"moduloExperienciaLaboral", "status":"SIN_INFO", "apartado": "situacionPatrimonial", "seccion": "experienciaLaboral", "help": "ayuda de moduloExperienciaLaboral" },
                "6":{"no":6,"titulo":"Ingresos netos del Declarante", "moduloName":"moduloIngresos", "status":"SIN_INFO", "apartado": "situacionPatrimonial", "seccion": "ingresos", "help": "* CAPTURAR CANTIDADES LIBRES DE IMPUESTOS, SIN COMAS, SIN PUNTOS, SIN CENTAVOS Y SIN CEROS A LA IZQUIERDA."},
                "7":{"no":7,"titulo":"¿Te desempeñaste como servidor público el año inmediato anterior?", "moduloName":"moduloDesempenoServidorPublico", "status":"SIN_INFO", "apartado": "situacionPatrimonial", "seccion": "actividadAnualAnterior", "help": "ayuda de moduloDesempenoServidorPublico"},
            }
        },
        "interes":{
            "secciones":{}
        }
    }
};