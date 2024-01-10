import { iconoLogout } from "../selectores/selectores.js";
import iconLogout from "../../assets/img/svgviewer-output.svg";
import { logout } from "../api/api.js";
import { URLPARAMS } from "../constantes/consts.js";
const URL_CLIENT = import.meta.env.PUBLIC_URL_CLIENT;

export function opcionCerrarSesion() {
  implementarElementosDOM();
  asignarEventos();
}

function implementarElementosDOM() {
  if (localStorage.getItem("loged")) {
    iconoLogout.classList.add("img-x");
    iconoLogout.setAttribute("src", `${iconLogout.src}`);
    iconoLogout.setAttribute("alt", "icono de Logout");
  }
}

function asignarEventos() {
  iconoLogout.addEventListener("click", function () {
    execLogout();
  });
}

async function execLogout() {
  try {
    const jsonData = await logout();
    console.log(jsonData);
    localStorage.clear();
    window.location.href = `${URL_CLIENT}/login`;
  } catch (err) {}
}
