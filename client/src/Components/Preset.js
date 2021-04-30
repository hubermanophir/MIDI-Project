import React from "react";

export default function Preset({ id, name, number, presetNumber, scene }) {
  return (
    <div id={id}>
      <div>Name: {name}</div>
      <div>Keyboard Number: {number}</div>
      <div>
        <span>Preset Number: </span>
        <span>{presetNumber}</span>{" "}
      </div>
      <div>
        <span>Scene: </span>
        <span>{scene}</span>
      </div>
    </div>
  );
}
