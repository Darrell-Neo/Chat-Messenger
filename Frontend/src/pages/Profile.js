import React, { useContext, useEffect, useState } from "react";
import ReactContext from "../context/react-context";
import { Link } from "react-router-dom";

const Profile = () => {
  const reactCtx = useContext(ReactContext);

  const [profileEdit, setProfileEdit] = useState(false);
  const [userEmailToEdit, setUserEmailToEdit] = useState("");

  const fetchProfileDelete = async (url, profileEmailToDelete) => {
    const bod = JSON.stringify({ email: profileEmailToDelete });

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
      console.log(data);

      if (reactCtx.user.role == "user") {
        window.location.reload();
      }

      if (reactCtx.user.role == "admin") {
        reactCtx.fetchDisplay("http://localhost:5001/users/users");
      }
    } catch (error) {
      console.log(error);
    }
  };

  function handleProfileDelete(event) {
    event.preventDefault();
    fetchProfileDelete("http://localhost:5001/users/user", event.target.id);
  }

  const fetchProfileUpdate = async (url) => {
    const bod = JSON.stringify({
      email: userEmailToEdit,
      newEmail: reactCtx.emailInput,
      newPassword: reactCtx.passwordInput,
      name: reactCtx.nameInput,
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

      if (res.status !== 200) {
        throw new Error("Something went wrong.");
      }

      const data = await res.json();
      alert("profile updated");
      setProfileEdit(false);

      reactCtx.fetchDisplay("http://localhost:5001/users/users");
    } catch (error) {
      console.log(error);
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
  }

  function handleInput(event) {
    event.preventDefault();
    if (event.target.id === "email") reactCtx.setEmailInput(event.target.value);
    if (event.target.id === "password")
      reactCtx.setPasswordInput(event.target.value);
    if (event.target.id === "name") reactCtx.setNameInput(event.target.value);
  }

  function handleUpdate(event) {
    event.preventDefault();
    fetchProfileUpdate("http://localhost:5001/users/user");
  }

  useEffect(() => {
    reactCtx.fetchDisplay("http://localhost:5001/users/users");
  }, [reactCtx.loginState]);

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
                className=""
              ></input>
            </div>
            <div>
              <input
                type="password"
                placeholder="New Password"
                onChange={handleInput}
                id="password"
                value={reactCtx.passwordInput}
                className=""
              ></input>
            </div>
            <div>
              <input
                type="text"
                placeholder="Name"
                onChange={handleInput}
                id="name"
                value={reactCtx.nameInput}
                className=""
              ></input>
            </div>
            <div>
              <button onClick={handleUpdate} className="">
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
            return (
              <div key={index} className="">
                <div>
                  <img
                    src={require(`../images/${data.photo}`)}
                    alt=""
                    className=""
                  />
                </div>
                <div>
                  <p className="">Name: {data.name}</p>
                </div>
                <div>
                  <p id="email" className="">
                    Email: {data.email}
                  </p>
                </div>
                <div>
                  <p className="">Role: {data.role}</p>
                </div>
                <div>
                  <p className="">Friends: {data.friends}</p>
                </div>
                <div>
                  <button
                    id={data.email}
                    onClick={handleProfileDelete}
                    className=""
                  >
                    {reactCtx.loginEmail == data.email ? (
                      <Link to="/">Delete</Link>
                    ) : (
                      "Delete"
                    )}
                  </button>
                </div>
                <div>
                  <button id={index} onClick={handleProfileEdit} className="">
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
