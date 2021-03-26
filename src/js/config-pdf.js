
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
    doc.autoTable({ html: '#pdfTitulo3', margin: { top: 25, bottom:0 }, styles: { fontSize: 12 }, useCss: true });  
    finalY = doc.lastAutoTable.finalY;
    doc.autoTable({ html: '#pdfMiDeclaracion_datosCurricularesDeclarante', margin: { top: 0, bottom:25 }, styles: { fontSize: 8 }, startY: finalY + 1, useCss: true, didDrawPage: function (data) { data.settings.margin.top = 30; }, rowPageBreak: 'auto' });   
    
    //DATOS DEL EMPLEO, CARGO O COMISION.
    finalY = doc.lastAutoTable.finalY;
    doc.autoTable({ html: '#pdfTitulo4', margin: { top: 25, bottom:0 }, styles: { fontSize: 12 }, startY: finalY + 10, useCss: true });  
    finalY = doc.lastAutoTable.finalY;
    doc.autoTable({ html: '#pdfMiDeclaracion_datosEmpleoCargoComision', margin: { top: 0, bottom:25 }, styles: { fontSize: 8 }, startY: finalY + 1, useCss: true, didDrawPage: function (data) { data.settings.margin.top = 30; }, rowPageBreak: 'auto' });   
    finalY = doc.lastAutoTable.finalY;
    if(jsonResult.declaracion.situacionPatrimonial.domicilioDeclarante.domicilio =="MX"){
        doc.autoTable({ html: '#pdfMiDeclaracion_datosEmpleoCargoComisionDOMMX', margin: { top: 0, bottom:25 }, styles: { fontSize: 8 }, startY: finalY + 1, useCss: true, didDrawPage: function (data) { data.settings.margin.top = 30; }, rowPageBreak: 'auto'  });
    }
    else{
        doc.autoTable({ html: '#pdfMiDeclaracion_datosEmpleoCargoComisionDOMEXT', margin: { top: 0, bottom:25 }, styles: { fontSize: 8 }, startY: finalY + 1, useCss: true, didDrawPage: function (data) { data.settings.margin.top = 30; }, rowPageBreak: 'auto'  });
    }


    //EXPERIENCIA LABORAL.
    finalY = doc.lastAutoTable.finalY;
    doc.autoTable({ html: '#pdfTitulo5', margin: { top: 25, bottom:0 }, styles: { fontSize: 12 }, startY: finalY + 10, useCss: true });
    finalY = doc.lastAutoTable.finalY;
    doc.autoTable({ html: '#pdfMiDeclaracion_experienciaLaboral', margin: { top: 0, bottom:25 }, styles: { fontSize: 8 }, startY: finalY + 1, useCss: true, didDrawPage: function (data) { data.settings.margin.top = 30; }, rowPageBreak: 'auto' });
    
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
        doc.setLineWidth(0.2);
        doc.line(15, doc.internal.pageSize.height-13, 60, doc.internal.pageSize.height-13);
        doc.text(declarante, 15, doc.internal.pageSize.height-10, null, null, "left");
        doc.text("Página " + i + " de " + numPaginas, 200, doc.internal.pageSize.height-10, null, null, "right");
    }
    const fecha = new Date();
    var filename = $("input[name='curp']").val() + "_" + captura.tipo_declaracion + "_" + fecha.getFullYear() + ".pdf";
    doc.save(filename);
}


function llenarPDF(){
    var html="";
    //DATOS DE PRUEBA.
    jsonResult.declaracion.situacionPatrimonial.datosEmpleoCargoComision.nombreEntePublico = "SECRETARÍA EJECUTIVA DEL SISTEMA ANTICORRUPCIÓN DEL ESTADO DE CHIAPAS";

    //GENERALES
    $(".pdfDec_tipo").text(captura.tipo_declaracion);
    $(".pdfDec_formato").text(captura.formato);
    $(".pdfDec_entepub").text(jsonResult.declaracion.situacionPatrimonial.datosEmpleoCargoComision.nombreEntePublico);

    //DATOS GENERALES
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
    if (nodo.domicilio == "MX"){
        //mexico
        $("#pdfMiDeclaracion_domicilioDeclarante .calle").text(nodo.domicilioMexico.calle);
        $("#pdfMiDeclaracion_domicilioDeclarante .numeroExterior").text(nodo.domicilioMexico.numeroExterior);
        $("#pdfMiDeclaracion_domicilioDeclarante .numeroInterior").text(nodo.domicilioMexico.numeroInterior);
        $("#pdfMiDeclaracion_domicilioDeclarante .coloniaLocalidad").text(nodo.domicilioMexico.coloniaLocalidad);
        $("#pdfMiDeclaracion_domicilioDeclarante .municipioAlcaldia").text(nodo.domicilioMexico.municipioAlcaldia.valor);
        $("#pdfMiDeclaracion_domicilioDeclarante .entidadFederativa").text(nodo.domicilioMexico.entidadFederativa.valor);
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
    
    //DATOS CURRICULARES.
    html="";
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
                    </tr>\
                    <tr><td colspan="5"></td></tr>';
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
    if (nodo.domicilio == "MX"){
        //mexico
        $("#pdfMiDeclaracion_datosEmpleoCargoComisionDOMMX .calle").text(nodo.domicilioMexico.calle);
        $("#pdfMiDeclaracion_datosEmpleoCargoComisionDOMMX .numeroExterior").text(nodo.domicilioMexico.numeroExterior);
        $("#pdfMiDeclaracion_datosEmpleoCargoComisionDOMMX .numeroInterior").text(nodo.domicilioMexico.numeroInterior);
        $("#pdfMiDeclaracion_datosEmpleoCargoComisionDOMMX .coloniaLocalidad").text(nodo.domicilioMexico.coloniaLocalidad);
        $("#pdfMiDeclaracion_datosEmpleoCargoComisionDOMMX .municipioAlcaldia").text(nodo.domicilioMexico.municipioAlcaldia.valor);
        $("#pdfMiDeclaracion_datosEmpleoCargoComisionDOMMX .entidadFederativa").text(nodo.domicilioMexico.entidadFederativa.valor);
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
        $("#pdfMiDeclaracion_datosEmpleoCargoComisionDOMEXT .pais").text(nodo.domicilioMexico.pais);
        $("#pdfMiDeclaracion_datosEmpleoCargoComisionDOMEXT .codigoPostal").text(nodo.domicilioMexico.codigoPostal);
        $("#pdfMiDeclaracion_datosEmpleoCargoComisionDOMEXT .aclaracionesObservaciones").text(nodo.aclaracionesObservaciones);
    }

    //EXPERIENCIA LABORAL
    if(!jsonResult.declaracion.situacionPatrimonial.experienciaLaboral.ninguno){
        html="";
        Object.keys(jsonResult.declaracion.situacionPatrimonial.experienciaLaboral.experiencia).forEach(function (index) {
            var nodo = jsonResult.declaracion.situacionPatrimonial.experienciaLaboral.experiencia[index];
            var ente = nodo.ambitoSector.clave=="PUB" ? nodo.nombreEntePublico : nodo.nombreEmpresaSociedadAsociacion;
            var empleo = nodo.ambitoSector.clave=="PUB" ? nodo.empleoCargoComision: nodo.puesto;
            var sector = nodo.ambitoSector.clave=="PRI" ? nodo.sector.valor : "";

            html +='<tr style="background-color: #dee2e6;">\
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
                        <td colspan="3">NOMBRE DEL ENTE PÚBLICO/NOMBRE DE LA EMPRESA, SOCIEDAD O ASOCIACIÓN</td>\
                    </tr>\
                    <tr>\
                        <td colspan="3">' + ente + '</td>\
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
                        <td style="width: 34%;">' + empleo + '</td>\
                        <td style="width: 33%;">' + nodo.fechaIngreso + '</td>\
                        <td style="width: 33%;">' + nodo.fechaEgreso + '</td>\
                    </tr>\
                    <tr style="background-color: #dee2e6;">\
                        <td>SECTOR</td>\
                        <td>UBICACIÓN</td>\
                    </tr>\
                    <tr>\
                        <td>' + sector + '</td>\
                        <td>' + nodo.ubicacion + '</td>\
                    </tr>\
                    <tr>\
                        <td style="background-color: #dee2e6;" colspan="3">ACLARACIONES/OBSERVACIONES</td>\
                    </tr>';
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

window.generarPDF = generarPDF;