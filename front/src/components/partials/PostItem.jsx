function Post({ title, content, creationTime, userName, id }) {
  function handleClick() {
    window.location.href = `/posts/${id}`;
  }

  return (
    <>
      <div onClick={handleClick} className="post-container">
        <h3>{title}</h3>
        <span>{userName}</span>
        <span>{creationTime}</span>
        <p>{content}</p>
      </div>
    </>
  );
}

export default Post;
