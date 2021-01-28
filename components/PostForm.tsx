import React, { FC, useState, useContext } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
import { Title, Avatar, Button } from 'react-native-paper';

import { AuthContext } from '@context';
import { wp, hp, width, appColors } from '@constants';
import { FETCH_POSTS_QUERY } from '@graphql';
import NavigationService from '../navigation/NavigationService';

type Props = {};

const PostForm: FC<Props> = ({}) => {
  const { user } = useContext(AuthContext);
  const [body, setBody] = useState('');

  const [createPost, { error }] = useMutation(CREATE_POST_MUTATION, {
    variables: {
      body,
    },
    update(proxy, result) {
      // Access the cache
      const data = proxy.readQuery({
        query: FETCH_POSTS_QUERY,
      });
      // Edit the getPosts cache data
      // data.getPosts = [result.data.createPost, ...data.getPosts]
      // Persist it
      proxy.writeQuery({
        query: FETCH_POSTS_QUERY,
        data: {
          getPosts: [result.data.createPost, ...data.getPosts],
        },
      });
      setBody('');
      NavigationService.goBack();
    },
    // Code I added
    onError(err) {
      console.log(err);
    },
  });

  function createPostCallback() {
    createPost();
  }

  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          width,
          padding: wp(3),
        }}
      >
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          <Avatar.Image size={50} source={require('@assets/skydive.jpg')} />
          {user && <Title style={{ marginLeft: wp(3) }}>{user.username}</Title>}
        </View>
        <Button
          labelStyle={{ fontSize: 16 }}
          color={appColors.blue}
          style={{ marginRight: wp(5), display: body.length > 0 ? 'flex' : 'none' }}
          onPress={() => createPostCallback()}
        >
          Post
        </Button>
      </View>
      <TextInput
        placeholder="What's on your mind?"
        value={body}
        onChangeText={(text) => setBody(text)}
        style={{ fontSize: 16, width: wp(100), padding: wp(3) }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

const CREATE_POST_MUTATION = gql`
  mutation createPost($body: String!) {
    createPost(body: $body) {
      id
      body
      createdAt
      username
      likes {
        id
        username
        createdAt
      }
      likeCount
      comments {
        id
        body
        username
        createdAt
      }
      commentCount
    }
  }
`;

export default PostForm;
