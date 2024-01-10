"use client";

import React, { useEffect, useState } from "react";
import styles from "./navbar.module.css";
import Image from "next/image";
import Link from "next/link";
import ThemeToggle from "../ThemeToggle/ThemeToggle";
import AuthLinks from "../AuthLinks/AuthLinks";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const [hide, setHide] = useState(true);
  const { data, status } = useSession();
  function toggleSideBar() {
    setHide((prev) => !prev);
  }

  const path = usePathname();
  useEffect(() => {
    if (window.innerWidth < 770) {
      if (!hide) setHide(true);
    }
  }, [path]);

  return (
    <div className={styles.container}>
      <Link href={"/"} className={styles.logo}>
        <div className={styles.logoText}>Dev_Blog</div>
        <div className={styles.logoImg}>
          <Image
            fill
            src={
              "https://iconape.com/wp-content/png_logo_vector/google-web-dev-logo.png"
            }
            alt="alt"
          />
        </div>
      </Link>
      <div
        onClick={toggleSideBar}
        style={{ display: !hide ? "block" : "none" }}
        className={styles.wall}
      ></div>
      <div className={`${styles.links}`}>
        <ThemeToggle />
        <div className={`${styles.linksCenter} ${!hide ? styles.show : ""}`}>
          <Link href={"/"}>Homepage</Link>
          <Link href={"/"}>About</Link>
          <Link href={"/"}>Contact</Link>
          <AuthLinks status={status} />
        </div>
        <div onClick={toggleSideBar} className={styles.menuIcon}>
          <span className="material-symbols-outlined">menu</span>
        </div>
        {status === "authenticated" && (
          <Image
            className={styles.userIcon}
            style={{
              display: status === "notauthenticated" ? "none" : "block",
            }}
            src={data?.user?.image}
            width={35}
            height={35}
            alt="default_user"
          />
        )}
      </div>
    </div>
  );
};

export default Navbar;
