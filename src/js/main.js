
/*
 global require ('catalogos-muns.js');
 global require ('catalogos.js');
 global require ('config.js');
*/

// añadir los css de las librerias
import '../css/bootstrap.min.css';
import '../css/sweetalert2.min.css';

// añadir los css propios
import '../css/tema.css';

// añadir las librerias que usamos
import $ from 'jquery';
import jQuery from 'jquery';
window.$ = jQuery;
global.$ = $;
import 'bootstrap';
import 'jquery-validation';
import swal from 'sweetalert';
window.swal = swal;

import  jsPDF from 'jspdf';

import 'jspdf-autotable';

//window.jsPDF = window.jspdf = jsPDF;

//variables globales
/*var captura={
                "tipo_declaracion":"",
                "formato":"",
                "status_gral":"",
                "declaracion":[]
            };
window.captura=captura;
*/


// añadir los modulos del sistema

//import './mideclaracion.js';

import './catalogos.js';
import './catalogos-muns.js';
import './config.js';
import './guardar-avance.js'; 
import './config-cargar-file.js';
import './mod-init.js';
import './generales.js';
import './config-estructura.js';
/* import './estructura-declaracion-inicial.js'; */

import './mod-datos-generales.js';
import './mod-domicilio.js';
import './mod-cv.js';
import './mod-empleo.js';
import './mod-experiencia-laboral.js';
import './mod-participacion-empresas.js';

import './config-pdf.js';



console.log ('CSS y JS cargados...');
//if (module.hot) {module.hot.accept( './generales.js',function(){console.log ('Aceptando cambios'); window.loadCat=loadCat;})}
module.hot.accept();
