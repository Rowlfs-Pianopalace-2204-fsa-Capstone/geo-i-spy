/** @format */
import * as SecureStore from 'expo-secure-store';
import { GlobalDataContext } from '../Context';
import React from 'react';

export const apiGetAllFollowers = async (id) => {
  const token = await SecureStore.getItemAsync('token');
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
  const token = await SecureStore.getItemAsync('token');
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
  const token = await SecureStore.getItemAsync('token');
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
  const data = await response.json();
  return data;
};
export const apiStartFollowing = async (id) => {
  const token = await SecureStore.getItemAsync('token');
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
  const data = await response.json();
  return data;
};
