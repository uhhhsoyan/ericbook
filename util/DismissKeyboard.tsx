import React, { FC } from 'react';
import { TouchableWithoutFeedback, Keyboard } from 'react-native';

type Props = {
  children: React.ReactNode;
};

const DismissKeyboard: FC<Props> = ({ children }) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>{children}</TouchableWithoutFeedback>
);

export default DismissKeyboard;
