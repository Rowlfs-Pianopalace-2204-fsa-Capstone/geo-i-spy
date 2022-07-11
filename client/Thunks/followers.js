/** @format */
import * as SecureStore from 'expo-secure-store';

export const apiGetAllFollowers = async (id) => {
  let token;
  if (window.localStorage) {
    token = window.localStorage.getItem('token');
  } else {
    token = await SecureStore.getItemAsync('token');
  }
  const response = await fetch(
    `https://geoispy.herokuapp.com/api/followers/${id}`,
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

export const apiGetAllFollowing = async (id) => {
  let token;
  if (window.localStorage) {
    token = window.localStorage.getItem('token');
  } else {
    token = await SecureStore.getItemAsync('token');
  }
  const response = await fetch(
    `https://geoispy.herokuapp.com/api/followers/following/${id}`,
    {
      method: 'GET',
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

export const apiStopFollowing = async (id) => {
  let token;
  if (window.localStorage) {
    token = window.localStorage.getItem('token');
  } else {
    token = await SecureStore.getItemAsync('token');
  }
  const response = await fetch(
    `https://geoispy.herokuapp.com/api/followers/${id}`,
    {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        authorization: token,
      },
    }
  );

  return;
};
export const apiStartFollowing = async (id) => {
  let token;
  if (window.localStorage) {
    token = window.localStorage.getItem('token');
  } else {
    token = await SecureStore.getItemAsync('token');
  }
  const response = await fetch(
    `https://geoispy.herokuapp.com/api/followers/${id}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        authorization: token,
      },
    }
  );
  return;
};