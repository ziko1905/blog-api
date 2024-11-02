import PostCreate from "./components/PostCreate";
import App from "./App";
import PostList from "./components/PostList";
import PostEdit from "./components/PostEdit";

const routes = [
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <PostList /> },
      { path: "/posts/create", element: <PostCreate /> },
      { path: "/posts/:postId/edit", element: <PostEdit /> },
    ],
  },
];

export default routes;
