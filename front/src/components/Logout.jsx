import { useContext } from "react";
import { UserContext } from "../Contexts";
import { isAuth } from "../utils/isAuth";

function Logout() {
  const { setUser } = useContext(UserContext);
  localStorage.removeItem(import.meta.env.VITE_TOKEN_ITEM);
  // Here to make sure user is logged out od backend as well (everything stays synced even if remove item fails)
  isAuth().then((newUsr) => setUser(newUsr));

  window.location.href = "/login";
}

export default Logout;
