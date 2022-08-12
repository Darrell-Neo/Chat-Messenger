import React, { useContext, useEffect, useState } from "react";
import ReactContext from "../context/react-context";
import "./conversations.css";

const Conversations = ({ conversation, currentUser }) => {
  const reactCtx = useContext(ReactContext);

  const [user, setUser] = useState(null);

  const getUser = async (url) => {
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: "Bearer " + reactCtx.access,
      },
    };

    try {
      const res = await fetch(url, options);
      if (res.status !== 200) {
        throw new Error("Something went wrong.");
      }
      const data = await res.json();
      // console.log(data);
      setUser(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const friendId = conversation.members.find((m) => m !== currentUser);
    // console.log(friendId);

    getUser("http://localhost:5001/users/finduser?userId=" + friendId);
  }, []);

  return (
    <div className="conversations">
      <img
        className="conversationsImg"
        src={
          user
            ? require(`../images/${user[0].photo}`)
            : require("../images/default_profile.jpg")
        }
        alt=""
      ></img>
      <span className="conversationsName">
        {user ? user[0].name : "Loading..."}
      </span>
    </div>
  );
};

export default Conversations;
