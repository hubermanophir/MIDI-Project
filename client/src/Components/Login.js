import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import ControlledOpenSelect from "./ControlledOpenSelect";

export default function Login({ device, setDevice }) {
  const [midiDevices, setMidiDevices] = useState(null);

  useEffect(() => {
    (async () => {
      const res = await axios.get("/api/outputs");
      setMidiDevices(res.data);
    })();
  }, []);

  return (
    <div>
      <h1>Welcome</h1>
      <h2>Please choose your axe fx 2 MIDI output</h2>
      <ControlledOpenSelect
        midiDevices={midiDevices}
        setDevice={setDevice}
        device={device}
      />
      <Link to="/main">
        <button>confirm</button>
      </Link>
    </div>
  );
}
