import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import MainScreen from "./Containers/Main/index.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <MainScreen />
  </StrictMode>,
  // <StrictMode>
  //   <App />
  // </StrictMode>,
);
