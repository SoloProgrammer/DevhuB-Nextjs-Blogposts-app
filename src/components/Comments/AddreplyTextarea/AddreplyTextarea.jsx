"use client";
import React, { useEffect, useRef, useState } from "react";
import styles from "./addreplyTextarea.module.css";
import TextareaAutosize from "react-textarea-autosize";
import Loader from "@/components/Loader/Loader";
import { api } from "@/utils/api";
import { useDispatch } from "react-redux";
import { incrementRepliesCount, removeReplies } from "@/redux/slices/commentsSlice";
import { XMarkIcon } from "@/GoogleIcons/Icons";
import { getTrimmedValue } from "../SingleComment/SingleComment";

const AddreplyTextarea = ({ handleCancel, commentId }) => {
  const [desc, setDesc] = useState("");
  const [loading, setLoading] = useState(false);
  let replyBoxTextContainerRef = useRef();
  const dispatch = useDispatch();

  useEffect(() => {
    setTimeout(() => {
      replyBoxTextContainerRef?.current?.classList?.add(`${styles.active}`);
    }, 0);
  }, []);

  const handleSaveReply = async () => {
    setLoading(true);
    let options = {
      method: "POST",
      body: JSON.stringify({ desc }),
    };
    let res = await fetch(api.addReply(commentId), options);
    if (res.ok) {
      dispatch(incrementRepliesCount({ commentId }));
      dispatch(removeReplies({ commentId }));
    }
    setLoading(false);
    handleCancel();
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
            disabled={!getTrimmedValue(desc) || loading}
            className={styles.saveReplyBtn}
          >
            Save {loading && <Loader size="tooMini" />}
          </button>
          <XMarkIcon classes={['icon cancelIcon']} handleFunc={handleCancel}/>
        </div>
      </div>
    </div>
  );
};

export default AddreplyTextarea;
