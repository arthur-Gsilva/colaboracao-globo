import express from "express";
import path from "path";
import cors from "cors";
import router from "./routes/Upload.routes";


const app = express();

app.use(cors());

app.use(express.json());

app.use(
  "/uploads",
  express.static(
    path.join(process.cwd(), "uploads")
  )
);

app.use("/api", router);
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(
    `🚀 Servidor iniciado em http://localhost:${PORT}`
  );
});