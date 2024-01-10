import prisma from "@/utils/connect";
import { Response } from "@/utils/responses";
import { NextResponse } from "next/server";
import { authenticate } from "@/middlewares/getAuthSession";

// GET all comments of a post
export const GET = async (req) => {
  const { searchParams } = new URL(req.url);
  const postSlug = searchParams.get("postSlug");
  const query = {
    where: { ...(postSlug && { postSlug }) },
    include: {
      user: true,
    },
  };
  try {
    const [comments, count] = await prisma.$transaction([
      prisma.Comment.findMany(query),
      prisma.Comment.count(),
    ]);
    return new NextResponse(JSON.stringify({ comments, count, status: 200 }));
  } catch (error) {
    return new NextResponse(
      JSON.stringify({
        message: "Something went wrong!",
        status: 500,
        error: error.message,
      })
    );
  }
};

// CREATE A COMMENT
const createCommentHandler = async (req) => {
  // Authenticate user sessions on server side


  const { session } = req
  try {
    const body = await req.json();
    let comment = await prisma.Comment.create({
      data: { ...body, userEmail: session.user.email },
    });
    [comment] = await prisma.$transaction([
      prisma.Comment.findUnique({
        where: { id: comment.id },
        include: { user: true },
      }),
      prisma.Post.update({
        where: { slug: comment.postSlug },
        data: { commentsCount: { increment: 1 } },
      }),
    ]);
    return Response("Your Comment is added", 200, true, false, { comment });
  } catch (error) {
    return Response("Something went wrong!", 500, false, error);
  }
}
export const POST = authenticate(createCommentHandler);

// DELETE A COMMENT
const deleteCommentHandler = async (req) => {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  if (!id) Response("Comment Id not passed with params!", 405, false, true);
  try {
    const comment = await prisma.Comment.delete(
      {
        where: { id },
      },
      { new: true }
    );
    await prisma.Post.update({
      where: { slug: comment.postSlug },
      data: { commentsCount: { increment: -1 } },
    });

    return Response("Comment deleted", 200, true, false);
  } catch (error) {
    return Response("Something went wrong!", 500, false, error);
  }
}
export const DELETE = authenticate(deleteCommentHandler);

// UPDATE A COMMENT
const updateCommentHandler = async (req) => {
  // Authenticate user sessions on server side
  try {
    const body = await req.json();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    await prisma.Comment.update({
      where: { id },
      data: { ...body },
    });

    return Response("Your Comment is updated", 200, true, false);
  } catch (error) {
    return Response("Something went wrong!", 500, false, error);
  }
}
export const PUT = authenticate(updateCommentHandler);
