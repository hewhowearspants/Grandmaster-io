import React from "react";

export const BattleField = ({
  round,
  winner,
  userNameData,
  joined,
  userHp,
  oppoNameData,
  oppoHp,
  oppoSelection,
  gameOver,
  userSelection,
  confirmed,
  rematch,
  leaveGame,
  confirmSelection,
  readyToContinue
}) => (
  <div className="battlefield">
    <div className="battle-log">
      <div
        className="round-count"
        style={{ visibility: round || winner ? "visible" : "hidden" }}
      >
        <h2>{!winner ? `Round: ${round}` : `${winner} Won!`}</h2>
      </div>
      <div className="hp">
        <b>{userNameData ? `${userNameData} HP: ${userHp}` : ""}</b>
        <b>{oppoNameData ? `${oppoNameData} HP: ${oppoHp}` : ""}</b>
      </div>
      <div className="battlefield-buttons">
        {userSelection && oppoSelection && confirmed && !gameOver ? (
          <button
            onClick={() => readyToContinue()}
            style={{
              visibility:
                userSelection && oppoSelection && confirmed
                  ? "visible"
                  : "hidden"
            }}
          >
            Continue!
          </button>
        ) : null}
        {gameOver && joined ? (
          <div className="game-over-buttons">
            <button onClick={rematch}>Rematch?</button>
            <button onClick={leaveGame}>Bow Out</button>
          </div>
        ) : null}
      </div>
    </div>
    <div className="card-selected">
      <div className="user-selection">
        {userSelection ? (
          <div className={`card ${userSelection.class} battlefield_select`}>
            <div className="card-top">
              <div className="card-name">
                <b>{userSelection.name}</b>
                <p>{userSelection.class}</p>
              </div>
            </div>
            {joined ? (
              confirmed ? null : (
                <button onClick={confirmSelection}>Confirm</button>
              )
            ) : null}
            <div className="card-numbers">
              <p>
                ATT: <span>{userSelection.attack}</span>
              </p>
              <p>
                DEF: <span>{userSelection.defense}</span>
              </p>
            </div>
          </div>
        ) : null}
      </div>
      <div className="oppo-selection">
        {oppoSelection ? (
          <div className={`card ${oppoSelection.class} battlefield_select`}>
            <div className="card-top">
              <div className="card-name">
                <b>{oppoSelection.name}</b>
                <p>{oppoSelection.class}</p>
              </div>
            </div>
            <div className="card-numbers">
              <p>
                ATT: <span>{oppoSelection.attack}</span>
              </p>
              <p>
                DEF: <span>{oppoSelection.defense}</span>
              </p>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  </div>
);
