import { Router } from "express";
import multer from "multer";
import { UploadController } from "../controllers/UploadController";

const router = Router();

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 100 * 1024 * 1024, // 100MB
  },
});

const controller =
  new UploadController();

router.post(
  "/upload",
  upload.single("file"),
  controller.upload
);

export default router;