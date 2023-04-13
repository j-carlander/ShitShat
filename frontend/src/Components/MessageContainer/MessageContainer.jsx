import React from "react";
import "./MessageContainer.css";
import Message from "../Message/Message";

function MessageContainer(props) {
  async function handleSendMsg(event) {
    const value = event.target.previousElementSibling.value;

    // const headersList = {
    //   authorization: "Bearer " + jwtToken,
    // }

    await fetch("http://localhost:4500/api/" + props.currentChannel, {
      method: "POST",
      body: JSON.stringify({ msg: value }),
    });
  }

  return (
    <div className="message-container">
      <h2>
        {props.currentChannel
          .replace("channel/", "")
          .slice(0, 1)
          .toUpperCase() +
          props.currentChannel
            .replace("channel/", "")
            .slice(1)
            .replaceAll("_", " ")}
      </h2>
      <div className="message-list">
        <Message currentMsgs={props.currentMsgs} />
      </div>
      {props.authenticated && props.currentChannel != "broadcast" && (
        <form className="send-msg-form">
          <input
            className="msg-input"
            type="text"
            name="msg"
            placeholder="Skriv ett meddelande"
          />
          <button
            className="send-msg-btn"
            type="submit"
            onClick={handleSendMsg}>
            Skicka
          </button>
        </form>
      )}
    </div>
  );
}

export default MessageContainer;
