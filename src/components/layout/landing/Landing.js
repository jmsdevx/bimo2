import React, { Component } from "react";
import SplashVideo from "./SplashVideo";
import NavBar from "../nav/NavBar";
import SplashImage from "./SplashImage";

class Landing extends Component {
  render() {
    return (
      <div className="splashback">
        <NavBar />
        <SplashImage />

        {/* <SplashVideo /> */}
      </div>
    );
  }
}

export default Landing;
