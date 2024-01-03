const URL_API = import.meta.env.PUBLIC_URL_API;
import { MyError } from "./my-error.js";

export async function fetchProyectos() {
  try {
    const url = `${URL_API}/proyectos`;
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
  let resultadoClone;
  try {
    const resultado = await fetch(url, {
      method: "POST",
      body: JSON.stringify(proyecto),
      headers: {
        "Content-Type": "application/json",
      },
    });
    resultadoClone = resultado.clone();
    const jsonData = await resultado.json();
    if (jsonData.errores) {
      throw new MyError(jsonData.errores.toString());
    }
    return jsonData;
  } catch (err) {
    console.log(await resultadoClone.text());
    throw err;
  }
};

export const putProyecto = async (id, proyecto) => {
  // for (const pair of proyecto.entries()) {
  //   console.log(pair);
  // }
  // console.log(proyecto);
  const url = `${URL_API}/proyecto/${id}`;
  let resultadoClone;
  try {
    const resultado = await fetch(url, {
      method: "PUT",
      body: JSON.stringify(proyecto),
      headers: {
        "Content-Type": "application/json",
      },
    });
    resultadoClone = resultado.clone();
    const jsonData = await resultado.json();
    // console.log(jsonData);
    if (jsonData.errores) {
      throw new MyError(jsonData.errores.toString());
    }
    return jsonData;
  } catch (err) {
    console.log(await resultadoClone.text());
    throw err;
  }
};

export const deleteProyecto = async (id) => {
  const url = `${URL_API}/proyecto/${id}`;
  let resultadoClone;
  try {
    const resultado = await fetch(url, {
      method: "DELETE",
    });
    resultadoClone = resultado.clone();
    const jsonData = await resultado.json();
    if (jsonData.errores) {
      throw new MyError(jsonData.errores.toString());
    }
    return jsonData;
  } catch (err) {
    console.log(await resultadoClone.text());
    throw err;
  }
};
