
$("#btnTerminarDeclaracion").on('click',function() {
    if ($("input[name='nameContralor']").val().length<3){ mensajeSwal("Aviso","Ingrese el nombre del Contralor Interno.","error");}
    else{ 
        jsonResult.captura.contralor=$("input[name='nameContralor']").val().toUpperCase();
        generarPDF();
    }    
});

var base64Img ='data:image/png;base64,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';

window.generarPDF = function generarPDF(){   
    if (jsonResult.captura.tipo_declaracion =="INTERESES"){
        gerarPdfDecCompletaINTERESES();
    }
    else{
        if(jsonResult.captura.formato =="SIMPLIFICADA"){
            gerarPdfDecSimplificada();
        }
        else{        
            gerarPdfDecCompleta();
        }
    }    
}

//------------------------------------------------------//

function gerarPdfDecSimplificada(){
    var doc = new jspdf();//'p', 'pt', 'letter');
    doc.setProperties({
        title: 'Declaracion Patrimonial y de Intereses',
        subject: 'This is the subject',
        author: 'Gobierno del Estado de Chiapas ',
        keywords: 'declaración, patrimonial, ',
        creator: 'DeclaraFácil PI'
    });

    //var numPaginas =0;
    llenarPDF();

    doc.setFontSize(8);
    //doc.setTextColor(300);
    doc.text('TIPO DE DECLARACIÓN:', 48, 30, {maxWidth: 50, align: "right"});
    doc.text('FORMATO:', 48, 35, {maxWidth: 50, align: "right"});
    doc.text('FECHA DE IMPRESIÓN:', 48, 40, {maxWidth: 50, align: "right"});
    doc.text('ENTE PÚBLICO:', 48, 45, {maxWidth: 50, align: "right"});

    doc.text(jsonResult.captura.tipo_declaracion, 50, 30);
    doc.text(jsonResult.captura.formato, 50, 35);
    doc.text(getDateTime(), 50, 40);
    doc.text(jsonResult.declaracion.situacionPatrimonial.datosEmpleoCargoComision.nombreEntePublico, 50, 45);

    doc.setLineWidth(0.2);
    doc.setDrawColor(140,140,140);
    doc.line(15, 48, 200, 48);

    doc.setFontSize(8);
    doc.text('C. ' + $("input[name='nameContralor']").val().toUpperCase() + ', BAJO PROTESTA DE DECIR VERDAD, PRESENTO A USTED MI DECLARACIÓN DE SITUACIÓN PATRIMONIAL Y DE INTERESES, CONFORME A LO DISPUESTO EN LA LEY GENERAL DE RESPONSABILIDADES ADMINISTRATIVAS, LA LEY GENERAL DEL SISTEMA NACIONAL ANTICORRUPCIÓN Y LA NORMATIVIDAD APLICABLE.', 15, 60, {maxWidth: 180, align: "justify"})
    
    //DATOS GENERALES
    doc.autoTable({ html: '#pdfTitulo1', margin: { top: 25, bottom:0 }, styles: { fontSize: 12 },  startY: 80, useCss: true });  
    finalY = doc.lastAutoTable.finalY;
    doc.autoTable({ html: '#pdfMiDeclaracion_datosGenerales', margin: { top: 0, bottom:25 }, styles: { fontSize: 8 }, startY: finalY + 1, useCss: true });    
    
    //DOMICILIO DECLARANTE
    finalY = doc.lastAutoTable.finalY;
    doc.autoTable({ html: '#pdfTitulo2', margin: { top: 25, bottom:0 }, styles: { fontSize: 12 }, startY: finalY + 10, useCss: true });  
    finalY = doc.lastAutoTable.finalY;
    if(jsonResult.declaracion.situacionPatrimonial.domicilioDeclarante.domicilio =="MX"){
        doc.autoTable({ html: '#pdfMiDeclaracion_domicilioDeclarante', margin: { top: 0, bottom:25 }, styles: { fontSize: 8 }, startY: finalY + 1, useCss: true, didDrawPage: function (data) { data.settings.margin.top = 30; } });
    }
    else{
        doc.autoTable({ html: '#pdfMiDeclaracion_domicilioDeclaranteEXT', margin: { top: 0, bottom:25 }, styles: { fontSize: 8 }, startY: finalY + 1, useCss: true, didDrawPage: function (data) { data.settings.margin.top = 30; } });
    }
    finalY = doc.lastAutoTable.finalY;
    
    //DATOS CURRICULARES.
    doc.autoTable({ html: '#pdfMiDeclaracion_datosCurricularesDeclarante', margin: { top: 25, bottom:25 }, styles: { fontSize: 8 }, startY: finalY + 10, useCss: true, didDrawPage: function (data) { data.settings.margin.top = 30; }, rowPageBreak: 'auto' });   
    
    //DATOS DEL EMPLEO, CARGO O COMISION.
    finalY = doc.lastAutoTable.finalY;
    doc.autoTable({ html: '#pdfMiDeclaracion_datosEmpleoCargoComision', margin: { top: 25, bottom:25 }, styles: { fontSize: 8 }, startY: finalY + 10, useCss: true, didDrawPage: function (data) { data.settings.margin.top = 30; }, rowPageBreak: 'auto' });   
    finalY = doc.lastAutoTable.finalY;
    if(jsonResult.declaracion.situacionPatrimonial.datosEmpleoCargoComision.domicilio =="MX"){
        doc.autoTable({ html: '#pdfMiDeclaracion_datosEmpleoCargoComisionDOMMX', margin: { top: 0, bottom:25 }, styles: { fontSize: 8 }, startY: finalY + 1, useCss: true, didDrawPage: function (data) { data.settings.margin.top = 30; }, rowPageBreak: 'auto'  });
    }
    else{
        doc.autoTable({ html: '#pdfMiDeclaracion_datosEmpleoCargoComisionDOMEXT', margin: { top: 0, bottom:25 }, styles: { fontSize: 8 }, startY: finalY + 1, useCss: true, didDrawPage: function (data) { data.settings.margin.top = 30; }, rowPageBreak: 'auto'  });
    }

    //EXPERIENCIA LABORAL.
    finalY = doc.lastAutoTable.finalY;
    doc.autoTable({ html: '#pdfMiDeclaracion_experienciaLaboral', margin: { top: 25, bottom:25 }, styles: { fontSize: 8 }, startY: finalY + 10, useCss: true, didDrawPage: function (data) { data.settings.margin.top = 30; }, rowPageBreak: 'auto' });

    //INGRESOS.
    finalY = doc.lastAutoTable.finalY;
    doc.autoTable({ html: '#pdfMiDeclaracion_ingresos', columnStyles: { 0: {cellWidth: 158}, 1: {cellWidth: 30 } }, margin: { top: 25, bottom:25 }, styles: { fontSize: 8 }, startY: finalY + 10, useCss: true, didDrawPage: function (data) { data.settings.margin.top = 30; }, rowPageBreak: 'auto' });
   
    //DESEMPEÑO SERVIDOR PUBLICO AÑO ANTERIOR. 
    if (jsonResult.captura.tipo_declaracion !="MODIFICACION"){    
        finalY = doc.lastAutoTable.finalY;
        doc.autoTable({ html: '#pdfMiDeclaracion_desempenoServidorPublico', columnStyles: { 0: {cellWidth: 158}, 1: {cellWidth: 30 } }, margin: { top: 25, bottom:25 }, styles: { fontSize: 8 }, startY: finalY + 10, useCss: true, didDrawPage: function (data) { data.settings.margin.top = 30; }, rowPageBreak: 'auto' });
    }

    //FISCAL TITULO
    finalY = doc.lastAutoTable.finalY;
    doc.autoTable({ html: '#pdfMiDeclaracion_fiscal_titulo', margin: { top: 25, bottom:25 }, styles: { fontSize: 8 }, startY: finalY + 10, useCss: true, didDrawPage: function (data) { data.settings.margin.top = 30; }, rowPageBreak: 'auto' });
       
    //CONSTANCIA FISCAL
    finalY = doc.lastAutoTable.finalY;
    doc.autoTable({ html: '#pdfMiDeclaracion_constanciaFiscal', margin: { top: 25, bottom:25 }, styles: { fontSize: 8 }, startY: finalY + 10, useCss: true, didDrawPage: function (data) { data.settings.margin.top = 30; }, rowPageBreak: 'auto' });    
     
    headeFooter(doc);
    descargar(doc);        
}

function gerarPdfDecCompleta(){
    var doc = new jspdf();//'p', 'pt', 'letter');
    doc.setProperties({
        title: 'Declaracion Patrimonial y de Intereses',
        subject: 'This is the subject',
        author: 'Gobierno del Estado de Chiapas ',
        keywords: 'declaración, patrimonial, intereses ',
        creator: 'DeclaraFácil PI'
    });

    //var numPaginas =0;
    llenarPDF();

    doc.setFontSize(8);
    //doc.setTextColor(300);
    doc.text('TIPO DE DECLARACIÓN:', 48, 30, {maxWidth: 50, align: "right"});
    doc.text('FORMATO:', 48, 35, {maxWidth: 50, align: "right"});
    doc.text('FECHA DE IMPRESIÓN:', 48, 40, {maxWidth: 50, align: "right"});
    doc.text('ENTE PÚBLICO:', 48, 45, {maxWidth: 50, align: "right"});

    doc.text(jsonResult.captura.tipo_declaracion, 50, 30);
    doc.text(jsonResult.captura.formato, 50, 35);
    doc.text(getDateTime(), 50, 40);
    doc.text(jsonResult.declaracion.situacionPatrimonial.datosEmpleoCargoComision.nombreEntePublico, 50, 45);

    doc.setLineWidth(0.2);
    doc.setDrawColor(140,140,140);
    doc.line(15, 48, 200, 48);

    doc.setFontSize(8);
    doc.text('C. ' + $("input[name='nameContralor']").val().toUpperCase() + ', BAJO PROTESTA DE DECIR VERDAD, PRESENTO A USTED MI DECLARACIÓN DE SITUACIÓN PATRIMONIAL Y DE INTERESES, CONFORME A LO DISPUESTO EN LA LEY GENERAL DE RESPONSABILIDADES ADMINISTRATIVAS, LA LEY GENERAL DEL SISTEMA NACIONAL ANTICORRUPCIÓN Y LA NORMATIVIDAD APLICABLE.', 15, 60, {maxWidth: 180, align: "justify"})
    
    //DATOS GENERALES
    doc.autoTable({ html: '#pdfTitulo1', margin: { top: 25, bottom:0 }, styles: { fontSize: 12 },  startY: 80, useCss: true });  
    finalY = doc.lastAutoTable.finalY;
    doc.autoTable({ html: '#pdfMiDeclaracion_datosGenerales', margin: { top: 0, bottom:25 }, styles: { fontSize: 8 }, startY: finalY + 1, useCss: true });    
    
    //DOMICILIO DECLARANTE
    finalY = doc.lastAutoTable.finalY;
    doc.autoTable({ html: '#pdfTitulo2', margin: { top: 25, bottom:0 }, styles: { fontSize: 12 }, startY: finalY + 10, useCss: true });  
    finalY = doc.lastAutoTable.finalY;
    if(jsonResult.declaracion.situacionPatrimonial.domicilioDeclarante.domicilio =="MX"){
        doc.autoTable({ html: '#pdfMiDeclaracion_domicilioDeclarante', margin: { top: 0, bottom:25 }, styles: { fontSize: 8 }, startY: finalY + 1, useCss: true, didDrawPage: function (data) { data.settings.margin.top = 30; } });
    }
    else{
        doc.autoTable({ html: '#pdfMiDeclaracion_domicilioDeclaranteEXT', margin: { top: 0, bottom:25 }, styles: { fontSize: 8 }, startY: finalY + 1, useCss: true, didDrawPage: function (data) { data.settings.margin.top = 30; } });
    }
    finalY = doc.lastAutoTable.finalY;
    
    //DATOS CURRICULARES.
    doc.autoTable({ html: '#pdfMiDeclaracion_datosCurricularesDeclarante', margin: { top: 25, bottom:25 }, styles: { fontSize: 8 }, startY: finalY + 10, useCss: true, didDrawPage: function (data) { data.settings.margin.top = 30; }, rowPageBreak: 'auto' });   
    
    //DATOS DEL EMPLEO, CARGO O COMISION.
    finalY = doc.lastAutoTable.finalY;
    doc.autoTable({ html: '#pdfMiDeclaracion_datosEmpleoCargoComision', margin: { top: 25, bottom:25 }, styles: { fontSize: 8 }, startY: finalY + 10, useCss: true, didDrawPage: function (data) { data.settings.margin.top = 30; }, rowPageBreak: 'auto' });   
    finalY = doc.lastAutoTable.finalY;
    if(jsonResult.declaracion.situacionPatrimonial.datosEmpleoCargoComision.domicilio =="MX"){
        doc.autoTable({ html: '#pdfMiDeclaracion_datosEmpleoCargoComisionDOMMX', margin: { top: 0, bottom:25 }, styles: { fontSize: 8 }, startY: finalY + 1, useCss: true, didDrawPage: function (data) { data.settings.margin.top = 30; }, rowPageBreak: 'auto'  });
    }
    else{
        doc.autoTable({ html: '#pdfMiDeclaracion_datosEmpleoCargoComisionDOMEXT', margin: { top: 0, bottom:25 }, styles: { fontSize: 8 }, startY: finalY + 1, useCss: true, didDrawPage: function (data) { data.settings.margin.top = 30; }, rowPageBreak: 'auto'  });
    }

    //EXPERIENCIA LABORAL.
    finalY = doc.lastAutoTable.finalY;
    doc.autoTable({ html: '#pdfMiDeclaracion_experienciaLaboral', margin: { top: 25, bottom:25 }, styles: { fontSize: 8 }, startY: finalY + 10, useCss: true, didDrawPage: function (data) { data.settings.margin.top = 30; }, rowPageBreak: 'auto' });

    //DATOS DE LA PAREJA.
    finalY = doc.lastAutoTable.finalY;
    doc.autoTable({ html: '#pdfMiDeclaracion_datos_pareja', margin: { top: 25, bottom:25 }, styles: { fontSize: 8 }, startY: finalY + 10, useCss: true, didDrawPage: function (data) { data.settings.margin.top = 30; }, rowPageBreak: 'auto' });
  
    //DATOS DEL DEPENDIENTE ECONOMICO.
    finalY = doc.lastAutoTable.finalY;
    doc.autoTable({ html: '#pdfMiDeclaracion_datos_dependiente_eco', margin: { top: 25, bottom:25 }, styles: { fontSize: 8 }, startY: finalY + 10, useCss: true, didDrawPage: function (data) { data.settings.margin.top = 30; }, rowPageBreak: 'auto' });
    
    //INGRESOS.
    finalY = doc.lastAutoTable.finalY;
    doc.autoTable({ html: '#pdfMiDeclaracion_ingresos', columnStyles: { 0: {cellWidth: 158}, 1: {cellWidth: 30 } }, margin: { top: 25, bottom:25 }, styles: { fontSize: 8 }, startY: finalY + 10, useCss: true, didDrawPage: function (data) { data.settings.margin.top = 30; }, rowPageBreak: 'auto' });
   
    //DESEMPEÑO SERVIDOR PUBLICO AÑO ANTERIOR. 
    if (jsonResult.captura.tipo_declaracion !="MODIFICACION"){    
        finalY = doc.lastAutoTable.finalY;
        doc.autoTable({ html: '#pdfMiDeclaracion_desempenoServidorPublico', columnStyles: { 0: {cellWidth: 158}, 1: {cellWidth: 30 } }, margin: { top: 25, bottom:25 }, styles: { fontSize: 8 }, startY: finalY + 10, useCss: true, didDrawPage: function (data) { data.settings.margin.top = 30; }, rowPageBreak: 'auto' });
    }

    //BIENES INMUEBLES.
    finalY = doc.lastAutoTable.finalY;
    doc.autoTable({ html: '#pdfMiDeclaracion_bienes_inmuebles', margin: { top: 25, bottom:25 }, styles: { fontSize: 8 }, startY: finalY + 10, useCss: true, didDrawPage: function (data) { data.settings.margin.top = 30; }, rowPageBreak: 'auto' });
  
    //VEHICULOS.
    finalY = doc.lastAutoTable.finalY;
    doc.autoTable({ html: '#pdfMiDeclaracion_vehiculos', margin: { top: 25, bottom:25 }, styles: { fontSize: 8 }, startY: finalY + 10, useCss: true, didDrawPage: function (data) { data.settings.margin.top = 30; }, rowPageBreak: 'auto' });
   
    //BIENES MUEBLES.
    finalY = doc.lastAutoTable.finalY;
    doc.autoTable({ html: '#pdfMiDeclaracion_bienes_muebles', margin: { top: 25, bottom:25 }, styles: { fontSize: 8 }, startY: finalY + 10, useCss: true, didDrawPage: function (data) { data.settings.margin.top = 30; }, rowPageBreak: 'auto' });
   
    //INVERSIONES.
    finalY = doc.lastAutoTable.finalY;
    doc.autoTable({ html: '#pdfMiDeclaracion_inversiones', margin: { top: 25, bottom:25 }, styles: { fontSize: 8 }, startY: finalY + 10, useCss: true, didDrawPage: function (data) { data.settings.margin.top = 30; }, rowPageBreak: 'auto' });
   
    //ADEUDOS.
    finalY = doc.lastAutoTable.finalY;
    doc.autoTable({ html: '#pdfMiDeclaracion_adeudos', margin: { top: 25, bottom:25 }, styles: { fontSize: 8 }, startY: finalY + 10, useCss: true, didDrawPage: function (data) { data.settings.margin.top = 30; }, rowPageBreak: 'auto' });
    
    //PRESTAMOS O COMODATOS.
    finalY = doc.lastAutoTable.finalY;
    doc.autoTable({ html: '#pdfMiDeclaracion_prestamoOComodato', margin: { top: 25, bottom:25 }, styles: { fontSize: 8 }, startY: finalY + 10, useCss: true, didDrawPage: function (data) { data.settings.margin.top = 30; }, rowPageBreak: 'auto' });
    


    //INTERESES TITULO
    finalY = doc.lastAutoTable.finalY;
    doc.autoTable({ html: '#pdfMiDeclaracion_interes_titulo', margin: { top: 25, bottom:25 }, styles: { fontSize: 8 }, startY: finalY + 10, useCss: true, didDrawPage: function (data) { data.settings.margin.top = 30; }, rowPageBreak: 'auto' });
    
    //PARTICIPACION EMPRESAS
    finalY = doc.lastAutoTable.finalY;
    doc.autoTable({ html: '#pdfMiDeclaracion_participacion', margin: { top: 25, bottom:25 }, styles: { fontSize: 8 }, startY: finalY + 10, useCss: true, didDrawPage: function (data) { data.settings.margin.top = 30; }, rowPageBreak: 'auto' });
    
    //PARTICIPACION INSTITUCIONES
    finalY = doc.lastAutoTable.finalY;
    doc.autoTable({ html: '#pdfMiDeclaracion_participacionTomaDecisiones', margin: { top: 25, bottom:25 }, styles: { fontSize: 8 }, startY: finalY + 10, useCss: true, didDrawPage: function (data) { data.settings.margin.top = 30; }, rowPageBreak: 'auto' });
    
    //APOYOS
    finalY = doc.lastAutoTable.finalY;
    doc.autoTable({ html: '#pdfMiDeclaracion_apoyos', margin: { top: 25, bottom:25 }, styles: { fontSize: 8 }, startY: finalY + 10, useCss: true, didDrawPage: function (data) { data.settings.margin.top = 30; }, rowPageBreak: 'auto' });
    
    //REPRESENTACION
    finalY = doc.lastAutoTable.finalY;
    doc.autoTable({ html: '#pdfMiDeclaracion_representacion', margin: { top: 25, bottom:25 }, styles: { fontSize: 8 }, startY: finalY + 10, useCss: true, didDrawPage: function (data) { data.settings.margin.top = 30; }, rowPageBreak: 'auto' });
    
    //CLIENTES PRINCIPALES
    finalY = doc.lastAutoTable.finalY;
    doc.autoTable({ html: '#pdfMiDeclaracion_clientesPrincipales', margin: { top: 25, bottom:25 }, styles: { fontSize: 8 }, startY: finalY + 10, useCss: true, didDrawPage: function (data) { data.settings.margin.top = 30; }, rowPageBreak: 'auto' });
    
    //BENEFICIOS PRIVADOS
    finalY = doc.lastAutoTable.finalY;
    doc.autoTable({ html: '#pdfMiDeclaracion_beneficiosPrivados', margin: { top: 25, bottom:25 }, styles: { fontSize: 8 }, startY: finalY + 10, useCss: true, didDrawPage: function (data) { data.settings.margin.top = 30; }, rowPageBreak: 'auto' });
    
    //FIDEICOMISOS
    finalY = doc.lastAutoTable.finalY;
    doc.autoTable({ html: '#pdfMiDeclaracion_fideicomisos', margin: { top: 25, bottom:25 }, styles: { fontSize: 8 }, startY: finalY + 10, useCss: true, didDrawPage: function (data) { data.settings.margin.top = 30; }, rowPageBreak: 'auto' });    

    //FISCAL TITULO
    finalY = doc.lastAutoTable.finalY;
    doc.autoTable({ html: '#pdfMiDeclaracion_fiscal_titulo', margin: { top: 25, bottom:25 }, styles: { fontSize: 8 }, startY: finalY + 10, useCss: true, didDrawPage: function (data) { data.settings.margin.top = 30; }, rowPageBreak: 'auto' });
       
    //CONSTANCIA FISCAL
    finalY = doc.lastAutoTable.finalY;
    doc.autoTable({ html: '#pdfMiDeclaracion_constanciaFiscal', margin: { top: 25, bottom:25 }, styles: { fontSize: 8 }, startY: finalY + 10, useCss: true, didDrawPage: function (data) { data.settings.margin.top = 30; }, rowPageBreak: 'auto' });    
     
    headeFooter(doc);
    descargar(doc);
}

function gerarPdfDecCompletaINTERESES(){
    var doc = new jspdf();//'p', 'pt', 'letter');
    doc.setProperties({
        title: 'Declaracion de Intereses',
        subject: 'This is the subject',
        author: 'Gobierno del Estado de Chiapas ',
        keywords: 'declaración, patrimonial, intereses, ',
        creator: 'DeclaraFácil PI'
    });

    //var numPaginas =0;
    llenarPDF();

    doc.setFontSize(8);
    //doc.setTextColor(300);
    doc.text('TIPO DE DECLARACIÓN:', 48, 30, {maxWidth: 50, align: "right"});
    doc.text('FORMATO:', 48, 35, {maxWidth: 50, align: "right"});
    doc.text('FECHA DE IMPRESIÓN:', 48, 40, {maxWidth: 50, align: "right"});
    doc.text('ENTE PÚBLICO:', 48, 45, {maxWidth: 50, align: "right"});

    doc.text(jsonResult.captura.tipo_declaracion, 50, 30);
    doc.text(jsonResult.captura.formato, 50, 35);
    doc.text(getDateTime(), 50, 40);
    doc.text(jsonResult.declaracion.situacionPatrimonial.datosEmpleoCargoComision.nombreEntePublico, 50, 45);

    doc.setLineWidth(0.2);
    doc.setDrawColor(140,140,140);
    doc.line(15, 48, 200, 48);

    doc.setFontSize(8);
    doc.text('C. ' + $("input[name='nameContralor']").val().toUpperCase() + ', BAJO PROTESTA DE DECIR VERDAD, PRESENTO A USTED MI DECLARACIÓN DE SITUACIÓN PATRIMONIAL Y DE INTERESES, CONFORME A LO DISPUESTO EN LA LEY GENERAL DE RESPONSABILIDADES ADMINISTRATIVAS, LA LEY GENERAL DEL SISTEMA NACIONAL ANTICORRUPCIÓN Y LA NORMATIVIDAD APLICABLE.', 15, 60, {maxWidth: 180, align: "justify"})
    
    //DATOS GENERALES
    doc.autoTable({ html: '#pdfTitulo1', margin: { top: 25, bottom:0 }, styles: { fontSize: 12 },  startY: 80, useCss: true });  
    finalY = doc.lastAutoTable.finalY;
    doc.autoTable({ html: '#pdfMiDeclaracion_datosGenerales', margin: { top: 0, bottom:25 }, styles: { fontSize: 8 }, startY: finalY + 1, useCss: true });    
    
    //DATOS DEL EMPLEO, CARGO O COMISION.
    finalY = doc.lastAutoTable.finalY;
    doc.autoTable({ html: '#pdfMiDeclaracion_datosEmpleoCargoComision', margin: { top: 25, bottom:25 }, styles: { fontSize: 8 }, startY: finalY + 10, useCss: true, didDrawPage: function (data) { data.settings.margin.top = 30; }, rowPageBreak: 'auto' });   
    finalY = doc.lastAutoTable.finalY;
   /* if(jsonResult.declaracion.situacionPatrimonial.domicilioDeclarante.domicilio =="MX"){
        doc.autoTable({ html: '#pdfMiDeclaracion_datosEmpleoCargoComisionDOMMX', margin: { top: 0, bottom:25 }, styles: { fontSize: 8 }, startY: finalY + 1, useCss: true, didDrawPage: function (data) { data.settings.margin.top = 30; }, rowPageBreak: 'auto'  });
    }
    else{
        doc.autoTable({ html: '#pdfMiDeclaracion_datosEmpleoCargoComisionDOMEXT', margin: { top: 0, bottom:25 }, styles: { fontSize: 8 }, startY: finalY + 1, useCss: true, didDrawPage: function (data) { data.settings.margin.top = 30; }, rowPageBreak: 'auto'  });
    }
*/
    //INTERESES TITULO
    finalY = doc.lastAutoTable.finalY;
    doc.autoTable({ html: '#pdfMiDeclaracion_interes_titulo', margin: { top: 25, bottom:25 }, styles: { fontSize: 8 }, startY: finalY + 10, useCss: true, didDrawPage: function (data) { data.settings.margin.top = 30; }, rowPageBreak: 'auto' });
    
    //PARTICIPACION EMPRESAS
    finalY = doc.lastAutoTable.finalY;
    doc.autoTable({ html: '#pdfMiDeclaracion_participacion', margin: { top: 25, bottom:25 }, styles: { fontSize: 8 }, startY: finalY + 10, useCss: true, didDrawPage: function (data) { data.settings.margin.top = 30; }, rowPageBreak: 'auto' });
    
    //PARTICIPACION INSTITUCIONES
    finalY = doc.lastAutoTable.finalY;
    doc.autoTable({ html: '#pdfMiDeclaracion_participacionTomaDecisiones', margin: { top: 25, bottom:25 }, styles: { fontSize: 8 }, startY: finalY + 10, useCss: true, didDrawPage: function (data) { data.settings.margin.top = 30; }, rowPageBreak: 'auto' });
    
    //APOYOS
    finalY = doc.lastAutoTable.finalY;
    doc.autoTable({ html: '#pdfMiDeclaracion_apoyos', margin: { top: 25, bottom:25 }, styles: { fontSize: 8 }, startY: finalY + 10, useCss: true, didDrawPage: function (data) { data.settings.margin.top = 30; }, rowPageBreak: 'auto' });
    
    //REPRESENTACION
    finalY = doc.lastAutoTable.finalY;
    doc.autoTable({ html: '#pdfMiDeclaracion_representacion', margin: { top: 25, bottom:25 }, styles: { fontSize: 8 }, startY: finalY + 10, useCss: true, didDrawPage: function (data) { data.settings.margin.top = 30; }, rowPageBreak: 'auto' });
    
    //CLIENTES PRINCIPALES
    finalY = doc.lastAutoTable.finalY;
    doc.autoTable({ html: '#pdfMiDeclaracion_clientesPrincipales', margin: { top: 25, bottom:25 }, styles: { fontSize: 8 }, startY: finalY + 10, useCss: true, didDrawPage: function (data) { data.settings.margin.top = 30; }, rowPageBreak: 'auto' });
    
    //BENEFICIOS PRIVADOS
    finalY = doc.lastAutoTable.finalY;
    doc.autoTable({ html: '#pdfMiDeclaracion_beneficiosPrivados', margin: { top: 25, bottom:25 }, styles: { fontSize: 8 }, startY: finalY + 10, useCss: true, didDrawPage: function (data) { data.settings.margin.top = 30; }, rowPageBreak: 'auto' });
    
    //FIDEICOMISOS
    finalY = doc.lastAutoTable.finalY;
    doc.autoTable({ html: '#pdfMiDeclaracion_fideicomisos', margin: { top: 25, bottom:25 }, styles: { fontSize: 8 }, startY: finalY + 10, useCss: true, didDrawPage: function (data) { data.settings.margin.top = 30; }, rowPageBreak: 'auto' });    
    
    headeFooter(doc);
    descargar(doc);
}

//------------------------------------------------------//
function headeFooter(doc){
    let numPaginas =0;
    numPaginas = doc.getNumberOfPages();
    for (var i = 1; i <= numPaginas; i++) {
        doc.setPage(i);
        doc.setFontSize(14);
        //header

        doc.addImage(base64Img, 'PNG', 15, 3, 20, 20)

        doc.text("DeclaraFácil", 105, 10, null, null, "center");
        doc.setFontSize(10);
        doc.text("Sistema de Declaración Patrimonial y de Intereses Portable", 105, 15, null, null, "center");
        //footer
        doc.setFontSize(8);
        var declarante = jsonResult.declaracion.situacionPatrimonial.datosGenerales.nombre + " " + jsonResult.declaracion.situacionPatrimonial.datosGenerales.primerApellido + " " +jsonResult.declaracion.situacionPatrimonial.datosGenerales.segundoApellido;
        doc.setLineWidth(0.2);
        doc.setDrawColor(140,140,140);
        doc.line(15, doc.internal.pageSize.height-13, 60, doc.internal.pageSize.height-13);
        doc.text(declarante, 15, doc.internal.pageSize.height-10, null, null, "left");
        doc.text("Página " + i + " de " + numPaginas, 200, doc.internal.pageSize.height-10, null, null, "right");
    }
}

function descargar(doc){
    let fecha = new Date();    
    //archivo .dec
    jsonResult.captura.version=VERSION; 
    jsonResult.captura.anio = fecha.getFullYear() ;       
    //let text = JSON.stringify(jsonResult);
   // text = btoa(unescape(encodeURIComponent(text)));
    let filename = jsonResult.declaracion.situacionPatrimonial.datosGenerales.curp + "_" + jsonResult.captura.tipo_declaracion + "_" + jsonResult.captura.anio + ".dec";                    
    
    let zip = pako.gzip(JSON.stringify(jsonResult));
    download(filename, zip,"appligation/gzip");

    //archivo .pdf
    filename = jsonResult.declaracion.situacionPatrimonial.datosGenerales.curp + "_" + jsonResult.captura.tipo_declaracion + "_" + fecha.getFullYear() + ".pdf";
    doc.save(filename);
}

//------------------------------------------------------//

function llenarPDF(){
    //GENERALES
    $(".pdfDec_tipo").text(jsonResult.captura.tipo_declaracion);
    $(".pdfDec_formato").text(jsonResult.captura.formato);
    $(".pdfDec_entepub").text(jsonResult.declaracion.situacionPatrimonial.datosEmpleoCargoComision.nombreEntePublico);
    if (jsonResult.captura.tipo_declaracion =="INTERESES"){
        tblDatosGenerales();
       //tblDomicilio();
        tblEmpleo("2. DATOS DEL EMPLEO, CARGO O COMISIÓN");
        /* intereses */
        tblInteresesTitulo();
        tblParticipacionEmpresas();
        tblParticipacionInstituciones();
        tblApoyos();
        tblRepresentacion();
        tblClientes();
        tblBeneficios();
        tblFideicomisos();
        //tblConstanciaFiscal();
    }
    else{
        if(jsonResult.captura.formato =="SIMPLIFICADA"){
            tblDatosGenerales();
            tblDomicilio();
            tblDatosCurriculares();
            tblEmpleo("4. DATOS DEL EMPLEO, CARGO O COMISIÓN");
            tblCV();
            tblIngresos("6. INGRESOS NETOS DEL DECLARANTE, PAREJA Y/O DEPENDIENTES ECONÓMICOS");
            if (jsonResult.captura.tipo_declaracion !="MODIFICACION"){tblDesempenoServidorPublico("7. ¿TE DESEMPEÑASTE COMO SERVIDOR PÚBLICO EL AÑO INMEDIATO ANTERIOR?");}        
            tblConstanciaFiscal();
        }
        else{
            if (jsonResult.captura.tipo_declaracion =="MODIFICACION"){
                tblDatosGenerales();
                tblDomicilio();
                tblDatosCurriculares();
                tblEmpleo("4. DATOS DEL EMPLEO, CARGO O COMISIÓN");
                tblCV();
                tblPareja("6. DATOS DE LA PAREJA");
                tblDependienteEco("7. DATOS DEL DEPENDIENTE ECONÓMICO");
                tblIngresos("8. INGRESOS NETOS DEL DECLARANTE, PAREJA Y/O DEPENDIENTES ECONÓMICOS");
                tblBienesInMuebles("9. BIENES INMUEBLES");
                tblVehiculos("10. VEHÍCULOS");
                tblBienesMuebles("11. BIENES MUEBLES");
                tblInversiones("12. INVERSIONES, CUENTAS BANCARIAS Y OTRO TIPO DE VALORES/ACTIVOS.");
                tblAdeudos("13. ADEUDOS/PASIVOS");
                tblPrestamoOComodato("14. PRÉSTAMO O COMODATO POR TERCEROS");
                /* intereses */
                tblInteresesTitulo();
                tblParticipacionEmpresas();
                tblParticipacionInstituciones();
                tblApoyos();
                tblRepresentacion();
                tblClientes();
                tblBeneficios();
                tblFideicomisos();
                tblConstanciaFiscal();
            }
            else{
                tblDatosGenerales();
                tblDomicilio();
                tblDatosCurriculares();
                tblEmpleo("4. DATOS DEL EMPLEO, CARGO O COMISIÓN");
                tblCV();
                tblPareja("6. DATOS DE LA PAREJA");
                tblDependienteEco("7. DATOS DEL DEPENDIENTE ECONÓMICO");
                tblIngresos("8. INGRESOS NETOS DEL DECLARANTE, PAREJA Y/O DEPENDIENTES ECONÓMICOS");
                tblDesempenoServidorPublico("9. ¿TE DESEMPEÑASTE COMO SERVIDOR PÚBLICO EL AÑO INMEDIATO ANTERIOR?");
                tblBienesInMuebles("10. BIENES INMUEBLES");
                tblVehiculos("11. VEHÍCULOS");
                tblBienesMuebles("12. BIENES MUEBLES");
                tblInversiones("13. INVERSIONES, CUENTAS BANCARIAS Y OTRO TIPO DE VALORES/ACTIVOS.");
                tblAdeudos("14. ADEUDOS/PASIVOS");
                tblPrestamoOComodato("15. PRÉSTAMO O COMODATO POR TERCEROS");
                /* intereses */
                tblInteresesTitulo();
                tblParticipacionEmpresas();
                tblParticipacionInstituciones();
                tblApoyos();
                tblRepresentacion();
                tblClientes();
                tblBeneficios();
                tblFideicomisos();
                tblConstanciaFiscal();
            }    
        } 
    }    
}

//------------------------------------------------------//

function tblDatosGenerales(){
    //DATOS GENERALES
    let nodo = jsonResult.declaracion.situacionPatrimonial.datosGenerales;
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
    $("#pdfMiDeclaracion_datosGenerales .nacionalidad").text(nodo.nacionalidad);
    $("#pdfMiDeclaracion_datosGenerales .aclaracionesObservaciones").text(nodo.aclaracionesObservaciones);
}

function tblDomicilio(){
    //DOMICILIO.
    let nodo = jsonResult.declaracion.situacionPatrimonial.domicilioDeclarante;
    if (nodo.domicilio == "MX"){
        //mexico
        $("#pdfMiDeclaracion_domicilioDeclarante .calle").text(nodo.domicilioMexico.calle);
        $("#pdfMiDeclaracion_domicilioDeclarante .numeroExterior").text(nodo.domicilioMexico.numeroExterior);
        $("#pdfMiDeclaracion_domicilioDeclarante .numeroInterior").text(nodo.domicilioMexico.numeroInterior);
        $("#pdfMiDeclaracion_domicilioDeclarante .coloniaLocalidad").text(nodo.domicilioMexico.coloniaLocalidad);
        $("#pdfMiDeclaracion_domicilioDeclarante .municipioAlcaldia").text(nodo.domicilioMexico.municipioAlcaldia.valor.toUpperCase());
        $("#pdfMiDeclaracion_domicilioDeclarante .entidadFederativa").text(nodo.domicilioMexico.entidadFederativa.valor.toUpperCase());
        $("#pdfMiDeclaracion_domicilioDeclarante .codigoPostal").text(nodo.domicilioMexico.codigoPostal);
        $("#pdfMiDeclaracion_domicilioDeclarante .aclaracionesObservaciones").text(nodo.aclaracionesObservaciones);
    }
    else{
        //extranjero
        $("#pdfMiDeclaracion_domicilioDeclaranteEXT .calle").text(nodo.domicilioExtranjero.calle);
        $("#pdfMiDeclaracion_domicilioDeclaranteEXT .numeroExterior").text(nodo.domicilioExtranjero.numeroExterior);
        $("#pdfMiDeclaracion_domicilioDeclaranteEXT .numeroInterior").text(nodo.domicilioExtranjero.numeroInterior);
        $("#pdfMiDeclaracion_domicilioDeclaranteEXT .ciudadLocalidad").text(nodo.domicilioExtranjero.ciudadLocalidad);
        $("#pdfMiDeclaracion_domicilioDeclaranteEXT .estadoProvincia").text(nodo.domicilioExtranjero.estadoProvincia);
        $("#pdfMiDeclaracion_domicilioDeclaranteEXT .pais").text(nodo.domicilioExtranjero.pais);
        $("#pdfMiDeclaracion_domicilioDeclaranteEXT .codigoPostal").text(nodo.domicilioExtranjero.codigoPostal);
        $("#pdfMiDeclaracion_domicilioDeclaranteEXT .aclaracionesObservaciones").text(nodo.aclaracionesObservaciones);
    }
}

function tblDatosCurriculares(){
    let html="";
     html+='<tr><td colspan="5" style="background-color: #621132; color: #fff; font-size:14px;">3. DATOS CURRICULARES DEL DECLARANTE</td></tr>';
    Object.keys(jsonResult.declaracion.situacionPatrimonial.datosCurricularesDeclarante.escolaridad).forEach(function (index) {
        var nodo = jsonResult.declaracion.situacionPatrimonial.datosCurricularesDeclarante.escolaridad[index];
        html +='    <tr style="background-color: #dee2e6;">\
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
                    </tr>';
    });

    html+=' <tr>\
                <td style="background-color: #dee2e6;" colspan="5">ACLARACIONES / OBSERVACIONES</td>\
            </tr>\
            <tr>\
                <td colspan="5" style="height:80px;">' + jsonResult.declaracion.situacionPatrimonial.datosCurricularesDeclarante.aclaracionesObservaciones + '</td>\
            </tr>';
    $("#pdfMiDeclaracion_datosCurricularesDeclarante>tbody").empty().append(html);
}

function tblEmpleo(titulo){
	$("#tituloTblEmpleo").text(titulo);


    //DATOS DEL EMPLEO, CARGO O COMISIÓN
    let nodo = jsonResult.declaracion.situacionPatrimonial.datosEmpleoCargoComision;
    honorarios = nodo.contratadoPorHonorarios == true ? "SI": "NO";
    $("#pdfMiDeclaracion_datosEmpleoCargoComision .ambitoPublico").text(nodo.ambitoPublico);
    $("#pdfMiDeclaracion_datosEmpleoCargoComision .areaAdscripcion").text(nodo.areaAdscripcion);
    $("#pdfMiDeclaracion_datosEmpleoCargoComision .contratadoPorHonorarios").text(honorarios);
    $("#pdfMiDeclaracion_datosEmpleoCargoComision .empleoCargoComision").text(nodo.empleoCargoComision);
    $("#pdfMiDeclaracion_datosEmpleoCargoComision .fechaTomaPosesion").text(nodo.fechaTomaPosesion);
    $("#pdfMiDeclaracion_datosEmpleoCargoComision .funcionPrincipal").text(nodo.funcionPrincipal);
    $("#pdfMiDeclaracion_datosEmpleoCargoComision .nivelEmpleoCargoComision").text(nodo.nivelEmpleoCargoComision);
    $("#pdfMiDeclaracion_datosEmpleoCargoComision .nivelOrdenGobierno").text(nodo.nivelOrdenGobierno);
    $("#pdfMiDeclaracion_datosEmpleoCargoComision .nombreEntePublico").text(nodo.nombreEntePublico);
    $("#pdfMiDeclaracion_datosEmpleoCargoComision .telefonoOficina").text(nodo.telefonoOficina.telefono + " EXT. " + nodo.telefonoOficina.extension);
    
    if (nodo.domicilio == "MX"){
        //mexico
        $("#pdfMiDeclaracion_datosEmpleoCargoComisionDOMMX .calle").text(nodo.domicilioMexico.calle);
        $("#pdfMiDeclaracion_datosEmpleoCargoComisionDOMMX .numeroExterior").text(nodo.domicilioMexico.numeroExterior);
        $("#pdfMiDeclaracion_datosEmpleoCargoComisionDOMMX .numeroInterior").text(nodo.domicilioMexico.numeroInterior);
        $("#pdfMiDeclaracion_datosEmpleoCargoComisionDOMMX .coloniaLocalidad").text(nodo.domicilioMexico.coloniaLocalidad);
        $("#pdfMiDeclaracion_datosEmpleoCargoComisionDOMMX .municipioAlcaldia").text(nodo.domicilioMexico.municipioAlcaldia.valor.toUpperCase());
        $("#pdfMiDeclaracion_datosEmpleoCargoComisionDOMMX .entidadFederativa").text(nodo.domicilioMexico.entidadFederativa.valor.toUpperCase());
        $("#pdfMiDeclaracion_datosEmpleoCargoComisionDOMMX .codigoPostal").text(nodo.domicilioMexico.codigoPostal);
        $("#pdfMiDeclaracion_datosEmpleoCargoComisionDOMMX .aclaracionesObservaciones").text(nodo.aclaracionesObservaciones);
    }
    else{
        //extranjero
        $("#pdfMiDeclaracion_datosEmpleoCargoComisionDOMEXT .calle").text(nodo.domicilioExtranjero.calle);
        $("#pdfMiDeclaracion_datosEmpleoCargoComisionDOMEXT .numeroExterior").text(nodo.domicilioExtranjero.numeroExterior);
        $("#pdfMiDeclaracion_datosEmpleoCargoComisionDOMEXT .numeroInterior").text(nodo.domicilioExtranjero.numeroInterior);
        $("#pdfMiDeclaracion_datosEmpleoCargoComisionDOMEXT .ciudadLocalidad").text(nodo.domicilioExtranjero.ciudadLocalidad);
        $("#pdfMiDeclaracion_datosEmpleoCargoComisionDOMEXT .estadoProvincia").text(nodo.domicilioExtranjero.estadoProvincia);
        $("#pdfMiDeclaracion_datosEmpleoCargoComisionDOMEXT .pais").text(nodo.domicilioExtranjero.pais.toUpperCase());
        $("#pdfMiDeclaracion_datosEmpleoCargoComisionDOMEXT .codigoPostal").text(nodo.domicilioExtranjero.codigoPostal);
        $("#pdfMiDeclaracion_datosEmpleoCargoComisionDOMEXT .aclaracionesObservaciones").text(nodo.aclaracionesObservaciones);
    }
}

function tblCV(){
    //EXPERIENCIA LABORAL
    let html="";
    html+='<tr><td colspan="3" style="background-color: #621132; color: #fff; font-size:14px;">5. EXPERIENCIA LABORAL</td></tr>';
    if(!jsonResult.declaracion.situacionPatrimonial.experienciaLaboral.ninguno){        
        Object.keys(jsonResult.declaracion.situacionPatrimonial.experienciaLaboral.experiencia).forEach(function (index) {
            var nodo = jsonResult.declaracion.situacionPatrimonial.experienciaLaboral.experiencia[index];

            if (nodo.ambitoSector.clave=="PUB"){
                html +='<tr style="background-color: #dee2e6;">\
                            <td colspan="2">NOMBRE DEL ENTE PÚBLICO</td>\
                            <td>UBICACIÓN</td>\
                        </tr>\
                        <tr>\
                            <td colspan="2">' + nodo.nombreEntePublico + '</td>\
                            <td>' + nodo.ubicacion + '</td>\
                        </tr>\
                        <tr style="background-color: #dee2e6;">\
                            <td style="width: 34%;">ÁMBITO / SECTOR EN EL QUE LABORASTE</td>\
                            <td style="width: 33%;">NIVEL / ORDEN DE GOBIERNO</td>\
                            <td style="width: 33%;">ÁMBITO PÚBLICO</td>\
                        </tr>\
                        <tr>\
                            <td style="width: 34%;">' + nodo.ambitoSector.valor + '</td>\
                            <td style="width: 33%;">' + nodo.nivelOrdenGobierno + '</td>\
                            <td style="width: 33%;">' + nodo.ambitoPublico + '</td>\
                        </tr>\
                        <tr style="background-color: #dee2e6;">\
                            <td style="width: 34%;">EMPLEO, CARGO O COMISIÓN</td>\
                            <td style="width: 33%;">FECHA DE INGRESO</td>\
                            <td style="width: 33%;">FECHA DE EGRESO</td>\
                        </tr>\
                        <tr>\
                            <td style="width: 34%;">' + nodo.empleoCargoComision + '</td>\
                            <td style="width: 33%;">' + nodo.fechaIngreso + '</td>\
                            <td style="width: 33%;">' + nodo.fechaEgreso + '</td>\
                        </tr>\
                        <tr style="background-color: #dee2e6;">\
                            <td style="width: 34%;">ÁREA DE ADSCRIPCIÓN</td>\
                            <td colspan="2">FUNCIÓN PRINCIPAL</td>\
                        </tr>\
                        <tr>\
                            <td style="width: 34%;">' + nodo.areaAdscripcion + '</td>\
                            <td colspan="2">' + nodo.funcionPrincipal + '</td>\
                        </tr>';
            }
            else{
                html +=' <tr style="background-color: #dee2e6;">\
                            <td colspan="3">NOMBRE DE LA EMPRESA, SOCIEDAD O ASOCIACIÓN</td>\
                        </tr>\
                        <tr>\
                            <td colspan="3">' +  nodo.nombreEmpresaSociedadAsociacion + '</td>\
                        </tr>\
                        <tr style="background-color: #dee2e6;">\
                            <td style="width: 34%;">ÁMBITO / SECTOR EN QUE LABORASTE</td>\
                            <td style="width: 33%;">ÁREA DE ADSCRIPCIÓN</td>\
                            <td style="width: 33%;">EMPLEO, CARGO O COMISIÓN/PUESTO</td>\
                        </tr>\
                        <tr>\
                            <td style="width: 34%;">' + nodo.ambitoSector.valor + '</td>\
                            <td style="width: 33%;">' + nodo.area + '</td>\
                            <td style="width: 33%;">' + nodo.puesto + '</td>\
                        </tr>\
                        <tr style="background-color: #dee2e6;">\
                            <td>RFC</td>\
                            <td>FECHA DE INGRESO</td>\
                            <td style="width: 33%;">FECHA DE EGRESO</td>\
                        </tr>\
                        <tr>\
                            <td>' + nodo.rfc + '</td>\
                            <td style="width: 33%;">' + nodo.fechaIngreso + '</td>\
                            <td style="width: 33%;">' + nodo.fechaEgreso + '</td>\
                        </tr>\
                        <tr style="background-color: #dee2e6;">\
                            <td colspan="2">SECTOR AL QUE PERTENECE</td>\
                            <td>UBICACIÓN</td>\
                        </tr>\
                        <tr>\
                            <td colspan="2">' + nodo.sector.valor + '</td>\
                            <td>' + nodo.ubicacion + '</td>\
                        </tr>';
            }
            html+='<tr><td colspan="3" style="background-color: #fff; border:1px solid #fff; color: #fff; font-size:14px;"></td></tr>';
        }); 
        html+= '<tr style="background-color: #dee2e6;"><td colspan="3">ACLARACIONES / OBSERVACIONES</td></tr>\
                <tr>\
                    <td colspan="3">' + jsonResult.declaracion.situacionPatrimonial.experienciaLaboral.aclaracionesObservaciones + '</td>\
                </tr>';       
    }
    else{
        html +='<tr><td colspan="3">NO TENGO INFORMACIÓN QUE REPORTAR.</td></tr>\
                <tr style="background-color: #dee2e6;"><td colspan="3">ACLARACIONES / OBSERVACIONES</td></tr>\
                <tr>\
                    <td colspan="3">' + jsonResult.declaracion.situacionPatrimonial.experienciaLaboral.aclaracionesObservaciones + '</td>\
                </tr>';
    }
    $("#pdfMiDeclaracion_experienciaLaboral>tbody").empty().append(html);
}

function tblPareja(titulo){
    let html="";
    html +='<tr><td colspan="3" style="background-color: #621132; color: #fff; font-size:14px;">' + titulo + '</td></tr>';
    if(!jsonResult.declaracion.situacionPatrimonial.datosPareja.ninguno){
        var nodo = jsonResult.declaracion.situacionPatrimonial.datosPareja;
        let esDependienteEco =  nodo.esDependienteEconomico ? "SI":"NO";
        let ciudadanoExt =  nodo.ciudadanoExtranjero ? "SI":"NO";
        let habita =  nodo.habitaDomicilioDeclarante ? "SI":"NO";

        html+="<tr style='background-color: #dee2e6;'>";
        html+=" <td>NOMBRE(S)</td>";
        html+=" <td>PRIMER APELLIDO</td>";
        html+=" <td>SEGUNDO APELLIDO</td>";
        html+="</tr>";
        html+="<tr>";
        html+=" <td>" + nodo.nombre + "</td>";
        html+=" <td>" + nodo.primerApellido + "</td>";
        html+=" <td>" + nodo.segundoApellido + "</td>";
        html+="</tr>";

        html+="<tr style='background-color: #dee2e6;'>";
        html+=" <td>FECHA DE NACIMIENTO</td>";
        html+=" <td>RFC</td>";
        html+=" <td>CURP</td>";
        html+="</tr>";
        html+="<tr>";
        html+=" <td>" + nodo.fechaNacimiento.split('-')[2] + '/' + nodo.fechaNacimiento.split('-')[1] + '/' +  nodo.fechaNacimiento.split('-')[0]+"</td>";
        html+=" <td>" + nodo.rfc + "</td>";
        html+=" <td>" + nodo.curp + "</td>";
        html+="</tr>";
        
        html+="<tr style='background-color: #dee2e6;'>";
        html+=" <td colspan='3'>RELACIÓN CON EL DECLARANTE</td>";
        html+="</tr>";
        html+="<tr><td colspan='3'>" + nodo.relacionConDeclarante + "</td>";
        
        html+="<tr style='background-color: #dee2e6;'>";
        html+=" <td>¿ES DEPENDIENTE ECONÓMICO?</td>";
        html+=" <td>¿ES CIUDADANO EXTRANJERO?</td>";
        html+=" <td>¿HABITA EN EL DOMICILIO DEL DECLARANTE?</td>";
        html+="</tr>";
        html+="<tr>";
        html+=" <td>" + esDependienteEco + "</td>";
        html+=" <td>" + ciudadanoExt + "</td>";
        html+=" <td>" + habita + "</td>";
        html+="</tr>";

        if (nodo.lugarDondeReside=="MÉXICO"){
            html+='<tr style="background-color: #dee2e6;">\
                        <td style="width: 33%;">CALLE</td>\
                        <td style="width: 33%;">NÚMERO EXTERIOR</td>\
                        <td style="width: 33%;">NÚMERO INTERIOR</td>\
                    </tr>\
                    <tr>\
                        <td class="calle">' + nodo.domicilioMexico.calle + '</td>\
                        <td class="numeroExterior">' + nodo.domicilioMexico.numeroExterior + '</td>\
                        <td class="numeroInterior">' + nodo.domicilioMexico.numeroInterior + '</td>\
                    </tr>\
                    <tr style="background-color: #dee2e6;">\
                        <td>COLONIA / LOCALIDAD</td>\
                        <td>MUNICIPIO / ALCALDÍA</td>\
                        <td>ENTIDAD FEDERATIVA</td>\
                    </tr>\
                    <tr>\
                        <td class="coloniaLocalidad">' + nodo.domicilioMexico.coloniaLocalidad + '</td>\
                        <td class="municipioAlcaldia">' + nodo.domicilioMexico.municipioAlcaldia.valor + '</td>\
                        <td class="entidadFederativa">' + nodo.domicilioMexico.entidadFederativa.valor + '</td>\
                    </tr>\
                    <tr style="background-color: #dee2e6;">\
                        <td colspan="3">CÓDIGO POSTAL</td>\
                    </tr>\
                    <tr>\
                        <td class="codigoPostal" colspan="3" >' + nodo.domicilioMexico.codigoPostal + '</td>\
                    </tr>';
        }
        else{
            html+='<tr style="background-color: #dee2e6;">\
                        <td style="width: 33%;">CALLE</td>\
                        <td style="width: 33%;">NÚMERO EXTERIOR</td>\
                        <td style="width: 33%;">NÚMERO INTERIOR</td>\
                    </tr>\
                    <tr>\
                        <td class="calle">' + nodo.domicilioExtranjero.calle + '</td>\
                        <td class="numeroExterior">' + nodo.domicilioExtranjero.numeroExterior + '</td>\
                        <td class="numeroInterior">' + nodo.domicilioExtranjero.numeroInterior + '</td>\
                    </tr>\
                    <tr style="background-color: #dee2e6;">\
                        <td>CIUDAD / LOCALIDAD</td>\
                        <td>ESTADO / PROVINCIA/PAIS</td>\
                        <td>CÓDIGO POSTAL</td>\
                    </tr>\
                    <tr>\
                        <td class="ciudadLocalidad">' + nodo.domicilioExtranjero.ciudadLocalidad + '</td>\
                        <td class="estadoProvincia">' + nodo.domicilioExtranjero.estadoProvincia + " / " + nodo.domicilioExtranjero.pais + '</td>\
                        <td class="codigoPostal">' + nodo.domicilioExtranjero.codigoPostal + '</td>\
                    </tr>';
        }
        
        if(jsonResult.declaracion.situacionPatrimonial.datosPareja.actividadLaboral.clave=="PUB"){
            let actividadLaboralPareja =jsonResult.declaracion.situacionPatrimonial.datosPareja.actividadLaboralSectorPublico;
            html +="<tr><td colspan='3'>ACTIVIDAD LABORAL</td></tr>";
            html +="<tr><td colspan='3'>" + jsonResult.declaracion.situacionPatrimonial.datosPareja.actividadLaboral.valor + "</td></tr>";
            html +='<tr style="background-color: #dee2e6;">\
                        <td colspan="2">NOMBRE DEL ENTE PÚBLICO</td>\
                        <td>ÁREA DE ADSCRIPCIÓN</td>\
                    </tr>\
                    <tr>\
                        <td colspan="2">' + actividadLaboralPareja.nombreEntePublico + '</td>\
                        <td>' + actividadLaboralPareja.areaAdscripcion + '</td>\
                    </tr>\
                    <tr style="background-color: #dee2e6;">\
                        <td style="width: 34%;">ÁMBITO PÚBLICO</td>\
                        <td style="width: 33%;">NIVEL / ORDEN DE GOBIERNO</td>\
                        <td style="width: 33%;">FECHA DE INGRESO</td>\
                    </tr>\
                    <tr>\
                        <td style="width: 34%;">' + actividadLaboralPareja.ambitoPublico + '</td>\
                        <td style="width: 33%;">' + actividadLaboralPareja.nivelOrdenGobierno + '</td>\
                        <td style="width: 33%;">' + actividadLaboralPareja.fechaIngreso + '</td>\
                    </tr>\
                    <tr style="background-color: #dee2e6;">\
                        <td style="width: 34%;">EMPLEO, CARGO O COMISIÓN</td>\
                        <td style="width: 33%;">FUNCION PRINCIPAL</td>\
                        <td style="width: 33%;">SALARIO MENSUAL NETO</td>\
                    </tr>\
                    <tr>\
                        <td style="width: 34%;">' + actividadLaboralPareja.empleoCargoComision + '</td>\
                        <td style="width: 33%;">' + actividadLaboralPareja.funcionPrincipal + '</td>\
                        <td style="width: 33%;">' + actividadLaboralPareja.salarioMensualNeto.valor + actividadLaboralPareja.salarioMensualNeto.moneda + '</td>\
                    </tr>\
                    <tr style="background-color: #dee2e6;">\
                        <td style="width: 34%;">ÁREA DE ADSCRIPCIÓN</td>\
                        <td colspan="2">FUNCIÓN PRINCIPAL</td>\
                    </tr>\
                    <tr>\
                        <td style="width: 34%;">' + actividadLaboralPareja.areaAdscripcion + '</td>\
                        <td colspan="2">' + actividadLaboralPareja.funcionPrincipal + '</td>\
                    </tr>';
        }
        else{
            let actividadLaboralPareja2 =jsonResult.declaracion.situacionPatrimonial.datosPareja.actividadLaboralSectorPrivadoOtro;
            let provContraGob =  actividadLaboralPareja2.proveedorContratistaGobierno ? "SI":"NO";
            html +="<tr><td colspan='3'>ACTIVIDAD LABORAL</td></tr>";
            html +="<tr><td colspan='3'>" + jsonResult.declaracion.situacionPatrimonial.datosPareja.actividadLaboral.valor + "</td></tr>";
            html +=' <tr style="background-color: #dee2e6;">\
                            <td colspan="2">NOMBRE DE LA EMPRESA, SOCIEDAD O ASOCIACIÓN</td>\
                            <td style="width: 33%;">RFC</td>\
                        </tr>\
                        <tr>\
                            <td colspan="2">' +  actividadLaboralPareja2.nombreEmpresaSociedadAsociacion + '</td>\
                            <td>' +  actividadLaboralPareja2.rfc + '</td>\
                        </tr>\
                        <tr style="background-color: #dee2e6;">\
                            <td style="width: 34%;">ÁMBITO / SECTOR EN QUE LABORASTE</td>\
                            <td style="width: 33%;">EMPLEO O CARGO</td>\
                            <td style="width: 33%;">SALARIO MENSUAL NETO</td>\
                        </tr>\
                        <tr>\
                            <td style="width: 34%;">' + actividadLaboralPareja2.sector.valor + '</td>\
                            <td style="width: 33%;">' + actividadLaboralPareja2.empleoCargoComision + '</td>\
                            <td style="width: 33%;">' + actividadLaboralPareja2.salarioMensualNeto.valor + actividadLaboralPareja2.salarioMensualNeto.moneda + '</td>\
                        </tr>\
                        <tr style="background-color: #dee2e6;">\
                            <td>FECHA DE INGRESO</td>\
                            <td colspan="2" style="width: 33%;">¿ES PROOVEDOR O CONTRATISTA DE GOBIERNO?</td>\
                        </tr>\
                        <tr>\
                            <td>' + actividadLaboralPareja2.fechaIngreso + '</td>\
                            <td style="width: 33%;">' + provContraGob + '</td>\
                        </tr>';
        }

        html +='<tr style="background-color: #dee2e6;"><td colspan="3">ACLARACIONES / OBSERVACIONES</td></tr>\
                <tr>\
                    <td colspan="3">' + jsonResult.declaracion.situacionPatrimonial.datosPareja.aclaracionesObservaciones + '</td>\
                </tr>';
    }
    else{
        html +='<tr><td colspan="3">NO TENGO INFORMACIÓN QUE REPORTAR.</td></tr>\
                <tr style="background-color: #dee2e6;"><td colspan="3">ACLARACIONES / OBSERVACIONES</td></tr>\
                <tr>\
                    <td colspan="3">' + jsonResult.declaracion.situacionPatrimonial.datosPareja.aclaracionesObservaciones + '</td>\
                </tr>';
    }
    $("#pdfMiDeclaracion_datos_pareja>tbody").empty().append(html); 
}

function tblDependienteEco(titulo){
    let html="";
    html +='<tr><td colspan="3" style="background-color: #621132; color: #fff; font-size:14px;">' + titulo + '</td></tr>';
    if(!jsonResult.declaracion.situacionPatrimonial.datosDependienteEconomico.ninguno){
        Object.keys(jsonResult.declaracion.situacionPatrimonial.datosDependienteEconomico.dependienteEconomico).forEach(function (index) {
            var nodo = jsonResult.declaracion.situacionPatrimonial.datosDependienteEconomico.dependienteEconomico[index];     
            let ciudadanoExt =  nodo.extranjero ? "SI":"NO";
            let habita =  nodo.habitaDomicilioDeclarante ? "SI":"NO";
           
            html+="<tr style='background-color: #dee2e6;'>";
            html+=" <td>NOMBRE(S)</td>";
            html+=" <td>PRIMER APELLIDO</td>";
            html+=" <td>SEGUNDO APELLIDO</td>";
            html+="</tr>";
            html+="<tr>";
            html+=" <td>" + nodo.nombre + "</td>";
            html+=" <td>" + nodo.primerApellido + "</td>";
            html+=" <td>" + nodo.segundoApellido + "</td>";
            html+="</tr>";

            html+="<tr style='background-color: #dee2e6;'>";
            html+=" <td>FECHA DE NACIMIENTO</td>";
            html+=" <td>RFC</td>";
            html+=" <td>CURP</td>";
            html+="</tr>";
            html+="<tr>";
            html+=" <td>" + nodo.fechaNacimiento.split('-')[2] + '/' + nodo.fechaNacimiento.split('-')[1] + '/' +  nodo.fechaNacimiento.split('-')[0]+ "</td>";
            html+=" <td>" + nodo.rfc + "</td>";
            html+=" <td>" + nodo.curp + "</td>";
            html+="</tr>";
                
            html+="<tr style='background-color: #dee2e6;'>";
            html+=" <td>PARENTESCO O RELACIÓN CON EL DECLARANTE</td>";
            html+=" <td>¿ES CIUDADANO EXTRANJERO?</td>";
            html+=" <td>¿HABITA EN EL DOMICILIO DEL DECLARANTE?</td>";
            html+="</tr>";
            html+="<tr>";
            html+=" <td>" + nodo.parentescoRelacion.valor + "</td>";
            html+=" <td>" + ciudadanoExt + "</td>";
            html+=" <td>" + habita + "</td>";
            html+="</tr>";

            if (nodo.lugarDondeReside=="MÉXICO"){
                html+='<tr style="background-color: #dee2e6;">\
                            <td style="width: 33%;">CALLE</td>\
                            <td style="width: 33%;">NÚMERO EXTERIOR</td>\
                            <td style="width: 33%;">NÚMERO INTERIOR</td>\
                        </tr>\
                        <tr>\
                            <td class="calle">' + nodo.domicilioMexico.calle + '</td>\
                            <td class="numeroExterior">' + nodo.domicilioMexico.numeroExterior + '</td>\
                            <td class="numeroInterior">' + nodo.domicilioMexico.numeroInterior + '</td>\
                        </tr>\
                        <tr style="background-color: #dee2e6;">\
                            <td>COLONIA/LOCALIDAD</td>\
                            <td>MUNICIPIO/ALCALDÍA</td>\
                            <td>ENTIDAD FEDERATIVA</td>\
                        </tr>\
                        <tr>\
                            <td class="coloniaLocalidad">' + nodo.domicilioMexico.coloniaLocalidad + '</td>\
                            <td class="municipioAlcaldia">' + nodo.domicilioMexico.municipioAlcaldia.valor + '</td>\
                            <td class="entidadFederativa">' + nodo.domicilioMexico.entidadFederativa.valor + '</td>\
                        </tr>\
                        <tr style="background-color: #dee2e6;">\
                            <td colspan="3">CÓDIGO POSTAL</td>\
                        </tr>\
                        <tr>\
                            <td class="codigoPostal" colspan="3" >' + nodo.domicilioMexico.codigoPostal + '</td>\
                        </tr>';
            }
            else if (nodo.lugarDondeReside=="EXTRANJERO"){
                html+='<tr style="background-color: #dee2e6;">\
                            <td style="width: 33%;">CALLE</td>\
                            <td style="width: 33%;">NÚMERO EXTERIOR</td>\
                            <td style="width: 33%;">NÚMERO INTERIOR</td>\
                        </tr>\
                        <tr>\
                            <td class="calle">' + nodo.domicilioExtranjero.calle + '</td>\
                            <td class="numeroExterior">' + nodo.domicilioExtranjero.numeroExterior + '</td>\
                            <td class="numeroInterior">' + nodo.domicilioExtranjero.numeroInterior + '</td>\
                        </tr>\
                        <tr style="background-color: #dee2e6;">\
                            <td>CIUDAD/LOCALIDAD</td>\
                            <td>ESTADO/PROVINCIA/PAIS</td>\
                            <td>CÓDIGO POSTAL</td>\
                        </tr>\
                        <tr>\
                            <td class="ciudadLocalidad">' + nodo.domicilioExtranjero.ciudadLocalidad + '</td>\
                            <td class="estadoProvincia">' + nodo.domicilioExtranjero.estadoProvincia + " / " + nodo.domicilioExtranjero.pais + '</td>\
                            <td class="codigoPostal">' + nodo.domicilioExtranjero.codigoPostal + '</td>\
                        </tr>';
            }

            if(nodo.actividadLaboral.clave=="PUB"){
                let actividadLaboralDependiente = nodo.actividadLaboralSectorPublico;
                html +="<tr><td colspan='3'>ACTIVIDAD LABORAL</td></tr>";
                html +="<tr><td colspan='3'>" + nodo.actividadLaboral.valor + "</td></tr>";
                html +='<tr style="background-color: #dee2e6;">\
                            <td colspan="2">NOMBRE DEL ENTE PÚBLICO</td>\
                            <td>ÁREA DE ADSCRIPCIÓN</td>\
                        </tr>\
                        <tr>\
                            <td colspan="2">' + actividadLaboralDependiente.nombreEntePublico + '</td>\
                            <td>' + actividadLaboralDependiente.areaAdscripcion + '</td>\
                        </tr>\
                        <tr style="background-color: #dee2e6;">\
                            <td style="width: 34%;">ÁMBITO PÚBLICO</td>\
                            <td style="width: 33%;">NIVEL / ORDEN DE GOBIERNO</td>\
                            <td style="width: 33%;">FECHA DE INGRESO</td>\
                        </tr>\
                        <tr>\
                            <td style="width: 34%;">' + actividadLaboralDependiente.ambitoPublico + '</td>\
                            <td style="width: 33%;">' + actividadLaboralDependiente.nivelOrdenGobierno + '</td>\
                            <td style="width: 33%;">' + actividadLaboralDependiente.fechaIngreso + '</td>\
                        </tr>\
                        <tr style="background-color: #dee2e6;">\
                            <td style="width: 34%;">EMPLEO, CARGO O COMISIÓN</td>\
                            <td style="width: 33%;">FUNCION PRINCIPAL</td>\
                            <td style="width: 33%;">SALARIO MENSUAL NETO</td>\
                        </tr>\
                        <tr>\
                            <td style="width: 34%;">' + actividadLaboralDependiente.empleoCargoComision + '</td>\
                            <td style="width: 33%;">' + actividadLaboralDependiente.funcionPrincipal + '</td>\
                            <td style="width: 33%;">' + actividadLaboralDependiente.salarioMensualNeto.valor + actividadLaboralDependiente.salarioMensualNeto.moneda + '</td>\
                        </tr>\
                        <tr style="background-color: #dee2e6;">\
                            <td style="width: 34%;">ÁREA DE ADSCRIPCIÓN</td>\
                            <td colspan="2">FUNCIÓN PRINCIPAL</td>\
                        </tr>\
                        <tr>\
                            <td style="width: 34%;">' + actividadLaboralDependiente.areaAdscripcion + '</td>\
                            <td colspan="2">' + actividadLaboralDependiente.funcionPrincipal + '</td>\
                        </tr>';
            }
            else{
                let actividadLaboralDependiente2 =nodo.actividadLaboralSectorPrivadoOtro;
                let provContraGob =  actividadLaboralDependiente2.proveedorContratistaGobierno ? "SI":"NO";
                html +="<tr><td colspan='3'>ACTIVIDAD LABORAL</td></tr>";
                html +="<tr><td colspan='3'>" + nodo.actividadLaboral.valor + "</td></tr>";
                html +='<tr style="background-color: #dee2e6;">\
                                <td colspan="2">NOMBRE DE LA EMPRESA, SOCIEDAD O ASOCIACIÓN</td>\
                                <td style="width: 33%;">RFC</td>\
                            </tr>\
                            <tr>\
                                <td colspan="2">' +  actividadLaboralDependiente2.nombreEmpresaSociedadAsociacion + '</td>\
                                <td>' +  actividadLaboralDependiente2.rfc + '</td>\
                            </tr>\
                            <tr style="background-color: #dee2e6;">\
                                <td style="width: 34%;">FECHA DE INGRESO</td>\
                                <td style="width: 33%;">EMPLEO O CARGO</td>\
                                <td style="width: 33%;">SALARIO MENSUAL NETO</td>\
                            </tr>\
                            <tr>\
                                <td style="width: 34%;">' + actividadLaboralDependiente2.fechaIngreso + '</td>\
                                <td style="width: 33%;">' + actividadLaboralDependiente2.empleoCargo + '</td>\
                                <td style="width: 33%;">' + actividadLaboralDependiente2.salarioMensualNeto.valor + actividadLaboralDependiente2.salarioMensualNeto.moneda + '</td>\
                            </tr>';
            }
        });
        html +='<tr style="background-color: #dee2e6;"><td colspan="3">ACLARACIONES / OBSERVACIONES</td></tr>\
                <tr>\
                    <td colspan="3">' + jsonResult.declaracion.situacionPatrimonial.datosDependienteEconomico.aclaracionesObservaciones + '</td>\
                </tr>';
    }
    else{
        html +='<tr><td colspan="3">NO TENGO INFORMACIÓN QUE REPORTAR.</td></tr>\
                <tr style="background-color: #dee2e6;"><td colspan="3">ACLARACIONES / OBSERVACIONES</td></tr>\
                <tr>\
                    <td colspan="3">' + jsonResult.declaracion.situacionPatrimonial.datosDependienteEconomico.aclaracionesObservaciones + '</td>\
                </tr>';
    }
    $("#pdfMiDeclaracion_datos_dependiente_eco>tbody").empty().append(html); 
}

function tblIngresos(titulo){
    let nodoIngresos = jsonResult.declaracion.situacionPatrimonial.ingresos
    let html="", remuneracionCargoPublico="", remuneracionCargoPublicoMoneda="", otrosIngresosTotal="", otrosIngresosTotalMoneda="";
    let ingresoNetoDeclarante ="",ingresoNetoDeclaranteMoneda="",ingresoNetoParejaDependiente="", ingresoNetoParejaDependienteMoneda="", totalIngresosNetos="", totalIngresosNetosMoneda="";
    let label1="", label2="",label3="",label4="",label5="",label6="";

    switch(jsonResult.captura.tipo_declaracion){
        case "INICIAL":               
            label1 = "I.- REMUNERACIÓN MENSUAL NETA DEL DECLARANTE POR SU CARGO PÚBLICO (POR CONCEPTO DE SUELDOS, HONORARIOS, COMPENSACIONES, BONOS Y OTRAS PRESTACIONES)(CANTIDADES NETAS DESPUÉS DE IMPUESTOS)";
            label2 = "II.- OTROS INGRESOS MENSUALES DEL DECLARANTE (SUMA DEL II.1 AL II.4)";
            label3 = "A.- INGRESO MENSUAL NETO DEL DECLARANTE (SUMA DEL NUMERAL I Y II)";
            label4 = "B.- INGRESO MENSUAL DE LA PAREJA Y/O DEPENDIENTES ECONÓMICOS (DESPUÉS DE IMPUESTOS)";
            label5 = "C.- TOTAL DE INGRESOS MENSUALES NETOS PERCIBIDOS POR EL DECLARANTE, PAREJA Y/O DEPENDIENTES ECONÓMICOS (SUMA DE LOS APARTADOS A Y B)";
            label6 = "II.4.- OTROS INGRESOS NO CONSIDERADOS A LOS ANTERIORES (DESPUÉS DE IMPUESTOS)";

            remuneracionCargoPublico = format(nodoIngresos.remuneracionMensualCargoPublico.valor);
            remuneracionCargoPublicoMoneda = nodoIngresos.remuneracionMensualCargoPublico.moneda;
            otrosIngresosTotal = format(nodoIngresos.otrosIngresosMensualesTotal.valor);
            otrosIngresosTotalMoneda =  nodoIngresos.otrosIngresosMensualesTotal.moneda;
            
            ingresoNetoDeclarante = format(nodoIngresos.ingresoMensualNetoDeclarante.valor);
            ingresoNetoDeclaranteMoneda = nodoIngresos.ingresoMensualNetoDeclarante.moneda;
            ingresoNetoParejaDependiente = format(nodoIngresos.ingresoMensualNetoParejaDependiente.valor);
            ingresoNetoParejaDependienteMoneda = nodoIngresos.ingresoMensualNetoParejaDependiente.moneda;
            totalIngresosNetos = format(nodoIngresos.totalIngresosMensualesNetos.valor);
            totalIngresosNetosMoneda = nodoIngresos.totalIngresosMensualesNetos.moneda;

            break;
        case "MODIFICACION":
            label1 = "I.- REMUNERACIÓN ANUAL NETA DEL DECLARANTE POR SU CARGO PÚBLICO (POR CONCEPTO DE SUELDOS, HONORARIOS, COMPENSACIONES, BONOS, AGUINALDOS Y OTRAS PRESTACIONES) (CANTIDADES NETAS DESPUÉS DE IMPUESTOS)";
            label2 = "II.- OTROS INGRESOS DEL DECLARANTE (SUMA DEL II.1 AL II.5)";
            label3 = "A.- INGRESO ANUAL NETO DEL DECLARANTE (SUMA DEL NUMERAL I Y II)";
            label4 = "B.- INGRESO ANUAL NETO DE LA PAREJA Y / O DEPENDIENTES ECONÓMICOS (DESPUÉS DE IMPUESTOS";
            label5 = "C.- TOTAL DE INGRESOS ANUALES NETOS PERCIBIDOS POR EL DECLARANTE, PAREJA Y / O DEPENDIENTES ECONÓMICOS (SUMA DE LOS APARTADOS A Y B)";
            label6 = "II.5 - OTROS INGRESOS NO CONSIDERADOS ANTERIORMENTE (DESPUÉS DE IMPUESTOS)";

            remuneracionCargoPublico = format(nodoIngresos.remuneracionAnualCargoPublico.valor);
            remuneracionCargoPublicoMoneda = nodoIngresos.remuneracionAnualCargoPublico.moneda;
            otrosIngresosTotal = format(nodoIngresos.otrosIngresosAnualesTotal.valor);
            otrosIngresosTotalMoneda =  nodoIngresos.otrosIngresosAnualesTotal.moneda;

            ingresoNetoDeclarante = format(nodoIngresos.ingresoAnualNetoDeclarante.valor);
            ingresoNetoDeclaranteMoneda = nodoIngresos.ingresoAnualNetoDeclarante.moneda;
            ingresoNetoParejaDependiente = format(nodoIngresos.ingresoAnualNetoParejaDependiente.valor);
            ingresoNetoParejaDependienteMoneda = nodoIngresos.ingresoAnualNetoParejaDependiente.moneda;
            totalIngresosNetos = format(nodoIngresos.totalIngresosAnualesNetos.valor);
            totalIngresosNetosMoneda = nodoIngresos.totalIngresosAnualesNetos.moneda;

            break;
        case "CONCLUSION":
            label1 = "I.- REMUNERACIÓN NETA DEL AÑO EN CURSO A LA FECHA DE CONCLUSIÓN DEL EMPLEO, CARGO O COMISIÓN DEL DECLARANTE POR SU CARGO PÚBLICO (POR CONCEPTO DE SUELDOS, HONORARIOS, COMPENSACIONES, BONOS Y OTRAS PRESTACIONES) (CANTIDADES NETAS DESPUÉS DE IMPUESTOS)";
            label2 = "II.- OTROS INGRESOS DEL DECLARANTE (SUMA DEL II.1 AL II.5)";
            label3 = "A.- INGRESOS DEL DECLARANTE DEL AÑO EN CURSO A LA FECHA DE CONCLUSIÓN DEL EMPLEO, CARGO O COMISIÓN(SUMA DEL NUMERAL I Y II)";
            label4 = "B.- INGRESOS DEL AÑO EN CURSO A LA FECHA DE CONCLUSIÓN DEL EMPLEO, CARGO O COMISIÓN DE LA PAREJA Y / O DEPENDIENTES ECONÓMICOS (DESPUÉS DE IMPUESTOS)";
            label5 = "C.- TOTAL DE INGRESOS NETOS DEL AÑO EN CURSO A LA FECHA DE CONCLUSIÓN DEL EMPLEO, CARGO O COMISIÓN PERCIBIDOS POR EL DECLARANTE, PAREJA Y / O DEPENDIENTES ECONÓMICOS (SUMA DE LOS APARTADOS A Y B)";
            label6 = "II.5 - OTROS INGRESOS NO CONSIDERADOS A LOS ANTERIORES (DESPUÉS DE IMPUESTOS)";

            remuneracionCargoPublico = format(nodoIngresos.remuneracionConclusionCargoPublico.valor);
            remuneracionCargoPublicoMoneda = nodoIngresos.remuneracionConclusionCargoPublico.moneda;
            otrosIngresosTotal = format(nodoIngresos.otrosIngresosConclusionTotal.valor);
            otrosIngresosTotalMoneda =  nodoIngresos.otrosIngresosConclusionTotal.moneda;

            ingresoNetoDeclarante = format(nodoIngresos.ingresoConclusionNetoDeclarante.valor);
            ingresoNetoDeclaranteMoneda = nodoIngresos.ingresoConclusionNetoDeclarante.moneda;
            ingresoNetoParejaDependiente = format(nodoIngresos.ingresoConclusionNetoParejaDependiente.valor);
            ingresoNetoParejaDependienteMoneda = nodoIngresos.ingresoConclusionNetoParejaDependiente.moneda;
            totalIngresosNetos = format(nodoIngresos.totalIngresosConclusionNetos.valor);
            totalIngresosNetosMoneda = nodoIngresos.totalIngresosConclusionNetos.moneda;

            break;
    }
    
    html +='<tr><td colspan="2" style="background-color: #621132; color: #fff; font-size:14px;">' + titulo + '</td></tr>';

    html +='<tr>\
                <td style="background-color: #dee2e6;">' + label1 + '</td>\
                <td style="text-align: right;">' + remuneracionCargoPublico + " " + remuneracionCargoPublicoMoneda +'</td>\
            </tr>\
            <tr>\
                <td style="background-color: #dee2e6;">' + label2 + '</td>\
                <td style="text-align: right;">' + otrosIngresosTotal + " " + otrosIngresosTotalMoneda + '</td>\
            </tr>\
            <tr style="background-color: #dee2e6;">\
                <td style="">II.1.- POR ACTIVIDAD INDUSTRIAL, COMERCIAL Y/O EMPRESARIAL (DESPUÉS DE IMPUESTOS)</td>\
                <td style="text-align: right;">' + format(nodoIngresos.actividadIndustialComercialEmpresarial.remuneracionTotal.valor) + " " + nodoIngresos.actividadIndustialComercialEmpresarial.remuneracionTotal.moneda + '</td>\
            </tr>';


    Object.keys(nodoIngresos.actividadIndustialComercialEmpresarial.actividades).forEach(function (index) {
        let nodo = nodoIngresos.actividadIndustialComercialEmpresarial.actividades[index];
        html +='<tr>\
                    <td style="">' + nodo.tipoNegocio + ' | ' + nodo.nombreRazonSocial+ '</td>\
                    <td style="text-align: right;">' + format(nodo.remuneracion.valor) + " " + nodo.remuneracion.moneda +'</td>\
                </tr>';
    });

    html +='<tr style="background-color: #dee2e6;">\
                <td style="">II.2.- POR ACTIVIDAD FINANCIERA (RENDIMIENTOS O GANANCIAS) (DESPUÉS DE IMPUESTOS)</td>\
                <td style="text-align: right;">' + format(nodoIngresos.actividadFinanciera.remuneracionTotal.valor) + " " + nodoIngresos.actividadFinanciera.remuneracionTotal.moneda + '</td>\
            </tr>';

    Object.keys(nodoIngresos.actividadFinanciera.actividades).forEach(function (index) {
        let nodo = nodoIngresos.actividadFinanciera.actividades[index];
        html +='<tr>\
                    <td style="">' + nodo.tipoInstrumento.valor + '</td>\
                    <td style="text-align: right;">' + format(nodo.remuneracion.valor) + " " + nodo.remuneracion.moneda +'</td>\
                </tr>';
    });

    html +='<tr style="background-color: #dee2e6;">\
                <td style="">II.3.- POR SERVICIOS PROFESIONALES, CONSEJOS, CONSULTORÍAS Y/O ASESORÍAS (DESPUÉS DE IMPUESTOS)</td>\
                <td style="text-align: right;">' + format(nodoIngresos.serviciosProfesionales.remuneracionTotal.valor) + " " + nodoIngresos.serviciosProfesionales.remuneracionTotal.moneda + '</td>\
            </tr>';

    Object.keys(nodoIngresos.serviciosProfesionales.servicios).forEach(function (index) {
        let nodo = nodoIngresos.serviciosProfesionales.servicios[index];
        html +='<tr>\
                    <td style="">' + nodo.tipoServicio + '</td>\
                    <td style="text-align: right;">' + format(nodo.remuneracion.valor) + " " + nodo.remuneracion.moneda +'</td>\
                </tr>';
    });

    

    switch(jsonResult.captura.tipo_declaracion){        
        case "INICIAL": 
            html +='<tr style="background-color: #dee2e6;">\
                        <td style="">' + label6 + '</td>\
                        <td style="text-align: right;">' + format(nodoIngresos.otrosIngresos.remuneracionTotal.valor) + " " + nodoIngresos.otrosIngresos.remuneracionTotal.moneda + '</td>\
                    </tr>';

            Object.keys(nodoIngresos.otrosIngresos.ingresos).forEach(function (index) {
                let nodo = nodoIngresos.otrosIngresos.ingresos[index];
                html +='<tr>\
                            <td style="">' + nodo.tipoIngreso + '</td>\
                            <td style="text-align: right;">' + format(nodo.remuneracion.valor) + " " + nodo.remuneracion.moneda +'</td>\
                        </tr>';
            });                     
        break;
        case "MODIFICACION": 
            html +='<tr style="background-color: #dee2e6;">\
                        <td style="">II.4.- POR ENAJENACIÓN DE BIENES (DESPUÉS DE IMPUESTOS)</td>\
                        <td style="text-align: right;">' + format(nodoIngresos.enajenacionBienes.remuneracionTotal.valor) + " " + nodoIngresos.enajenacionBienes.remuneracionTotal.moneda + '</td>\
                    </tr>';

            Object.keys(nodoIngresos.enajenacionBienes.bienes).forEach(function (index) {
                let subNodo = nodoIngresos.enajenacionBienes.bienes[index];
                html +='<tr>\
                            <td style="">' + subNodo.tipoBienEnajenado + '</td>\
                            <td style="text-align: right;">' + format(subNodo.remuneracion.valor) + " " + subNodo.remuneracion.moneda +'</td>\
                        </tr>';
            });

            html +='<tr style="background-color: #dee2e6;">\
                        <td style="">' + label6 + '</td>\
                        <td style="text-align: right;">' + format(nodoIngresos.otrosIngresos.remuneracionTotal.valor) + " " + nodoIngresos.otrosIngresos.remuneracionTotal.moneda + '</td>\
                    </tr>';  

            Object.keys(nodoIngresos.otrosIngresos.ingresos).forEach(function (index) {
                let nodo = nodoIngresos.otrosIngresos.ingresos[index];
                html +='<tr>\
                            <td style="">' + nodo.tipoIngreso + '</td>\
                            <td style="text-align: right;">' + format(nodo.remuneracion.valor) + " " + nodo.remuneracion.moneda +'</td>\
                        </tr>';
            });                          
        break;
        case "CONCLUSION": 
            html +='<tr style="background-color: #dee2e6;">\
                        <td style="">II.4.- POR ENAJENACIÓN DE BIENES (DESPUÉS DE IMPUESTOS)</td>\
                        <td style="text-align: right;">' + format(nodoIngresos.enajenacionBienes.remuneracionTotal.valor) + " " + nodoIngresos.enajenacionBienes.remuneracionTotal.moneda + '</td>\
                    </tr>';

            Object.keys(nodoIngresos.enajenacionBienes.bienes).forEach(function (index) {
                let subNodo = nodoIngresos.enajenacionBienes.bienes[index];
                html +='<tr>\
                            <td style="">' + subNodo.tipoBienEnajenado + '</td>\
                            <td style="text-align: right;">' + format(subNodo.remuneracion.valor) + " " + subNodo.remuneracion.moneda +'</td>\
                        </tr>';
            });

            html +='<tr style="background-color: #dee2e6;">\
                        <td style="">' + label6 + '</td>\
                        <td style="text-align: right;">' + format(nodoIngresos.otrosIngresos.remuneracionTotal.valor) + " " + nodoIngresos.otrosIngresos.remuneracionTotal.moneda + '</td>\
                    </tr>';  

            Object.keys(nodoIngresos.otrosIngresos.ingresos).forEach(function (index) {
                let nodo = nodoIngresos.otrosIngresos.ingresos[index];
                html +='<tr>\
                            <td style="">' + nodo.tipoIngreso + '</td>\
                            <td style="text-align: right;">' + format(nodo.remuneracion.valor) + " " + nodo.remuneracion.moneda +'</td>\
                        </tr>';
            });                              
        break;
    }
       
    html +='<tr>\
                <td style="background-color: #dee2e6;">' + label3 + '</td>\
                <td style="text-align: right;">' + ingresoNetoDeclarante + " " + ingresoNetoDeclaranteMoneda +'</td>\
            </tr>\
            <tr>\
                <td style="background-color: #dee2e6;">' + label4 + '</td>\
                <td style="text-align: right;">' + ingresoNetoParejaDependiente + " " + ingresoNetoParejaDependienteMoneda + '</td>\
            </tr>\
            <tr>\
                <td style="background-color: #dee2e6;">' + label5 + '</td>\
                <td style="text-align: right;">' + totalIngresosNetos + " " + totalIngresosNetosMoneda + '</td>\
            </tr>';   
            
    html += '<tr style="background-color: #dee2e6;"><td colspan="2">ACLARACIONES / OBSERVACIONES</td></tr>\
            <tr>\
                <td colspan="2">' + nodoIngresos.aclaracionesObservaciones + '</td>\
            </tr>';
    
    $("#pdfMiDeclaracion_ingresos>tbody").empty().append(html);
}

function tblDesempenoServidorPublico(titulo){
    let nodo = jsonResult.declaracion.situacionPatrimonial.actividadAnualAnterior
    let html="";
    html +='<tr><td colspan="2" style="background-color: #621132; color: #fff; font-size:14px;">' + titulo + '</td></tr>';
    if(jsonResult.declaracion.situacionPatrimonial.actividadAnualAnterior.servidorPublicoAnioAnterior){
    	html +='<tr>\
                    <td style="background-color: #dee2e6;">FECHA DE INICIO</td>\
                    <td style="background-color: #dee2e6;">FECHA DE CONCLUSIÓN</td>\
                </tr>\
                <tr>\
                    <td style="text-align: center;">' + nodo.fechaIngreso + '</td>\
                    <td style="text-align: center;">' + nodo.fechaConclusion + '</td>\
                </tr>';
        html +='<tr>\
                    <td style="background-color: #dee2e6;">I.- REMUNERACIÓN NETA DEL DECLARANTE, RECIBIDA DURANTE EL TIEMPO EN EL QUE SE DESEMPEÑÓ COMO SERVIDOR PÚBLICO EN EL AÑO INMEDIATO ANTERIOR (POR CONCEPTO DE SUELDOS, HONORARIOS, COMPENSACIONES, BONOS, AGUINALDOS Y OTRAS PRESTACIONES) (CANTIDADES NETAS DESPUÉS DE IMPUESTOS)</td>\
                    <td style="text-align: right;">' + format(nodo.remuneracionNetaCargoPublico.valor) + " " + nodo.remuneracionNetaCargoPublico.moneda +'</td>\
                </tr>\
                <tr>\
                    <td style="background-color: #dee2e6;">II.- OTROS INGRESOS MENSUALES DEL DECLARANTE (SUMA DEL II.1 AL II.5)</td>\
                    <td style="text-align: right;">' + format(nodo.otrosIngresosTotal.valor) + " " + nodo.otrosIngresosTotal.moneda + '</td>\
                </tr>\
                <tr style="background-color: #dee2e6;">\
                    <td style="">II.1.- POR ACTIVIDAD INDUSTRIAL, COMERCIAL Y/O EMPRESARIAL (DESPUÉS DE IMPUESTOS)</td>\
                    <td style="text-align: right;">' + format(nodo.actividadIndustialComercialEmpresarial.remuneracionTotal.valor) + " " + nodo.actividadIndustialComercialEmpresarial.remuneracionTotal.moneda + '</td>\
                </tr>';

        Object.keys(nodo.actividadIndustialComercialEmpresarial.actividades).forEach(function (index) {
            let subNodo = nodo.actividadIndustialComercialEmpresarial.actividades[index];
            html +='<tr>\
                        <td style="">' + subNodo.tipoNegocio + ' | ' + subNodo.nombreRazonSocial+ '</td>\
                        <td style="text-align: right;">' + format(subNodo.remuneracion.valor) + " " + subNodo.remuneracion.moneda +'</td>\
                    </tr>';
        });

        html +='<tr style="background-color: #dee2e6;">\
                    <td style="">II.2.- POR ACTIVIDAD FINANCIERA (RENDIMIENTOS O GANANCIAS) (DESPUÉS DE IMPUESTOS)</td>\
                    <td style="text-align: right;">' + format(nodo.actividadFinanciera.remuneracionTotal.valor) + " " + nodo.actividadFinanciera.remuneracionTotal.moneda + '</td>\
                </tr>';

        Object.keys(nodo.actividadFinanciera.actividades).forEach(function (index) {
            let subNodo = nodo.actividadFinanciera.actividades[index];
            html +='<tr>\
                        <td style="">' + subNodo.tipoInstrumento.valor + '</td>\
                        <td style="text-align: right;">' + format(subNodo.remuneracion.valor) + " " + subNodo.remuneracion.moneda +'</td>\
                    </tr>';
        });

        html +='<tr style="background-color: #dee2e6;">\
                    <td style="">II.3.- POR SERVICIOS PROFESIONALES, CONSEJOS, CONSULTORÍAS Y/O ASESORÍAS (DESPUÉS DE IMPUESTOS)</td>\
                    <td style="text-align: right;">' + format(nodo.serviciosProfesionales.remuneracionTotal.valor) + " " + nodo.serviciosProfesionales.remuneracionTotal.moneda + '</td>\
                </tr>';

        Object.keys(nodo.serviciosProfesionales.servicios).forEach(function (index) {
            let subNodo = nodo.serviciosProfesionales.servicios[index];
            html +='<tr>\
                        <td style="">' + subNodo.tipoServicio + '</td>\
                        <td style="text-align: right;">' + format(subNodo.remuneracion.valor) + " " + subNodo.remuneracion.moneda +'</td>\
                    </tr>';
        });

        html +='<tr style="background-color: #dee2e6;">\
                    <td style="">II.4.- POR ENAJENACIÓN DE BIENES (DESPUÉS DE IMPUESTOS)</td>\
                    <td style="text-align: right;">' + format(nodo.enajenacionBienes.remuneracionTotal.valor) + " " + nodo.enajenacionBienes.remuneracionTotal.moneda + '</td>\
                </tr>';

        Object.keys(nodo.enajenacionBienes.bienes).forEach(function (index) {
            let subNodo = nodo.enajenacionBienes.bienes[index];
            html +='<tr>\
                        <td style="">' + subNodo.tipoBienEnajenado + '</td>\
                        <td style="text-align: right;">' + format(subNodo.remuneracion.valor) + " " + subNodo.remuneracion.moneda +'</td>\
                    </tr>';
        });

        html +='<tr style="background-color: #dee2e6;">\
                    <td style="">II.5.- OTROS INGRESOS NO CONSIDERADOS A LOS ANTERIORES (DESPUÉS DE IMPUESTOS)</td>\
                    <td style="text-align: right;">' + format(nodo.otrosIngresos.remuneracionTotal.valor) + " " + nodo.otrosIngresos.remuneracionTotal.moneda + '</td>\
                </tr>';

        Object.keys(nodo.otrosIngresos.ingresos).forEach(function (index) {
            let subNodo = nodo.otrosIngresos.ingresos[index];
            html +='<tr>\
                        <td style="">' + subNodo.tipoIngreso + '</td>\
                        <td style="text-align: right;">' + format(subNodo.remuneracion.valor) + " " + subNodo.remuneracion.moneda +'</td>\
                    </tr>';
        });    

        html +='<tr>\
                    <td style="background-color: #dee2e6;">A.- INGRESO MENSUAL NETO DEL DECLARANTE (SUMA DEL NUMERAL I Y II)</td>\
                    <td style="text-align: right;">' + format(nodo.ingresoNetoAnualDeclarante.valor) + " " + nodo.ingresoNetoAnualDeclarante.moneda +'</td>\
                </tr>\
                <tr>\
                    <td style="background-color: #dee2e6;">B.- INGRESO MENSUAL DE LA PAREJA Y/O DEPENDIENTES ECONÓMICOS (DESPUÉS DE IMPUESTOS)</td>\
                    <td style="text-align: right;">' + format(nodo.ingresoNetoAnualParejaDependiente.valor) + " " + nodo.ingresoNetoAnualParejaDependiente.moneda + '</td>\
                </tr>\
                <tr>\
                    <td style="background-color: #dee2e6;">C.- TOTAL DE INGRESOS MENSUALES NETOS PERCIBIDOS POR EL DECLARANTE, PAREJA Y/O DEPENDIENTES ECONÓMICOS (SUMA DE LOS APARTADOS A Y B)</td>\
                    <td style="text-align: right;">' + format(nodo.totalIngresosNetosAnuales.valor) + " " + nodo.totalIngresosNetosAnuales.moneda + '</td>\
                </tr>';   
                
        html += '<tr style="background-color: #dee2e6;"><td colspan="2">ACLARACIONES / OBSERVACIONES</td></tr>\
                <tr>\
                    <td colspan="2">' + nodo.aclaracionesObservaciones + '</td>\
                </tr>';
    }
    else{
        html +='<tr><td colspan="2">NO TENGO INFORMACIÓN QUE REPORTAR.</td></tr>\
                <tr style="background-color: #dee2e6;"><td colspan="2">ACLARACIONES / OBSERVACIONES</td></tr>\
                <tr>\
                    <td colspan="2">' + jsonResult.declaracion.situacionPatrimonial.actividadAnualAnterior.aclaracionesObservaciones + '</td>\
                </tr>';
            }
    $("#pdfMiDeclaracion_desempenoServidorPublico>tbody").empty().append(html);
}

function tblBienesInMuebles(titulo){
    let html="";
    html +='<tr><td colspan="3" style="background-color: #621132; color: #fff; font-size:14px;">' + titulo + '</td></tr>';
    if(!jsonResult.declaracion.situacionPatrimonial.bienesInmuebles.ninguno){
        Object.keys(jsonResult.declaracion.situacionPatrimonial.bienesInmuebles.bienInmueble).forEach(function (index) {
            var nodo = jsonResult.declaracion.situacionPatrimonial.bienesInmuebles.bienInmueble[index];
            let titulares="";

            $(nodo.titular).each(function(index, item) { titulares+= item.valor + ","; });

            html+="<tr style='background-color: #dee2e6;'>";
            html+=" <td>TITULAR DEL BIEN</td>";
            html+=" <td colspan='2'>TIPO DEL BIEN</td>";
            html+="</tr>";
            html+="<tr>";
            html+=" <td>" + titulares.slice(0, -1) + "</td>";
            html+=" <td colspan='2'>" + nodo.tipoInmueble.valor + "</td>";
            html+="</tr>";

            if (Object.keys(nodo.tercero).length>0){
                Object.keys(nodo.tercero).forEach(function (index) {
                    let tercero=nodo.tercero[index];
                    html+="<tr style='background-color: #dee2e6;'>";
                    html+=" <td>TERCERO</td>";
                    html+=" <td>NOMBRE / INSTITUCIÓN O RAZÓN SOCIAL</td>";
                    html+=" <td>RFC</td>";
                    html+="</tr>";
                    html+="<tr>";
                    html+=" <td>" + tercero.tipoPersona + "</td>";
                    html+=" <td>" + tercero.nombreRazonSocial + "</td>";
                    html+=" <td>" + tercero.rfc + "</td>";
                    html+="</tr>";
                });
            }
            
            html+="<tr style='background-color: #dee2e6;'>";
            html+=" <td>PORCENTAJE DE PROPIEDAD DEL DECLARANTE CONFORME A ESCRITURACIÓN O CONTRATO</td>";
            html+=" <td>SUPERFICIE DEL TERRENO</td>";
            html+=" <td>SUPERFICIE DE CONSTRUCCIÓN</td>";
            html+="</tr>";
            html+="<tr>";
            html+=" <td>" + nodo.porcentajePropiedad + "</td>";
            html+=" <td>" + nodo.superficieTerreno.valor + nodo.superficieTerreno.unidad + "</td>";
            html+=" <td>" + nodo.superficieConstruccion.valor + nodo.superficieConstruccion.unidad + "</td>";            
            html+="</tr>";

            html+="<tr style='background-color: #dee2e6;'>";
            html+=" <td>FORMA DE ADQUISICIÓN</td>";
            html+=" <td>FORMA DE PAGO</td>";
            html+=" <td>VALOR DE ADQUISICIÓN DEL MUEBLE</td>";
            html+="</tr>";
            html+="<tr>";
            html+=" <td>" + nodo.formaAdquisicion.valor + "</td>";
            html+=" <td>" + nodo.formaPago + "</td>";
            html+=" <td style='text-align: right;'>" + format(nodo.valorAdquisicion.valor) + nodo.valorAdquisicion.moneda + "</td>";            
            html+="</tr>";

            html+="<tr style='background-color: #dee2e6;'>";
            html+=" <td>FECHA DE ADQUISICIÓN</td>";
            html+=" <td>DATOS DEL REGISTRO PÚBLICO</td>";
            html+=" <td>VALOR CONFORME A </td>";
            html+="</tr>";
            html+="<tr>";
            html+=" <td>" + nodo.fechaAdquisicion + "</td>";
            html+=" <td>" + nodo.datoIdentificacion + "</td>";
            html+=" <td>" + nodo.valorConformeA + "</td>";
            html+="</tr>";

            html+="<tr style='background-color: #dee2e6;'>";
            html+=" <td colspan='3'>EN CASO DE BAJA DEL MUEBLE INCLUIR MOTIVO</td>";
            html+="</tr>";
            html+="<tr>";
            html+=" <td colspan='3'>" + nodo.motivoBaja.valor + "</td>";
            html+="</tr>";

            if (nodo.ubicacionInmueble=="MX"){
                html+='<tr style="background-color: #dee2e6;">\
                        <td style="width: 33%;">CALLE</td>\
                        <td style="width: 33%;">NUMERO EXTERIOR</td>\
                        <td style="width: 33%;">NUMERO INTERIOR</td>\
                    </tr>\
                    <tr>\
                        <td class="calle">' + nodo.domicilioMexico.calle + '</td>\
                        <td class="numeroExterior">' + nodo.domicilioMexico.numeroExterior + '</td>\
                        <td class="numeroInterior">' + nodo.domicilioMexico.numeroInterior + '</td>\
                    </tr>\
                    <tr style="background-color: #dee2e6;">\
                        <td>COLONIA/LOCALIDAD</td>\
                        <td>MUNICIPIO/ALCALDÍA</td>\
                        <td>ENTIDAD FEDERATIVA</td>\
                    </tr>\
                    <tr>\
                        <td class="coloniaLocalidad">' + nodo.domicilioMexico.coloniaLocalidad + '</td>\
                        <td class="municipioAlcaldia">' + nodo.domicilioMexico.municipioAlcaldia.valor + '</td>\
                        <td class="entidadFederativa">' + nodo.domicilioMexico.entidadFederativa.valor + '</td>\
                    </tr>\
                    <tr style="background-color: #dee2e6;">\
                        <td colspan="3">CODIGO POSTAL</td>\
                    </tr>\
                    <tr>\
                        <td class="codigoPostal" colspan="3" >' + nodo.domicilioMexico.codigoPostal + '</td>\
                    </tr>';
            }
            else{
                html+='<tr style="background-color: #dee2e6;">\
                            <td style="width: 33%;">CALLE</td>\
                            <td style="width: 33%;">NUMERO EXTERIOR</td>\
                            <td style="width: 33%;">NUMERO INTERIOR</td>\
                        </tr>\
                        <tr>\
                            <td class="calle">' + nodo.domicilioExtranjero.calle + '</td>\
                            <td class="numeroExterior">' + nodo.domicilioExtranjero.numeroExterior + '</td>\
                            <td class="numeroInterior">' + nodo.domicilioExtranjero.numeroInterior + '</td>\
                        </tr>\
                        <tr style="background-color: #dee2e6;">\
                            <td>CIUDAD/LOCALIDAD</td>\
                            <td>ESTADO/PROVINCIA/PAIS</td>\
                            <td>CÓDIGO POSTAL</td>\
                        </tr>\
                        <tr>\
                            <td class="ciudadLocalidad">' + nodo.domicilioExtranjero.ciudadLocalidad + '</td>\
                            <td class="estadoProvincia">' + nodo.domicilioExtranjero.estadoProvincia + " / " + nodo.domicilioExtranjero.pais + '</td>\
                            <td class="codigoPostal">' + nodo.domicilioExtranjero.codigoPostal + '</td>\
                        </tr>';
            }            
            
            if (Object.keys(nodo.transmisor).length>0){
                Object.keys(nodo.transmisor).forEach(function (index) {
                    let tercero=nodo.transmisor[index];
                    html+="<tr style='background-color: #dee2e6;'>";
                    html+=" <td>TRANSMISOR</td>";
                    html+=" <td>NOMBRE / INSTITUCIÓN O RAZÓN SOCIAL</td>";
                    html+=" <td>RELACIÓN</td>";
                    html+="</tr>";
                    html+="<tr>";
                    html+=" <td>" + tercero.tipoPersona +"/" +  tercero.rfc +"</td>";
                    html+=" <td>" + tercero.nombreRazonSocial + "</td>";
                    html+=" <td>" + tercero.relacion.valor + "</td>";
                    html+="</tr>";
                });
            }

            html+="<tr style='border-left:1px solid #fff; border-right:1px solid #fff;'><td colspan='3' style='border-left:1px solid #fff; border-right:1px solid #fff;'><td></tr>"                                
        });
        html +='<tr style="background-color: #dee2e6;"><td colspan="3">ACLARACIONES / OBSERVACIONES</td></tr>\
                <tr>\
                    <td colspan="3">' + jsonResult.declaracion.situacionPatrimonial.bienesInmuebles.aclaracionesObservaciones + '</td>\
                </tr>';
    }
    else{
        html +='<tr><td colspan="3">NO TENGO INFORMACIÓN QUE REPORTAR.</td></tr>\
                <tr style="background-color: #dee2e6;"><td colspan="3">ACLARACIONES / OBSERVACIONES</td></tr>\
                <tr>\
                    <td colspan="3">' + jsonResult.declaracion.situacionPatrimonial.bienesInmuebles.aclaracionesObservaciones + '</td>\
                </tr>';
    }
    $("#pdfMiDeclaracion_bienes_inmuebles>tbody").empty().append(html);
}

function tblVehiculos(titulo){
    let html="";
    html +='<tr><td colspan="3" style="background-color: #621132; color: #fff; font-size:14px;">' + titulo + '</td></tr>';
    if(!jsonResult.declaracion.situacionPatrimonial.vehiculos.ninguno){
        Object.keys(jsonResult.declaracion.situacionPatrimonial.vehiculos.vehiculo).forEach(function (index) {
            var nodo = jsonResult.declaracion.situacionPatrimonial.vehiculos.vehiculo[index];
            let titulares="";

            $(nodo.titular).each(function(index, item) { titulares+= item.valor + ","; });

            html+="<tr style='background-color: #dee2e6;'>";
            html+=" <td>TITULAR DEL VEHÍCULO</td>";
            html+=" <td>TIPO DEL VEHICULO</td>";
            html+=" <td>¿DÓNDE SE ENCUENTRA REGISTRADO?</td>";
            html+="</tr>";
            html+="<tr>";
            html+=" <td>" + titulares.slice(0, -1) + "</td>";
            html+=" <td>" + nodo.tipoVehiculo.valor + "</td>";
            html+=" <td>" + nodo.lugarRegistro.pais + "/" + nodo.lugarRegistro.entidadFederativa.valor + "</td>";
            html+="</tr>";

            if (Object.keys(nodo.tercero).length>0){
                Object.keys(nodo.tercero).forEach(function (index) {
                    let tercero=nodo.tercero[index];
                    html+="<tr style='background-color: #dee2e6;'>";
                    html+=" <td>TERCERO</td>";
                    html+=" <td>NOMBRE / INSTITUCIÓN O RAZÓN SOCIAL</td>";
                    html+=" <td>RFC</td>";
                    html+="</tr>";
                    html+="<tr>";
                    html+=" <td>" + tercero.tipoPersona + "</td>";
                    html+=" <td>" + tercero.nombreRazonSocial + "</td>";
                    html+=" <td>" + tercero.rfc + "</td>";
                    html+="</tr>";
                });
            }

            html+="<tr style='background-color: #dee2e6;'>";
            html+=" <td>MARCA</td>";
            html+=" <td>MODELO</td>";
            html+=" <td>AÑO</td>";
            html+="</tr>";
            html+="<tr>";
            html+=" <td>" + nodo.marca + "</td>";
            html+=" <td>" + nodo.modelo + "</td>";
            html+=" <td>" + nodo.anio + "</td>";            
            html+="</tr>";

            html+="<tr style='background-color: #dee2e6;'>";
            html+=" <td>NÚMERO DE SERIE O REGISTRO</td>";
            html+=" <td>VALOR DE ADQUISICIÓN</td>";
            html+=" <td>FECHA DE ADQUISICIÓN</td>";
            html+="</tr>";
            html+="<tr>";
            html+=" <td>" + nodo.numeroSerieRegistro + "</td>";
            html+=" <td style='text-align: right;'>" + format(nodo.valorAdquisicion.valor) + nodo.valorAdquisicion.moneda + "</td>";            
            html+=" <td>" + nodo.fechaAdquisicion + "</td>";
            html+="</tr>";

            html+="<tr style='background-color: #dee2e6;'>";
            html+=" <td>FORMA DE ADQUISICIÓN</td>";
            html+=" <td>FORMA DE PAGO</td>";
            html+=" <td>EN CASO DE BAJA DEL VEHÍCULO INCLUIR MOTIVO</td>";
            html+="</tr>";
            html+="<tr>";
            html+=" <td>" + nodo.formaAdquisicion.valor + "</td>";
            html+=" <td>" + nodo.formaPago + "</td>";            
            html+=" <td>" + nodo.motivoBaja.valor + "</td>";
            html+="</tr>";
         
            if (Object.keys(nodo.transmisor).length>0){
                Object.keys(nodo.transmisor).forEach(function (index) {
                    let tercero=nodo.transmisor[index];
                    html+="<tr style='background-color: #dee2e6;'>";
                    html+=" <td>TRANSMISOR</td>";
                    html+=" <td>NOMBRE / INSTITUCIÓN O RAZÓN SOCIAL</td>";
                    html+=" <td>RELACIÓN</td>";
                    html+="</tr>";
                    html+="<tr>";
                    html+=" <td>" + tercero.tipoPersona +"/" +  tercero.rfc +"</td>";
                    html+=" <td>" + tercero.nombreRazonSocial + "</td>";
                    html+=" <td>" + tercero.relacion.valor + "</td>";
                    html+="</tr>";
                });
            }

            html+="<tr style='border-left:1px solid #fff; border-right:1px solid #fff;'><td colspan='3' style='border-left:1px solid #fff; border-right:1px solid #fff;'><td></tr>"                                
        });
        html +='<tr style="background-color: #dee2e6;"><td colspan="3">ACLARACIONES / OBSERVACIONES</td></tr>\
                <tr>\
                    <td colspan="3">' + jsonResult.declaracion.situacionPatrimonial.vehiculos.aclaracionesObservaciones + '</td>\
                </tr>';
    }
    else{
        html +='<tr><td colspan="3">NO TENGO INFORMACIÓN QUE REPORTAR.</td></tr>\
                <tr style="background-color: #dee2e6;"><td colspan="3">ACLARACIONES / OBSERVACIONES</td></tr>\
                <tr>\
                    <td colspan="3">' + jsonResult.declaracion.situacionPatrimonial.vehiculos.aclaracionesObservaciones + '</td>\
                </tr>';
    }
    $("#pdfMiDeclaracion_vehiculos>tbody").empty().append(html);  
}

function tblBienesMuebles(titulo){
    let html="";
    html +='<tr><td colspan="3" style="background-color: #621132; color: #fff; font-size:14px;">' + titulo + '</td></tr>';
    if(!jsonResult.declaracion.situacionPatrimonial.bienesMuebles.ninguno){
        Object.keys(jsonResult.declaracion.situacionPatrimonial.bienesMuebles.bienMueble).forEach(function (index) {
            var nodo = jsonResult.declaracion.situacionPatrimonial.bienesMuebles.bienMueble[index];
            let titulares="";

            $(nodo.titular).each(function(index, item) { titulares+= item.valor + ","; });

            html+="<tr style='background-color: #dee2e6;'>";
            html+=" <td>TITULAR DEL BIEN</td>";
            html+=" <td>TIPO DEL BIEN</td>";
            html+=" <td>DESCRIPCIÓN GENERAL DEL BIEN</td>";
            html+="</tr>";
            html+="<tr>";
            html+=" <td>" + titulares.slice(0, -1) + "</td>";
            html+=" <td>" + nodo.tipoBien.valor + "</td>";
            html+=" <td>" + nodo.descripcionGeneralBien + "</td>";
            html+="</tr>";

            if (Object.keys(nodo.tercero).length>0){
                Object.keys(nodo.tercero).forEach(function (index) {
                    let tercero=nodo.tercero[index];
                    html+="<tr style='background-color: #dee2e6;'>";
                    html+=" <td>TERCERO</td>";
                    html+=" <td>NOMBRE / INSTITUCIÓN O RAZÓN SOCIAL</td>";
                    html+=" <td>RFC</td>";
                    html+="</tr>";
                    html+="<tr>";
                    html+=" <td>" + tercero.tipoPersona + "</td>";
                    html+=" <td>" + tercero.nombreRazonSocial + "</td>";
                    html+=" <td>" + tercero.rfc + "</td>";
                    html+="</tr>";
                });
            }

            html+="<tr style='background-color: #dee2e6;'>";
            html+=" <td>FORMA DE ADQUISICIÓN</td>";
            html+=" <td>FORMA DE PAGO</td>";
            html+=" <td>VALOR DE ADQUISICIÓN DEL MUEBLE</td>";
            html+="</tr>";
            html+="<tr>";
            html+=" <td>" + nodo.formaAdquisicion.valor + "</td>";
            html+=" <td>" + nodo.formaPago + "</td>";
            html+=" <td style='text-align: right;'>" + format(nodo.valorAdquisicion.valor) + nodo.valorAdquisicion.moneda + "</td>";            
            html+="</tr>";

            html+="<tr style='background-color: #dee2e6;'>";
            html+=" <td>FECHA DE ADQUISICIÓN</td>";
            html+=" <td colspan='2'>EN CASO DE BAJA DEL MUEBLE INCLUIR MOTIVO</td>";
            html+="</tr>";
            html+="<tr>";
            html+=" <td>" + nodo.fechaAdquisicion + "</td>";
            html+=" <td colspan='2'>" + nodo.motivoBaja.valor + "</td>";
            html+="</tr>";

            if (Object.keys(nodo.transmisor).length>0){
                Object.keys(nodo.transmisor).forEach(function (index) {
                    let tercero=nodo.transmisor[index];
                    html+="<tr style='background-color: #dee2e6;'>";
                    html+=" <td>TRANSMISOR</td>";
                    html+=" <td>NOMBRE / INSTITUCIÓN O RAZÓN SOCIAL</td>";
                    html+=" <td>RELACIÓN</td>";
                    html+="</tr>";
                    html+="<tr>";
                    html+=" <td>" + tercero.tipoPersona +"/" +  tercero.rfc +"</td>";
                    html+=" <td>" + tercero.nombreRazonSocial + "</td>";
                    html+=" <td>" + tercero.relacion.valor + "</td>";
                    html+="</tr>";
                });
            }

            html+="<tr style='border-left:1px solid #fff; border-right:1px solid #fff;'><td colspan='3' style='border-left:1px solid #fff; border-right:1px solid #fff;'><td></tr>"                                
        });
        html +='<tr style="background-color: #dee2e6;"><td colspan="3">ACLARACIONES / OBSERVACIONES</td></tr>\
                <tr>\
                    <td colspan="3">' + jsonResult.declaracion.situacionPatrimonial.bienesMuebles.aclaracionesObservaciones + '</td>\
                </tr>';
    }
    else{
        html +='<tr><td colspan="3">NO TENGO INFORMACIÓN QUE REPORTAR.</td></tr>\
                <tr style="background-color: #dee2e6;"><td colspan="3">ACLARACIONES / OBSERVACIONES</td></tr>\
                <tr>\
                    <td colspan="3">' + jsonResult.declaracion.situacionPatrimonial.bienesMuebles.aclaracionesObservaciones + '</td>\
                </tr>';
    }
    $("#pdfMiDeclaracion_bienes_muebles>tbody").empty().append(html);
}

function tblInversiones(titulo){
    let html="";
    html +='<tr><td colspan="3" style="background-color: #621132; color: #fff; font-size:14px;">' + titulo + '</td></tr>';
    if(!jsonResult.declaracion.situacionPatrimonial.inversiones.ninguno){
        Object.keys(jsonResult.declaracion.situacionPatrimonial.inversiones.inversion).forEach(function (index) {
            var nodo = jsonResult.declaracion.situacionPatrimonial.inversiones.inversion[index];
            let titulares="", saldo="", saldoMoneda="", saldolbl="", porcentajeIncrementoDecremento="";
            switch(jsonResult.captura.tipo_declaracion){
                case "INICIAL": 
                    saldolbl="SALDO INSOLUTO (SITUACIÓN ACTUAL)";
                    saldo = format(nodo.saldoSituacionActual.valor);
                    saldoMoneda = nodo.saldoSituacionActual.moneda;
                    porcentajeIncrementoDecremento="";
                    break;
                case "MODIFICACION": 
                    saldolbl="SALDO INSOLUTO AL 31 DE DICIEMBRE DEL AÑO INMEDIATO ANTERIOR";
                    saldo = format(nodo.saldoDiciembreAnterior.valor);
                    saldoMoneda = nodo.saldoDiciembreAnterior.moneda;
                    porcentajeIncrementoDecremento = nodo.porcentajeIncrementoDecremento + "% Incremento/Decremento";
                    break;
                case "CONCLUSION": 
                    saldolbl="SALDO INSOLUTO A LA FECHA DE CONCLUSIÓN DEL EMPLEO";
                    saldo = format(nodo.saldoFechaConclusion.valor);
                    saldoMoneda = nodo.saldoFechaConclusion.moneda;
                    porcentajeIncrementoDecremento = nodo.porcentajeIncrementoDecremento + "% Incremento/Decremento";
                    break;
            }

            $(nodo.titular).each(function(index, item) { titulares+= item.valor + ","; });

            html+="<tr style='background-color: #dee2e6;'>";
            html+=" <td>TTITULAR DE LA INVERSIÓN/CUENTA BANCARIA/OTROS</td>";
            html+=" <td>TIPO DE INVERSIÓN/ACTIVO</td>";
            html+=" <td>SUBTIPO INVERSIÓN</td>";
            html+="</tr>";
            html+="<tr>";
            html+=" <td>" + titulares.slice(0, -1) + "</td>";
            html+=" <td>" + nodo.tipoInversion.valor + "</td>";
            html+=" <td>" + nodo.subTipoInversion.valor + "</td>";
            html+="</tr>";

            if (Object.keys(nodo.tercero).length>0){
                Object.keys(nodo.tercero).forEach(function (index) {
                    let tercero=nodo.tercero[index];
                    html+="<tr style='background-color: #dee2e6;'>";
                    html+=" <td>TERCERO</td>";
                    html+=" <td>NOMBRE / INSTITUCIÓN O RAZÓN SOCIAL</td>";
                    html+=" <td>RFC</td>";
                    html+="</tr>";
                    html+="<tr>";
                    html+=" <td>" + tercero.tipoPersona + "</td>";
                    html+=" <td>" + tercero.nombreRazonSocial + "</td>";
                    html+=" <td>" + tercero.rfc + "</td>";
                    html+="</tr>";
                });
            }

            html+="<tr style='background-color: #dee2e6;'>";
            html+=" <td>NÚMERO DE CUENTA, CONTRATO O PÓLIZA</td>";
            html+=" <td>¿DÓNDE SE LOCALIZA LA INVERSIÓN, CUENTA BANCARIA Y OTRO TIPO DE VALORES / ACTIVOS ?</td>";
            html+=" <td>" + saldolbl + "</td>";
            html+="</tr>";
            html+="<tr>";
            html+=" <td style='text-align: right;'>" + nodo.numeroCuentaContrato + "</td>";
            html+=" <td>" + nodo.localizacionInversion.pais + "</td>";
            html+=" <td style='text-align: right;'>" + saldo + saldoMoneda +  "<br>" + porcentajeIncrementoDecremento + "</td>";            
            html+="</tr>";

            html+="<tr style='background-color: #dee2e6;'>";
            html+=" <td colspan='2'>NOMBRE / INSTITUCIÓN O RAZÓN SOCIAL</td>";
            html+=" <td>RFC</td>";
            html+="</tr>";
            html+="<tr>";
            html+=" <td colspan='2'>" + nodo.localizacionInversion.institucionRazonSocial + "</td>";
            html+=" <td>" + nodo.localizacionInversion.rfc + "</td>";
            html+="</tr>";

            html+="<tr style='border-left:1px solid #fff; border-right:1px solid #fff;'><td colspan='3' style='border-left:1px solid #fff; border-right:1px solid #fff;'><td></tr>"                                
        });
        html +='<tr style="background-color: #dee2e6;"><td colspan="3">ACLARACIONES / OBSERVACIONES</td></tr>\
                <tr>\
                    <td colspan="3">' + jsonResult.declaracion.situacionPatrimonial.inversiones.aclaracionesObservaciones + '</td>\
                </tr>';
    }
    else{
        html +='<tr><td colspan="3">NO TENGO INFORMACIÓN QUE REPORTAR.</td></tr>\
                <tr style="background-color: #dee2e6;"><td colspan="3">ACLARACIONES / OBSERVACIONES</td></tr>\
                <tr>\
                    <td colspan="3">' + jsonResult.declaracion.situacionPatrimonial.inversiones.aclaracionesObservaciones + '</td>\
                </tr>';
    }
    $("#pdfMiDeclaracion_inversiones>tbody").empty().append(html);
}

function tblAdeudos(titulo){
    let html="";
    html +='<tr><td colspan="3" style="background-color: #621132; color: #fff; font-size:14px;">' + titulo + '</td></tr>';
    if(!jsonResult.declaracion.situacionPatrimonial.adeudos.ninguno){
        Object.keys(jsonResult.declaracion.situacionPatrimonial.adeudos.adeudo).forEach(function (index) {
            var nodo = jsonResult.declaracion.situacionPatrimonial.adeudos.adeudo[index];
            let titulares="", saldo="", saldoMoneda="", saldolbl="", porcentajeIncrementoDecremento="";
            switch(jsonResult.captura.tipo_declaracion){
                case "INICIAL": 
                    saldolbl="SALDO INSOLUTO (SITUACIÓN ACTUAL)";
                    saldo = format(nodo.saldoInsolutoSituacionActual.valor);
                    saldoMoneda = nodo.saldoInsolutoSituacionActual.moneda;
                    porcentajeIncrementoDecremento="";
                    break;
                case "MODIFICACION": 
                    saldolbl="SALDO INSOLUTO AL 31 DE DICIEMBRE DEL AÑO INMEDIATO ANTERIOR";
                    saldo = format(nodo.saldoInsolutoDiciembreAnterior.valor);
                    saldoMoneda = nodo.saldoInsolutoDiciembreAnterior.moneda;
                    porcentajeIncrementoDecremento = nodo.porcentajeIncrementoDecremento + "% Incremento/Decremento";
                    break;
                case "CONCLUSION": 
                    saldolbl="SALDO INSOLUTO A LA FECHA DE CONCLUSIÓN DEL EMPLEO";
                    saldo = format(nodo.saldoInsolutoFechaConclusion.valor);
                    saldoMoneda = nodo.saldoInsolutoFechaConclusion.moneda;
                    porcentajeIncrementoDecremento = nodo.porcentajeIncrementoDecremento + "% Incremento/Decremento";
                    break;
            }

            $(nodo.titular).each(function(index, item) { titulares+= item.valor + ","; });

            html+="<tr>";
            html+=" <td colspan='3' style='font-size:12px;'>" + nodo.tipoAdeudo.valor + "</td>";
            html+="</tr>";
            html+="<tr style='background-color: #dee2e6;'>";
            html+=" <td>TITULAR DEL ADEUDO</td>";
            html+=" <td>FECHA DE ADQUISICIÓN DEL ADEUDO/PASIVO</td>";
            html+=" <td>NÚMERO DE CUENTA O CONTRATO</td>";
            html+="</tr>";
            html+="<tr>";
            html+=" <td>" + titulares.slice(0, -1) + "</td>";
            html+=" <td>" + nodo.fechaAdquisicion + "</td>";
            html+=" <td>" + nodo.numeroCuentaContrato + "</td>";
            html+="</tr>";

            if (Object.keys(nodo.tercero).length>0){
                Object.keys(nodo.tercero).forEach(function (index) {
                    let tercero=nodo.tercero[index];
                    html+="<tr style='background-color: #dee2e6;'>";
                    html+=" <td>TERCERO</td>";
                    html+=" <td>NOMBRE / INSTITUCIÓN O RAZÓN SOCIAL</td>";
                    html+=" <td>RFC</td>";
                    html+="</tr>";
                    html+="<tr>";
                    html+=" <td>" + tercero.tipoPersona + "</td>";
                    html+=" <td>" + tercero.nombreRazonSocial + "</td>";
                    html+=" <td>" + tercero.rfc + "</td>";
                    html+="</tr>";
                });
            }

            html+="<tr style='background-color: #dee2e6;'>";
            html+=" <td>MONTO ORIGINAL DEL ADEUDO/PASIVO</td>";
            html+=" <td>" + saldolbl + "</td>";
            html+=" <td>¿DÓNDE SE LOCALIZA EL ADEUDO?</td>";
            html+="</tr>";
            html+="<tr>";
            html+=" <td style='text-align: right;'>" + format(nodo.montoOriginal.valor) + nodo.montoOriginal.moneda + "</td>";
            html+=" <td style='text-align: right;'>" + saldo + saldoMoneda +  "<br>" + porcentajeIncrementoDecremento + "</td>";
            html+=" <td>" + nodo.localizacionAdeudo.pais + "</td>";
            html+="</tr>";

            html+="<tr style='background-color: #dee2e6;'>";
            html+=" <td>OTORGANTE DEL CRÉDITO</td>";
            html+=" <td>NOMBRE / INSTITUCIÓN O RAZÓN SOCIAL</td>";
            html+=" <td>RFC</td>";
            html+="</tr>";
            html+="<tr>";
            html+=" <td>" + nodo.otorganteCredito.tipoPersona + "</td>";
            html+=" <td>" + nodo.otorganteCredito.nombreInstitucion + "</td>";
            html+=" <td>" + nodo.otorganteCredito.rfc + "</td>";
            html+="</tr>";

            html+="<tr style='border-left:1px solid #fff; border-right:1px solid #fff;'><td colspan='3' style='border-left:1px solid #fff; border-right:1px solid #fff;'><td></tr>"                                
        });
        html +='<tr style="background-color: #dee2e6;"><td colspan="3">ACLARACIONES / OBSERVACIONES</td></tr>\
                <tr>\
                    <td colspan="3">' + jsonResult.declaracion.situacionPatrimonial.adeudos.aclaracionesObservaciones + '</td>\
                </tr>';
    }
    else{
        html +='<tr><td colspan="3">NO TENGO INFORMACIÓN QUE REPORTAR.</td></tr>\
                <tr style="background-color: #dee2e6;"><td colspan="3">ACLARACIONES / OBSERVACIONES</td></tr>\
                <tr>\
                    <td colspan="3">' + jsonResult.declaracion.situacionPatrimonial.adeudos.aclaracionesObservaciones + '</td>\
                </tr>';
    }
    $("#pdfMiDeclaracion_adeudos>tbody").empty().append(html);
}

function tblPrestamoOComodato(titulo){
    let html="";
    html +='<tr><td colspan="3" style="background-color: #621132; color: #fff; font-size:14px;">' + titulo + '</td></tr>';

    if(!jsonResult.declaracion.situacionPatrimonial.prestamoOComodato.ninguno){
        Object.keys(jsonResult.declaracion.situacionPatrimonial.prestamoOComodato.prestamo).forEach(function (index) {
            var nodo = jsonResult.declaracion.situacionPatrimonial.prestamoOComodato.prestamo[index];
            if (Object.keys(nodo.tipoBien)[0]=="inmueble"){
                html+="<tr>";
                html+=" <td colspan='3' style='font-size:12px;'>INMUEBLE | " + nodo.tipoBien.inmueble.tipoInmueble.valor + "</td>";
                html+="</tr>";
                if (Object.keys(nodo.tipoBien.inmueble).toString().indexOf("domicilioMexico") >-1){
                    html+='<tr style="background-color: #dee2e6;">\
                            <td style="width: 33%;">CALLE</td>\
                            <td style="width: 33%;">NUMERO EXTERIOR</td>\
                            <td style="width: 33%;">NUMERO INTERIOR</td>\
                        </tr>\
                        <tr>\
                            <td class="calle">' + nodo.tipoBien.inmueble.domicilioMexico.calle + '</td>\
                            <td class="numeroExterior">' + nodo.tipoBien.inmueble.domicilioMexico.numeroExterior + '</td>\
                            <td class="numeroInterior">' + nodo.tipoBien.inmueble.domicilioMexico.numeroInterior + '</td>\
                        </tr>\
                        <tr style="background-color: #dee2e6;">\
                            <td>COLONIA/LOCALIDAD</td>\
                            <td>MUNICIPIO/ALCALDÍA</td>\
                            <td>ENTIDAD FEDERATIVA</td>\
                        </tr>\
                        <tr>\
                            <td class="coloniaLocalidad">' + nodo.tipoBien.inmueble.domicilioMexico.coloniaLocalidad + '</td>\
                            <td class="municipioAlcaldia">' + nodo.tipoBien.inmueble.domicilioMexico.municipioAlcaldia.valor + '</td>\
                            <td class="entidadFederativa">' + nodo.tipoBien.inmueble.domicilioMexico.entidadFederativa.valor + '</td>\
                        </tr>\
                        <tr style="background-color: #dee2e6;">\
                            <td colspan="3">CODIGO POSTAL</td>\
                        </tr>\
                        <tr>\
                            <td class="codigoPostal" colspan="3" >' + nodo.tipoBien.inmueble.domicilioMexico.codigoPostal + '</td>\
                        </tr>';
                }
                else{
                    html+='<tr style="background-color: #dee2e6;">\
                                <td style="width: 33%;">CALLE</td>\
                                <td style="width: 33%;">NUMERO EXTERIOR</td>\
                                <td style="width: 33%;">NUMERO INTERIOR</td>\
                            </tr>\
                            <tr>\
                                <td class="calle">' + nodo.tipoBien.inmueble.domicilioExtranjero.calle + '</td>\
                                <td class="numeroExterior">' + nodo.tipoBien.inmueble.domicilioExtranjero.numeroExterior + '</td>\
                                <td class="numeroInterior">' + nodo.tipoBien.inmueble.domicilioExtranjero.numeroInterior + '</td>\
                            </tr>\
                            <tr style="background-color: #dee2e6;">\
                                <td>CIUDAD/LOCALIDAD</td>\
                                <td>ESTADO/PROVINCIA/PAIS</td>\
                                <td>CÓDIGO POSTAL</td>\
                            </tr>\
                            <tr>\
                                <td class="ciudadLocalidad">' + nodo.tipoBien.inmueble.domicilioExtranjero.ciudadLocalidad + '</td>\
                                <td class="estadoProvincia">' + nodo.tipoBien.inmueble.domicilioExtranjero.estadoProvincia + " / " + nodo.tipoBien.inmueble.domicilioExtranjero.pais + '</td>\
                                <td class="codigoPostal">' + nodo.tipoBien.inmueble.domicilioExtranjero.codigoPostal + '</td>\
                            </tr>';
                }
            }
            else{
                html+="<tr>";
                html+=" <td colspan='3' style='font-size:12px;'>VEHICULO | " + nodo.tipoBien.vehiculo.tipo.valor + "</td>";
                html+="</tr>";
                html+='<tr style="background-color: #dee2e6;">\
                            <td style="width: 33%;">MARCA</td>\
                            <td style="width: 33%;">MODELO</td>\
                            <td style="width: 33%;">AÑO</td>\
                        </tr>\
                        <tr>\
                            <td>' + nodo.tipoBien.vehiculo.marca + '</td>\
                            <td>' + nodo.tipoBien.vehiculo.modelo + '</td>\
                            <td>' + nodo.tipoBien.vehiculo.anio + '</td>\
                        </tr>\
                        <tr style="background-color: #dee2e6;">\
                            <td>NÚMERO DE SERIE O REGISTRO</td>\
                            <td>¿DÓNDE SE ENCUENTRA REGISTRADO?</td>\
                            <td>ENTIDAD FEDERATIVA</td>\
                        </tr>\
                        <tr>\
                            <td>' + nodo.tipoBien.vehiculo.numeroSerieRegistro + '</td>\
                            <td>' + nodo.tipoBien.vehiculo.lugarRegistro.pais + '</td>\
                            <td>' + nodo.tipoBien.vehiculo.lugarRegistro.entidadFederativa.valor + '</td>\
                        </tr>';
            }

            html+="<tr style='background-color: #dee2e6;'>";
            html+=" <td>NOMBRE DEL DUEÑO O TITULAR</td>";
            html+=" <td>TIPO/RFC</td>";
            html+=" <td>RELACIÓN CON EL DUEÑO/TITULAR</td>";
            html+="</tr>";
            html+="<tr>";
            html+=" <td>" + nodo.duenoTitular.nombreTitular + "</td>";
            html+=" <td>" + nodo.duenoTitular.tipoDuenoTitular + " / " + nodo.duenoTitular.rfc + "</td>";
            html+=" <td>" + nodo.duenoTitular.relacionConTitular + "</td>";
            html+="</tr>";
            html+="<tr><td colspan='3'><td></tr>"                                
        });
        html +='<tr style="background-color: #dee2e6;"><td colspan="3">ACLARACIONES / OBSERVACIONES</td></tr>\
                <tr>\
                    <td colspan="3">' + jsonResult.declaracion.situacionPatrimonial.prestamoOComodato.aclaracionesObservaciones + '</td>\
                </tr>';
    }
    else{
        html +='<tr><td colspan="3">NO TENGO INFORMACIÓN QUE REPORTAR.</td></tr>\
                <tr style="background-color: #dee2e6;"><td colspan="3">ACLARACIONES / OBSERVACIONES</td></tr>\
                <tr>\
                    <td colspan="3">' + jsonResult.declaracion.situacionPatrimonial.prestamoOComodato.aclaracionesObservaciones + '</td>\
                </tr>';
    }
    $("#pdfMiDeclaracion_prestamoOComodato>tbody").empty().append(html);
}



function tblInteresesTitulo(){
    let html="";
    html +='<tr><td colspan="3" style="color: #621132; border-bottom:1px solid #621132; font-size:14px;">DECLARACIÓN DE INTERESES</td></tr>';
    $("#pdfMiDeclaracion_interes_titulo>tbody").empty().append(html);          
}


function tblParticipacionEmpresas(){
    let html="";
    html +='<tr><td colspan="3" style="background-color: #621132; color: #fff; font-size:14px;">1. PARTICIPACIÓN EN EMPRESAS, SOCIEDADES O ASOCIACIONES</td></tr>';

    if(!jsonResult.declaracion.interes.participacion.ninguno){
        Object.keys(jsonResult.declaracion.interes.participacion.participacion).forEach(function (index) {
            let nodo = jsonResult.declaracion.interes.participacion.participacion[index];
            let recibe= "";
            nodo.recibeRemuneracion ==true ? realiza = "SI": realiza = "NO";

            html+="<tr>";
            html+=" <td colspan='3' style='font-size:12px;'>TIPO DE RELACIÓN | " + nodo.tipoBien.inmueble.tipoInmueble.valor + "</td>";
            html+="</tr>";

            html+="<tr style='background-color: #dee2e6;'>";
            html+=" <td>NOMBRE DE LA EMPRESA, SOCIEDAD O ASOCIACIÓN</td>";
            html+=" <td>RFC</td>";
            html+=" <td>PORCENTAJE DE PARTICIPACIÓN DE ACUERDO A ESCRITURA</td>";
            html+="</tr>";
            html+="<tr>";
            html+=" <td>" + nodo.nombreEmpresaSociedadAsociacion + "</td>";
            html+=" <td>" + nodo.rfc + "</td>";
            html+=" <td>" + nodo.porcentajeParticipacion + "%</td>";
            html+="</tr>";

            html+="<tr style='background-color: #dee2e6;'>";
            html+=" <td>TIPO DE PARTICIPACIÓN</td>";
            html+=" <td>¿RECIBE REMUNERACIÓN POR SU PARTICIPACIÓN?</td>";
            html+=" <td>MONTO MENSUAL NETO</td>";
            html+="</tr>";
            html+="<tr>";
            html+=" <td>" + nodo.tipoParticipacion.valor + "</td>";
            html+=" <td>" + recibe + "</td>";
            html+=" <td style='text-align: right;'>" + format(nodo.montoMensual.valor) + nodo.montoMensual.moneda + "</td>";
            html+="</tr>";
            
            html+="<tr style='background-color: #dee2e6;'>";
            html+=" <td>PAÍS</td>";
            html+=" <td>ENTIDAD FEDERATIVA</td>";
            html+=" <td>SECTOR PRODUCTIVO AL QUE PERTENECE</td>";
            html+="</tr>";
            html+="<tr>";
            html+=" <td>" + nodo.ubicacion.pais + "</td>";
            html+=" <td>" + nodo.ubicacion.entidadFederativa.valor + "</td>";
            html+=" <td>" + nodo.sector.valor + "</td>";
            html+="</tr>";

            html+="<tr><td colspan='3'><td></tr>"                                
        });
        html +='<tr style="background-color: #dee2e6;"><td colspan="3">ACLARACIONES / OBSERVACIONES</td></tr>\
                <tr>\
                    <td colspan="3">' + jsonResult.declaracion.interes.participacion.aclaracionesObservaciones + '</td>\
                </tr>';
    }
    else{
        html +='<tr><td colspan="3">NO TENGO INFORMACIÓN QUE REPORTAR.</td></tr>\
                <tr style="background-color: #dee2e6;"><td colspan="3">ACLARACIONES / OBSERVACIONES</td></tr>\
                <tr>\
                    <td colspan="3">' + jsonResult.declaracion.interes.participacion.aclaracionesObservaciones + '</td>\
                </tr>';
    }
    $("#pdfMiDeclaracion_participacion>tbody").empty().append(html);      
}

function tblParticipacionInstituciones(){
    let html="";
    html +='<tr><td colspan="3" style="background-color: #621132; color: #fff; font-size:14px;">2. ¿PARTICIPA EN ALGUNA DE ESTAS INSTITUCIONES?</td></tr>';

    if(!jsonResult.declaracion.interes.participacionTomaDecisiones.ninguno){
        Object.keys(jsonResult.declaracion.interes.participacionTomaDecisiones.participacion).forEach(function (index) {
            let nodo = jsonResult.declaracion.interes.participacionTomaDecisiones.participacion[index];
            let recibe= "";
            nodo.recibeRemuneracion ==true ? realiza = "SI": realiza = "NO";

            html+="<tr style='background-color: #dee2e6;'>";
            html+=" <td>TIPO DE RELACIÓN</td>";
            html+=" <td>TIPO DE INSTITUCIÓN</td>";
            html+="</tr>";
            html+="<tr>";
            html+=" <td>" + nodo.tipoRelacion + "</td>";
            html+=" <td>" + nodo.tipoInstitucion.valor + "</td>";
            html+="</tr>";

            html+="<tr style='background-color: #dee2e6;'>";
            html+=" <td>NOMBRE DE LA INSTITUCIÓN</td>";
            html+=" <td>RFC</td>";
            html+="</tr>";
            html+="<tr>";
            html+=" <td>" + nodo.nombreInstitucion + "</td>";
            html+=" <td>" + nodo.rfc + "</td>";
            html+="</tr>";
            
            html+="<tr style='background-color: #dee2e6;'>";
            html+=" <td>PUESTO/ROL</td>";
            html+=" <td>FECHA DE INICIO DE PARTICIPACIÓN DENTRO DE LA INSTITUCIÓN</td>";
            html+="</tr>";
            html+="<tr>";
            html+=" <td>" + nodo.puestoRol + "</td>";
            html+=" <td>" + nodo.fechaInicioParticipacion + "</td>";
            html+="</tr>";

            html+="<tr style='background-color: #dee2e6;'>";
            html+=" <td>¿RECIBE REMUNERACIÓN POR SU PARTICIPACIÓN?</td>";
            html+=" <td>MONTO MENSUAL NETO</td>";
            html+="</tr>";
            html+="<tr>";
            html+=" <td>" + recibe + "</td>";
            html+=" <td style='text-align: right;'>" + format(nodo.montoMensual.valor) + nodo.montoMensual.moneda + "</td>";
            html+="</tr>";

            html+="<tr style='background-color: #dee2e6;'>";
            html+=" <td>PAÍS</td>";
            html+=" <td>ENTIDAD FEDERATIVA</td>";
            html+="</tr>";
            html+="<tr>";
            html+=" <td>" + nodo.ubicacion.pais + "</td>";
            html+=" <td>" + nodo.ubicacion.entidadFederativa.valor + "</td>";
            html+="</tr>";
            
            html+="<tr><td colspan='3'><td></tr>"                                
        });
        html +='<tr style="background-color: #dee2e6;"><td colspan="3">ACLARACIONES / OBSERVACIONES</td></tr>\
                <tr>\
                    <td colspan="3">' + jsonResult.declaracion.interes.participacionTomaDecisiones.aclaracionesObservaciones + '</td>\
                </tr>';
    }
    else{
        html +='<tr><td colspan="3">NO TENGO INFORMACIÓN QUE REPORTAR.</td></tr>\
                <tr style="background-color: #dee2e6;"><td colspan="3">ACLARACIONES / OBSERVACIONES</td></tr>\
                <tr>\
                    <td colspan="3">' + jsonResult.declaracion.interes.participacionTomaDecisiones.aclaracionesObservaciones + '</td>\
                </tr>';
    }
    $("#pdfMiDeclaracion_participacionTomaDecisiones>tbody").empty().append(html);
}

function tblApoyos(){
    let html="";
    html +='<tr><td colspan="3" style="background-color: #621132; color: #fff; font-size:14px;">3. APOYOS O BENEFICIOS PÚBLICOS</td></tr>';

    if(!jsonResult.declaracion.interes.apoyos.ninguno){
        Object.keys(jsonResult.declaracion.interes.apoyos.apoyo).forEach(function (index) {
            var nodo = jsonResult.declaracion.interes.apoyos.apoyo[index];
           
            html+="<tr style='background-color: #dee2e6;'>";
            html+=" <td>TIPO DE PERSONA</td>";
            html+=" <td>BENEFICIARIO DE ALGÚN PROGRAMA PÚBLICO</td>";
            html+=" <td>NOMBRE DEL PROGRAMA</td>";
            html+="</tr>";
            html+="<tr>";
            html+=" <td>" + nodo.tipoPersona + "</td>";
            html+=" <td>" + nodo.beneficiarioPrograma.valor + "</td>";
            html+=" <td>" + nodo.nombrePrograma + "</td>";
            html+="</tr>";
            
            html+="<tr style='background-color: #dee2e6;'>";
            html+=" <td>INSTITUCIÓN QUE OTORGA EL APOYO</td>";
            html+=" <td>NIVEL U ÓRGANO DE GOBIERNO</td>";
            html+=" <td>TIPO DE APOYO</td>";
            html+="</tr>";
            html+="<tr>";
            html+=" <td>" + nodo.institucionOtorgante + "</td>";
            html+=" <td>" + nodo.nivelOrdenGobierno + "</td>";
            html+=" <td>" + nodo.tipoApoyo.valor + "</td>";
            html+="</tr>";
            
            html+="<tr style='background-color: #dee2e6;'>";
            html+=" <td>FORMA DE RECEPCIÓN DEL APOYO</td>";
            html+=" <td>MONTO APROXIMADO DEL APOYO MENSUAL</td>";
            html+=" <td>ESPECIFIQUE EL APOYO</td>";
            html+="</tr>";
            html+="<tr>";
            html+=" <td>" + nodo.formaRecepcion + "</td>";
            html+=" <td style='text-align: right;'>" + format(nodo.montoApoyoMensual.valor) + nodo.montoApoyoMensual.moneda + "</td>";
            html+=" <td>" + nodo.especifiqueApoyo + "</td>";
            html+="</tr>";            

            html+="<tr><td colspan='3'><td></tr>"                                
        });
        html +='<tr style="background-color: #dee2e6;"><td colspan="3">ACLARACIONES / OBSERVACIONES</td></tr>\
                <tr>\
                    <td colspan="3">' + jsonResult.declaracion.interes.apoyos.aclaracionesObservaciones + '</td>\
                </tr>';
    }
    else{
        html +='<tr><td colspan="3">NO TENGO INFORMACIÓN QUE REPORTAR.</td></tr>\
                <tr style="background-color: #dee2e6;"><td colspan="3">ACLARACIONES / OBSERVACIONES</td></tr>\
                <tr>\
                    <td colspan="3">' + jsonResult.declaracion.interes.apoyos.aclaracionesObservaciones + '</td>\
                </tr>';
    }
    $("#pdfMiDeclaracion_apoyos>tbody").empty().append(html); 
}

function tblRepresentacion(){
    let html="";
    html +='<tr><td colspan="2" style="background-color: #621132; color: #fff; font-size:14px;">4. REPRESENTACIÓN</td></tr>';

    if(!jsonResult.declaracion.interes.representacion.ninguno){
        Object.keys(jsonResult.declaracion.interes.representacion.representacion).forEach(function (index) {
            let nodo = jsonResult.declaracion.interes.representacion.representacion[index];
            let realiza= "";
            nodo.recibeRemuneracion ==true ? realiza = "SI": realiza = "NO";

            html+="<tr style='background-color: #dee2e6;'>";
            html+=" <td>TIPO DE RELACIÓN</td>";
            html+=" <td>TIPO DE REPRESENTACIÓN</td>";
            html+="</tr>";
            html+="<tr>";
            html+=" <td>" + nodo.tipoRelacion + "</td>";
            html+=" <td>" + nodo.tipoRepresentacion + "</td>";
            html+="</tr>";

            html+="<tr style='background-color: #dee2e6;'>";
            html+=" <td>FECHA DE INICIO DE LA REPRESENTACIÓN</td>";
            html+=" <td>REPRESENTANTE / REPRESENTADO</td>";
            html+="</tr>";
            html+="<tr>";
            html+=" <td>" + nodo.fechaInicioRepresentacion + "</td>";
            html+=" <td>" + nodo.tipoPersona + "</td>";
            html+="</tr>";

            html+="<tr style='background-color: #dee2e6;'>";
            html+=" <td>NOMBRE O RAZÓN SOCIAL DEL REPRESENTANTE / REPRESENTADO</td>";
            html+=" <td>RFC</td>";
            html+="</tr>";
            html+="<tr>";
            html+=" <td>" + nodo.nombreRazonSocial + "</td>";
            html+=" <td>" + nodo.rfc + "</td>";
            html+="</tr>";

            html+="<tr style='background-color: #dee2e6;'>";
            html+=" <td>¿RECIBE REMUNERACIÓN POR SU REPRESENTACIÓN?</td>";
            html+=" <td>MONTO MENSUAL NETO</td>";
            html+="</tr>";
            html+="<tr>";
            html+=" <td>" + nodo.realiza + "</td>";
            html+=" <td style='text-align: right;'>" + format(nodo.montoMensual.valor) + nodo.montoMensual.moneda + "</td>";
            html+="</tr>";

            html+="<tr style='background-color: #dee2e6;'>";
            html+=" <td>PAÍS/ENTIDAD FEDERATIVA</td>";
            html+=" <td>SECTOR PRODUCTIVO AL QUE PERTENECE</td>";
            html+="</tr>";
            html+="<tr>";
            html+=" <td>" + nodo.ubicacion.pais + "/" + nodo.ubicacion.entidadFederativa.valor + "</td>";
            html+=" <td>" + nodo.sector.valor + "</td>";
            html+="</tr>";

            html+="<tr><td colspan='2'><td></tr>"                                
        });
        html +='<tr style="background-color: #dee2e6;"><td colspan="3">ACLARACIONES / OBSERVACIONES</td></tr>\
                <tr>\
                    <td colspan="2">' + jsonResult.declaracion.interes.representacion.aclaracionesObservaciones + '</td>\
                </tr>';
    }
    else{
        html +='<tr><td colspan="2">NO TENGO INFORMACIÓN QUE REPORTAR.</td></tr>\
                <tr style="background-color: #dee2e6;"><td colspan="3">ACLARACIONES / OBSERVACIONES</td></tr>\
                <tr>\
                    <td colspan="2">' + jsonResult.declaracion.interes.representacion.aclaracionesObservaciones + '</td>\
                </tr>';
    }
    $("#pdfMiDeclaracion_representacion>tbody").empty().append(html);      
}

function tblClientes(){
    let html="";
    html +='<tr><td colspan="3" style="background-color: #621132; color: #fff; font-size:14px;">5. CLIENTES PRINCIPALES</td></tr>';

    if(!jsonResult.declaracion.interes.clientesPrincipales.ninguno){
        Object.keys(jsonResult.declaracion.interes.clientesPrincipales.cliente).forEach(function (index) {
            let nodo = jsonResult.declaracion.interes.clientesPrincipales.cliente[index];
            let realiza= "";
            nodo.realizaActividadLucrativa ==true ? realiza = "SI": realiza = "NO";
            html+="<tr style='background-color: #dee2e6;'>";
            html+=" <td colspan='2'>¿REALIZA ALGUNA ACTIVIDAD LUCRATIVA INDEPENDIENTE AL EMPLEO, CARGO O COMISIÓN?</td>";
            html+=" <td>TIPO DE RELACIÓN</td>";
            html+="</tr>";
            html+="<tr>";
            html+=" <td colspan='2'>" + realiza + "</td>";
            html+=" <td>" + nodo.tipoRelacion + "</td>";
            html+="</tr>";

            html+="<tr style='background-color: #dee2e6;'>";
            html+=" <td colspan='2'>NOMBRE DE LA EMPRESA O SERVICIO QUE PROPORCIONA</td>";
            html+=" <td>RFC</td>";
            html+="</tr>";
            html+="<tr>";
            html+=" <td colspan='2'>" + nodo.empresa.nombreEmpresaServicio + "</td>";
            html+=" <td>" + nodo.empresa.rfc + "</td>";
            html+="</tr>";

            html+="<tr style='background-color: #dee2e6;'>";
            html+=" <td>CLIENTE PRINCIPAL</td>";
            html+=" <td>SEÑALE NOMBRE O RAZÓN SOCIAL DEL CLIENTE PRINCIPAL</td>";
            html+=" <td>RFC</td>";
            html+="</tr>";
            html+="<tr>";
            html+=" <td>" + nodo.clientePrincipal.tipoPersona + "</td>";
            html+=" <td>" + nodo.clientePrincipal.nombreRazonSocial + "</td>";
            html+=" <td>" + nodo.clientePrincipal.rfc + "</td>";
            html+="</tr>";

            html+="<tr style='background-color: #dee2e6;'>";
            html+=" <td>SECTOR PRODUCTIVO AL QUE PERTENECE</td>";
            html+=" <td>MONTO APROXIMADO DEL BENEFICIO O GANANCIA MENSUAL QUE OBTIENE DEL CLIENTE PRINCIPAL</td>";
            html+=" <td>PAÍS/ENTIDAD FEDERATIVA</td>";
            html+="</tr>";
            html+="<tr>";
            html+=" <td>" + nodo.sector.valor + "</td>";
            html+=" <td style='text-align: right;'>" + format(nodo.montoAproximadoGanancia.valor) + nodo.montoAproximadoGanancia.moneda + "</td>";
            html+=" <td>" + nodo.ubicacion.pais + "/" + nodo.ubicacion.entidadFederativa.valor + "</td>";
            html+="</tr>";

            html+="<tr><td colspan='3'><td></tr>"                                
        });
        html +='<tr style="background-color: #dee2e6;"><td colspan="3">ACLARACIONES / OBSERVACIONES</td></tr>\
                <tr>\
                    <td colspan="3">' + jsonResult.declaracion.interes.clientesPrincipales.aclaracionesObservaciones + '</td>\
                </tr>';
    }
    else{
        html +='<tr><td colspan="3">NO TENGO INFORMACIÓN QUE REPORTAR.</td></tr>\
                <tr style="background-color: #dee2e6;"><td colspan="3">ACLARACIONES / OBSERVACIONES</td></tr>\
                <tr>\
                    <td colspan="3">' + jsonResult.declaracion.interes.clientesPrincipales.aclaracionesObservaciones + '</td>\
                </tr>';
    }
    $("#pdfMiDeclaracion_clientesPrincipales>tbody").empty().append(html);  
}

function tblBeneficios(){
    let html="";
    html +='<tr><td colspan="3" style="background-color: #621132; color: #fff; font-size:14px;">6. BENEFICIOS PRIVADOS</td></tr>';

    if(!jsonResult.declaracion.interes.beneficiosPrivados.ninguno){
        Object.keys(jsonResult.declaracion.interes.beneficiosPrivados.beneficio).forEach(function (index) {
            var nodo = jsonResult.declaracion.interes.beneficiosPrivados.beneficio[index];
            let beneficiarios="";
            $(nodo.beneficiario).each(function(index, item) {
                beneficiarios += item.valor + ",";           
            });

            html+="<tr style='background-color: #dee2e6;'>";
            html+=" <td>TIPO DE BENEFICIO</td>";
            html+=" <td colspan='2'>BENEFICIARIO(S):</td>";
            html+="</tr>";
            html+="<tr>";
            html+=" <td>" + nodo.tipoBeneficio.valor + "</td>";
            html+=" <td colspan='2'>" + beneficiarios.slice(0,-1) + "</td>";
            html+="</tr>";
            
            html+="<tr style='background-color: #dee2e6;'>";
            html+=" <td>OTORGANTE</td>";
            html+=" <td>NOMBRE O RAZÓN SOCIAL DEL OTORGANTE</td>";
            html+=" <td>RFC</td>";
            html+="</tr>";
            html+="<tr>";
            html+=" <td>" + nodo.otorgante.tipoPersona + "</td>";
            html+=" <td>" + nodo.otorgante.nombreRazonSocial + "</td>";
            html+=" <td>" + nodo.otorgante.rfc + "</td>";
            html+="</tr>";
            
            html+="<tr style='background-color: #dee2e6;'>";
            html+=" <td>FORMA DE RECEPCIÓN DEL BENEFICIO</td>";
            html+=" <td>ESPECIFIQUE EL BENEFICIO</td>";
            html+=" <td>MONTO MENSUAL APROXIMADO DEL BENEFICIO</td>";
            html+="</tr>";
            html+="<tr>";
            html+=" <td>" + nodo.formaRecepcion + "</td>";
            html+=" <td>" + nodo.especifiqueBeneficio + "</td>";
            html+=" <td style='text-align: right;'>" + format(nodo.montoMensualAproximado.valor) + nodo.montoMensualAproximado.moneda + "</td>";
            html+="</tr>";
            
            html+="<tr style='background-color: #dee2e6;'>";
            html+=" <td colspan='3'>SECTOR PRODUCTIVO AL QUE PERTENECE</td>";
            html+="</tr>";
            html+="<tr>";
            html+=" <td colspan='3'>" + nodo.sector.valor + "</td>";
            html+="</tr>";
                        
            html+="<tr><td colspan='3'><td></tr>"                                
        });
        html +='<tr style="background-color: #dee2e6;"><td colspan="3">ACLARACIONES / OBSERVACIONES</td></tr>\
                <tr>\
                    <td colspan="3">' + jsonResult.declaracion.interes.beneficiosPrivados.aclaracionesObservaciones + '</td>\
                </tr>';
    }
    else{
        html +='<tr><td colspan="3">NO TENGO INFORMACIÓN QUE REPORTAR.</td></tr>\
                <tr style="background-color: #dee2e6;"><td colspan="3">ACLARACIONES / OBSERVACIONES</td></tr>\
                <tr>\
                    <td colspan="3">' + jsonResult.declaracion.interes.beneficiosPrivados.aclaracionesObservaciones + '</td>\
                </tr>';
    }
    $("#pdfMiDeclaracion_beneficiosPrivados>tbody").empty().append(html);
}

function tblFideicomisos(){
    let html="";
    html +='<tr><td colspan="3" style="background-color: #621132; color: #fff; font-size:14px;">7. FIDEICOMISOS</td></tr>';

    if(!jsonResult.declaracion.interes.fideicomisos.ninguno){
        Object.keys(jsonResult.declaracion.interes.fideicomisos.fideicomiso).forEach(function (index) {
            var nodo = jsonResult.declaracion.interes.fideicomisos.fideicomiso[index];
           
            html+="<tr style='background-color: #dee2e6;'>";
            html+=" <td>PARTICIPACIÓN DE FIDEICOMISOS</td>";
            html+=" <td>TIPO DE FIDEICOMISO</td>";
            html+=" <td>TIPO DE PARTICIPACIÓN</td>";
            html+="</tr>";
            html+="<tr>";
            html+=" <td>" + nodo.tipoRelacion + "</td>";
            html+=" <td>" + nodo.tipoFideicomiso + "</td>";
            html+=" <td>" + nodo.tipoParticipacion + "</td>";
            html+="</tr>";

            html+="<tr style='background-color: #dee2e6;'>";
            html+=" <td>RFC DEL FIDEICOMISO</td>";
            html+=" <td>SECTOR PRODUCTIVO AL QUE PERTENECE</td>";
            html+=" <td>¿DÓNDE SE LOCALIZA EL FIDEICOMISO?</td>";
            html+="</tr>";
            html+="<tr>";
            html+=" <td>" + nodo.rfcFideicomiso + "</td>";
            html+=" <td>" + nodo.sector.valor + "</td>";
            html+=" <td>" + nodo.extranjero + "</td>";
            html+="</tr>";

            html+="<tr style='background-color: #dee2e6;'>";
            html+=" <td>FIDEICOMITENTE</td>";
            html+=" <td>NOMBRE O RAZÓN SOCIAL DEL FIDEICOMITENTE</td>";
            html+=" <td>RFC DEL FIDEICOMITENTE</td>";
            html+="</tr>";
            html+="<tr>";
            html+=" <td>" + nodo.fideicomitente.tipoPersona + "</td>";
            html+=" <td>" + nodo.fideicomitente.nombreRazonSocial + "</td>";
            html+=" <td>" + nodo.fideicomitente.rfc + "</td>";
            html+="</tr>";

            html+="<tr style='background-color: #dee2e6;'>";
            html+=" <td colspan='2'>NOMBRE O RAZÓN SOCIAL DEL FIDUCIARIO</td>";
            html+=" <td>RFC</td>";
            html+="</tr>";
            html+="<tr>";
            html+=" <td>" + nodo.fiduciario.nombreRazonSocial + "</td>";
            html+=" <td>" + nodo.fiduciario.rfc + "</td>";
            html+="</tr>";

            html+="<tr style='background-color: #dee2e6;'>";
            html+=" <td>FIDEICOMISARIO</td>";
            html+=" <td>NOMBRE O RAZÓN SOCIAL DEL FIDEICOMISARIO</td>";
            html+=" <td>RFC</td>";
            html+="</tr>";
            html+="<tr>";
            html+=" <td>" + nodo.fideicomisario.tipoPersona + "</td>";
            html+=" <td>" + nodo.fideicomisario.nombreRazonSocial + "</td>";
            html+=" <td>" + nodo.fideicomisario.rfc + "</td>";
            html+="</tr>";

            html+="<tr><td colspan='3'><td></tr>"                                
        });
        html +='<tr style="background-color: #dee2e6;"><td colspan="3">ACLARACIONES / OBSERVACIONES</td></tr>\
                <tr>\
                    <td colspan="3">' + jsonResult.declaracion.interes.fideicomisos.aclaracionesObservaciones + '</td>\
                </tr>';
    }
    else{
        html +='<tr><td colspan="3">NO TENGO INFORMACIÓN QUE REPORTAR.</td></tr>\
                <tr style="background-color: #dee2e6;"><td colspan="3">ACLARACIONES / OBSERVACIONES</td></tr>\
                <tr>\
                    <td colspan="3">' + jsonResult.declaracion.interes.fideicomisos.aclaracionesObservaciones + '</td>\
                </tr>';
    }
    $("#pdfMiDeclaracion_fideicomisos>tbody").empty().append(html);
}

function tblConstanciaFiscal(){
    let html="";
    html ='<tr><td colspan="3" style="color: #621132; border-bottom:1px solid #621132; font-size:14px;">DECLARACIÓN FISCAL</td></tr>';
    $("#pdfMiDeclaracion_fiscal_titulo>tbody").empty().append(html);    
    html ='<tr><td colspan="3" style="background-color: #621132; color: #fff; font-size:14px;">1. CONSTANCIA DE DECLARACIÓN FISCAL</td></tr>';
    if(jsonResult.declaracion.fiscal.constanciaFiscal.constancia){
        html +='<tr><td colspan="3">SI PRESENTÓ DECLARACIÓN FISCAL.</td></tr>';
    }
    else{
        html +='<tr><td colspan="3">NO TENGO INFORMACIÓN QUE REPORTAR.</td></tr>';
    }
    html +='<tr style="background-color: #dee2e6;"><td colspan="3">ACLARACIONES / OBSERVACIONES</td></tr>\
            <tr>\
                <td colspan="3">' + jsonResult.declaracion.fiscal.constanciaFiscal.aclaracionesObservaciones + '</td>\
            </tr>';
    $("#pdfMiDeclaracion_constanciaFiscal>tbody").empty().append(html);
}

function getDateTime(){
    var today = new Date();
    var date = today.getDate().toString().padStart(2,0) + '/' + (today.getMonth()+1).toString().padStart(2,0)  + '/' + today.getFullYear().toString();
    var time = today.getHours().toString().padStart(2,0) + ":" + today.getMinutes().toString().padStart(2,0) + ":" + today.getSeconds().toString().padStart(2,0);
    return  date+' '+time;
}