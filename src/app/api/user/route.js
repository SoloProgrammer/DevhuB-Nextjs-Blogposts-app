const { getAuthSession } = require("@/utils/auth");
import prisma from "@/utils/connect";
import { Response } from "@/utils/responses";

// GET session user data
export const GET = async (req) => {
  try {
    const { searchParams } = new URL(req.url);

    const id = searchParams.get("id");
    let query = {};
    if (!id) {
      const session = await getAuthSession();
      if (!session) return Response("Not authenticated", 401, false, true);
      query = { where: { email: session.user.email } };
    } else {
      query = { where: { id } };
    }
    const user = await prisma.User.findUnique(query);

    if (!user)
      return Response("Some error occured", 404, false, {
        message: "User not found",
      });

    return Response("", 200, true, false, { user });
  } catch (error) {
    return Response("Something went wrong!", 500, false, error);
  }
};
