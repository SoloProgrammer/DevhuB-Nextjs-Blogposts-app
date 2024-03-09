import React, { Suspense } from "react";
import styles from "../auth.module.css";
import SignIn from "@/components/Auth/SignIn";
import HomePageLoading from "@/app/(HomePage)/loading";

const SignInPage = () => {
  return (
    <Suspense fallback={<HomePageLoading />}>
      <div className={styles.signInContainer}>
        <SignIn />
      </div>
    </Suspense>
  );
};

export default SignInPage;
