import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { UserProvider } from "./context/userContext";
import { LoadingProvider } from "./context/loadingContext";
import { ProductsProvider } from "./context/productsContext";
import { OrdersProvider } from "./context/OrderContext";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <LoadingProvider>
        <UserProvider>
          <ProductsProvider>
            <OrdersProvider>
              <App />
            </OrdersProvider>
          </ProductsProvider>
        </UserProvider>
      </LoadingProvider>
    </BrowserRouter>
  </StrictMode>
);
