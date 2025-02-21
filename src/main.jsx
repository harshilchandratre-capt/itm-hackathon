import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { UserProvider } from "./context/userContext";
import { LoadingProvider } from "./context/loadingContext";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <LoadingProvider>
        <UserProvider>
          <App />
        </UserProvider>
      </LoadingProvider>
    </BrowserRouter>
  </StrictMode>
);
