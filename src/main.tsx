import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { HashRouter } from "react-router";

import App from "./App.tsx";
import { store } from "./store";
import "./index.css";

const container = document.getElementById("root");

if (!container) {
  throw new Error("Root element (#root) not found in HTML");
}

createRoot(container).render(
  <StrictMode>
    <HashRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </HashRouter>
  </StrictMode>,
);
