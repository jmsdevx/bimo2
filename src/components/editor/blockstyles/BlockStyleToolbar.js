import React from "react";
import HeaderStyleDropdown from "./HeaderStyleDropdown";
import BlockStyleButton from "./BlockStyleButton";
import { withStyles } from "@material-ui/core/styles";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import List from "@material-ui/core/List";
import FormatSizeIcon from "@material-ui/icons/FormatSize";
import Filter1Icon from "@material-ui/icons/Filter1";

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
          <ListItem>
            <HeaderStyleDropdown
              headerOptions={HEADER_TYPES}
              active={blockType}
              onToggle={this.props.onToggle}
            />
            <ListItemIcon />
            <FormatSizeIcon />
          </ListItem>
        </List>
        <List>
          {BLOCK_TYPES.map((type, i) => {
            return (
              <ListItem button>
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
  { label: " [“ ”]   Quote", style: "blockquote" },
  { label: "[ - ]   Bullet", style: "unordered-list-item" },
  { label: "[ 1. ]   List", style: "ordered-list-item" }
  //   { label: "{ }", style: "code-block" }
];
export const HEADER_TYPES = [
  { label: "H1", style: "header-one" },
  { label: "H2", style: "header-two" },
  { label: "H3", style: "header-three" },
  { label: "h4", style: "header-four" },
  { label: "h5", style: "header-five" },
  { label: "h6", style: "header-six" }
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
