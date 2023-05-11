import { z } from 'zod';

import { SIGN_IN_FORM_TRANSLATIONS } from '../../constants/authorization/authorization';

export const signInFormSchema = z.object({
  nickname: z
    .string()
    .min(6, SIGN_IN_FORM_TRANSLATIONS.SMALL_NICKNAME)
    .max(20, SIGN_IN_FORM_TRANSLATIONS.LARGE_NICKNAME),
  password: z.string().min(4, SIGN_IN_FORM_TRANSLATIONS.SMALL_PASSWORD),
});
export type SignInSchema = z.infer<typeof signInFormSchema>;
