"use client";
import chroma from "chroma-js";
import Link from "next/link";
import React from "react";
import styles from "./tagsList.module.css";

const TagsList = ({ tags, size = "small", isColored = true }) => {
  return (
    <div className={styles.tagsWrapper}>
      {tags.map((tag) => {
        const color = chroma(tag.clr);
        return (
          <Link key={tag.id} href={`/posts?tag=${tag.slug}`}>
            <TagChip
              tag={tag}
              color={color}
              size={size}
              isColored={isColored}
            />
          </Link>
        );
      })}
    </div>
  );
};

export const TagChip = ({ tag, color, size, isColored }) => {
  const SIZES = {
    small: "12px",
    medium: "14px",
    large: "16px",
  };
  return (
    <span
      className={styles.tag}
      style={{
        "--color": isColored ? color : "var(--softTextColor)",
        "--background": isColored ? color.alpha(0.1).css() : "var(--softBg)",
        "--hover": color.alpha(isColored ? 0.2 : 0.1).css(),
        "--hover-color": color,
        "--size": SIZES[size],
      }}
    >
      #{tag.slug}
    </span>
  );
};

export default TagsList;
