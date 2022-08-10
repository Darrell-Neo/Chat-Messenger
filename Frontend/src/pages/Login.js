import React, { useContext } from "react";
import ReactContext from "../context/react-context";
import { Link } from "react-router-dom";

const Login = () => {
  const reactCtx = useContext(ReactContext);

  //create a create account for the front page

  // POST /login
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
      console.log(res);
      console.log(options);

      if (res.status !== 200) {
        window.alert("Please Register");
        throw new Error("Something went wrong.");
      }

      const data = await res.json();
      // setData(data);
      console.log(data); // this returns both access and refresh tokens as part of the data object
      const access_token = data.access;
      const refresh_token = data.refresh;
      console.log(access_token);
      console.log(refresh_token);
      reactCtx.setAccess(access_token);
      reactCtx.setRefresh(refresh_token);
      reactCtx.setLoginState(true);
      reactCtx.setLoginEmail(reactCtx.emailInput);
      // alert("Logged in");
    } catch (err) {
      // setError(err.message);
      console.log(err);
    }
  };

  function handleInput(event) {
    event.preventDefault();
    // console.log(event.target.id);
    if (event.target.id === "email") reactCtx.setEmailInput(event.target.value);
    if (event.target.id === "password")
      reactCtx.setPasswordInput(event.target.value);
    if (event.target.id === "search")
      reactCtx.setSearchUserInput(event.target.value);
  }

  function handleLogin(event) {
    event.preventDefault();
    if (reactCtx.emailInput.includes("@")) {
      fetchLogin("http://localhost:5001/users/login");
    } else {
      window.alert(`Please enter correct details`);
    }
  }

  return (
    <div className="App">
      {/* links to the registration page */}

      <form onSubmit={handleLogin}>
        <div>
          <div>
            <label className="text-center mx-auto m-2 w-1/3 block w-50 px-3 py-2">
              Email
            </label>
          </div>
          <input
            type="email"
            onChange={handleInput}
            id="email"
            value={reactCtx.emailInput}
            className="mx-auto m-2 w-1/3 block w-50 px-3 py-2 bg-white border-1 border-slate-300 rounded-md text-sm shadow-md placeholder-slate-400
            focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 placeholder:italic"
          ></input>
        </div>
        <div>
          <div>
            <label className="text-center mx-auto m-2 w-1/3 block w-50 px-3 py-2">
              Password
            </label>
          </div>
          <input
            type="password"
            onChange={handleInput}
            id="password"
            value={reactCtx.passwordInput}
            className="mx-auto m-2 w-1/3 block w-50 px-3 py-2 bg-white border-1 border-slate-300 rounded-md text-sm shadow-md placeholder-slate-400
            focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 placeholder:italic"
          ></input>
        </div>
        <div className="w-full mt-2 mb-2 py-2 text-center">
          <button
            onClick={handleLogin}
            type="submit"
            className="inline-block mx-auto mr-4 w-50 px-3 py-2 text-white font-semibold ml-4 rounded-lg shadow-md button-85"
          >
            <Link to="/profile">Login</Link>
          </button>
          <button className="inline-block mx-auto w-50 px-3 py-2 text-white font-semibold mr-4 rounded-lg shadow-md button-85">
            <Link to="/register">Register</Link>
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
