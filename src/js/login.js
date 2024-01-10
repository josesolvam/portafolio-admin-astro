import {
  formularioLogin,
  emailLogin,
  passwordLogin,
  erroresLogin,
} from "./selectores/selectores.js";
import { mostrarAlertas } from "./funcionalidades/alertas.js";

const URL_CLIENT = import.meta.env.PUBLIC_URL_CLIENT;
import { MyError } from "./api/my-error.js";
import { login } from "./api/api.js";

document.addEventListener("DOMContentLoaded", function () {
  formularioLogin.addEventListener("submit", autentificar);
});

async function autentificar(ev) {
  ev.preventDefault();
  const usuario = {
    email: emailLogin.value,
    password: passwordLogin.value,
  };
  try {
    const jsonData = await login(usuario);
    // console.log(jsonData);
    localStorage.setItem("loged", "true");
    window.location.href = `${URL_CLIENT}/admin`;
  } catch (err) {
    if (err instanceof MyError) {
      const miErrors = JSON.parse(err.message);
      mostrarAlertas("error", erroresLogin, miErrors, "alerta-error-form");
    } else {
      mostrarAlertas("error", erroresLogin, ["Error"], "alerta-error-form");
    }
  }
}
