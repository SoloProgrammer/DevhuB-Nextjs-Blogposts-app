export const defaultFunc = () => {};

function returnIconSpan(iconName, classes, handleFunc = defaultFunc) {
  return (
    <span
      onClick={handleFunc}
      className={`material-symbols-outlined ${classes.join(" ")}`}
    >
      {iconName}
    </span>
  );
}

export const ImageIcon = ({ classes, handleFunc }) =>
  returnIconSpan("image", classes, handleFunc);

export const UploadIcon = ({ classes, handleFunc }) =>
  returnIconSpan("upload", classes);

export const VideoIcon = ({ classes, handleFunc }) =>
  returnIconSpan("smart_display", classes);

export const XMarkIcon = ({ classes = [], handleFunc }) =>
  returnIconSpan("close", classes, handleFunc);

export const SaveIcon = ({ classes = [], handleFunc }) =>
  returnIconSpan("done", classes, handleFunc);
  
export const ReplyIcon = ({ classes = [], handleFunc }) =>
  returnIconSpan("reply", classes, handleFunc);

export const EditSquareIcon = ({ classes = [], handleFunc }) =>
  returnIconSpan("edit_square", classes, handleFunc);

export const DeleteIcon = ({ classes = [], handleFunc }) =>
  returnIconSpan("delete", classes, handleFunc);



