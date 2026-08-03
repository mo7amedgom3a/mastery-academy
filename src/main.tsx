import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { LazyMotion, domAnimation } from "framer-motion";
import { ThemeProvider } from "@/hooks/useTheme";

import App from "./App";
import "./styles.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <LazyMotion features={domAnimation} strict>
          <App />
        </LazyMotion>
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>,
);

