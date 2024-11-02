import { Link } from "react-router-dom";

function Navbar() {
  return (
    <>
      <nav className="navbar">
        <a href={import.meta.env.VITE_SHOWCASE_URL}>Posts</a>
        <Link to={"/"}>Edit Page</Link>
      </nav>
    </>
  );
}

export default Navbar;
