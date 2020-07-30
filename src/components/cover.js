// @flow
//required modules
import "../css/screen.css";
import ZingTouch from "zingtouch";
import React, { Component } from "react";
import Cover1 from "./Cover1";
import Cover2 from "./Cover2";

class cover extends Component {
  //state
  state = {
    showone: false, //cover1
    showtwo: false, //cover2
    showmen: true, //showmenu
  };

  componentDidMount() {
    if (this.state.showmen) {
      //calling rotate function after component is mounted and menu is visible
      this.rotate();
      var center = document.getElementById("center");
      //adding event listner to the center button
      center.addEventListener("click", this.handleClick);
    }
  }

  componentWillUnmount() {
    //setting state back
    this.setState({
      showmen: true,
    });
  }

    // function to toggle between menu items
    rotate = async () => {
      //collecting elements from dom
      var cover1 = await document.getElementById("cover1");
      var cover2 = await document.getElementById("cover2");
      var containerElement = document.getElementsByClassName("Keypad");
      //toggle logic
      var activeRegion = ZingTouch.Region(containerElement[0]);
      activeRegion.bind(containerElement[0], "rotate", (event) => {
        event.stopPropagation();
        if (
          event.detail.distanceFromLast > 2 &&
          event.detail.distanceFromOrigin > 15
        ) {
          cover1.classList.toggle("selected");
          cover2.classList.toggle("selected");
        } else if (
          event.detail.distanceFromLast < -2 &&
          event.detail.distanceFromOrigin < -15
        ) {
          cover1.classList.toggle("selected");
          cover2.classList.toggle("selected");
        }
      });
    };
    //function to handle click on menu button
  handleClick = async () => {
    if (this.state.showmen) {
      this.setState({
        showtwo: false,
        showone: false,
      });
      //collecting elements from DOM
      var cover1 = await document.getElementById("cover1");
      var cover2 = await document.getElementById("cover2");
      //opening selected option on click
      if (cover1.classList.contains("selected")) {
        this.setState({
          showone: true,
          showmen: false,
        });
      }
      if (cover2.classList.contains("selected")) {
        this.setState({
          showtwo: true,
          showmen: false,
        });
      }
    }
  };
  render() {
    return (
      <div className="Screen">
        {/* conditional rendering */}
        {this.state.showone && <Cover1 />}
        {this.state.showtwo && <Cover2 />}
        {this.state.showmen && (
          <div className="Icons">
            <div id="cover" style={{ fontWeight: "bold", margin: "2%" }}>
              Cover
            </div>
            <div id="cover1" className="selected">
              Cover 1
              </div>
            <div id="cover2">Cover 2</div>
          </div>
        )}
      </div>
    );
  }
}

export default cover;