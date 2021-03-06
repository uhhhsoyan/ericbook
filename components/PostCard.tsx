import React, { FC, useContext } from 'react';
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';
import moment from 'moment';

import { Post } from '@graphql';
import LikeButton from './LikeButton';
import { AuthContext } from '@context';
import { appColors, hp, ROUTES, width } from '../constants';
import NavigationService from '../navigation/NavigationService';
import DeleteButton from './DeleteButton';

const LeftContent = (props) => (
  <Avatar.Icon {...props} style={{ backgroundColor: appColors.blue }} icon="account" />
);

type Props = {
  post: Post;
  callback?: () => void;
};

const PostCard: FC<Props> = ({
  post: { body, createdAt, id, username, likeCount, commentCount, likes, comments },
  callback,
}) => {
  const { user } = useContext(AuthContext);
  return (
    <Card
      style={{
        width,
        margin: hp(0.4),
        borderRadius: 0,
      }}
    >
      <Card.Title title={username} subtitle={moment(createdAt).fromNow(true)} left={LeftContent} />
      <Card.Content>
        <Paragraph>{body}</Paragraph>
      </Card.Content>
      <Card.Actions>
        <LikeButton user={user} post={{ id, likes, likeCount }} />
        <Button
          color={appColors.blue}
          icon="comment-multiple-outline"
          onPress={() =>
            NavigationService.navigate(ROUTES.MAIN.SINGLE_POST.name, {
              postId: id,
            })
          }
        >
          {commentCount}
        </Button>
        {user && user.username === username && <DeleteButton postId={id} callback={callback} />}
      </Card.Actions>
    </Card>
  );
};

export default PostCard;
