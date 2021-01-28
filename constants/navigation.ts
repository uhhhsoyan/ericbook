export const ROUTES = {
  ROOT: {
    AUTH_STACK: {
      name: 'AuthStack',
    },
    MAIN_STACK: {
      name: 'MainStack',
    },
    NOT_FOUND: {
      name: 'NotFoundScreen',
    },
  },

  AUTH: {
    SIGN_IN: {
      name: 'SignInScreen',
    },
    SIGN_UP: {
      name: 'SignUpScreen',
    },
  },

  MAIN: {
    HOME: {
      name: 'HomeScreen',
    },
    CREATE_POST: {
      name: 'CreatePostScreen',
    },
    SINGLE_POST: {
      name: 'SinglePostScreen',
    },
    SETTINGS: {
      name: 'SettingsScreen',
    },
  },
} as const;
