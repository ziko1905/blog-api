function Logout() {
  localStorage.removeItem(import.meta.env.VITE_TOKEN_ITEM);
  window.location.href = "/login";
}

export default Logout;
