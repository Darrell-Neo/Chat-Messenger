import React, { useContext, useEffect, useState, useRef } from "react";
import ReactContext from "../context/react-context";
import ChatOnline from "../components/ChatOnline";
import Conversations from "../components/Conversations";
import Message from "../components/Message";
import "./messenger.css";
import { io } from "socket.io-client";

const Messenger = () => {
  const reactCtx = useContext(ReactContext);

  const [conversations, setConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState(null);
  const [friend, setFriend] = useState(null);
  const [newMessage, setNewMessage] = useState("");
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const scrollRef = useRef();
  const socket = useRef();

  useEffect(() => {
    socket.current = io("ws://localhost:8900");
    socket.current.on("getMessage", (data) => {
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      });
    });
  }, []);

  useEffect(() => {
    arrivalMessage &&
      currentChat?.members.includes(arrivalMessage.sender) &&
      setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage, currentChat]);

  useEffect(() => {
    socket.current.emit("addUser", reactCtx.user.id);
    socket.current.on("getUsers", (user) => {
      console.log(user);
    });
  }, [reactCtx.user]);

  const fetchConversations = async (url) => {
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
      setConversations(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchConversations(
      "http://localhost:5001/conversations/" + reactCtx.user.id
    );
  }, []);

  console.log(currentChat);

  const fetchMessages = async (url) => {
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
      setMessages(data);
    } catch (error) {
      console.log(error);
    }
  };

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
      console.log(data);
      setFriend(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (currentChat) {
      fetchMessages("http://localhost:5001/messages/" + currentChat?._id);
      const friendId = currentChat?.members.find((m) => m !== reactCtx.user.id);
      console.log(friendId);
      getFriend("http://localhost:5001/users/finduser?userId=" + friendId);
    }
  }, [currentChat]);

  console.log(messages);

  function handleSubmit(event) {
    event.preventDefault();
    submitNewMessage("http://localhost:5001/messages");

    const receiverId = currentChat.members.find(
      (member) => member !== reactCtx.user.id
    );

    socket.current.emit("sendMessage", {
      senderId: reactCtx.user.id,
      receiverId,
      text: newMessage,
    });
  }

  const submitNewMessage = async (url) => {
    const bod = JSON.stringify({
      sender: reactCtx.user.id,
      text: newMessage,
      conversationId: currentChat._id,
    });

    const options = {
      method: "POST",
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
      console.log(data);
      setMessages([...messages, data]);
      setNewMessage("");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <>
      <div className="messenger">
        <div className="chatMenu">
          <div className="chatMenuWrapper">
            <input className="chatMenuInput" placeholder="Search for friends" />
            {conversations.map((convo) => (
              <div onClick={() => setCurrentChat(convo)}>
                <Conversations
                  conversation={convo}
                  currentUser={reactCtx.user.id}
                />
              </div>
            ))}
          </div>
        </div>
        <div className="chatBox">
          <div className="chatBoxWrapper">
            {currentChat && messages && friend ? (
              <>
                <div className="chatBoxTop">
                  {messages.map((message) => (
                    <div ref={scrollRef}>
                      <Message
                        message={message}
                        own={message.sender === reactCtx.user.id}
                        friendPhoto={friend[0].photo}
                      />
                    </div>
                  ))}
                </div>
                <div className="chatBoxBottom">
                  <textarea
                    className="chatMessageInput"
                    placeholder="Write something..."
                    onChange={(e) => setNewMessage(e.target.value)}
                    value={newMessage}
                  ></textarea>
                  <button className="chatSubmitButton" onClick={handleSubmit}>
                    Send
                  </button>
                </div>
              </>
            ) : (
              <span className="noConversationText">
                Open a conversation to see messages
              </span>
            )}
          </div>
        </div>
        <div className="chatOnline">
          <div className="chatOnlineWrapper">
            <ChatOnline />
          </div>
        </div>
      </div>
    </>
  );
};

export default Messenger;
