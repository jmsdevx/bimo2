import React, { Component } from "react";
// import NavBar from "./components/layout/nav/NavBar";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./components/ducks/store";
import routes from "./routes";
import "./css/App.css";

const theme = createMuiTheme({
  palette: {
    primary: {
      light: "#bb70ff",
      main: "#843ffb",
      dark: "#4900c7",
      contrastText: "#ffffff"
    },
    secondary: {
      light: "#a4ffff",
      main: "#6cffce",
      dark: "#29cb9d",
      contrastText: "#000000"
    }
  },
  typography: {
    useNextVariants: true,
    fontFamily: ["Fira Sans", "sans-serif"]
  }
});

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <MuiThemeProvider theme={theme}>
            <div>
              {/* <NavBar /> */}
              {routes}
            </div>
          </MuiThemeProvider>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
