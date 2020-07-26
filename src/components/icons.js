import React from 'react';
import './icons.css'
function icons() {
  return (
    <div className="Icons">
      <div id="title">IPod</div>
      <div id="coverflow">Coverflow</div>
      <div id="music" className='selected'>Music </div>
      <div id="games">Games</div>
      <div id="settings">Settings</div>
    </div>
  );
}

export default icons;