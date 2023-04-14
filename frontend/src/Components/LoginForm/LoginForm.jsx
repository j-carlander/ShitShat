import React, { useEffect, useRef, useState } from "react";
import "./LoginForm.css";

export function LoginForm(props) {
  const emailFieldRef = useRef();
  const errRef = useRef();

  const [errMsg, setErrMsg] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // focus on email input field when component loads
  useEffect(() => {
    emailFieldRef.current.focus();
  }, []);

  // reset errMsg when email och password retyped
  useEffect(() => {
    setErrMsg("");
  }, [email, password]);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!email || !password) return setErrMsg("missing details");
    let headersList = {
      Accept: "*/*",
      "User-Agent": "Thunder Client (https://www.thunderclient.com)",
      "Content-Type": "application/json",
    };

    let bodyContent = JSON.stringify({
      identifier: email,
      password: password,
    });

    let response = await fetch("http://localhost:4500/auth/login", {
      method: "POST",
      body: bodyContent,
      headers: headersList,
    });

    if (response.status == 200) {
      let jsonResult = await response.json();
      sessionStorage.setItem("AUTH_TOKEN", jsonResult.jwt);
      props.setUserDetails(jsonResult.userDetails);

      props.setAuthenticated(true);

      props.setShowLoginForm(false);
    } else if (response.status == 400) {
      setErrMsg(response);
    }
  }
  return (
    <div className="login-wrapper">
      <div className="modal">
        <button
          className="close-btn"
          onClick={() => {
            props.setShowLoginForm(false);
          }}>
          X
        </button>

        <p ref={errRef} className={errMsg ? "err-msg" : "hidden"}>
          {errMsg}
        </p>
        <form className="login-form" onSubmit={handleSubmit}>
          <h2>User Sign in</h2>
          <div className="input-group">
            <label htmlFor="emailField">email</label>
            <input
              type="email"
              id="emailField"
              ref={emailFieldRef}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="passwordField">Password</label>
            <input
              type="password"
              id="passwordField"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button id="loginBtn" type="submit">
            Sign in
          </button>
          <button
            id="resetBtn"
            type="reset"
            onClick={() => {
              setEmail("");
              setPassword("");
            }}>
            Clear form
          </button>
        </form>
      </div>
    </div>
  );
}
