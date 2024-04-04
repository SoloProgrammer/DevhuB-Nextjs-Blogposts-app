"use client";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { reactions } from "../data";
import styles from "./reactionsCount.module.css";
import { useLazyGetReactionUsersQuery } from "@/redux/api/postReactionsApi";
import { showToast, toastStatus } from "@/utils/toast";
import useModal from "@/Hooks/useModal";
import { Backdrop, Modal } from "@mui/material";
import { useTheme } from "@/context/ThemeContext";
import ReactionsStatsDetail from "../ReactionsStatsDetail/ReactionsStatsDetail";

export const getReactionImageByType = (type) => {
  return reactions.find((reaction) => reaction.type === type).src;
};
export const getReactionsCountByType = (post, type) => {
  return post?.reactions[type]?.length;
};

const ReactionsCount = () => {
  const { post } = useSelector((state) => state.post);
  const { theme } = useTheme();

  const [getReactionUsers, { isFetching, isError, error, data }] =
    useLazyGetReactionUsersQuery();
  const { isOpen: isModalOpen, openModal, closeModal } = useModal();

  const [reactionType, setReactionType] = useState("");

  const handleReactionClick = (reactionType) => {
    setReactionType(reactionType);
    openModal();
    getReactionUsers({ slug: post.slug, reactionType });
  };

  useEffect(() => {
    if (isFetching) return;
    if (isError) {
      showToast(error.data, toastStatus.ERROR);
    }
  }, [isFetching, isError, error]);

  return post && Object.values(post?.reactions).flat().length > 0 ? (
    <div className={styles.container}>
      {post?.reactions &&
        Object.keys(post?.reactions).map((reactionType) => {
          return getReactionsCountByType(post, reactionType) > 0 ? (
            <ReactionWithCount
              handleClick={handleReactionClick}
              post={post}
              reactionType={reactionType}
            />
          ) : (
            <></>
          );
        })}
      {isModalOpen && (
        <Modal
          closeAfterTransition
          open={isModalOpen}
          onClose={closeModal}
          aria-labelledby="Reactions-detail-modal"
          aria-describedby="Modal that shows users corresponding to each reactions"
          slots={{ backdrop: Backdrop }}
          slotProps={{
            backdrop: {
              timeout: 500,
            },
          }}
        >
          <ReactionsStatsDetail
            users={data?.users}
            isLoading={isFetching}
            theme={theme}
            reactionType={reactionType}
            post={post}
            handleTabChange={handleReactionClick}
          />
        </Modal>
      )}
    </div>
  ) : (
    <></>
  );
};

const ReactionWithCount = ({ reactionType, handleClick, post }) => {
  return (
    <div
      onClick={() => handleClick(reactionType)}
      key={reactionType}
      className={styles.reactionCount}
    >
      <img src={getReactionImageByType(reactionType)} alt={reactionType} />
      <span className={styles.count}>
        {getReactionsCountByType(post, reactionType)}
      </span>
    </div>
  );
};

export default ReactionsCount;
