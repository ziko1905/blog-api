import { useEffect, useState } from "react";
import PostForm from "./partials/PostForm";
import { useParams } from "react-router-dom";

function PostEdit() {
  const { postId } = useParams();
  const [title, setTitle] = useState();
  const [content, setContent] = useState();
  const [messages, setMessages] = useState();
  const [published, setPublished] = useState();

  useEffect(() => {
    fetch(`${import.meta.env.VITE_BACKEND_URL}/posts/${postId}`)
      .then((response) => {
        if (response.status >= 400) {
          window.location.href = "/";
        }
        return response.json();
      })
      .then((response) => {
        if (response.messages) {
          return response.messages.forEach((msg) => {
            console.error(msg);
          });
        }
        setTitle(response.title);
        setContent(response.content);
        setPublished(response.published);
      });
  }, []);

  function handleUpdate(isPublished) {
    fetch(`${import.meta.env.VITE_BACKEND_URL}/posts/${postId}`, {
      mode: "cors",
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem(
          import.meta.env.VITE_TOKEN_ITEM
        )}`,
      },

      body: JSON.stringify({
        title: title,
        content: content,
        published: isPublished,
      }),
    })
      .then((response) => response.json())
      .then((response) => {
        if (response.messages) {
          setMessages(response.messages);
        } else {
          window.location.href = "/";
        }
      });
  }

  return (
    <>
      <div className="post-create-div">
        <h1>Create Post</h1>
        {messages && (
          <div className="message-div">
            {messages.map((msg, index) => {
              return <span key={index}>{msg}</span>;
            })}
          </div>
        )}
        <div className="pub-buttons">
          <button onClick={() => handleUpdate(true)}>Publish</button>
          <button onClick={() => handleUpdate(published)}>Save</button>
        </div>
        <PostForm
          defTitle={title}
          defContent={content}
          setTitle={setTitle}
          setContent={setContent}
        />
      </div>
    </>
  );
}

export default PostEdit;
