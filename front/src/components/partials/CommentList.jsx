function CommentItem({ id, userName, content }) {
  return (
    <>
      <div className="comment">
        <p>{content}</p>
        <span>{userName}</span>
      </div>
    </>
  );
}

function CommentList({ comments = [] }) {
  return (
    <>
      <div>
        <h4>Comments: {comments.length}</h4>
        {comments.map((comm) => {
          return <CommentItem {...comm} key={comm.id} />;
        })}
      </div>
    </>
  );
}

export default CommentList;
