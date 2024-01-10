"use client";

import { useRouter } from "next/navigation";
import React from "react";

const PageProvider = ({ children, page, maxPage }) => {
  const router = useRouter();
  if (Number(page) < 0 || Number(page) > maxPage) {
    return router.push("/");
  }
  return <>{children}</>;
};

export default PageProvider;
