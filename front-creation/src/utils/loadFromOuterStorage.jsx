function loadFromOuterStorage() {
  window.addEventListener("message", (event) => {
    if (typeof event.data !== "object") return;
    if (!event.data.type) return;
    if (event.data.type !== "token") return;
    localStorage.setItem(import.meta.env.VITE_TOKEN_ITEM, event.data.token);
  });
}

export default loadFromOuterStorage;
