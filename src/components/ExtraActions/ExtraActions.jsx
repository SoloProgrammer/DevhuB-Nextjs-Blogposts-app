"use client";

import { Tooltip as ReactTooltip } from "react-tooltip";

import React, { useState } from "react";
import styles from "./extraActions.module.css";
import { FaRegComment } from "react-icons/fa";
import { Link } from "react-scroll";
import { useSelector } from "react-redux";
import { PRODUCTION_URL, api } from "@/services/api";
import Loader from "../Loader/Loader";
import { useRouter } from "next/navigation";
import { ThemeStates } from "@/context/ThemeContext";
import DelEditActions from "../Actions/DelEditActions";
import CrfmDelAlertBox from "../CrfmDelAlertBox/CrfmDelAlertBox";
import Modal from "../Modal/Modal";
import useModal from "@/Hooks/useModal";
import { showToast, toastStatus } from "@/utils/toast";
import ShareIconsModal from "../Modal/ShareIconsModal/ShareIconsModal";
import { XMarkIcon } from "@/GoogleIcons/Icons";
import SubUnSubBtn from "../UserProfileComponents/SubUnSubBtn/SubUnSubBtn";

const ExtraActions = ({
  postAuthor,
  commentsCount,
  slug,
  postTitle,
  postImg,
}) => {
  const { user, loading: userLoading } = useSelector((state) => state.auth);
  const router = useRouter();

  const [showDelModal, , openDelModal, hideDelModal] = useModal();

  let [deleteLoading, setDeleteLoading] = useState(false);

  const handleDeletePost = async () => {
    // Api call to delete the post
    const baseUrl = api.deletePost(slug);
    const options = { method: "DELETE" };
    try {
      setDeleteLoading(true);
      const res = await fetch(baseUrl, options);
      const json = await res.json();
      router.push("/");
      router.refresh();
      showToast(json.message, toastStatus.SUCCESS);
    } catch (error) {
      showToast("Something went wrong!", toastStatus.ERROR);
    } finally {
      setDeleteLoading(false);
      hideDelModal();
    }
  };

  const [showShareModal, , , hideShareModal, toggleModal] = useModal();

  return (
    <div className={styles.extraActionsContainer}>
      {!userLoading ? (
        postAuthor.id !== user?.id ? (
          <SubUnSubBtn author={postAuthor} subscriber={user} />
        ) : (
          <DelEditActions
            handleDelete={openDelModal}
            classNames={[styles.DelEditActions]}
          />
        )
      ) : (
        <Loader size="tooMini" />
      )}
      <div className={styles.shareIcon} onClick={toggleModal}>
        <span className="material-symbols-outlined">share</span>
        <span>
          <Link to="comments" smooth={true} duration={500}>
            <FaRegComment />{" "}
            <span className={styles.commentsCount}>
              {commentsCount ? `(${commentsCount})` : ""}
            </span>
          </Link>
        </span>
        <div
          className={`${styles.shareModal} ${showShareModal && styles.show}`}
        >
          <XMarkIcon
            handleFunc={hideShareModal}
            classes={[styles.shareModalCloseIcon]}
          />
          <ShareIconsModal
            URL={`${PRODUCTION_URL}/posts/${slug}`}
            title={postTitle}
            media={postImg}
          />
        </div>
      </div>
      {showDelModal && (
        <Modal handleHide={hideDelModal} isCloseable={!deleteLoading}>
          <CrfmDelAlertBox
            handleCancel={hideDelModal}
            title={"Delete Post!"}
            desc={"Are you sure you want to delete this post?"}
            btnText={"Delete"}
            handleSubmit={handleDeletePost}
            loading={deleteLoading}
          />
        </Modal>
      )}
    </div>
  );
};

export default ExtraActions;
