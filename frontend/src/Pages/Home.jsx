import React, { useEffect } from "react";
import "./Styles/Home.css";

async function fetchRoomTitles() {
  const result = await fetch("http://localhost:4500/api/channel");

  return await result.json();
}

const roomTitles = fetchRoomTitles();

export default function Home() {
  return (
    <div className="home-container">
      <section className="home-main">
        <secition>
          <ul>
            {roomTitles.map((title) => {
              return <li>{title.title}</li>;
            })}
          </ul>
        </secition>
      </section>
    </div>
  );
}
