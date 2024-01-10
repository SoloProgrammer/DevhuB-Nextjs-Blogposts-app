import toast from "react-hot-toast";

const status = {
  SUCCESS: "success",
  ERROR: "error",
  LOADING: "loading",
};
export const toastStatus = Object.freeze(status);

export const showToast = (msg, type, duration = 3000) => {
  const toastId = toast(msg, {
    type,
    duration,
  });
  return toastId;
};
