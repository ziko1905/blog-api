import { useEffect, useState } from "react";

function Post({ title, content, creationTime, published, id, resetCallback }) {
  async function handlePublishChange() {
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

  function handleEdit() {
    window.location.href = `/posts/${id}/edit`;
  }

  return (
    <>
      <div className="post-div">
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
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    resetPosts();
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
          window.location = import.meta.env.VITE_SHOWCASE_URL;
        }
        return response.json();
      })
      .then((fetchedPosts) => {
        setPosts(fetchedPosts);
      });
  }

  return (
    <>
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
