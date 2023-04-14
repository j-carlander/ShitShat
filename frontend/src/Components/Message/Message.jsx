import React from "react";
import "./Message.css";

function Message(props) {
  return (
    <div className="msg">
      <p className="msg-header">
        <span className="msg-author">{props.msg.author}</span>
        <span className="msg-recieved">{props.msg.recieved}</span>
      </p>
      <p>{props.msg.msg}</p>
    </div>
  );
}

export default Message;
