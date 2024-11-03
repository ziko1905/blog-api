import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Post({ title, content, creationTime, published, id, resetCallback }) {
  async function handlePublishChange(e) {
    e.stopPropagation();
    await fetch(`${import.meta.env.VITE_BACKEND_URL}/posts/${id}/publish`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem(
          import.meta.env.VITE_TOKEN_ITEM
        )}`,
      },
      body: JSON.stringify({
        published: !published,
      }),
    });

    resetCallback();
  }

  function handleEdit(e) {
    e.stopPropagation();
    window.location.href = `/posts/${id}/edit`;
  }

  function handleDetail() {
    window.location.href = `/posts/${id}`;
  }

  return (
    <>
      <div className="post-div" onClick={handleDetail}>
        <h3>{title}</h3>
        <p>{content}</p>
        <span>{creationTime}</span>
        <div className="publish-div">
          {
            <button onClick={handlePublishChange}>
              {published ? "Unpublish" : "Publish"}
            </button>
          }
          <button onClick={handleEdit}>Edit</button>
        </div>
      </div>
    </>
  );
}

function PostList() {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    setTimeout(() => resetPosts(), 2000);
  }, []);

  function resetPosts() {
    fetch(`${import.meta.env.VITE_BACKEND_URL}/posts/private`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem(
          import.meta.env.VITE_TOKEN_ITEM
        )}`,
      },
    })
      .then((response) => {
        if (response.status >= 400) {
          // window.location = import.meta.env.VITE_SHOWCASE_URL;
        }
        return response.json();
      })
      .then((fetchedPosts) => {
        setPosts(fetchedPosts);
      });
  }

  function handleNew() {
    navigate("/posts/create");
  }

  return (
    <>
      <button onClick={handleNew}>Create New</button>
      {!!posts.length && (
        <div className="posts-list">
          {posts.map((p) => {
            return <Post resetCallback={resetPosts} {...p} key={p.id} />;
          })}
        </div>
      )}
    </>
  );
}

export default PostList;
