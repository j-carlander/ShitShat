import React, { useEffect, useState } from "react";
import "./App.css";
import PageHeader from "./Components/PageHeader/PageHeader";
import PageFooter from "./Components/PageFooter/PageFooter";
import ChannelContainer from "./Components/ChannelContainer/ChannelContainer";
import MessageContainer from "./Components/MessageContainer/MessageContainer";
import { fetchData } from "./Components/DataFetcher/DataFetcher";
import { LoginForm } from "./Components/LoginForm/LoginForm";

const socket = io("ws://127.0.0.1:3000", { cors: { orgin: "*" } });

function App() {
  const [authenticated, setAuthenticated] = useState(false);
  const [userDetails, setUserDetails] = useState({});
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [currentChannel, setCurrentChannel] = useState("broadcast");
  const [currentMsgs, setCurrentMsgs] = useState([]);

  useEffect(() => {
    // no-op if the socket is already connected
    socket.connect();

    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    fetchData(currentChannel, setCurrentMsgs);

    function onSocketEvent(msg) {
      console.log("from socket: ", msg);
      setCurrentMsgs((currentMsgs) => [...currentMsgs, msg]);
    }

    socket.on(currentChannel.replace("channel/", ""), onSocketEvent);

    return () => {
      socket.off(currentChannel.replace("channel/", ""), onSocketEvent);
    };
  }, [currentChannel]);

  // useEffect(() => {
  //   const loggedInUser = sessionStorage.getItem("AUTH_TOKEN");
  //   if (loggedInUser) {
  //     setAuthenticated(loggedInUser);
  //   }
  // }, []);

  // useEffect(() => {

  // }, [currentChannel]);

  return (
    <div>
      <PageHeader
        authenticated={authenticated}
        setShowLoginForm={setShowLoginForm}
      />
      <div className="flex-wrapper">
        <ChannelContainer
          authenticated={authenticated}
          setCurrentChannel={setCurrentChannel}
        />
        <MessageContainer
          authenticated={authenticated}
          currentChannel={currentChannel}
          currentMsgs={currentMsgs}
        />
      </div>
      <PageFooter />
      {showLoginForm && (
        <LoginForm
          setUserDetails={setUserDetails}
          setAuthenticated={setAuthenticated}
          setShowLoginForm={setShowLoginForm}
        />
      )}
    </div>
  );
}

export default App;
