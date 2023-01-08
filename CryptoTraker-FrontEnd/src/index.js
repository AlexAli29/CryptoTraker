import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom"
import "./Styles/css/index.module.css";
import { Provider } from 'react-redux';
import { store } from './app/store'

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path="/*" element={<App />} />
      </Routes>
    </BrowserRouter>
  </Provider>
);
