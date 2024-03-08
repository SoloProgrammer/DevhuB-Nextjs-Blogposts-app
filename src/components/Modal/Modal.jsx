"use client";

import React, { useEffect } from "react";
import styles from "./modal.module.css";
import useModal from "@/Hooks/useModal";

const Modal = ({ children, handleHide, isCloseable = true }) => {
  const { isOpen, setOpen } = useModal();
  useEffect(() => {
    !isOpen &&
      setTimeout(() => {
        setOpen(true);
      }, 50);
  }, []);
  return (
    <div
      onClick={isCloseable ? handleHide : () => {}}
      className={`${styles.container} ${isOpen ? styles.show : ""}`}
    >
      <div className={styles.wrapper}>
        <div
          onClick={(e) => e.stopPropagation()}
          className={`${styles.inner} ${isOpen ? styles.show : ""} `}
        >
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
