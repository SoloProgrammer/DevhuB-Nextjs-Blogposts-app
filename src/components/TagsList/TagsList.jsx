"use client";
import chroma from "chroma-js";
import Link from "next/link";
import React from "react";
import styles from "./tagsList.module.css";

const TagsList = ({ tags, size = "small" }) => {
  return (
    <div className={styles.tagsWrapper}>
      {tags.map((tag) => {
        const color = chroma(tag.clr);
        return (
          <Link href={`/tags?tag=${tag.slug}`}>
            <TagChip tag={tag} color={color} size={size} />
          </Link>
        );
      })}
    </div>
  );
};

export const TagChip = ({ tag, color, size }) => {
  const SIZES = {
    small: "0.7rem",
    medium: "0.8rem",
    large: "0.85rem",
  };
  return (
    <span
      className={styles.tag}
      style={{
        "--color": color,
        "--background": color.alpha(0.1).css(),
        "--hover": color.alpha(0.2).css(),
        "--size": SIZES[size],
      }}
    >
      #{tag.slug}
    </span>
  );
};

export default TagsList;
