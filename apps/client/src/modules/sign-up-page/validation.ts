import { z } from 'zod';

import { SIGN_UP_FORM_CONSTANTS } from '../../constants/authorization-consts/authorization-consts';

export const SignUpFormSchema = z.object({
  nickname: z
    .string()
    .min(3, SIGN_UP_FORM_CONSTANTS.S_Nickname)
    .max(20, SIGN_UP_FORM_CONSTANTS.L_Nickname),
  password: z.string().min(4, SIGN_UP_FORM_CONSTANTS.S_Paswword),
});
