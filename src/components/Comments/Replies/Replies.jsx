"use client";
import React, { useState } from "react";
import styles from "./replies.module.css";
import Image from "next/image";
import { getFormattedPostDate } from "@/utils/date";
import DelEditActions from "@/components/Actions/DelEditActions";
import { useDispatch, useSelector } from "react-redux";
import { api } from "@/utils/api";
import { deleteReply, updateReply } from "@/redux/slices/commentsSlice";
import SaveCancelEditor from "@/components/SaveCancelEditor/SaveCancelEditor";
import { getTrimmedValue } from "../SingleComment/SingleComment";
import ConfirmDeleteModal from "@/components/Modal/Modal";
import CrfmDelAlertBox from "@/components/CrfmDelAlertBox/CrfmDelAlertBox";
import useModal from "@/Hooks/useModal";

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
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    setLoading(true);
    // Deleting reply from server side
    const query = `?replyId=${reply.id}`;
    let options = {
      method: "DELETE",
    };
    let res = await fetch(api.deleteReply(commentId, query), options);
    if (!res.ok) {
      throw Error("Some Error Occured!");
    }

    // deleting reply from redux store

    dispatch(deleteReply({ commentId, replyId: reply.id }));
    setLoading(false);
  };

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
    const options = {
      method: "PUT",
      body: JSON.stringify({ desc: trimmedValue }),
    };
    const query = `?replyId=${reply.id}`;
    await fetch(api.updateReply(commentId, query), options);
  };

  const handleCancel = () => setEdit(false);

  const [showDelModal, setShowDelModal, handleCloseConfirmDelModal] =
    useModal();

  return (
    <>
      <div key={reply.id} className={styles.reply}>
        <div className={styles.seperator}>
          <div className={styles.userInfo}>
            <div className={styles.userAvatar}>
              <Image src={reply.user.image} fill alt={"Avatar"} />
            </div>
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
                loading={loading}
                handleDelete={setShowDelModal}
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
          isCloseable={!loading}
        >
          <CrfmDelAlertBox
            title={"Delete reply!"}
            desc={"Are you sure you want to delete the reply?"}
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
