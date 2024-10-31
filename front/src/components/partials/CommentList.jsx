import { useState } from "react";
import { isAuth } from "../../utils/isAuth";
import { config } from "../../Constants";
import { useParams } from "react-router-dom";

function CommentItem({ userName, content }) {
  return (
    <>
      <div className="comment">
        <p>{content}</p>
        <span>{userName}</span>
      </div>
    </>
  );
}

function CommentList({ comments = [], rerenderCallback }) {
  const { postId } = useParams();
  const [windowDisp, setWindowDisp] = useState(false);

  async function handleNewCommentDisplay() {
    const currUser = await isAuth();
    if (!currUser) {
      return (window.location.href = "/login");
    }
    setWindowDisp(true);
  }

  function handleNewComment(event) {
    event.preventDefault();
    const formData = {
      content: event.target.content.value,
    };
    fetch(config.url.BASE_URL + `/posts/${postId}/comments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem(
          import.meta.env.VITE_TOKEN_ITEM
        )}`,
      },
      body: JSON.stringify(formData),
    }).then(() => {
      rerenderCallback((prev) => !prev);
      setWindowDisp();
    });
  }

  return (
    <>
      <div>
        <h4>Comments: {comments.length}</h4>
        {!windowDisp ? (
          <button onClick={handleNewCommentDisplay}>New Comment</button>
        ) : (
          <>
            <div className="new-comment-window">
              <form onSubmit={handleNewComment}>
                <textarea name="content" id="content"></textarea>
                <button type="submit">Comment</button>
              </form>
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
