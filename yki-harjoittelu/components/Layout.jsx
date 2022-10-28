import NavBar from "./navbar.component";
import { Toaster } from "react-hot-toast";
import ModalRootComponent from "./modal-root.component";
import React, { useState, useEffect } from "react";
import { ThemeProvider } from "styled-components";
import { useDeviceSize } from "../hooks";
import { loadUser } from "../redux/slices";
import { routes, themes } from "../config";
import { useDispatch } from "react-redux";

export default function Layout({ children }) {
  const dispatch = useDispatch();
  const [width, height] = useDeviceSize();
  const { home, identify } = routes;
  const [theme] = useState("defaultTheme");
  
  useEffect(() => {
    if (localStorage.token) {
      dispatch(loadUser());
    }
    // checkLocation();
  }, []);

  // const checkLocation = () => {
  //   if (!window.location.href.includes("#")) {
  //     window.location.href = `${window.location.href}#/`;
  //   }
  // };
  return (
    <ThemeProvider
      theme={{ ...themes[theme], width, height }}
    >
      <NavBar />
      <ModalRootComponent />
      <main>{children}</main>
      <Toaster />
    </ThemeProvider>
  );
}
