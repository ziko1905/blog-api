import ValidateMsgs from "./partials/ValidateMsgs";
import { config } from "../Constants";
import { useState } from "react";

function Signup() {
  const [validatorMsgs, setValidatorMsgs] = useState();

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = {
      username: event.target.username.value,
      email: event.target.email.value,
      password: event.target.password.value,
      passwordConf: event.target.passwordConf.value,
    };

    fetch(config.url.BASE_URL + "/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((response) => {
        if (response.messages) {
          setValidatorMsgs(response.messages);
        } else {
          window.location.href = response.redirect;
        }
      })
      .catch(() => {
        console.error("Redirecting to error page needed.");
      });
  };

  return (
    <>
      <div className="signup-container">
        <ValidateMsgs messages={validatorMsgs} />
        <form onSubmit={handleSubmit} method="POST">
          <label htmlFor="username">Username: </label>
          <input type="text" name="username" id="username" />
          <label htmlFor="email">Email: </label>
          <input type="email" name="email" id="email" />
          <label htmlFor="password">Password: </label>
          <input type="password" name="password" id="password" />
          <label htmlFor="passwordConf">Password Confirmation: </label>
          <input type="password" name="passwordConf" id="passwordConf" />
          <button type="submit">Sign Up</button>
        </form>
      </div>
    </>
  );
}

export default Signup;
