import Navbar from "./partials/Navbar";
import { config } from "../Constants";
import { useState } from "react";

function ValidateMsgs({ messages = [] }) {
  return (
    <>
      {!!messages.length && (
        <div className="valid-msg-container">
          <ul>
            {messages.map((element) => {
              return <li className="valid-msg">{element}</li>;
            })}
          </ul>
        </div>
      )}
    </>
  );
}

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
          console.log("Hello,", response.user.username);
        }
      })
      .catch((err) => {
        console.log(err);
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
