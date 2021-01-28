import * as React from 'react';

import { NavigationContainerRef } from '@react-navigation/native';

export const navigationRef = React.createRef<NavigationContainerRef>();

function navigate(name: string, params?: Record<string, unknown> | undefined) {
  navigationRef.current?.navigate(name, params);
}

function goBack() {
  navigationRef.current?.goBack();
}

export default {
  goBack,
  navigate,
};
