const SIGN_UP_FORM_CONSTANTS = {
  L_Nickname: `Your Nickname is too large`,
  S_Nickname: `Your Nickname is too small`,
  S_Password: `You need longer password`,
  Is_Loading: `Checking your nickname`,
  Is_Error: `Your nickname already use`,
} as const;

const SIGN_IN_FORM_CONSTANTS = {
  L_Nickname: `Your Nickname is not that long`,
  S_Nickname: `Your Nickname is definitely longer`,
  S_Password: `Your Password is definitely longer`,
  Is_Loading: `Checking your data`,
  Is_Error: `Incorect data`,
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
