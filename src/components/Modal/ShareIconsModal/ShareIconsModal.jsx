"use client";

import React from "react";
import {
  FacebookShareButton,
  FacebookIcon,
  LineShareButton,
  LineIcon,
  LinkedinShareButton,
  LinkedinIcon,
  RedditShareButton,
  RedditIcon,
  PinterestShareButton,
  PinterestIcon,
  TwitterShareButton,
  TwitterIcon,
  WhatsappShareButton,
  WhatsappIcon,
} from "next-share";
import styles from "./shareIconsModal.module.css";
import { showToast } from "@/utils/toast";

const ShareIconsModal = ({
  URL = "https://dev-blog-a-nextjs-app.vercel.app/posts/top-30-javascript-interview-questions-and-answers-for-2024",
  title,
  media,
  quote = "Dev-blog, A NetxJs Blog post web platform/app for developers community!",
}) => {
  const handleCopyToCliBoard = (e) => {
    navigator.clipboard.writeText(URL);
    e.target.innerText = "Copied!";
    showToast("Post link copied to clipboard!");
    setTimeout(() => {
      e.target.innerText = "Copy";
    }, 3000);
  };
  return (
    <div className={styles.container} onClick={(e) => e.stopPropagation()}>
      <h3>🔗 Share Post Via</h3>
      <div className={styles.icons}>
        <FacebookShareButton
          url={URL}
          blankTarget={true}
          quote={quote}
          hashtag={"#devBlog"}
        >
          <FacebookIcon size={32} round />
        </FacebookShareButton>
        <LineShareButton url={URL} blankTarget={true} title={title}>
          <LineIcon size={32} round />
        </LineShareButton>
        <LinkedinShareButton url={URL} blankTarget={true}>
          <LinkedinIcon size={32} round />
        </LinkedinShareButton>
        <RedditShareButton url={URL} blankTarget={true} title={title}>
          <RedditIcon size={32} round />
        </RedditShareButton>
        <PinterestShareButton url={URL} blankTarget={true} media={media}>
          <PinterestIcon size={32} round />
        </PinterestShareButton>
        <TwitterShareButton url={URL} blankTarget={true} title={title}>
          <TwitterIcon size={32} round />
        </TwitterShareButton>
        <WhatsappShareButton
          url={URL}
          blankTarget={true}
          title={title}
          separator=":: "
        >
          <WhatsappIcon size={32} round />
        </WhatsappShareButton>
      </div>
      <div className={styles.seperator}>
        <b>OR</b>
      </div>
      <div className={styles.input}>
        <input
          type="text"
          value={
            "http://localhost:3000/posts/top-30-javascript-interview-questions-and-answers-for-2024"
          }
          readOnly
        />
        <button onClick={handleCopyToCliBoard}>Copy</button>
      </div>
    </div>
  );
};

export default ShareIconsModal;
