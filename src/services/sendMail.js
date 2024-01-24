import { getEmailTemplate } from "@/utils/EmailTemplate";
import nodemailer from "nodemailer";
import { PRODUCTION_URL } from "./api";
import prisma from "@/utils/connect";

const transporter = nodemailer.createTransport({
  service: "gmail",
  secure: true,
  auth: {
    user: process.env.NODEMAILER_USER,
    pass: process.env.NODEMAILER_USER_ID,
  },
});

export const sendEmail = async (sender, receiversArr, subject, post) => {
  // send mail with defined transport object
  const authorId = post.user.id;

  try {
    receiversArr.forEach(async (receiverId) => {
      const unsubscribeLink = `${PRODUCTION_URL}/${authorId}/newsletter/${receiverId}/unsubscribe`;
      const receiver = await prisma.User.findUnique({
        where: { id: receiverId },
        select: { email: true },
      });
      const options = {
        from: `${sender}`, // sender address
        to: receiver.email, // receiver
        subject, // Subject line
        html: getEmailTemplate(post, unsubscribeLink), // html body
      };

      const info = await transporter.sendMail(options);
      console.log("Email sent to: %s", receiver.email, info.messageId);
    });
  } catch (error) {
    console.log("Error ----- while sending email", error);
  }
};
