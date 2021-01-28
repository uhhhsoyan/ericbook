import React, { FC, useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';

import { AuthContext } from '@context';
import { appColors } from '../../constants';

type Props = Record<string, unknown>;

const SettingsScreen: FC<Props> = () => {
  const { logout } = useContext(AuthContext);
  return (
    <View style={styles.container}>
      <Button color={appColors.blue} onPress={() => logout()}>
        Log Out
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default SettingsScreen;
