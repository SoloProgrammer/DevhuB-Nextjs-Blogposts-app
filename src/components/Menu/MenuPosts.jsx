import Image from "next/image";
import Link from "next/link";
import React from "react";
import styles from "./menu.module.css";
import { api } from "@/services/api";
import { getFormattedPostDate } from "@/utils/date";
import { getUserSlug } from "@/app/posts/[slug]/page";
import { getTrimmedString } from "@/helpers/string";

const getPosts = async (URL) => {
  try {
    const res = await fetch(URL);
    if (!res.ok) {
      throw new Error("Some error occured");
    }
    return res.json();
  } catch (error) {
    throw new Error("Some error occured", error.message);
  }
};

const MenuPosts = async ({ withImg }) => {
  const { popular_posts } = await getPosts(api.getPopularPosts());
  return (
    <div className={styles.items}>
      {popular_posts?.length > 0 &&
        popular_posts.map((post) => (
          <Link
            key={post.id}
            href={`/posts/${post.slug}`}
            className={styles.item}
          >
            {withImg && post.img && (
              <div className={styles.imgContainer}>
                <Image
                  src={`${post.img}`}
                  priority={false}
                  fill
                  alt="blog_img"
                />
              </div>
            )}
            <div className={styles.textContainer}>
              <div className={`${styles.category} ${styles[post.catSlug]}`}>
                {post.catSlug}
              </div>
              <div className={styles.title}>
                {getTrimmedString(post.title, 50)}
              </div>
              <div className={styles.detail}>
                <Link
                  href={`/dev/${getUserSlug(post.user)}`}
                  className={styles.user}
                >
                  {post.user.name}
                </Link>
                <span className={styles.date}>
                  &nbsp;-&nbsp;{getFormattedPostDate(post.createdAt)}
                </span>
              </div>
            </div>
          </Link>
        ))}
    </div>
  );
};

export default MenuPosts;
