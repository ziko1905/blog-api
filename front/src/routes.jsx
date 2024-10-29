import App from "./App";
import Login from "./components/Login";

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
    element: <App />,
  },
];

export default routes;
