"use client";
import React, { useEffect } from "react";
import styles from "./categoryList.module.css";
import TagsList from "../TagsList/TagsList";
import { useLazyGetTagsQuery } from "@/redux/api/tagsApi";
import { useDispatch, useSelector } from "react-redux";
import { setTags } from "@/redux/slices/tagsSlice";
import { showToast, toastStatus } from "@/utils/toast";
import { ErrorBlock } from "../Error/Error";
import Skeleton from "react-loading-skeleton";

const CategoryList = () => {
  const [getTags, { isFetching, isError, error, data }] = useLazyGetTagsQuery();
  const { tags } = useSelector((state) => state.tags);
  const dispatch = useDispatch();

  useEffect(() => {
    !data && !tags.length && getTags();
    if (data) {
      dispatch(setTags({ tags: data.tags }));
    } else if (isError && error) {
      showToast(
        "Some error occured while fetching tags, try again!",
        toastStatus.ERROR
      );
    }
  }, [isFetching, isError, error, data]);

  if (isError)
    return (
      <ErrorBlock
        key={"Tags fetch error block"}
        soure={"tags"}
        refetch={getTags}
      />
    );

  return (
    <div className={styles.tagsContainer}>
      <h1>Popular #Tags</h1>
      {isFetching ? (
        <TagsLoadingSkeleton />
      ) : (
        tags?.length > 0 && (
          <TagsList tags={tags} isColored={false} size="large" />
        )
      )}
    </div>
  );
};

const TagsLoadingSkeleton = () => {
  return (
    <section className={styles.wrapper}>
      {new Array(14).fill(0).map((_, i) => {
        const randomNumber = Math.floor(Math.random() * (140 - 80 + 1)) + 80;
        return (
          <Skeleton
            key={i}
            width={randomNumber}
            height={25}
            borderRadius={".3rem"}
          />
        );
      })}
    </section>
  );
};

export default CategoryList;
