const URL_API = import.meta.env.PUBLIC_URL_API;
import { MyError } from "./my-error.js";

export const login = async (usuario) => {
  const url = `${URL_API}/login`;
  return await processRequest(url, "POST", usuario, true);
};

export const logout = async () => {
  const url = `${URL_API}/logout`;
  return await processRequest(url, "GET", null, true);
};

export async function fetchProyectos() {
  const url = `${URL_API}/proyectos`;
  return await processRequest(url, "GET");
}

export async function fetchProyecto(id) {
  const url = `${URL_API}/proyecto/${id}`;
  try {
    const resultado = await fetch(url);
    const jsonData = await resultado.json();
    if (jsonData.errores) {
      throw new MyError(jsonData.errores.toString());
    }
    return jsonData;
  } catch (err) {
    throw err;
  }
}

export const postProyecto = async (proyecto) => {
  const url = `${URL_API}/proyecto`;
  return await processRequest(url, "POST", proyecto, true);
};

export const putProyecto = async (id, proyecto) => {
  const url = `${URL_API}/proyecto/${id}`;
  return await processRequest(url, "PUT", proyecto, true);
};

export const deleteProyecto = async (id) => {
  const url = `${URL_API}/proyecto/${id}`;
  return await processRequest(url, "DELETE", null, true);
};

const processRequest = async (
  url,
  typeRequest,
  data = null,
  withCredentials = false,
) => {
  let resultadoClone;
  try {
    const resultado = await fetch(url, {
      method: typeRequest,
      body: data ? JSON.stringify(data) : null,
      headers: {
        "Content-Type": "application/json",
      },
      credentials: withCredentials ? "include" : "omit",
    });
    resultadoClone = resultado.clone();
    const jsonData = await resultado.json();
    // console.log(jsonData);
    if (jsonData.errores) {
      throw new MyError(JSON.stringify(jsonData.errores));
    }
    return jsonData;
  } catch (err) {
    console.log(await resultadoClone.text());
    throw err;
  }
};
