import { useState, useContext } from "react";
import ValidateMsgs from "./partials/ValidateMsgs";
import { UserContext } from "../Contexts";
import { isAuth } from "../utils/isAuth";

function Login() {
  const [validatorMsgs, setValidatorMsgs] = useState();
  const { user, setUser } = useContext(UserContext);

  if (user) {
    return (window.location.href = "/");
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = {
      username: event.target.username.value,
      password: event.target.password.value,
    };

    fetch(import.meta.env.VITE_BACKEND_URL + "/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((response) => {
        if (response.messages) {
          setValidatorMsgs(response.messages);
        } else {
          localStorage.setItem(import.meta.env.VITE_TOKEN_ITEM, response.token);
          isAuth().then((loggedUser) => {
            setUser(loggedUser);
          });
          window.location.href = "/";
        }
      })
      .catch(() => {
        console.error("Redirecting to error page needed.");
      });
  };

  return (
    <>
      <div className="login-container">
        <ValidateMsgs messages={validatorMsgs} />
        <form onSubmit={handleSubmit} method="POST">
          <label htmlFor="username">Username: </label>
          <input type="text" name="username" id="username" />
          <label htmlFor="password">Password: </label>
          <input type="text" name="password" id="password" />
          <button type="submit">Log In</button>
        </form>
      </div>
    </>
  );
}

export default Login;
