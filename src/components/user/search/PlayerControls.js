import React from "react";
import Sound from "react-sound";
import PlayCircleOutlineIcon from "@material-ui/icons/PlayCircleOutline";
import PauseCircleOutlineIcon from "@material-ui/icons/PauseCircleOutline";
import ReplayIcon from "@material-ui/icons/Replay";

function control(text, clickHandler) {
  const onClick = e => {
    e.preventDefault();
    clickHandler();
  };
  //   return (
  //     <li>
  //       <a href="#" onClick={onClick}>
  //         {text}
  //       </a>
  //     </li>
  //   );

  return <li onClick={onClick}>{text}</li>;
}

const numberFormat = new Intl.NumberFormat([], { minimumFractionDigits: 2 });

export default class PlayerControls extends React.Component {
  render() {
    return <div>{this.renderControls()}</div>;
  }

  renderControls() {
    const controls = {
      play: this.props.playStatus === Sound.status.STOPPED,
      stop: this.props.playStatus !== Sound.status.STOPPED,
      pause: this.props.playStatus === Sound.status.PLAYING,
      resume: this.props.playStatus === Sound.status.PAUSED
    };

    return (
      <div>
        {/* Volume:
        <button onClick={this.props.onVolumeDown}>-</button>
        <button onClick={this.props.onVolumeUp}>+</button> */}
        <ul>
          {controls.play &&
            control(
              <ReplayIcon color="primary" id="audio" />,
              this.props.onPlay
            )}
          {/* {controls.stop && control("Stop", this.props.onStop)} */}
          {controls.pause &&
            control(
              <PauseCircleOutlineIcon color="primary" id="audio" />,
              this.props.onPause
            )}
          {controls.resume &&
            control(
              <PlayCircleOutlineIcon color="primary" id="audio" />,
              this.props.onResume
            )}
        </ul>
        {/* <div>
          Playback Rate:
          <button onClick={this.props.onPlaybackRateDown}>-</button>{" "}
          {numberFormat.format(this.props.playbackRate)}{" "}
          <button onClick={this.props.onPlaybackRateUp}>+</button>
        </div> */}
      </div>
    );
  }
}
