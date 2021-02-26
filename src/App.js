import React from "react";
import { Grommet } from "grommet";
import { BrowserRouter as Router } from "react-router-dom";
import { AppRouter } from "./route.js";

const theme = {
  global: {
    colors: {
      brand: "#228BE6",
      lightGrey: "#e0e0e0",
    },
    font: {
      family: "Roboto",
      size: "18px",
      height: "20px",
    },
  },
};

export default function App() {
  return (
    <Grommet theme={theme}>
      <Router basename="/repos">
        <AppRouter />
      </Router>
    </Grommet>
  );
}
