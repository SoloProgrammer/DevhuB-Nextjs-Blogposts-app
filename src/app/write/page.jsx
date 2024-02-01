"use client";

import React, { Suspense, useEffect, useMemo, useRef, useState } from "react";
import styles from "./writePage.module.css";
import "react-quill/dist/quill.bubble.css";
import { useTheme } from "@/context/ThemeContext";
import { ImageIcon, XMarkIcon } from "@/GoogleIcons/Icons";
import Modal from "@/components/Modal/Modal";
import ImageDropZone from "@/components/ImageDropZone/ImageDropZone";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Loader from "@/components/Loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { api } from "@/services/api";
import HomePageLoading from "../(HomePage)/loading";
import "react-quill/dist/quill.snow.css";
import Image from "next/image";
import { showToast, toastStatus } from "@/utils/toast";
import { handleFileUpload } from "@/utils/upload";
import hljs from "highlight.js";
import TagsSelect from "react-select";
import makeAnimated from "react-select/animated";
import chroma from "chroma-js";
import { useLazyGetTagsQuery } from "@/redux/api/tagsApi";
import { setTags } from "@/redux/slices/tagsSlice";
const ReactQuill =
  typeof window === "object" ? require("react-quill") : () => false;

const Writepage = () => {
  const [body, setBody] = useState("");
  const [title, setTile] = useState("");
  const [showImgDropZone, setShowImgDropZone] = useState(false);
  const [img, setImg] = useState("");
  const [loading, setLoading] = useState(false);

  const { theme } = useTheme();
  useEffect(() => {
    hljs.initHighlighting();
  }, []);
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
      "prisma",
    ],
  });
  const { status } = useSession();


  const dispatch = useDispatch();

  const router = useRouter();

  const emptyData = "<p><br></p>";

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
      tags: selectedTags,
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

  // const [tags, setTags] = useState(null);
  const [selectedTags, setSelectedTags] = useState([]);
  const ALLOWED_TAGS_COUNT = 4;
  const colourStyles = {
    control: (styles) => ({ ...styles, backgroundColor: "transperent" }),
    option: (styles, { data, isDisabled, isFocused, isSelected }) => {
      const color = chroma(data.color);
      return {
        ...styles,
        backgroundColor: isDisabled
          ? undefined
          : isSelected
          ? data.color
          : isFocused
          ? color.alpha(0.1).css()
          : undefined,
        color: isDisabled
          ? "#ccc"
          : isSelected
          ? chroma.contrast(color, "white") > 2
            ? "white"
            : "black"
          : data.color,
        cursor: isDisabled ? "not-allowed" : "default",

        ":active": {
          ...styles[":active"],
          backgroundColor: !isDisabled
            ? isSelected
              ? data.color
              : color.alpha(0.3).css()
            : undefined,
        },
      };
    },
    multiValue: (styles, { data }) => {
      const color = chroma(data.color);
      return {
        ...styles,
        backgroundColor: color.alpha(0.1).css(),
      };
    },
    multiValueLabel: (styles, { data }) => ({
      ...styles,
      color: data.color,
    }),
    multiValueRemove: (styles, { data }) => ({
      ...styles,
      color: data.color,
      ":hover": {
        backgroundColor: data.color,
        color: "white",
      },
    }),
  };

  const { tags } = useSelector((state) => state.tags);
  const [getTags, { isFetching, isError, error, data }] = useLazyGetTagsQuery();

  useEffect(() => {
    !data && getTags();
    if (data?.tags) {
      dispatch(setTags({ tags: data.tags }));
    } else if (isError && error) {
      showToast(error.message, toastStatus.ERROR);
    }
  }, [data, isFetching, isError, error]);

  const animatedComponents = makeAnimated();

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
              <button
                onClick={handlePublish}
                disabled={!body || !title || !selectedTags.length || loading}
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
          <div className={styles.tagsSelect}>
            {tags && (
              <>
                <TagsSelect
                  closeMenuOnSelect={false}
                  components={animatedComponents}
                  onChange={(optTags) => {
                    setSelectedTags(
                      optTags.map((tag) => {
                        return { slug: tag.value, id: tag.id };
                      })
                    );
                  }}
                  isMulti
                  styles={colourStyles}
                  options={
                    selectedTags?.length < ALLOWED_TAGS_COUNT
                      ? tags.map((tag) => {
                          return {
                            value: tag.slug,
                            label: "#" + tag.title,
                            color: tag.clr,
                            id: tag.id,
                          };
                        })
                      : []
                  }
                  noOptionsMessage={() => {
                    return selectedTags.length === 4
                      ? `Only ${ALLOWED_TAGS_COUNT} tags are allowed!`
                      : "No options📎";
                  }}
                />
                <small>Select maximum 4 tags!</small>
              </>
            )}
          </div>
          <div className={styles.editor}>
            {typeof window !== "undefined" && (
              <ReactQuill
                ref={quillRef}
                className={styles.quillEditor}
                theme="snow"
                value={body}
                formats={formats}
                modules={modules}
                onChange={handleValueChange}
              />
            )}
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
