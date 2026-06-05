import fs from "fs";
import path from "path";
import crypto from "crypto";

export class UploadService {
  private readonly imageExtensions = [
    ".jpg",
    ".jpeg",
    ".png",
    ".webp",
    ".gif",
  ];

  private readonly videoExtensions = [
    ".mp4",
    ".mov",
    ".avi",
    ".webm",
    ".mkv",
  ];

  upload(
    file: Express.Multer.File,
    protocol: string,
    host: string
  ) {
    if (!file) {
      throw new Error("Arquivo não enviado.");
    }

    const extension = path
      .extname(file.originalname)
      .toLowerCase();

    const isImage =
      file.mimetype.startsWith("image/") &&
      this.imageExtensions.includes(extension);

    const isVideo =
      file.mimetype.startsWith("video/") &&
      this.videoExtensions.includes(extension);

    if (!isImage && !isVideo) {
      throw new Error(
        "Formato inválido. Envie imagem ou vídeo."
      );
    }

    const folder = isImage
      ? "uploads/images"
      : "uploads/videos";

    fs.mkdirSync(folder, { recursive: true });

    const fileName =
      crypto.randomUUID() + extension;

    const filePath = path.join(
      process.cwd(),
      folder,
      fileName
    );

    fs.writeFileSync(filePath, file.buffer);

    return {
      url: `${protocol}://${host}/${folder}/${fileName}`,
      type: isImage ? "image" : "video",
      fileName,
    };
  }
}