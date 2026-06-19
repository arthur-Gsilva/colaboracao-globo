import { prisma } from "../libs/prisma";
import type { CreateMessageDto } from "../types/message";

export class SendService {
  async send(data: CreateMessageDto) {
    const message = await prisma.message.create({
      data: {
        name: data.name,
        city: data.city,
        message: data.message,
        mediaUrl: data.mediaUrl ?? null,
        mediaType: data.mediaType ?? null,
      },
    });

    return message;
  }

  async findAll() {
    return prisma.message.findMany({
      orderBy: { createdAt: "desc" },
    });
  }
}