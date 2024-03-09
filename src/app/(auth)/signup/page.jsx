import React, { Suspense } from "react";
import styles from "../auth.module.css";
import SignUp from "@/components/Auth/SignUp";
import HomePageLoading from "@/app/(HomePage)/loading";

const SignUpPage = () => (
  <Suspense fallback={<HomePageLoading />}>
    <div className={styles.signUpContainer}>
      <SignUp />
    </div>
  </Suspense>
);

export default SignUpPage;
