import React, { FC } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Avatar, IconButton, Title, Text } from 'react-native-paper';

import { FETCH_POSTS_QUERY, Post } from '@graphql';
import { appColors, hp, ROUTES, width as deviceWidth, wp } from '@constants';

import PostCard from '../PostCard';
import PostForm from '../PostForm';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import NavigationService, { navigationRef } from '../../navigation/NavigationService';

type Props = Record<string, unknown>;

const HomeScreen: FC<Props> = () => {
  const { loading, data: { getPosts: posts } = {} } = useQuery(FETCH_POSTS_QUERY);
  return (
    <View style={styles.container}>
      <View
        style={{ backgroundColor: '#fff', width: deviceWidth, height: hp(18), paddingLeft: wp(2) }}
      >
        <View
          style={{
            marginTop: hp(5),
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Title style={{ color: '#1c5d99' }}>ericbook</Title>
          <IconButton
            icon="account"
            size={20}
            color={appColors.blue}
            onPress={() => NavigationService.navigate(ROUTES.MAIN.SETTINGS.name)}
          />
        </View>
        <View
          style={{
            marginTop: hp(1),
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'flex-start',
          }}
        >
          <Avatar.Image size={50} source={require('@assets/skydive.jpg')} />
          <TouchableWithoutFeedback
            style={{ marginLeft: wp(3) }}
            onPress={() => NavigationService.navigate(ROUTES.MAIN.CREATE_POST.name)}
          >
            <Text style={{ fontSize: 14 }}>What's on your mind?</Text>
          </TouchableWithoutFeedback>
        </View>
      </View>
      {loading ? (
        <Text>Loading posts...</Text>
      ) : (
        <ScrollView style={{ width: '100%' }} contentContainerStyle={{ alignItems: 'center' }}>
          {posts && posts.map((post: Post) => <PostCard key={post.id} post={post} />)}
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: appColors.black20,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
});

export default HomeScreen;
