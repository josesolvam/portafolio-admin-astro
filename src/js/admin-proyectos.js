import {
  tableProyectosAdmin,
  contenedorProyectosAdmin,
  errorFetchProyectos,
  erroresAdminProyectos,
} from "./selectores/selectores.js";
import { URLPARAMS } from "./constantes/consts.js";
const URL_IMAGENES = import.meta.env.PUBLIC_URL_IMAGENES;
const URL_CLIENT = import.meta.env.PUBLIC_URL_CLIENT;
import { fetchProyectos, deleteProyecto } from "./api/api.js";
import { confirmarAccion, mostrarAlertas, checkAuth } from "./funcionalidades";
import { MyError } from "./api/my-error.js";
import iconoEditar from "../assets/img/ti-edit.svg";
import iconoEliminar from "../assets/img/ti-trash.svg";

checkAuth();

document.addEventListener("DOMContentLoaded", function () {
  renderProyectos();
});

async function renderProyectos() {
  try {
    const jsonData = await fetchProyectos();
    mostrarProyectos(jsonData.resultado.proyectos);
  } catch (err) {
    let arrayErrors;
    if (err instanceof MyError) {
      arrayErrors = JSON.parse(err.message);
    } else {
      arrayErrors = ["Error"];
    }
    mostrarAlertas("error", errorFetchProyectos, arrayErrors);
  }
}

function mostrarProyectos(proyectos) {
  if (!proyectos.length) {
    throw new MyError(JSON.stringify(["No hay registros"]));
  }
  proyectos.forEach((proyecto) => {
    const { id, titulo, descripcion, imagen, fechaProyecto: fecha } = proyecto;

    const entradaProyectos = document.createElement("TR");
    entradaProyectos.classList.add("entrada-proyectos");

    const acciones = document.createElement("TD");
    acciones.classList.add("acciones");
    const editarHtml = document.createElement("A");
    editarHtml.classList.add("boton", "boton-primario", "w-100");
    editarHtml.setAttribute(
      "href",
      `${URL_CLIENT}/admin/proyecto/#/${URLPARAMS.EDITAR_PROYECTO}/${id}`,
    );
    editarHtml.innerHTML = `<img src=${iconoEditar.src} alt="icono editar" />`;
    const eliminarHtml = document.createElement("SPAN");
    eliminarHtml.classList.add("boton", "boton-rojo", "w-100");
    eliminarHtml.innerHTML = `<img src=${iconoEliminar.src} alt="icono eliminar" />`;
    eliminarHtml.onclick = function () {
      eliminarProyecto(id);
    };

    acciones.appendChild(editarHtml);
    acciones.appendChild(eliminarHtml);

    entradaProyectos.appendChild(acciones);

    const idTd = document.createElement("TD");
    idTd.textContent = id;
    entradaProyectos.appendChild(idTd);

    const tituloTd = document.createElement("TD");
    tituloTd.textContent = titulo;
    entradaProyectos.appendChild(tituloTd);

    const descripTd = document.createElement("TD");
    descripTd.classList.add("descripcion-proyecto");
    descripTd.textContent = descripcion;
    entradaProyectos.appendChild(descripTd);

    const imgTd = document.createElement("TD");
    imgTd.classList.add("imagen-proyecto");
    const imgProyecto = document.createElement("IMG");
    const urlImg = imagen.length
      ? `${URL_IMAGENES}/${imagen}`
      : `${URL_CLIENT}/img/no-img.png`;
    imgProyecto.setAttribute("src", urlImg);
    imgProyecto.setAttribute("alt", `imagen de ${titulo}`);
    imgProyecto.setAttribute("loading", "lazy");
    imgTd.appendChild(imgProyecto);
    entradaProyectos.appendChild(imgTd);

    contenedorProyectosAdmin.appendChild(entradaProyectos);
    tableProyectosAdmin.style.display = "block";
  });
}

async function eliminarProyecto(id) {
  try {
    const result = await confirmarAccion();
    if (result.isConfirmed) {
      const jsonData = await deleteProyecto(id);
      // console.log(jsonData);
      window.location.href = `${URL_CLIENT}/admin`;
    }
  } catch (err) {
    let arrayErrors;
    if (err instanceof MyError) {
      arrayErrors = JSON.parse(err.message);
    } else {
      arrayErrors = ["Error"];
    }
    mostrarAlertas(
      "error",
      erroresAdminProyectos,
      arrayErrors,
      "alerta-error-form",
    );
  }
}
