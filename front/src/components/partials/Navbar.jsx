import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { isAuth } from "../../utils/isAuth";

function Navbar() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    isAuth(setUser);
  }, []);

  return (
    <>
      <nav>
        <div className="logo">Blog-API</div>
        <Link to={"/"}>Posts</Link>
        {!user ? (
          <>
            <Link to="/login">Log In</Link>
            <Link to="/signup">Sign Up</Link>
          </>
        ) : (
          <>
            <Link to="/myblogs">My Blogs</Link>
            <Link to="/logout">Logout</Link>
          </>
        )}
      </nav>
    </>
  );
}

export default Navbar;
