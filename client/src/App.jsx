import { Toaster } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { routes, themes } from "./config";
import { loadUser } from "./redux/slices";
import { useWindowDimensions } from "./hooks";
import { Switch, Route } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import React, { useState, useEffect } from "react";
import { SearchresultPage, IdentifyPage } from "./pages";
import { NavBar, ModalRootComponent } from "./components";
import "./App.css";

export default function App() {
  const dispatch = useDispatch();
  const size = useWindowDimensions();
  const { home, identify } = routes;
  const [theme, setTheme] = useState("defaultTheme");

  // useEffect(async () => {
  //   if (localStorage.token) {
  //     await dispatch(loadUser());
  //   }
  // }, []);

  return (
    <ThemeProvider
      theme={{ ...themes[theme], width: size.width, height: size.height }}
    >
      <h1>Test</h1>
      {/* <NavBar />
      <ModalRootComponent />
      <Switch>
        <Route exact path={home} component={SearchresultPage} />
        <Route exact path={identify} component={IdentifyPage} />
      </Switch> */}
      <Toaster />
    </ThemeProvider>
  );
}
