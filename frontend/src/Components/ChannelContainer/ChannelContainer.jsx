import React from "react";
import "./ChannelContainer.css";
import ChannelList from "../ChannelList/ChannelList";

function ChannelContainer(props) {
  return (
    <div className="channel-container">
      <button
        onClick={() => {
          props.setCurrentChannel("broadcast");
        }}>
        Broadcast
      </button>
      {props.authenticated && (
        <ChannelList setCurrentChannel={props.setCurrentChannel} />
      )}
    </div>
  );
}

export default ChannelContainer;
