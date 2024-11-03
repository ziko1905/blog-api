import { Link } from "react-router-dom";
import { UserContext } from "../../Contexts";
import { useContext } from "react";

function Navbar() {
  const { user } = useContext(UserContext);

  return (
    <>
      <nav className="navbar">
        <a href={import.meta.env.VITE_SHOWCASE_URL}>Posts</a>
        <Link to={"/"}>Edit Page</Link>
        {!user ? (
          <>
            <Link to="/login">Log In</Link>
            <Link to="/signup">Sign Up</Link>
          </>
        ) : (
          <>
            <span>Hello, {user.username}</span>
            <Link to="/logout">Logout</Link>
          </>
        )}
      </nav>
    </>
  );
}

export default Navbar;
