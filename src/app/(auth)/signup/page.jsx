import React, { Suspense } from "react";
import styles from "../auth.module.css";
import SignUp from "@/components/Auth/SignUp";
import HomePageLoading from "@/app/(HomePage)/loading";
import PageWrapper from "@/components/wrappers/PageWrapper";

const SignUpPage = () => (
  <PageWrapper>
    <Suspense fallback={<HomePageLoading />}>
      <div className={styles.signUpContainer}>
        <SignUp />
      </div>
    </Suspense>
  </PageWrapper>
);

export default SignUpPage;
