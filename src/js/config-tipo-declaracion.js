//button seleccionar tipo de declaración
$('.btnSelectTipoDeclaracion').on('click',function() {
    captura.tipo_declaracion = this.dataset.tipo;
    captura.status_gral = "EN_PROCESO";
    $("#contentSelectFormatoDeclaracion").removeClass("hide");
});

//button seleccionar formato de declaración.
$('.btnSelectFormatoDeclaracion').on('click',function() {
    var htmlSecciones = "";//, htmlContent="";
    
    //variables globales de captura.
    captura.formato = this.dataset.formato;                                
    captura.declaracion =  declaraciones[captura.formato.toLowerCase()];    
    if (captura.formato =="COMPLETA"){
        if (captura.tipo_declaracion=="MODIFICACION"){
            delete jsonResult.declaracion.situacionPatrimonial.actividadAnualAnterior;
        }
    }
    else{
        delete jsonResult.declaracion.interes;
        delete jsonResult.declaracion.situacionPatrimonial.vehiculos;
        delete jsonResult.declaracion.situacionPatrimonial.prestamoOComodato;
        delete jsonResult.declaracion.situacionPatrimonial.inversiones;
        delete jsonResult.declaracion.situacionPatrimonial.datosPareja;
        delete jsonResult.declaracion.situacionPatrimonial.datosDependienteEconomico;
        delete jsonResult.declaracion.situacionPatrimonial.bienesInmuebles;
        delete jsonResult.declaracion.situacionPatrimonial.bienesMuebles;
        delete jsonResult.declaracion.situacionPatrimonial.adeudos;
        if (captura.tipo_declaracion=="MODIFICACION"){
            delete jsonResult.declaracion.situacionPatrimonial.actividadAnualAnterior;
        }
    }
    

    //titulo del formulario de captura.
    $(".titulo-declaracion-captura").text("DECLARACIÓN " + captura.tipo_declaracion + " | " + captura.formato);
    
    //pinta las opciones del formulario de captura.
    htmlSecciones+='<h6 class="text-muted p10">Situación Patrimonial</h6>';
    $.each(captura.declaracion.situacion_patrimonial.secciones, function(index, item){
        htmlSecciones+='<a class="list-group-item list-group-item-action" id="seccion'+item.no+'" data-seccion_declaracion="situacion_patrimonial" data-seccion_no="' + item.no +'" data-toggle="list" href="#contentSeccion'+item.no+'" role="tab">';
        htmlSecciones+='    <span class="indicador">' + item.no + '</span>';
        htmlSecciones+='    <span>' + item.titulo + '</span>';
        htmlSecciones+='    <span class="indicador-status status-seccion-patrimonial-' + item.no +' float-right">PENDIENTE</span>';
        htmlSecciones+='</a>';
        //htmlContent +='<div class="tab-pane fade pb20" id="contentSeccion'+ item.no +'" role="tabpanel"><h5 class="titulo-seccion titulo-seccion'+item.no+'"></h5></div>';
        /* htmlSecciones+='<a class="list-group-item list-group-item-action d-flex justify-content-between align-items-center" id="seccion'+item.no+'" data-seccion_declaracion="situacion_patrimonial" data-seccion_no="' + item.no +'" data-toggle="list" href="#contentSeccion'+item.no+'" role="tab"><span class="badge rounded-pill bg-secondary">' + item.no + '</span>.' + item.titulo + '<span class="badge badge-warning badge-pill status-seccion-patrimonial-' + item.no +'">PENDIENTE</span></a>';
        htmlContent +='<div class="tab-pane fade pb20" id="contentSeccion'+ item.no +'" role="tabpanel"><h5 class="titulo-seccion titulo-seccion'+item.no+'"></h5></div>'; */
     });

    if (Object.keys(captura.declaracion.interes.secciones).length > 0){
        htmlSecciones+='<h6 class="text-muted p10">Intereses</h6>';
        $.each(captura.declaracion.interes.secciones, function(index, item){
            htmlSecciones+='<a class="list-group-item list-group-item-action d-flex justify-content-between align-items-center" id="seccion'+item.no+'" data-seccion_declaracion="interes" data-seccion_no="' + item.no +'" data-toggle="list" href="#contentSeccion'+item.no+'" role="tab">' + item.no + '.' + item.titulo + '<span class="badge badge-warning badge-pill status-seccion-interes-' + item.no +'">PENDIENTE</span></a>';
            htmlContent +='<div class="tab-pane fade pb20" id="contentSeccion'+ item.no +'" role="tabpanel"><h5 class="titulo-seccion titulo-seccion'+item.no+'"></h5></div>';                                        
        });
    }
    $("#list-tab").html(htmlSecciones);
    //$("#nav-tabContent").html(htmlContent);
            
    //funcionalidad para cada modulo.
    $(".list-group-item").click(function() {
        loadModulo(this.dataset.seccion_declaracion, this.dataset.seccion_no);                        
    });
    
    //ocultar content selección de tipo de declaración.
    $("#contentSelectTipoDeclaracion").addClass("hide");
    //mostrar content de captura.
    $("#contentCapturaDeclaracion").removeClass("hide");
    //mostrar btns globales de guardar avance y cargar json declaración.
    $("#btnLoadDeclaracion, #btnGuardarAvance").removeClass("hide");   
    $("#header2").removeClass("hide");
    $("#modalIniciar").modal("show");
});            


function regresarAlInicio(){
    captura.tipo_declaracion = "";    
    captura.formato = "";
    captura.declaracion =  [];
    captura.status_gral = "";
    $(".btnSelectTipoDeclaracion").removeClass("active");
    $(".btnSelectFormatoDeclaracion").removeClass("active");     
    $("#header2").addClass("hide");
    $("#modalIniciar").modal("hide");
    //mostrar content selección de tipo de declaración.
    $("#contentSelectTipoDeclaracion").removeClass("hide");
    //ocultar content de captura.
    $("#contentCapturaDeclaracion, #contentSelectFormatoDeclaracion").addClass("hide");
    
}