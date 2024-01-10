import React from "react";
import styles from "./menu.module.css";
import MenuPosts from "./MenuPosts";
import MenuCategories from "./MenuCategories/MenuCategories";

const Menu = () => {
  return (
    <div className={styles.container}>
      <h2 className={styles.subTitle}>What's hot</h2>
      <h1 className={styles.headTitle}>Most Popular</h1>
      <MenuPosts withImg={true} />
      <br />
      <h2 className={styles.subTitle}>Discover by topics</h2>
      <h1 className={styles.headTitle}>Categories</h1>
      <MenuCategories/>
      <br />
      <h2 className={styles.subTitle}>Choosed by the editor</h2>
      <h1 className={styles.headTitle}>Editors Pick</h1>
      <MenuPosts withImg={false} />
    </div>
  );
};

export default Menu;
