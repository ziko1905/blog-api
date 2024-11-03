function loadFromOuterStorage() {
  window.addEventListener("message", (event) => {
    console.log("E LISTENER GOT CALLED");
    if (typeof event.data !== "object") return;
    if (!event.data.type) return;
    if (event.data.type !== "token") return;
    console.log("IFS ARE FINE", event.data);
    localStorage.setItem(import.meta.env.VITE_TOKEN_ITEM, event.data.token);
  });
}

export default loadFromOuterStorage;
