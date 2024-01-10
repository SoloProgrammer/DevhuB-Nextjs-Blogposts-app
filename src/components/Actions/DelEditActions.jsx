import React from "react";
import styles from "./delEditActions.module.css";
import { DeleteIcon, EditSquareIcon } from "@/GoogleIcons/Icons";

const DelEditActions = ({ handleDelete, handleEdit, classNames = []  }) => {
  return (
    <div className={`${styles.actions} ${classNames.join(" ")}`}>
      <DeleteIcon handleFunc={handleDelete} />
      <EditSquareIcon handleFunc={handleEdit} />
    </div>
  );
};

export default DelEditActions;
