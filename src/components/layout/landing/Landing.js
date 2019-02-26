import React, { Component } from "react";
import NavBar from "../nav/NavBar";
import SplashImage from "./SplashImage";

class Landing extends Component {
  render() {
    return (
      <div className="splashback">
        <NavBar />
        <SplashImage />
      </div>
    );
  }
}

export default Landing;
