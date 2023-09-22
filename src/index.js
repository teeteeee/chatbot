import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { UserProvider } from "./UserContext";
import reportWebVitals from "./reportWebVitals";
import { GoogleOAuthProvider } from "@react-oauth/google";
// clientId="545260970067-5f8ict2r5m1bcf2k0gu647rhmojl1nh2.apps.googleusercontent.com" live
// clientId="216670948396-tp640nlrbid64f3p50jvvafiuk0l18j2.apps.googleusercontent.com" local

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <GoogleOAuthProvider
    // clientId="216670948396-tp640nlrbid64f3p50jvvafiuk0l18j2.apps.googleusercontent.com"
    clientId="545260970067-5f8ict2r5m1bcf2k0gu647rhmojl1nh2.apps.googleusercontent.com"
  >
    <React.StrictMode>
      <UserProvider>
        <App />
      </UserProvider>
    </React.StrictMode>
  </GoogleOAuthProvider>
);

reportWebVitals();
