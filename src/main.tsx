import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles/globals.css";

/**
 * Entry point for the React application
 * -------------------------------------
 * - Attaches the React app to te DOM element with id "root"
 * - Wraps the app in React.StrictMode for development checks
 * - Imports global CSS
 */
ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);
