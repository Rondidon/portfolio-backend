import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import sendEmailRoutes from "./routes/sendEmail/sendEmail.routes";

const app = express();
const PORT = 5000;

const corsOptions = {
  origin: ["https://www.rfa-kindler.de", "localhost:3000"],
  optionsSuccessStatus: 200,
};

// register middleware
app.use(cors(corsOptions));
app.use(bodyParser.json());

// register routes
app.use("/api", sendEmailRoutes);

// start server
app.listen(PORT, () => {
  console.log(`Server läuft auf http://localhost:${PORT}`);
});
