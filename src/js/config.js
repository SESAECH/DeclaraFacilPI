
$(document).ready(function() {
    console.log( "ready! dom cargado..." );
    $("#contentSelectTipoDeclaracion").removeClass("hide");  
    window.onbeforeunload = function() { return "Si sale ahora, perderá la información capturada, ¿Realmente desea salir?"; }
});

//configuración de sistema.
document.title = "DeclaraFácil PI v"+VERSION+"  | SESAECH";
$(".sistemaTitulo").html('<div width="200" ><a href="#" class="nav-link p-0 text-white" id="BtnAvisoPrivacidad">Aviso de Privacidad </a> <a href="#" class="nav-link p-0 text-white" id="BtnAcercade" >Acerca de... | V ' + VERSION + ' &nbsp;</a> </div>' );

$("#BtnAvisoPrivacidad"). on('click', function() {$("#modalAvisoPrivacidad").modal("show");})     

$("#BtnAcercade"). on('click', function() {$("#modalAcercade").modal("show");})   

$(".sistemaPiePagina1").text("Secretaría Ejecutiva del Sistema Anticorrupción del Estado de Chiapas");

$("#sidebarMenu").addClass("hide");
$("#contentMain").removeClass("col-md-9 col-lg-9").addClass("col-12");

jQuery.extend(jQuery.validator.messages, {
  required: "Campo Obligatorio.",
  max: jQuery.validator.format("Por favor, escribe un valor menor o igual a {0}."),
  min: jQuery.validator.format("Por favor, escribe un valor mayor o igual a {0}."),
  minlength: "El mínimo de caracteres es de {0}."
});

$("#contentSelectTipoDeclaracion").removeClass("hide");
$("input[type=text]").keyup(function () {  
        $(this).val($(this).val().toUpperCase());  
        console.log ('mayusculizado');
    });

//------------------------------------------------------------------------------------------//
//varibles globales.
//arreglo con valores de la captura del usuario.
/* var captura={
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
    if (jsonResult.captura.tipo_declaracion =="INTERESES"){ 
      //$(".btnSimplificada").addClass("hide");
      let htmlSecciones = "";

      $("#sidebarMenu").removeClass("hide");
      $("#contentMain").removeClass("col-12").addClass("col-md-9 col-lg-9");
  
      jsonResult.captura.formato = "COMPLETA";
      //jsonResult.captura.formato="";
      jsonResult.captura.declaracion =  declaraciones[jsonResult.captura.formato.toLowerCase()];    
      jsonResult.captura.status_gral = "EN_PROCESO";

      [2,3,4,5,6,7,8,9,10,11,12,13,14,15].forEach(e => delete delete jsonResult.captura.declaracion.situacionPatrimonial.secciones[e]);
      delete jsonResult.captura.declaracion.fiscal;


      jsonResult.captura.declaracion.situacionPatrimonial.secciones["2"] = {};
      jsonResult.captura.declaracion.situacionPatrimonial.secciones["2"].no = 2;
      jsonResult.captura.declaracion.situacionPatrimonial.secciones["2"].titulo       = "Datos del empleo, cargo o comisión";
      jsonResult.captura.declaracion.situacionPatrimonial.secciones["2"].moduloName   = "moduloEmpleoCargoComision";
      jsonResult.captura.declaracion.situacionPatrimonial.secciones["2"].status       = "SIN_INFO";
      jsonResult.captura.declaracion.situacionPatrimonial.secciones["2"].apartado     = "situacionPatrimonial"; 
      jsonResult.captura.declaracion.situacionPatrimonial.secciones["2"].seccion      = "datosEmpleoCargoComision"; 
      jsonResult.captura.declaracion.situacionPatrimonial.secciones["2"].help         = "Deberá reportar el empleo, cargo o comisión actual.";

      delete jsonResult.declaracion.situacionPatrimonial.datosCurricularesDeclarante;
      delete jsonResult.declaracion.situacionPatrimonial.experienciaLaboral;
      delete jsonResult.declaracion.situacionPatrimonial.actividadAnualAnterior;
      delete jsonResult.declaracion.situacionPatrimonial.ingresos;

      delete jsonResult.declaracion.situacionPatrimonial.vehiculos;
      delete jsonResult.declaracion.situacionPatrimonial.prestamoOComodato;
      delete jsonResult.declaracion.situacionPatrimonial.inversiones;
      delete jsonResult.declaracion.situacionPatrimonial.datosPareja;
      delete jsonResult.declaracion.situacionPatrimonial.datosDependienteEconomico;
      delete jsonResult.declaracion.situacionPatrimonial.bienesInmuebles;
      delete jsonResult.declaracion.situacionPatrimonial.bienesMuebles;
      delete jsonResult.declaracion.situacionPatrimonial.adeudos; 

      delete jsonResult.declaracion.fiscal;

      //variables de apoyo en json.
      jsonResult.declaracion.situacionPatrimonial.domicilioDeclarante.domicilio="MX";
      jsonResult.declaracion.situacionPatrimonial.datosEmpleoCargoComision.domicilio="MX";

      //titulo del formulario de captura.
      $(".titulo-declaracion-captura").text("DECLARACIÓN " + jsonResult.captura.tipo_declaracion );

      //pintar secciones.
      htmlSecciones+='<h6 class="text-muted p10">Situación Patrimonial</h6>';
      $.each(jsonResult.captura.declaracion.situacionPatrimonial.secciones, function(index, item){
          if(item.no !=9){
            htmlSecciones+='<li class="nav-item">\
                              <a class="nav-link lnk' + item.moduloName + '" href="javascript:void(0);" onclick="iniciarModulo(\'' + btoa(JSON.stringify(item)) + '\');">\
                                  <span class="indicador">' + item.no + '</span>\
                                  <span>' + item.titulo + '</span>\
                                  <span class="indicador-status status-seccion-'+ item.apartado + '-' + item.no +' float-right">PENDIENTE</span>\
                              </a>\
                          </li>';  
          }
          else{
            if (jsonResult.captura.formato =="COMPLETA"){
              if (jsonResult.captura.tipo_declaracion=="MODIFICACION"){
                htmlSecciones+='<li class="nav-item">\
                                  <label class="nav-link lnk' + item.moduloName + '">\
                                      <span class="indicador">' + item.no + '</span>\
                                      <span>' + item.titulo + '</span>\
                                      <span class="indicador-status-success float-right">NO APLICA</span>\
                                  </label>\
                              </li>';              
              }
              else{
                htmlSecciones+='<li class="nav-item">\
                                  <a class="nav-link lnk' + item.moduloName + '" href="javascript:void(0);" onclick="iniciarModulo(\'' + btoa(JSON.stringify(item)) + '\');">\
                                      <span class="indicador">' + item.no + '</span>\
                                      <span>' + item.titulo + '</span>\
                                      <span class="indicador-status status-seccion-'+ item.apartado + '-' + item.no +' float-right">PENDIENTE</span>\
                                  </a>\
                              </li>';
              }
            }
          }
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
      }/*
      if (Object.keys(jsonResult.captura.declaracion.fiscal.secciones).length > 0){
        htmlSecciones+='<h6 class="text-muted p10">Presentaci&oacute;n de Declaraci&oacute;n Fiscal</h6>';
        $.each(jsonResult.captura.declaracion.fiscal.secciones, function(index, item){
            htmlSecciones+='<li class="nav-item">\
                            <a class="nav-link lnk' + item.moduloName + '" href="javascript:void(0);" onclick="iniciarModulo(\'' + btoa(JSON.stringify(item)) + '\');">\
                                <span class="indicador">' + item.no + '</span>\
                                <span>' + item.titulo + '</span>\
                                <span class="indicador-status status-seccion-'+ item.apartado + '-' + item.no +' float-right">PENDIENTE</span>\
                            </a>\
                        </li>';
        });
      }*/

      
      $("#menuSecciones").empty().append(htmlSecciones);  
      //ocultar/mostrar controles base.
      $("#contentSelectTipoDeclaracion").addClass("hide");
      $("#contentHeaderDeclaracion").removeClass("hide");

      $("#btnGuardarAvance").removeClass("hide");
      $("#btnTerminarDeclaracion").removeClass("hide");
      $("#modalIniciar").modal("show");
      
    }
    else{ $(".btnSimplificada").removeClass("hide");}
    $("#contentSelectFormatoDeclaracion").removeClass("hide");
});

//button seleccionar formato de declaración.
$('.btnSelectFormatoDeclaracion').on('click',function() {
    var htmlSecciones = "";

    $("#sidebarMenu").removeClass("hide");
    $("#contentMain").removeClass("col-12").addClass("col-md-9 col-lg-9");

    //variables globales de captura.
    //jsonResult = jsonResultResp;
    jsonResult.captura.formato = this.dataset.formato;
    
    jsonResult.captura.declaracion =  declaraciones[jsonResult.captura.formato.toLowerCase()];    
    jsonResult.captura.status_gral = "EN_PROCESO";

    if (jsonResult.captura.tipo_declaracion =="INTERESES"){
      [2,3,4,5,6,7,8,9,10,11,12,13,14,15].forEach(e => delete delete jsonResult.captura.declaracion.situacionPatrimonial.secciones[e]);

      jsonResult.captura.declaracion.situacionPatrimonial.secciones["2"] = {};
      jsonResult.captura.declaracion.situacionPatrimonial.secciones["2"].no = 2;
      jsonResult.captura.declaracion.situacionPatrimonial.secciones["2"].titulo       = "Datos del empleo, cargo o comisión";
      jsonResult.captura.declaracion.situacionPatrimonial.secciones["2"].moduloName   = "moduloEmpleoCargoComision";
      jsonResult.captura.declaracion.situacionPatrimonial.secciones["2"].status       = "SIN_INFO";
      jsonResult.captura.declaracion.situacionPatrimonial.secciones["2"].apartado     = "situacionPatrimonial"; 
      jsonResult.captura.declaracion.situacionPatrimonial.secciones["2"].seccion      = "datosEmpleoCargoComision"; 
      jsonResult.captura.declaracion.situacionPatrimonial.secciones["2"].help         = "Deberá reportar el empleo, cargo o comisión actual.";
     // jsonResult.captura.declaracion.situacionPatrimonial.secciones["2"].tipoOperacion = "SIN_CAMBIOS";
        delete jsonResult.declaracion.situacionPatrimonial.datosCurricularesDeclarante;
        delete jsonResult.declaracion.situacionPatrimonial.experienciaLaboral;
        delete jsonResult.declaracion.situacionPatrimonial.actividadAnualAnterior;
        delete jsonResult.declaracion.situacionPatrimonial.ingresos;

        delete jsonResult.declaracion.situacionPatrimonial.vehiculos;
        delete jsonResult.declaracion.situacionPatrimonial.prestamoOComodato;
        delete jsonResult.declaracion.situacionPatrimonial.inversiones;
        delete jsonResult.declaracion.situacionPatrimonial.datosPareja;
        delete jsonResult.declaracion.situacionPatrimonial.datosDependienteEconomico;
        delete jsonResult.declaracion.situacionPatrimonial.bienesInmuebles;
        delete jsonResult.declaracion.situacionPatrimonial.bienesMuebles;
        delete jsonResult.declaracion.situacionPatrimonial.adeudos;
    }
    else{
      //configurar jsonResult.
      if (jsonResult.captura.formato =="SIMPLIFICADA"){
          delete jsonResult.declaracion.interes;
          delete jsonResult.declaracion.situacionPatrimonial.vehiculos;
          delete jsonResult.declaracion.situacionPatrimonial.prestamoOComodato;
          delete jsonResult.declaracion.situacionPatrimonial.inversiones;
          delete jsonResult.declaracion.situacionPatrimonial.datosPareja;
          delete jsonResult.declaracion.situacionPatrimonial.datosDependienteEconomico;
          delete jsonResult.declaracion.situacionPatrimonial.bienesInmuebles;
          delete jsonResult.declaracion.situacionPatrimonial.bienesMuebles;
          delete jsonResult.declaracion.situacionPatrimonial.adeudos;

          switch(jsonResult.captura.tipo_declaracion){
              case "INICIAL":
                  if (!jsonResult.captura.declaracion.situacionPatrimonial.secciones["7"]){
                      jsonResult.captura.declaracion.situacionPatrimonial.secciones["7"] = {};
                      jsonResult.captura.declaracion.situacionPatrimonial.secciones["7"].no = 7;
                      jsonResult.captura.declaracion.situacionPatrimonial.secciones["7"].titulo       = "¿Te desempeñaste como servidor público el año inmediato anterior?";
                      jsonResult.captura.declaracion.situacionPatrimonial.secciones["7"].moduloName   = "moduloDesempenoServidorPublico";
                      jsonResult.captura.declaracion.situacionPatrimonial.secciones["7"].status       = "SIN_INFO";
                      jsonResult.captura.declaracion.situacionPatrimonial.secciones["7"].apartado     = "situacionPatrimonial"; 
                      jsonResult.captura.declaracion.situacionPatrimonial.secciones["7"].seccion      = "actividadAnualAnterior"; 
                      jsonResult.captura.declaracion.situacionPatrimonial.secciones["7"].help         = "ayuda de moduloDesempenoServidorPublico";
                  }
                  jsonResult.declaracion.situacionPatrimonial.ingresos={
                      "remuneracionMensualCargoPublico": {
                        "valor": 0,
                        "moneda": "MXN"
                      },
                      "otrosIngresosMensualesTotal": {
                        "valor": 0,
                        "moneda": "MXN"
                      },
                      "actividadIndustialComercialEmpresarial": {
                        "remuneracionTotal": {
                          "valor": 0,
                          "moneda": "MXN"
                        },
                        "actividades": {}
                      },
                      "actividadFinanciera": {
                        "remuneracionTotal": {
                          "valor": 0,
                          "moneda": "MXN"
                        },
                        "actividades": {}
                      },
                      "serviciosProfesionales": {
                        "remuneracionTotal": {
                          "valor": 0,
                          "moneda": "MXN"
                        },
                        "servicios": {}
                      },
                      "otrosIngresos": {
                        "remuneracionTotal": {
                          "valor": 0,
                          "moneda": "MXN"
                        },
                        "ingresos": {}
                      },
                      "ingresoMensualNetoDeclarante": {
                        "valor": 0,
                        "moneda": "MXN"
                      },
                      "ingresoMensualNetoParejaDependiente": {
                        "valor": 0,
                        "moneda": "MXN"
                      },
                      "totalIngresosMensualesNetos": {
                        "valor": 0,
                        "moneda": "MXN"
                      },
                      "aclaracionesObservaciones": ""
                  };
                  jsonResult.declaracion.situacionPatrimonial.actividadAnualAnterior={
                      "servidorPublicoAnioAnterior": false,
                      "fechaIngreso": "",
                      "fechaConclusion": "",
                      "remuneracionNetaCargoPublico": {
                        "valor": 0,
                        "moneda": "MXN"
                      },
                      "otrosIngresosTotal": {
                        "valor": 0,
                        "moneda": "MXN"
                      },
                      "actividadIndustialComercialEmpresarial": {
                        "remuneracionTotal": {
                          "valor": 0,
                          "moneda": "MXN"
                        },
                        "actividades": {}
                      },
                      "actividadFinanciera": {
                        "remuneracionTotal": {
                          "valor": 0,
                          "moneda": "MXN"
                        },
                        "actividades": {}
                      },
                      "serviciosProfesionales": {
                        "remuneracionTotal": {
                          "valor": 0,
                          "moneda": "MXN"
                        },
                        "servicios": {}
                      },
                      "enajenacionBienes": {
                        "remuneracionTotal": {
                          "valor": 0,
                          "moneda": "MXN"
                        },
                        "bienes": {}
                      },
                      "otrosIngresos": {
                        "remuneracionTotal": {
                          "valor": 0,
                          "moneda": "MXN"
                        },
                        "ingresos": {}
                      },
                      "ingresoNetoAnualDeclarante": {
                        "valor": 0,
                        "moneda": "MXN"
                      },
                      "ingresoNetoAnualParejaDependiente": {
                        "valor": 0,
                        "moneda": "MXN"
                      },
                      "totalIngresosNetosAnuales": {
                        "valor": 0,
                        "moneda": "MXN"
                      },
                      "aclaracionesObservaciones": ""
                  };
                    break;
              case "MODIFICACION":
                  delete jsonResult.declaracion.situacionPatrimonial.actividadAnualAnterior;
                  delete jsonResult.captura.declaracion.situacionPatrimonial.secciones[7];//actividadAnualAnterior
                  jsonResult.declaracion.situacionPatrimonial.ingresos={
                      "remuneracionAnualCargoPublico": {
                        "valor": 0,
                        "moneda": "MXN"
                      },
                      "otrosIngresosAnualesTotal": {
                        "valor": 0,
                        "moneda": "MXN"
                      },
                      "actividadIndustialComercialEmpresarial": {
                        "remuneracionTotal": {
                          "valor": 0,
                          "moneda": "MXN"
                        },
                        "actividades": {}
                      },
                      "actividadFinanciera": {
                        "remuneracionTotal": {
                          "valor": 0,
                          "moneda": "MXN"
                        },
                        "actividades": {}
                      },
                      "serviciosProfesionales": {
                        "remuneracionTotal": {
                          "valor": 0,
                          "moneda": "MXN"
                        },
                        "servicios": {}
                      },
                      "enajenacionBienes": {
                        "remuneracionTotal": {
                          "valor": 0,
                          "moneda": "MXN"
                        },
                        "bienes": {}
                      },
                      "otrosIngresos": {
                        "remuneracionTotal": {
                          "valor": 0,
                          "moneda": "MXN"
                        },
                        "ingresos": {}
                      },
                      "ingresoAnualNetoDeclarante": {
                        "valor": 0,
                        "moneda": "MXN"
                      },
                      "ingresoAnualNetoParejaDependiente": {
                        "valor": 0,
                        "moneda": "MXN"
                      },
                      "totalIngresosAnualesNetos": {
                        "valor": 0,
                        "moneda": "MXN"
                      },
                      "aclaracionesObservaciones": ""
                    };
                  break;
              case "CONCLUSION":
                  if (!jsonResult.captura.declaracion.situacionPatrimonial.secciones["7"]){
                      jsonResult.captura.declaracion.situacionPatrimonial.secciones["7"] = {};
                      jsonResult.captura.declaracion.situacionPatrimonial.secciones["7"].no = 7;
                      jsonResult.captura.declaracion.situacionPatrimonial.secciones["7"].titulo       = "¿Te desempeñaste como servidor público el año inmediato anterior?";
                      jsonResult.captura.declaracion.situacionPatrimonial.secciones["7"].moduloName   = "moduloDesempenoServidorPublico";
                      jsonResult.captura.declaracion.situacionPatrimonial.secciones["7"].status       = "SIN_INFO";
                      jsonResult.captura.declaracion.situacionPatrimonial.secciones["7"].apartado     = "situacionPatrimonial"; 
                      jsonResult.captura.declaracion.situacionPatrimonial.secciones["7"].seccion      = "actividadAnualAnterior"; 
                      jsonResult.captura.declaracion.situacionPatrimonial.secciones["7"].help         = "ayuda de moduloDesempenoServidorPublico";
                  }
                  jsonResult.declaracion.situacionPatrimonial.actividadAnualAnterior={
                      "servidorPublicoAnioAnterior": false,
                      "fechaIngreso": "",
                      "fechaConclusion": "",
                      "remuneracionNetaCargoPublico": {
                        "valor": 0,
                        "moneda": "MXN"
                      },
                      "otrosIngresosTotal": {
                        "valor": 0,
                        "moneda": "MXN"
                      },
                      "actividadIndustialComercialEmpresarial": {
                        "remuneracionTotal": {
                          "valor": 0,
                          "moneda": "MXN"
                        },
                        "actividades": {}
                      },
                      "actividadFinanciera": {
                        "remuneracionTotal": {
                          "valor": 0,
                          "moneda": "MXN"
                        },
                        "actividades": {}
                      },
                      "serviciosProfesionales": {
                        "remuneracionTotal": {
                          "valor": 0,
                          "moneda": "MXN"
                        },
                        "servicios": {}
                      },
                      "enajenacionBienes": {
                        "remuneracionTotal": {
                          "valor": 0,
                          "moneda": "MXN"
                        },
                        "bienes": {}
                      },
                      "otrosIngresos": {
                        "remuneracionTotal": {
                          "valor": 0,
                          "moneda": "MXN"
                        },
                        "ingresos": {}
                      },
                      "ingresoNetoAnualDeclarante": {
                        "valor": 0,
                        "moneda": "MXN"
                      },
                      "ingresoNetoAnualParejaDependiente": {
                        "valor": 0,
                        "moneda": "MXN"
                      },
                      "totalIngresosNetosAnuales": {
                        "valor": 0,
                        "moneda": "MXN"
                      },
                      "aclaracionesObservaciones": ""
                  };
                  jsonResult.declaracion.situacionPatrimonial.ingresos={
                      "remuneracionConclusionCargoPublico": {
                        "valor": 0,
                        "moneda": "MXN"
                      },
                      "otrosIngresosConclusionTotal": {
                        "valor": 0,
                        "moneda": "MXN"
                      },
                      "actividadIndustialComercialEmpresarial": {
                        "remuneracionTotal": {
                          "valor": 0,
                          "moneda": "MXN"
                        },
                        "actividades": {}
                      },
                      "actividadFinanciera": {
                        "remuneracionTotal": {
                          "valor": 0,
                          "moneda": "MXN"
                        },
                        "actividades": {}
                      },
                      "serviciosProfesionales": {
                        "remuneracionTotal": {
                          "valor": 0,
                          "moneda": "MXN"
                        },
                        "servicios": {}
                      },
                      "enajenacionBienes": {
                        "remuneracionTotal": {
                          "valor": 0,
                          "moneda": "MXN"
                        },
                        "bienes": {}
                      },
                      "otrosIngresos": {
                        "remuneracionTotal": {
                          "valor": 0,
                          "moneda": "MXN"
                        },
                        "ingresos": {}
                      },
                      "ingresoConclusionNetoDeclarante": {
                        "valor": 0,
                        "moneda": "MXN"
                      },
                      "ingresoConclusionNetoParejaDependiente": {
                        "valor": 0,
                        "moneda": "MXN"
                      },
                      "totalIngresosConclusionNetos": {
                        "valor": 0,
                        "moneda": "MXN"
                      },
                      "aclaracionesObservaciones": ""
                  };
                  break;
          }
      }
      else{      
        switch(jsonResult.captura.tipo_declaracion){
              case "INICIAL":
                  jsonResult.declaracion.situacionPatrimonial.ingresos={
                      "remuneracionMensualCargoPublico": {
                        "valor": 0,
                        "moneda": "MXN"
                      },
                      "otrosIngresosMensualesTotal": {
                        "valor": 0,
                        "moneda": "MXN"
                      },
                      "actividadIndustialComercialEmpresarial": {
                        "remuneracionTotal": {
                          "valor": 0,
                          "moneda": "MXN"
                        },
                        "actividades": {}
                      },
                      "actividadFinanciera": {
                        "remuneracionTotal": {
                          "valor": 0,
                          "moneda": "MXN"
                        },
                        "actividades": {}
                      },
                      "serviciosProfesionales": {
                        "remuneracionTotal": {
                          "valor": 0,
                          "moneda": "MXN"
                        },
                        "servicios": {}
                      },
                      "otrosIngresos": {
                        "remuneracionTotal": {
                          "valor": 0,
                          "moneda": "MXN"
                        },
                        "ingresos": {}
                      },
                      "ingresoMensualNetoDeclarante": {
                        "valor": 0,
                        "moneda": "MXN"
                      },
                      "ingresoMensualNetoParejaDependiente": {
                        "valor": 0,
                        "moneda": "MXN"
                      },
                      "totalIngresosMensualesNetos": {
                        "valor": 0,
                        "moneda": "MXN"
                      },
                      "aclaracionesObservaciones": ""
                  };
                  break;
              case "MODIFICACION":
                  delete jsonResult.declaracion.situacionPatrimonial.actividadAnualAnterior;
                  jsonResult.captura.declaracion.situacionPatrimonial.secciones[9].status="TERMINADO";
                  jsonResult.declaracion.situacionPatrimonial.ingresos={
                      "remuneracionAnualCargoPublico": {
                        "valor": 0,
                        "moneda": "MXN"
                      },
                      "otrosIngresosAnualesTotal": {
                        "valor": 0,
                        "moneda": "MXN"
                      },
                      "actividadIndustialComercialEmpresarial": {
                        "remuneracionTotal": {
                          "valor": 0,
                          "moneda": "MXN"
                        },
                        "actividades": {}
                      },
                      "actividadFinanciera": {
                        "remuneracionTotal": {
                          "valor": 0,
                          "moneda": "MXN"
                        },
                        "actividades": {}
                      },
                      "serviciosProfesionales": {
                        "remuneracionTotal": {
                          "valor": 0,
                          "moneda": "MXN"
                        },
                        "servicios": {}
                      },
                      "enajenacionBienes": {
                        "remuneracionTotal": {
                          "valor": 0,
                          "moneda": "MXN"
                        },
                        "bienes": {}
                      },
                      "otrosIngresos": {
                        "remuneracionTotal": {
                          "valor": 0,
                          "moneda": "MXN"
                        },
                        "ingresos": {}
                      },
                      "ingresoAnualNetoDeclarante": {
                        "valor": 0,
                        "moneda": "MXN"
                      },
                      "ingresoAnualNetoParejaDependiente": {
                        "valor": 0,
                        "moneda": "MXN"
                      },
                      "totalIngresosAnualesNetos": {
                        "valor": 0,
                        "moneda": "MXN"
                      },
                      "aclaracionesObservaciones": ""
                    };
                  break;
              case "CONCLUSION":
                  jsonResult.declaracion.situacionPatrimonial.ingresos={
                      "remuneracionConclusionCargoPublico": {
                        "valor": 0,
                        "moneda": "MXN"
                      },
                      "otrosIngresosConclusionTotal": {
                        "valor": 0,
                        "moneda": "MXN"
                      },
                      "actividadIndustialComercialEmpresarial": {
                        "remuneracionTotal": {
                          "valor": 0,
                          "moneda": "MXN"
                        },
                        "actividades": {}
                      },
                      "actividadFinanciera": {
                        "remuneracionTotal": {
                          "valor": 0,
                          "moneda": "MXN"
                        },
                        "actividades": {}
                      },
                      "serviciosProfesionales": {
                        "remuneracionTotal": {
                          "valor": 0,
                          "moneda": "MXN"
                        },
                        "servicios": {}
                      },
                      "enajenacionBienes": {
                        "remuneracionTotal": {
                          "valor": 0,
                          "moneda": "MXN"
                        },
                        "bienes": {}
                      },
                      "otrosIngresos": {
                        "remuneracionTotal": {
                          "valor": 0,
                          "moneda": "MXN"
                        },
                        "ingresos": {}
                      },
                      "ingresoConclusionNetoDeclarante": {
                        "valor": 0,
                        "moneda": "MXN"
                      },
                      "ingresoConclusionNetoParejaDependiente": {
                        "valor": 0,
                        "moneda": "MXN"
                      },
                      "totalIngresosConclusionNetos": {
                        "valor": 0,
                        "moneda": "MXN"
                      },
                      "aclaracionesObservaciones": ""
                  };
                  break;
        }
      }
    }
    
    //variables de apoyo en json.
    jsonResult.declaracion.situacionPatrimonial.domicilioDeclarante.domicilio="MX";
    jsonResult.declaracion.situacionPatrimonial.datosEmpleoCargoComision.domicilio="MX";

    //titulo del formulario de captura.
    $(".titulo-declaracion-captura").text("DECLARACIÓN " + jsonResult.captura.tipo_declaracion + " | " + jsonResult.captura.formato);
    
    //etiqueta de datos del empleo para conclusión o inicial/modificacion
    $(".lblFechaTomaPosesion").text ( jsonResult.captura.tipo_declaracion == "CONCLUSION" ? "FECHA DE CONCLUSIÓN" : "FECHA DE TOMA DE POSESIÓN");

    //pintar secciones.
    htmlSecciones+='<h6 class="text-muted p10">Situación Patrimonial</h6>';
    $.each(jsonResult.captura.declaracion.situacionPatrimonial.secciones, function(index, item){
        if(item.no !=9){
          htmlSecciones+='<li class="nav-item">\
                            <a class="nav-link lnk' + item.moduloName + '" href="javascript:void(0);" onclick="iniciarModulo(\'' + btoa(JSON.stringify(item)) + '\');">\
                                <span class="indicador">' + item.no + '</span>\
                                <span>' + item.titulo + '</span>\
                                <span class="indicador-status status-seccion-'+ item.apartado + '-' + item.no +' float-right">PENDIENTE</span>\
                            </a>\
                        </li>';  
        }
        else{
          if (jsonResult.captura.formato =="COMPLETA"){
            if (jsonResult.captura.tipo_declaracion=="MODIFICACION"){
              htmlSecciones+='<li class="nav-item">\
                                <label class="nav-link lnk' + item.moduloName + '">\
                                    <span class="indicador">' + item.no + '</span>\
                                    <span>' + item.titulo + '</span>\
                                    <span class="indicador-status-success float-right">NO APLICA</span>\
                                </label>\
                            </li>';              
            }
            else{
              htmlSecciones+='<li class="nav-item">\
                                <a class="nav-link lnk' + item.moduloName + '" href="javascript:void(0);" onclick="iniciarModulo(\'' + btoa(JSON.stringify(item)) + '\');">\
                                    <span class="indicador">' + item.no + '</span>\
                                    <span>' + item.titulo + '</span>\
                                    <span class="indicador-status status-seccion-'+ item.apartado + '-' + item.no +' float-right">PENDIENTE</span>\
                                </a>\
                            </li>';
            }
          }
        }
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
    if (Object.keys(jsonResult.captura.declaracion.fiscal.secciones).length > 0){
      htmlSecciones+='<h6 class="text-muted p10">Presentaci&oacute;n de Declaraci&oacute;n Fiscal</h6>';
      $.each(jsonResult.captura.declaracion.fiscal.secciones, function(index, item){
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
                //document.getElementById('output').textContent=fr.result;
            }
              
            fr.readAsText(this.files[0]);
            this.value="";
        });

window.cerrarModal = function cerrarModal(){
  $("#modalAcercade").modal("hide");
  $("#modalAvisoPrivacidad").modal("hide");
}

window.regresarAlInicio = function regresarAlInicio(){

    /* jsonResult.captura.tipo_declaracion = "";    
    jsonResult.captura.formato = "";
    jsonResult.captura.declaracion =  [];
    jsonResult.captura.status_gral = ""; */    
    declaraciones = JSON.parse(JSON.stringify(declaracionesResp));
    jsonResult = JSON.parse(JSON.stringify(jsonResultResp));
    
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
}


//------------------------------------------------------------------------------------------//
//secciones de declaraciones.
window.declaraciones={
    "completa":{
        "situacionPatrimonial":{
          "secciones": {
            "1": {
              "no": 1,
              "titulo": "Datos generales",
              "moduloName": "moduloDatosGenerales",
              "status": "SIN_INFO",
              "apartado": "situacionPatrimonial",
              "seccion": "datosGenerales",
              "help": "Introduzca sus datos generales."
            },
            "2": {
              "no": 2,
              "titulo": "Domicilio del Declarante",
              "moduloName": "moduloDomicilio",
              "status": "SIN_INFO",
              "apartado": "situacionPatrimonial",
              "seccion": "domicilioDeclarante",
              "help": "Proporcionar los datos relativos al lugar en el que reside actualmente, seleccionando si es en México o el extranjero."
            },
            "3": {
              "no": 3,
              "titulo": "Datos curriculares del Declarante",
              "moduloName": "moduloCV",
              "status": "SIN_INFO",
              "apartado": "situacionPatrimonial",
              "seccion": "datosCurricularesDeclarante",
              "help": "Podrá llenar la información relativa a las instituciones educativas hasta los cinco últimos grados de escolaridad, iniciando con la más reciente."
            },
            "4": {
              "no": 4,
              "titulo": "Datos del empleo, cargo o comisión",
              "moduloName": "moduloEmpleoCargoComision",
              "status": "SIN_INFO",
              "apartado": "situacionPatrimonial",
              "seccion": "datosEmpleoCargoComision",
              "help": "Para la declaración de inicio, reportar los datos del empleo, cargo o comisión que inicie. </br> Para la declaración de modificación, deberá reportar el empleo, cargo o comisión actual. </br>Para la declaración de conclusión, reportar los datos del empleo, cargo o comisión que concluya."
            },
            "5": {
              "no": 5,
              "titulo": "Experiencia laboral (últimos cinco empleos)",
              "moduloName": "moduloExperienciaLaboral",
              "status": "SIN_INFO",
              "apartado": "situacionPatrimonial",
              "seccion": "experienciaLaboral",
              "help": "Proporcionar información correspondiente a los últimos cinco empleos de experiencia laboral. Se llenará la información relativa a todos los encargos, empleos o comisiones públicos o privados que haya tenido."
            },
            "6": {
              "no": 6,
              "titulo": "Datos de la Pareja",
              "moduloName": "moduloPareja",
              "status": "SIN_INFO",
              "apartado": "situacionPatrimonial",
              "seccion": "datosPareja",
              "help": "Proporcionar los datos del cónyuge, concubina/concubinario, con quien tenga una relación de sociedad de convivencia o cualquier otro similar a los anteriores."
            },
            "7": {
              "no": 7,
              "titulo": "Datos del dependiente económico",
              "moduloName": "moduloDependientesEconomicos",
              "status": "SIN_INFO",
              "apartado": "situacionPatrimonial",
              "seccion": "datosDependienteEconomico",
              "help": "Proporcionar los datos de los dependientes económicos, que son aquellas personas, familiares o no, cuya manutención depende principalmente de los ingresos del Declarante. Llenar toda la información por cada una de las personas que dependan económicamente del Declarante."
            },
            "8": {
              "no": 8,
              "titulo": "Ingresos netos del Declarante, Pareja y/o dependientes económicos",
              "moduloName": "moduloIngresos",
              "status": "SIN_INFO",
              "apartado": "situacionPatrimonial",
              "seccion": "ingresos",
              "help": "Para la declaración de inicio los ingresos a reportar son mensuales.</br> Para la declaración de modificación los ingresos a reportar son los del año inmediato anterior. (del 1 de enero al 31 de diciembre del año inmediato anterior).</br> Para la declaración de conclusión los ingresos a reportar son los que recibió durante el año hasta la fecha de la conclusión del empleo, cargo o comisión.</br> Es necesario capturar cantidades después de impuestos, sin comas, sin puntos, sin centavos y sin ceros a la izquierda."
            },
            "9": {
              "no": 9,
              "titulo": "¿Te desempeñaste como servidor público el año inmediato anterior?",
              "moduloName": "moduloDesempenoServidorPublico",
              "status": "SIN_INFO",
              "apartado": "situacionPatrimonial",
              "seccion": "actividadAnualAnterior",
              "help": "Capturar el período del año inmediato anterior durante el cual fue servidor p&uacute;blico."
            },
            "10": {
              "no": 10,
              "titulo": "Bienes inmuebles",
              "moduloName": "moduloBienesInmuebles",
              "status": "SIN_INFO",
              "apartado": "situacionPatrimonial",
              "seccion": "bienesInmuebles",
              "help": "Todos lo datos de bienes declarados a nombre de la pareja, dependientes económicos y/o terceros o que sean en copropiedad con el declarante no serán públicos."
            },
            "11": {
              "no": 11,
              "titulo": "Vehículos",
              "moduloName": "moduloVehiculos",
              "status": "SIN_INFO",
              "apartado": "situacionPatrimonial",
              "seccion": "vehiculos",
              "help": "Todos lo datos de vehiculos declarados a nombre de la pareja, dependientes económicos y/o terceros o que sean en copropiedad con el declarante no serán públicos."
            },
            "12": {
              "no": 12,
              "titulo": "Bienes muebles",
              "moduloName": "moduloBienesMuebles",
              "status": "SIN_INFO",
              "apartado": "situacionPatrimonial",
              "seccion": "bienesMuebles",
              "help": "Se refiere a la información que el Declarante reportará sobre bienes que conforme a la normatividad aplicable se consideran muebles, que por su naturaleza de manera individual o en conjunto representan una parte considerable del patrimonio del servidor público de acuerdo con su situación socioeconómica y que para efectos de referencia el monto de su valor comercial sea mayor a 1200 Unidades de Medida y Actualización (UMA) por lo que se refiere al conjunto de menaje. En el caso de los demás bienes dicho valor será en lo individual."
            },
            "13": {
              "no": 13,
              "titulo": "Inversiones, cuentas bancarias y otro tipo de valores/activos.",
              "moduloName": "moduloInversiones",
              "status": "SIN_INFO",
              "apartado": "situacionPatrimonial",
              "seccion": "inversiones",
              "help": "El Declarante reporta toda la información relacionada con las inversiones, cuentas bancarias o algún otro tipo de valor del declarante, pareja y/o dependientes econ&oacute;micos."
            },
            "14": {
              "no": 14,
              "titulo": "Adeudos/pasivos",
              "moduloName": "moduloAdeudos",
              "status": "SIN_INFO",
              "apartado": "situacionPatrimonial",
              "seccion": "adeudos",
              "help": "El Declarante reportará la información sobre cualquier tipo de deuda y por cada una de ellas. </br>Todos los datos de los adeudos/pasivos a nombre de la pareja, dependientes económicos y/o terceros o que sean en copropiedad con el declarante no serán públicos."
            },
            "15": {
              "no": 15,
              "titulo": "Préstamo o comodato por terceros",
              "moduloName": "moduloPrestamoOComodato",
              "status": "SIN_INFO",
              "apartado": "situacionPatrimonial",
              "seccion": "prestamoOComodato",
              "help": "Indicar si existe algún bien (inmueble, vehículo) prestado por tercero y que el Declarante use."
            }
          }
        },
        "interes":{
          "secciones": {
            "1": {
              "no": 1,
              "titulo": "Participación en empresas, sociedades o asociaciones (hasta los 2 últimos años)",
              "moduloName": "moduloParticipacionEmpresas",
              "status": "SIN_INFO",
              "apartado": "interes",
              "seccion": "participacion",
              "help": "El Declarante deberá señalar si tiene o no participación en empresas, sociedades o asociaciones, tales como socio, accionista, comisario, representante, apoderado, colaborador, beneficiario u otro, especifique. Deberá reportar hasta los últimos dos años.</br>Todos los datos de la participación en empresas, sociedades o asociaciones de la pareja o dependientes económicos no serán públicos."
            },
            "2": {
              "no": 2,
              "titulo": "¿Participa en alguna de estas instituciones? (hasta los 2 últimos años)",
              "moduloName": "moduloParticipacionInstituciones",
              "status": "SIN_INFO",
              "apartado": "interes",
              "seccion": "participacionTomaDecisiones",
              "help": "Refiere a la condición de pertenencia formal del Declarante a alguna institución y que cuente con poder de decisión en ella. Deberá reportar hasta los últimos dos años.</br>Todos los datos de la participación en alguna de estas instituciones de la pareja o dependientes económicos no serán públicos."
            },
            "3": {
              "no": 3,
              "titulo": "Apoyos o beneficios públicos (hasta los 2 últimos años)",
              "moduloName": "moduloApoyosPublicos",
              "status": "SIN_INFO",
              "apartado": "interes",
              "seccion": "apoyos",
              "help": "Es la contribución monetaria o en especie que otorga un Ente Público al Declarante, cónyuge o Pareja y/o dependiente económico. El apoyo en especie refiere a cualquier contribución, utilizando bienes, servicios o beneficios de naturaleza diferente al dinero. Deberá reportar hasta los últimos dos años."
            },
            "4": {
              "no": 4,
              "titulo": "Representación (hasta los 2 últimos años)",
              "moduloName": "moduloRepresentacion",
              "status": "SIN_INFO",
              "apartado": "interes",
              "seccion": "representacion",
              "help": "Es cuando el Declarante actúa a nombre de otra persona física o moral (representante) o cuando una persona actúa a nombre del Declarante (representado). Deberá reportar hasta los últimos dos años.</br>Todos los datos de representación de la pareja o dependientes económicos no serán públicos."
            },
            "5": {
              "no": 5,
              "titulo": "Clientes principales (hasta los 2 últimos años)",
              "moduloName": "moduloClientesPrincipales",
              "status": "SIN_INFO",
              "apartado": "interes",
              "seccion": "clientesPrincipales",
              "help": "En caso de tener alguna empresa, negocio o actividad lucrativa deberá señalar a sus clientes principales, siempre y cuando el beneficio o ganancia directa al Declarante supere mensualmente 250 Unidades de Medida y Actualización (UMA), refiriéndose al valor diario de ésta. Deberá reportar hasta los últimos dos años.</br> Todos los datos de cloentes principales de la pareja o dependientes económicos no serán públicos."
            },
            "6": {
              "no": 6,
              "titulo": "Beneficios privados (hasta los 2 últimos años)",
              "moduloName": "moduloBeneficiosPrivados",
              "status": "SIN_INFO",
              "apartado": "interes",
              "seccion": "beneficiosPrivados",
              "help": "Es la contribución monetaria o en especie que otorga una persona física o moral con recursos privados al Declarante o alguna de las personas señaladas en el catálogo. El apoyo en especie refiere a cualquier contribución, utilizando bienes o beneficios de naturaleza diferente al dinero. Deberá reportar hasta los últimos dos años."
            },
            "7": {
              "no": 7,
              "titulo": "Fideicomisos (hasta los 2 últimos años)",
              "moduloName": "moduloFideicomisos",
              "status": "SIN_INFO",
              "apartado": "interes",
              "seccion": "fideicomisos",
              "help": "Este apartado solo lo llenaran las personas servidoras públicas que tengan participación en un fideicomiso, ya sea en el carácter de fideicomitente, fiduciario, fideicomisario o dentro del consejo técnico. Deberá reportar hasta los últimos dos años. </br> Todos los datos de participación en fideicomisos de la pareja o dependientes económicos no serán públicos."
            }
          }
        },
        "fiscal":{
          "secciones": {
            "1": {
              "no": 1,
              "titulo": "Constancia de declaración fiscal",
              "moduloName": "moduloConstanciaFiscal",
              "status": "SIN_INFO",
              "apartado": "fiscal",
              "seccion": "constanciaFiscal",
              "help": "El Declarante deberá indicar si presentó su declaración fiscal, en caso afirmativo deberá entregar copia del <b>Acuse</b> al Contralor Interno, junto con su declaración."
            }
          }
        }
    },
    "simplificada":{
        "situacionPatrimonial":{
            "secciones": {
              "1": {
                "no": 1,
                "titulo": "Datos generales",
                "moduloName": "moduloDatosGenerales",
                "status": "SIN_INFO",
                "apartado": "situacionPatrimonial",
                "seccion": "datosGenerales",
                "help": "Introduzca sus datos generales."
              },
              "2": {
                "no": 2,
                "titulo": "Domicilio del Declarante",
                "moduloName": "moduloDomicilio",
                "status": "SIN_INFO",
                "apartado": "situacionPatrimonial",
                "seccion": "domicilioDeclarante",
                "help": "Proporcionar los datos relativos al lugar en el que reside actualmente, seleccionando si es en México o el extranjero."
              },
              "3": {
                "no": 3,
                "titulo": "Datos curriculares del Declarante",
                "moduloName": "moduloCV",
                "status": "SIN_INFO",
                "apartado": "situacionPatrimonial",
                "seccion": "datosCurricularesDeclarante",
                "help": "Podrá llenar la información relativa a las instituciones educativas hasta los cinco últimos grados de escolaridad, iniciando con la más reciente."
              },
              "4": {
                "no": 4,
                "titulo": "Datos del empleo, cargo o comisión",
                "moduloName": "moduloEmpleoCargoComision",
                "status": "SIN_INFO",
                "apartado": "situacionPatrimonial",
                "seccion": "datosEmpleoCargoComision",
                "help": "Para la declaración de inicio, reportar los datos del empleo, cargo o comisión que inicie. </br> Para la declaración de modificación, deberá reportar el empleo, cargo o comisión actual. </br>Para la declaración de conclusión, reportar los datos del empleo, cargo o comisión que concluya."
              },
              "5": {
                "no": 5,
                "titulo": "Experiencia laboral (últimos cinco empleos)",
                "moduloName": "moduloExperienciaLaboral",
                "status": "SIN_INFO",
                "apartado": "situacionPatrimonial",
                "seccion": "experienciaLaboral",
                "help": "Proporcionar información correspondiente a los últimos cinco empleos de experiencia laboral. Se llenará la información relativa a todos los encargos, empleos o comisiones públicos o privados que haya tenido."
              },
              "6": {
                "no": 6,
                "titulo": "Ingresos netos del Declarante",
                "moduloName": "moduloIngresos",
                "status": "SIN_INFO",
                "apartado": "situacionPatrimonial",
                "seccion": "ingresos",
                "help": "Para la declaración de inicio los ingresos a reportar son mensuales.</br>\
                        Para la declaración de modificación los ingresos a reportar son los del año inmediato\
                        anterior. (del 1 de enero al 31 de diciembre del año inmediato anterior).</br>\
                        Para la declaración de conclusión los ingresos a reportar son los que recibió durante el año\
                        hasta la fecha de la conclusión del empleo, cargo o comisión.</br>\
                        Es necesario capturar cantidades después de impuestos, sin comas, sin puntos, sin\
                        centavos y sin ceros a la izquierda."
              },
              "7": {
                "no": 7,
                "titulo": "¿Te desempeñaste como servidor público el año inmediato anterior?",
                "moduloName": "moduloDesempenoServidorPublico",
                "status": "SIN_INFO",
                "apartado": "situacionPatrimonial",
                "seccion": "actividadAnualAnterior",
                "help": "Capturar el período del año inmediato anterior durante el cual fue servidor p&uacute;blico."
              }
            }
          },
        "interes":{
            "secciones":{}
        },
        "fiscal":{
          "secciones": {
            "1": {
              "no": 1,
              "titulo": "Constancia de declaración fiscal",
              "moduloName": "moduloConstanciaFiscal",
              "status": "SIN_INFO",
              "apartado": "fiscal",
              "seccion": "constanciaFiscal",
              "help": "El Declarante deberá indicar si presentó su declaración fiscal, en caso afirmativo deberá entregar copia del <b>Acuse</b> al Contralor Interno, junto con su declaración."
            }
          }
        }
    }
};

window.declaracionesResp = JSON.parse(JSON.stringify(declaraciones));