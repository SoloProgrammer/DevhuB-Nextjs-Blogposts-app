import React from "react";
import styles from "./featured.module.css";
import Image from "next/image";
import Commonbtn from "../Commonbtn/Commonbtn";
import axios from "axios";
import { api } from "@/services/api";
import Link from "next/link";
import { getTrimmedString } from "@/helpers/string";
import { getUserSlug } from "@/app/posts/[slug]/page";

const getData = async () => {
  const response = await axios.get(api.getFeaturedPost());
  if (response.statusText !== "OK") {
    throw { Error: "Failed" };
  }
  return response.data.post[0];
};

const Featured = async () => {
  const post = await getData();
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>
        <b>One stop&nbsp;platform,</b>
        <br />
        <p>To discover stories and creative ideas for developers!</p>
      </h1>
      <div>
        <h1 className={styles.featuredHeading}>
          Top Story: The Highlight of the Week!
        </h1>
      </div>
      <div className={styles.post}>
        <div className={styles.imgContainer}>
          <Image src={post?.img} priority={false} fill alt="post1" />
        </div>
        <div className={styles.content}>
          <div className={styles.top}>
            <Link
              href={`/dev/${getUserSlug(post.user)}`}
              className={styles.authorInfo}
            >
              <div className={styles.authorImg_Container}>
                <Image src={post.user.image} fill alt="author_avatar" />
              </div>
              <span>{post.user.name}</span>
            </Link>
            <span className={styles.featuredText}>
              <span class="material-symbols-outlined">editor_choice</span>
              <i>Featured</i>
            </span>
          </div>
          <h1 className={styles.postTitle}>
            {post?.title.length > 50
              ? post?.title.substring(0, 50) + "..."
              : post?.title}
          </h1>
          <p className={styles.postDesc}>
            {getTrimmedString(post.desc, 210).replace(/<[^>]*>/g, "")}
          </p>
          <Link href={`/posts/${post.slug}`}>
            <Commonbtn text={"Read more"} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Featured;
