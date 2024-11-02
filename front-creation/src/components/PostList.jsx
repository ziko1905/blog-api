const { useEffect } = require("react");
const { useState } = require("react");

function PostList() {
  const [posts, setPosts] = useState();
  useEffect(() => {
    fetch(import.meta.env.VITE_BACKEND_URL);
  });
}
