import * as React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import SignInScreen from '@components/screens/SignInScreen';
import SignUpScreen from '@components/screens/SignUpScreen';
import { AuthStackParamList } from '@types';
import { ROUTES } from '../constants';

const Auth = createStackNavigator<AuthStackParamList>();

export function AuthStack() {
  return (
    <Auth.Navigator
      initialRouteName={ROUTES.AUTH.SIGN_UP.name}
      screenOptions={{ headerShown: false }}
    >
      <Auth.Screen name={ROUTES.AUTH.SIGN_IN.name} component={SignInScreen} />
      <Auth.Screen name={ROUTES.AUTH.SIGN_UP.name} component={SignUpScreen} />
    </Auth.Navigator>
  );
}
