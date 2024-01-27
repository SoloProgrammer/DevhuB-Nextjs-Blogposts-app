"use client";
import { ErrorBlock } from "@/components/Error/Error";
import React from "react";

const Error = () => {
  return (
    <div>
      Somthing went wrong, Try again
      <ErrorBlock soure={"posts"} />
    </div>
  );
};

export default Error;
