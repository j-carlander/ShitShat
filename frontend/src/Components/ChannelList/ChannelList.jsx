import React, { useState } from "react";
import "./ChannelList.css";

function ChannelList(props) {
  function handleClick(event) {
    const value = event.target.parentNode.dataset.value;
    props.setCurrentChannel(value);
  }

  return (
    <ul className="list-container">
      {props.roomTitles.map((title) => {
        return (
          <li key={title} data-value={title}>
            {title} <button onClick={handleClick}>Join room</button>
          </li>
        );
      })}
    </ul>
  );
}

export default ChannelList;
