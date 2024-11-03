let isCalled = false;

function Iframe() {
  if (!isCalled) {
    isCalled = true;
    console.log(localStorage.getItem(import.meta.env.VITE_TOKEN_ITEM));
    window.parent.postMessage(
      {
        token: `${localStorage.getItem(import.meta.env.VITE_TOKEN_ITEM)}, ${
          import.meta.env.VITE_TOKEN_ITEM
        }`,
        type: "token",
      },
      "*"
    );
  }

  return <h1>This is big iframe!!!</h1>;
}

export default Iframe;
