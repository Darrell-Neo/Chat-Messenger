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
      console.log(data);
      setUser(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const friendId = conversation.members.find(
      (m) => m !== "62f2c34905197ebd2d1d230d"
    );
    console.log(friendId);

    getUser("http://localhost:5001/users/finduser?userId=" + friendId);
    // eslint-disable-next-line
  }, []);

  return (
    <div className="conversations">
      <img
        className="conversationsImg"
        src="https://m.media-amazon.com/images/M/MV5BOTBhMTI1NDQtYmU4Mi00MjYyLTk5MjEtZjllMDkxOWY3ZGRhXkEyXkFqcGdeQXVyNzI1NzMxNzM@._V1_UY1200_CR92,0,630,1200_AL_.jpg"
        alt=""
      ></img>
      <span className="conversationsName">{user ? user[0].name : "Johnny Depp"}</span>
    </div>
  );
};

export default Conversations;
