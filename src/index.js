import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { AppProvider } from "./context/productcontex";
import { FilterContextProvider } from "./context/filter_context";
import { CartProvider } from "./context/cart_context";
import { Auth0Provider } from "@auth0/auth0-react";

const root = ReactDOM.createRoot(document.getElementById("root"));

const domain = process.env.REACT_APP_AUTH_DOMAIN;
console.log(domain);

const clientId = process.env.REACT_APP_CLIENT_ID;

root.render(
    <Auth0Provider
    domain={domain}
    clientId={clientId}
    authorizationParams={{
      redirect_uri: window.location.origin
    }}
  >    
<AppProvider>
<FilterContextProvider>
<CartProvider>
<BrowserRouter>
<App />
</BrowserRouter>
</CartProvider>
</FilterContextProvider>   
</AppProvider>
</Auth0Provider>

);



