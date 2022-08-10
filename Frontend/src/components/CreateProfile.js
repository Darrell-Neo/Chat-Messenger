import React, { useContext } from "react";
import ReactContext from "../context/react-context";
import { Link } from "react-router-dom";

const CreateProfile = () => {
  const reactCtx = useContext(ReactContext);

  const fetchReg = async (url) => {
    const bod = JSON.stringify({
      email: reactCtx.emailInput,
      password: reactCtx.passwordInput,
      password1: reactCtx.passwordInput,
      name: reactCtx.nameInput,
      profileType: reactCtx.profileTypeInput,
      contact: {
        address: reactCtx.addressInput,
        phone: reactCtx.phoneInput,
      },
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
      reactCtx.setNameInput(data.name);
      reactCtx.setProfileTypeInput(data.profiletype);
      reactCtx.setAddressInput(data.contact?.address);
      reactCtx.setPhoneInput(data.contact?.phone);
      // alert("profile created");
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
    // if (event.target.id === "password1")
    //   reactCtx.setConfirmPassword(event.target.value);
    if (event.target.id === "name") reactCtx.setNameInput(event.target.value);
    if (event.target.id === "profiletype")
      reactCtx.setProfileTypeInput(event.target.value);
    if (event.target.id === "address")
      reactCtx.setAddressInput(event.target.value);
    if (event.target.id === "phone") reactCtx.setPhoneInput(event.target.value);
  }

  function handleRegister(event) {
    event.preventDefault();
    fetchReg("http://localhost:5001/users/register");
  }

  return (
    <>
      <h1>Registration Page</h1>
      <form>
        <div className="justify-center">
          <input
            type="email"
            placeholder="Required: Your Email Address"
            onChange={handleInput}
            id="email"
            className="mx-auto m-2 w-1/3 block w-50 px-3 py-2 bg-white border-1 border-slate-300 rounded-md text-sm shadow-md placeholder-slate-400 capitalize
            focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 placeholder:italic"
          ></input>
        </div>
        <div>
          <input
            type="password"
            placeholder="Required: Alphanumeric"
            onChange={handleInput}
            id="password"
            className="mx-auto m-2 w-1/3 block w-50 px-3 py-2 bg-white border-1 border-slate-300 rounded-md text-sm shadow-md placeholder-slate-400 capitalize
            focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 placeholder:italic"
          ></input>
        </div>
        <div>
          <input
            type="text"
            placeholder="Required: Your Name"
            onChange={handleInput}
            id="name"
            className="mx-auto m-2 w-1/3 block w-50 px-3 py-2 bg-white border-1 border-slate-300 rounded-md text-sm shadow-md placeholder-slate-400 capitalize
            focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 placeholder:italic"
          ></input>
        </div>
        <div>
          <div>
            <input
              type="text"
              placeholder="Optional: Your Address"
              onChange={handleInput}
              id="address"
              className="mx-auto m-2 w-1/3 block w-50 px-3 py-2 bg-white border-1 border-slate-300 rounded-md text-sm shadow-md placeholder-slate-400 capitalize
              focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 placeholder:italic"
            ></input>
          </div>
          <div>
            <input
              type="number"
              placeholder="Optional: Your Phone Number"
              onChange={handleInput}
              id="phone"
              className="mx-auto m-2 w-1/3 block w-50 px-3 py-2 bg-white border-1 border-slate-300 rounded-md text-sm shadow-md placeholder-slate-400 capitalize
              focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 placeholder:italic"
            ></input>
          </div>
        </div>
        <div>
          <select
            id="profiletype"
            onChange={handleInput}
            className="mx-auto m-2 w-1/3 block w-50 px-3 py-2 bg-white border-1 border-slate-300 rounded-md text-sm shadow-md placeholder-slate-400 capitalize
            focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 placeholder:italic"
          >
            <option value="">Required: What are you doing here?</option>
            <option value="adopter">Adopting a pet!</option>
            <option value="poster">Posting an adoption!</option>
          </select>
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
