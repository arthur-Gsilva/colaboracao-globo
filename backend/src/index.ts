import "dotenv/config";

import express from "express";
import path from "path";
import cors from "cors";
import uploadRouter from "./routes/Upload.routes";
import sendRouter from "./routes/Send.routes";

const app = express();

app.use(cors({
  origin: process.env.FRONTEND_URL || '*'
}));

app.use(express.json());

app.use(
  "/uploads",
  express.static(path.join(process.cwd(), "uploads"))
);

app.use("/api", uploadRouter);
app.use("/api", sendRouter);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Servidor iniciado em http://localhost:${PORT}`);
});