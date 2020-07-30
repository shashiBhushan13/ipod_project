//Required Modules aand files
import React, { Component } from "react";
import Screen from "./components/screen";
import Keypad from "./components/keypad";
import Music from "./components/music";
import Settings from "./components/settings";
import Games from "./components/games";
import Cover from "./components/cover";
import ZingTouch from "zingtouch"; //used for rotation feature
import "./css/App.css";
import Switch from "./components/switch";

// App class
class App extends Component {
  // state
  state = {
    showMenu: true,
    showGames: false,
    showMusic: false,
    showSettings: false,
    showCover: false,
    showCover1: false,
    showCover2: false,
    angle: 0, //innitial angle
    powerON: false, //ipod power switch
  };

  componentDidMount() {
    //calling rotate function when everything is mounted and menu is selected
    this.handlePower();
  }
  componentDidUpdate() {
    if (this.state.showMenu && this.state.powerON) {
      this.rotate();
    }
  }
  toggleClockwise = async () => {
    //collecting elements in varible
    var music = await document.getElementById("music");
    var games = await document.getElementById("games");
    var settings = await document.getElementById("settings");
    var cover = await document.getElementById("cover");
     // toggling menu items clockwise
     if (this.state.showMenu) {
      if (cover.classList.contains("selected")) {
        cover.classList.toggle("selected");
        music.classList.toggle("selected");
      } else if (music.classList.contains("selected")) {
        music.classList.toggle("selected");
        games.classList.toggle("selected");
      } else if (games.classList.contains("selected")) {
        games.classList.toggle("selected");
        settings.classList.toggle("selected");
      } else if (settings.classList.contains("selected")) {
        settings.classList.toggle("selected");
        cover.classList.toggle("selected");
      }
    }
  };
  toggleAntiClockwise = () => {
    //collecing elements in variable
    var music = document.getElementById("music");
    var games = document.getElementById("games");
    var settings = document.getElementById("settings");
    var cover = document.getElementById("cover");
     // toggling menu anticlockwise
     if (this.state.showMenu) {
      if (cover.classList.contains("selected")) {
        cover.classList.toggle("selected");
        settings.classList.toggle("selected");
      } else if (music.classList.contains("selected")) {
        music.classList.toggle("selected");
        cover.classList.toggle("selected");
      } else if (games.classList.contains("selected")) {
        games.classList.toggle("selected");
        music.classList.toggle("selected");
      } else if (settings.classList.contains("selected")) {
        settings.classList.toggle("selected");
        games.classList.toggle("selected");
      }
    }
  };
   // function to handle keypad rotation
   rotate = async () => {
    var containerElement = document.getElementsByClassName("Keypad");
    var activeRegion = ZingTouch.Region(containerElement[0]); //defining active region
    activeRegion.bind(containerElement[0], "rotate", (event) => {
      event.stopPropagation();

      //comparing angle with previous angle in state
      if (
        event.detail.angle - this.state.angle > 15 ||
        event.detail.angle - this.state.angle < -15
      ) {
        if (event.detail.distanceFromLast > 0) {
          this.toggleClockwise();
        } else if (event.detail.distanceFromLast < 0) {
          this.toggleAntiClockwise();
        }
        this.setState({
          angle: event.detail.angle,
        });
      }
    });
  };

    //function to manage center button click
    handleClick = () => {
      if (this.state.showMenu) {
        this.setState({
          showMenu: false,
          showGames: false,
          showMusic: false,
          showSettings: false,
          showCover: false,
        });
          //collecting elements in variable
      var music = document.getElementById("music");
      var games = document.getElementById("games");
      var settings = document.getElementById("settings");
      var cover = document.getElementById("cover");

      // opening the selected menu item
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
      if (cover.classList.contains("selected")) {
        this.setState({
          showCover: true,
        });
      }
    }
  };

   //function to prepare state for menu
   menuHandler = () => {
    this.setState({
      showGames: false,
      showMusic: false,
      showSettings: false,
      showCover: false,
      showMenu: true,
    });
  };
  //function to handle power ON/OFF
  handlePower = () => {
    var power = document.getElementById("check");
    power.addEventListener("click", () => {
      if (power.checked) {
        this.setState({ powerON: true });
      } else {
        this.setState({ powerON: false });
      }
    });
  };
  render() {
    return (
      <div className="App">
        <Switch></Switch>
        <div className="ipod">
          {/* conditional rendering */}
          {this.state.powerON && (
            <React.Fragment>
              {this.state.showMusic && <Music />}
              {this.state.showMenu && <Screen />}
              {this.state.showGames && <Games />}
              {this.state.showSettings && <Settings />}
              {this.state.showCoverflow && <Cover />}
              <Keypad
                handleClick={this.handleClick}
                menuHandler={this.menuHandler}
              ></Keypad>
            </React.Fragment>
          )}
        </div>
      </div>
    );
  }
}

export default App;