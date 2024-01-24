"use client";
import hljs from "highlight.js";
import React, { useEffect } from "react";

const TextViewer = ({ classNames, content }) => {
  useEffect(() => {
    hljs.highlightAll();
  }, []);
  return (
    <div
      className={classNames.join(" ")}
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
};

export default TextViewer;
