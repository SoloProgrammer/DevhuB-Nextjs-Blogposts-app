import React, { Suspense } from "react";
import styles from "./homepage.module.css";
import Featured from "@/components/Featured/Featured";
import CategoryList from "@/components/CategoryList/CategoryList";
import BlogList from "@/components/BlogList/BlogList";
import Menu from "@/components/Menu/Menu";
import HomePageLoading from "./loading";
import PageWrapper from "@/components/wrappers/PageWrapper";

const Home = ({ searchParams }) => {
  let page = searchParams.page || 1;
  return (
    <PageWrapper>
      <Suspense fallback={<HomePageLoading />}>
        <div className={styles.container}>
          <Featured />
          <CategoryList />
          <div className={styles.content}>
            <BlogList page={page} key={"allblogsList"} />
            <Menu />
          </div>
        </div>
      </Suspense>
    </PageWrapper>
  );
};

export default Home;
