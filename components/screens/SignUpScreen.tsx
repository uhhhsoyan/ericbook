import React, { FC, useContext, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { TextInput, Button, Title } from 'react-native-paper';
import gql from 'graphql-tag';

import { appColors, ROUTES, width, hp } from '@constants';
import { AuthContext } from '@context';
import NavigationService from '@navigation/NavigationService';
import { useMutation } from '@apollo/react-hooks';
import { DismissKeyboard } from '../../util';

type Props = Record<string, unknown>;

const SignUpScreen: FC<Props> = () => {
  const context = useContext(AuthContext);
  const [errors, setErrors] = useState({});
  const [credentials, setCredentials] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const onChangeText = (text: string, parameter: string) => {
    setCredentials({ ...credentials, [parameter]: text });
  };

  const [addUser, { loading }] = useMutation(REGISTER_USER, {
    update(_, { data: { register: userData } }) {
      context.login(userData);
    },
    onError(err) {
      setErrors(err.graphQLErrors[0].extensions.exception.errors);
    },
    variables: {
      username: credentials.username,
      email: credentials.email,
      password: credentials.password,
      confirmPassword: credentials.confirmPassword,
    },
  });

  function registerUser() {
    addUser();
  }

  const onSubmit = () => {
    registerUser();
  };

  return (
    <DismissKeyboard>
      <View style={styles.container}>
        <Title style={{ fontSize: 32, color: appColors.blue }}>Welcome!</Title>
        <View
          style={{
            width,
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
            error={errors.username ? true : false}
          />
          <TextInput
            mode="outlined"
            label="email"
            autoCorrect={false}
            autoCapitalize="none"
            value={credentials.email}
            onChangeText={(text) => onChangeText(text, 'email')}
            style={{ height: 50, width: '100%', marginBottom: hp(1) }}
            theme={{ colors: { primary: appColors.blue } }}
            error={errors.email ? true : false}
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
            error={errors.password ? true : false}
          />
          <TextInput
            mode="outlined"
            label="confirm password"
            autoCorrect={false}
            autoCapitalize="none"
            secureTextEntry
            value={credentials.confirmPassword}
            onChangeText={(text) => onChangeText(text, 'confirmPassword')}
            style={{ height: 50, width: '100%', marginBottom: hp(1) }}
            theme={{ colors: { primary: appColors.blue } }}
            error={errors.confirmPassword ? true : false}
          />
        </View>
        {errors &&
          Object.values(errors).map((error) => (
            <Text style={{ color: appColors.red }}>{error}</Text>
          ))}
        <Button
          onPress={onSubmit}
          mode="contained"
          color={appColors.blue}
          style={{
            width: width * 0.4,
            height: 50,
            borderRadius: 5,
            marginTop: hp(5),
            marginBottom: hp(3),
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          Sign Up
        </Button>
        <TouchableOpacity onPress={() => NavigationService.navigate(ROUTES.AUTH.SIGN_IN.name)}>
          <Text style={{ textAlign: 'center' }}>Already have an account?{'\n'}Click here!</Text>
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

const REGISTER_USER = gql`
  mutation register(
    $username: String!
    $email: String!
    $password: String!
    $confirmPassword: String!
  ) {
    register(
      registerInput: {
        username: $username
        email: $email
        password: $password
        confirmPassword: $confirmPassword
      }
    ) {
      id
      email
      username
      createdAt
      token
    }
  }
`;

export default SignUpScreen;
