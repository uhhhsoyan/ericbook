import React, { FC, useState, useContext } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Text, TextInput, Button, Title, ActivityIndicator } from 'react-native-paper';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';

import { appColors, hp, ROUTES, width as deviceWidth } from '@constants';
import NavigationService from '@navigation/NavigationService';
import { AuthContext } from '@context';
import { DismissKeyboard } from '../../util';

type Props = Record<string, unknown>;

const SignInScreen: FC<Props> = () => {
  const context = useContext(AuthContext);
  const [errors, setErrors] = useState({});

  // TODO: Update to use useForm hook
  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
  });

  const onChangeText = (text: string, parameter: string) => {
    setCredentials({ ...credentials, [parameter]: text });
  };

  const [loginUser, { loading }] = useMutation(LOGIN_USER, {
    // update triggered if mutation successful
    update(_, { data: { login: userData } }) {
      // destructuring data from result, login from data, aliasing as userData
      context.login(userData);
      // NavigationService.navigate(ROUTES.MAIN.HOME.name); // Redirect to the home page
    },
    onError(err) {
      // Note: below code is based on how we set up our server code (e.g. it can vary)
      setErrors(err.graphQLErrors[0].extensions.exception.errors);
    },
    variables: {
      username: credentials.username,
      password: credentials.password,
    },
  });

  // Note: Need to use function keyword to hoist this function and make addUser available to useForm call above;
  // if we had called useForm after useMutation, useMutation would not have access to 'values'
  function loginUserCallback() {
    loginUser();
  }

  const onSubmit = () => {
    loginUserCallback();
  };

  return (
    <DismissKeyboard>
      <View style={styles.container}>
        <Title style={{ fontSize: 32, color: appColors.blue }}>Welcome back!</Title>
        <View
          style={{
            width: deviceWidth,
            padding: 30,
          }}
        >
          <TextInput
            mode="outlined"
            label="username"
            autoCorrect={false}
            autoCapitalize="none"
            value={credentials.username}
            onChangeText={(text) => onChangeText(text, 'username')}
            style={{ height: 50, width: '100%', marginBottom: hp(1) }}
            theme={{ colors: { primary: appColors.blue } }}
          />
          <TextInput
            mode="outlined"
            label="password"
            autoCorrect={false}
            autoCapitalize="none"
            secureTextEntry
            value={credentials.password}
            onChangeText={(text) => onChangeText(text, 'password')}
            style={{ height: 50, width: '100%', marginBottom: hp(1) }}
            theme={{ colors: { primary: appColors.blue } }}
          />
        </View>
        {Object.keys(errors).length > 0 && (
          <Text style={{ color: appColors.red }}>Sign in failed. {errors.general} </Text>
        )}
        {loading ? (
          <View style={{ height: 50, marginTop: hp(5), marginBottom: hp(3) }}>
            <ActivityIndicator size="large" animating={true} color={appColors.blue} />
          </View>
        ) : (
          <Button
            onPress={onSubmit}
            mode="contained"
            color={appColors.blue}
            style={{
              width: deviceWidth * 0.4,
              height: 50,
              borderRadius: 5,
              marginTop: hp(5),
              marginBottom: hp(3),
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            Sign In
          </Button>
        )}
        <TouchableOpacity onPress={() => NavigationService.navigate(ROUTES.AUTH.SIGN_UP.name)}>
          <Text style={{ textAlign: 'center' }}>Need to sign up?{'\n'}Click here!</Text>
        </TouchableOpacity>
      </View>
    </DismissKeyboard>
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

const LOGIN_USER = gql`
  mutation register($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      id
      email
      username
      createdAt
      token
    }
  }
`;

export default SignInScreen;
