import { themes } from "../config";
import NavBar from "./navbar.component";
import { useDeviceSize } from "../hooks";
import { Toaster } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { loadUser } from "../redux/slices";
import { ThemeProvider } from "styled-components";
import React, { useState, useEffect } from "react";
import ModalRootComponent from "./modal-root.component";

export default function Layout({ children }) {
	const dispatch = useDispatch();
	const [width, height] = useDeviceSize();
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
