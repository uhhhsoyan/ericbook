import * as React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import {
  HomeScreen,
  CreatePostScreen,
  SinglePostScreen,
  SettingsScreen,
} from '@components/screens';
import { ROUTES } from '@constants';
import { MainStackParamList } from '@types';
import { IconButton } from 'react-native-paper';
import NavigationService from './NavigationService';

const MainStack = createStackNavigator<MainStackParamList>();

const closeButton = () => {
  return <IconButton icon="close" size={20} onPress={() => NavigationService.goBack()} />;
};

export const MainNavigator = () => {
  return (
    <MainStack.Navigator
      initialRouteName={ROUTES.MAIN.HOME.name}
      mode="modal"
      screenOptions={{
        headerShown: false,
        gestureEnabled: false,
      }}
    >
      <MainStack.Screen name={ROUTES.MAIN.HOME.name} component={HomeScreen} />
      <MainStack.Screen
        name={ROUTES.MAIN.CREATE_POST.name}
        component={CreatePostScreen}
        options={{
          headerShown: true,
          title: 'Create Post',
          headerLeft: closeButton,
        }}
      />
      <MainStack.Screen
        name={ROUTES.MAIN.SINGLE_POST.name}
        component={SinglePostScreen}
        options={{
          headerShown: true,
          title: 'Post Details',
          headerLeft: closeButton,
        }}
      />
      <MainStack.Screen
        name={ROUTES.MAIN.SETTINGS.name}
        component={SettingsScreen}
        options={{
          headerShown: true,
          title: 'My Account',
          headerLeft: closeButton,
        }}
      />
    </MainStack.Navigator>
  );
};
