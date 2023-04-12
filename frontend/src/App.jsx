import React, { useEffect, useState } from "react";
import "./App.css";
import PageHeader from "./Components/PageHeader/PageHeader";
import PageFooter from "./Components/PageFooter/PageFooter";
import ChannelContainer from "./Components/ChannelContainer/ChannelContainer";
import MessageContainer from "./Components/MessageContainer/MessageContainer";

function App() {
  const [authenticated, setAuthenticated] = useState(true);
  const [currentChannel, setCurrentChannel] = useState("broadcast");

  useEffect(() => {
    const loggedInUser = localStorage.getItem("authenticated");
    if (loggedInUser) {
      setAuthenticated(loggedInUser);
    }
  }, []);

  return (
    <div>
      <PageHeader authenticated={authenticated} />
      <ChannelContainer
        authenticated={authenticated}
        setCurrentChannel={setCurrentChannel}
      />
      <MessageContainer currentChannel={currentChannel} />
      <PageFooter />
    </div>
  );
}

export default App;
