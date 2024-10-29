function Post({ title, content, creationTime, userName }) {
  return (
    <>
      <div className="post-container">
        <h3>{title}</h3>
        <span>{userName}</span>
        <span>{creationTime}</span>
        <p>{content}</p>
      </div>
    </>
  );
}

export default Post;
