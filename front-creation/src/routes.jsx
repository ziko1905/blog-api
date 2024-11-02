import PostCreate from "./components/PostCreate";
import App from "./App";
import PostList from "./components/PostList";

const routes = [
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <PostList /> },
      { path: "/posts/create", element: <PostCreate /> },
    ],
  },
];

export default routes;
