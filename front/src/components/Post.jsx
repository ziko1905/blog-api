import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "./partials/Navbar";
import { config } from "../Constants";
import CommentList from "./partials/CommentList";

function Post() {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState(null);

  useEffect(() => {
    fetch(config.url.BASE_URL + `/posts/${postId}`)
      .then((response) => response.json())
      .then((response) => {
        if (response.message) {
          // Until error page is implemented
          window.location.href = "/";
        } else {
          setPost(response);
        }
      });
  }, []);

  useEffect(() => {
    fetch(config.url.BASE_URL + `/posts/${postId}/comments`)
      .then((response) => response.json())
      .then((response) => {
        if (response instanceof Array) {
          setComments(response);
        }
      });
  }, []);
  return (
    <>
      <Navbar />
      {post && (
        <div className="post">
          <h2>{post.title}</h2>
          <div className="post-detail">
            <span>{post.userName}</span>
            <span>{post.creationTime}</span>
          </div>
          <p>{post.content}</p>
          {comments && <CommentList comments={comments} />}
        </div>
      )}
    </>
  );
}

export default Post;
