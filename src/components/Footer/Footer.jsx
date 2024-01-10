import React from "react";
import styles from "./footer.module.css";
import Image from "next/image";

const Footer = () => {
  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <div className={styles.logo}>
          <div className={styles.logoText}>Dev_Blog</div>
          <div className={styles.logoImg}>
            <Image
              alt="alt"
              fill
              src={
                "https://iconape.com/wp-content/png_logo_vector/google-web-dev-logo.png"
              }
            />
          </div>
        </div>
        <div className={styles.about}>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Deleniti
          fugiat a nulla aut natus, officiis vel libero aliquam harum doloribus
          in at doloremque, laboriosam, architecto impedit voluptatibus unde
          nostrum adipisci.
        </div>
        <div className={styles.socialsIcons}>
          <Image
            src={"/facebook.png"}
            width={25}
            height={25}
            alt="social_icon"
          />{" "}
          <Image
            src={"/instagram.png"}
            width={25}
            height={25}
            alt="social_icon"
          />{" "}
          <Image
            src={"/youtube.png"}
            width={25}
            height={25}
            alt="social_icon"
          />{" "}
          <Image src={"/tiktok.png"} width={25} height={25} alt="social_icon" />
        </div>
      </div>
      <div className={styles.right}>
        <div className={styles.list}>
          <h4 className={styles.heading}>Links</h4>
          <span>Home</span>
          <span>About</span>
          <span>Contact</span>
          <span>Blog</span>
        </div>
        <div className={styles.list}>
          <h4 className={styles.heading}>Tags</h4>
          <span>News</span>
          <span>Travel</span>
          <span>Coding</span>
          <span>Culture</span>
        </div>
        <div className={styles.list}>
          <h4 className={styles.heading}>Social</h4>
          <span>Instagram</span>
          <span>Facebook</span>
          <span>Twitter</span>
          <span>Youtube</span>
        </div>
      </div>
    </div>
  );
};

export default Footer;
