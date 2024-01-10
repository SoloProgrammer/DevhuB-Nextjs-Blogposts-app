'use client'
import React from "react";
import { useSelector } from "react-redux";

const CategoryHeading = ({ category, styles }) => {
  const { categories } = useSelector((state) => state.categories);
  if(categories){
    if(!category) return <></>
  }
  return (
    <h1 className={`${styles.title} ${styles.category} ${styles[category]}`}>
      Blog/{category}
    </h1>
  );
};

export default CategoryHeading;
