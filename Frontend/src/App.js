import React, { Suspense, useState } from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import ReactContext from "./context/react-context";

import NavBar from "./components/NavBar";

const Login = React.lazy(() => import("./pages/Login"));
const CreateProfile = React.lazy(() => import("./components/CreateProfile"));
const Profile = React.lazy(() => import("./pages/Profile"));
const Messenger = React.lazy(() => import("./pages/Messenger"));

function App() {
  // Login and Register a profile
  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [password1Input, setPassword1Input] = useState("");
  const [nameInput, setNameInput] = useState("");
  const [validEmail, setValidEmail] = useState(false);

  // Login tokens
  const [access, setAccess] = useState("");
  const [refresh, setRefresh] = useState("");
  const [user, setUser] = useState("");
  const [loginState, setLoginState] = useState(false);
  const [loginEmail, setLoginEmail] = useState("");

  // Search bar
  const [searchListingInput, setSearchListingInput] = useState("");

  // Profile
  const [userProfile, setUserProfile] = useState("");

  // To display users in profile page
  const fetchDisplay = async (url) => {
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: "Bearer " + access,
      },
    };

    try {
      const res = await fetch(url, options);
      console.log(res);
      if (res.status !== 200) {
        throw new Error("Something went wrong.");
      }

      const data = await res.json();
      console.log(data);
      setUserProfile(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ReactContext.Provider
      value={{
        emailInput,
        setEmailInput,
        passwordInput,
        setPasswordInput,
        password1Input,
        setPassword1Input,
        nameInput,
        setNameInput,
        validEmail,
        setValidEmail,
        access,
        setAccess,
        refresh,
        setRefresh,
        user,
        setUser,
        loginState,
        setLoginState,
        loginEmail,
        setLoginEmail,
        searchListingInput,
        setSearchListingInput,
        userProfile,
        setUserProfile,
        fetchDisplay,
      }}
    >
      <div className="container">
        <NavBar />
        <Suspense fallback={<p>loading...</p>}>
          <Switch>
            <Route exact path="/">
              <Redirect to="/messenger"></Redirect>
            </Route>
            <Route path="/messenger">
              {loginState ? <Messenger /> : <Redirect to="/login" />}
            </Route>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/register">
              <CreateProfile />
            </Route>
            <Route path="/profile">
              <Profile />
            </Route>
          </Switch>
        </Suspense>
      </div>
    </ReactContext.Provider>
  );
}

export default App;
