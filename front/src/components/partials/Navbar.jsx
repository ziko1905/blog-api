import { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../Contexts";

function Navbar() {
  const { user } = useContext(UserContext);

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
            <span>Hello, {user.username}</span>
            <a href={import.meta.env.VITE_EDIT_URL}>My Blogs</a>
            <Link to="/logout">Logout</Link>
          </>
        )}
      </nav>
    </>
  );
}

export default Navbar;
