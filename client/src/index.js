import React from "react";
import ReactDOM from "react-dom";
import store from "./redux/store";
import { BrowserRouter } from "react-router-dom";
import { Provider as ReduxProvider } from "react-redux";
import App from "./App";

ReactDOM.render(
  <BrowserRouter>
    <ReduxProvider store={store}>
      <App />
    </ReduxProvider>
  </BrowserRouter>,
  document.getElementById("root")
);

if (module.hot) module.hot.accept();
