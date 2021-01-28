import React, { FC } from 'react';
import { View, Text, StyleSheet } from 'react-native';

type Props = Record<string, unknown>;

const NotFoundScreen: FC<Props> = () => {
  return (
    <View style={styles.container}>
      <Text>NotFoundScreen</Text>
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

export default NotFoundScreen;
