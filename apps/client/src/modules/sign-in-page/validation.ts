import { z } from 'zod';

import { SIGN_IN_FORM_CONSTANTS } from '../../constants/authorization-consts/authorization-consts';

export const SignInFormSchema = z.object({
  nickname: z
    .string()
    .min(3, SIGN_IN_FORM_CONSTANTS.S_Nickname)
    .max(20, SIGN_IN_FORM_CONSTANTS.L_Nickname),
  password: z.string().min(4, SIGN_IN_FORM_CONSTANTS.S_Paswword),
});
