import React from "react";
import ReactDOM from "react-dom";
import { Provider as ReduxProvider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
// import store from "./redux/store";

ReactDOM.render(
  <BrowserRouter>
    {/* <ReduxProvider store={store}> */}
    <App />
    {/* </ReduxProvider> */}
  </BrowserRouter>,
  document.getElementById("root")
);

if (module.hot) module.hot.accept();
