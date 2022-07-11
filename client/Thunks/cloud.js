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
    console.log(reponse);
  } catch (error) {
    console.error(error);
  }
};
