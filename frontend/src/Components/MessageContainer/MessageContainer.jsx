import React, { useRef, useEffect, useState } from "react";
import "./MessageContainer.css";
import Message from "../Message/Message";

function MessageContainer(props) {
  const msgRef = useRef();

  const [msg, setMsg] = useState("");

  useEffect(() => {
    if (props.currentChannel != "broadcast") msgRef.current.focus();
  }, []);

  async function handleSendMsg(event) {
    event.preventDefault();
    let headersList = {
      Accept: "*/*",
      Authorization: "Bearer " + sessionStorage.getItem("AUTH_TOKEN"),
      "Content-Type": "application/json",
    };

    let bodyContent = JSON.stringify({
      msg: msg,
    });

    let response = await fetch(
      "http://localhost:4500/api/" + props.currentChannel,
      {
        method: "POST",
        body: bodyContent,
        headers: headersList,
      }
    );
    setMsg("");
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
        {props.currentMsgs.map((msg) => {
          return (
            <div key={msg._id}>
              <Message msg={msg} />
            </div>
          );
        })}
      </div>
      {props.currentChannel == "broadcast" ? (
        <form className="send-msg-form">
          <input
            className="msg-input"
            type="text"
            name="msg"
            placeholder="Skriv ett meddelande"
            disabled
          />
          <button className="send-msg-btn" type="submit" disabled>
            Skicka
          </button>
        </form>
      ) : (
        <form className="send-msg-form" onSubmit={handleSendMsg}>
          <input
            className="msg-input"
            type="text"
            onChange={(e) => setMsg(e.target.value)}
            placeholder="Skriv ett meddelande"
            ref={msgRef}
          />
          <button className="send-msg-btn" type="submit">
            Skicka
          </button>
        </form>
      )}
    </div>
  );
}

export default MessageContainer;
