const isProduction = process.env.NODE_ENV === "production";

export const LOCAL_URL = "http://localhost:3000";
export const PRODUCTION_URL = "https://dev-hub-nextjs-app.vercel.app";

export const server = {
  URL: isProduction ? PRODUCTION_URL : LOCAL_URL,
};

export const api = {
  getCategories: () => {
    return `${server.URL}/api/categories`;
  },
  getPosts: (query) => {
    return `${server.URL}/api/posts${query}`;
  },
  reaction: (slug, reactionType) => {
    return `${server.URL}/api/posts/${slug}/reaction?type=${reactionType}`;
  },
  createPost: () => {
    return `${server.URL}/api/posts/create`;
  },
  getFeaturedPost: () => {
    return `${server.URL}/api/posts/featured`;
  },
  getPopularPosts: () => {
    return `${server.URL}/api/posts/popular`;
  },
  getSinglePost: (slug) => {
    // Http method - GET
    return `/posts/${slug}`;
  },
  deletePost: (slug) => {
    // Http method - DELETE
    return `${server.URL}/api/posts/${slug}`;
  },
  savePost: (slug) => {
    return `${server.URL}/api/posts/${slug}/save`;
  },
  getUser: (query = "") => {
    return `/user${query}`;
  },
  getAudiencesOfAuthor: (query) => {
    return `${server.URL}/api/user/audiences${query}`;
  },
  subscribeAuthor: (query) => {
    return `${server.URL}/api/user/subscribe${query}`;
  },
  unsubscribe: (query) => {
    return `${server.URL}/api/user/unsubscribe${query}`;
  },
  followAuthor: (query) => {
    return `${server.URL}/api/user/follow${query}`;
  },
};
