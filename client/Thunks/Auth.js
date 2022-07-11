/** @format */

import * as SecureStore from 'expo-secure-store';

export const apiAuthLogin = async (username, password) => {
  try {
    const response = await fetch('https://geoispy.herokuapp.com/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });
    const data = await response.json();

    if (data) {
      if (window.localStorage) {
        window.localStorage.setItem('token', data.token);
      } else {
        await SecureStore.setItemAsync('token', data.token);
      }
      return apiAuthGetMe();
    }
  } catch (error) {
    console.error(error);
  }
};

export const apiAuthSignUp = async (user) => {
  const response = await fetch('https://geoispy.herokuapp.com/auth/signup', {
    method: 'POST',
    headers: null,
    body: JSON.stringify(user),
  });
  const data = await response.json();
};

export const apiAuthGetMe = async () => {
  let token;
  if (window.localStorage) {
    token = window.localStorage.getItem('token');
  } else {
    token = await SecureStore.getItemAsync('token');
  }
  const response = await fetch('https://geoispy.herokuapp.com/auth/me', {
    method: 'GET',
    headers: { authorization: token },
  });
  const data = await response.json();

  return data;
};
