
function generarPDF(){
    var doc = new jspdf.jsPDF();//'p', 'pt', 'letter');
    doc.setProperties({
        title: 'Declaracion Patrimonial y de Intereses',
        subject: 'This is the subject',
        author: 'Gobierno del Estado de Chiapas ',
        keywords: 'declaración, patrimonial, ',
        creator: 'DeclaraFácil PI'
    });

    var numPaginas =0;
    llenarPDF();

    doc.setFontSize(8);
    //doc.setTextColor(300);
    doc.text('TIPO DE DECLARACIÓN:', 48, 30, {maxWidth: 50, align: "right"});
    doc.text('FORMATO:', 48, 35, {maxWidth: 50, align: "right"});
    doc.text('FECHA DE IMPRESIÓN:', 48, 40, {maxWidth: 50, align: "right"});
    doc.text('ENTE PÚBLICO:', 48, 45, {maxWidth: 50, align: "right"});

    doc.text(captura.tipo_declaracion, 50, 30);
    doc.text(captura.formato, 50, 35);
    doc.text("01/05/2021", 50, 40);
    doc.text(jsonResult.declaracion.situacionPatrimonial.datosEmpleoCargoComision.nombreEntePublico, 50, 45);

    doc.setLineWidth(0.2);
    doc.setDrawColor(140,140,140);
    doc.line(15, 48, 200, 48);

    //doc.autoTable({ html: '#pdfMiDeclaracion_generales', margin: { top: 25, bottom:25, left: 80 }, styles: { fontSize: 8 } , theme: 'plain', useCss: true});
    //finalY = doc.lastAutoTable.finalY;
   
   /*  doc.text('TIPO DE DECLARACIÓN: ' + captura.tipo_declaracion, 195, 30, {maxWidth: 195, align: "right"})
    doc.text('FORMATO: ' + captura.formato, 195, 35, {maxWidth: 195, align: "right"})
    doc.text('FECHA DE IMPRESIÓN: ' + "01/05/2021", 195, 40, {maxWidth: 195, align: "right"})
    doc.text('ENTE PÚBLICO: ' + jsonResult.declaracion.situacionPatrimonial.datosEmpleoCargoComision.nombreEntePublico, 195, 45, {maxWidth: 195, align: "right"}) */
   
    doc.setFontSize(8);
    doc.text('C.______________________________, BAJO PROTESTA DE DECIR VERDAD, PRESENTO A USTED MI DECLARACIÓN DE SITUACIÓN PATRIMONIAL Y DE INTERESES, CONFORME A LO DISPUESTO EN LA LEY GENERAL DE RESPONSABILIDADES ADMINISTRATIVAS, LA LEY GENERAL DEL SISTEMA NACIONAL ANTICORRUPCIÓN Y LA NORMATIVIDAD APLICABLE.', 15, 60, {maxWidth: 180, align: "justify"})
    
    doc.autoTable({ html: '#pdfTitulo1', margin: { top: 25, bottom:0 }, styles: { fontSize: 12 },  startY: 80, useCss: true });  
    finalY = doc.lastAutoTable.finalY;
    doc.autoTable({ html: '#pdfMiDeclaracion_datosGenerales', margin: { top: 0, bottom:25 }, styles: { fontSize: 8 }, startY: finalY + 1, useCss: true });    
    
    finalY = doc.lastAutoTable.finalY;
    doc.autoTable({ html: '#pdfTitulo2', margin: { top: 25, bottom:0 }, styles: { fontSize: 12 }, startY: finalY + 10, useCss: true });  
    finalY = doc.lastAutoTable.finalY;
    doc.autoTable({ html: '#pdfMiDeclaracion_domicilioDeclarante', margin: { top: 0, bottom:25 }, styles: { fontSize: 8 }, startY: finalY + 1, useCss: true });
    doc.addPage();
    //finalY = doc.lastAutoTable.finalY;
    //datos curriculares.
    doc.autoTable({ html: '#pdfTitulo3', margin: { top: 25, bottom:0 }, styles: { fontSize: 12 }, useCss: true });  
    finalY = doc.lastAutoTable.finalY;
    doc.autoTable({ html: '#pdfMiDeclaracion_datosCurricularesDeclarante', margin: { top: 0, bottom:25 }, styles: { fontSize: 8 }, startY: finalY + 1, useCss: true, rowPageBreak: 'auto' });   
    finalY = doc.lastAutoTable.finalY;
    doc.autoTable({ html: '#pdfTitulo4', margin: { top: 25, bottom:0 }, styles: { fontSize: 12 }, startY: finalY + 10, useCss: true });  
    finalY = doc.lastAutoTable.finalY;
    doc.autoTable({ html: '#pdfMiDeclaracion_datosEmpleoCargoComision', margin: { top: 0, bottom:25 }, styles: { fontSize: 8 }, startY: finalY + 1, useCss: true, rowPageBreak: 'auto' });   
    finalY = doc.lastAutoTable.finalY;
    doc.autoTable({ html: '#pdfTitulo5', margin: { top: 25, bottom:0 }, styles: { fontSize: 12 }, startY: finalY + 10, useCss: true });  
    finalY = doc.lastAutoTable.finalY;
    doc.autoTable({ html: '#pdfTitulo6', margin: { top: 25, bottom:0 }, styles: { fontSize: 12 }, startY: finalY + 10, useCss: true });  
    finalY = doc.lastAutoTable.finalY;
    doc.autoTable({ html: '#pdfTitulo7', margin: { top: 25, bottom:0 }, styles: { fontSize: 12 }, startY: finalY + 10, useCss: true });  
    finalY = doc.lastAutoTable.finalY;

    numPaginas = doc.getNumberOfPages();
    for (var i = 1; i <= numPaginas; i++) {
        doc.setPage(i);
        doc.setFontSize(14);
        //header
        doc.text("DeclaraFácil", 105, 10, null, null, "center");
        doc.setFontSize(10);
        doc.text("Sistema de Declaración Patrimonial y de Intereses Portable", 105, 15, null, null, "center");
        //footer
        doc.setFontSize(8);
        var declarante = jsonResult.declaracion.situacionPatrimonial.datosGenerales.nombre + " " + jsonResult.declaracion.situacionPatrimonial.datosGenerales.primerApellido + " " +jsonResult.declaracion.situacionPatrimonial.datosGenerales.segundoApellido;
        doc.setLineWidth(0.5);
        doc.line(15, doc.internal.pageSize.height-13, 60, doc.internal.pageSize.height-13);
        doc.text(declarante, 15, doc.internal.pageSize.height-10, null, null, "left");
        doc.text("Página " + i + " de " + numPaginas, 200, doc.internal.pageSize.height-10, null, null, "right");
    }
    const fecha = new Date();
    var filename = $("input[name='curp']").val() + "_" + captura.tipo_declaracion + "_" + fecha.getFullYear() + ".pdf";
    doc.save(filename);
}


function llenarPDF(){
    //DATOS DE PRUEBA.
    jsonResult.declaracion.situacionPatrimonial.datosEmpleoCargoComision.nombreEntePublico = "SECRETARÍA EJECUTIVA DEL SISTEMA ANTICORRUPCIÓN DEL ESTADO DE CHIAPAS";

    //datos generales
    $(".pdfDec_tipo").text(captura.tipo_declaracion);
    $(".pdfDec_formato").text(captura.formato);
    $(".pdfDec_entepub").text(jsonResult.declaracion.situacionPatrimonial.datosEmpleoCargoComision.nombreEntePublico);
    //datos generales
    var nodo = jsonResult.declaracion.situacionPatrimonial.datosGenerales;
    $("#pdfMiDeclaracion_datosGenerales .nombre").text(nodo.nombre);
    $("#pdfMiDeclaracion_datosGenerales .primerApellido").text(nodo.primerApellido);
    $("#pdfMiDeclaracion_datosGenerales .segundoApellido").text(nodo.segundoApellido);
    $("#pdfMiDeclaracion_datosGenerales .curp").text(nodo.curp);
    $("#pdfMiDeclaracion_datosGenerales .rfc").text(nodo.rfc.rfc);
    $("#pdfMiDeclaracion_datosGenerales .homoClave").text(nodo.rfc.homoClave);
    $("#pdfMiDeclaracion_datosGenerales .correoElectronico_institucional").text(nodo.correoElectronico.institucional);
    $("#pdfMiDeclaracion_datosGenerales .correoElectronico_personal").text(nodo.correoElectronico.personal);
    $("#pdfMiDeclaracion_datosGenerales .telefono_casa").text(nodo.telefono.casa);
    $("#pdfMiDeclaracion_datosGenerales .telefono_celularPersonal").text(nodo.telefono.celularPersonal);
    $("#pdfMiDeclaracion_datosGenerales .situacionPersonalEstadoCivil").text(nodo.situacionPersonalEstadoCivil.valor);
    $("#pdfMiDeclaracion_datosGenerales .regimenMatrimonial").text(nodo.regimenMatrimonial.valor);
    $("#pdfMiDeclaracion_datosGenerales .paisNacimiento").text(nodo.paisNacimiento);
    $("#pdfMiDeclaracion_datosGenerales .aclaracionesObservaciones").text(nodo.aclaracionesObservaciones);
    //DOMICILIO.
    var nodo = jsonResult.declaracion.situacionPatrimonial.domicilioDeclarante;
    if (captura.domicilioDeclarante =="MX"){
        //mexico
        $("#pdfMiDeclaracion_domicilioDeclarante .calle").text(nodo.domicilioMexico.calle);
        $("#pdfMiDeclaracion_domicilioDeclarante .numeroExterior").text(nodo.domicilioMexico.numeroExterior);
        $("#pdfMiDeclaracion_domicilioDeclarante .numeroInterior").text(nodo.domicilioMexico.numeroInterior);
        $("#pdfMiDeclaracion_domicilioDeclarante .coloniaLocalidad").text(nodo.domicilioMexico.coloniaLocalidad);
        $("#pdfMiDeclaracion_domicilioDeclarante .municipioAlcaldia").text(nodo.domicilioMexico.municipioAlcaldia.valor);
        $("#pdfMiDeclaracion_domicilioDeclarante .entidadFederativa").text(nodo.domicilioMexico.entidadFederativa.valor);
        $("#pdfMiDeclaracion_domicilioDeclarante .codigoPostal").text(nodo.domicilioMexico.codigoPostal);
    }
    else{
        //extranjero
        $("#pdfMiDeclaracion_domicilioDeclarante .EXTcalle").text(nodo.domicilioMexico.calle);
        $("#pdfMiDeclaracion_domicilioDeclarante .EXTnumeroExterior").text(nodo.domicilioMexico.numeroExterior);
        $("#pdfMiDeclaracion_domicilioDeclarante .EXTnumeroInterior").text(nodo.domicilioMexico.numeroInterior);
        $("#pdfMiDeclaracion_domicilioDeclarante .EXTcoloniaLocalidad").text(nodo.domicilioMexico.coloniaLocalidad);
        $("#pdfMiDeclaracion_domicilioDeclarante .EXTestadoProvincia").text(nodo.domicilioMexico.estadoProvincia);
        $("#pdfMiDeclaracion_domicilioDeclarante .EXTpais").text(nodo.domicilioMexico.pais);
        $("#pdfMiDeclaracion_domicilioDeclarante .EXTcodigoPostal").text(nodo.domicilioMexico.codigoPostal);
    }
    $("#pdfMiDeclaracion_domicilioDeclarante .aclaracionesObservaciones").text(nodo.aclaracionesObservaciones);
    //DATOS CURRICULARES.
    var html="";
    Object.keys(jsonResult.declaracion.situacionPatrimonial.datosCurricularesDeclarante.escolaridad).forEach(function (index) {
        var nodo = jsonResult.declaracion.situacionPatrimonial.datosCurricularesDeclarante.escolaridad[index];
        html +=' <tr style="background-color: #dee2e6;">\
                        <td style="width: 20%;">NIVEL</td>\
                        <td style="width: 20%;">DOCUMENTO OBTENIDO</td>\
                        <td style="width: 20%;">FECHA OBTENCIÓN</td>\
                        <td style="width: 20%;">ESTATUS</td>\
                        <td style="width: 20%;">UBICACIÓN</td>\
                    </tr>\
                    <tr>\
                        <td style="width: 20%;">' + nodo.nivel.valor + '</td>\
                        <td style="width: 20%;">' + nodo.documentoObtenido + '</td>\
                        <td style="width: 20%;">' + nodo.fechaObtencion + '</td>\
                        <td style="width: 20%;">' + nodo.estatus + '</td>\
                        <td style="width: 20%;">' + nodo.institucionEducativa.ubicacion + '</td>\
                    </tr>\
                    <tr style="background-color: #dee2e6;">\
                        <td colspan="3">INSTITUCIÓN EDUCATIVA</td>\
                        <td colspan="2">CARRERA O ÁREA DE CONOCIMIENTO</td>\
                    </tr>\
                    <tr>\
                        <td colspan="3">' + nodo.institucionEducativa.nombre + '</td>\
                        <td colspan="2">' + nodo.carreraAreaConocimiento + '</td>\
                    </tr>\
                    <tr>\
                        <td style="background-color: #dee2e6;" colspan="5">ACLARACIONES/OBSERVACIONES</td>\
                    </tr>\
                    <tr>\
                        <td colspan="5">' + jsonResult.declaracion.situacionPatrimonial.datosCurricularesDeclarante.aclaracionesObservaciones + '</td>\
                    </tr>';
    });
    $("#pdfMiDeclaracion_datosCurricularesDeclarante>tbody").empty().append(html);
    //DATOS DEL EMPLEO, CARGO O COMISIÓN
    var nodo = jsonResult.declaracion.situacionPatrimonial.datosEmpleoCargoComision;
    $("#pdfMiDeclaracion_datosEmpleoCargoComision .ambitoPublico").text(nodo.ambitoPublico);
    $("#pdfMiDeclaracion_datosEmpleoCargoComision .areaAdscripcion").text(nodo.areaAdscripcion);
    $("#pdfMiDeclaracion_datosEmpleoCargoComision .contratadoPorHonorarios").text(nodo.contratadoPorHonorarios);
    $("#pdfMiDeclaracion_datosEmpleoCargoComision .empleoCargoComision").text(nodo.empleoCargoComision);
    $("#pdfMiDeclaracion_datosEmpleoCargoComision .fechaTomaPosesion").text(nodo.fechaTomaPosesion);
    $("#pdfMiDeclaracion_datosEmpleoCargoComision .funcionPrincipal").text(nodo.funcionPrincipal);
    $("#pdfMiDeclaracion_datosEmpleoCargoComision .nivelEmpleoCargoComision").text(nodo.nivelEmpleoCargoComision);
    $("#pdfMiDeclaracion_datosEmpleoCargoComision .nivelOrdenGobierno").text(nodo.nivelOrdenGobierno);
    $("#pdfMiDeclaracion_datosEmpleoCargoComision .nombreEntePublico").text(nodo.nombreEntePublico);
    $("#pdfMiDeclaracion_datosEmpleoCargoComision .telefonoOficina").text(nodo.telefonoOficina.telefono + " EXT. " + nodo.telefonoOficina.extension);

}

window.generarPDF = generarPDF;