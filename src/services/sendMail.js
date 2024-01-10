import { getEmailTemplate } from "@/utils/EmailTemplate";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  secure: true,
  auth: {
    user: "prathamshinde987@gmail.com",
    pass: "zlog cvsm njob amat",
  },
});

export const sendEmail = async (sender, receiversArr, subject, htmlData) => {
  // send mail with defined transport object
  try {
    const options = {
      from: `${sender}`, // sender address
      to: receiversArr.join(", "), // list of receivers
      subject, // Subject line
      html: getEmailTemplate(htmlData), // html body
    };

    const info = await transporter.sendMail(options);

    console.log("Message sent: %s", info.messageId);
  } catch (error) {
    throw new Error(error.message);
  }
};
