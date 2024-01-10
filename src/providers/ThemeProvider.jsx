"use client";
import { ThemeStates } from "@/context/ThemeContext";
import React, { useEffect, useState } from "react";
import {
  ThemeProvider as MUIThemeProvider,
  createTheme,
} from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

const ThemeProvider = ({ children }) => {
  const { theme } = ThemeStates();

  const Theme = createTheme({
    palette: {
      mode: theme,
    },
  });
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (mounted)
    return (
      <MUIThemeProvider theme={Theme}>
        <CssBaseline />
        <div className={theme}>{children}</div>
      </MUIThemeProvider>
    );
};

export default ThemeProvider;
