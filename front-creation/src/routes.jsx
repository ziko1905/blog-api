import PostCreate from "./components/PostCreate";
import App from "./App";
import PostList from "./components/PostList";
import PostEdit from "./components/PostEdit";
import PostDetail from "./components/PostDetail";
import ErrorPage from "./components/ErrorPage";

const routes = [
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <PostList /> },
      { path: "posts/create", element: <PostCreate /> },
      { path: "posts/:postId", element: <PostDetail /> },
      { path: "posts/:postId/edit", element: <PostEdit /> },
    ],
  },
];

export default routes;
