"use client";

import Loader from "@/components/Loader/Loader";
import React, { useEffect } from "react";

const HomePageLoading = () => {
  useEffect(() => {
    window?.scrollTo(0, 0);
  }, []);
  return (
    <div
      style={{
        width: "100%",
        height: "100dvw",
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        gap: "1rem",
      }}
    >
      <div style={{ marginTop: "4rem" }}></div>
      <Loader />
      Building 🛠️ your page on server, please wait ...
    </div>
  );
};

export default HomePageLoading;
