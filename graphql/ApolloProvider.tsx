// Note: apollo boost can handle setup for you, but sometimes issues with auth tokens, etc

import React from 'react';
import ApolloClient from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { createHttpLink } from 'apollo-link-http';
import { ApolloProvider } from '@apollo/react-hooks';
import { setContext } from 'apollo-link-context';
import AsyncStorage from '@react-native-async-storage/async-storage';

const httpLink = createHttpLink({
  uri: 'https://arcane-scrubland-63792.herokuapp.com/',
});

const authLink = setContext(async () => {
  const token = await AsyncStorage.getItem('jwtToken');
  return {
    headers: {
      Authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink), // without authLink this is link: httpLink
  cache: new InMemoryCache(),
});

export function ApolloProviderWrapper({ children }) {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}

//export default ApolloProviderWrapper;
