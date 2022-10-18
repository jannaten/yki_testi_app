import React from "react";
import { routes } from "./config";
import { Toaster } from "react-hot-toast";
import { Switch, Route } from "react-router-dom";
import { SearchresultPage, IdentifyPage } from "./pages";
import { NavBar, ModalRootComponent } from "./components";
import "./App.css";

export default function App() {
  const { home, identify } = routes;
  return (
    <div>
      <NavBar />
      <ModalRootComponent />
      <Switch>
        <Route exact path={home} component={SearchresultPage} />
        <Route exact path={identify} component={IdentifyPage} />
      </Switch>
      <Toaster />
    </div>
  );
}
