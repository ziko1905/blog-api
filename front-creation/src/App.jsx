import { Outlet } from "react-router-dom";
import loadFromOuterStorage from "./utils/loadFromOuterStorage";

let isCalled = false;

function App() {
  if (!isCalled) {
    isCalled = true;
    loadFromOuterStorage();
  }

  return (
    <>
      <iframe
        className="token-iframe"
        src={`${import.meta.env.VITE_SHOWCASE_URL}/iframe`}
        style={{ display: "none" }}
      ></iframe>
      <div>Here should be common elems</div>
      <Outlet />
    </>
  );
}

export default App;
