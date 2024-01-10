import prisma from "@/utils/connect"
import { Response } from "@/utils/responses"
import { NextResponse } from "next/server"

export const GET = async () => {
    try {
        const categories = await prisma.Category.findMany()
        return Response("Categories fetched!", 200, true, false, { categories })

    } catch (error) {
        return new NextResponse(JSON.stringify({ message: "Something went wrong!", status: 500, error: error.message }))
    }
}