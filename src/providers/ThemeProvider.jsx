"use client";

import { useTheme } from "@/context/ThemeContext";
import React, { useEffect, useState } from "react";
import {
  ThemeProvider as MUIThemeProvider,
  createTheme,
} from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { SkeletonTheme } from "react-loading-skeleton";

const ThemeProvider = ({ children }) => {
  const { theme, skeletonTheme } = useTheme();

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
        <div className={theme}>
          <SkeletonTheme
            baseColor={skeletonTheme.color}
            highlightColor={skeletonTheme.highlightColor}
          >
            {children}
          </SkeletonTheme>
        </div>
      </MUIThemeProvider>
    );
};

export default ThemeProvider;
