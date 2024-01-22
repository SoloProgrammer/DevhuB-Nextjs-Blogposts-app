"use client";

import React, { Suspense, useCallback, useMemo, useRef, useState } from "react";
import styles from "./writePage.module.css";
import "react-quill/dist/quill.bubble.css";
import { useTheme } from "@/context/ThemeContext";
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
import { updateCategories } from "@/redux/slices/categoriesSlice";
import { useDispatch, useSelector } from "react-redux";
import { getCategories } from "@/utils/services";
import axios from "axios";
import { api } from "@/services/api";
import HomePageLoading from "../(HomePage)/loading";
import ReactQuill from "react-quill";
import hljs from "highlight.js";
import "react-quill/dist/quill.snow.css";
import Image from "next/image";
import { showToast, toastStatus } from "@/utils/toast";
import { handleFileUpload } from "@/utils/upload";

const Writepage = () => {
  const [body, setBody] = useState("");
  const [title, setTile] = useState("");
  const [open, setOpen] = useState(false);
  const [showImgDropZone, setShowImgDropZone] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [img, setImg] = useState("");
  const [loading, setLoading] = useState(false);

  const { categories } = useSelector((state) => state.categories);

  const { theme } = useTheme();
  hljs.configure({
    // optionally configure hljs
    languages: [
      "javascript",
      "python",
      "c",
      "c++",
      "java",
      "HTML",
      "css",
      "matlab",
    ],
  });
  const { status } = useSession();

  const dispatch = useDispatch();

  if (!categories) {
    getCategories()
      .then((data) => dispatch(updateCategories(data)))
      .catch(console.log);
  }

  const router = useRouter();

  const emptyData = "<p><br></p>";

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

  const quillRef = useRef();

  const handleValueChange = (e) => {
    e !== emptyData ? setBody(e) : setBody(null);
  };

  // const imageHandler = () => {
  //   // Create an input element of type 'file'
  //   const input = document.createElement("input");
  //   input.setAttribute("type", "file");
  //   input.setAttribute("accept", "image/*");
  //   input.click();

  //   console.log("---------", quillRef);
  //   // When a file is selected
  //   input.onchange = () => {
  //     const file = input.files[0];
  //     const reader = new FileReader();

  //     // Read the selected file as a data URL
  //     reader.onload = () => {
  //       const imageUrl = reader.result;
  //       const quillEditor = quillRef.current.getEditor();

  //       // Get the current selection range and insert the image at that index
  //       const range = quillEditor.getSelection(true);
  //       quillEditor.insertEmbed(range.index, "image", imageUrl, "user");
  //     };

  //     reader.readAsDataURL(file);
  //   };
  // };

  const modules = useMemo(
    () => ({
      syntax: {
        highlight: function (text) {
          return hljs.highlightAuto(text).value;
        },
      },
      toolbar: {
        container: [
          [{ header: [2, 3, 4, false] }],
          ["bold", "italic", "underline", "blockquote", { color: [] }],
          // [{ color: [] }],
          [
            { list: "ordered" },
            { list: "bullet" },
            { indent: "-1" },
            { indent: "+1" },
          ],
          ["link", "image", "code-block"],
        ],
        handlers: {
          // image: imageHandler,
        },
      },
      clipboard: {
        matchVisual: true,
      },
    }),
    []
  );

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "code-block",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
    "color",
  ];

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

  const [uploading, setUploading] = useState(false);
  const handleImgChange = async (e) => {
    try {
      const imageUrl = await handleFileUpload(e, setUploading);
      imageUrl
        ? setImg({ url: imageUrl, name: e.target?.files[0]?.name })
        : setUploading(false);
    } catch (error) {
      showToast(error.message, toastStatus.ERROR);
    }
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

  return (
    <Suspense fallback={<HomePageLoading />}>
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
            <div style={{ flexGrow: "1" }}>
              {img?.url ? (
                <div className={styles.imgContainer}>
                  <Image fill alt="blog_img" src={img.url} />
                </div>
              ) : (
                <label htmlFor="blogImg" className={styles.imageUploader}>
                  {uploading ? (
                    <Loader size="mini" />
                  ) : (
                    <>
                      <p>Choose Image</p>
                      <ImageIcon classes={[styles.tool_icon]} />
                    </>
                  )}
                </label>
              )}
              <input
                style={{ display: "none" }}
                type="file"
                name="blogImg"
                id="blogImg"
                onChange={handleImgChange}
              />
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
              ref={quillRef}
              className={styles.quillEditor}
              theme="snow"
              value={body}
              formats={formats}
              modules={modules}
              onChange={handleValueChange}
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
