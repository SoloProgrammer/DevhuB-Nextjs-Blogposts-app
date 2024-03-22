import React from "react";
import styles from "./blogList.module.css";
import Pagination from "../Pagination/Pagination";
import BlogCard from "../BlogCard/BlogCard";
import { api } from "@/services/api";
import PageProvider from "@/providers/PageProvider";
import Commonbtn from "../Commonbtn/Commonbtn";
import Link from "next/link";
import { Skate } from "react-animate-components-ts";

const getPosts = async (page, tag) => {
  const query = `?page=${page}&tag=${tag}`;
  const res = await fetch(api.getPosts(query), { cache: "no-store" });
  if (!res.ok) {
    throw new Error("Fething Post Failed!");
  }
  return res.json();
};

const BlogList = async ({ page, tag = "" }) => {
  const { posts, metadata } = await getPosts(page, tag);
  const { totalPages, hasNext } = metadata;
  let hasPrev = page > 1;

  return (
    <PageProvider page={page} maxPage={totalPages}>
      <div className={styles.container}>
        {tag && !posts?.length ? (
          <div className={styles.noPostsContainer}>
            <h1>No posts yet!</h1>
            <Link href={"/write"}>
              <Commonbtn
                size="small"
                text={`Write first post on ${tag}`}
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
                  <Skate key={post.id} iSkate={-100}>
                    <BlogCard post={post} key={post._id} />
                  </Skate>
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
