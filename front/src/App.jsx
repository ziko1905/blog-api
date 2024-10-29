import { useEffect, useState } from "react";
import Navbar from "./components/partials/Navbar";
import Post from "./components/partials/Post";
import { config } from "./Constants";

function App() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch(config.url.BASE_URL + "/posts", { mode: "cors" })
      .then((response) => {
        if (response.status != 200) {
          return;
        }
        return response.json();
      })
      .then((fetchedPosts) => {
        setPosts(fetchedPosts);
      });
  }, []);

  return (
    <>
      <Navbar />
      <h2>Blog API</h2>
      {posts.map((post) => {
        return (
          <Post
            key={post.id}
            title={post.title}
            userName={post.userName}
            creationTime={post.creationTime}
            content={post.content}
          />
        );
      })}
    </>
  );
}

export default App;
