"use client"
import { getFormattedPostDate } from "@/utils/date";
import React from "react";

const FormattedDate = ({ date, showTime = false }) => {
  return <>{getFormattedPostDate(date, showTime)}</>;
};

export default FormattedDate;
