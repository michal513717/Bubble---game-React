import React from "react";
import ReactDOM from "react-dom";
import Root from "./Root";
import { Provider } from "react-redux";
import store from './store/store'

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Root />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);