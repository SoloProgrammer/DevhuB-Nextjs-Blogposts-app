"use client";

import React, { Suspense, useState } from "react";
import styles from "./writePage.module.css";
import "react-quill/dist/quill.bubble.css";
import { ThemeStates } from "@/context/ThemeContext";
import {
  ImageIcon,
  UploadIcon,
  VideoIcon,
  XMarkIcon,
} from "@/GoogleIcons/Icons";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import Modal from "@/components/Modal/Modal";
import ImageDropZone from "@/components/ImageDropZone/ImageDropZone";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Loader from "@/components/Loader/Loader";
import dynamic from "next/dynamic";
import { updateCategories } from "@/redux/slices/categoriesSlice";
import { useDispatch, useSelector } from "react-redux";
import { getCategories } from "@/utils/services";
import axios from "axios";
import { api } from "@/services/api";
import HomePageLoading from "../(HomePage)/loading";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const Writepage = () => {
  const [body, setBody] = useState("");
  const [title, setTile] = useState("");
  const [open, setOpen] = useState(false);
  const [showImgDropZone, setShowImgDropZone] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [img, setImg] = useState("");
  const [loading, setLoading] = useState(false);

  const { categories } = useSelector((state) => state.categories);

  const { theme } = ThemeStates();

  const { status } = useSession();

  const dispatch = useDispatch();

  if (!categories) {
    getCategories()
      .then((data) => dispatch(updateCategories(data)))
      .catch(console.log);
  }

  const router = useRouter();

  const emptyData = "<p><br></p>";
  const handleValueChange = (e) => {
    e !== emptyData ? setBody(e) : setBody(null);
  };

  const openImageDropZone = () => {
    setShowImgDropZone(true);
  };
  const handleSetImg = (imgObj) => {
    setImg(imgObj);
  };
  const removeImg = () => setImg("");

  const hideImgDropZone = () => {
    setShowImgDropZone(false);
  };

  if (status === "loading") {
    return (
      <div className="LoadingContainer">
        <Loader size="medium" />
      </div>
    );
  }

  if (status === "unauthenticated") {
    return router.push("/");
  }

  const slugify = (str) =>
    str
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_-]+/g, "-")
      .replace(/^-+|-+$/g, "");

  const handlePublish = async () => {
    setLoading(true);
    const headers = {
      "Content-Type": "application/json",
    };
    const reqbody = {
      title,
      desc: body,
      catSlug: selectedCategory,
      slug: slugify(title),
      img: img.url,
    };

    const res = await axios.post(api.createPost(), reqbody, { headers });
    if (res.status !== 201) {
      setLoading(false);
      throw new Error(res.response.data.message);
    }
    router.push(`/posts/${slugify(title)}`);
  };

  return (
    <Suspense fallback={<HomePageLoading/>}>
      <div className={styles.container}>
        <div className={styles.wrapper}>
          <input
            value={title}
            onChange={(e) => setTile(e.target.value)}
            placeholder="Title"
            type="text"
            className={styles.titleInput}
          />
          <div className={styles.actions}>
            <div className={styles.tools}>
              <span
                onClick={() => setOpen(!open)}
                className={`material-symbols-outlined ${styles.plus_icon} ${
                  open && styles.active
                }`}
              >
                add_circle
              </span>
              <div className={`${styles.extraTools} ${open && styles.active}`}>
                <ImageIcon
                  handleFunc={openImageDropZone}
                  classes={[styles.tool_icon]}
                />
                <UploadIcon classes={[styles.tool_icon]} />
                <VideoIcon classes={[styles.tool_icon]} />
              </div>
            </div>
            <div className={styles.right}>
              {categories && (
                <FormControl
                  error={title && body && !selectedCategory}
                  sx={{ m: 1, minWidth: 120 }}
                  size="small"
                >
                  <InputLabel
                    error={title && body && !selectedCategory}
                    id="demo-simple-select-label"
                  >
                    Category
                  </InputLabel>
                  <Select
                    error={title && body && !selectedCategory}
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={selectedCategory || ""}
                    label="Category"
                    onChange={(e) => setSelectedCategory(e.target.value)}
                  >
                    {categories?.map((cat) => {
                      return (
                        <MenuItem value={cat.title} key={cat.id}>
                          {cat.title}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
              )}
              <button
                onClick={handlePublish}
                disabled={!body || !title || !selectedCategory || loading}
                className={`${styles.publish_btn} ${
                  theme === "dark" ? styles.dark : styles.light
                }`}
              >
                Publish
                {loading && <Loader size="mini" />}
              </button>
            </div>
          </div>
          {img && (
            <div
              className={`${styles.imgName} ${theme === "dark" && styles.dark}`}
            >
              <span>{img.name}</span>
              <XMarkIcon classes={[styles.xmark]} handleFunc={removeImg} />
            </div>
          )}
          <div className={styles.editor}>
            <ReactQuill
              className={styles.quillTextArea}
              theme="bubble"
              value={body}
              onChange={handleValueChange}
              placeholder="Tell your story"
            />
          </div>
        </div>
        {showImgDropZone && (
          <Modal handleHide={() => setShowImgDropZone(false)}>
            <ImageDropZone
              handleSetImg={handleSetImg}
              hideImgDropZone={hideImgDropZone}
            />
          </Modal>
        )}
      </div>
    </Suspense>
  );
};

export default Writepage;
