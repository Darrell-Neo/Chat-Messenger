import React from "react";
import "./chatOnline.css";

const ChatOnline = () => {
  return (
    <div className="chatOnline">
      <div className="chatOnlineFriend">
        <div className="chatOnlineImgContainer">
          <img
            className="chatOnlineImg"
            src="https://m.media-amazon.com/images/M/MV5BOTBhMTI1NDQtYmU4Mi00MjYyLTk5MjEtZjllMDkxOWY3ZGRhXkEyXkFqcGdeQXVyNzI1NzMxNzM@._V1_UY1200_CR92,0,630,1200_AL_.jpg"
            alt=""
          ></img>
          <div className="chatOnlineBadge"></div>
        </div>
        <span className="chatOnlineName">Johnny Depp</span>
      </div>
      <div className="chatOnlineFriend">
        <div className="chatOnlineImgContainer">
          <img
            className="chatOnlineImg"
            src="https://m.media-amazon.com/images/M/MV5BOTBhMTI1NDQtYmU4Mi00MjYyLTk5MjEtZjllMDkxOWY3ZGRhXkEyXkFqcGdeQXVyNzI1NzMxNzM@._V1_UY1200_CR92,0,630,1200_AL_.jpg"
            alt=""
          ></img>
          <div className="chatOnlineBadge"></div>
        </div>
        <span className="chatOnlineName">Johnny Depp</span>
      </div>
      <div className="chatOnlineFriend">
        <div className="chatOnlineImgContainer">
          <img
            className="chatOnlineImg"
            src="https://m.media-amazon.com/images/M/MV5BOTBhMTI1NDQtYmU4Mi00MjYyLTk5MjEtZjllMDkxOWY3ZGRhXkEyXkFqcGdeQXVyNzI1NzMxNzM@._V1_UY1200_CR92,0,630,1200_AL_.jpg"
            alt=""
          ></img>
          <div className="chatOnlineBadge"></div>
        </div>
        <span className="chatOnlineName">Johnny Depp</span>
      </div>
    </div>
  );
};

export default ChatOnline;
