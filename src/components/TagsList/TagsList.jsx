"use client";
import chroma from "chroma-js";
import Link from "next/link";
import React from "react";
import styles from "./tagsList.module.css";
import { motion } from "framer-motion";
import { anim } from "@/utils/framer";

const TagsList = ({ tags, size = "small", isColored = true }) => {
  return (
    <div className={styles.tagsWrapper}>
      {tags.map((tag, i) => {
        const color = chroma(tag.clr);
        return (
          <Link key={tag.id} href={`/posts?tag=${tag.slug}`}>
            <TagChip
              i={i}
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

export const TagChip = ({ tag, color, size, isColored, i }) => {
  const SIZES = {
    small: "12px",
    medium: "14px",
    large: "16px",
  };

  const slide = {
    initial: {
      opacity: 0,
      x: -(i * 10),
    },
    inview: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring", // You can use different types of transitions
        delay: i * 0.1, // Adjust duration as needed
      },
    },
  };
  
  return (
    <motion.span
      {...anim(slide)}
      viewport={{ once: true }}
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
    </motion.span>
  );
};

export default TagsList;
