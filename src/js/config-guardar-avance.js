//funcionalidad a controles de guardado.
$("#btnGuardarAvance").on('click',function() {
    //generarPDF();
    //generar file json.
    let fecha = new Date();    
    let text = JSON.stringify(jsonResult);
    let filename = $("input[name='curp']").val() + "_" + jsonResult.captura.tipo_declaracion + "_" + fecha.getFullYear() + ".json";                    
    download(filename, text);

    Swal.fire({
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
