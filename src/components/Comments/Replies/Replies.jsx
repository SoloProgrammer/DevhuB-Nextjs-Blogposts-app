"use client";
import React, { useEffect, useState } from "react";
import styles from "./replies.module.css";
import Image from "next/image";
import { getFormattedPostDate } from "@/utils/date";
import DelEditActions from "@/components/Actions/DelEditActions";
import { useDispatch, useSelector } from "react-redux";
import { deleteReply, updateReply } from "@/redux/slices/commentsSlice";
import SaveCancelEditor from "@/components/SaveCancelEditor/SaveCancelEditor";
import { getTrimmedValue } from "../SingleComment/SingleComment";
import ConfirmDeleteModal from "@/components/Modal/Modal";
import CrfmDelAlertBox from "@/components/CrfmDelAlertBox/CrfmDelAlertBox";
import useModal from "@/Hooks/useModal";
import { showToast, toastStatus } from "@/utils/toast";
import Link from "next/link";
import { getUserSlug } from "@/app/posts/[slug]/page";
import {
  useLazyDeleteReplyQuery,
  useUpdateReplyMutation,
} from "@/redux/api/repliesApi";

const Replies = ({ commentId, replies }) => {
  return (
    <div className={styles.container}>
      {replies.map((reply) => (
        <SingleReply key={reply.id} reply={reply} commentId={commentId} />
      ))}
    </div>
  );
};

export default Replies;

const SingleReply = ({ reply, commentId }) => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const [deleteReplyOnServer, { isLoading, isError, error, data }] =
    useLazyDeleteReplyQuery("");

  const [updateReplyOnServer] = useUpdateReplyMutation();

  const handleDelete = async () => {
    deleteReplyOnServer({ commentId, replyId: reply.id });
  };

  useEffect(() => {
    if (!isLoading) {
      if (data) {
        dispatch(deleteReply({ commentId, replyId: reply.id }));
        showToast("Reply deleted!");
      } else if (isError && error) {
        showToast(error.data, toastStatus.ERROR);
      }
    }
  }, [isLoading, isError, error, data]);

  const [edit, setEdit] = useState(false);
  const [value, setValue] = useState(reply.desc);

  const onChangeHandler = (e) => {
    setValue(e.target.value);
  };

  const handleEdit = () => {
    setEdit(true);
  };

  const handleSave = async () => {
    setEdit(false);
    let trimmedValue = getTrimmedValue(value);
    setValue(trimmedValue);
    if (trimmedValue === reply.desc) return;

    // updating reply on client side/in Redux Store
    dispatch(
      updateReply({ commentId, replyId: reply.id, newDesc: trimmedValue })
    );

    // updating reply on server side
    updateReplyOnServer({
      commentId,
      replyId: reply.id,
      updatedReply: { desc: trimmedValue },
    });
  };

  const handleCancel = () => {
    setEdit(false);
    setValue(reply.desc);
  };

  const [showDelModal, , openDelModal, handleCloseConfirmDelModal] = useModal();

  return (
    <>
      <div key={reply.id} className={styles.reply}>
        <div className={styles.seperator}>
          <div className={styles.userInfo}>
            <Link
              href={`/dev/${getUserSlug(reply.user)}`}
              className={styles.userAvatar}
            >
              <Image src={reply.user.image} fill alt={"Avatar"} />
            </Link>
            <div className={styles.userName}>
              <span className={styles.uName}>{reply.user.name}</span>
              <span className={styles.replyDate}>
                {getFormattedPostDate(reply.createdAt, true)}
              </span>
            </div>
          </div>
          {user?.id === reply?.user?.id && (
            <div className={styles.actions}>
              <DelEditActions
                handleDelete={openDelModal}
                handleEdit={handleEdit}
              />
            </div>
          )}
        </div>
        {!edit ? (
          <div className={styles.replyDesc}>{reply.desc}</div>
        ) : (
          <SaveCancelEditor
            value={value}
            autoFocus={edit}
            selectionStartRange={reply.desc.length}
            selectionEndRange={reply.desc.length}
            maxRows={5}
            onChangeHandler={onChangeHandler}
            handleSave={handleSave}
            handleCancel={handleCancel}
          />
        )}
      </div>
      {showDelModal && (
        <ConfirmDeleteModal
          handleHide={handleCloseConfirmDelModal}
          isCloseable={!isLoading}
        >
          <CrfmDelAlertBox
            title={"Delete reply!"}
            desc={"Are you sure you want to delete the reply?"}
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
