/*
 * Welcome to your app's main JavaScript file!
 *
 * We recommend including the built version of this JavaScript file
 * (and its CSS file) in your base layout (base.html.twig).
 */
import React from "react";
import ReactDom from "react-dom/client";
import { HashRouter, Route, Routes } from "react-router-dom";

import "bootstrap/dist/js/bootstrap.bundle.min";

// any CSS you import will output into a single css file (app.css in this case)
import "./styles/app.css";

// start the Stimulus application
import "./bootstrap";

import Customers from "./components/Customers";
import Home from "./components/Home";
import Invoices from "./components/Invoices";
import Navbar from "./components/Navbar";

const App = () => {
  return (
    <HashRouter>
      <Navbar />
      <div className="container py-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="customers" element={<Customers />} />
          <Route path="invoices" element={<Invoices />} />
        </Routes>
      </div>
    </HashRouter>
  );
};

const root = ReactDom.createRoot(document.querySelector("#root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
