import { z } from 'zod';

import { LOG_IN_FORM_CONSTANTS } from '../../constants/authorization-consts/authorization-consts';

export const logInFormSchema = z.object({
  nickname: z
    .string()
    .min(3, LOG_IN_FORM_CONSTANTS.S_Nickname)
    .max(20, LOG_IN_FORM_CONSTANTS.L_Nickname),
  password: z.string().min(4, LOG_IN_FORM_CONSTANTS.S_Password),
});
