import React from "react";
import "./MessageContainer.css";
import Message from "../Message/Message";

function MessageContainer(props) {
  function handleSendMsg() {}

  return (
    <div className="message-container">
      <h2>{props.currentChannel}</h2>
      <div className="message-list">{props.currentChannel && <Message />}</div>
      {props.authenticated && props.currentChannel != "broadcast" && (
        <div>
          <input placeholder="Skriv ett meddelande" />
          <button onClick={handleSendMsg}>Skicka</button>
        </div>
      )}
    </div>
  );
}

export default MessageContainer;
