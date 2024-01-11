export default function manifest() {
  return {
    name: "A_NextJs_App - Dev_Blog",
    short_name: "Dev_Blog",
    description:
      "Dev_Blog, A NetxJs Blog post web platform/app for developers community! ",
    start_url: "/",
    display: "standalone",
    background_color: "#0f172a",
    theme_color: "#0f172a",
    icons: [
      {
        src: "/public/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  };
}
