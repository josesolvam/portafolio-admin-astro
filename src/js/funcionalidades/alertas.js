import Swal from "sweetalert2";

export function mostrarAlertas(
  tipoAlerta,
  referencia,
  arrayData,
  classCss = null,
) {
  limpiarAlertas(tipoAlerta, referencia, classCss);
  switch (tipoAlerta) {
    case "error":
      mostrarErrores(referencia, arrayData, classCss);
      break;
    default:
      console.error("Tipo de alerta no contemplado");
  }
}
function limpiarAlertas(tipoAlerta, referencia, classCss) {
  switch (tipoAlerta) {
    case "error":
      limpiarErrores(referencia, classCss);
      break;
    default:
      console.error("Tipo de alerta no contemplado");
  }
}

function mostrarErrores(ref, miErrors, classCss) {
  miErrors.forEach((miError) => {
    const error = document.createElement("P");
    error.textContent = miError;
    if (classCss) error.classList.add(classCss);
    ref.appendChild(error);
    const positionScroll =
      window.scrollY + ref.getBoundingClientRect().top - 80;
    window.scrollTo(0, positionScroll);
  });
}

function limpiarErrores(ref, classCss) {
  if (classCss) {
    const alertas = ref.querySelectorAll("." + classCss);
    alertas.forEach((alerta) => {
      if (alerta) {
        alerta.remove();
      }
    });
  }
}

export async function confirmarAccion() {
  return await Swal.fire({
    title: "¿Estas seguro?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Si, eliminar",
  });
}
