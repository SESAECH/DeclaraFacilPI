//funcionalidad a controles de guardado.
$("#btnGuardarAvance").on('click',function() {
    /* switch(this.dataset.form){
        case "DatosGenerales":
            guardarFormDatosGenerales(this.dataset.form, this.dataset.seccion); 
            break;
    } */
    generarPDF();

    const fecha = new Date();
    //generar file json.
    var text = JSON.stringify(jsonResult.declaracion);
    var filename = $("input[name='curp']").val() + "_" + captura.tipo_declaracion + "_" + fecha.getFullYear() + ".json";                    
    //download(filename, text);                    
});

window.download = function download(filename, text) {
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
};

window.generarPDF2 = function generarPDF2() {
    var doc = new jsPDF('p', 'pt', 'letter');
    doc.setProperties({
        title: 'Declaracion Patrimonial',
        subject: 'This is the subject',
        author: 'Gobierno del Estado de Chiapas ',
        keywords: 'declaración, patrimonial, ',
        creator: 'SESAECH'
    });
    //doc.fromHTML($('#declaracionPDF').html(),15,15);
    // All units are in the set measurement for the document
    // This can be changed to "pt" (points), "mm" (Default), "cm", "in"
    doc.fromHTML($('#declaracionPDF').get(0), 10, 10, {
      'width': 612, 
      /* 'pagesplit': true, */
      //'elementHandlers': specialElementHandlers
    });
    doc.save('informe.pdf');
  };


window.generarPDFs = function generarPDFs(){
    //var doc = new jsPDF('p','in','ibs');
    var doc = new jsPDF('p', 'pt', 'letter');
    doc.setProperties({
        title: 'Declaracion Patrimonial',
        subject: 'This is the subject',
        author: 'Gobierno del Estado de Chiapas ',
        keywords: 'declaración, patrimonial, ',
        creator: 'SESAECH'
    });
    //doc.setFontSize(10);
    var html = $('#declaracionPDF').html();
    var hoja = "<!DOCTYPE html>\
                <html lang='es'>\
                    <head>\
                        <title>Declaración Patrimonial y de Intéres</title>\
                        <meta charset='utf-8' />\
                        <meta http-equiv='X-UA-Compatible' content='IE=edge' />\
                        <meta name='viewport' content='width=device-width, initial-scale=1' />\
                        <link href='css/bootstrap.min.css' rel='stylesheet'>\
                        <link href='css/formatPDF.css' rel='stylesheet'>\
                    </head>\
                    <body>\
                        <div class='crp'>\
                            " + html + "\
                        </div>\
                        <script src='js/jquery-3.5.1.min.js'></script>\
					    <script src='js/bootstrap.bundle.min.js'></script>\
                    </body>\
                </html>";
    html2pdf(hoja, doc, function (doc) {
        doc.save('mideclaracion_.pdf');
    });                                
};
/* 
function generarPDF(){
    const invoice = this.document.getElementById("declaracionPDF");
            console.log(invoice);
            console.log(window);
            var opt = {
                margin: .1,
                filename: 'myfile.pdf',
                image: { type: 'jpeg', quality: 0.98 },
                html2canvas: { scale: 2 },
                jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
            };
            html2pdf().from(invoice).set(opt).save();
}
 */


/* function generarPDF(){

    var html ="";
    html+='<!DOCTYPE html>\
    <html lang="en">\
    <head>\
        <meta charset="UTF-8">\
        <meta http-equiv="X-UA-Compatible" content="IE=edge">\
        <meta name="viewport" content="width=device-width, initial-scale=1.0">\
        <title>Document</title>\
        <link rel="stylesheet" href="css/bootstrap.min.css">\
    </head>\
    <body>' + $('#declaracionPDF').html() +        
    '</body>\
    </html>';
    var docDefinition = {
        pageSize: 'letter',
        permissions: {
            printing: 'highResolution', //'lowResolution'
            modifying: false,
            copying: false,
            annotating: true,
            fillingForms: true,
            contentAccessibility: true,
            documentAssembly: true
        },
        info: {
            title: 'titulo',
            author: 'autor',
            subject: 'subject of document',
            keywords: 'keywords for document',
          },
        header: 'simple text',
      
        footer: {
          columns: [
            'Left part',
            { text: 'Right part', alignment: 'right' }
          ]
        },
      
        content: htmlToPdfmake($('#declaracionPDF').html()),
        styles: {
            "html-h1": {
                "background-color": "#621132", 
                "color":"#fff",
                "padding": "5px 10px",
                "width": "100%"
              }
        }
      };
    pdfMake.createPdf(docDefinition).download();
} */