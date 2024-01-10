"use client";

import React, { useEffect } from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import styles from "./loading.module.css";
import "react-loading-skeleton/dist/skeleton.css";
import { ThemeStates } from "@/context/ThemeContext";

const Loading = () => {
  const { skeletonTheme } = ThemeStates();
  useEffect(() => {
    window?.scrollTo(0, 0);
  }, []);
  return (
    <SkeletonTheme
      className={styles.mtop}
      baseColor={skeletonTheme.color}
      highlightColor={skeletonTheme.highlightColor}
    >
      <div className={styles.singlePostLoadingBox}>
        <div className={styles.leftLoadingSide}>
          <h1 className={styles.h1}>
            <Skeleton width={"100%"} height={"100%"} />
          </h1>
          <div className={styles.userLoadingBox}>
            <div className={styles.user}>
              <div className={styles.userImg}>
                <Skeleton circle width={"100%"} height={"100%"} />
              </div>
              <div className={styles.userInfo}>
                <Skeleton width={120} height={18} />
                <Skeleton width={180} height={11} />
              </div>
            </div>
            <div className={styles.icon}>
              <Skeleton width={20} height={25} />
            </div>
          </div>
          <Skeleton height={1} width={"100%"} />
          <div className={styles.actionLoadingBox}>
            <div className={styles.left}>
              <Skeleton borderRadius={"2rem"} width={120} height={25} />
            </div>
            <div className={styles.right}>
              <Skeleton borderRadius={"50%"} width={40} height={40} />
              <Skeleton borderRadius={"50%"} width={40} height={40} />
            </div>
          </div>
          <Skeleton height={1} width={"100%"} />
          <div className={styles.postLoadingDetail}>
            <div className={styles.postImg}>
              <Skeleton height={"100%"} width={"100%"} />
            </div>
            <div className={styles.lines}>
              <Skeleton count={5.8} />
              <Skeleton count={2.5} />
            </div>
          </div>
        </div>
        <MenuPostLoading />
      </div>
    </SkeletonTheme>
  );
};

export const MenuPostLoading = () => {
  return (
    <div className={styles.rightLoadingSide}>
      <div className={styles.menuPostsLoading}>
        <Skeleton width={100} height={10} />
        <Skeleton width={180} height={30} />
        <div className={styles.posts}>
          {new Array(4).fill(0).map((_, i) => {
            return (
              <div key={i} className={styles.post}>
                <div className={styles.lines}>
                  <Skeleton borderRadius={"2rem"} width={70} height={18} />
                  <Skeleton height={10} count={2} />
                </div>
                <div className={styles.img}>
                  <Skeleton width={100} height={55} borderRadius={".1rem"} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className={styles.categoriesLoading}>
        <Skeleton width={100} height={10} />
        <Skeleton width={180} height={30} />
        <div className={styles.categories}>
          <Skeleton width={87} height={43} borderRadius={".8rem"} />
          <Skeleton width={87} height={43} borderRadius={".8rem"} />
          <Skeleton width={87} height={43} borderRadius={".8rem"} />
          <Skeleton width={87} height={43} borderRadius={".8rem"} />
          <Skeleton width={87} height={43} borderRadius={".8rem"} />
          <Skeleton width={87} height={43} borderRadius={".8rem"} />
        </div>
      </div>
    </div>
  );
};

export default Loading;
