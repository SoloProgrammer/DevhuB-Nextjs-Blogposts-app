import React from "react";
import styles from "./sideDrawer.module.css";

const SideDrawer = ({ pos = "left", minW = "30%", handleClose, children }) => {
  return (
    <div onClick={handleClose} className={`${styles.container} ${styles.show}`}>
      <div
        style={{ minWidth: minW }}
        className={`${styles.wrapper} ${styles[pos]}`}
      >
        <div className={styles.backIcon}>
          <span class="material-symbols-outlined">keyboard_backspace</span>
        </div>
        {children}
      </div>
    </div>
  );
};

export default SideDrawer;
