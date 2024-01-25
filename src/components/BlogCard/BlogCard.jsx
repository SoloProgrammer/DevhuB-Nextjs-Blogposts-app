import React from "react";
import styles from "./blogCard.module.css";
import Image from "next/image";
import Commonbtn from "../Commonbtn/Commonbtn";
import Link from "next/link";
import SavePostIcon from "../SavePostIcon/SavePostIcon";
import { getTrimmedString } from "@/helpers/string";
import moment from "moment";
import TagsList from "../TagsList/TagsList";
import { getUserSlug } from "@/app/posts/[slug]/page";

const BlogCard = ({ post, showBtn = true }) => {
  const icon = (
    <span style={{ fontSize: ".9rem" }} className="material-symbols-outlined">
      arrow_forward
    </span>
  );

  return (
    <div className={styles.post}>
      <div className={styles.imgContainer}>
        <Link href={`/posts/${post.slug}`} style={{ flexGrow: 1 }}>
          <Image src={post.img} priority={false} fill alt="alt" />
        </Link>
      </div>
      <div className={styles.postTextContent}>
        <div className={styles.seperator}>
          <div className={styles.details}>
            <span className={styles.date}>
              {moment(post.createdAt).fromNow()}
              {" - "}&nbsp;
            </span>
            <Link
              href={`/dev/${getUserSlug(post.user)}`}
              className={styles.postAuthor}
            >
              {post.user.name}
            </Link>
          </div>
          <SavePostIcon slug={post.slug} postId={post.id} />
        </div>
        <Link
          href={`/posts/${post.slug}`}
          style={{ flexGrow: 1, display: "flex", flexDirection: "column" }}
        >
          <h3 style={{ marginBottom: "1rem" }} className={styles.postTitle}>
            {getTrimmedString(post.title, 38)}
          </h3>
          <TagsList tags={post.tags.map((tag) => tag.tag)} />
          <p className={styles.postDesc}>
            {getTrimmedString(post.desc, 150).replace(/<[^>]*>/g, "")}
          </p>
          {showBtn && (
            <Link href={`/posts/${post.slug}`}>
              <Commonbtn text={"Read more"} size="small" icon={icon} />
            </Link>
          )}
        </Link>
      </div>
    </div>
  );
};

export default BlogCard;
