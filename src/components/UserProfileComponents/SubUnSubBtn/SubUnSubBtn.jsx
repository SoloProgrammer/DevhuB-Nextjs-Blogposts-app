"use client";
import React, { useRef, useState } from "react";
import styles from "./subUnSubBtn.module.css";
import { Tooltip as ReactTooltip } from "react-tooltip";
import { useTheme } from "@/context/ThemeContext";
import { api } from "@/services/api";
import { showToast } from "@/utils/toast";
import Loader from "../../Loader/Loader";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { clearSubscribersAudienceInProfile } from "@/redux/slices/profileUserSlice";

const SubUnSubBtn = ({ author, subscriber, tooltipPlacement = "top" }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const { tooltipTheme } = useTheme();

  const dispatch = useDispatch();

  const AuthorCopy = useRef(structuredClone(author));
  const authorName = AuthorCopy?.current?.name;

  const isSubscribed = () =>
    AuthorCopy?.current?.subscribers.includes(subscriber?.id);

  const handleSubscribe = async () => {
    if (!subscriber) {
      return router.push("?sign-in", { scroll: false });
    }

    const query = `?subId=${subscriber?.id}&authorId=${author.id}`;
    try {
      setLoading(true);

      await fetch(api.subscribeAuthor(query), {
        method: "PUT",
      });

      if (isSubscribed()) {
        showToast(`Unsubscribed from ${authorName}`);
        AuthorCopy.current.subscribers = AuthorCopy.current.subscribers.filter(
          (sub) => sub !== subscriber?.id
        );
      } else {
        showToast(`Subscribed to ${authorName}`);
        AuthorCopy.current.subscribers.push(subscriber?.id);
      }
      router.refresh();
      dispatch(clearSubscribersAudienceInProfile());
    } catch (error) {
      showToast(error.message, "error");
      // console.log("Error", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: ".5rem",
      }}
    >
      <button
        onClick={handleSubscribe}
        className={`${styles.subBtn} ${isSubscribed() ? styles.unsub : ""}`}
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
        } ${authorName} newsletter!`}
      />
      <ReactTooltip
        opacity={tooltipTheme.opacity}
        id="help-subscribe-icon"
        style={{
          fontSize: ".7rem",
          zIndex: "40",
          background: tooltipTheme.color,
        }}
        arrowColor={`${tooltipTheme.color}`}
        place={tooltipPlacement}
        content={
          <p>
            Receive email notifications from {authorName} <br />
            whenever uploads new post!
          </p>
        }
      />
    </div>
  );
};

export default SubUnSubBtn;
