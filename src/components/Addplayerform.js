import React, { useState } from "react";

export default function AddPlayerForm(props) {
  const [name, set_name] = useState("");

  const sendPlayer = (event) => {
    event.preventDefault(); // prevents page from reloading
    props.addPlayer(name); // call prop function as a callback down from the scoreboard.
    set_name(""); // empty the name
  };

  return (
    <div>
      <p>
        New player:{" "}
        <input
          type="text"
          placeholder="Name"
          value={name} // dubbel check! resetting won't work
          onChange={(event) => {
            set_name(event.target.value); // set the state to what the user puts in, which name.
          }}
        />{" "}
        <button onClick={sendPlayer}>Add</button>
      </p>
    </div>
  );
}
