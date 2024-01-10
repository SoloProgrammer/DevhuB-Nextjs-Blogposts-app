"use client";

import React, { useEffect, useRef, useState } from "react";
import styles from "./singleComment.module.css";
import Image from "next/image";
import { getFormattedPostDate } from "@/utils/date";
import { api } from "@/utils/api";
import { useDispatch, useSelector } from "react-redux";
import AddreplyTextarea from "../AddreplyTextarea/AddreplyTextarea";
import { useRouter } from "next/navigation";
import ReplyCount from "../ReplyCount/ReplyCount";
import Replies from "../Replies/Replies";
import { updateComments, updateComment } from "@/redux/slices/commentsSlice";
import { ReplyIcon } from "@/GoogleIcons/Icons";
import DelEditActions from "@/components/Actions/DelEditActions";
import SaveCancelEditor from "@/components/SaveCancelEditor/SaveCancelEditor";
import ConfirmDeleteModal from "@/components/Modal/Modal";
import CrfmDelAlertBox from "@/components/CrfmDelAlertBox/CrfmDelAlertBox";
import useModal from "@/Hooks/useModal";

export const getTrimmedValue = (value) => value.replaceAll(/\s+/g, " ").trim();

const SingleComment = ({ comment }) => {
  const { comments } = useSelector((state) => state.comments);
  const { user } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState(comment.desc);
  const [edit, setEdit] = useState(false);

  const router = useRouter();

  const handleDelete = async () => {
    setLoading(true);
    const query = `?id=${comment.id}`;
    await fetch(api.deleteComment(query), {
      method: "DELETE",
    });
    let updatedComments = comments.filter((c) => c.id !== comment.id);
    dispatch(updateComments(updatedComments));
    setLoading(false);
    router.refresh()
  };

  const handleEdit = () => {
    setEdit(true);
  };

  const handleSave = async () => {
    let trimedValue = getTrimmedValue(value);
    setValue(trimedValue);
    if (trimedValue !== comment.desc) {
      // updating comments in redux store
      dispatch(updateComment({ commentId: comment.id, desc: value }));
      setEdit(false);

      // updating commnet on server
      let options = {
        method: "PUT",
        body: JSON.stringify({ desc: trimedValue }),
      };
      let query = `?id=${comment.id}`;
      await fetch(api.updateComment(query), options);
    }
    setEdit(false);
  };

  function handleCancel() {
    let trimedValue = getTrimmedValue(value);
    setValue(trimedValue);
    setEdit(false);
    setReply(false);
  }
  const [reply, setReply] = useState(false);

  const handleReply = () => {
    if (!user) return router.push("/login");
    setReply(!reply);
    setShowReplies(false);
  };

  const repliesContainerRef = useRef();
  const [showreplies, setShowReplies] = useState(false);

  useEffect(() => {
    comment.replies &&
      showreplies &&
      setTimeout(
        () => repliesContainerRef?.current?.classList.add(`${styles.active}`),
        20
      );
  }, [showreplies, comment]);

  function onChangeHandler(e) {
    setValue(e.target.value);
  }
  const [showDelModal, setShowDelModal, handleCloseConfirmDelModal] =
    useModal();

  return (
    <>
      <div className={styles.container}>
        <div className={styles.seperator}>
          <div className={styles.userInfo}>
            <div className={styles.userAvatar}>
              <Image
                src={comment?.user?.image}
                priority={false}
                fill
                alt="avatar"
              />
            </div>
            <div className={styles.userText}>
              <span className={styles.userName}>{comment?.user?.name}</span>
              <span className={styles.date}>
                {getFormattedPostDate(comment?.createdAt, true)}
              </span>
            </div>
          </div>
          {user && comment.user.id === user?.id ? (
            <div className={styles.actions}>
              <DelEditActions
                loading={loading}
                handleDelete={() => setShowDelModal(true)}
                handleEdit={handleEdit}
              />
            </div>
          ) : (
            <div onClick={handleReply} className={styles.actions}>
              <ReplyIcon />
            </div>
          )}
        </div>
        {!edit && <p className={styles.commentText}>{comment.desc}</p>}
        {edit && (
          <SaveCancelEditor
            value={value}
            onChangeHandler={onChangeHandler}
            selectionStartRange={comment.desc.length}
            selectionEndRange={comment.desc.length}
            autoFocus={edit}
            maxRows={5}
            handleSave={handleSave}
            handleCancel={handleCancel}
            key={comment?.id}
          />
        )}
        {reply && (
          <AddreplyTextarea
            handleCancel={handleCancel}
            commentId={comment.id}
          />
        )}
        {comment.replyCount > 0 && (
          <ReplyCount
            count={comment.replyCount}
            comment={comment}
            setReply={setReply}
            setShowReplies={setShowReplies}
            showreplies={showreplies}
          />
        )}
        {comment.replies && showreplies && (
          <div
            ref={repliesContainerRef}
            className={`${styles.repliesContainer}`}
          >
            <Replies commentId={comment.id} replies={comment.replies} />
          </div>
        )}
      </div>
      {showDelModal && (
        <ConfirmDeleteModal
          handleHide={handleCloseConfirmDelModal}
          isCloseable={!loading}
        >
          <CrfmDelAlertBox
            title={"Delete comment!"}
            desc={"Are you sure you want to delete the comment?"}
            btnText={"Delete"}
            handleCancel={handleCloseConfirmDelModal}
            handleSubmit={handleDelete}
            loading={loading}
          />
        </ConfirmDeleteModal>
      )}
    </>
  );
};

export default SingleComment;
