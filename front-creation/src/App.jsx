import { Outlet } from "react-router-dom";
import loadFromOuterStorage from "./utils/loadFromOuterStorage";
import Navbar from "./components/partials/Navbar";

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
      <Navbar />
      <Outlet />
    </>
  );
}

export default App;
