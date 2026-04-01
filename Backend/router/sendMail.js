import nodemailer from "nodemailer";
export default async function sendMail(complain, user) {
  //Send Email
  const transporter = nodemailer.createTransport({
    service: "gmail",
    secure: true,
    port: 465,
    auth: {
      user: "samarthmalhotra5200@gmail.com",
      pass: process.env.Email_PASSWORD,
    },
  });
  //Mail is going to Client
  const info = await transporter.sendMail({
    from: "samarthmalhotra5200@gmail.com",
    to: user.email,
    subject: complain.title,
    text: `Dear ${user.username || "Customer"},

Thank you for reaching out to us. Your complaint has been successfully registered.
Here are your complaint details:
Complaint Title: ${complain.title}
Description: ${complain.description}
Date: ${new Date().toLocaleString()}

Our team will review your complaint and get back to you as soon as possible.
We appreciate your patience.
Regards,
Support Team
`, // Plain-text version of the message
  });
  //Mail is going to mail operator
  const operator = await transporter.sendMail({
    from: "samarthmalhotra5200@gmail.com",
    to: "samarthmalhotra5200@gmail.com",
    subject: complain.title,
    text: `Dear Operator,
A new complaint has been received through the system. Please find the details below:

Complaint Title: ${complain.title}
Description: ${complain.description}
Submitted By: ${user.username || "Anonymous"}
Customer Email: ${user.email}
Date: ${new Date().toLocaleString()}
Kindly review and take the necessary action.
Thank you,
Complaint Management System`, // Plain-text version of the message
  });
  if (info && operator) {
    return "Emails sent successfully";
  } else {
    throw new Error("Failed to send emails");
  }
}
