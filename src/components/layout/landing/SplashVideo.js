import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardMedia from "@material-ui/core/CardMedia";
import play from "./Play.mp4";
import { Typography } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import SearchIcon from "@material-ui/icons/Search";

const styles = {
  root: {
    display: "block",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center"
  },
  overlay: {
    color: "white"
  },
  textField: {
    width: "30vw",
    fontSize: "6em"
  },
  your: {
    fontSize: "7em",
    color: "white"
  },
  colortitle: {
    color: "#29cb9d",
    letterSpacing: "6px",
    fontSize: "8em",
    margin: "2vw"
  },
  button: {
    height: "4vw",
    width: "4vw"
  },
  icon: {
    height: "2.5vw",
    width: "2.5vw"
  }
};

function SplashVideo(props) {
  const { classes } = props;

  return (
    <div>
      <Card className={classes.card}>
        <div className="splashtitle">
          <div>
            <Typography variant="h1" className={classes.your}>
              Spectacular
            </Typography>
            <Typography variant="h1" className={classes.colortitle}>
              Vernacular
            </Typography>
          </div>
          <TextField
            id="outlined-search"
            label="Discover..."
            type="search"
            className={classes.textField}
            margin="dense"
            variant="outlined"
          />
          <Button
            variant="fab"
            color="primary"
            aria-label="Search"
            className={classes.button}
          >
            <SearchIcon className={classes.icon} />
          </Button>
        </div>
        <CardActionArea>
          <CardMedia
            component="video"
            alt="splash video"
            className={classes.media}
            src={play}
            autoPlay
            muted
            loop
          />
        </CardActionArea>
      </Card>
    </div>
  );
}

SplashVideo.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SplashVideo);
