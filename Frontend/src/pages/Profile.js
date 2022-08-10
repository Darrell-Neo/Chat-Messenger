import React, { useContext, useEffect, useState } from "react";
import ReactContext from "../context/react-context";
import { Link } from "react-router-dom";

const Profile = () => {
  const reactCtx = useContext(ReactContext);

  const [profileEdit, setProfileEdit] = useState(false);
  const [userEmailToEdit, setUserEmailToEdit] = useState("");

  const fetchProfileDelete = async (url, profileEmailToDelete) => {
    const bod = JSON.stringify({
      email: profileEmailToDelete,
    });

    const options = {
      method: "DELETE",
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
      console.log(data);
      // reactCtx.setUserProfile(data);

      if (reactCtx.userRole == "user") {
        window.location.reload();
        // window.location.replace("http://localhost:3000/home");
      }

      if (reactCtx.userRole == "admin") {
        reactCtx.refreshState
          ? reactCtx.setRefreshState(false)
          : reactCtx.setRefreshState(true);
      }
    } catch (err) {
      // setError(err.message);
      console.log(err);
    }
  };

  function handleProfileDelete(event) {
    event.preventDefault();
    console.log(event.target.id);
    // if (event.target.id == reactCtx.loginEmail) reactCtx.setEmailInput(event.target.value);
    fetchProfileDelete("http://localhost:5001/users/user", event.target.id);
  }

  const fetchProfileUpdate = async (url) => {
    const bod = JSON.stringify({
      email: userEmailToEdit,
      newEmail: reactCtx.emailInput,
      newPassword: reactCtx.passwordInput,
      name: reactCtx.nameInput,
      profileType: reactCtx.profileTypeInput,
      contact: {
        address: reactCtx.addressInput,
        phone: reactCtx.phoneInput,
      },
    });

    const options = {
      method: "PATCH",
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
      console.log(data);
      alert("profile updated");
      setProfileEdit(false);

      reactCtx.refreshState
        ? reactCtx.setRefreshState(false)
        : reactCtx.setRefreshState(true);
    } catch (err) {
      // setError(err.message);
      console.log(err);
    }
  };

  function handleProfileEdit(event) {
    event.preventDefault();
    console.log(event.target.id);
    setProfileEdit(true);

    // call profile and save data into states
    setUserEmailToEdit(reactCtx.userProfile[event.target.id].email);
    reactCtx.setEmailInput(reactCtx.userProfile[event.target.id].email);
    reactCtx.setNameInput(reactCtx.userProfile[event.target.id].name);
    reactCtx.setProfileTypeInput(
      reactCtx.userProfile[event.target.id].profileType
    );
    reactCtx.setAddressInput(
      reactCtx.userProfile[event.target.id].contact.address
    );
    reactCtx.setPhoneInput(reactCtx.userProfile[event.target.id].contact.phone);
  }

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

  function handleUpdate(event) {
    event.preventDefault();
    fetchProfileUpdate("http://localhost:5001/users/user");
  }

  useEffect(() => {
    reactCtx.fetchDisplay("http://localhost:5001/users/users"); // eslint-disable-next-line
  }, [reactCtx.loginState, reactCtx.refreshState]);

  return (
    <div className="App">
      {profileEdit ? (
        <div>
          <form>
            <div className="justify-center">
              <input
                type="email"
                placeholder="Email Address"
                onChange={handleInput}
                id="email"
                value={reactCtx.emailInput}
                className="mx-auto m-2 w-1/3 block w-50 px-3 py-2 bg-white border-1 border-slate-300 rounded-md text-sm shadow-md placeholder-slate-400 
                focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 placeholder:italic"
              ></input>
            </div>
            <div>
              <input
                type="password"
                placeholder="New Password"
                onChange={handleInput}
                id="password"
                value={reactCtx.passwordInput}
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
                value={reactCtx.nameInput}
                className="mx-auto m-2 w-1/3 block w-50 px-3 py-2 bg-white border-1 border-slate-300 rounded-md text-sm shadow-md placeholder-slate-400 capitalize
            focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 placeholder:italic"
              ></input>
            </div>
            <div>
              <div>
                <input
                  type="text"
                  placeholder="Address"
                  onChange={handleInput}
                  id="address"
                  value={reactCtx.addressInput}
                  className="mx-auto m-2 w-1/3 block w-50 px-3 py-2 bg-white border-1 border-slate-300 rounded-md text-sm shadow-md placeholder-slate-400 capitalize
              focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 placeholder:italic"
                ></input>
              </div>
              <div>
                <input
                  type="number"
                  placeholder="Phone Number"
                  onChange={handleInput}
                  id="phone"
                  value={reactCtx.phoneInput}
                  className="mx-auto m-2 w-1/3 block w-50 px-3 py-2 bg-white border-1 border-slate-300 rounded-md text-sm shadow-md placeholder-slate-400 capitalize
              focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 placeholder:italic"
                ></input>
              </div>
            </div>
            <div>
              <select
                id="profiletype"
                onChange={handleInput}
                value={reactCtx.profileTypeInput}
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
                onClick={handleUpdate}
                className="mx-auto block w-50 px-3 py-2 text-white font-semibold rounded-lg shadow-md bg-gradient-to-r from-indigo-500 to-pink-500 hover:from-pink-500 hover:to-yellow-500 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-opacity-75"
              >
                Update
              </button>
            </div>
          </form>
        </div>
      ) : (
        <></>
      )}
      <div>
        {reactCtx.userProfile &&
          reactCtx.userProfile.map((data, index) => {
            // need conditional rendering because initially displayAll is undefined because its empty. When we do displayAll && it will render when it returns true aka when displayAll is not empty aka not undefined, aka its populated
            return (
              <div
                key={index}
                className="ml-4 my-2 mx-3 pl-2 w-1/4 h-1/4 inline-block m-2 p-2 rounded-lg shadow-lg"
              >
                <div>
                  <p className="p-1 capitalize">Name: {data.name}</p>
                </div>
                <div>
                  <p id="email" className="p-1">
                    Email Address: {data.email}
                  </p>
                </div>
                <div>
                  <p className="p-1 capitalize">
                    Profile Type: {data.profileType}
                  </p>
                </div>
                <div>
                  <p className="p-1 capitalize">
                    Address: {data.contact?.address}
                  </p>
                </div>
                <div>
                  <p className="p-1 capitalize">Phone: {data.contact?.phone}</p>
                </div>
                <div>
                  <p className="p-1 capitalize">Role: {data.role}</p>
                </div>
                <div>
                  <button
                    id={data.email}
                    onClick={handleProfileDelete}
                    className="text-center mx-auto block w-50 m-1 px-3 text-white font-semibold button-85"
                  >
                    {/* Delete */}
                    {reactCtx.loginEmail == data.email ? (
                      <Link to="/home">Delete</Link>
                    ) : (
                      "Delete"
                    )}
                  </button>
                </div>
                <div>
                  <button
                    id={index}
                    onClick={handleProfileEdit}
                    className="text-center mx-auto block w-50 m-1 px-3 text-white font-semibold button-85"
                  >
                    Edit
                  </button>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Profile;
