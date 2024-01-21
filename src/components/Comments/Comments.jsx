"use client";

import React, { useEffect, useState } from "react";
import styles from "./comments.module.css";
import SingleComment, { getTrimmedValue } from "./SingleComment/SingleComment";
import Commonbtn from "../Commonbtn/Commonbtn";
import { useSession } from "next-auth/react";
import Loader from "../Loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import { addNewComment, updateComments } from "@/redux/slices/commentsSlice";
import { useRouter } from "next/navigation";
import {
  useLazyGetCommentsQuery,
  useNewCommentMutation,
} from "@/redux/api/commentsApi";
import { showToast } from "@/utils/toast";
import { ErrorBlock } from "../Error/Error";

var isIntersected;

const Comments = ({ postSlug, commentsCount }) => {
  const { status } = useSession();
  const { comments } = useSelector((state) => state.comments);
  const dispatch = useDispatch();

  const router = useRouter();

  const [getPostComments, { data, isFetching, isError, error }] =
    useLazyGetCommentsQuery();

  const [
    createNewComment,
    {
      data: newCommentData,
      isLoading: isAddingNewComment,
      error: errorAddingNewComment,
    },
  ] = useNewCommentMutation();

  const fetchComments = async () => {
    const query = `postSlug=${postSlug}`;
    getPostComments(query);
  };

  useEffect(() => {
    if (data) {
      console.log(data, isFetching, isError, error);
      dispatch(updateComments(data.comments));
    } else if (!isFetching && error) {
      console.log(error);
      showToast(error.data, "error");
    }
  }, [isError, error, data, isFetching]);

  useEffect(() => {
    if (newCommentData) {
      dispatch(addNewComment(newCommentData.comment));
      router.refresh();
    } else if (!isAddingNewComment && errorAddingNewComment) {
      console.log(errorAddingNewComment);
      showToast(errorAddingNewComment.data, "error");
    }
  }, [errorAddingNewComment, newCommentData, isFetching]);

  const postCommentIcon = (
    <span style={{ fontSize: ".85rem" }} className="material-symbols-outlined">
      send
    </span>
  );

  const [desc, setDesc] = useState("");

  const handleSubmit = async () => {
    if (!desc) return;
    setDesc("");
    createNewComment({ desc, postSlug });
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
            disabled={isAddingNewComment || !getTrimmedValue(desc)}
            handleFunc={handleSubmit}
            text={"Post"}
            size="small"
            icon={
              !isAddingNewComment ? postCommentIcon : <Loader size="tooMini" />
            }
          />
        )}
      </div>
      {isError && <ErrorBlock soure={"comments"} refetch={fetchComments} />}
      {!isError && !isFetching && !comments?.length && (
        <p style={{ marginTop: "2rem" }}>
          No comments yet! be the first one to comment ☝️!
        </p>
      )}
      {isFetching && (
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
      {!isError && comments?.length > 4 && (
        <span className={styles.viewMore}>View more comments..</span>
      )}
    </div>
  );
};

export default Comments;
