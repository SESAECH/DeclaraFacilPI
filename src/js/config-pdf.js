
$("#btnTerminarDeclaracion").on('click',function() {
    if ($("input[name='nameContralor']").val().length<3){ mensajeSwal("Aviso","Ingrese el nombre del Contralor Interno.","error");}
    else{ 
        jsonResult.captura.contralor=$("input[name='nameContralor']").val();
        generarPDF();
    }    
});

var base64Img ='data:image/png;base64,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';

window.generarPDF = function generarPDF(){    
    if(jsonResult.captura.formato =="SIMPLIFICADA"){
        gerarPdfDecSimplificada();
    }
    else{
        gerarPdfDecCompleta();
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
    doc.text('C. ' + $("input[name='nameContralor']").val() + ', BAJO PROTESTA DE DECIR VERDAD, PRESENTO A USTED MI DECLARACIÓN DE SITUACIÓN PATRIMONIAL Y DE INTERESES, CONFORME A LO DISPUESTO EN LA LEY GENERAL DE RESPONSABILIDADES ADMINISTRATIVAS, LA LEY GENERAL DEL SISTEMA NACIONAL ANTICORRUPCIÓN Y LA NORMATIVIDAD APLICABLE.', 15, 60, {maxWidth: 180, align: "justify"})
    
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
    if(jsonResult.declaracion.situacionPatrimonial.domicilioDeclarante.domicilio =="MX"){
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

    headeFooter(doc);
    descargar(doc);        
}

function gerarPdfDecCompleta(){
    var doc = new jsPDF();//'p', 'pt', 'letter');
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
    doc.text('C. ' + $("input[name='nameContralor']").val() + ', BAJO PROTESTA DE DECIR VERDAD, PRESENTO A USTED MI DECLARACIÓN DE SITUACIÓN PATRIMONIAL Y DE INTERESES, CONFORME A LO DISPUESTO EN LA LEY GENERAL DE RESPONSABILIDADES ADMINISTRATIVAS, LA LEY GENERAL DEL SISTEMA NACIONAL ANTICORRUPCIÓN Y LA NORMATIVIDAD APLICABLE.', 15, 60, {maxWidth: 180, align: "justify"})
    
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
    if(jsonResult.declaracion.situacionPatrimonial.domicilioDeclarante.domicilio =="MX"){
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
    let text = JSON.stringify(jsonResult);
    let filename = jsonResult.declaracion.situacionPatrimonial.datosGenerales.curp + "_" + jsonResult.captura.tipo_declaracion + "_" + fecha.getFullYear() + ".dec";                    
    download(filename, text);

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
    if(jsonResult.captura.formato =="SIMPLIFICADA"){
        tblDatosGenerales();
        tblDomicilio();
        tblDatosCurriculares();
        tblEmpleo();
        tblCV();
        tblIngresos("6. INGRESOS NETOS DEL DECLARANTE, PAREJA Y/O DEPENDIENTES ECONÓMICOS");
        if (jsonResult.captura.tipo_declaracion !="MODIFICACION"){tblDesempenoServidorPublico("7. ¿TE DESEMPEÑASTE COMO SERVIDOR PÚBLICO EL AÑO INMEDIATO ANTERIOR?");}        
    }
    else{
        if (jsonResult.captura.tipo_declaracion =="MODIFICACION"){
            tblDatosGenerales();
            tblDomicilio();
            tblDatosCurriculares();
            tblEmpleo();
            tblCV();
            tblPareja("6. DATOS DE LA PAREJA");
            tblDependienteEco("7. DATOS DEL DEPENDIENTE ECONÓMICO");
            tblIngresos("8. INGRESOS NETOS DEL DECLARANTE, PAREJA Y/O DEPENDIENTES ECONÓMICOS");
            //tblBienesInMuebles("9. BIENES INMUEBLES");
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
        }
        else{
            tblDatosGenerales();
            tblDomicilio();
            tblDatosCurriculares();
            tblEmpleo();
            tblCV();
            tblPareja("6. DATOS DE LA PAREJA");
            tblDependienteEco("7. DATOS DEL DEPENDIENTE ECONÓMICO");
            tblIngresos("8. INGRESOS NETOS DEL DECLARANTE, PAREJA Y/O DEPENDIENTES ECONÓMICOS");
            tblDesempenoServidorPublico("9. ¿TE DESEMPEÑASTE COMO SERVIDOR PÚBLICO EL AÑO INMEDIATO ANTERIOR?");
            //tblBienesInMuebles("10. BIENES INMUEBLES");
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
        $("#pdfMiDeclaracion_domicilioDeclaranteEXT .calle").text(nodo.domicilioMexico.calle);
        $("#pdfMiDeclaracion_domicilioDeclaranteEXT .numeroExterior").text(nodo.domicilioMexico.numeroExterior);
        $("#pdfMiDeclaracion_domicilioDeclaranteEXT .numeroInterior").text(nodo.domicilioMexico.numeroInterior);
        $("#pdfMiDeclaracion_domicilioDeclaranteEXT .coloniaLocalidad").text(nodo.domicilioMexico.coloniaLocalidad);
        $("#pdfMiDeclaracion_domicilioDeclaranteEXT .estadoProvincia").text(nodo.domicilioMexico.estadoProvincia);
        $("#pdfMiDeclaracion_domicilioDeclaranteEXT .pais").text(nodo.domicilioMexico.pais);
        $("#pdfMiDeclaracion_domicilioDeclaranteEXT .codigoPostal").text(nodo.domicilioMexico.codigoPostal);
        $("#pdfMiDeclaracion_domicilioDeclaranteEXT .aclaracionesObservaciones").text(nodo.aclaracionesObservaciones);
    }
}

function tblDatosCurriculares(){
    let html="";
     html+='<tr><td colspan="5" style="background-color: #621132; color: #fff; font-size:14px;">3. DATOS CURRICULARES</td></tr>';
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
                <td style="background-color: #dee2e6;" colspan="5">ACLARACIONES/OBSERVACIONES</td>\
            </tr>\
            <tr>\
                <td colspan="5" style="height:80px;">' + jsonResult.declaracion.situacionPatrimonial.datosCurricularesDeclarante.aclaracionesObservaciones + '</td>\
            </tr>';
    $("#pdfMiDeclaracion_datosCurricularesDeclarante>tbody").empty().append(html);
}

function tblEmpleo(){
    //DATOS DEL EMPLEO, CARGO O COMISIÓN
    let nodo = jsonResult.declaracion.situacionPatrimonial.datosEmpleoCargoComision;
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
        $("#pdfMiDeclaracion_datosEmpleoCargoComisionDOMEXT .calle").text(nodo.domicilioMexico.calle);
        $("#pdfMiDeclaracion_datosEmpleoCargoComisionDOMEXT .numeroExterior").text(nodo.domicilioMexico.numeroExterior);
        $("#pdfMiDeclaracion_datosEmpleoCargoComisionDOMEXT .numeroInterior").text(nodo.domicilioMexico.numeroInterior);
        $("#pdfMiDeclaracion_datosEmpleoCargoComisionDOMEXT .coloniaLocalidad").text(nodo.domicilioMexico.coloniaLocalidad);
        $("#pdfMiDeclaracion_datosEmpleoCargoComisionDOMEXT .estadoProvincia").text(nodo.domicilioMexico.estadoProvincia);
        $("#pdfMiDeclaracion_datosEmpleoCargoComisionDOMEXT .pais").text(nodo.domicilioMexico.pais.toUpperCase());
        $("#pdfMiDeclaracion_datosEmpleoCargoComisionDOMEXT .codigoPostal").text(nodo.domicilioMexico.codigoPostal);
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
                            <td colspan="2">NOMBRE DEL ENTE PÚBLICO/NOMBRE DE LA EMPRESA, SOCIEDAD O ASOCIACIÓN</td>\
                            <td>UBICACIÓN</td>\
                        </tr>\
                        <tr>\
                            <td colspan="2">' + nodo.nombreEntePublico + '</td>\
                            <td>' + nodo.ubicacion + '</td>\
                        </tr>\
                        <tr style="background-color: #dee2e6;">\
                            <td style="width: 34%;">ÁMBITO/SECTOR EN QUE LABORASTE</td>\
                            <td style="width: 33%;">NIVEL/ORDEN DE GOBIERNO</td>\
                            <td style="width: 33%;">ÁMBITO PÚBLICO</td>\
                        </tr>\
                        <tr>\
                            <td style="width: 34%;">' + nodo.ambitoSector.valor + '</td>\
                            <td style="width: 33%;">' + nodo.nivelOrdenGobierno + '</td>\
                            <td style="width: 33%;">' + nodo.ambitoPublico + '</td>\
                        </tr>\
                        <tr style="background-color: #dee2e6;">\
                            <td style="width: 34%;">EMPLEO, CARGO O COMISIÓN/PUESTO</td>\
                            <td style="width: 33%;">FECHA DE INGRESO</td>\
                            <td style="width: 33%;">FECHA DE EGRESO</td>\
                        </tr>\
                        <tr>\
                            <td style="width: 34%;">' + nodo.empleoCargoComision + '</td>\
                            <td style="width: 33%;">' + nodo.fechaIngreso + '</td>\
                            <td style="width: 33%;">' + nodo.fechaEgreso + '</td>\
                        </tr>';
            }
            else{
                html +=' <tr style="background-color: #dee2e6;">\
                            <td colspan="3">NOMBRE DEL ENTE PÚBLICO/NOMBRE DE LA EMPRESA, SOCIEDAD O ASOCIACIÓN</td>\
                        </tr>\
                        <tr>\
                            <td colspan="3">' +  nodo.nombreEmpresaSociedadAsociacion + '</td>\
                        </tr>\
                        <tr style="background-color: #dee2e6;">\
                            <td style="width: 34%;">ÁMBITO/SECTOR EN QUE LABORASTE</td>\
                            <td style="width: 33%;">NIVEL/ORDEN DE GOBIERNO</td>\
                            <td style="width: 33%;">ÁMBITO PÚBLICO</td>\
                        </tr>\
                        <tr>\
                            <td style="width: 34%;">' + nodo.ambitoSector.valor + '</td>\
                            <td style="width: 33%;">' + nodo.nivelOrdenGobierno + '</td>\
                            <td style="width: 33%;">' + nodo.ambitoPublico + '</td>\
                        </tr>\
                        <tr style="background-color: #dee2e6;">\
                            <td>RFC</td>\
                            <td>ÁREA DE ADSCRIPCIÓN</td>\
                        </tr>\
                        <tr style="background-color: #dee2e6;">\
                            <td>' + nodo.rfc + '</td>\
                            <td>' + nodo.area + '</td>\
                        </tr>\
                        <tr style="background-color: #dee2e6;">\
                            <td style="width: 34%;">EMPLEO, CARGO O COMISIÓN/PUESTO</td>\
                            <td style="width: 33%;">FECHA DE INGRESO</td>\
                            <td style="width: 33%;">FECHA DE EGRESO</td>\
                        </tr>\
                        <tr>\
                            <td style="width: 34%;">' + nodo.puesto + '</td>\
                            <td style="width: 33%;">' + nodo.fechaIngreso + '</td>\
                            <td style="width: 33%;">' + nodo.fechaEgreso + '</td>\
                        </tr>\
                        <tr style="background-color: #dee2e6;">\
                            <td colspan="2">SECTOR</td>\
                            <td>UBICACIÓN</td>\
                        </tr>\
                        <tr>\
                            <td colspan="2">' + nodo.sector.valor + '</td>\
                            <td>' + nodo.ubicacion + '</td>\
                        </tr>';
            }
            html+='<tr><td colspan="3" style="background-color: #fff; border:1px solid #fff; color: #fff; font-size:14px;"></td></tr>';
        }); 
        html+= '<tr style="background-color: #dee2e6;"><td colspan="3">ACLARACIONES/OBSERVACIONES</td></tr>\
                <tr>\
                    <td colspan="3">' + jsonResult.declaracion.situacionPatrimonial.experienciaLaboral.aclaracionesObservaciones + '</td>\
                </tr>';       
    }
    else{
        html +='<tr><td colspan="3">NO TENGO INFORMACIÓN QUE REPORTAR.</td></tr>\
                <tr style="background-color: #dee2e6;"><td colspan="3">ACLARACIONES/OBSERVACIONES</td></tr>\
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
        html+=" <td>" + nodo.fechaNacimiento + "</td>";
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
        html+=" <td>" + nodo.esDependienteEconomico + "</td>";
        html+=" <td>" + nodo.ciudadanoExtranjero + "</td>";
        html+=" <td>" + nodo.habitaDomicilioDeclarante + "</td>";
        html+="</tr>";

        if (nodo.lugarDondeReside=="MÉXICO"){
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

        html +='<tr style="background-color: #dee2e6;"><td colspan="3">ACLARACIONES/OBSERVACIONES</td></tr>\
                <tr>\
                    <td colspan="3">' + jsonResult.declaracion.situacionPatrimonial.datosPareja.aclaracionesObservaciones + '</td>\
                </tr>';
    }
    else{
        html +='<tr><td colspan="3">NO TENGO INFORMACIÓN QUE REPORTAR.</td></tr>\
                <tr style="background-color: #dee2e6;"><td colspan="3">ACLARACIONES/OBSERVACIONES</td></tr>\
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
        Object.keys(jsonResult.declaracion.situacionPatrimonial.datosDependienteEconomico.vehiculo).forEach(function (index) {
            var nodo = jsonResult.declaracion.situacionPatrimonial.datosDependienteEconomico.dependienteEconomico[index];
            //var nodo = jsonResult.declaracion.situacionPatrimonial.datosDependienteEconomico;
           
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
            html+=" <td>" + nodo.fechaNacimiento + "</td>";
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
            html+=" <td>" + nodo.ciudadanoExtranjero + "</td>";
            html+=" <td>" + nodo.habitaDomicilioDeclarante + "</td>";
            html+="</tr>";

            if (nodo.lugarDondeReside=="MÉXICO"){
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
            else if (nodo.lugarDondeReside=="EXTRANJERO"){
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
        });
        html +='<tr style="background-color: #dee2e6;"><td colspan="3">ACLARACIONES/OBSERVACIONES</td></tr>\
                <tr>\
                    <td colspan="3">' + jsonResult.declaracion.situacionPatrimonial.datosDependienteEconomico.aclaracionesObservaciones + '</td>\
                </tr>';
    }
    else{
        html +='<tr><td colspan="3">NO TENGO INFORMACIÓN QUE REPORTAR.</td></tr>\
                <tr style="background-color: #dee2e6;"><td colspan="3">ACLARACIONES/OBSERVACIONES</td></tr>\
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
            
    html += '<tr style="background-color: #dee2e6;"><td colspan="2">ACLARACIONES/OBSERVACIONES</td></tr>\
            <tr>\
                <td colspan="2">' + nodoIngresos.aclaracionesObservaciones + '</td>\
            </tr>';
    
    $("#pdfMiDeclaracion_ingresos>tbody").empty().append(html);
}

function tblDesempenoServidorPublico(titulo){
    let nodo = jsonResult.declaracion.situacionPatrimonial.actividadAnualAnterior
    let html="";
    html +='<tr><td colspan="2" style="background-color: #621132; color: #fff; font-size:14px;">' + titulo + '</td></tr>';
    if(jsonResult.declaracion.situacionPatrimonial.actividadAnualAnterior.ninguno){
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
                
        html += '<tr style="background-color: #dee2e6;"><td colspan="2">ACLARACIONES/OBSERVACIONES</td></tr>\
                <tr>\
                    <td colspan="2">' + nodo.aclaracionesObservaciones + '</td>\
                </tr>';
    }
    else{
        html +='<tr><td colspan="2">NO TENGO INFORMACIÓN QUE REPORTAR.</td></tr>\
                <tr style="background-color: #dee2e6;"><td colspan="2">ACLARACIONES/OBSERVACIONES</td></tr>\
                <tr>\
                    <td colspan="2">' + jsonResult.declaracion.situacionPatrimonial.actividadAnualAnterior.aclaracionesObservaciones + '</td>\
                </tr>';
            }
    $("#pdfMiDeclaracion_desempenoServidorPublico>tbody").empty().append(html);
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
            html+=" <td>" + nodo.modelo + "</td>";
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
                    html+=" <td>TERCERO</td>";
                    html+=" <td>NOMBRE / INSTITUCIÓN O RAZÓN SOCIAL</td>";
                    html+=" <td>RELACIÓN</td>";
                    html+="</tr>";
                    html+="<tr>";
                    html+=" <td>" + tercero.tipoPersona +"/" +  tercero.rfc +"</td>";
                    html+=" <td>" + tercero.nombreRazonSocial + "</td>";
                    html+=" <td>" + tercero.relacion.clave + "</td>";
                    html+="</tr>";
                });
            }

            html+="<tr style='border-left:1px solid #fff; border-right:1px solid #fff;'><td colspan='3' style='border-left:1px solid #fff; border-right:1px solid #fff;'><td></tr>"                                
        });
        html +='<tr style="background-color: #dee2e6;"><td colspan="3">ACLARACIONES/OBSERVACIONES</td></tr>\
                <tr>\
                    <td colspan="3">' + jsonResult.declaracion.situacionPatrimonial.vehiculos.aclaracionesObservaciones + '</td>\
                </tr>';
    }
    else{
        html +='<tr><td colspan="3">NO TENGO INFORMACIÓN QUE REPORTAR.</td></tr>\
                <tr style="background-color: #dee2e6;"><td colspan="3">ACLARACIONES/OBSERVACIONES</td></tr>\
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
                    html+=" <td>TERCERO</td>";
                    html+=" <td>NOMBRE / INSTITUCIÓN O RAZÓN SOCIAL</td>";
                    html+=" <td>RELACIÓN</td>";
                    html+="</tr>";
                    html+="<tr>";
                    html+=" <td>" + tercero.tipoPersona +"/" +  tercero.rfc +"</td>";
                    html+=" <td>" + tercero.nombreRazonSocial + "</td>";
                    html+=" <td>" + tercero.relacion.clave + "</td>";
                    html+="</tr>";
                });
            }

            html+="<tr style='border-left:1px solid #fff; border-right:1px solid #fff;'><td colspan='3' style='border-left:1px solid #fff; border-right:1px solid #fff;'><td></tr>"                                
        });
        html +='<tr style="background-color: #dee2e6;"><td colspan="3">ACLARACIONES/OBSERVACIONES</td></tr>\
                <tr>\
                    <td colspan="3">' + jsonResult.declaracion.situacionPatrimonial.bienesMuebles.aclaracionesObservaciones + '</td>\
                </tr>';
    }
    else{
        html +='<tr><td colspan="3">NO TENGO INFORMACIÓN QUE REPORTAR.</td></tr>\
                <tr style="background-color: #dee2e6;"><td colspan="3">ACLARACIONES/OBSERVACIONES</td></tr>\
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
        html +='<tr style="background-color: #dee2e6;"><td colspan="3">ACLARACIONES/OBSERVACIONES</td></tr>\
                <tr>\
                    <td colspan="3">' + jsonResult.declaracion.situacionPatrimonial.inversiones.aclaracionesObservaciones + '</td>\
                </tr>';
    }
    else{
        html +='<tr><td colspan="3">NO TENGO INFORMACIÓN QUE REPORTAR.</td></tr>\
                <tr style="background-color: #dee2e6;"><td colspan="3">ACLARACIONES/OBSERVACIONES</td></tr>\
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
        html +='<tr style="background-color: #dee2e6;"><td colspan="3">ACLARACIONES/OBSERVACIONES</td></tr>\
                <tr>\
                    <td colspan="3">' + jsonResult.declaracion.situacionPatrimonial.adeudos.aclaracionesObservaciones + '</td>\
                </tr>';
    }
    else{
        html +='<tr><td colspan="3">NO TENGO INFORMACIÓN QUE REPORTAR.</td></tr>\
                <tr style="background-color: #dee2e6;"><td colspan="3">ACLARACIONES/OBSERVACIONES</td></tr>\
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
        html +='<tr style="background-color: #dee2e6;"><td colspan="3">ACLARACIONES/OBSERVACIONES</td></tr>\
                <tr>\
                    <td colspan="3">' + jsonResult.declaracion.situacionPatrimonial.prestamoOComodato.aclaracionesObservaciones + '</td>\
                </tr>';
    }
    else{
        html +='<tr><td colspan="3">NO TENGO INFORMACIÓN QUE REPORTAR.</td></tr>\
                <tr style="background-color: #dee2e6;"><td colspan="3">ACLARACIONES/OBSERVACIONES</td></tr>\
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
        html +='<tr style="background-color: #dee2e6;"><td colspan="3">ACLARACIONES/OBSERVACIONES</td></tr>\
                <tr>\
                    <td colspan="3">' + jsonResult.declaracion.interes.participacion.aclaracionesObservaciones + '</td>\
                </tr>';
    }
    else{
        html +='<tr><td colspan="3">NO TENGO INFORMACIÓN QUE REPORTAR.</td></tr>\
                <tr style="background-color: #dee2e6;"><td colspan="3">ACLARACIONES/OBSERVACIONES</td></tr>\
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
        html +='<tr style="background-color: #dee2e6;"><td colspan="3">ACLARACIONES/OBSERVACIONES</td></tr>\
                <tr>\
                    <td colspan="3">' + jsonResult.declaracion.interes.participacionTomaDecisiones.aclaracionesObservaciones + '</td>\
                </tr>';
    }
    else{
        html +='<tr><td colspan="3">NO TENGO INFORMACIÓN QUE REPORTAR.</td></tr>\
                <tr style="background-color: #dee2e6;"><td colspan="3">ACLARACIONES/OBSERVACIONES</td></tr>\
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
        html +='<tr style="background-color: #dee2e6;"><td colspan="3">ACLARACIONES/OBSERVACIONES</td></tr>\
                <tr>\
                    <td colspan="3">' + jsonResult.declaracion.interes.apoyos.aclaracionesObservaciones + '</td>\
                </tr>';
    }
    else{
        html +='<tr><td colspan="3">NO TENGO INFORMACIÓN QUE REPORTAR.</td></tr>\
                <tr style="background-color: #dee2e6;"><td colspan="3">ACLARACIONES/OBSERVACIONES</td></tr>\
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
        html +='<tr style="background-color: #dee2e6;"><td colspan="3">ACLARACIONES/OBSERVACIONES</td></tr>\
                <tr>\
                    <td colspan="2">' + jsonResult.declaracion.interes.representacion.aclaracionesObservaciones + '</td>\
                </tr>';
    }
    else{
        html +='<tr><td colspan="2">NO TENGO INFORMACIÓN QUE REPORTAR.</td></tr>\
                <tr style="background-color: #dee2e6;"><td colspan="3">ACLARACIONES/OBSERVACIONES</td></tr>\
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
        html +='<tr style="background-color: #dee2e6;"><td colspan="3">ACLARACIONES/OBSERVACIONES</td></tr>\
                <tr>\
                    <td colspan="3">' + jsonResult.declaracion.interes.clientesPrincipales.aclaracionesObservaciones + '</td>\
                </tr>';
    }
    else{
        html +='<tr><td colspan="3">NO TENGO INFORMACIÓN QUE REPORTAR.</td></tr>\
                <tr style="background-color: #dee2e6;"><td colspan="3">ACLARACIONES/OBSERVACIONES</td></tr>\
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
        html +='<tr style="background-color: #dee2e6;"><td colspan="3">ACLARACIONES/OBSERVACIONES</td></tr>\
                <tr>\
                    <td colspan="3">' + jsonResult.declaracion.interes.beneficiosPrivados.aclaracionesObservaciones + '</td>\
                </tr>';
    }
    else{
        html +='<tr><td colspan="3">NO TENGO INFORMACIÓN QUE REPORTAR.</td></tr>\
                <tr style="background-color: #dee2e6;"><td colspan="3">ACLARACIONES/OBSERVACIONES</td></tr>\
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
        html +='<tr style="background-color: #dee2e6;"><td colspan="3">ACLARACIONES/OBSERVACIONES</td></tr>\
                <tr>\
                    <td colspan="3">' + jsonResult.declaracion.interes.fideicomisos.aclaracionesObservaciones + '</td>\
                </tr>';
    }
    else{
        html +='<tr><td colspan="3">NO TENGO INFORMACIÓN QUE REPORTAR.</td></tr>\
                <tr style="background-color: #dee2e6;"><td colspan="3">ACLARACIONES/OBSERVACIONES</td></tr>\
                <tr>\
                    <td colspan="3">' + jsonResult.declaracion.interes.fideicomisos.aclaracionesObservaciones + '</td>\
                </tr>';
    }
    $("#pdfMiDeclaracion_fideicomisos>tbody").empty().append(html);
}


function getDateTime(){
    var today = new Date();
    var date = today.getDate().toString().padStart(2,0) + '/' + (today.getMonth()+1).toString().padStart(2,0)  + '/' + today.getFullYear().toString();
    var time = today.getHours().toString().padStart(2,0) + ":" + today.getMinutes().toString().padStart(2,0) + ":" + today.getSeconds().toString().padStart(2,0);
    return  date+' '+time;
}