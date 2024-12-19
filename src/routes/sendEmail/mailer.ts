import nodemailer from "nodemailer";

export const sendMail = async (
  name: string,
  email: string,
  phoneNumber: string | undefined,
  subject: string,
  message: string,
  sendToRecipient: boolean
): Promise<void> => {
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_SERVICE,
    port: Number(process.env.EMAIL_PORT),
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.EMAIL_USER,
    cc: sendToRecipient ? email : undefined,
    subject: `${subject}`,
    text: `Name: ${name}\nEmail: ${email}\n${
      phoneNumber ? `Tel: ${phoneNumber}\n` : ""
    }\n\n${message}`,
  };

  try {
    // Sende die E-Mail
    await transporter.sendMail(mailOptions);
    console.log(
      `✅ Email successfully sent to: ${process.env.EMAIL_USER}${
        sendToRecipient ? ` (cc: ${email})` : ""
      }`
    );
  } catch (error) {
    console.error(`❌ Error sending email:`, error);
    throw error;
  }
};
