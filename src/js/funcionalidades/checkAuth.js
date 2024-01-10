const URL_CLIENT = import.meta.env.PUBLIC_URL_CLIENT;
export function checkAuth() {
  const loged = localStorage.getItem("loged");
  if (!loged) {
    window.location.href = `${URL_CLIENT}/login`;
  }
}
