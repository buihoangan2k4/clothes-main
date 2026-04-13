import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import ShopContextProvider from "./components/context/ShopContext";
import "@ant-design/v5-patch-for-react-19";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <ShopContextProvider>
        <App />
    </ShopContextProvider>
);

reportWebVitals();
