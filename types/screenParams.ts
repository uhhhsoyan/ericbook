import { NavigatorScreenParams } from '@react-navigation/native';

import { ROUTES } from '@constants';

export type RootStackParamList = {
  [ROUTES.ROOT.AUTH_STACK.name]: NavigatorScreenParams<AuthStackParamList>;
  [ROUTES.ROOT.MAIN_STACK.name]: NavigatorScreenParams<MainStackParamList>;
  [ROUTES.ROOT.NOT_FOUND.name]: undefined;
};

export type MainStackParamList = {
  [ROUTES.MAIN.HOME.name]: undefined;
  [ROUTES.MAIN.CREATE_POST.name]: undefined;
  [ROUTES.MAIN.SINGLE_POST.name]: undefined;
  [ROUTES.MAIN.SETTINGS.name]: undefined;
};

export type AuthStackParamList = {
  [ROUTES.AUTH.SIGN_UP.name]: undefined;
  [ROUTES.AUTH.SIGN_IN.name]: undefined;
};
