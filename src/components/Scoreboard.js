import React, { useState } from "react";
import Player from "./Player";
import AddPlayerForm from "./Addplayerform";

export default function Scoreboard() {
  // LIFTING THE STATE HERE:
  // The parent component decides the state of the child component.
  const [players, set_players] = useState([
    { id: 1, name: "Violeta", score: 11 },
    { id: 2, name: "Eszter", score: 14 },
    { id: 3, name: "Jeroen v2", score: 4 },
    { id: 4, name: "Lisa", score: 42 },
  ]);

  const [sort_by, set_sort_by] = useState("score"); // either "score" or "name"

  function compare_score(player_a, player_b) {
    return player_b.score - player_a.score;
  }
  // compare numbers

  function compare_name(player_a, player_b) {
    return player_a.name.localeCompare(player_b.name);
  }
  // compare names

  const sortFunction = sort_by === "score" ? compare_score : compare_name; // which specific function to use (name or score)

  const players_sorted = [...players].sort(sortFunction); //general sort function

  const change_sorting = (event) => {
    set_sort_by(event.target.value);
  }; // event handler: state determined by the user selecting sort by name/sort by score

  const incrementScore = (id) => {
    const new_players_array = players.map((player) => {
      // decide whether this player's score needs to be incremented
      if (player.id === id) {
        // and if so, create a new player object,
        return {
          // but first copying over the player object's data
          ...player,
          // and then overriding the score property to be incremented
          score: player.score + 1,
        };
      } else {
        // else, just keep them
        return player;
      }
    });
    // change the state
    set_players(new_players_array);
  };

  const randomizeScore = (id) => {
    const new_players_array = players.map((player) => {
      // decide whether this player's score needs to be incremented
      if (player.id === id) {
        // and if so, create a new player object,
        return {
          // but first copying over the player object's data
          ...player,
          // and then overriding the score property to be incremented
          score: Math.floor(Math.random(player.score) * 100) + 1,
        };
      } else {
        // else, just keep them
        return player;
      }
    });
    // change the state
    set_players(new_players_array);
  };

  const addPlayer = (name) => {
    // creating a new player with a new name from the form of the child component
    const newPlayer = { name: name, score: 0, id: players.length + 1 };
    // copying the existing array and add the new player
    const newPlayers = [...players, newPlayer];
    // change the state
    set_players(newPlayers);
  };

  const reset = (id) => {
    const new_players_array = players.map((player) => {
      return {
        // but first copying over the player object's data
        ...player,
        // and then overriding the score property to be incremented
        score: 0,
      };
    });
    // change the state
    set_players(new_players_array);
  };

  return (
    <div className="Scoreboard">
      <h1>SCOREBOARD</h1>
      <AddPlayerForm
        addPlayer={addPlayer} // passing of function as a prop.
      />
      <p>
        Sort order:{" "}
        <select onChange={change_sorting}>
          <option value="score">Sort by score</option>
          <option value="name">Sort by name</option>
        </select>
      </p>
      <ul>
        {players_sorted.map((player) => (
          <Player
            id={player.id}
            name={player.name}
            score={player.score}
            incrementScore={incrementScore} // passing of function as a prop.
            randomizeScore={randomizeScore} // passing of function as a prop.
          />
        ))}
      </ul>
      <button onClick={reset}>reset</button>
    </div>
  );
}
