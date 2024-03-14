"use client";

import React, { useEffect, useRef } from "react";
import { motion, useInView, useAnimation } from "framer-motion";
import { anim } from "@/utils/framer";
import styles from "./Reveal.module.css";

const Reveal = ({ children, revealInView = true, animateOnce = true }) => {
  const ref = useRef(null);
  const isInview = useInView(ref, { once: animateOnce });
  const animationControls = useAnimation();

  useEffect(() => {
    if (isInview) {
      animationControls.start("animate");
    } else {
      animationControls.start("initial");
    }
  }, [isInview]);

  const slideUpAnimate = {
    initial: {
      opacity: 0,
      y: 100,
    },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        delay: 0.25,
      },
    },
    exit: {
      opacity: 0,
      y: 100,
    },
  };

  const curtainAnimate = {
    initial: {
      left: 0,
    },
    [revealInView ? "inview" : "animate"]: {
      left: "100%",
      transition: {
        duration: 1,
        delay: 0.25,
      },
    },
  };

  return (
    <div ref={ref} className={styles.parent} style={{ width: "fit-content" }}>
      <motion.div
        viewport={{ once: animateOnce }}
        {...anim(curtainAnimate)}
        className={styles.overlay}
      />
      <motion.div
        {...anim(slideUpAnimate)}
        viewport={{ once: animateOnce }}
        animate={revealInView ? animationControls : slideUpAnimate.animate}
      >
        {children}
      </motion.div>
    </div>
  );
};

export default Reveal;
