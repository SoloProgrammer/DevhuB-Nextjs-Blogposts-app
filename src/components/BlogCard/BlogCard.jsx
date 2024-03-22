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
import CommentsCount from "./CommentCount/CommentCount";
import { Pop, Reveal } from "react-animate-components-ts";

const BlogCard = ({ post }) => {
  const totalReactionsCount = useMemo(() => {
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
          <Reveal overlayBg="var(--main-color)">
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
          </Reveal>
          <SavePostIcon slug={post?.slug} postId={post?.id} showMsg={false} />
        </div>
        <Link
          href={`/posts/${post?.slug}`}
          style={{ flexGrow: 1, display: "flex", flexDirection: "column" }}
        >
          <Reveal overlayBg="var(--main-color)">
            <h3 style={{ marginBottom: "1rem" }} className={styles.postTitle}>
              {getTrimmedString(post?.title, 38)}
            </h3>
          </Reveal>
          <TagsList tags={post?.tags.map((tag) => tag.tag)} />
          <Reveal>
            <p className={styles.postDesc}>
              {getTrimmedString(post?.desc, 130).replace(/<[^>]*>/g, "")}
            </p>
          </Reveal>
          <div className={styles.reaactionsGroup}>
            <div className={styles.reactionsSection}>
              <AvatarGroup max={5}>
                {reactions.map((reaction) => {
                  return Object.keys(post?.reactions).includes(reaction.type) &&
                    post?.reactions[reaction.type].length > 0 ? (
                    <Avatar
                      key={reaction.type}
                      sx={{ width: 18, height: 18 }}
                      alt={reaction.type}
                      src={reaction.src}
                    />
                  ) : (
                    <></>
                  );
                })}
              </AvatarGroup>
              {totalReactionsCount > 0 && (
                <span className={styles.reactionsCount}>
                  {totalReactionsCount}
                  &nbsp;
                  {totalReactionsCount > 1 ? `Reactions` : "Reaction"}
                </span>
              )}
            </div>
            <CommentsCount post={post} />
          </div>
        </Link>
      </div>
    </div>
  );
};

export default BlogCard;
