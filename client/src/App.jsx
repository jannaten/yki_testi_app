import React, { useState } from "react";
import { Toaster } from "react-hot-toast";
import { routes, themes } from "./config";
import { useWindowDimensions } from "./hooks";
import { Switch, Route } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { SearchresultPage, IdentifyPage } from "./pages";
import { NavBar, ModalRootComponent } from "./components";
import "./App.css";

export default function App() {
  const size = useWindowDimensions();
  const { home, identify } = routes;
  const [theme, setTheme] = useState("defaultTheme");
  return (
    <ThemeProvider
      theme={{ ...themes[theme], width: size.width, height: size.height }}
    >
      <NavBar />
      <ModalRootComponent />
      <Switch>
        <Route exact path={home} component={SearchresultPage} />
        <Route exact path={identify} component={IdentifyPage} />
      </Switch>
      <Toaster />
    </ThemeProvider>
  );
}
