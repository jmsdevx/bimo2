import React from "react";
import HeaderStyleDropdown from "./HeaderStyleDropdown";
import BlockStyleButton from "./BlockStyleButton";

class BlockStyleToolbar extends React.Component {
  render() {
    const { editorState } = this.props;
    const selection = editorState.getSelection();
    const blockType = editorState
      .getCurrentContent()
      .getBlockForKey(selection.getStartKey())
      .getType();

    return (
      <div>
        <span className="RichEditor-controls">
          <HeaderStyleDropdown
            headerOptions={HEADER_TYPES}
            active={blockType}
            onToggle={this.props.onToggle}
          />

          {BLOCK_TYPES.map(type => {
            return (
              <BlockStyleButton
                active={type.style === blockType}
                label={type.label}
                onToggle={this.props.onToggle}
                style={type.style}
                key={type.label}
                type={type}
              />
            );
          })}
        </span>
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

export default BlockStyleToolbar;
