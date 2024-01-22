"use client";

import { useTheme } from "@/context/ThemeContext";
import React from "react";
import { Toaster } from "react-hot-toast";

const ToastProvider = ({ children }) => {
  const { theme } = useTheme();
  return (
    <>
      {children}
      <Toaster
        toastOptions={{
          style: {
            color: theme === "dark" ? "#fff" : "#000",
            background: theme === "dark" ? "#35373d" : "#fff",
          },
        }}
      />
    </>
  );
};

export default ToastProvider;
