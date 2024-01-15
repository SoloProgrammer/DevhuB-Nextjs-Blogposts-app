import React from "react";
import styles from "./blogList.module.css";
import Pagination from "../Pagination/Pagination";
import BlogCard from "../BlogCard/BlogCard";
import { api } from "@/services/api";
import PageProvider from "@/providers/PageProvider";
import Commonbtn from "../Commonbtn/Commonbtn";
import Link from "next/link";

const getPosts = async (page, category) => {
  const query = `?page=${page}&category=${category}`;
  const res = await fetch(api.getPosts(query), { cache: "no-store" });
  if (!res.ok) {
    throw new Error("Fething Post Failed!");
  }
  return res.json();
};

const BlogList = async ({ page, category = "", showBtn = true }) => {
  const { posts, postsCount } = await getPosts(page, category);
  const POSTS_PER_PAGE = 4;
  let maxPage = Math.ceil(postsCount / POSTS_PER_PAGE) || 1;

  let hasPrev = page > 1 && page <= maxPage;
  let hasNext = page * POSTS_PER_PAGE < postsCount;

  return (
    <PageProvider page={page} maxPage={maxPage}>
      <div className={styles.container}>
        {category && !posts?.length ? (
          <div className={styles.noPostsContainer}>
            <h1>No posts yet!</h1>
            <Link href={"/write"}>
              <Commonbtn
                size="small"
                text={`Write the first ${category} - category post!`}
                isAnimate={false}
              />
            </Link>
          </div>
        ) : (
          <>
            <h1 className={styles.title}>Recent Posts</h1>
            <div className={styles.posts}>
              {posts?.map((post) => {
                return (
                  <BlogCard post={post} key={post._id} showBtn={showBtn} />
                );
              })}
            </div>
            <Pagination page={page} hasPrev={hasPrev} hasNext={hasNext} />
          </>
        )}
      </div>
    </PageProvider>
  );
};

export default BlogList;
