import Navbar from "./partials/Navbar";
import { config } from "../Constants";
import { useState } from "react";
import ValidateMsgs from "./partials/ValidateMsgs";

function Login() {
  const [validatorMsgs, setValidatorMsgs] = useState();

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = {
      username: event.target.username.value,
      password: event.target.password.value,
    };

    fetch(config.url.BASE_URL + "/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((response) => {
        if (response.messages) {
          setValidatorMsgs(response.messages);
        } else {
          // Either context or passed down user
          localStorage.setItem("ziko1909-app-token", response.token);
          console.log("should redirect");
          window.location.href = "/";
        }
      })
      .catch(() => {
        console.error("Redirecting to error page needed.");
      });
  };

  return (
    <>
      <Navbar />
      <div className="login-container">
        <ValidateMsgs messages={validatorMsgs} />
        <form
          onSubmit={handleSubmit}
          action={config.url.BASE_URL + "/login"}
          method="POST"
        >
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
