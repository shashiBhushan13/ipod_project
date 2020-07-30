import React from "react";
import "../css/switch.css";
//component to deal with ON/OFF switch
function Switch(props) {
  return (
    <label className="switch">
      <input id="check" type="checkbox"></input>
      <span className="slider round"></span>
      <span className="caption">Power</span>
    </label>
  );
}

export default Switch;