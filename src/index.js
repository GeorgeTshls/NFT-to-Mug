import React from "react";
import ReactDOM from "react-dom/client";
import { MoralisProvider } from "react-moralis";

import App from "./app";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";

const root = ReactDOM.createRoot(document.getElementById("app"));
root.render(
  <React.StrictMode>
    <MoralisProvider
      serverUrl="https://ub0wejlqdfnc.usemoralis.com:2053/server"
      appId="PH2Xupr21STP4fuJSKw6kZCyVwjnKpVspHqyrWqi"
    >
      <App />
    </MoralisProvider>
  </React.StrictMode>
);
