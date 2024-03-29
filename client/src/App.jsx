import { Toaster } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { routes, themes } from "./config";
import { loadUser } from "./redux/slices";
import { useWindowDimensions } from "./hooks";
import IdentifyPage from "./pages/identify.page";
import { Routes, Route } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import React, { useState, useEffect } from "react";
import NavBar from "./components/navbar.component";
import SearchresultPage from "./pages/search-result.page";
import ModalRootComponent from "./components/modal-root.component";
import "./App.css";

export default function App() {
  const dispatch = useDispatch();
  const size = useWindowDimensions();
  const { home, identify } = routes;
  const [theme] = useState("defaultTheme");

  useEffect(() => {
    if (localStorage.token) {
      dispatch(loadUser());
    }
    // checkLocation();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // const checkLocation = () => {
  //   if (!window.location.href.includes("#")) {
  //     window.location.href = `${window.location.href}#/`;
  //   }
  // };

  return (
    <ThemeProvider
      theme={{ ...themes[theme], width: size.width, height: size.height }}
    >
      <NavBar />
      <ModalRootComponent />
      <Routes>
        {/* <Route path="/" element={<Navigate replace to="/home" />} /> */}
        <Route exact path={home} element={<SearchresultPage />} />
        <Route exact path={identify} element={<IdentifyPage />} />
      </Routes>
      <Toaster />
    </ThemeProvider>
  );
}
