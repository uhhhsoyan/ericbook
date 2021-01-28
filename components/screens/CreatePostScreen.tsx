import React, { FC, useContext } from 'react';
import { View, StyleSheet } from 'react-native';

import { wp } from '@constants';
import PostForm from '@components/PostForm';

type Props = Record<string, unknown>;

const CreatePostScreen: FC<Props> = () => {
  return (
    <View style={styles.container}>
      <PostForm />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingLeft: wp(5),
  },
});

export default CreatePostScreen;
