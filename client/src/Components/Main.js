import React, { useState } from "react";
import axios from "axios";
import FavoritePresets from "./FavoritePresets";

export default function Main() {
  const [preset, setPreset] = useState();
  const [scene, setScene] = useState();
  const [name, setName] = useState();
  const [bindKey, setBindKey] = useState();

  const onClickHandler = async () => {
    const obj = {
      presetNumber: Number(preset),
      scene: Number(scene),
    };
    try {
      await axios.post("http://localhost:8080/change", obj);
    } catch (err) {
      console.log(err.message);
    }
  };

  const nameHandler = (value) => {
    setName(value);
  };

  const numberHandler = (value) => {
    setBindKey(value);
  };

  const presetHandler = (value) => {
    setPreset(value);
  };
  const sceneHandler = (value) => {
    setScene(value);
  };

  return (
    <div>
      <h1>My axe fx 2 MIDI Controller</h1>
      <input
        placeholder="preset name"
        onChange={(e) => nameHandler(e.target.value)}
        type="text"
      />
      <input
        placeholder="number"
        onChange={(e) => numberHandler(e.target.value)}
        type="text"
      />
      <input
        placeholder="preset number"
        onChange={(e) => presetHandler(e.target.value)}
        type="text"
      />
      <input
        placeholder="scene"
        onChange={(e) => sceneHandler(e.target.value)}
        type="text"
      />

      <button onClick={onClickHandler}>Click to change preset</button>
      <FavoritePresets />
    </div>
  );
}
