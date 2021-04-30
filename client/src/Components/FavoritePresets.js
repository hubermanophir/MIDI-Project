import React, { useEffect } from "react";
import axios from "axios";

export default function FavoritePresets() {
  useEffect(() => {
    (async () => {
      const res = await axios.get("http://localhost:8080/presets");
      console.log(res.data);
    })();
  }, []);
  return <div> </div>;
}
