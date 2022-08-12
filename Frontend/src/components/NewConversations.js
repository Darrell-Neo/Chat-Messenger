import React, { useContext, useEffect, useState } from "react";
import ReactContext from "../context/react-context";
import "./newConversations.css";

const NewConversations = ({ friendId }) => {
  const reactCtx = useContext(ReactContext);

  const [friend, setFriend] = useState(null);

  const getFriend = async (url) => {
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
      setFriend(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getFriend("http://localhost:5001/users/finduser?userId=" + friendId);
  }, []);

  return (
    <div className="newConversations">
      <img
        className="newConversationsImg"
        src={
          friend
            ? require(`../images/${friend[0].photo}`)
            : require("../images/default_profile.jpg")
        }
        alt=""
      ></img>
      <span className="newConversationsName">
        {friend ? friend[0].name : "Loading..."}
      </span>
    </div>
  );
};

export default NewConversations;
