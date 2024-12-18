import { Router, Request, Response } from "express";
import { sendMail } from "./mailer";
import { body, validationResult } from "express-validator";
import morgan from "morgan";

const router = Router();

// same as in frontend
interface FormData {
  name: string;
  email: string;
  phoneNumber: string;
  subject: string;
  message: string;
}

// logs
router.use(
  morgan(
    ":method :url :status :res[content-length] - :response-time ms :remote-addr :user-agent"
  )
);

// POST-Route for send-mail with XSS protection
router.post(
  "/send-email",
  [
    body("name").notEmpty().trim().escape(),
    body("email").notEmpty().isEmail().normalizeEmail(),
    body("phoneNumber").optional({ checkFalsy: true }).trim().escape(),
    body("subject").notEmpty().trim().escape(),
    body("message").notEmpty().trim().escape(),
  ],
  async (req: Request, res: Response): Promise<void> => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ success: false, error: "error-validation" });
      console.error("Error in POST send-mail: ", "error-validation");
      return;
    }

    const { name, email, phoneNumber, subject, message }: FormData = req.body;

    try {
      await sendMail(name, email, phoneNumber, subject, message);
      res.status(200).json({ success: true, message: "success" });
      console.log("Message in POST send-mail", "success");
    } catch (error) {
      console.error("Error in POST send-mail: ", error);
      res.status(500).json({ success: false, error: "error-internal" });
    }
  }
);

export default router;
