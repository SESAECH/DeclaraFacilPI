
function generarPDF1(){
    var doc = new jspdf.jsPDF()
    doc.autoTable({ 
        html: '#pdfMiDeclaracion_domicilio', 
        didDrawPage: function (data) {
            // Header
            doc.autoTable({ html: '#pdfMiDeclaracionHeader', useCss: true});           
          },
        margin: { top: 30 },
        /* useCss: true */
    });
    if (doc.lastAutoTable.pageCount >1){
        doc.autoTable({ html: '#pdfMiDeclaracion_domicilio' });
     }
     else{
        doc.autoTable({ 
            html: '#pdfMiDeclaracion_domicilio', 
            didDrawPage: function (data) {
                // Header
                doc.autoTable({ html: '#pdfMiDeclaracionHeader', useCss: true});           
              },
            margin: { top: 30 },
            /* useCss: true */
        });
        
     }
     
     doc.save('table.pdf');
}

function generarPDF2(){
    var doc = new jspdf.jsPDF();
    var numPaginas =0;
    doc.autoTable({ html: '#pdfMiDeclaracion_domicilio', margin: { top: 30, bottom:30 } });
    numPaginas += doc.lastAutoTable.pageCount;
    doc.autoTable({ html: '#pdfMiDeclaracion_domicilio', margin: { top: 30, bottom:30 } });
    numPaginas += doc.lastAutoTable.pageCount;

    for (var i = 1; i <= numPaginas; i++) {
        doc.setPage(i)
        //header
        doc.text("Secretaría Ejecutiva del Sistema Anticorrupción del Estado de Chiapas", 40, 20, { align:"center"});
        doc.text("Declaración Patrimonial y de Interés", 40, 25, { align:"center"});
        //footer
        doc.text('Page ' + String(i) + ' of ' + String(pages), 20, 287, {
          align: 'center'
        })
      }
     
    doc.save('table.pdf');
}

function generarPDF() {
    var doc = new jspdf.jsPDF()
    doc.autoTable({ 
        html: '#tblMiDeclaracionPDF', 
        /* didDrawPage: function (data) {
            // Header
            doc.autoTable({ html: '#pdfMiDeclaracionHeader', useCss: true});           
          }, */
        margin: { top: 30 },
        /* useCss: true */
    });
    doc.save('table.pdf');

   /*  var id = document.getElementById('table');
    //var doc = new jsPDF('p', 'pt', 'letter');

    doc.autoTable({theme: 'css', html: id});

    doc.save("table.pdf") */

    /* $("#tblMiDeclaracionPDF>tbody").empty().append();
    $("#tblMiDeclaracionPDF>tbody").append("<tr><td><table style='width: 100%;'>"+ $("#pdfMiDeclaracion_datosgenerales").html() + "</table></td><tr>");
    $("#tblMiDeclaracionPDF>tbody").append("<tr><td><table style='width: 100%;'>"+ $("#pdfMiDeclaracion_domicilio").html() + "</table></td><tr>");
    doc.autoTable({ 
        html: '#tblMiDeclaracionPDF', 
        didDrawPage: function (data) {
            // Header
            doc.autoTable({ html: '#pdfMiDeclaracionHeader', useCss: true});           
          },
        margin: { top: 30 },
        useCss: true
    }); */

    // Simple html example
    /* doc.autoTable({ 
        html: '#pdfMiDeclaracion_datosgenerales', 
        didDrawPage: function (data) {
            // Header
            doc.autoTable({ html: '#pdfMiDeclaracionHeader', useCss: true});           
          },
        margin: { top: 30 },
        useCss: true
    });

    doc.autoTable({ 
        html: '#pdfMiDeclaracion_domicilio',         
        useCss: true
    }); */

    /* doc.autoTable({
        head: headRows(),
        body: bodyRows(40),
        didDrawPage: function (data) {
          // Header
          doc.setFontSize(20)
          doc.setTextColor(40)
          if (base64Img) {
            doc.addImage(base64Img, 'JPEG', data.settings.margin.left, 15, 10, 10)
          }
          doc.text('Report', data.settings.margin.left + 15, 22)
    
          // Footer
          var str = 'Page ' + doc.internal.getNumberOfPages()
          // Total page number plugin only available in jspdf v1.0+
          if (typeof doc.putTotalPages === 'function') {
            str = str + ' of ' + totalPagesExp
          }
          doc.setFontSize(10)
    
          // jsPDF 1.4+ uses getWidth, <1.4 uses .width
          var pageSize = doc.internal.pageSize
          var pageHeight = pageSize.height ? pageSize.height : pageSize.getHeight()
          doc.text(str, data.settings.margin.left, pageHeight - 10)
        },
        margin: { top: 30 },
    }) */

    
  }

/* 
// Header and footers - shows how header and footers can be drawn
examples['header-footer'] = function () {
    var doc = new jsPDF()
    var totalPagesExp = '{total_pages_count_string}'
  
    doc.autoTable({
      head: headRows(),
      body: bodyRows(40),
      didDrawPage: function (data) {
        // Header
        doc.setFontSize(20)
        doc.setTextColor(40)
        if (base64Img) {
          doc.addImage(base64Img, 'JPEG', data.settings.margin.left, 15, 10, 10)
        }
        doc.text('Report', data.settings.margin.left + 15, 22)
  
        // Footer
        var str = 'Page ' + doc.internal.getNumberOfPages()
        // Total page number plugin only available in jspdf v1.0+
        if (typeof doc.putTotalPages === 'function') {
          str = str + ' of ' + totalPagesExp
        }
        doc.setFontSize(10)
  
        // jsPDF 1.4+ uses getWidth, <1.4 uses .width
        var pageSize = doc.internal.pageSize
        var pageHeight = pageSize.height ? pageSize.height : pageSize.getHeight()
        doc.text(str, data.settings.margin.left, pageHeight - 10)
      },
      margin: { top: 30 },
    })
  
    // Total page number plugin only available in jspdf v1.0+
    if (typeof doc.putTotalPages === 'function') {
      doc.putTotalPages(totalPagesExp)
    }
  
    return doc
  } */