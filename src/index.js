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
      serverUrl="https://8gbkbha2jut8.usemoralis.com:2053/server"
      appId="LG7QBq0gbbOPT0Nrnq4QsmG7e8NxPMj0Po0X8UkI"
    >
      <App />
    </MoralisProvider>
  </React.StrictMode>
);
