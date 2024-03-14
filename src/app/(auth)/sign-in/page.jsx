import React, { Suspense } from "react";
import styles from "../auth.module.css";
import SignIn from "@/components/Auth/SignIn";
import HomePageLoading from "@/app/(HomePage)/loading";
import PageWrapper from "@/components/wrappers/PageWrapper";

const SignInPage = () => {
  return (
    <PageWrapper>
      <Suspense fallback={<HomePageLoading />}>
        <div className={styles.signInContainer}>
          <SignIn />
        </div>
      </Suspense>
    </PageWrapper>
  );
};

export default SignInPage;
