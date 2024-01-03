import {
  body,
  menuMovil,
  navegacionPrincipal,
  sidebar,
  main,
  menuIcon,
  closeMenuIcon,
} from "../selectores/selectores.js";
const overlay = document.createElement("DIV");
export function navegacion() {
  implementarElementosDOM();
  asignarEventos();
}

function implementarElementosDOM() {
  // const overlay = document.createElement("DIV");
  overlay.setAttribute("id", "overlay");
  overlay.style.display = "none";
  overlay.style.backgroundColor = "rgba(0,0,0,0)";
  overlay.style.position = "fixed";
  overlay.style.width = "100%";
  overlay.style.height = "100%";
  overlay.style.top = "0";
  overlay.style.left = "0";
  overlay.style.zIndex = "-1";
  document.body.appendChild(overlay);
}

function asignarEventos() {
  menuIcon.addEventListener("click", abrirSidebar);
  closeMenuIcon.addEventListener("click", cerrarSidebar);
  overlay.addEventListener("click", cerrarSidebar);
  window.addEventListener("scroll", function () {
    if (main.getBoundingClientRect().top < 0) {
      menuMovil.style.backgroundColor = "var(--primario)";
      navegacionPrincipal.style.backgroundColor = "var(--primario)";
      sidebar.style.backgroundColor = "var(--primario)";
    } else {
      menuMovil.style.backgroundColor = "var(--indigo-oscuro)";
      navegacionPrincipal.style.backgroundColor = "var(--indigo-oscuro)";
      sidebar.style.backgroundColor = "var(--indigo-oscuro)";
    }
  });
}

function abrirSidebar() {
  // body.style.overflow = "hidden";
  body.classList.add("block-scroll");
  sidebar.style.width = "25rem";
  overlay.style.display = "block";
  overlay.style.zIndex = "2";
  overlay.style.backgroundColor = "rgba(0,0,0,0.6)";
}

function cerrarSidebar() {
  // body.style.overflow = "auto";
  body.classList.remove("block-scroll");
  sidebar.style.width = "0";
  overlay.style.backgroundColor = "rgba(0,0,0,0)";
  overlay.style.display = "none";
  overlay.style.zIndex = "-1";
}
