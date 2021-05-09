import React, { useEffect, useState } from "react";
import axios from "axios";
import FavoritePresets from "./FavoritePresets";

export default function Main() {
  const [preset, setPreset] = useState();
  const [scene, setScene] = useState();
  const [name, setName] = useState();
  const [bindKey, setBindKey] = useState();
  const [favArray, setFavArray] = useState([]);
  const [isPreset, setIsPreset] = useState(true);

  async function presetFunc(e) {
    if (e.which >= 48 && e.which <= 57) {
      const elem = document.getElementById(`preset ${e.key}`);
      const marked = document.querySelector(".marked");
      if (marked) {
        marked.classList.remove("marked");
      }
      if (elem) {
        elem.classList.add("marked");
        let presetNum = Number(elem.childNodes[2].childNodes[1].innerText);
        let scene = Number(elem.childNodes[3].childNodes[1].innerText);
        const obj = {
          presetNumber: presetNum,
          scene: scene,
        };
        try {
          await axios.post("/change", obj);
        } catch (err) {
          console.log(err.message);
        }
      }
    } else {
      switch (e.key) {
        case "z":
          await axios.post("/scene", { scene: 1 });
          break;
        case "x":
          await axios.post("/scene", { scene: 2 });
          break;
        case "c":
          await axios.post("/scene", { scene: 3 });
          break;
        case "v":
          await axios.post("/scene", { scene: 4 });
          break;
        case "b":
          await axios.post("/scene", { scene: 5 });
          break;
        case "n":
          await axios.post("/scene", { scene: 6 });
          break;
        case "m":
          await axios.post("/scene", { scene: 7 });
          break;
        case ",":
          await axios.post("/scene", { scene: 8 });
          break;
      }
    }
  }

  // async function sceneFunc(e) {
  //   if (e.which >= 48 && e.which <= 57) {
  //     const sceneNumber = e.key;
  //     const obj = {
  //       scene: sceneNumber,
  //     };
  //     try {
  //       await axios.post("/scene", obj);
  //     } catch (err) {
  //       console.log(err.message);
  //     }
  //   }
  // }

  useEffect(() => {
    (async () => {
      const res = await axios.get("/presets");
      setFavArray(res.data);
    })();
    document.addEventListener("keypress", presetFunc);
  }, []);

  const onClickHandler = async () => {
    const obj = {
      name: name,
      number: Number(bindKey),
      presetNumber: Number(preset),
      scene: Number(scene),
    };
    try {
      await axios.post("/preset", obj);
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
      <div id="input-container">
        <input
          className="input"
          placeholder="preset name"
          onChange={(e) => nameHandler(e.target.value)}
          type="text"
        />
        <input
          className="input"
          placeholder="number"
          onChange={(e) => numberHandler(e.target.value)}
          type="text"
        />
        <input
          className="input"
          placeholder="preset number"
          onChange={(e) => presetHandler(e.target.value)}
          type="text"
        />
        <input
          className="input"
          placeholder="scene"
          onChange={(e) => sceneHandler(e.target.value)}
          type="text"
        />

        <button onClick={onClickHandler}>Add preset</button>
      </div>
      <FavoritePresets setFavArray={setFavArray} favArray={favArray} />
    </div>
  );
}
