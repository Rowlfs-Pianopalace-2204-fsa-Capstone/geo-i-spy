/** @format */

import * as SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';

export const apiPostMessage = async (id, message) => {
  let token;
  if (window.localStorage) {
    token = window.localStorage.getItem('token');
  } else {
    token = await SecureStore.getItemAsync('token');
  }
  const response = await fetch(
    `https://geoispy.herokuapp.com/api/rooms/${id}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        authorization: token,
      },
      body: { message: message },
    }
  );
  const data = await response.json();
  return data;
};

export const apiDeleteMessage = async (id) => {
  let token;
  if (window.localStorage) {
    token = window.localStorage.getItem('token');
  } else {
    token = await SecureStore.getItemAsync('token');
  }
  const response = await fetch(
    `https://geoispy.herokuapp.com/api/message/${id}`,
    {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        authorization: token,
      },
    }
  );
  const data = await response.json();
  return data;
};

export const apiEditMessage = async (id, message) => {
  let token;
  if (window.localStorage) {
    token = window.localStorage.getItem('token');
  } else {
    token = await SecureStore.getItemAsync('token');
  }
  const response = await fetch(
    `https://geoispy.herokuapp.com/api/message/${id}`,
    {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        authorization: token,
      },
      body: { message: message },
    }
  );
  const data = await response.json();
  return data;
};
