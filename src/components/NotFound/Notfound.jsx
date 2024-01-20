import Image from "next/image";
import React from "react";
import styles from "./notfound.module.css";

const Notfound = () => {
  const NOT_FOUND_IMG =
    "https://cdni.iconscout.com/illustration/premium/thumb/404-error-message-3702341-3119133.png?f=webp";
  return (
    <div className={styles.container}>
      <div className={styles.imgContainer}>
        <Image src={NOT_FOUND_IMG} alt="not-found-image" fill />
      </div>
      <small>
        THE PAGE YOU ARE LOOKING FOR MIGHT HAVE BEEN REEMOVED HAD ITS NAME
        CHANGED OR <br />IS TEMPORARLY UNAVAILABLE
      </small>
    </div>
  );
};

export default Notfound;
