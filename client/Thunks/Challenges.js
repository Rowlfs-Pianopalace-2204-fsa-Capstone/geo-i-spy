export const apiGetAllChallenges = async () => {
  const response = await fetch("/api/challenges");
  const data = await response.json();
  return data;
};

export const apiGetSingleChallenge = async (id) => {
  const response = await fetch(`/api/challenges/${id}`);
  const data = await response.json();
  return data;
};

export const apiDeleteChallenge = async (id) => {
  const response = await fetch(`/api/challenges/${id}`, {
    method: "DELETE",
    headers: null,
  });
  const data = await response.json();
  return data;
};

export const apiPostChallenge = async (challenge) => {
  const response = await fetch("/api/challenges", {
    method: "POST",
    headers: null,
    body: JSON.stringify(challenge),
  });
  const data = await response.json();
  return data;
};

export const apiUpdateChallenge = async (challenge) => {
  const response = await fetch(`/api/challenges/${challenge.id}`, {
    method: "PUT",
    headers: null,
    body: JSON.stringify(challenge),
  });
  const data = await response.json();
  return data;
};
