import Menu from "@/components/Menu/Menu";
import Image from "next/image";
import React, { Suspense } from "react";
import styles from "./singleBlogPage.module.css";
import Comments from "@/components/Comments/Comments";
import { api } from "@/utils/api";
import { getFormattedPostDate } from "@/utils/date";
import SavePostIcon from "@/components/SavePostIcon/SavePostIcon";
import { notFound } from "next/navigation";
import ExtraActions from "@/components/ExtraActions/ExtraActions";
import SinglePostLoadingSkeleton from "./loading";
import Link from "next/link";
import FollowUserBtn from "@/components/UserProfileComponents/FollowUserBtn/FollowUserBtn";

const getSinglePost = async (slug) => {
  const res = await fetch(api.getSinglePost(slug), { cache: "no-store" });
  if (!res.ok) {
    throw new Error("Something went wrong");
  }
  return res.json();
};

export const getUserSlug = (user) => {
  return `${user.name.split(" ").join("_")}_${user.id}`;
};
export const extractRawUserIdFromSlug = (userSlugId) => {
  return userSlugId.split("_").at(-1);
};

const SingleBlogPage = async ({ params }) => {
  const { slug } = params;
  const { post } = await getSinglePost(slug);
  if (!post) notFound();

  return (
    <Suspense fallback={<SinglePostLoadingSkeleton />}>
      <div className={styles.container}>
        <div className={styles.infoContainer}>
          <h1 className={styles.title}>{post.title}</h1>
          <div className={styles.top}>
            <Link
              href={`/dev/${getUserSlug(post.user)}`}
              className={styles.user}
            >
              <div className={styles.userImg}>
                <Image
                  src={post?.user?.image}
                  priority={false}
                  fill
                  alt="post_Img"
                />
              </div>
              <div className={styles.userText}>
                <div>
                  <span className={styles.userName}>{post?.user?.name}</span>
                  <span style={{ marginLeft: "10px" }}>
                    <FollowUserBtn author={post.user} />
                  </span>
                </div>
                <span className={styles.date}>
                  {getFormattedPostDate(post.createdAt)}
                </span>
              </div>
            </Link>
            <SavePostIcon slug={slug} postId={post.id} />
          </div>
          <ExtraActions
            commentsCount={post?.commentsCount}
            slug={post.slug}
            postTitle={post.title}
            postImg={post.img}
            postAuthor={post.user}
          />
          <div className={styles.imgContainer}>
            <Image src={post.img} priority={false} fill alt="post_Img" />
          </div>
          <div className={styles.textContainer}>
            <div
              className={styles.desc}
              dangerouslySetInnerHTML={{ __html: post.desc }}
            />
          </div>
          <div id="comments">
            <Comments
              postSlug={post.slug}
              commentsCount={post?.commentsCount}
            />
          </div>
        </div>
        <div className={styles.Menu}>
          <Menu />
        </div>
      </div>
    </Suspense>
  );
};

export default SingleBlogPage;
