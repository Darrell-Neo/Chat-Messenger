import React, { useContext } from "react";
import "./message.css";
import { format } from "timeago.js";
import ReactContext from "../context/react-context";

const Message = ({ message, own, friendPhoto }) => {
  const reactCtx = useContext(ReactContext);

  return (
    <div className={own ? "message own" : "message"}>
      <div className="messageTop">
        <img
          className="messageImg"
          src={
            own
              ? require(`../images/${reactCtx.user.photo}`)
              : require(`../images/${friendPhoto}`)
          }
          alt=""
        ></img>
        <p className="messageText">{message.text}</p>
      </div>
      <div className="messageBottom">{format(message.createdAt)}</div>
    </div>
  );
};

export default Message;
