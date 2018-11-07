import React, { Component } from "react";
import SplashVideo from "./SplashVideo";
import NavBar from "../nav/NavBar";

class Landing extends Component {
  render() {
    return (
      <div>
        <NavBar />
        <SplashVideo />
      </div>
    );
  }
}

export default Landing;
