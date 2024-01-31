"use client";

import React, { useEffect } from "react";
import { MenuPostLoading } from "../[slug]/loading";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { useTheme } from "@/context/ThemeContext";
import styles from "./postsByTagPageLoading.module.css";

const LoadingSkeleton = () => {
  return (
    <div>
      <div className={styles.text}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "15px",
          }}
        >
          <Skeleton height={40} width={40} borderRadius={"5px"}/>
          <Skeleton height={40} width={150} />
        </div>
        <Skeleton width={"100%"} height={15} />
        <Skeleton width={"50%"} height={15} />
      </div>
      <PostsListLoadingSkeleton />
    </div>
  );
};

export const PostsListLoadingSkeleton = () => {
  useEffect(() => {
    window?.scrollTo(0, 0);
  }, []);
  const { skeletonTheme } = useTheme();

  return (
    <SkeletonTheme
      baseColor={skeletonTheme.color}
      highlightColor={skeletonTheme.highlightColor}
    >
      <div className={styles.loadingContainer}>
        <div className={styles.postListsLoading}>
          <h1>Recent Posts</h1>
          <div className={styles.postsList}>
            {new Array(4).fill(0).map((_, i) => {
              return (
                <div key={i} className={styles.post}>
                  <div className={styles.postImg}>
                    <Skeleton
                      width={"100%"}
                      height={190}
                      borderRadius={".1rem"}
                    />
                  </div>
                  <div className={styles.lines}>
                    <div className={styles.top}>
                      <Skeleton width={"100%"} height={15} />
                    </div>
                    <div className={styles.bottom}>
                      <h3>
                        <Skeleton />
                      </h3>
                      <Skeleton height={10} width={"100%"} />
                      <Skeleton height={10} width={"100%"} />
                      <Skeleton height={10} width={"100%"} />
                      <Skeleton height={10} width={"50%"} />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className={styles.menuPostsLoading}>
          <MenuPostLoading />
        </div>
      </div>
    </SkeletonTheme>
  );
};

export default LoadingSkeleton;
