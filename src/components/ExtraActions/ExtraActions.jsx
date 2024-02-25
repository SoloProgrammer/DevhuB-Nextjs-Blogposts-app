"use client";

import React, { useEffect } from "react";
import styles from "./extraActions.module.css";
import { FaRegComment } from "react-icons/fa";
import { Link } from "react-scroll";
import { useSelector } from "react-redux";
import { PRODUCTION_URL } from "@/services/api";
import Loader from "../Loader/Loader";
import { useRouter } from "next/navigation";
import DelEditActions from "../Actions/DelEditActions";
import CrfmDelAlertBox from "../CrfmDelAlertBox/CrfmDelAlertBox";
import Modal from "../Modal/Modal";
import useModal from "@/Hooks/useModal";
import { showToast, toastStatus } from "@/utils/toast";
import ShareIconsModal from "../Modal/ShareIconsModal/ShareIconsModal";
import { XMarkIcon } from "@/GoogleIcons/Icons";
import SubUnSubBtn from "../UserProfileComponents/SubUnSubBtn/SubUnSubBtn";
import { useLazyDeletePostQuery } from "@/redux/api/postsApi";

const ExtraActions = ({
  postAuthor,
  commentsCount,
  slug,
  postTitle,
  postImg,
}) => {
  const { user, loading: userLoading } = useSelector((state) => state.auth);
  const router = useRouter();

  const {
    isOpen: showDelModal,
    openModal: openDelModal,
    closeModal: hideDelModal,
  } = useModal();

  const [
    deletePost,
    { isSuccess, isError, error, isLoading: deleteLoading, data },
  ] = useLazyDeletePostQuery();

  useEffect(() => {
    if (isSuccess) {
      router.push("/");
      router.refresh();
      setTimeout(() => {
        showToast(data.message, toastStatus.SUCCESS);
      }, 100);
    } else if (isError && error) {
      showToast(
        "Something went wrong, pleae try again later!",
        toastStatus.ERROR
      );
      hideDelModal();
    }
  }, [isSuccess, isError, error]);

  const handleDeletePost = () => deletePost(slug);

  const {
    isOpen: showShareModal,
    closeModal: hideShareModal,
    toggleModal,
  } = useModal();

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
