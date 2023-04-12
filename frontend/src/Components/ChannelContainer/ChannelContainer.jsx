import React from "react";
import "./ChannelContainer.css";
import ChannelList from "../ChannelList/ChannelList";

function ChannelContainer(props) {
  return (
    <div className="room-container">
      <button
        onClick={() => {
          props.setCurrentChannel("broadcast");
        }}>
        Broadcast
      </button>
      {props.authenticated && (
        <ChannelList
          roomTitles={["hej", "då", "Johannes rum"]}
          setCurrentChannel={props.setCurrentChannel}
        />
      )}
    </div>
  );
}

export default ChannelContainer;
