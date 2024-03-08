import React from "react";
import styles from "../auth.module.css";
import SignIn from "@/components/Auth/SignIn";

const SignInPage = () => {
  return (
    <div className={styles.signInContainer}>
      <SignIn />
    </div>
  );
};

export default SignInPage;
