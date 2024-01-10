import React from "react";
import styles from "./cfrmDelAlertBox.module.css";
import Loader from "../Loader/Loader";

const CrfmDelAlertBox = ({
  title,
  desc,
  btnText,
  handleCancel,
  handleSubmit,
  loading
}) => {
  return (
    <div className={styles.outerBody}>
      <div className={styles.title}>
        <h4>{title}</h4>
      </div>
      <div className={styles.body}>
        <div className={styles.desc}>
          <p>{desc}</p>
        </div>
        <div className={styles.actionBtns}>
          <button disabled={loading} className={styles.cancel} onClick={handleCancel}>
            Cancel
          </button>
          <button
            disabled={loading}
            className={styles.action}
            onClick={handleSubmit}
          >
            {loading ? <Loader size="tooMini" /> : btnText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CrfmDelAlertBox;
