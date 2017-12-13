import React from "react";

// displays all users by how many wins they have
export const Leaderboard = ({ leaderInfo }) => (
  <div className="leader-board">
    <h3>Leaderboard</h3>
    {leaderInfo &&
      leaderInfo.map(data => (
        <div className="leader-single" key={data.id}>
          <h4>{leaderInfo.indexOf(data) + 1}</h4>
          <div className="leader-start">
            <b>
              {data.username} <span>({data.display_name})</span>
            </b>
            <div
              className="inside-leaderboard"
              style={{
                width: (data.wins + 1) * 2 + "vw",
                background: `rgba(${data.wins * 20},${Math.round(
                  Math.random() * 0
                )},${Math.round(Math.random() * 0)},1)`,
                animation: "scoregrow 1s linear"
              }}
            >
              <p style={{ color: "white" }}>Wins: {data.wins}</p>
            </div>
          </div>
        </div>
      ))}
  </div>
);
