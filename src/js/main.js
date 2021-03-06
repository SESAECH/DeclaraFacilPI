console.log ("Iniciando Carga del Sistema....");
//PACKAGE=require('../../package.json');
window.version = VERSION;
console.log ('Declarafacil PI v' + VERSION );
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
import swal from 'sweetalert2';
window.swal = window.Swal = swal;

import  jsPDF from 'jspdf';
window.jspdf = jsPDF;
import 'jspdf-autotable';

const pako = require('pako');
window.pako = pako;


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
//import './guardar-avance.js'; 
import './config-cargar-file.js';
import './mod-init.js';
import './generales.js';
import './config-estructura.js';
import './config-guardar-avance.js';
import './mideclaracion.js';
/* import './estructura-declaracion-inicial.js'; */

import './mod-datos-generales.js';
import './mod-domicilio.js';
import './mod-cv.js';
import './mod-empleo.js';
import './mod-experiencia-laboral.js';
import './mod-ingresos.js';
import './mod-DesempenoServidorPublico.js';

import './mod-datosPareja.js';
import './mod-datosDependienteEconomico.js';
import './mod-BienesInmuebles.js';
import './mod-Vehiculos.js';
import './mod-BienesMuebles.js';
import './mod-Inversiones.js';
import './mod-adeudos.js';
import './mod-PrestamoOComodato.js';

import './mod-ParticipacionEmpresas.js';
import './mod-ParticipacionInstituciones.js';
import './mod-ApoyosPublicos.js';
import './mod-Representacion.js';
import './mod-ClientesPrincipales.js';
import './mod-BeneficiosPrivados.js';
import './mod-Fideicomisos';

import './config-pdf.js';



console.log ('CSS y JS cargados...');
//if (module.hot) {module.hot.accept( './generales.js',function(){console.log ('Aceptando cambios'); window.loadCat=loadCat;})}
//module.hot.accept();
