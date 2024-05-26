"use client";
import { anim } from "@/utils/framer";
import { motion } from "framer-motion";
import { ProgressBar } from "react-animate-components-ts";

const PageWrapper = ({ children }) => {
  const opacity = {
    initial: {
      opacity: 0,
      y: 150,
    },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.5, 1, 0.89, 1],
      },
    },
    exit: {
      opacity: 1,
      y: 150,
    },
  };

  return (
    <motion.div {...anim(opacity)}>
<<<<<<< HEAD
      <ProgressBar
        trackColor="var(--progress-bar-color)"
        showTrack={true}
        bg={"var(--main-color)"}
        h={5}
        position={"top"}
        top={70}
      />
=======
>>>>>>> fdac5fa (connected local repo to remote repo)
      {children}
    </motion.div>
  );
};

export default PageWrapper;
