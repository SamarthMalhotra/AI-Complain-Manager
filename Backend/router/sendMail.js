export default async function sendMail(complain, user) {
  console.log("------------------");
  //Send Email
  console.log("Sending email...", user);
  console.log("------------------" + info.response + " " + operator.response);
  return new Promise((resolve, reject) => {
    if (info && operator) {
      resolve("Emails sent successfully");
    } else {
      reject("Failed to send emails");
    }
  });
}
