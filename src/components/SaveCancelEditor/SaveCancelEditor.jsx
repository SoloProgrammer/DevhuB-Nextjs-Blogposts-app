import TextareaAutosize from "react-textarea-autosize";
import styles from "./saveCancelEditor.module.css";
import { SaveIcon, XMarkIcon } from "@/GoogleIcons/Icons";

const SaveCancelEditor = ({
  value,
  selectionStartRange,
  selectionEndRange,
  maxRows = 3,
  autoFocus = false,
  onChangeHandler,
  handleSave,
  handleCancel,
}) => {
  return (
    <>
      <TextareaAutosize
        onFocus={(e) =>
          e.target.setSelectionRange(selectionStartRange, selectionEndRange)
        }
        autoFocus={autoFocus}
        maxRows={maxRows}
        className={styles.editCommentArea}
        value={value}
        onChange={onChangeHandler}
      />
      <div className={`${styles.editActions}`}>
        <SaveIcon classes={["icon saveIcon"]} handleFunc={handleSave} />
        <XMarkIcon classes={["icon cancelIcon"]} handleFunc={handleCancel} />
      </div>
    </>
  );
};

export default SaveCancelEditor;
