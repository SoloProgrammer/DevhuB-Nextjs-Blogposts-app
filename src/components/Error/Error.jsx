"use client";

import React from "react";
import styles from "./error.module.css";

const ErrorPage = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        alignItems: "center",
        gap: "20px",
      }}
    >
      <img
        src="https://cdni.iconscout.com/illustration/premium/thumb/cat-unplugged-cable-from-server-6904749-5673626.png"
        alt="error"
        width={260}
      />
      <ErrorBlock soure={"posts"} refetch={() => window.location.reload()} />
    </div>
  );
};

export default ErrorPage;

export const ErrorBlock = ({
  soure,
  refetch = () => window.location.reload(),
}) => {
  return (
    <div className={styles.errorBox}>
      <h2>Unable to get {soure} at the moment!</h2>
      <button onClick={refetch}>Try again</button>
    </div>
  );
};
