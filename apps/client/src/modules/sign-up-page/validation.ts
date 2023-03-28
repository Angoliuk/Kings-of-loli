import { z } from 'zod';

import { SIGN_UP_FORM_CONSTANTS } from '../../constants/authorization/authorization';

export const SignUpFormSchema = z.object({
  nickname: z
    .string()
    .min(3, SIGN_UP_FORM_CONSTANTS.SMALL_NICKNAME)
    .max(20, SIGN_UP_FORM_CONSTANTS.LARGE_NICKNAME),
  password: z.string().min(4, SIGN_UP_FORM_CONSTANTS.SMALL_PASSWORD),
});

export type SignUpSchema = z.infer<typeof SignUpFormSchema>;
