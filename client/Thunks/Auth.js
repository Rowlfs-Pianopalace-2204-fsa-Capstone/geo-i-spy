export const apiAuthLogin = async (user) => {
  const response = await fetch("/auth/login", {
    method: "POST",
    headers: null,
    body: JSON.stringify(user),
  });
  const data = await response.json();
  return data;
};

export const apiAuthSignUp = async (user) => {
  const response = await fetch("/auth/signup", {
    method: "POST",
    headers: null,
    body: JSON.stringify(user),
  });
  const data = await response.json();
  return data;
};

export const apiAuthGetMe = async () => {
  const response = await fetch("/auth/me", {
    method: "GET",
    headers: null,
  });
  const data = await response.json();
  return data;
};
