import React from "react";
import styles from "./unsubscribe.module.css";
import { api } from "@/services/api";
import Link from "next/link";
import { getUserSlug } from "@/app/posts/[slug]/page";

const unsubscribe = async (authorId, userId) => {
  const query = `?authorId=${authorId}&userId=${userId}`;
  const res = await fetch(api.unsubscribe(query), {
    method: "PUT",
    cache: "no-store",
  });
  const json = await res.json();
  if (!res.ok) {
    throw new Error("The unsubscribe link is corrupted!");
  }
  return json;
};

const UnsubscribePage = async ({ params }) => {
  const { authorId, userId } = params;
  const { author } = await unsubscribe(authorId, userId);
  if (!author) {
    throw new Error("The unsubscribe link is corrupted!");
  }
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.content}>
          <img
            src="https://cdni.iconscout.com/illustration/premium/thumb/mail-notification-2557119-2139454.png"
            width={160}
            alt="email"
          />
          <h2>Unsubscribed Successfully!</h2>
          <p>
            <b>
              Opting out of{" "}
              <Link href={`/dev/${getUserSlug(author)}`}>{author.name}</Link>{" "}
              newsletter
            </b>
          </p>
          <p className={styles.info}>
            You are no longer receiving email notifications&nbsp;from{" "}
            <Link href={`/dev/${getUserSlug(author)}`}>{author.name}</Link>{" "}
            whenever a new post is uploaded.
          </p>
        </div>
        <div className={styles.bottom}>Thank you</div>
      </div>
    </div>
  );
};

export default UnsubscribePage;
