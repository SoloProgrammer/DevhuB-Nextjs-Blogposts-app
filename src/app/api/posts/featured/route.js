import prisma from "@/utils/connect";
import { Response } from "@/utils/responses";

export const GET = async () => {
    try {
        const post = await prisma.Post.findMany({
            where: { isFeatured: true },
            include: { user: true }
        })

        return Response("this is this", 200, true, false, { post })
    } catch (error) {
        console.log("Error while fetching featured post-----------", error);
        return Response("", 500, false, true, { error })
    }
}