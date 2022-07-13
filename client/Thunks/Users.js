import * as SecureStore from 'expo-secure-store';

export const apiEditUser = async (user) => {
  const response = await fetch(
    `https://geoispy.herokuapp.com/api/users/${user.id}`,
    {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(user),
    }
  );
  const data = await response.json();
  if (data) {
    if (Platform.OS === 'web') {
      window.localStorage.setItem('token', data.token);
    } else {
      await SecureStore.setItemAsync('token', data.token);
    }
    return data;
  }
};
