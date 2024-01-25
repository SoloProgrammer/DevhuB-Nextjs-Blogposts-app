"use client";

import React, { useEffect } from "react";
import styles from "./menuCategories.module.css";
import { useDispatch, useSelector } from "react-redux";
import { setTags } from "@/redux/slices/tagsSlice";
import TagsList from "@/components/TagsList/TagsList";
import { useLazyGetTagsQuery } from "@/redux/api/tagsApi";

const MenuCategories = () => {
  const [getTags, { isFetching, isError, error, data }] = useLazyGetTagsQuery();
  const { tags } = useSelector((state) => state.tags);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!tags?.length) {
      !data && getTags();
      if (data) {
        dispatch(setTags({ tags: data.tags }));
      } else if (isError && error) {
        showToast(
          "Some error occured while fetching tags, try again!",
          toastStatus.ERROR
        );
      }
    }
  }, [isFetching, isError, error, data]);

  return (
    <div className={styles.categories}>
      <TagsList tags={tags} isColored size="small" />
    </div>
  );
};

export default MenuCategories;
