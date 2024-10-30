function Logout() {
  localStorage.removeItem(import.meta.env.VITE_TOKEN_TIEM);
  window.location.href = "/login";
}

export default Logout;
