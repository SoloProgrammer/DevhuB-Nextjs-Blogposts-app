"use client";

import React, { useCallback, useRef, useState } from "react";
import styles from "./imageDropZone.module.css";
import { useDropzone } from "react-dropzone";
import Image from "next/image";
import { ThemeStates } from "@/context/ThemeContext";
import { handleFileUpload } from "@/utils/upload";
import Loader from "../Loader/Loader";
import Commonbtn from "../Commonbtn/Commonbtn";
import { defaultFunc } from "@/GoogleIcons/Icons";

const ImageDropZone = ({ handleSetImg, hideImgDropZone = defaultFunc }) => {
  const { theme } = ThemeStates();
  const [loading, setLoading] = useState(false);
  const [img, setImg] = useState(null);

  const onDrop = useCallback(async (acceptedFiles) => {
    // Do something with the files
    console.log(acceptedFiles);
    let e = {
      target: {
        files: [acceptedFiles[0]],
      },
    };
    const picture = await handleFileUpload(e, setLoading);
    picture && setImg({ url: picture, name: acceptedFiles[0].name });
    handleSetImg({ url: picture, name: acceptedFiles[0].name });
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });
  return (
    <div className={styles.container}>
      <h2>Pick an image for your blog!</h2>
      <div {...getRootProps()} className={styles.flexCenter}>
        {loading ? (
          <Loader />
        ) : (
          <>
            <input
              style={{ display: !img && !loading ? "block" : "none" }}
              {...getInputProps()}
              multiple={false}
            />
            {!img && !loading ? (
              <>
                <div className={styles.imgdropZone}>
                  <Image
                    className={theme === "dark" && styles.imgWhite}
                    src={
                      "https://cdn-icons-png.flaticon.com/512/4303/4303472.png"
                    }
                    width={30}
                    height={30}
                    alt="img_img"
                  />
                  {isDragActive ? (
                    <p>Drop the files here ...</p>
                  ) : (
                    <p>
                      Drag 'n' drop some files here, or click to select files
                    </p>
                  )}
                </div>
              </>
            ) : (
              img &&
              !loading && (
                <>
                  <div className={styles.imgViewBox}>
                    <Image fill alt="blog_img" src={img.url} />
                  </div>
                </>
              )
            )}
          </>
        )}
      </div>
      {img && !loading && (
        <div className={styles.actions}>
          <Commonbtn
            size="small"
            text={"Continue"}
            handleFunc={hideImgDropZone}
          />
        </div>
      )}
    </div>
  );
};

export default ImageDropZone;
