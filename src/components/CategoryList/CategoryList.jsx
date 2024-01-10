import React from "react";
import styles from "./categoryList.module.css";
import Link from "next/link";
import Image from "next/image";
import { api } from "@/utils/api";

const getData = async () => {
  const res = await fetch(api.getCategories(), { cache: "no-store" });
  if (!res.ok) {
    throw new Error("Failed!");
  }
  return res.json();
};

const CategoryList = async () => {
  const { categories: data } = await getData();
  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <h2>Popular Categories</h2>
      </div>
      <div className={styles.categories}>
        {data?.map((category) => {
          return (
            <Link
              key={category._id}
              href={`/posts?category=${category.slug}`}
              className={`${styles.category} ${styles[category.slug]}`}
            >
              {category.img && (
                <div className={styles.imgContainer}>
                  <Image src={category.img} fill alt="cat_image" />
                </div>
              )}
              <div className={styles.catText}>{category.title}</div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default CategoryList;
