import { useState } from "react";
import PostForm from "./partials/PostForm";

function PostCreate() {
  const [title, setTitle] = useState();
  const [content, setContent] = useState();
  const [messages, setMessages] = useState();

  function handleCreation(isPublished = true) {
    fetch(`${import.meta.env.VITE_BACKEND_URL}/posts`, {
      mode: "cors",
      method: "POST",
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
          window.location = import.meta.env.VITE_SHOWCASE_URL;
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
          <button onClick={() => handleCreation()}>Publish</button>
          <button onClick={() => handleCreation(false)}>Save</button>
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

export default PostCreate;
