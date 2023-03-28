import { z } from 'zod';

import { SIGN_IN_FORM_CONSTANTS } from '../../constants/authorization/authorization';

export const signInFormSchema = z.object({
  nickname: z
    .string()
    .min(3, SIGN_IN_FORM_CONSTANTS.SMALL_NICKNAME)
    .max(20, SIGN_IN_FORM_CONSTANTS.LARGE_NICKNAME),
  password: z.string().min(4, SIGN_IN_FORM_CONSTANTS.SMALL_PASSWORD),
});
export type SignInSchema = z.infer<typeof signInFormSchema>;
