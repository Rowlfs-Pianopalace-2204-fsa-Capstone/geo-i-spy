/** @format */
import * as SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';

export const apiGetAllRooms = async () => {
  let token;
  if (window.localStorage) {
    token = window.localStorage.getItem('token');
  } else {
    token = await SecureStore.getItemAsync('token');
  }
  const response = await fetch(`https://geoispy.herokuapp.com/api/rooms`, {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      authorization: token,
    },
  });
  const data = await response.json();
  return data;
};

export const apiGetRoom = async (id) => {
  let token;
  if (window.localStorage) {
    token = window.localStorage.getItem('token');
  } else {
    token = await SecureStore.getItemAsync('token');
  }
  const response = await fetch(
    `https://geoispy.herokuapp.com/api/rooms/${id}`,
    {
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

// await apiCreateRoom(otherUserId)
// navigate to allrooms
// navigate to singleroom
export const apiCreateRoom = async (id) => {
  let token;
  if (window.localStorage) {
    token = await window.localStorage.getItem('token');
  } else {
    token = await SecureStore.getItemAsync('token');
  }
  const response = await fetch(
    `https://geoispy.herokuapp.com/api/rooms/${id}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        authorization: token,
      },
    }
  );
  // console.log('ROUTE =====', response);
  // const data = await response.json();
  // console.log(data);
  return;
};
