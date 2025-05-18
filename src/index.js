import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { GlobalContextProvider } from "./GlobalContext";
import App from "./App";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  // <StrictMode>
  <GlobalContextProvider>
    <App />
  </GlobalContextProvider>
  // </StrictMode>
);
