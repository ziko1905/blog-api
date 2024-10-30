import App from "./App";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Logout from "./components/Logout";

const routes = [
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/logout",
    element: <Logout />,
  },
];

export default routes;
