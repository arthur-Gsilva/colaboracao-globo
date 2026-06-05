import type { Request, Response } from "express";
import { UploadService } from "../services/UploadService";
import {
  errorResult,
  successResult,
} from "../types/ResponseDto";

export class UploadController {
  private readonly uploadService =
    new UploadService();

  upload = async (
    req: Request,
    res: Response
  ) => {
    try {
      const file = req.file;

      const result =
        this.uploadService.upload(
          file!,
          req.protocol,
          req.get("host")!
        );

      return res.status(200).json(
        successResult(
          result,
          "Upload realizado com sucesso."
        )
      );
    } catch (error: any) {
      return res
        .status(400)
        .json(errorResult(error.message));
    }
  };
}