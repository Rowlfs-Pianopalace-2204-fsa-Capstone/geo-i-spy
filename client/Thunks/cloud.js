/** @format */
import * as SecureStore from 'expo-secure-store';

export const pictureToCloud = async (base64EncodedImage, id) => {
  try {
    let token;
    if (window.localStorage) {
      token = window.localStorage.getItem('token');
    } else {
      token = await SecureStore.getItemAsync('token');
    }
    const reponse = await fetch(
      `https://geoispy.herokuapp.com/api/achievements/${id}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', authorization: token },
        body: JSON.stringify({ data: base64EncodedImage }),
      }
    );
    return;
  } catch (error) {
    console.error(error);
  }
};

export const apiGetAllAchievements = async () => {
  try {
    let token;
    if (window.localStorage) {
      token = window.localStorage.getItem('token');
    } else {
      token = await SecureStore.getItemAsync('token');
    }
    const response = await fetch(
      `https://geoispy.herokuapp.com/api/achievements`,
      {
        method: 'GET',
        headers: { 'Content-Type': 'application/json', authorization: token },
      }
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const changeProfilePic = async (base64EncodedImage) => {
  try {
    let token;
    if (window.localStorage) {
      token = window.localStorage.getItem('token');
    } else {
      token = await SecureStore.getItemAsync('token');
    }
    const image = `data:image/jpeg;base64,${base64EncodedImage}`;

    const response = await fetch(
      `https://geoispy.herokuapp.com/api/users/edit/photo`,
      {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', authorization: token },
        body: JSON.stringify({ data: image }),
      }
    );
    const data = await response.json();

    return data;
  } catch (error) {
    console.error(error);
  }
};
