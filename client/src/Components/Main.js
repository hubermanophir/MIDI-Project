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
          await axios.post("http://localhost:8080/change", obj);
        } catch (err) {
          console.log(err.message);
        }
      }
    }
  }

  async function sceneFunc(e) {
    if (e.which >= 48 && e.which <= 57) {
      const sceneNumber = e.key;
      const obj = {
        scene: sceneNumber,
      };
      try {
        await axios.post("http://localhost:8080/scene", obj);
      } catch (err) {
        console.log(err.message);
      }
    }
  }

  function spaceClick(e) {
    if (e.which === 32) {
      setIsPreset((prev) => !prev);
    }
  }

  useEffect(() => {
    (async () => {
      const res = await axios.get("http://localhost:8080/presets");
      setFavArray(res.data);
    })();
    document.addEventListener("keypress", presetFunc);
    document.addEventListener("keypress", spaceClick);
    // document.removeEventListener("keypress", presetFunc);
  }, []);

  // useEffect(() => {
  //   console.log("switch");
  //   if (isPreset) {
  //     document.removeEventListener("keypress", presetFunc);
  //     document.addEventListener("keypress", presetFunc);

  //     // console.log(isPreset);
  //     // document.removeEventListener("keypress", sceneFunc);
  //   } else {
  //     // console.log(isPreset);
  //     // document.addEventListener("keypress", sceneFunc);
  //   }
  // }, [isPreset]);

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
      {isPreset ? <div>space bar is on</div> : <div>space bar is off</div>}
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
