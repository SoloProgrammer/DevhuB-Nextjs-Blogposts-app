import BlogList from "@/components/BlogList/BlogList";
import Menu from "@/components/Menu/Menu";
import React, { Suspense } from "react";
import styles from "./categoryPage.module.css";
import Loading from "./loading";
import CategoryHeading from "@/components/CategoryPageHeading/CategoryHeading";

const CategoryPage = ({ searchParams }) => {
  const category = searchParams.category;
  const page = searchParams.page || 1;

  return (
    <Suspense fallback={<Loading category={category} />}>
      <div className={`${styles.container}`}>
        <CategoryHeading category={category} styles={styles} />
        <div className={styles.content}>
          <BlogList
            key={`${category}BlogList`}
            page={page}
            category={category}
            showBtn={false}
          />
          <Menu />
        </div>
      </div>
    </Suspense>
  );
};

export default CategoryPage;
