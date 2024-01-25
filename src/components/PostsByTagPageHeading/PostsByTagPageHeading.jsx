"use client";
import React from "react";
import { useSelector } from "react-redux";
import styles from "./postsByTagPageHeading.module.css";

const CategoryHeading = ({ tagSlug }) => {
  const { tags } = useSelector((state) => state.tags);
  let tag = tags.filter((tag) => tag.slug === tagSlug)[0];
  console.log(tags, tag);
  if (tags) {
    if (!tag) return <></>;
  }
  return (
    <div
      style={{
        "--color": tag.clr,
      }}
      className={styles.tagHeader}
    >
      <div className={styles.tagInfo}>
        {tag.icon && <img src={tag.icon} alt={tag.slug} width={40} />}
        <h1>#{tag.title}</h1>
      </div>
      <div className={styles.tagDesc}>{tag.desc}</div>
    </div>
  );
};

export default CategoryHeading;
