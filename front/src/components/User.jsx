import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { config } from "../Constants";
import Post from "./partials/PostItem";

function User() {
  const { username: pageUsername } = useParams();
  const [pageUser, setPageUser] = useState();
  const [userPosts, setUserPosts] = useState([]);

  useEffect(() => {
    fetch(`${config.url.BASE_URL}/users/${pageUsername}`)
      .then((response) => {
        if (response.status >= 400) {
          return (window.location.href = "/");
        }
        return response.json();
      })
      .then((user) => {
        setPageUser(user);
      })
      .catch(() => {
        return (window.location.href = "/");
      });
  }, []);

  useEffect(() => {
    fetch(`${config.url.BASE_URL}/users/${pageUsername}/posts`)
      .then((response) => {
        return response.json();
      })
      .then((fetchedPosts) => {
        setUserPosts(fetchedPosts);
      });
  }, []);

  function handlePostsChange() {
    fetch(`${config.url.BASE_URL}/users/${pageUsername}/posts`)
      .then((response) => {
        return response.json();
      })
      .then((fetchedPosts) => {
        setUserPosts(fetchedPosts);
      });
  }

  return (
    <>
      <div className="user-info">
        <span style={{ fontSize: "20px" }}>
          {pageUser && pageUser.username}
        </span>
      </div>
      <div className="user-posts">
        {userPosts &&
          userPosts.map((post) => {
            return (
              <Post
                handlePostsChange={handlePostsChange}
                {...post}
                key={post.id}
                displayUsername={false}
              />
            );
          })}
      </div>
    </>
  );
}

export default User;
