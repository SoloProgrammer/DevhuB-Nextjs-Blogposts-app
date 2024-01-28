"use client";
import React from "react";
import styles from "./commentCount.module.css";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FaRegComment } from "react-icons/fa";

const CommentsCount = ({ post }) => {
  const { status } = useSession();
  const router = useRouter();
  const handleClick = (e) => {
    e.stopPropagation();
    e.preventDefault();
    console.log(status);
    router.push(
      status === "unauthenticated"
        ? "/login"
        : `/posts/${post.slug}?add-comment=true`
    );
  };
  return (
    <div onClick={handleClick} className={styles.commmnetsSection}>
      <span>
        <FaRegComment />
      </span>
      {post?.commentsCount > 0 ? (
        <>
          {post?.commentsCount}
          {post?.commentsCount > 1 ? " Comments" : " Comment"}
        </>
      ) : (
        <>Add comment</>
      )}
    </div>
  );
};

export default CommentsCount;
