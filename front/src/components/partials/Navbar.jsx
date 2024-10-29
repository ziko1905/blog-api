import { useEffect, useState } from "react";
import { config } from "../../Constants";
import { Link } from "react-router-dom";
import { isAuth } from "../../utils/isAuth";

function Navbar() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    isAuth(setUser);
  }, []);

  useEffect(() => {
    fetch(config.url.BASE_URL + "/posts", { mode: "cors" })
      .then((response) => {
        if (response.status != 200) {
          return;
        }
        return response.json();
      })
      .then((response) => {
        console.log(response);
      });
  }, []);

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
