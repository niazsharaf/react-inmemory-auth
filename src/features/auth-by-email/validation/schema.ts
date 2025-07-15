import { z } from 'zod'

export const authSchema = z.object({
  email: z.string().email('Неверный e-mail'),
  password: z.string().min(6, 'Минимум 6 символов'),
})

export type AuthFormValues = z.infer<typeof authSchema>
