"use client";
import React, { useState } from "react";
import { FaRegComment } from "react-icons/fa";
import SavePostIcon from "../SavePostIcon/SavePostIcon";
import styles from "./reactionsMenu.module.css";
import { Link } from "react-scroll";

const ReactionsMenu = (props) => {
  let reactions = [
    {
      type: "Like",
      src: "https://dev.to/assets/sparkle-heart-5f9bee3767e18deb1bb725290cb151c25234768a0e9a2bd39370c382d02920cf.svg",
    },
    {
      type: "Unicorn",
      src: "https://dev.to/assets/multi-unicorn-b44d6f8c23cdd00964192bedc38af3e82463978aa611b4365bd33a0f1f4f3e97.svg",
    },
    {
      type: "Exploding Head",
      src: "https://dev.to/assets/exploding-head-daceb38d627e6ae9b730f36a1e390fca556a4289d5a41abb2c35068ad3e2c4b5.svg",
    },
    {
      type: "Raised Hands",
      src: "https://dev.to/assets/raised-hands-74b2099fd66a39f2d7eed9305ee0f4553df0eb7b4f11b01b6b1b499973048fe5.svg",
    },
    {
      type: "Fire",
      src: "https://dev.to/assets/fire-f60e7a582391810302117f987b22a8ef04a2fe0df7e3258a5f49332df1cec71e.svg",
    },
  ];
  const [show, setShow] = useState(false);
  return (
    <div className={styles.container}>
      <span className={styles.icon} onClick={() => setShow(!show)}>
        <span className="material-symbols-outlined">heart_plus</span>
      </span>
      <Link className={styles.icon} to="comments" smooth={true} duration={500}>
        <FaRegComment />
      </Link>
      <span className={styles.icon}>
        <SavePostIcon {...props} />
      </span>
      <div className={`${styles.reactionsContainer} ${show && styles.show}`}>
        {reactions.map((reaction) => (
          <div className={styles.reactionImgContainer} key={reaction.type}>
            <img src={reaction.src} alt={reaction.type} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReactionsMenu;
