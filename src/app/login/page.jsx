"use client";

import React, { Suspense } from "react";
import styles from "./loginPage.module.css";
import Image from "next/image";
import Commonbtn from "@/components/Commonbtn/Commonbtn";
import { ThemeStates } from "@/context/ThemeContext";
import { signIn, useSession } from "next-auth/react";
import Loader from "@/components/Loader/Loader";
import { useRouter } from "next/navigation";
import HomePageLoading from "@/app/(HomePage)/loading";

const LoginPage = () => {
  const { theme } = ThemeStates();
  const { status } = useSession();
  const router = useRouter();

  if (status === "loading") {
    return (
      <div className="LoadingContainer">
        <Loader size="medium" />
      </div>
    );
  }
  if (status === "authenticated") {
    return router.push("/");
  }
  return (
    <Suspense fallback={<HomePageLoading/>}>
      <div className={`${styles.container}`}>
        <div className={styles.wrapper}>
          <form className={styles.inputBox}>
            <div className={styles.inpt}>
              <input type="text" id="email" required />
              <label htmlFor="email">Enter your email</label>
            </div>
            <div className={styles.inpt}>
              <input type="password" id="password" required />
              <label htmlFor="password">Enter your password</label>
            </div>
            <Commonbtn size="medium" text={"Sign in"} isAnimate={false} />
          </form>
          <div className={styles.crossline}>
            <span>OR</span>
          </div>
          <div className={styles.socialLinks}>
            <div onClick={() => signIn("google")} className={styles.socialLink}>
              {status === "loading" ? (
                <Loader size="small" />
              ) : (
                <>
                  <div className={styles.imgContainer}>
                    <Image
                      src="https://cdn-icons-png.flaticon.com/512/300/300221.png"
                      fill
                      alt="google_icon"
                    />
                  </div>
                  <span>Sign in with Google</span>
                </>
              )}
            </div>
            <div
              onClick={() => signIn("github")}
              className={`${styles.socialLink} ${
                theme !== "dark" ? styles.whiteIcon : styles.darkIcon
              }`}
            >
              <div className={styles.imgContainer}>
                <Image
                  src="https://cdn-icons-png.flaticon.com/512/2111/2111432.png"
                  fill
                  alt="google_icon"
                />
              </div>
              <span>Sign in with Github</span>
            </div>
            <div
              onClick={() => signIn("facebook")}
              className={styles.socialLink}
            >
              <div className={styles.imgContainer}>
                <Image
                  src="https://cdn-icons-png.flaticon.com/512/733/733547.png"
                  fill
                  alt="google_icon"
                />
              </div>
              <span>Sign in with Facebook</span>
            </div>
          </div>
        </div>
      </div>
    </Suspense>
  );
};

export default LoginPage;
