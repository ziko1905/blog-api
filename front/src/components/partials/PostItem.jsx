import { useContext } from "react";
import { UserContext } from "../../Contexts";
import { config } from "../../Constants";

function Post({
  title,
  content,
  creationTime,
  userName,
  id,
  displayUsername = true,
  handlePostsChange,
}) {
  const { user } = useContext(UserContext);

  function handleClick() {
    window.location.href = `/posts/${id}`;
  }

  function handleDelete(event) {
    event.stopPropagation();
    fetch(`${config.url.BASE_URL}/posts/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem(
          import.meta.env.VITE_TOKEN_ITEM
        )}`,
      },
    }).then(() => handlePostsChange());
  }

  // Needs implementation on editing site (essentially reroutes to other site edit route)
  // function handleEdit() {

  // }
  return (
    <>
      <div onClick={handleClick} className="post-container">
        <h3>{title}</h3>
        {displayUsername && <span>{userName}</span>}
        <span>{creationTime}</span>
        <p>{content}</p>
        {user && user.username == userName && (
          <div className="oper-buttons">
            <button onClick={handleDelete}>Delete</button>
            <button>Edit</button>
          </div>
        )}
      </div>
    </>
  );
}

export default Post;
