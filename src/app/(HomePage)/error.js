"use client";
import ErrorPage from "@/components/Error/Error";
import React from "react";

const Error = () => {
  return <ErrorPage key={new Date().getTime()} />;
};

export default Error;
