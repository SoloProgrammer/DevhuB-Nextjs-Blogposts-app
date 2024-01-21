"use client";

import React from "react";
import Notfound from "@/components/NotFound/Notfound";
import { NOT_FOUND } from "@/helpers/ErrorHandler";
import styles from "./error.module.css";

const ErrorPage = ({ error, reset }) => {
  if (error.message === NOT_FOUND) {
    return (
      <>
        <Notfound />
      </>
    );
  } else
    return (
      <>
        <div>Something went wrong, Please try again later!</div>;
        <button onClick={reset}>Try again</button>
      </>
    );
};

export default ErrorPage;

export const ErrorBlock = ({ soure, refetch }) => {
  return (
    <div className={styles.errorBox}>
      <h2>Unable to get {soure} at the moment!</h2>
      <button onClick={refetch}>Try again</button>
    </div>
  );
};
