import React, { Component } from "react";
import Sound from "react-sound";
import PlayerControls from "./PlayerControls";

class Speech extends Component {
  constructor(props) {
    super(props);
    this.state = {
      controlled: true,
      currentSong: this.props.speech,
      position: 0,
      volume: 100,
      playbackRate: 1.0,
      playStatus: Sound.status.PLAYING
    };
    console.log(this.state.currentSong);
  }

  getStatusText() {
    switch (this.state.playStatus) {
      case Sound.status.PLAYING:
        return "playing";
      case Sound.status.PAUSED:
        return "paused";
      case Sound.status.STOPPED:
        return "stopped";
      default:
        return "(unknown)";
    }
  }

  handleSongSelected = song => {
    this.setState({ currentSong: song, position: 0 });
  };

  handleControlledComponentChange = e => {
    this.setState({
      controlled: e.target.checked,
      position: 0
    });
  };

  render() {
    const { volume, playbackRate, loop } = this.state;
    return (
      <div>
        <label>
          <input
            type="checkbox"
            checked={this.state.controlled}
            onChange={this.handleControlledComponentChange}
          />
          Control
        </label>
        <PlayerControls
          playStatus={this.state.playStatus}
          onPlay={() => this.setState({ playStatus: Sound.status.PLAYING })}
          onPause={() => this.setState({ playStatus: Sound.status.PAUSED })}
          onResume={() => this.setState({ playStatus: Sound.status.PLAYING })}
          onStop={() =>
            this.setState({ playStatus: Sound.status.STOPPED, position: 0 })
          }
          onSeek={position => this.setState({ position })}
          onVolumeUp={() =>
            this.setState({ volume: volume >= 100 ? volume : volume + 10 })
          }
          onVolumeDown={() =>
            this.setState({ volume: volume <= 0 ? volume : volume - 10 })
          }
          onPlaybackRateUp={() =>
            this.setState({
              playbackRate:
                playbackRate >= 4 ? playbackRate : playbackRate + 0.25
            })
          }
          onPlaybackRateDown={() =>
            this.setState({
              playbackRate:
                playbackRate <= 0.5 ? playbackRate : playbackRate - 0.25
            })
          }
          duration={
            this.state.currentSong ? this.state.currentSong.duration : 0
          }
          position={this.state.position}
          playbackRate={playbackRate}
        />

        {this.state.currentSong && this.state.controlled ? (
          <Sound
            url={this.state.currentSong}
            playStatus={this.state.playStatus}
            position={this.state.position}
            volume={volume}
            playbackRate={playbackRate}
            loop={loop}
            onLoading={({ bytesLoaded, bytesTotal }) =>
              console.log(`${(bytesLoaded / bytesTotal) * 100}% loaded`)
            }
            onLoad={() => console.log("Loaded")}
            onPlaying={({ position }) => this.setState({ position })}
            onPause={() => console.log("Paused")}
            onResume={() => console.log("Resumed")}
            onStop={() => console.log("Stopped")}
            onFinishedPlaying={() =>
              this.setState({ playStatus: Sound.status.STOPPED })
            }
          />
        ) : (
          <Sound
            url={this.props.speech}
            playStatus={this.state.playStatus}
            playFromPosition={this.state.position}
            volume={volume}
            playbackRate={playbackRate}
            loop={loop}
            onLoading={({ bytesLoaded, bytesTotal }) =>
              console.log(`${(bytesLoaded / bytesTotal) * 100}% loaded`)
            }
            onLoad={() => console.log("Loaded")}
            onPlaying={({ position }) => console.log("Position", position)}
            onPause={() => console.log("Paused")}
            onResume={() => console.log("Resumed")}
            onStop={() => console.log("Stopped")}
            onFinishedPlaying={() =>
              this.setState({ playStatus: Sound.status.STOPPED })
            }
          />
        )}
      </div>
    );
  }
}

export default Speech;