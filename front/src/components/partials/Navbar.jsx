import { useEffect, useState } from "react";
import { config } from "../../Constants";
import { Link } from "react-router-dom";

function Navbar() {
  const [user, setUser] = useState(null);
  useEffect(() => {
    fetch(config.url.BASE_URL + "/posts", { mode: "cors" })
      .then((response) => {
        if (response.status != 200) {
          return;
        }
        return response.json();
      })
      .then((response) => {
        if (response.user) {
          setUser(user);
        }
      });
  });

  return (
    <>
      <nav>
        <div className="logo">Blog-API</div>
        <Link to={""}>Posts</Link>
        {!user ? (
          <>
            <Link to="/login">Log In</Link>
            <Link to="/signup">Sign Up</Link>
          </>
        ) : (
          <>
            <Link to="myblogs">My Blogs</Link>
          </>
        )}
      </nav>
    </>
  );
}

export default Navbar;
