import React, { FC, useState } from 'react';
import { View, Modal, TouchableHighlight, StyleSheet } from 'react-native';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { Button, Text } from 'react-native-paper';

import { FETCH_POSTS_QUERY } from '@graphql';
import { appColors, width, height, wp, hp } from '../constants';

type Props = {
  postId: any;
  commentId: any;
  callback: any;
  styleProp?: React.CSSProperties;
};

const DeleteButton: FC<Props> = ({ postId, commentId, callback, styleProp }) => {
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);

  // Dynamic mutation
  const mutation = commentId ? DELETE_COMMENT_MUTATION : DELETE_POST_MUTATION;

  const [deletePostOrMutation] = useMutation(mutation, {
    update(proxy) {
      setShowConfirmDelete(false);
      if (!commentId) {
        // Remove post from cache
        const data = proxy.readQuery({
          query: FETCH_POSTS_QUERY,
        });
        const filteredPosts = data.getPosts.filter((p) => p.id !== postId);
        proxy.writeQuery({
          query: FETCH_POSTS_QUERY,
          data: {
            getPosts: filteredPosts,
          },
        });
        if (callback) callback();
      }
    },
    variables: {
      postId,
      commentId,
    },
  });
  return (
    <>
      <Button
        style={styleProp || { position: 'absolute', right: 0 }}
        color={appColors.blue}
        icon="trash-can-outline"
        onPress={() => setShowConfirmDelete(true)}
      ></Button>
      <Modal animationType="fade" transparent={true} visible={showConfirmDelete}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>{`Are you sure you want to delete this ${
              commentId ? 'comment' : 'post'
            }?`}</Text>
            <View>
              <Button
                color="red"
                labelStyle={{ fontSize: 18, marginBottom: hp(2) }}
                onPress={deletePostOrMutation}
              >
                Delete
              </Button>
              <Button
                color={appColors.teal}
                onPress={() => {
                  setShowConfirmDelete(!showConfirmDelete);
                }}
              >
                Cancel
              </Button>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    width,
    height,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    backgroundColor: appColors.black50,
  },
  modalView: {
    width: wp(70),
    height: hp(25),
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  openButton: {
    backgroundColor: '#F194FF',
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});

const DELETE_POST_MUTATION = gql`
  mutation deletePost($postId: ID!) {
    deletePost(postId: $postId)
  }
`;

const DELETE_COMMENT_MUTATION = gql`
  mutation deleteComment($postId: ID!, $commentId: ID!) {
    deleteComment(postId: $postId, commentId: $commentId) {
      id
      comments {
        id
        username
        createdAt
        body
      }
      commentCount
    }
  }
`;

export default DeleteButton;
