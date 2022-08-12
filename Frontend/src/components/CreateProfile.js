import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import ReactContext from "../context/react-context";
import "./createProfile.css";

const CreateProfile = () => {
  const reactCtx = useContext(ReactContext);

  const [uploadPhoto, setUploadPhoto] = useState("");

  const submitReg = async (url) => {
    const formdata = new FormData();
    formdata.append("email", reactCtx.emailInput);
    formdata.append("password", reactCtx.passwordInput);
    formdata.append("password1", reactCtx.password1Input);
    formdata.append("name", reactCtx.nameInput);
    formdata.append("photo", uploadPhoto);

    const options = {
      method: "PUT",
      headers: {
        authorization: "Bearer " + reactCtx.access,
      },
      body: formdata,
    };

    try {
      const res = await fetch(url, options);
      console.log(res);
      console.log(options);

      if (res.status !== 200) {
        throw new Error("Something went wrong.");
      }

      const data = await res.json();
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };

  function handleInput(event) {
    event.preventDefault();
    if (event.target.id === "email") reactCtx.setEmailInput(event.target.value);
    if (event.target.id === "password")
      reactCtx.setPasswordInput(event.target.value);
    if (event.target.id === "password1")
      reactCtx.setPassword1Input(event.target.value);
    if (event.target.id === "name") reactCtx.setNameInput(event.target.value);
    if (event.target.id === "file") setUploadPhoto(event.target.files[0]);
  }

  function handleRegister(event) {
    event.preventDefault();
    submitReg("http://localhost:5001/users/register");
  }

  return (
    <div className="register">
      <h1>Registration Page</h1>
      <form>
        <div>
          Email:
          <input
            type="email"
            placeholder="Login Email Address"
            onChange={handleInput}
            id="email"
          ></input>
        </div>
        <div>
          Password:
          <input
            type="password"
            placeholder="Password (minimum of 12 alphanumeric characters)"
            onChange={handleInput}
            id="password"
          ></input>
        </div>
        <div>
          Password retype:
          <input
            type="password"
            placeholder="Please retype your password"
            onChange={handleInput}
            id="password1"
          ></input>
        </div>
        <div>
          Name:
          <input
            type="text"
            placeholder="Name"
            onChange={handleInput}
            id="name"
          ></input>
        </div>
        <div>
          Profile Picture:
          <input
            type="file"
            accept=".png, .jpg, .jpeg"
            name="image"
            onChange={handleInput}
            placeholder="image"
            id="file"
          ></input>
        </div>
        <div>
          <button onClick={handleRegister} className="">
            <Link to="/login">Register</Link>
          </button>
        </div>
      </form>
      <div></div>
    </div>
  );
};

export default CreateProfile;
