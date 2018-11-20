import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import { EditorState, RichUtils, convertToRaw } from "draft-js";
import Editor from "draft-js-plugins-editor";
import createHighlightPlugin from "../plugins/highlightPlugin";
import addLinkPlugin from "../plugins/addLinkPlugin";
import BlockStyleToolbar, {
  getBlockStyle
} from "../blockstyles/BlockStyleToolbar";
import axios from "axios";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import burger from "../../user/profile/user_data/burger.png";

const highlightPlugin = createHighlightPlugin();
const drawerWidth = 240;
const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    display: "flex",
    height: "100%"
  },
  appBar: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginRight: drawerWidth
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0
  },
  drawerPaper: {
    width: drawerWidth
  },
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3,
    backgroundImage: `url(${burger})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    borderRadius: "2em"
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit
  }
});

class PageContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editorState: EditorState.createEmpty(),
      displayedNote: "new",
      note_title: "My Note",
      note_type: "note",
      note_id: "",
      check: false
    };
    this.onChange = editorState => this.setState({ editorState });
    this.plugins = [highlightPlugin, addLinkPlugin];
  }

  componentDidMount() {
    this.setState({ check: false });
  }

  //simple post submit
  // submitEditor = () => {
  //   let contentState = this.state.editorState.getCurrentContent();
  //   let note = { content: convertToRaw(contentState) };
  //   console.log(note);
  //   let note_content = JSON.stringify(note.content);
  //   const { email, note_title } = this.state;
  //   axios.post("/api/homework", {
  //     email: email,
  //     note_content: note_content,
  //     note_title: note_title
  //   });
  //   //   .then(this.props.history.push(``));
  // };

  //conditional (draft based) submit
  submitEditor = () => {
    let contentState = this.state.editorState.getCurrentContent();
    let note = { content: convertToRaw(contentState) };
    let note_content = JSON.stringify(note.content);
    const { note_id, note_title } = this.state;
    console.log(this.props.auth_id);
    this.state.check
      ? axios
          .put(`/api/write/note/${note_id}`, {
            note_title: note_title,
            note_content: note_content
          })
          .then(response => console.log(response))
      : axios
          .post(`/api/write/note`, {
            note_title: note_title,
            note_content: note_content,
            auth_id: this.props.auth_id,
            note_type: "note"
          })
          .then(response => {
            console.log(response.data[0].max);
            this.setState({ check: true, note_id: response.data[0].max });
          });
  };

  finishEditor = () => {
    let contentState = this.state.editorState.getCurrentContent();
    let note = { content: convertToRaw(contentState) };
    let note_content = JSON.stringify(note.content);
    const { note_id, note_title } = this.state;
    console.log(this.props.auth_id);
    this.state.check
      ? axios
          .put(`/api/write/note/${note_id}`, {
            note_title: note_title,
            note_content: note_content
          })
          .then(this.props.handleClose)
      : axios
          .post(`/api/write/note`, {
            note_title: note_title,
            note_content: note_content,
            auth_id: this.props.auth_id,
            note_type: "note"
          })
          .then(this.props.handleClose);
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
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <CssBaseline />
        <main className={classes.content}>
          <div className={classes.toolbar} />
          <Typography paragraph>
            <div>
              <Paper className={classes.root} elevation={1}>
                <div>
                  <TextField
                    id="outlined-with-placeholder"
                    label="Note Title"
                    className={classes.textField}
                    margin="normal"
                    variant="outlined"
                    value={this.state.note_title}
                    onChange={e => this.titleChange(e.target.value)}
                    type="text"
                    autoFocus
                  />
                  <div>
                    <Editor
                      blockStyleFn={getBlockStyle}
                      editorState={this.state.editorState}
                      onChange={this.onChange}
                      handleKeyCommand={this.handleKeyCOmmand}
                      plugins={this.plugins}
                    />
                  </div>
                </div>
              </Paper>
            </div>
          </Typography>
        </main>
        <Drawer
          className={classes.drawer}
          variant="permanent"
          classes={{
            paper: classes.drawerPaper
          }}
          anchor="right"
        >
          <div className={classes.toolbar} />
          <Divider />
          <List>
            <ListItem button onClick={this.onBoldClick}>
              <ListItemIcon>
                <InboxIcon />
              </ListItemIcon>
              <ListItemText primary="Bold" />
            </ListItem>
            <ListItem button onClick={this.onItalicClick}>
              <ListItemIcon>
                <InboxIcon />
              </ListItemIcon>
              <ListItemText primary="Italic" />
            </ListItem>
            <ListItem button onClick={this.onHighlight}>
              <ListItemIcon>
                <InboxIcon />
              </ListItemIcon>
              <ListItemText primary="Highlight" />
            </ListItem>
            <ListItem button onClick={this.onUnderlineClick}>
              <ListItemIcon>
                <InboxIcon />
              </ListItemIcon>
              <ListItemText primary="Underline" />
            </ListItem>
          </List>
          <Divider />

          <BlockStyleToolbar
            editorState={this.state.editorState}
            handleKeyCommand={this.handleKeyCommand}
            onChange={this.onChange}
            onToggle={this.toggleBlockType}
          />
          <Divider />
          <Button
            variant="contained"
            color="primary"
            onClick={this.submitEditor}
            className={classes.button}
          >
            save
          </Button>
          <Button
            variant="contained"
            color="secondary"
            onClick={this.finishEditor}
            className={classes.button}
          >
            finish
          </Button>
        </Drawer>
      </div>
    );
  }
}

export default withStyles(styles)(PageContainer);
