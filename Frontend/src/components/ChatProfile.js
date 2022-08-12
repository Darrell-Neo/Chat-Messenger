import React from "react";
import "./chatProfile.css";

const ChatProfile = ({ friend }) => {
  return (
    <div className="chatProfile">
      <div className="chatProfileFriend">
        <div className="chatProfileImgContainer">
          <img
            className="chatProfileImg"
            src={
              friend
                ? require(`../images/${friend.photo}`)
                : require("../images/default_profile.jpg")
            }
            alt=""
          ></img>
        </div>
        <span className="chatProfileName">{friend?.name}</span>
        <span className="chatProfileLastLogin">Active 10m ago</span>
      </div>
    </div>
  );
};

export default ChatProfile;
