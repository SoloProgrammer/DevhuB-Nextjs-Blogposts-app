"use client";

import { Tooltip as ReactTooltip } from "react-tooltip";

import React, { useRef, useState } from "react";
import styles from "./extraActions.module.css";
import { FaRegComment } from "react-icons/fa";
import { Link } from "react-scroll";
import { useSelector } from "react-redux";
import { PRODUCTION_URL, api } from "@/utils/api";
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

const ExtraActions = ({
  postAuthor,
  commentsCount,
  slug,
  postTitle,
  postImg,
}) => {
  const { user, loading: userLoading } = useSelector((state) => state.auth);
  const { tooltipTheme } = ThemeStates();

  const postAuthorCopy = useRef(structuredClone(postAuthor));
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const isSubscribed = () =>
    postAuthorCopy?.current?.subscribers.includes(user?.email);

  const handleSubscribe = async () => {
    if (!user) {
      return router.push("/login");
    }

    const query = `?subId=${user?.id}&authorId=${postAuthor.id}`;
    try {
      setLoading(true);

      await fetch(api.subscribeAuthor(query), {
        method: "PUT",
      });

      if (isSubscribed()) {
        postAuthorCopy.current.subscribers =
          postAuthorCopy.current.subscribers.filter(
            (sub) => sub !== user?.email
          );
      } else postAuthorCopy.current.subscribers.push(user?.email);

      router.refresh();
    } catch (error) {
      console.log("Error", error);
    } finally {
      setLoading(false);
    }
  };

  const [showDelModal, , openDelModal, hideModal] = useModal();

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
      setShowDelModal(false);
    }
  };

  const [showShareModal, , , hideShareModal, toggleModal] = useModal();

  return (
    <div className={styles.extraActionsContainer}>
      {!userLoading ? (
        postAuthor.id !== user?.id ? (
          <>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: ".5rem",
              }}
            >
              <button
                onClick={handleSubscribe}
                className={`${styles.subBtn} ${
                  isSubscribed() ? styles.unsub : ""
                }`}
                data-tooltip-id="subscribe-btn"
                disabled={loading}
              >
                {loading ? (
                  <Loader size="tooMini" />
                ) : isSubscribed() ? (
                  `Unsubscribe -`
                ) : (
                  `Subscribe +`
                )}
              </button>
              <span
                data-tooltip-id="help-subscribe-icon"
                style={{
                  fontSize: "1rem",
                  opacity: ".7",
                  cursor: "default",
                  userSelect: "none",
                }}
                className="material-symbols-outlined"
              >
                help
              </span>
            </div>
          </>
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
      <ReactTooltip
        hidden={loading}
        opacity={tooltipTheme.opacity}
        className="react-tooltip"
        style={{
          fontSize: ".7rem",
          borderRadius: "2rem",
          background: tooltipTheme.color,
        }}
        arrowColor={`${tooltipTheme.color}`}
        id="subscribe-btn"
        content={`${isSubscribed() ? `Unsubscribe` : `Subscribe`}  ${
          isSubscribed() ? `from` : `to`
        } ${postAuthor.name} newsletter!`}
      />
      <ReactTooltip
        opacity={tooltipTheme.opacity}
        id="help-subscribe-icon"
        style={{
          fontSize: ".7rem",
          zIndex: "1",
          background: tooltipTheme.color,
        }}
        arrowColor={`${tooltipTheme.color}`}
        place="right"
        content={
          <p>
            Receive email notifications from {postAuthor.name} <br />
            whenever uploads new post!
          </p>
        }
      />
      {showDelModal && (
        <Modal handleHide={hideModal} isCloseable={!deleteLoading}>
          <CrfmDelAlertBox
            handleCancel={hideModal}
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
