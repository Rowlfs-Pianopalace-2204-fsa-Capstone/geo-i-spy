/** @format */

import * as SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';
// import socket from './Socket';

export const apiPostMessage = async (id, message, otherUserId) => {
  let token;
  if (window.localStorage) {
    token = window.localStorage.getItem('token');
  } else {
    token = await SecureStore.getItemAsync('token');
  }
  const response = await fetch(
    `https://geoispy.herokuapp.com/api/messages/${id}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        authorization: token,
      },
      body: JSON.stringify(message),
    }
  );
  const data = await response.json();

  if (data) {
    console.log(otherUserId);
    // socket.emit('resetMessage', { id: id, userId: otherUserId });
  }
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
