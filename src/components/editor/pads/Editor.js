import React, { Component } from "react";
import { EditorState, RichUtils, convertToRaw } from "draft-js";
import Editor from "draft-js-plugins-editor";
import createHighlightPlugin from "../plugins/highlightPlugin";
import addLinkPlugin from "../plugins/addLinkPlugin";
import BlockStyleToolbar, {
  getBlockStyle
} from "../blockstyles/BlockStyleToolbar";
import axios from "axios";
// import { connect } from "react-redux";

const highlightPlugin = createHighlightPlugin();

class PageContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editorState: EditorState.createEmpty(),
      displayedNote: "new",
      note_title: "My Note"
    };
    this.onChange = editorState => this.setState({ editorState });
    this.plugins = [highlightPlugin, addLinkPlugin];
  }

  submitEditor = () => {
    let contentState = this.state.editorState.getCurrentContent();
    let note = { content: convertToRaw(contentState) };
    console.log(note);
    let note_content = JSON.stringify(note.content);
    const { email, note_title } = this.state;
    axios.post("/api/homework", {
      email: email,
      note_content: note_content,
      note_title: note_title
    });
    //   .then(this.props.history.push(``));
  };

  handleKeyCommand = command => {
    const newState = RichUtils.handleKeyCommand(
      this.state.editorState,
      command
    );
    if (newState) {
      this.onChange(newState);
      return "handled";
    }
    return "not-handled";
  };

  onUnderlineClick = () => {
    this.onChange(
      RichUtils.toggleInlineStyle(this.state.editorState, "UNDERLINE")
    );
  };

  onBoldClick = () => {
    this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, "BOLD"));
  };

  onItalicClick = () => {
    this.onChange(
      RichUtils.toggleInlineStyle(this.state.editorState, "ITALIC")
    );
  };

  onHighlight = () => {
    this.onChange(
      RichUtils.toggleInlineStyle(this.state.editorState, "HIGHLIGHT")
    );
  };

  onAddLink = () => {
    const editorState = this.state.editorState;
    const selection = editorState.getSelection();
    const link = window.prompt("Paste the link -");
    if (!link) {
      this.onChange(RichUtils.toggleLink(editorState, selection, null));
      return "handled";
    }
    const content = editorState.getCurrentContent();
    const contentWithEntity = content.createEntity("LINK", "MUTABLE", {
      url: link
    });
    const newEditorState = EditorState.push(
      editorState,
      contentWithEntity,
      "create-entity"
    );
    const entityKey = contentWithEntity.getLastCreatedEntityKey();
    this.onChange(RichUtils.toggleLink(newEditorState, selection, entityKey));
  };

  toggleBlockType = blockType => {
    this.onChange(RichUtils.toggleBlockType(this.state.editorState, blockType));
  };

  titleChange = input => {
    this.setState({ note_title: input });
    console.log(this.state.note_title);
  };

  render() {
    return (
      <div className="editorPage">
        {/* <img src={webg} id="webg" alt="images" /> */}

        <div className="editorContainer">
          <input
            type="text"
            value={this.state.note_title}
            onChange={e => this.titleChange(e.target.value)}
          />
          <div className="btncontainer">
            <button onClick={this.onUnderlineClick}>U</button>
            <button onClick={this.onBoldClick}>
              <b>B</b>
            </button>
            <button onClick={this.onItalicClick}>
              <em>I</em>
            </button>
            <button onClick={this.onHighlight}>
              <span style={{ background: "yellow" }}>H</span>
            </button>
            <button onClick={this.onAddLink}>LINK</button>
          </div>
          <div className="myeditor">
            <BlockStyleToolbar
              editorState={this.state.editorState}
              handleKeyCommand={this.handleKeyCommand}
              onChange={this.onChange}
              onToggle={this.toggleBlockType}
            />
            <Editor
              blockStyleFn={getBlockStyle}
              editorState={this.state.editorState}
              onChange={this.onChange}
              handleKeyCommand={this.handleKeyCOmmand}
              plugins={this.plugins}
            />
          </div>
          <button onClick={this.submitEditor}>Submit</button>
        </div>
      </div>
    );
  }
}

// function mapStatetoProps(state) {
//   return { state };
// }

// export default connect(mapStatetoProps)(PageContainer);

export default PageContainer;
