"use client";
import React from "react";
import { USER_NOT_FOUND } from "./page";
import { notFound } from "next/navigation";

const Error = ({ error, reset }) => {
  if (error.message === USER_NOT_FOUND) {
    return notFound();
  }
  return (
    <>
      <div>Something went wrong, Please try again!</div>;
      <button onClick={reset}>Try again</button>
    </>
  );
};

export default Error;
