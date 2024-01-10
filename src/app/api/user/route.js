const { getAuthSession } = require("@/utils/auth")
import prisma from "@/utils/connect"
import { Response } from "@/utils/responses"

// GET session user data
export const GET = async () => {
    try {
        const session = await getAuthSession()
        if (!session) return Response("Not authenticated", 401, false, true)
        const user = await prisma.User.findUnique({
            where: {
                email: session.user.email
            }
        })
        return Response("", 200, true, false, {user})
    } catch (error) {
        return Response("Something went wrong!", 500, false, error)
    }

}