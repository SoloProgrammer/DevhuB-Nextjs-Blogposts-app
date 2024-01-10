import { authenticate } from "@/middlewares/getAuthSession";
import prisma from "@/utils/connect";
import { Response } from "@/utils/responses";
import { NextResponse } from "next/server";

// Save/Unsave post
const saveUnsavePostHandler = async (req, { params }) => {
  const { session } = req

  try {
    const { slug } = params;
    // console.log(slug, session.user);

    const post = await prisma.Post.findUnique({
      where: { slug },
    });

    if (!post) return Response("Incorrect PostId", 500, false, true);

    const user = await prisma.User.findUnique({
      where: { email: session.user.email },
    });

    if (!user) return Response("User Not found", 500, false, true);

    // Pulling the saved posts from the savedPosts of user
    const pullQuery = { set: user.savedPosts.filter((pid) => pid !== post.id) };

    // Pushing the postId inside the savedPosts of user
    const pushQuery = { push: post.id };

    const checkIsSaved = () => user.savedPosts.includes(post.id);

    await prisma.User.update(
      {
        where: { email: session.user.email },
        data: {
          savedPosts: checkIsSaved() ? pullQuery : pushQuery,
        },
      },
      { new: true }
    );

    return new NextResponse(
      JSON.stringify({
        message: checkIsSaved()
          ? "Removed from saved posts"
          : "Added to saved posts",
        status: 200,
      })
    );
  } catch (error) {
    console.log(error.message);
    return new NextResponse(
      JSON.stringify({
        message: "Something went wrong!",
        status: 500,
        error: error.message,
      })
    );
  }
}
export const PUT = authenticate(saveUnsavePostHandler);
