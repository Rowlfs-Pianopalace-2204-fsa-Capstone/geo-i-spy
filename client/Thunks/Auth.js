/** @format */

import * as SecureStore from "expo-secure-store";

export const apiAuthLogin = async (username, password) => {
  try {
    const response = await fetch("https://geoispy.herokuapp.com/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });
    const data = await response.json();

    if (data) {
      await SecureStore.setItemAsync("token", data.token);

      apiAuthGetMe();
    }
  } catch (error) {}
};

export const apiAuthSignUp = async (user) => {
  const response = await fetch("https://geoispy.herokuapp.com/auth/signup", {
    method: "POST",
    headers: null,
    body: JSON.stringify(user),
  });
  const data = await response.json();
  return data;
};

export const apiAuthGetMe = async () => {
  const token = await SecureStore.getItemAsync("token");
  const response = await fetch("https://geoispy.herokuapp.com/auth/me", {
    method: "GET",
    headers: { authorization: token },
  });
  const data = await response.json();
  console.log(data);
  return data;
};
