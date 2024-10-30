import App from "./App";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Logout from "./components/Logout";
import Post from "./components/Post";

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
  {
    path: "/posts/:postId",
    element: <Post />,
  },
];

export default routes;
