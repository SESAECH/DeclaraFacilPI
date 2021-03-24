

            $(document).ready(function() {
                console.log( "ready! dom cargado..." );
                $("#contentSelectTipoDeclaracion").removeClass("hide");                
            });
            
            function loadModulo(seccion_declaracion, seccionNo){
                var html="";
                //variable con el nodo de la sección seleccionada.
                var seccion = captura.declaracion[seccion_declaracion].secciones[seccionNo];
                var moduloName = seccion.moduloName.replace("modulo","");

                //pintar titulo y html del modulo seleccionado.
                $(".titulo-seccion").text(seccion.no + ". " + seccion.titulo.toUpperCase());
                $("#contentSeccion" + seccion.no).html($("#" + seccion.moduloName).html());
                                           
                switch(moduloName){
                    case "DatosGenerales":
                        funcionalidadDatosGenerales(seccion.no, moduloName, seccion.status); break;
                    case "Domicilio":
                        funcionalidadDomicilio(seccion.no, moduloName, seccion.status); break;
                    case "ParticipacionEmpresas": 
                        loadFuncionalidadParticipacionEmpresas(seccion.no, moduloName, seccion.status); break;
                    case "EmpleoCargoComision":
                        funcionalidadEmpleoCargoComision(seccion.no, moduloName, seccion.status); break;                    
                    }
                
                //scroll top de la página.
                goTop();

                $(".chkNinguno").on("change",function() {
                    if(this.checked){
                        $(".btnAgregar" + this.dataset.form).addClass("hide");
                        $(".tbl" + this.dataset.form).addClass("hide");
                        //var btn = document.forms["form" + this.dataset.form].getElementsByClassName("btnTerminar");
                        //btn[0].removeClass("hide");

                        $(".btnTerminar" + this.dataset.form).removeClass("hide");
                    }
                    else{
                        $(".btnAgregar" + this.dataset.form).removeClass("hide");
                        $(".tbl" + this.dataset.form).removeClass("hide");
                        //var btn = document.forms["form" + this.dataset.form].getElementsByClassName("btnTerminar");
                        //btn[0].addClass("hide");

                        $(".btnTerminar" + this.dataset.form).addClass("hide");
                    }
                });
                
                $("input[type=text]").keyup(function () {  
                    $(this).val($(this).val().toUpperCase());  
                });
            }
            window.loadModulo = loadModulo;