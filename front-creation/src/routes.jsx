import PostCreate from "./components/PostCreate";
import App from "./App";

const routes = [
  {
    path: "/",
    element: <App />,
    children: [{ path: "/posts/create", element: <PostCreate /> }],
  },
];

export default routes;
