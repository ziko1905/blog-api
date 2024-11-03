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

  return <h1>This is big iframe!!!</h1>;
}

export default Iframe;
