import "./paquetes/modernizr-custom.js";
import { navegacion, opcionCerrarSesion } from "./funcionalidades";

// console.log(window.Modernizr);

document.addEventListener("DOMContentLoaded", function () {
  navegacion();
  opcionCerrarSesion();
});
