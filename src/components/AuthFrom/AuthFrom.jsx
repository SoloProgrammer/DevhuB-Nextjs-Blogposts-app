"use client";
import styles from "./auth-form.module.css";
import React, { useRef } from "react";
import Commonbtn from "../Commonbtn/Commonbtn";
import Loader from "../Loader/Loader";
import Image from "next/image";
import { signIn, useSession } from "next-auth/react";
import { useTheme } from "@/context/ThemeContext";
import Link from "next/link";

const AuthFrom = ({ isSignIn, handleSubmit, isSubmitting }) => {
  const { theme } = useTheme();

  const { status } = useSession();

  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const bioRef = useRef(null);

  const handleCredentialsLogin = (e) => {
    e.preventDefault();
    const name = nameRef.current?.value;
    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;
    // const img = imgRef.current?.value;
    const bio = bioRef.current?.value;

    const payload = isSignIn
      ? { email, password }
      : { name, email, password, bio };
    handleSubmit(payload);
  };
  return (
    <div className={`${styles.container}`}>
      <div className={styles.wrapper}>
        <form className={styles.inputBox} onSubmit={handleCredentialsLogin}>
          {!isSignIn && (
            <div className={styles.inpt}>
              <input
                autoComplete="off"
                ref={nameRef}
                type="text"
                id="name"
                required
              />
              <label htmlFor="name">Username</label>
            </div>
          )}
          <div className={styles.inpt}>
            <input
              autoComplete="off"
              ref={emailRef}
              type="text"
              id="email"
              required
            />
            <label htmlFor="email">Email</label>
          </div>
          <div className={styles.inpt}>
            <input
              autoComplete="off"
              ref={passwordRef}
              type="password"
              id="password"
              required
            />
            <label htmlFor="password">Password</label>
          </div>
          {!isSignIn && (
            <div className={styles.inpt}>
              <input
                autoComplete="off"
                type="crnfpassword"
                id="crnfpassword"
                required
              />
              <label htmlFor="crnfpassword">Confirm password</label>
            </div>
          )}
          {!isSignIn && (
            <div className={`${styles.inpt} ${styles.textareaInpt}`}>
              <textarea
                ref={bioRef}
                autoComplete="off"
                type="bio"
                id="bio"
                required
              />
              <label htmlFor="bio">Bio</label>
            </div>
          )}
          <Commonbtn
            size="medium"
            type="submit"
            text={isSubmitting ? "" : isSignIn ? "Sign in" : "Sign up"}
            isAnimate={false}
            disabled={isSubmitting}
            icon={isSubmitting ? <Loader size="mini" /> : ""}
          />
        </form>
        <div className={styles.subtext}>
          <Link href={isSignIn ? "/signup" : "/login"}>
            {isSignIn
              ? "New to DevhuB, let's go and create an account!"
              : "Already have an account? SignIn"}
          </Link>
        </div>
        <div className={styles.crossline}>
          <span>OR</span>
        </div>
        <h2 className={styles.h2}>Continue with</h2>
        <div className={styles.socialLinks}>
          <div onClick={() => signIn("google")} className={styles.socialLink}>
            {status === "isSubmitting" ? (
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
              </>
            )}
          </div>
          <div
            onClick={() => signIn("github")}
            className={`${styles.socialLink} ${
              theme !== "dark" ? "" : styles.darkIcon
            }`}
          >
            <div className={styles.imgContainer}>
              <Image
                src="https://cdn-icons-png.flaticon.com/512/2111/2111432.png"
                fill
                alt="google_icon"
              />
            </div>
          </div>
          <div onClick={() => signIn("facebook")} className={styles.socialLink}>
            <div className={styles.imgContainer}>
              <Image
                src="https://cdn-icons-png.flaticon.com/512/733/733547.png"
                fill
                alt="google_icon"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthFrom;
