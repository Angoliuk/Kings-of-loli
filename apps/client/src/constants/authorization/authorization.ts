const SIGN_UP_FORM_TRANSLATIONS = {
  LARGE_NICKNAME: `Your Nickname is too large`,
  SMALL_NICKNAME: `Your Nickname is too small`,
  SMALL_PASSWORD: `You need longer password`,
  IS_LOADING: `Checking your nickname`,
  IS_ERROR: `Your nickname already use`,
} as const;

const SIGN_UP_FORM_TRANSLATIONS = {
  LARGE_NICKNAME: `Your Nickname is not that long`,
  SMALL_NICKNAME: `Your Nickname is definitely longer`,
  SMALL_PASSWORD: `Your Password is definitely longer`,
  IS_LOADING: `Checking your data`,
  IS_ERROR: `Incorect data`,
} as const;

enum SignUpFormFields {
  NICKNAME_TYPE = 'nickname',
  NICKNAME_PLACEHOLDER = 'Your nickname',
  PASSWORD_PLACEHOLDER = 'qwerty',
  PASSWORD_TYPE = 'password',
}
enum SignInFormFields {
  NICKNAME_TYPE = 'nickname',
  NICKNAME_PLACEHOLDER = 'Your nickname',
  PASSWORD_PLACEHOLDER = 'qwerty',
  PASSWORD_TYPE = 'password',
}

export { SIGN_IN_FORM_CONSTANTS, SIGN_UP_FORM_CONSTANTS, SignInFormFields, SignUpFormFields };
