import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import Coffee from "../Coffee.mp4";

const styles = {
  card: {
    maxWidth: "100%",
    height: "45vh"
  },
  media: {
    objectFit: "cover",
    position: "absolute",
    zIndex: 0
  },
  welcome: {
    color: "white",
    zIndex: 1,
    position: "relative",
    height: "100%"
  }
};

function MyProfile(props) {
  const { classes } = props;
  return (
    <Card className={classes.card}>
      <CardActionArea>
        <CardMedia
          component="video"
          alt="coffee video"
          className={classes.media}
          height="140"
          src={Coffee}
          title="coffee"
          autoPlay
          muted
          loop
        />
        <CardContent>
          <Typography
            className={classes.welcome}
            variant="h1"
            component="h2"
            justify
          >
            Welcome
          </Typography>
          <Typography
            gutterBottom
            variant="h1"
            className={classes.welcome}
            component="h2"
          >
            Back, {props.f_name ? props.f_name : "Dumbledore"}!
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

MyProfile.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(MyProfile);
