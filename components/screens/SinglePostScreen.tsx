import React, { FC, useState, useContext, useRef } from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView } from 'react-native';
import { ActivityIndicator, Button, Card, Paragraph } from 'react-native-paper';
import gql from 'graphql-tag';
import moment from 'moment';

import { AuthContext } from '@context';
import NavigationService from '../../navigation/NavigationService';
import { useMutation, useQuery } from '@apollo/react-hooks';
import PostCard from '../PostCard';
import { appColors, hp, wp } from '../../constants';
import DeleteButton from '../DeleteButton';

type Props = Record<string, unknown>;

const SinglePostScreen: FC<Props> = ({ route }) => {
  const { postId } = route.params;
  const { user } = useContext(AuthContext);
  const commentInputRef = useRef(null);
  const [comment, setComment] = useState('');

  const { data: { getPost } = {} } = useQuery(FETCH_POST_QUERY, {
    variables: {
      postId,
    },
  });

  const [submitComment] = useMutation(SUBMIT_COMMENT_MUTATION, {
    update() {
      setComment('');
      commentInputRef.current.blur();
    },
    variables: {
      postId,
      body: comment,
    },
  });

  function deletePostCallback() {
    NavigationService.goBack();
  }

  if (!getPost) {
    return (
      <View style={[styles.container, { justifyContent: 'center' }]}>
        <ActivityIndicator size="large" animating={true} color={appColors.blue} />
      </View>
    );
  } else {
    const { id, comments } = getPost;
    return (
      <View style={styles.container}>
        <PostCard post={getPost} callback={deletePostCallback} />
        <Card style={{ width: wp(100), borderRadius: 0, marginBottom: hp(1) }}>
          <Card.Title
            title="Leave a comment"
            titleStyle={{ fontSize: 18, color: appColors.blue }}
          />
          <Card.Content>
            <TextInput
              placeholder="Comment..."
              autoCorrect
              value={comment}
              onChangeText={(text) => setComment(text)}
              multiline
              style={{ fontSize: 16 }}
              ref={commentInputRef}
            />
          </Card.Content>
          <Card.Actions>
            <Button
              color={appColors.teal}
              onPress={submitComment}
              disabled={comment.trim().length === 0}
            >
              Submit
            </Button>
          </Card.Actions>
        </Card>
        <ScrollView>
          {comments.map((comment) => (
            <Card key={comment.id} style={{ width: wp(100), borderRadius: 0, marginTop: hp(1) }}>
              <Card.Title
                title={comment.username}
                subtitle={moment(comment.createdAt).fromNow(true)}
              />
              {user && user.username === comment.username && (
                <Card.Actions style={{ position: 'absolute', top: hp(2), right: 0 }}>
                  <DeleteButton postId={id} commentId={comment.id} />
                </Card.Actions>
              )}
              <Card.Content>
                <Paragraph>{comment.body}</Paragraph>
              </Card.Content>
            </Card>
          ))}
        </ScrollView>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: appColors.black50,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
});

const FETCH_POST_QUERY = gql`
  query($postId: ID!) {
    getPost(postId: $postId) {
      id
      body
      createdAt
      username
      likeCount
      likes {
        username
      }
      commentCount
      comments {
        id
        username
        createdAt
        body
      }
    }
  }
`;

const SUBMIT_COMMENT_MUTATION = gql`
  mutation($postId: ID!, $body: String!) {
    createComment(postId: $postId, body: $body) {
      id
      comments {
        id
        body
        createdAt
        username
      }
      commentCount
    }
  }
`;

export default SinglePostScreen;
