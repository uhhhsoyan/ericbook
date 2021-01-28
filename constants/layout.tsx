import React from 'react';
import { Dimensions, Platform, View } from 'react-native';

import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';

export const height = Dimensions.get('window').height;
export const width = Dimensions.get('window').width;
export const hp = heightPercentageToDP;
export const wp = widthPercentageToDP;

const isIPhoneXSize = () => height === 812 || width === 812;
const isIPhoneXrSize = () => height === 896 || width === 896;
export const isIPhoneX = Platform.OS === 'ios' && (isIPhoneXSize() || isIPhoneXrSize());
export const isSmallDevice = width < 375;

export const bottomSpacerHeight = isIPhoneX ? 45 : isSmallDevice ? 29 : 49;
export const topSafeAreaViewHeight = isIPhoneX ? 44 : 0;
export const scrollViewHeight = hp('100%') - topSafeAreaViewHeight - bottomSpacerHeight;

export const BottomSpacer = () => <View style={{ height: bottomSpacerHeight }} />;

export const sizeFrom = ({ input = [], output = [], x = 0 }) => {
  if (output.length !== 2 || input.length !== 2) {
    throw new Error('array length must be 2');
  }

  const m = (output[1] - output[0]) / (input[1] - input[0]);
  const b = output[0] - m * input[0];
  const newVal = m * x + b;
  const size = Math.max(newVal, output[0]);
  return Math.min(size, output[1]);
};

export const letterSpacingYW6PS = (x: string) => (x.length > 8 ? wp('1.5%') : wp('2%'));
