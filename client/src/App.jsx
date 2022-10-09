import React from "react";
import { routes } from "./config";
import { NavBar } from "./components";
import { Toaster } from "react-hot-toast";
import { Switch, Route } from "react-router-dom";
import { SearchresultPage, IdentifyPage } from "./pages";
import "./App.css";

export default function App() {
  const { home, identify } = routes;
  return (
    <div>
      <NavBar />
      <Switch>
        <Route exact path={home} component={SearchresultPage} />
        <Route exact path={identify} component={IdentifyPage} />
      </Switch>
      <Toaster />
    </div>
  );
}
