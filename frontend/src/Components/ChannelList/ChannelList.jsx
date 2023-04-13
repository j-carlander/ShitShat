import React, { useEffect, useState } from "react";
import "./ChannelList.css";
import { fetchData } from "../DataFetcher/DataFetcher";

function ChannelList(props) {
  const [channelList, setChannelList] = useState([]);

  useEffect(() => {
    fetchData("channel", setChannelList);
  }, []);

  function enterChannel(event) {
    const value = event.target.parentNode.dataset.value;
    props.setCurrentChannel("channel/" + value);
  }

  return (
    <ul className="list-container">
      {channelList.map((channel) => {
        return (
          <li
            key={channel._id}
            data-value={channel.title}
            data-id={channel._id}>
            {channel.title.slice(0, 1).toUpperCase() +
              channel.title.slice(1).replaceAll("_", " ")}
            <button onClick={enterChannel}>Join channel</button>
          </li>
        );
      })}
    </ul>
  );
}

export default ChannelList;
