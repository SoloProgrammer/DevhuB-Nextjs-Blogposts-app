"use client";
import React from "react";
import Notfound from "@/components/NotFound/Notfound";
import { NOT_FOUND } from "@/helpers/ErrorHandler";

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
        <div>Something went wrong, Please try again!</div>;
        <button onClick={reset}>Try again</button>
      </>
    );
};

export default ErrorPage;
