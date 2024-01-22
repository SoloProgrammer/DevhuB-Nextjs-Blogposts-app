"use client";

import React, { useEffect, useRef, useState } from "react";
import styles from "./singleComment.module.css";
import Image from "next/image";
import { getFormattedPostDate } from "@/utils/date";
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
import { showToast } from "@/utils/toast";
import Link from "next/link";
import { getUserSlug } from "@/app/posts/[slug]/page";
import {
  useLazyDeleteCommentQuery,
  useUpdateCommentMutation,
} from "@/redux/api/commentsApi";

export const getTrimmedValue = (value) => value.replaceAll(/\s+/g, " ").trim();

const SingleComment = ({ comment }) => {
  const { comments } = useSelector((state) => state.comments);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [value, setValue] = useState(comment.desc);
  const [edit, setEdit] = useState(false);
  const [showDelModal, , openDelModal, handleCloseConfirmDelModal, hideModal] =
    useModal();

  const router = useRouter();

  const [deleteComment, { isLoading, isError, error, data }] =
    useLazyDeleteCommentQuery();

  const [updateCommentOnServer] = useUpdateCommentMutation();

  useEffect(() => {
    if (data) {
      let updatedComments = comments.filter((c) => c.id !== comment.id);
      dispatch(updateComments(updatedComments));
      router.refresh();
      showToast(data?.message);
    } else if (isError && error && !isLoading) {
      showToast(error.data, "error");
      hideModal();
    }
  }, [isError, error, isLoading, data]);

  const handleDelete = () => deleteComment(comment.id);

  const handleEdit = () => setEdit(true);

  const handleSave = async () => {
    let trimedValue = getTrimmedValue(value);
    setValue(trimedValue);
    if (trimedValue !== comment.desc) {
      // updating comments in redux store
      dispatch(updateComment({ commentId: comment.id, desc: value }));
      setEdit(false);
      // updating commnet on server
      updateCommentOnServer({
        commentId: comment.id,
        updatedData: { desc: trimedValue },
      });
    }
    setEdit(false);
  };

  function handleCancel() {
    let trimedValue = getTrimmedValue(value);
    setValue(comment.desc);
    setEdit(false);
    setReply(false);
  }
  const [reply, setReply] = useState(false);

  const handleReply = () => {
    if (!user) return router.push("/login");
    setReply(true);
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

  return (
    <>
      <div className={styles.container}>
        <div className={styles.seperator}>
          <div className={styles.userInfo}>
            <Link
              href={`/dev/${getUserSlug(comment.user)}`}
              className={styles.userAvatar}
            >
              <Image
                src={comment?.user?.image}
                priority={false}
                fill
                alt="avatar"
              />
            </Link>
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
                loading={isLoading}
                handleDelete={openDelModal}
                handleEdit={handleEdit}
              />
            </div>
          ) : (
            <div className={styles.actions}>
              <ReplyIcon handleFunc={handleReply} />
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
          isCloseable={!isLoading}
        >
          <CrfmDelAlertBox
            title={"Delete comment!"}
            desc={"Are you sure you want to delete the comment?"}
            btnText={"Delete"}
            handleCancel={handleCloseConfirmDelModal}
            handleSubmit={handleDelete}
            loading={isLoading}
          />
        </ConfirmDeleteModal>
      )}
    </>
  );
};

export default SingleComment;
