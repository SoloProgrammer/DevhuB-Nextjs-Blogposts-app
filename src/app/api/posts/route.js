import { TryCatch } from "@/helpers/ErrorHandler";
import prisma from "@/utils/connect";
import { Response } from "@/utils/responses";

// Get posts
export const GET = TryCatch(async (req) => {
  const { searchParams } = new URL(req.url);

  const page = searchParams.get("page");
  const category = searchParams.get("category");
  const uId = searchParams.get("uId");
  const saved = JSON.parse(searchParams.get("saved"));

  // getting page, category, uId as userId, saved as boolean value from parameters

  let user;

  // fetching user if uId is passed in the parameters
  if (uId) {
    user = await prisma.User.findUnique({
      where: { id: uId },
    });
    if (!user)
      return Response("Something went wrong", 500, false, {
        message: "User not found!",
      });
  }

  const POSTS_PER_PAGE = 5;

  // Query to fetch post based on different conditions as follows:
  // 1. if ctegory is send with the params we fetch all the posts of that category and if uId + category is passed in the param then we fetch all the posts od the user of that uId with the category!

  // 2. if only uId is passed with the params we fetch all the posts of that specific user of the uId

  // 3. if saved is passed in the params so it is manditory to pass the uId in the params so that we can fetch all the posts of the user of that uId that saved the particular posts or the postid is present in the savedposts array of that user

  // The below id the logic for all three of valid points listed/explained above

  // ...(category && !saved && { catSlug: category }),
  // ...(uId && !saved && { userEmail: user.email }),
  // ...(saved && {
  //   id: {
  //     in: user.savedPosts,
  //   },
  // }),

  const whereQuery = {
    ...(category && !saved && { catSlug: category }),
    ...(uId && !saved && { userEmail: user.email }),
    ...(saved && {
      id: {
        in: user.savedPosts,
      },
    }),
  };

  const query = {
    take: POSTS_PER_PAGE,
    skip: POSTS_PER_PAGE * (page - 1),
    where: whereQuery, // main logic goes here
    include: { user: true },
    orderBy: {
      createdAt: "desc",
    },
  };

  const [posts, postsCount] = await prisma.$transaction([
    prisma.Post.findMany(query),
    prisma.Post.count({
      where: whereQuery,
    }),
  ]);
  return Response("Posts fetched", 200, true, false, { posts, postsCount });
});
