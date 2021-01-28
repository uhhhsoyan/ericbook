import React, { useContext } from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
//import AppLoading from 'expo-app-loading';
//import { useSelector } from 'react-redux';

import { ROUTES } from '@constants';
import { MainNavigator } from '@navigation/MainNavigator';
import LinkingConfiguration from '@navigation/LinkingConfiguration';
import { navigationRef } from '@navigation/NavigationService';
import { RootStackParamList } from '@types';
//import { useAuthSetup } from '../hooks';
import { AuthStack } from './AuthStack';
import { AuthContext } from '../context/auth';

export default function Navigation() {
  return (
    <NavigationContainer ref={navigationRef} linking={LinkingConfiguration}>
      <RootNavigator />
    </NavigationContainer>
  );
}

const Stack = createStackNavigator<RootStackParamList>();

function RootNavigator() {
  //const { authLoading } = useAuthSetup();
  // const loggedIn = useSelector(({ user: { auth } }: { user: { auth: boolean } }) => auth);

  // if (authLoading) {
  //   return <AppLoading />;
  // }

  const { user } = useContext(AuthContext);

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {user ? (
        <Stack.Screen name={ROUTES.ROOT.MAIN_STACK.name} component={MainNavigator} />
      ) : (
        <Stack.Screen name={ROUTES.ROOT.AUTH_STACK.name} component={AuthStack} />
      )}
    </Stack.Navigator>
  );
}
