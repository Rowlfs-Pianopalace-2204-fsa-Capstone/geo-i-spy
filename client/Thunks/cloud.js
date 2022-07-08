/** @format */
import * as SecureStore from 'expo-secure-store';

export const pictureToCloud = async (base64EncodedImage) => {
  try {
    const token = await SecureStore.getItemAsync('token');
    const reponse = await fetch(
      `https://geoispy.herokuapp.com/api/achievements/4
  `,
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
