import React from "react";
import { EditText, EditTextarea } from "react-edit-text";

export default function Preset({ id, name, number, presetNumber, scene }) {
  return (
    <div className="preset" id={id}>
      <h3>{number}</h3>
      <div className="name">{name}</div>
      <div>
        <span>Preset Number: </span>
        <span>{presetNumber}</span>
      </div>
      <div>
        <span>Scene: </span>
        <span>{scene}</span>
      </div>
      <EditText value="ophir" />
    </div>
  );
}
