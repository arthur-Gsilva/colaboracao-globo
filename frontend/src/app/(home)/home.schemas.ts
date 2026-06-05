import { z } from 'zod'

export const homeSchema = z.object({
    name: z.string('Nome obrigatório').min(2, "Nome muito curto"),
    city: z.string('Cidade obrigatória'),
    message: z.string('Nome obrigatório').max(200, "Limite de caracteres ultrapassado"),
    media: z.string().optional()
})