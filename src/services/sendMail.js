import { getEmailTemplate } from "@/utils/EmailTemplate";
import nodemailer from "nodemailer";
import { PRODUCTION_URL, server } from "./api";
import prisma from "@/utils/connect";

const transporter = nodemailer.createTransport({
  service: "gmail",
  secure: true,
  auth: {
    user: "prathamshinde987@gmail.com",
    pass: "zlog cvsm njob amat",
  },
});

export const sendEmail = async (sender, receiversArr, subject, post) => {
  // send mail with defined transport object
  const authorId = post.user.Id;

  try {
    receiversArr.forEach(async (receiverId, i) => {
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
      console.log("Email sent to: %s", receiversArr[i], info.messageId);
    });
  } catch (error) {
    console.log("Error ----- while sending email", error);
  }
};
