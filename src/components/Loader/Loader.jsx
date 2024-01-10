"use client";
import React from "react";
import styles from "./loader.module.css";

const Loader = ({ size = "large" }) => {
  let sizes = {
    tooMini: "15px",
    mini: "20px",
    small: "30px",
    medium: "40px",
    large: "48px",
  };
  return (
    <div
      style={{
        width: sizes[size],
        height: sizes[size],
        borderWidth: size === "mini" || size === "tooMini" ? "3px" : "5px",
      }}
      className={styles.loader}
    ></div>
  );
};

export default Loader;
