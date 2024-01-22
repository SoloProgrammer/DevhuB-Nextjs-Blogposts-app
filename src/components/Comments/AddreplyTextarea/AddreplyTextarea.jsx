"use client";
import React, { useEffect, useRef, useState } from "react";
import styles from "./addreplyTextarea.module.css";
import TextareaAutosize from "react-textarea-autosize";
import Loader from "@/components/Loader/Loader";
import { useDispatch } from "react-redux";
import {
  incrementRepliesCount,
  removeReplies,
} from "@/redux/slices/commentsSlice";
import { XMarkIcon } from "@/GoogleIcons/Icons";
import { getTrimmedValue } from "../SingleComment/SingleComment";
import { useNewReplyMutation } from "@/redux/api/repliesApi";
import { showToast, toastStatus } from "@/utils/toast";

const AddreplyTextarea = ({ handleCancel, commentId }) => {
  const [desc, setDesc] = useState("");
  let replyBoxTextContainerRef = useRef();
  const dispatch = useDispatch();

  const [addReply, { isLoading, isError, error, data }] = useNewReplyMutation();

  useEffect(() => {
    if (!isLoading) {
      if (data) {
        dispatch(incrementRepliesCount({ commentId }));
        dispatch(removeReplies({ commentId }));
        handleCancel();
      } else if (isError && error) {
        showToast(error.data, toastStatus.ERROR);
      }
    }
  }, [isLoading, isError, error, data]);

  useEffect(() => {
    setTimeout(() => {
      replyBoxTextContainerRef?.current?.classList?.add(`${styles.active}`);
    }, 0);
  }, []);

  const handleSaveReply = async () => {
    addReply({ commentId, newReply: { desc } });
  };

  return (
    <div
      ref={replyBoxTextContainerRef}
      className={`${styles.replyBoxTextContainer} `}
    >
      <div className={`${styles.replyContainer} `}>
        <p>Add your reply</p>
        <TextareaAutosize
          autoFocus={true}
          maxRows={5}
          minRows={3}
          desc={desc}
          onChange={(e) => setDesc(e.target.value)}
          className={styles.replyTextArea}
        />
        <div className={`${styles.replyActions}`}>
          <button
            onClick={handleSaveReply}
            disabled={!getTrimmedValue(desc) || isLoading}
            className={styles.saveReplyBtn}
          >
            Save {isLoading && <Loader size="tooMini" />}
          </button>
          <XMarkIcon classes={["icon cancelIcon"]} handleFunc={handleCancel} />
        </div>
      </div>
    </div>
  );
};

export default AddreplyTextarea;
