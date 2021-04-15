window.iniciarModulo = function iniciarModulo(data){
    var seccion = JSON.parse(atob(data));
    var item = jsonResult.captura.declaracion[seccion.apartado].secciones[seccion.no];
    $(".nav-link").removeClass("active");
    $(".lnk" + seccion.moduloName).addClass("active");
    $(".titulo-seccion").text(seccion.no + ". " + seccion.titulo.toUpperCase());
    $("#" + seccion.moduloName + " .help").html(seccion.help);
// console.log ("init" + JSON.stringify(seccion.moduloName) + " => " + JSON.stringify(item)); //debug
 console.log ("init" + JSON.stringify(seccion.moduloName) + " => " + JSON.stringify(item)); //debug
    window["init" + seccion.moduloName.replace("modulo","")](btoa(JSON.stringify(item)));
};

//window.iniciarModulo = iniciarModulo;
