import { sendEmail } from "@/services/sendMail";
import { Response } from "@/utils/responses";

export const GET = async (req) => {
    try {
        await sendEmail()
        return Response("Message Sent ✅ Success", 200, true)
    } catch (error) {
        return Response("Something went wrong!", 500, false, error)
    }
}