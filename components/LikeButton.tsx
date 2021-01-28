import React, { FC, useState, useEffect } from 'react';
import { Button } from 'react-native-paper';
import { useMutation } from '@apollo/react-hooks';
import { PostLike } from '@graphql';

import gql from 'graphql-tag';
import { appColors } from '../constants';

type Props = {
  user: Record<string, unknown>;
  post: {
    id: string;
    likeCount: number;
    likes: PostLike[];
  };
};

const LikeButton: FC<Props> = ({ user, post: { id, likeCount, likes } }) => {
  const [liked, setLiked] = useState(false);
  useEffect(() => {
    if (user && likes.find((like) => like.username === user.username)) {
      setLiked(true);
    } else {
      setLiked(false);
    }
  }, [user, likes]);

  const [likePost] = useMutation(LIKE_POST_MUTATION, {
    variables: { postId: id },
  });

  const onLikePress = () => {
    likePost();
  };

  return (
    <Button
      color={appColors.blue}
      icon={user && liked ? 'thumb-up' : 'thumb-up-outline'}
      onPress={onLikePress}
    >
      {likeCount}
    </Button>
  );
};

// Note: Apollo automatically caches the likes because we get back the post from this mutation
const LIKE_POST_MUTATION = gql`
  mutation likePost($postId: ID!) {
    likePost(postId: $postId) {
      id
      likes {
        id
        username
      }
      likeCount
    }
  }
`;

export default LikeButton;
