import React, { Component } from "react";
import { Link } from "react-router-dom";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";

class LinkBurger extends Component {
  constructor(props) {
    super(props);
    this.state = {
      anchorEl: null
    };
  }

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    const { anchorEl } = this.state;

    return (
      <div>
        <IconButton
          color="inherit"
          aria-label="Menu"
          aria-owns={anchorEl ? "link-burger" : undefined}
          aria-haspopup="true"
          onClick={this.handleClick}
        >
          <MenuIcon />
        </IconButton>
        <Menu
          id="link-burger"
          anchor={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.handleClose}
        >
          <MenuItem onClick={this.handleClose}>
            <Link to="/profile">Profile</Link>
          </MenuItem>
          <MenuItem onClick={this.handleClose}>
            <Link to="/search">Search</Link>
          </MenuItem>
          <MenuItem onClick={this.handleClose}>
            <Link to="/write">Write</Link>
          </MenuItem>
          <MenuItem onClick={this.handleClose}>
            <Link to="/chat">Chat</Link>
          </MenuItem>
        </Menu>
      </div>
    );
  }
}

export default LinkBurger;
