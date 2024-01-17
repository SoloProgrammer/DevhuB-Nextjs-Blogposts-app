"use client"
import React from "react";

const Error = ({ error }) => {
  return <div>{error.message}</div>;
};

export default Error;
