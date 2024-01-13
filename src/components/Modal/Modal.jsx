"use client";

import React, { useEffect } from "react";
import styles from "./modal.module.css";
import useModal from "@/Hooks/useModal";

const Modal = ({ children, handleHide, isCloseable = true }) => {
  const [show, setShow] = useModal();
  useEffect(() => {
    !show &&
      setTimeout(() => {
        setShow(true);
      }, 50);
  }, []);
  return (
    <div
      onClick={isCloseable ? handleHide : () => {}}
      className={`${styles.container} ${show ? styles.show : ""}`}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`${styles.inner} ${show ? styles.show : ""}`}
      >
        {children}
      </div>
    </div>
  );
};

export default Modal;
