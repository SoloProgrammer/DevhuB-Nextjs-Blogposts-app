"use client";
import React, { useEffect } from "react";
import styles from "./replyCount.module.css";
import Loader from "@/components/Loader/Loader";
import { addReplies } from "@/redux/slices/commentsSlice";
import { useDispatch } from "react-redux";
import { useLazyGetRepliesQuery } from "@/redux/api/repliesApi";
import { showToast, toastStatus } from "@/utils/toast";

const ReplyCount = ({
  count,
  comment,
  setShowReplies,
  setReply,
  showreplies,
}) => {
  const dispatch = useDispatch();

  const [getReplies, { isFetching, isError, error, data }] =
    useLazyGetRepliesQuery("");

  useEffect(() => {
    if (!isFetching && data) {
      dispatch(addReplies({ replies: data.replies, commentId: comment.id }));
      setShowReplies(true);
    } else if (isError && error) {
      showToast(error.data, toastStatus.ERROR);
    }
  }, [isError, data, error, isFetching]);

  const fetchReplies = async () => {
    // toggling replies-container if replies is already fetched from the server
    setReply(false);
    if (comment.replies) return setShowReplies(!showreplies);
    getReplies(comment.id);
  };
  
  return (
    <div
      className={`${styles.replyCount} ${showreplies && styles.open}`}
      onClick={fetchReplies}
    >
      {showreplies && "Hide "}
      {count}{" "}
      <span style={{ marginRight: "5px" }}>
        {count > 1 ? " Replies" : " Reply"}
      </span>
      {isFetching && <Loader size="tooMini" />}
    </div>
  );
};

export default ReplyCount;
