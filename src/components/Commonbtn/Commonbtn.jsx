"use client";

import React from "react";
import styles from "./commonbtn.module.css";
import { defaultFunc } from "@/GoogleIcons/Icons";

const Commonbtn = ({
  text,
  size = "medium",
  isAnimate = true,
  icon,
  handleFunc = defaultFunc,
  disabled = false,
}) => {
  const sizes = {
    small: ".85rem",
    medium: "1.1rem",
    large: "1.5rem",
  };
  return (
    <button
      disabled={disabled}
      onClick={handleFunc}
      style={{ fontSize: sizes[size] }}
      className={`${styles.btn} ${isAnimate && styles.animateBtn}`}
    >
      {text}
      {icon}
    </button>
  );
};

export default Commonbtn;
