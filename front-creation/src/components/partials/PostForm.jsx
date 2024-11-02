function PostForm({ defTitle = "", defContent = "", setTitle, setContent }) {
  return (
    <>
      <form>
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          name="title"
          id="title"
          value={defTitle}
          onChange={(event) => setTitle(event.target.value)}
        />
        <label htmlFor="content">Content:</label>
        <textarea
          name="content"
          id="content"
          value={defContent}
          onChange={(event) => setContent(event.target.value)}
        ></textarea>
      </form>
    </>
  );
}

export default PostForm;
