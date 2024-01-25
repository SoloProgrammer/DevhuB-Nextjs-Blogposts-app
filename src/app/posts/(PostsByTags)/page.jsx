import BlogList from "@/components/BlogList/BlogList";
import Menu from "@/components/Menu/Menu";
import React, { Suspense } from "react";
import styles from "./postsByTagPage.module.css";
import LoadingSkeleton from "./loading";
import TagHeading from "@/components/PostsByTagPageHeading/PostsByTagPageHeading";

const PostsByTagPage = ({ searchParams }) => {
  const tag = searchParams.tag;
  const page = searchParams.page || 1;

  return (
    <Suspense fallback={<LoadingSkeleton />}>
      <div>
        <TagHeading tagSlug={tag} />
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
