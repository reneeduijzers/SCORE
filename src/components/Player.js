import React from "react";

export default function Player(props) {
  const onClickIncrement = () => {
    // call the prop function as a callback down from the scoreboard.
    props.incrementScore(props.id); //id also works?
  };

  const onClickRandomize = () => {
    // call prop function as a callback down from the scoreboard.
    props.randomizeScore(props.id); //id also works?
  };

  return (
    <li className="Player">
      <p>
        ID {props.id}: {props.name} (score= {props.score})
        <button onClick={onClickIncrement}>increment score </button>
        <button onClick={onClickRandomize}>randomize score </button>
      </p>
    </li>
  );
}
