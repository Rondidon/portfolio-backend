import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import sendEmailRoutes from "./routes/sendEmail/sendEmail.routes";

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routen
app.use("/api", sendEmailRoutes);

// Server starten
app.listen(PORT, () => {
  console.log(`Server läuft auf http://localhost:${PORT}`);
});
