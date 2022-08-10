import React, { useContext, useState } from "react";
import ReactContext from "../context/react-context";
import { Link } from "react-router-dom";

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

  const fetchReg = async (url) => {
    const bod = JSON.stringify({
      email: reactCtx.emailInput,
      password: reactCtx.passwordInput,
      password1: reactCtx.password1Input,
      name: reactCtx.nameInput,
    });

    const options = {
      method: "PUT",
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
        throw new Error("Something went wrong.");
      }

      const data = await res.json();
      // setData(data);
      console.log(data); // this returns both access and refresh tokens as part of the data object

      reactCtx.setEmailInput(data.email);
      reactCtx.setPasswordInput(data.password);
      reactCtx.setPassword1Input(data.password1);
      reactCtx.setNameInput(data.name);
    } catch (err) {
      console.log(err);
    }
  };

  function handleInput(event) {
    event.preventDefault();
    // console.log(event.target.id);
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
    <>
      <h1>Registration Page</h1>
      <form>
        <div className="justify-center">
          <input
            type="email"
            placeholder="Login Email Address"
            onChange={handleInput}
            id="email"
            className="mx-auto m-2 w-1/3 block w-50 px-3 py-2 bg-white border-1 border-slate-300 rounded-md text-sm shadow-md placeholder-slate-400
            focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 placeholder:italic"
          ></input>
        </div>
        <div>
          <input
            type="password"
            placeholder="Password (minimum of 12 alphanumeric characters)"
            onChange={handleInput}
            id="password"
            className="mx-auto m-2 w-1/3 block w-50 px-3 py-2 bg-white border-1 border-slate-300 rounded-md text-sm shadow-md placeholder-slate-400
            focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 placeholder:italic"
          ></input>
        </div>
        <div>
          <input
            type="password"
            placeholder="Please retype your password"
            onChange={handleInput}
            id="password1"
            className="mx-auto m-2 w-1/3 block w-50 px-3 py-2 bg-white border-1 border-slate-300 rounded-md text-sm shadow-md placeholder-slate-400
            focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 placeholder:italic"
          ></input>
        </div>
        <div>
          <input
            type="text"
            placeholder="Name"
            onChange={handleInput}
            id="name"
            className="mx-auto m-2 w-1/3 block w-50 px-3 py-2 bg-white border-1 border-slate-300 rounded-md text-sm shadow-md placeholder-slate-400 capitalize
            focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 placeholder:italic"
          ></input>
        </div>
        <div className="text-center mx-auto m-2 w-1/3 block w-50 px-3 py-2">
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
          <button
            onClick={handleRegister}
            className="mx-auto block w-50 px-3 py-2 text-white font-semibold button-85"
          >
            <Link to="/login">Register</Link>
          </button>
        </div>
      </form>
      <div></div>
    </>
  );
};

export default CreateProfile;
