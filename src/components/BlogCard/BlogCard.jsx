import React, { useMemo } from "react";
import styles from "./blogCard.module.css";
import Image from "next/image";
import Link from "next/link";
import SavePostIcon from "../SavePostIcon/SavePostIcon";
import { getTrimmedString } from "@/helpers/string";
import moment from "moment";
import TagsList from "../TagsList/TagsList";
import { getUserSlug } from "@/app/posts/[slug]/page";
import Avatar from "@mui/material/Avatar";
import AvatarGroup from "@mui/material/AvatarGroup";
import { reactions } from "../PostReactions/data";
import { FaRegComment } from "react-icons/fa";

const BlogCard = ({ post }) => {
  const icon = (
    <span style={{ fontSize: ".9rem" }} className="material-symbols-outlined">
      arrow_forward
    </span>
  );

  const getTotalReactionsCount = useMemo(() => {
    return Object.values(post?.reactions).flat(1).length;
  }, [post?.reactions]);

  return (
    <div className={styles.post}>
      <div className={styles.imgContainer}>
        <Link href={`/posts/${post?.slug}`} style={{ flexGrow: 1 }}>
          <Image src={post?.img} priority={false} fill alt="alt" />
        </Link>
      </div>
      <div className={styles.postTextContent}>
        <div className={styles.seperator}>
          <div className={styles.details}>
            <span className={styles.date}>
              {moment(post?.createdAt).fromNow()}
              {" - "}&nbsp;
            </span>
            <Link
              href={`/dev/${getUserSlug(post?.user)}`}
              className={styles.postAuthor}
            >
              {post?.user.name}
            </Link>
          </div>
          <SavePostIcon slug={post?.slug} postId={post?.id} />
        </div>
        <Link
          href={`/posts/${post?.slug}`}
          style={{ flexGrow: 1, display: "flex", flexDirection: "column" }}
        >
          <h3 style={{ marginBottom: "1rem" }} className={styles.postTitle}>
            {getTrimmedString(post?.title, 38)}
          </h3>
          <TagsList tags={post?.tags.map((tag) => tag.tag)} />
          <p className={styles.postDesc}>
            {getTrimmedString(post?.desc, 130).replace(/<[^>]*>/g, "")}
          </p>
          <div className={styles.reaactionsGroup}>
            <div className={styles.reactionsSection}>
              <AvatarGroup max={5}>
                {reactions.map((reaction) => {
                  return Object.keys(post?.reactions).includes(reaction.type) &&
                    post?.reactions[reaction.type].length > 0 ? (
                    <Avatar
                      sx={{ width: 20, height: 20 }}
                      alt={reaction.type}
                      src={reaction.src}
                    />
                  ) : (
                    <></>
                  );
                })}
              </AvatarGroup>
              {getTotalReactionsCount() > 0 && (
                <span className={styles.reactionsCount}>
                  {getTotalReactionsCount()}
                  &nbsp;
                  {getTotalReactionsCount() > 1 ? `Reactions` : "Reaction"}
                </span>
              )}
            </div>
            <Link
              href={`/posts/${post?.slug}?add-comment=true`}
              className={styles.commmnetsSection}
            >
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
            </Link>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default BlogCard;
