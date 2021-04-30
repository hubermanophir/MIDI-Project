import React from "react";
import Preset from "./Preset";

export default function FavoritePresets({ setFavArray, favArray }) {
  return (
    <div id="favorite-container">
      {favArray[0] &&
        favArray.map((fave, i) => {
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
