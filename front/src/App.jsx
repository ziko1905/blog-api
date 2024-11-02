import Navbar from "./components/partials/Navbar";
import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import { UserContext } from "./Contexts";
import { isAuth } from "./utils/isAuth";

function App() {
  const [user, setUser] = useState();

  useEffect(() => {
    isAuth().then((response) => setUser(response));
  }, []);

  return (
    <>
      <UserContext.Provider value={{ user, setUser }}>
        <Navbar />
        <Outlet />
      </UserContext.Provider>
    </>
  );
}

export default App;
