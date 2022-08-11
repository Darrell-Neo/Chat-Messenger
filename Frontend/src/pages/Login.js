import React, { useContext } from "react";
import ReactContext from "../context/react-context";
import { Link } from "react-router-dom";
import jwt_decode from "jwt-decode";
import "./login.css";

const Login = () => {
  const reactCtx = useContext(ReactContext);

  const fetchLogin = async (url) => {
    const bod = JSON.stringify({
      email: reactCtx.emailInput,
      password: reactCtx.passwordInput,
    });

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: "Bearer " + reactCtx.access,
      },
      body: bod,
    };

    try {
      const res = await fetch(url, options);

      if (res.status !== 200) {
        window.alert("Please Register");
        throw new Error("Something went wrong.");
      }

      const data = await res.json();
      reactCtx.setAccess(data.access);
      reactCtx.setRefresh(data.refresh);
      reactCtx.setLoginState(true);
      reactCtx.setLoginEmail(reactCtx.emailInput);
      reactCtx.setUser(jwt_decode(data.access));
    } catch (error) {
      console.log(error);
    }
  };

  function handleInput(event) {
    event.preventDefault();
    if (event.target.id === "email") reactCtx.setEmailInput(event.target.value);
    if (event.target.id === "password")
      reactCtx.setPasswordInput(event.target.value);
  }

  function handleLogin(event) {
    event.preventDefault();
    if (reactCtx.emailInput.includes("@")) {
      fetchLogin("http://localhost:5001/users/login");
    } else {
      window.alert(`Please enter a valid email`);
    }
  }

  return (
    <div className="login">
      <form onSubmit={handleLogin}>
        <div>
          <div>
            <label className="">Email</label>
          </div>
          <input
            type="email"
            onChange={handleInput}
            id="email"
            value={reactCtx.emailInput}
            className=""
          ></input>
        </div>
        <div>
          <div>
            <label className="">Password</label>
          </div>
          <input
            type="password"
            onChange={handleInput}
            id="password"
            value={reactCtx.passwordInput}
            className=""
          ></input>
        </div>
        <div className="">
          <button onClick={handleLogin} type="submit" className="">
            <Link to="/messenger">Login</Link>
          </button>
          <button className="">
            <Link to="/register">Register</Link>
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
