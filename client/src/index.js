import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { configureStore } from "./configureStore";
import { Root } from "./Root";

const store = configureStore();

ReactDOM.hydrate(<Root store={store} />, document.querySelector("#root"));
