import { useState } from "react";
import { isAuth } from "../../utils/isAuth";

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
  const [windowDisp, setWindowDisp] = useState(false);
  const [user, setUser] = useState();

  async function handleNewCommentDisplay() {
    const currUser = await isAuth();
    if (!currUser) {
      window.location.href = "/login";
    }
    setUser(currUser);
  }

  function handleNewComment() {}

  return (
    <>
      <div>
        <h4>Comments: {comments.length}</h4>
        <button onClick={handleNewCommentDisplay}>New Comment</button>
        {windowDisp && (
          <>
            <div className="new-comment-window">
              <form onSubmit={handleNewComment}>
                <textarea name="content" id="content"></textarea>
                <button type="submit">Comment</button>
              </form>
              <textarea name="" id=""></textarea>
            </div>
          </>
        )}
        {comments.map((comm) => {
          return <CommentItem {...comm} key={comm.id} />;
        })}
      </div>
    </>
  );
}

export default CommentList;
