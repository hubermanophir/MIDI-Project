import React, { useEffect } from "react";
import axios from "axios";
import Preset from "./Preset";

export default function FavoritePresets({ setFavArray, favArray }) {
//   useEffect(() => {

//   }, []);
  return (
    <div>
      {favArray[0] &&
        favArray.map((fave, i) => {
          console.log(fave);
          return (
            <Preset
              key={i}
              id={`preset ${i}`}
              name={fave.name}
              number={fave.number}
              presetNumber={fave.presetNumber}
              scene={fave.scene}
            />
          );
        })}
    </div>
  );
}
