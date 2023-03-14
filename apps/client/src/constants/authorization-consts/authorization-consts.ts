const SIGN_UP_FORM_CONSTANTS = {
  L_Nickname: `Your Nickname is too large`,
  S_Nickname: `Your Nickname is too small`,
  S_Paswword: `You need longer password`,
} as const;

const LOG_IN_FORM_CONSTANTS = {
  L_Nickname: `Your Nickname is not that long`,
  S_Nickname: `Your Nickname is definitely longer`,
  S_Paswword: `Your Password is definitely longer`,
} as const;

const HEALTH_BAR_COLOR_STATE: Record<number, { color: string }> = {
  0: { color: '#B22222' },
  1: { color: '#B22222' },
  2: { color: '#FF8825' },
  3: { color: '#228B22' },
} as const;

export { HEALTH_BAR_COLOR_STATE, LOG_IN_FORM_CONSTANTS, SIGN_UP_FORM_CONSTANTS };
