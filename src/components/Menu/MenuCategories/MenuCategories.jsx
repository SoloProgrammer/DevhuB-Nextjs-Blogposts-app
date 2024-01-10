"use client";

import React from "react";
import styles from "./menuCategories.module.css";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { updateCategories } from "@/redux/slices/categoriesSlice";
import { getCategories } from "@/utils/services";

const MenuCategories = () => {
  const { categories } = useSelector((state) => state.categories);
  const dispatch = useDispatch();

  if (!categories) {
    getCategories()
      .then((data) => dispatch(updateCategories(data)))
      .catch(err => console.log("Error---",err));
  }

  return (
    <div className={styles.categories}>
      {categories?.map((cat) => {
        return (
          <Link
            key={cat.id}
            href={`/posts?category=${cat.slug}`}
            className={`${styles.category} ${styles[cat.slug]}`}
          >
            <div className={styles.catText}>{cat.title}</div>
          </Link>
        );
      })}
    </div>
  );
};

export default MenuCategories;
