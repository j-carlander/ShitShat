import React, { useRef } from "react";
import "./LoginForm.css";

export function LoginForm(props) {
  const emailField = useRef();
  const passwordField = useRef();

  async function submitForm(e) {
    const identifier = emailField.current.value;
    const password = passwordField.current.value;

    e.preventDefault();
    if (!identifier || !password) return console.log("missing details");
    let fetchOptions = {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        identifier: identifier,
        password: password,
      }),
    };
    let result = await fetch("http://127.0.0.1:4000/auth/login", fetchOptions);
    let jsonResult = await result.json();

    if (result.status == 200) {
      sessionStorage.setItem("AUTH_TOKEN", jsonResult.jwt);
      props.setUserDetails(userDetails);

      props.setAuthenticated(true);

      props.setShowLoginForm(false);
    } else if (result.status == 400) {
      p.innerText = jsonResult;
    }
    serverInfo.append(p);
  }
  return (
    <div>
      <form className="login-form">
        <div className="input-group">
          <label htmlFor="emailField">email</label>
          <input
            type="email"
            id="emailField"
            ref={emailField}
            name="identifier"
          />
        </div>
        <div className="input-group">
          <label htmlFor="passwordField">Password</label>
          <input
            type="password"
            id="passwordField"
            ref={passwordField}
            name="password"
          />
        </div>

        <button id="loginBtn" type="submit">
          Log in
        </button>
        <button id="resetBtn" type="reset">
          Clear form
        </button>
      </form>
    </div>
  );
}
