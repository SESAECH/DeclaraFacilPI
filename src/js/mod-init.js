function iniciarModulo(data){
    var seccion = JSON.parse(atob(data));
    var item = captura.declaracion[seccion.apartado].secciones[seccion.no];
    $(".titulo-seccion").text(seccion.no + ". " + seccion.titulo.toUpperCase());
    window["init" + seccion.moduloName.replace("modulo","")](btoa(JSON.stringify(item)));
}


window.iniciarModulo = iniciarModulo;
