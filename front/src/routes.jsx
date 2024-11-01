import App from "./App";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Logout from "./components/Logout";
import Post from "./components/Post";
import User from "./components/User";
import PostList from "./components/PostList";
import Iframe from "./components/Iframe";

const routes = [
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <PostList />,
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
      {
        path: "/users/:username",
        element: <User />,
      },
    ],
  },
  {
    path: "/iframe",
    element: <Iframe />,
  },
];

export default routes;
