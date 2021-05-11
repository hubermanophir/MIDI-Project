import "./App.css";
import Main from "./Components/Main";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Login from "./Components/Login";
import { useState } from "react";

function App() {
  const [device, setDevice] = useState("");
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            <Login device={device} setDevice={setDevice} />
          </Route>
          <Route exact path="/main">
            <Main device={device} />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
