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
  URL,
  title,
  media,
  quote = "Dev-blog, A NetxJs Blog post web platform/app for developers community!",
}) => {
  const handleCopyToCliBoard = (e) => {
    navigator.clipboard.writeText(URL);
    e.target.innerText = "done_all";
    showToast("Post link copied to clipboard!");
    e.target.disabled = true;
    setTimeout(() => {
      e.target.disabled = false;
      e.target.innerText = "content_copy";
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
          <FacebookIcon size={32}  />
        </FacebookShareButton>
        <LineShareButton url={URL} blankTarget={true} title={title}>
          <LineIcon size={32}  />
        </LineShareButton>
        <LinkedinShareButton url={URL} blankTarget={true}>
          <LinkedinIcon size={32}  />
        </LinkedinShareButton>
        <RedditShareButton url={URL} blankTarget={true} title={title}>
          <RedditIcon size={32}  />
        </RedditShareButton>
        <PinterestShareButton url={URL} blankTarget={true} media={media}>
          <PinterestIcon size={32}  />
        </PinterestShareButton>
        <TwitterShareButton url={URL} blankTarget={true} title={title}>
          <TwitterIcon size={32}  />
        </TwitterShareButton>
        <WhatsappShareButton
          url={URL}
          blankTarget={true}
          title={title}
          separator=":: "
        >
          <WhatsappIcon size={32}  />
        </WhatsappShareButton>
      </div>
      <div className={styles.seperator}>
        <b>OR</b>
      </div>
      <div className={styles.input}>
        <input type="text" value={URL} readOnly />
        <button
          onClick={handleCopyToCliBoard}
          className="material-symbols-outlined"
        >
          content_copy
        </button>
      </div>
    </div>
  );
};

export default ShareIconsModal;
