import { showToast, toastStatus } from "./toast";

export const handleFileUpload = async (e, setLoading) => {
  let pics = e.target.files[0];

  if (pics === undefined) {
    showToast("Please select an Image file", toastStatus.ERROR, 3000);
    return null;
  }
  if (
    pics.type === "image/jpeg" ||
    pics.type === "image/png" ||
    pics.type === "image/jpg" ||
    pics.type === "image/gif" ||
    pics.type === "image/webp"
  ) {
    if (Math.round(pics.size / 1024) < 5120) {
      setLoading(true);
      const data = new FormData();
      data.append("file", pics);
      data.append("upload_preset", "Talk-o-Meter");
      data.append("cloud_name", "dvzjzf36i");

      const CLOUDINARY_URL =
        "https://api.cloudinary.com/v1_1/dvzjzf36i/image/upload";
      let config = {
        method: "POST",
        body: data,
      };
      try {
        let res = await fetch(CLOUDINARY_URL, config);
        let json = await res.json();
        setLoading(false);
        return json.url.toString();
      } catch (error) {
        setLoading(false);
        showToast("Seems some suspicious*", toastStatus.ERROR);
      }
    } else {
      showToast("Image should be less than 5mb", toastStatus.ERROR);
    }
  } else {
    showToast("Please select an Image file", toastStatus.ERROR);
  }
};
