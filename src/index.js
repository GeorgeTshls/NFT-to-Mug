import React from "react";
import ReactDOM from "react-dom/client";
import { MoralisProvider } from "react-moralis";

import App from "./app";
import "./index.css";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

const root = ReactDOM.createRoot(document.getElementById("app"));
root.render(
  <React.StrictMode>
    <MoralisProvider
      serverUrl=""
      appId=""
    >
      <App />
    </MoralisProvider>
  </React.StrictMode>
);
