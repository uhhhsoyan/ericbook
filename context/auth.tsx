import React, { createContext, useReducer } from 'react';
import jwtDecode from 'jwt-decode';
import AsyncStorage from '@react-native-async-storage/async-storage';

const initialState = {
  user: null,
};

// Check if JWT available in local storage (e.g. persist through page refresh)

async () => {
  try {
    const token = await AsyncStorage.getItem('jwtToken');
    if (token !== null) {
      const decodedToken = jwtDecode(token);
      if (decodedToken.exp * 1000 < Date.now()) {
        localStorage.removeItem('jwtToken');
      } else {
        initialState.user = decodedToken; // TODO: Figure out why setting to decodedToken and not corresponding user data ???
      }
    }
  } catch (e) {
    // error reading value
  }
};

// if (AsyncStorage.getItem('jwtToken')) {
//   console.log(AsyncStorage.getItem('jwtToken'));
//   const decodedToken = jwtDecode(AsyncStorage.getItem('jwtToken'));
//   console.log('Decoded token is:');
//   console.log(decodedToken);

//   if (decodedToken.exp * 1000 < Date.now()) {
//     localStorage.removeItem('jwtToken');
//   } else {
//     initialState.user = decodedToken; // TODO: Figure out why setting to decodedToken and not corresponding user data ???
//   }
// }

const AuthContext = createContext({
  user: null,
  login: (userData) => {},
  logout: () => {},
});

function authReducer(state, action) {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        user: action.payload,
      };
    case 'LOGOUT':
      return {
        ...state,
        user: null,
      };
    default:
      return state;
  }
}

function AuthProvider(props) {
  const [state, dispatch] = useReducer(authReducer, initialState);

  async function login(userData) {
    await AsyncStorage.setItem('jwtToken', userData.token);
    dispatch({
      type: 'LOGIN',
      payload: userData,
    });
  }

  async function logout() {
    await AsyncStorage.removeItem('jwtToken');
    dispatch({
      type: 'LOGOUT',
    });
  }

  return (
    <AuthContext.Provider
      value={{ user: state.user, login, logout }}
      {...props} // in case we need to access props from parent component
    />
  );
}

export { AuthContext, AuthProvider };
