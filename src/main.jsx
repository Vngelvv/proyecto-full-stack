import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/estilo.css";

import App from "./App";

import { AuthProvider } from "./context/AuthContext";
import { ProductosProvider } from "./context/ProductosContext";
import { CarritoProvider } from "./context/CarritoContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <ProductosProvider>
          <CarritoProvider>
            <App />
          </CarritoProvider>
        </ProductosProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);