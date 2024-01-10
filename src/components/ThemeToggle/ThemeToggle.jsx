"use client";
import React from "react";
import styles from "./themeToggle.module.css";
import Image from "next/image";
import { ThemeStates } from "@/context/ThemeContext";
import { moonIcon, sunIcon } from "@/Icons/Icons";

const ThemeToggle = () => {
  const { theme, toggle } = ThemeStates();

  return (
    <div
      className={`${styles.container} ${theme}`}
      onClick={toggle}
      style={{ background: theme === "light" ? "rgb(1, 1, 26)" : "white" }}
    >
      <div
        style={{
          right: theme === "light" ? "5%" : "56%",
          background: theme === "light" ? "white" : "rgb(1, 1, 26)",
        }}
        className={styles.ball}
      ></div>
      <div className={styles.imgContainer}>
        <Image src={moonIcon} fill alt="theme_moon" />
      </div>{" "}
      <div className={styles.imgContainer}>
        <Image src={sunIcon} fill alt="theme_sun" />
      </div>
    </div>
  );
};

export default ThemeToggle;
