//configuración de sistema.
document.title = "DeclaraFácil | Gobierno del Estado de Chiapas";
$(".sistemaTitulo").html("DeclaraFácil PI | <small>Versión Portable</small>");
$(".sistemaPiePagina1").text("Secretaría Ejecutiva del Sistema Anticorrupción del Estado de Chiapas");

//------------------------------------------------------------------------------------------//
//varibles globales.
//arreglo con valores de la captura del usuario.
var captura={
    "tipo_declaracion":"",
    "formato":"",
    "status_gral":"",
    "declaracion":[]
};
window.captura = captura;
//------------------------------------------------------------------------------------------//
//seleccionar el tipo y formato de declaración que se va a capturar.
//button seleccionar tipo de declaración
$('.btnSelectTipoDeclaracion').on('click',function() {
    captura.tipo_declaracion = this.dataset.tipo;
    captura.status_gral = "EN_PROCESO";
    $("#contentSelectFormatoDeclaracion").removeClass("hide");
});

//button seleccionar formato de declaración.
$('.btnSelectFormatoDeclaracion').on('click',function() {
    var htmlSecciones = "";

    //variables globales de captura.
    captura.formato = this.dataset.formato;
    captura.declaracion =  declaraciones[captura.formato.toLowerCase()];

    //titulo del formulario de captura.
    $(".titulo-declaracion-captura").text("DECLARACIÓN " + captura.tipo_declaracion + " | " + captura.formato);

    //pintar secciones.
    htmlSecciones+='<h6 class="text-muted p10">Situación Patrimonial</h6>';
    $.each(captura.declaracion.situacion_patrimonial.secciones, function(index, item){
        htmlSecciones+='<li class="nav-item">\
                            <a class="nav-link" href="javascript:void(0);" onclick="iniciarModulo(\'' + btoa(JSON.stringify(item)) + '\');">\
                                <span class="indicador">' + item.no + '</span>\
                                <span>' + item.titulo + '</span>\
                                <span class="indicador-status status-seccion-patrimonial-' + item.no +' float-right">PENDIENTE</span>\
                            </a>\
                        </li>';                          
    });
    if (Object.keys(captura.declaracion.interes.secciones).length > 0){
        htmlSecciones+='<h6 class="text-muted p10">Intereses</h6>';
        $.each(captura.declaracion.interes.secciones, function(index, item){
            htmlSecciones+='<li class="nav-item">\
                            <a class="nav-link" href="javascript:void(0);" onclick="iniciarModulo(\'' + btoa(JSON.stringify(item)) + '\');">\
                                <span class="indicador">' + item.no + '</span>\
                                <span>' + item.titulo + '</span>\
                                <span class="indicador-status status-seccion-intereses-' + item.no +' float-right">PENDIENTE</span>\
                            </a>\
                        </li>';
        });
    }

    $("#menuSecciones").empty().append(htmlSecciones);  
    //ocultar/mostrar controles base.
    $("#contentSelectTipoDeclaracion").empty().addClass("hide");
    $("#contentHeaderDeclaracion").removeClass("hide");

    $("#btnGuardarAvance").removeClass("hide");
    $("#btnTerminarDeclaracion").removeClass("hide");
}); 

//------------------------------------------------------------------------------------------//
//secciones de declaraciones.
var declaraciones={
    "completa":{
        "situacion_patrimonial":{
            "secciones":{
                "1":{"no":1,"titulo":"Datos generales", "moduloName":"moduloDatosGenerales", "status":"SIN_INFO", "apartado": "situacion_patrimonial" },
                "2":{"no":2,"titulo":"Domicilio del Declarante", "moduloName":"moduloDomicilio", "status":"SIN_INFO", "apartado": "situacion_patrimonial"},
                "3":{"no":3,"titulo":"Datos curriculares del Declarante", "moduloName":"moduloCV", "status":"SIN_INFO", "apartado": "situacion_patrimonial"},
                "4":{"no":4,"titulo":"Datos del empleo, cargo o comisión", "moduloName":"moduloEmpleoCargoComision", "status":"SIN_INFO", "apartado": "situacion_patrimonial"},
                "5":{"no":5,"titulo":"Experiencia laboral", "moduloName":"moduloExperienciaLaboral", "status":"SIN_INFO", "apartado": "situacion_patrimonial"},
                "6":{"no":6,"titulo":"Datos de la Pareja", "moduloName":"moduloPareja", "status":"SIN_INFO", "apartado": "situacion_patrimonial"},
                "7":{"no":7,"titulo":"Datos del dependiente económico", "moduloName":"moduloDependientesEconomicos", "status":"SIN_INFO", "apartado": "situacion_patrimonial"},
                "8":{"no":8,"titulo":"Ingresos netos del Declarante, Pareja y/o dependientes económicos", "moduloName":"moduloIngresos", "status":"SIN_INFO", "apartado": "situacion_patrimonial"},
                "9":{"no":9,"titulo":"¿Te desempeñaste como servidor público el año inmediato anterior?", "moduloName":"moduloDesempenoServidorPublico", "status":"SIN_INFO", "apartado": "situacion_patrimonial"},
                "10":{"no":10,"titulo":"Bienes inmuebles", "moduloName":"moduloBienesInmuebles", "status":"SIN_INFO", "apartado": "situacion_patrimonial"},
                "11":{"no":11,"titulo":"Vehículos.", "moduloName":"moduloVehiculos", "status":"SIN_INFO", "apartado": "situacion_patrimonial"},
                "12":{"no":12,"titulo":"Bienes muebles", "moduloName":"moduloBienesMuebles", "status":"SIN_INFO", "apartado": "situacion_patrimonial"},
                "13":{"no":13,"titulo":"Inversiones, cuentas bancarias y otro tipo de valores/activos.", "moduloName":"moduloInversiones", "status":"SIN_INFO", "apartado": "situacion_patrimonial"},
                "14":{"no":14,"titulo":"Adeudos/pasivos", "moduloName":"moduloAdeudos", "status":"SIN_INFO", "apartado": "situacion_patrimonial"},
                "15":{"no":15,"titulo":"Préstamo o comodato por terceros", "moduloName":"moduloPrestamos", "status":"SIN_INFO", "apartado": "situacion_patrimonial"}
            }
        },
        "interes":{
            "secciones":{
                "1":{"no":1,"titulo":"Participación en empresas, sociedades o asociaciones.", "moduloName":"moduloParticipacionEmpresas", "status":"SIN_INFO", "apartado": "interes"},
                "2":{"no":2,"titulo":"¿Participa en alguna de estas instituciones?", "moduloName":"moduloParticipacionInstituciones", "status":"SIN_INFO", "apartado": "interes"},
                "3":{"no":3,"titulo":"Apoyos o beneficios públicos.", "moduloName":"moduloApoyosPublicos", "status":"SIN_INFO", "apartado": "interes"},
                "4":{"no":4,"titulo":"Representación.", "moduloName":"moduloRepresentacion", "status":"SIN_INFO", "apartado": "interes"},
                "5":{"no":5,"titulo":"Clientes principales", "moduloName":"moduloClientesPrincipales", "status":"SIN_INFO", "apartado": "interes"},
                "6":{"no":6,"titulo":"Beneficios privados", "moduloName":"moduloBeneficiosPrivados", "status":"SIN_INFO", "apartado": "interes"},
                "7":{"no":7,"titulo":"Fideicomisos", "moduloName":"moduloFideicomisos", "status":"SIN_INFO", "apartado": "interes"}
            }
        }
    },
    "simplificada":{
        "situacion_patrimonial":{
            "secciones":{
                "1":{"no":1,"titulo":"Datos generales", "moduloName":"moduloDatosGenerales", "status":"SIN_INFO", "apartado": "situacion_patrimonial" },
                "2":{"no":2,"titulo":"Domicilio del Declarante", "moduloName":"moduloDomicilio", "status":"SIN_INFO" , "apartado": "situacion_patrimonial"},
                "3":{"no":3,"titulo":"Datos curriculares del Declarante", "moduloName":"moduloCV", "status":"SIN_INFO" , "apartado": "situacion_patrimonial"},
                "4":{"no":4,"titulo":"Datos del empleo, cargo o comisión", "moduloName":"moduloEmpleoCargoComision", "status":"SIN_INFO" , "apartado": "situacion_patrimonial"},
                "5":{"no":5,"titulo":"Experiencia laboral", "moduloName":"moduloExperienciaLaboral", "status":"SIN_INFO", "apartado": "situacion_patrimonial" },
                "6":{"no":6,"titulo":"Ingresos netos del Declarante", "moduloName":"moduloIngresosDecSimplificada", "status":"SIN_INFO", "apartado": "situacion_patrimonial"},
                "7":{"no":7,"titulo":"¿Te desempeñaste como servidor público el año inmediato anterior?", "moduloName":"moduloDesempenoServidorPublico", "status":"SIN_INFO", "apartado": "situacion_patrimonial"},
            }
        },
        "interes":{
            "secciones":{}
        }
    }
};

window.declaraciones=declaraciones;
