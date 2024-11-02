import { Link } from "react-router-dom";

function ErrorPage() {
  return (
    <>
      <div className="error-container">
        <h1>Ops, Looks like you went somewhere not yet discovered!</h1>
        <Link to={"/"}>Go back to homepage by clicking here!</Link>
      </div>
    </>
  );
}

export default ErrorPage;
