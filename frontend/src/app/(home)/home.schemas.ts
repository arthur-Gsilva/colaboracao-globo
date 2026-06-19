import { z } from "zod";

export const homeSchema = z.object({
  name: z.string().min(2, "Nome muito curto"),
  city: z.string().min(1, "Cidade obrigatória"),
  message: z
    .string()
    .min(1, "Mensagem obrigatória")
    .max(200, "Limite de 200 caracteres"),
  media: z.string().optional(),
});