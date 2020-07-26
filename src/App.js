import React, { Component } from "react";
import Screen from "./components/screen";
import Keypad from "./components/keypad";
import Music from "./components/music";
import Settings from "./components/settings";
import Games from "./components/games";
import CoverFlow from "./components/coverflow";
import ZingTouch from "zingtouch";
import "./App.css";

class App extends Component {
  state = {
    showMenu: true,
    showGames: false,
    showMusic: false,
    showSettings: false,
    showCoverflow: false,
  };
  componentDidMount() {
    if (this.state.showMenu) {
      this.rotate();
    }
  }

  toggleClockwise = async () => {
    var music = await document.getElementById("music");
    var games = await document.getElementById("games");
    var settings = await document.getElementById("settings");
    var coverflow = await document.getElementById("coverflow");
    // console.log(this.state.showMenu);

    if (this.state.showMenu) {
      if (coverflow.classList.contains("selected")) {
        coverflow.classList.toggle("selected");
        music.classList.toggle("selected");
      } else if (music.classList.contains("selected")) {
        music.classList.toggle("selected");
        games.classList.toggle("selected");
      } else if (games.classList.contains("selected")) {
        games.classList.toggle("selected");
        settings.classList.toggle("selected");
      } else if (settings.classList.contains("selected")) {
        settings.classList.toggle("selected");
        coverflow.classList.toggle("selected");
      }
    }
  };
  toggleAntiClockwise = () => {
    var music = document.getElementById("music");
    var games = document.getElementById("games");
    var settings = document.getElementById("settings");
    var coverflow = document.getElementById("coverflow");
    if (this.state.showMenu) {
      if (coverflow.classList.contains("selected")) {
        coverflow.classList.toggle("selected");
        settings.classList.toggle("selected");
      } else if (music.classList.contains("selected")) {
        music.classList.toggle("selected");
        coverflow.classList.toggle("selected");
      } else if (games.classList.contains("selected")) {
        games.classList.toggle("selected");
        music.classList.toggle("selected");
      } else if (settings.classList.contains("selected")) {
        settings.classList.toggle("selected");
        games.classList.toggle("selected");
      }
    }
  };
  rotate = async () => {
    var containerElement = document.getElementsByClassName("Keypad");
    var activeRegion = ZingTouch.Region(containerElement[0]);
    activeRegion.bind(containerElement[0], "rotate", (event) => {
      event.stopPropagation();
      if (
        event.detail.distanceFromLast > 0 &&
        event.detail.distanceFromOrigin > 15
      ) {
        this.toggleClockwise();
      } else if (
        event.detail.distanceFromLast < 0 &&
        event.detail.distanceFromOrigin < -15
      ) {
        this.toggleAntiClockwise();
      }
    });
  };
  handleClick = () => {
    // console.log("what the fuck bro?");
    if (this.state.showMenu) {
      this.setState({
        showMenu: false,
        showGames: false,
        showMusic: false,
        showSettings: false,
        showCoverflow: false,
      });
      var music = document.getElementById("music");
      var games = document.getElementById("games");
      var settings = document.getElementById("settings");
      var coverflow = document.getElementById("coverflow");
      if (games.classList.contains("selected")) {
        this.setState({
          showGames: true,
        });
      }
      if (music.classList.contains("selected")) {
        this.setState({
          showMusic: true,
        });
      }
      if (settings.classList.contains("selected")) {
        this.setState({
          showSettings: true,
        });
      }
      if (coverflow.classList.contains("selected")) {
        this.setState({
          showCoverflow: true,
        });
      }
    }
    // console.log(this.state);
  };
  menuHandler = () => {
    this.setState({
      showGames: false,
      showMusic: false,
      showSettings: false,
      showCoverflow: false,
      showMenu: true,
    });
  };
  render() {
    return (
      <div className="App">
        <div className="ipod">
          {this.state.showMusic && <Music />}
          {this.state.showMenu && <Screen />}
          {this.state.showGames && <Games />}
          {this.state.showSettings && <Settings />}
          {this.state.showCoverflow && <CoverFlow />}
          <Keypad
            handleClick={this.handleClick}
            menuHandler={this.menuHandler}
          ></Keypad>
        </div>
      </div>
    );
  }
}

export default App;
