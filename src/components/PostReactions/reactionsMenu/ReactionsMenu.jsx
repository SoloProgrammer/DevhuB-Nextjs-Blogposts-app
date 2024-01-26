"use client";

import React, { useEffect, useState } from "react";
import { FaRegComment } from "react-icons/fa";
import SavePostIcon from "../../SavePostIcon/SavePostIcon";
import styles from "./reactionsMenu.module.css";
import { Link } from "react-scroll";
import { useDispatch, useSelector } from "react-redux";
import { setPost, updateReactions } from "@/redux/slices/postSlice";
import { useRouter } from "next/navigation";
import { reactions } from "../data";
import { api } from "@/services/api";

const ReactionsMenu = ({ post }) => {
  const { post: storedPost } = useSelector((state) => state.post);
  const { user } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setPost(post));
  }, []);

  const [show, setShow] = useState(false);

  const router = useRouter();

  const isReactedToPost = () => {
    if (!storedPost) return false;
    let combinedReactionsUserIds = Object.values(storedPost?.reactions).flat();
    return combinedReactionsUserIds.includes(user?.id);
  };

  const handleReaction = (reactionType) => {
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

    router.refresh()

    // updating reaction on server side
    fetch(api.reaction(post.slug, reactionType), { method: "PUT" });
    // Todo error handling!
  };

  return (
    <div className={styles.container}>
      <span
        className={styles.icon}
        onClick={() => {
          if (!user) {
            router.push("/login");
          } else setShow(!show);
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
      <Link className={styles.icon} to="comments" smooth={true} duration={500}>
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
        {reactions.map((reaction) => {
          const reactionType = reaction.type;
          return (
            <div
              style={{
                background: storedPost?.reactions[reactionType]?.includes(
                  user?.id
                )
                  ? "var(--bg-light)"
                  : "",
              }}
              onClick={() => handleReaction(reactionType)}
              className={styles.reactionImgContainer}
            >
              <img src={reaction.src} alt={reactionType} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ReactionsMenu;
