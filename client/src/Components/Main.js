import React, { useEffect, useState } from "react";
import axios from "axios";
import FavoritePresets from "./FavoritePresets";

export default function Main() {
  const [preset, setPreset] = useState();
  const [scene, setScene] = useState();
  const [name, setName] = useState();
  const [bindKey, setBindKey] = useState();
  const [favArray, setFavArray] = useState([]);

  useEffect(() => {
    (async () => {
      const res = await axios.get("http://localhost:8080/presets");
      setFavArray(res.data);
    })();
    document.addEventListener("keypress", async (e) => {
      const elem = document.getElementById(`preset ${e.key}`);
      if (elem) {
        let presetNum = Number(elem.childNodes[2].childNodes[1].innerText);
        let scene = Number(elem.childNodes[3].childNodes[1].innerText);
        const obj = {
          presetNumber: presetNum,
          scene: scene,
        };
        try {
          await axios.post("http://localhost:8080/change", obj);
        } catch (err) {
          console.log(err.message);
        }
      }
    });
  }, []);

  const removeQuotes = (str) => {
    return str.replace(/\"/g, "");
  };

  const onClickHandler = async () => {
    const obj = {
      name: name,
      number: Number(bindKey),
      presetNumber: Number(preset),
      scene: Number(scene),
    };
    try {
      await axios.post("http://localhost:8080/preset", obj);
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

      <button onClick={onClickHandler}>Add preset</button>
      <FavoritePresets setFavArray={setFavArray} favArray={favArray} />
    </div>
  );
}
