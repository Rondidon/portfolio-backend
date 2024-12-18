import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import helmet from "helmet";
import sendEmailRoutes from "./routes/sendEmail/sendEmail.routes";
import dotenv from "dotenv";

dotenv.config(); // loads .env-files
const app = express();
const PORT = process.env.PORT || 5000; // dynamic port is important as Render (hosting service) directly sets env.PORT

const corsOptions = {
  origin: ["https://www.rfa-kindler.de", "https://localhost:3000"],
  optionsSuccessStatus: 200,
};

// register middleware
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(helmet());

// register routes
app.use("/api", sendEmailRoutes);

// start server
app.listen(PORT, () => {
  if (process.env.NODE_ENV === "production") {
    console.log("Server is running in production mode.");
  } else {
    console.log(
      `Server is running in development mode on http://localhost:${PORT}`
    );
  }
});
