import { useState, useEffect } from "react";
import { config } from "../Constants";
import Post from "./partials/PostItem";

function PostList() {
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

  function handlePostsChange() {
    console.log("HANDLING CHANGE");
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
  }

  return (
    <>
      {posts.map((post) => {
        return (
          <Post
            handlePostsChange={handlePostsChange}
            key={post.id}
            title={post.title}
            userName={post.userName}
            creationTime={post.creationTime}
            content={post.content}
            id={post.id}
          />
        );
      })}
    </>
  );
}

export default PostList;
