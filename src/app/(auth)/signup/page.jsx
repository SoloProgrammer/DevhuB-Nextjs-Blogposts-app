import React from "react";
import styles from "../auth.module.css";
import SignUp from "@/components/Auth/SignUp";

const SignUpPage = () => (
  <div className={styles.signUpContainer}>
    <SignUp />
  </div>
);

export default SignUpPage;
