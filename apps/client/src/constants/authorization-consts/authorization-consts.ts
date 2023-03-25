const SIGN_UP_FORM_CONSTANTS = {
  L_Nickname: `Your Nickname is too large`,
  S_Nickname: `Your Nickname is too small`,
  S_Paswword: `You need longer password`,
  Is_Loading: `Checking your nickname`,
  Is_Error: `Your nickname already use`,
} as const;

const LOG_IN_FORM_CONSTANTS = {
  L_Nickname: `Your Nickname is not that long`,
  S_Nickname: `Your Nickname is definitely longer`,
  S_Paswword: `Your Password is definitely longer`,
  Is_Loading: `Checking your data`,
  Is_Error: `Incorect data`,
} as const;

enum SignUpFormInputState {
  nickname = 'nickname',
  password = 'password',
}
enum LogInFormInputState {
  nickname = 'nickname',
  password = 'password',
}

export { LOG_IN_FORM_CONSTANTS, LogInFormInputState, SIGN_UP_FORM_CONSTANTS, SignUpFormInputState };
