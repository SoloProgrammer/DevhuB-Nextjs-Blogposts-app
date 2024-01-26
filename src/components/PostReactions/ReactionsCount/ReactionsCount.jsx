"use client";
import React from "react";
import { useSelector } from "react-redux";
import { reactions } from "../data";
import styles from "./reactionsCount.module.css";

const ReactionsCount = () => {
  const { post } = useSelector((state) => state.post);

  const getReactionImageByType = (type) => {
    return reactions.filter((reaction) => reaction.type === type)[0].src;
  };

  const getReactionsCountByType = (type) => {
    return post?.reactions[type]?.length;
  };

  return post && Object.values(post?.reactions).flat().length > 0 ? (
    <div className={styles.container}>
      {post?.reactions &&
        Object.keys(post?.reactions).map((reactionType) => {
          return getReactionsCountByType(reactionType) > 0 ? (
            <div key={reactionType} className={styles.reactionCount}>
              <img
                src={getReactionImageByType(reactionType)}
                alt={reactionType}
              />
              <span className={styles.count}>
                {getReactionsCountByType(reactionType)}
              </span>
            </div>
          ) : (
            <></>
          );
        })}
    </div>
  ) : (
    <></>
  );
};

export default ReactionsCount;
