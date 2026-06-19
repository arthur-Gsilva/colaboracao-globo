import type { Request, Response } from "express";
import { SendService } from "../services/SendService";
import { successResult, errorResult } from "../types/ResponseDto";

export class SendController {
  private readonly sendService = new SendService();

  send = async (req: Request, res: Response) => {
    try {
      const { name, city, message, mediaUrl, mediaType } = req.body;

      if (!name || !city || !message) {
        return res
          .status(400)
          .json(errorResult("Campos obrigatórios ausentes."));
      }

      const result = await this.sendService.send({
        name,
        city,
        message,
        mediaUrl,
        mediaType,
      });

      return res
        .status(201)
        .json(successResult(result, "Mensagem enviada com sucesso."));
    } catch (error: any) {
      return res.status(500).json(errorResult(error.message));
    }
  };

  list = async (_req: Request, res: Response) => {
    try {
      const messages = await this.sendService.findAll();
      return res
        .status(200)
        .json(successResult(messages, "Mensagens listadas com sucesso."));
    } catch (error: any) {
      return res.status(500).json(errorResult(error.message));
    }
  };
}