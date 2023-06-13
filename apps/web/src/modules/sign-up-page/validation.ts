import { SIGN_UP_FORM_TRANSLATIONS } from '@web/constants/authorization/authorization';
import { z } from 'zod';

export const SignUpFormSchema = z.object({
  nickname: z
    .string()
    .min(6, SIGN_UP_FORM_TRANSLATIONS.SMALL_NICKNAME)
    .max(20, SIGN_UP_FORM_TRANSLATIONS.LARGE_NICKNAME),
  password: z.string().min(4, SIGN_UP_FORM_TRANSLATIONS.SMALL_PASSWORD),
});

export type SignUpSchema = z.infer<typeof SignUpFormSchema>;
