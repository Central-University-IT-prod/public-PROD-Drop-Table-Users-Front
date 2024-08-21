import { createRoot } from "react-dom/client";

import { StrictMode } from "react";
import { RecoilRoot } from "recoil";
import { MantineProvider } from "@mantine/core";

import App from "./App.tsx";

import "./assets/css/index.scss";
import "@mantine/core/styles.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RecoilRoot>
      <MantineProvider defaultColorScheme={"auto"}>
        <App />
      </MantineProvider>
    </RecoilRoot>
  </StrictMode>,
);
