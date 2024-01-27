"use client";

import React, { useEffect, useState } from "react";
import { FaRegComment } from "react-icons/fa";
import SavePostIcon from "../../SavePostIcon/SavePostIcon";
import styles from "./reactionsMenu.module.css";
import { Link } from "react-scroll";
import { useDispatch, useSelector } from "react-redux";
import { setPost, updateReactions } from "@/redux/slices/postSlice";
import { useRouter, useSearchParams } from "next/navigation";
import { reactions } from "../data";
import { api } from "@/services/api";

const ReactionsMenu = ({ post }) => {
  const { post: storedPost } = useSelector((state) => state.post);
  const { user } = useSelector((state) => state.auth);

  const router = useRouter();

  const params = useSearchParams();
  const dispatch = useDispatch();

  const focusTextArea = () => {
    let textArea = document.querySelector("textarea");
    textArea.focus();
  };

  useEffect(() => {
    dispatch(setPost(post));
    if (params.get("add-comment")) focusTextArea();

    const documentClickHandler = () => setShow(false);
    window.addEventListener("click", documentClickHandler);
    return () => {
      window.removeEventListener("click", documentClickHandler);
    };
  }, []);

  const [show, setShow] = useState(false);

  const isReactedToPost = () => {
    if (!storedPost) return false;
    let combinedReactionsUserIds = Object.values(storedPost?.reactions).flat();
    return combinedReactionsUserIds.includes(user?.id);
  };

  const handleReaction = async (reactionType) => {
    let postReactions = structuredClone(storedPost.reactions);

    // optimistically updates reactions into a post to show changes quickly to a user when he add or remove the reaction!
    if (postReactions.hasOwnProperty(reactionType)) {
      let reaction = postReactions[reactionType];
      if (reaction.includes(user.id)) {
        let filteredReaction = reaction.filter((uId) => uId !== user.id);
        postReactions[reactionType] = filteredReaction;
      } else {
        reaction.push(user.id);
        postReactions[reactionType] = reaction;
      }
    } else {
      postReactions[reactionType] = [user.id];
    }

    dispatch(updateReactions(postReactions));

    // updating reaction on server side
    await fetch(api.reaction(post.slug, reactionType), { method: "PUT" });
    router.refresh();
    // Todo error handling!
  };

  const handleCommentClick = () => {
    setTimeout(() => {
      focusTextArea();
    }, 100);
  };

  return (
    <div className={styles.container}>
      <span
        className={styles.icon}
        onClick={(e) => {
          e.stopPropagation();
          if (!user) {
            router.push("/login");
          } else setShow(true);
        }}
      >
        <span
          style={{ color: isReactedToPost() ? "var(--liked-color)" : "" }}
          className={`material-symbols-outlined ${
            isReactedToPost() ? "fill" : ""
          }`}
        >
          heart_plus
        </span>
      </span>
      <Link
        onClick={handleCommentClick}
        className={styles.icon}
        to="comments"
        smooth={true}
        duration={500}
      >
        <FaRegComment />
      </Link>
      <span className={styles.icon}>
        <SavePostIcon
          slug={post.slug}
          postId={post.id}
          key={new Date().getTime()}
          showMsg={false}
        />
      </span>
      <div className={`${styles.reactionsContainer} ${show && styles.show}`}>
        {reactions.map((reaction) => (
          <ReactionsContainer
            key={reaction.type}
            reaction={reaction}
            user={user}
            handleReaction={handleReaction}
            storedPost={storedPost}
          />
        ))}
      </div>
    </div>
  );
};

const ReactionsContainer = ({ reaction, user, handleReaction, storedPost }) => {
  const reactionType = reaction.type;
  return (
    <div
      style={{
        background: storedPost?.reactions[reactionType]?.includes(user?.id)
          ? "var(--bg-light)"
          : "",
      }}
      onClick={(e) => {
        e.stopPropagation();
        handleReaction(reactionType);
      }}
      className={styles.reactionImgContainer}
    >
      <img src={reaction.src} alt={reactionType} />
    </div>
  );
};

export default ReactionsMenu;
