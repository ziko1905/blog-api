import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function Comment({ content, userName, postId, id, commentsCallback }) {
  const [editing, setEditing] = useState();
  const [commContent, setContent] = useState(content);

  function handleUpdate(e) {
    e.preventDefault();
    fetch(
      `${import.meta.env.VITE_BACKEND_URL}/posts/${postId}/comments/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem(
            import.meta.env.VITE_TOKEN_ITEM
          )}`,
        },
        body: JSON.stringify({ content: commContent }),
      }
    ).then(() => {
      commentsCallback();
      setEditing(false);
    });
  }

  function handleDelete() {
    fetch(
      `${import.meta.env.VITE_BACKEND_URL}/posts/${postId}/comments/${id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem(
            import.meta.env.VITE_TOKEN_ITEM
          )}`,
        },
      }
    ).then(() => {
      commentsCallback();
    });
  }

  return (
    <div className="comment-container">
      {!editing ? (
        <>
          <p>{content}</p>
          <span>{userName}</span>
          <button onClick={() => setEditing(true)}>Edit</button>
          <button onClick={handleDelete}>Delete</button>
        </>
      ) : (
        <form onSubmit={handleUpdate}>
          <textarea
            name="content"
            id="content"
            onChange={(e) => setContent(e.target.value)}
            value={commContent}
          ></textarea>
          <button type="submit">Save</button>
        </form>
      )}
    </div>
  );
}

function PostDetail() {
  const { postId } = useParams();
  const [title, setTitle] = useState();
  const [content, setContent] = useState();
  const [comments, setComments] = useState();
  const [creationTime, setCreationTime] = useState();

  useEffect(() => {
    fetch(`${import.meta.env.VITE_BACKEND_URL}/posts/${postId}`)
      .then((response) => response.json())
      .then((response) => {
        if (response.message) {
          // Until error page is implemented
          window.location.href = "/";
        } else {
          setTitle(response.title);
          setContent(response.content);
          setCreationTime(response.creationTime);
        }
      });
  }, []);

  useEffect(() => {
    rerenderComments();
  }, []);

  function rerenderComments() {
    fetch(`${import.meta.env.VITE_BACKEND_URL}/posts/${postId}/comments`)
      .then((response) => response.json())
      .then((response) => {
        if (response instanceof Array) {
          setComments(response);
        }
      });
  }

  return (
    <>
      <div className="post">
        <h2>{title}</h2>
        <div className="post-detail">
          <span>{creationTime}</span>
        </div>
        <p>{content}</p>
        {comments && (
          <div className="comment-list">
            {comments.map((comm) => {
              return (
                <Comment
                  {...comm}
                  commentsCallback={rerenderComments}
                  key={comm.id}
                />
              );
            })}
          </div>
        )}
      </div>
    </>
  );
}

export default PostDetail;
