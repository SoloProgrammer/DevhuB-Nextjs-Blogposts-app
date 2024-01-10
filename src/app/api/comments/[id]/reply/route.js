import prisma from "@/utils/connect";
import { Response } from "@/utils/responses";
import { authenticate } from "@/middlewares/getAuthSession";

// CREATE A REPLY - need auth
const createReplyHandler = async (req, { params }) => {
  const { id } = params;
  const { session } = req;

  if (!id)
    return Response(
      "Comment Id not passed with the request!",
      422,
      false,
      error
    );

  try {
    let body = await req.json();
    const user = await prisma.User.findUnique({
      where: { email: session.user.email },
    });
    await prisma.$transaction([
      prisma.Reply.create(
        { data: { ...body, userId: user.id, commentId: id } },
        { new: true }
      ),
      prisma.Comment.update({
        where: { id },
        data: { replyCount: { increment: 1 } },
      }),
    ]);

    return Response("Reply added!", 201, true, false);
  } catch (error) {
    return Response("Something went wrong!", 500, false, error);
  }
};
export const POST = authenticate(createReplyHandler);

// GET ALL REPLIES
export const GET = async (_, { params }) => {
  try {
    const { id } = params;
    if (!id)
      return Response(
        "Comment Id not passed with the request!",
        422,
        false,
        error
      );

    const replies = await prisma.Reply.findMany({
      where: { commentId: id },
      include: { user: true },
    });

    return Response("Replies fetched!", 200, true, false, { replies });
  } catch (error) {
    return Response("Something went wrong!", 500, false, error);
  }
};

// DELETE A REPLY - need auth
const deleteReplyHandler = async (req, { params }) => {
  try {
    const { id } = params;
    const { searchParams } = new URL(req.url);
    const replyId = searchParams.get("replyId");

    if (!id) return Response("CommentId not send with the request", 400);
    if (!replyId) return Response("ReplyId not send with the request", 400);

    await prisma.$transaction([
      prisma.Reply.delete({
        where: { id: replyId },
      }),
      prisma.Comment.update({
        where: { id },
        data: { replyCount: { increment: -1 } },
      }),
    ]);
    return Response("Reply deleted", 200);
  } catch (error) {
    return Response("Something went wrong!", 500, false, error);
  }
};
export const DELETE = authenticate(deleteReplyHandler);

// UPDATE A REPLY - need auth
const updateReplyHandler = async (req) => {
  const { searchParams } = new URL(req.url);
  let replyId = searchParams.get("replyId");

  if (!replyId) return Response("ReplyId not send with the request", 400);

  try {
    let body = await req.json();

    await prisma.Reply.update({
      where: { id: replyId },
      data: { ...body },
    });

    return Response("Reply edited!", 200);
  } catch (error) {
    return Response("Something went wrong!", 500, false, error);
  }
};
export const PUT = authenticate(updateReplyHandler);
