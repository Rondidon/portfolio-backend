import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config(); // loads .env-file

// Funktion zum Senden von E-Mails
export const sendMail = async (
  name: string,
  email: string,
  phoneNumber: string | undefined,
  subject: string,
  message: string
): Promise<void> => {
  const transporter = nodemailer.createTransport({
    service: process.env.EMAIL_SERVICE,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: email,
    to: process.env.EMAIL_USER,
    subject: `Neue Nachricht: ${subject}`,
    text: `Name: ${name}\nEmail: ${email}\n${
      phoneNumber ? `Telefonnummer: ${phoneNumber}\n` : ""
    }Nachricht: ${message}`,
  };

  await transporter.sendMail(mailOptions);
};
