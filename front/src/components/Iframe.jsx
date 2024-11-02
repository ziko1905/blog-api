let isCalled = false;

function Iframe() {
  if (!isCalled) {
    isCalled = true;
    window.parent.postMessage(
      {
        token: localStorage.getItem(import.meta.env.VITE_TOKEN_ITEM),
        type: "token",
      },
      "*"
    );
  }
}

export default Iframe;
