import React from "react";
import HeaderStyleDropdown from "./HeaderStyleDropdown";
import BlockStyleButton from "./BlockStyleButton";
import { withStyles } from "@material-ui/core/styles";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import List from "@material-ui/core/List";

const styles = {
  font: {
    display: "flex",
    flexDirection: "column"
  }
};

class BlockStyleToolbar extends React.Component {
  render() {
    const { classes } = this.props;
    const { editorState } = this.props;
    const selection = editorState.getSelection();
    const blockType = editorState
      .getCurrentContent()
      .getBlockForKey(selection.getStartKey())
      .getType();

    return (
      <div className={classes.font}>
        <List>
          <ListItem button onClick={this.onBoldClick}>
            <HeaderStyleDropdown
              headerOptions={HEADER_TYPES}
              active={blockType}
              onToggle={this.props.onToggle}
            />
            <ListItemIcon />
            <ListItemText primary="Size" />
          </ListItem>
        </List>
        <List>
          {BLOCK_TYPES.map((type, i) => {
            return (
              <ListItem>
                <BlockStyleButton
                  active={type.style === blockType}
                  label={type.label}
                  onToggle={this.props.onToggle}
                  style={type.style}
                  key={type.label}
                  type={type}
                />
              </ListItem>
            );
          })}
        </List>
      </div>
    );
  }
}

export const BLOCK_TYPES = [
  { label: " [“ ”] ", style: "blockquote" },
  { label: "[ -- ]", style: "unordered-list-item" },
  { label: "[ 1. ]", style: "ordered-list-item" }
  //   { label: "{ }", style: "code-block" }
];
export const HEADER_TYPES = [
  { label: "BIGGEST", style: "header-one" },
  { label: "BIGGER", style: "header-two" },
  { label: "BIG", style: "header-three" },
  { label: "small", style: "header-four" },
  { label: "smaller", style: "header-five" },
  { label: "smallest", style: "header-six" }
];

export function getBlockStyle(block) {
  switch (block.getType()) {
    case "blockquote":
      return "RichEditor-blockquote";
    default:
      return null;
  }
}

export default withStyles(styles)(BlockStyleToolbar);
