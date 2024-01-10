import {
  h2ZonaForm,
  breadcrumbsHijo1,
  formularioProyecto,
  zonaFormTitulo,
  zonaFormImg,
  zonaFormInputImg,
  zonaFormFecha,
  zonaFormDescrip,
  errorFetchProyecto,
  erroresAdminProyecto,
  errorFetchProyectos,
} from "./selectores/selectores.js";
import { URLPARAMS } from "./constantes/consts.js";
const URL_IMAGENES = import.meta.env.PUBLIC_URL_IMAGENES;
const URL_CLIENT = import.meta.env.PUBLIC_URL_CLIENT;
import { MyError } from "./api/my-error.js";
import { fetchProyecto, postProyecto, putProyecto } from "./api/api.js";
import { checkAuth, mostrarAlertas } from "./funcionalidades";

let id;
let operation;
let imgUpload;
let imgBase64;

checkAuth();

document.addEventListener("DOMContentLoaded", function () {
  formularioProyecto.addEventListener("submit", postOrPutProyecto);
  renderProyecto();
});

export async function renderProyecto() {
  try {
    // const { operation, id } = checkUrl();
    checkUrl();
    if (operation === URLPARAMS.NUEVO_PROYECTO) {
      mostrarProyectoNuevo();
    } else if (operation === URLPARAMS.EDITAR_PROYECTO) {
      breadcrumbsHijo1.textContent = "Editar proyecto";
      h2ZonaForm.textContent = "Editar proyecto";
      const jsonData = await fetchProyecto(id);
      mostrarProyectoEditado(jsonData.resultado.proyecto);
    }
  } catch (err) {
    let arrayErrors;
    if (err instanceof MyError) {
      arrayErrors = JSON.parse(err.message);
    } else {
      arrayErrors = ["Error"];
    }
    mostrarAlertas("error", errorFetchProyecto, arrayErrors);
  }
}

function checkUrl() {
  let urlParams = location.hash;
  urlParams = urlParams.slice(2);
  if (!urlParams) {
    throw new MyError(JSON.stringify(["Id del proyecto no especificado"]));
  }
  let arrayParams = urlParams.split("/");
  if (arrayParams[arrayParams.length - 1] === "") {
    arrayParams.pop();
  }
  switch (arrayParams[0]) {
    case URLPARAMS.EDITAR_PROYECTO:
      if (arrayParams.length !== 2) {
        throw new MyError(JSON.stringify(["Ruta no válida"]));
      }
      break;
    case URLPARAMS.NUEVO_PROYECTO:
      if (arrayParams.length !== 1) {
        throw new MyError(JSON.stringify(["Ruta no válida"]));
      }
      break;
    default:
      throw new MyError(JSON.stringify(["Operación no válida"]));
  }
  // return { operation: arrayParams[0], id: arrayParams[1] };
  operation = arrayParams[0];
  id = arrayParams[1];
}

function mostrarProyectoNuevo() {
  breadcrumbsHijo1.textContent = "Nuevo proyecto";
  h2ZonaForm.textContent = "Nuevo proyecto";
  const urlImg = `${URL_CLIENT}/img/no-img.png`;
  const tituloImg = "no-imagen";
  mostrarImg(urlImg, tituloImg);
  formularioProyecto.style.display = "block";
}

async function mostrarProyectoEditado(proyecto) {
  const { id, titulo, descripcion, imagen, fechaProyecto: fecha } = proyecto;
  zonaFormTitulo.setAttribute("value", titulo);
  let urlImg = `${URL_CLIENT}/img/no-img.png`;
  if (imagen.length) {
    urlImg = `${URL_IMAGENES}/${imagen}`;
  }
  const tituloImg = `imagen de ${titulo}`;
  mostrarImg(urlImg, tituloImg);
  zonaFormFecha.setAttribute("value", fecha);
  zonaFormDescrip.textContent = descripcion;
  formularioProyecto.style.display = "block";
}

function mostrarImg(urlImg, tituloImg) {
  zonaFormImg.setAttribute("src", urlImg);
  zonaFormImg.setAttribute("alt", `imagen de ${tituloImg}`);
  zonaFormImg.setAttribute("loading", "lazy");
  zonaFormInputImg.onchange = function (event) {
    selectImgProyecto(event.target.files[0]);
  };
}

function selectImgProyecto(fileSelected) {
  if (!fileSelected) {
    zonaFormImg.setAttribute("src", `${URL_CLIENT}/img/no-img.png`);
    // imgUpload = null;
    imgUpload = {
      name: null,
      type: null,
      size: null,
    };
    imgBase64 = null;
    return;
  }
  let reader = new FileReader();
  reader.readAsDataURL(fileSelected);
  reader.onload = () => {
    const result = reader.result;
    imgBase64 = result.replace(/^data:(.+)\/(.+);base64,/i, "");
    imgUpload = fileSelected;
    zonaFormImg.setAttribute("src", result);
  };
}

async function postOrPutProyecto(ev) {
  ev.preventDefault();
  const proyecto = {
    titulo: zonaFormTitulo.value,
    descripcion: zonaFormDescrip.value,
    fechaProyecto: zonaFormFecha.value,
  };
  if (imgUpload) {
    proyecto.imagen = {
      // name: imgUpload.name.replace(/\.[^/.]+$/, ""),
      name: imgUpload.name,
      type: imgUpload.type,
      size: imgUpload.size,
      content: imgBase64,
    };
  }
  if (operation === URLPARAMS.NUEVO_PROYECTO) {
    nuevoProyecto(proyecto);
  } else if (operation === URLPARAMS.EDITAR_PROYECTO) {
    editarProyecto(proyecto);
  }
}

async function nuevoProyecto(proyecto) {
  try {
    const jsonData = await postProyecto(proyecto);
    // console.log(jsonData);
    window.location.href = `${URL_CLIENT}/admin`;
  } catch (err) {
    let arrayErrors;
    if (err instanceof MyError) {
      arrayErrors = JSON.parse(err.message);
    } else {
      arrayErrors = ["Error"];
    }
    mostrarAlertas(
      "error",
      erroresAdminProyecto,
      arrayErrors,
      "alerta-error-form",
    );
  }
}

async function editarProyecto(proyecto) {
  try {
    const jsonData = await putProyecto(id, proyecto);
    // console.log(jsonData);
    window.location.href = `${URL_CLIENT}/admin`;
  } catch (err) {
    let arrayErrors;
    if (err instanceof MyError) {
      arrayErrors = JSON.parse(err.message);
    } else {
      arrayErrors = ["Error"];
    }
    mostrarAlertas(
      "error",
      erroresAdminProyecto,
      arrayErrors,
      "alerta-error-form",
    );
  }
}
