import React from "react";
import "./Message.css";

function Message(props) {
  return (
    <>
      {props.currentMsgs.map((msg) => {
        return (
          <div key={msg._id}>
            <div className="msg">
              <p className="msg-header">
                <span className="msg-author">{msg.author}</span>
                <span className="msg-recieved">{msg.recieved}</span>
              </p>
              <p>{msg.msg}</p>
            </div>
          </div>
        );
      })}
    </>
  );
}

export default Message;
