import BlogList from "@/components/BlogList/BlogList";
import Menu from "@/components/Menu/Menu";
import React, { Suspense } from "react";
import styles from "./postsByTagPage.module.css";
import Loading from "./loading";
import CategoryHeading from "@/components/PostsByTagPageHeading/PostsByTagPageHeading";

const PostsByTagPage = ({ searchParams }) => {
  const tag = searchParams.tag;
  const page = searchParams.page || 1;

  return (
    <Suspense fallback={<Loading />}>
      <div>
        <CategoryHeading tagSlug={tag} />
        <div className={styles.content}>
          <BlogList
            key={`${tag}BlogList`}
            page={page}
            tag={tag}
            showBtn={false}
          />
          <Menu />
        </div>
      </div>
    </Suspense>
  );
};

export default PostsByTagPage;
