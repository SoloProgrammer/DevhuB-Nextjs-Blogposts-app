"use client";

import React, { useEffect, useState } from "react";
import styles from "./comments.module.css";
import SingleComment, { getTrimmedValue } from "./SingleComment/SingleComment";
import Commonbtn from "../Commonbtn/Commonbtn";
import { useSession } from "next-auth/react";
import { api } from "@/utils/api";
import Loader from "../Loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import { addNewComment, updateComments } from "@/redux/slices/commentsSlice";
import { useRouter } from "next/navigation";

var isIntersected;

const Comments = ({ postSlug, commentsCount }) => {
  const { status } = useSession();
  const { comments } = useSelector((state) => state.comments);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter()

  const fetchComments = async () => {
    try {
      setIsLoading(true);
      const query = `?postSlug=${postSlug}`;
      const res = await fetch(api.getPostComments(query), {
        cache: "no-store",
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message);
      }
      dispatch(updateComments(data?.comments));
    } catch (error) {
      throw new Error(error.message);
    }
    setIsLoading(false);
  };

  const postCommentIcon = (
    <span style={{ fontSize: ".85rem" }} className="material-symbols-outlined">
      send
    </span>
  );

  const [desc, setDesc] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!desc) return;
    setLoading(true);
    setDesc("");
    const options = {
      method: "POST",
      body: JSON.stringify({ desc, postSlug }),
    };
    const res = await fetch(api.createNewComment(), options);
    if (res.ok) {
      let data = await res.json();
      dispatch(addNewComment(data.comment));
    }
    router.refresh()
    setLoading(false);
  };

  // Intersection observer effect/logic for activating comments fetching...
  useEffect(() => {
    if (commentsCount) {
      function callback(entries) {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            !isIntersected && fetchComments();
            isIntersected = true;
            observer.unobserve(entry.target);
          }
        });
      }
      let options = { threshold: 0.2 };
      let observer = new IntersectionObserver(callback, options);
      let commentsList = document.querySelector(`.${styles.container}`);
      commentsList && observer.observe(commentsList);

      // clearing comments data from store when comments components unmounted!
      return () => {
        isIntersected = false;
        dispatch(updateComments([]));
      };
    }
  }, []);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>
        <span>Comments</span>
        <span className="material-symbols-outlined">comment</span>
      </h1>
      <div className={styles.input}>
        <textarea
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          rows={3}
          type="text"
          name=""
          id=""
          disabled={status === "unauthenticated"}
          placeholder={
            status === "unauthenticated"
              ? `Login to leave your thought!`
              : `What's your thought`
          }
        />
        {status !== "unauthenticated" && (
          <Commonbtn
            disabled={loading || !getTrimmedValue(desc)}
            handleFunc={handleSubmit}
            text={"Post"}
            size="small"
            icon={!loading ? postCommentIcon : <Loader size="tooMini" />}
          />
        )}
      </div>
      {!isLoading && !comments?.length && (
        <p style={{ marginTop: "2rem" }}>
          No comments yet! be the first one to comment ☝️!
        </p>
      )}
      {isLoading && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "20px",
            marginTop: "1rem",
          }}
        >
          <Loader size="small" />
          Loading comments.....
        </div>
      )}
      <div className={styles.commentsList}>
        {comments?.length > 0 &&
          comments?.map((comment) => {
            return (
              <SingleComment
                comments={comments}
                comment={comment}
                key={comment.id}
              />
            );
          })}
      </div>
      {comments?.length > 4 && (
        <span className={styles.viewMore}>View more comments..</span>
      )}
    </div>
  );
};

export default Comments;
