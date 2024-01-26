import Menu from "@/components/Menu/Menu";
import Image from "next/image";
import React, { Suspense } from "react";
import styles from "./singleBlogPage.module.css";
import Comments from "@/components/Comments/Comments";
import { api } from "@/services/api";
import SavePostIcon from "@/components/SavePostIcon/SavePostIcon";
import { notFound } from "next/navigation";
import ExtraActions from "@/components/ExtraActions/ExtraActions";
import SinglePostLoadingSkeleton from "./loading";
import Link from "next/link";
import FollowUserBtn from "@/components/UserProfileComponents/FollowUserBtn/FollowUserBtn";
import FormattedDate from "@/components/FormattedDate/FormattedDate";
import axiosClient from "@/services/axiosClient";
import { TryCatchWrapper } from "@/helpers/ErrorHandler";
import TextViewer from "@/components/TextViewer/TextViewer";
import TagsList from "@/components/TagsList/TagsList";
import ReactionsMenu from "@/components/PostReactions/reactionsMenu/ReactionsMenu";
import ReactionsCount from "@/components/PostReactions/ReactionsCount/ReactionsCount";

const getSinglePost = TryCatchWrapper(async (slug) => {
  const { data } = await axiosClient.get(api.getSinglePost(slug));
  return data;
});

export const getUserSlug = (user) => {
  return `${user?.name.split(" ").join("_")}_${user?.id}`;
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
          <ReactionsCount/>
          {post.tags.length > 0 && (
            <TagsList tags={post.tags.map((tag) => tag.tag)} size="medium" />
          )}
          <div className={styles.top}>
            <div className={styles.user}>
              <Link href={`/dev/${getUserSlug(post.user)}`}>
                <div className={styles.userImg}>
                  <Image
                    src={post?.user?.image}
                    priority={false}
                    fill
                    alt="post_Img"
                  />
                </div>
              </Link>
              <div className={styles.userText}>
                <div>
                  <span className={styles.userName}>{post?.user?.name}</span>
                  <span style={{ marginLeft: "10px" }}>
                    <FollowUserBtn author={post.user} />
                  </span>
                </div>
                <span className={styles.date}>
                  <FormattedDate date={post?.createdAt} showTime={true} />
                </span>
              </div>
            </div>
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
            <TextViewer classNames={[styles.desc]} content={post.desc} />
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
        <ReactionsMenu post={post}/>
      </div>
    </Suspense>
  );
};

export default SingleBlogPage;
