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
                : "https://m.media-amazon.com/images/M/MV5BOTBhMTI1NDQtYmU4Mi00MjYyLTk5MjEtZjllMDkxOWY3ZGRhXkEyXkFqcGdeQXVyNzI1NzMxNzM@._V1_UY1200_CR92,0,630,1200_AL_.jpg"
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
