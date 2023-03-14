//funcionalidad a controles de guardado.
$("#btnGuardarAvance").on('click',function() {
    //let fecha = new Date();
    jsonResult.captura.contralor = $("input[name='nameContralor']").val().toUpperCase(); 
    jsonResult.captura.version = VERSION;
    jsonResult.captura.anio = $('#cboAnioEjercicio').val();//fecha.getFullYear() ; 
    let filename = jsonResult.declaracion.situacionPatrimonial.datosGenerales.curp + "_" + jsonResult.captura.tipo_declaracion + "_" + jsonResult.captura.anio + ".dec";
    
    let zip = pako.gzip(JSON.stringify(jsonResult));
    //let zip = new TextDecoder().decode (pako.deflate(JSON.stringify(jsonResult)));
    
   //download(filename, zip);
   download(filename, zip,"appligation/gzip");
   //require("downloadjs");
   //download(zip,filename,"application/gzip");


    swal.fire({
        title: "Aviso",
        text:"¿Desea continuar con la captura?",
        showCancelButton: true,
        confirmButtonText: "Continuar",
        cancelButtonText: "Salir",
        customClass: {
            confirmButton: "btn btn-light"
        },
      }).then((result) => {
        if (result.isConfirmed) {
            
        }
        else if (result.isDismissed){
            regresarAlInicio();
        }
      });
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
