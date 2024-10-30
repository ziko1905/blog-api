function Logout() {
  localStorage.removeItem("ziko1909-app-token");
  window.location.href = "/login";
}

export default Logout;
