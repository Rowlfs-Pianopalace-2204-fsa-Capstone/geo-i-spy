/** @format */

export const apiGetAllChallenges = async () => {
  const response = await fetch('https://geoispy.herokuapp.com/api/challenges', {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  });

  const data = await response.json();
  return data;
};

export const apiGetSingleChallenge = async (id) => {
  const response = await fetch(
    `https://geoispy.herokuapp.com/api/challenges/${id}`
  );
  const data = await response.json();
  return data;
};

export const apiDeleteChallenge = async (id) => {
  const response = await fetch(
    `https://geoispy.herokuapp.com/api/challenges/${id}`,
    {
      method: 'DELETE',
      headers: null,
    }
  );
  const data = await response.json();
  return data;
};

export const apiPostChallenge = async (challenge) => {
  const response = await fetch('https://geoispy.herokuapp.com/api/challenges', {
    method: 'POST',
    headers: null,
    body: JSON.stringify(challenge),
  });
  const data = await response.json();
  return data;
};

export const apiUpdateChallenge = async (challenge) => {
  const response = await fetch(
    `https://geoispy.herokuapp.com/api/challenges/${challenge.id}`,
    {
      method: 'PUT',
      headers: null,
      body: JSON.stringify(challenge),
    }
  );
  const data = await response.json();
  return data;
};

export const apiSendToCloudVision = async (image) => {
  let body = JSON.stringify({
    requests: [
      {
        features: [
          { type: 'LABEL_DETECTION', maxResults: 10 },
          // { type: 'LANDMARK_DETECTION', maxResults: 5 },
          // { type: 'FACE_DETECTION', maxResults: 5 },
          // { type: 'LOGO_DETECTION', maxResults: 5 },
          // { type: 'TEXT_DETECTION', maxResults: 5 },
          // { type: 'DOCUMENT_TEXT_DETECTION', maxResults: 5 },
          // { type: 'SAFE_SEARCH_DETECTION', maxResults: 5 },
          // { type: 'IMAGE_PROPERTIES', maxResults: 5 },
          // { type: 'CROP_HINTS', maxResults: 5 },
          // { type: 'WEB_DETECTION', maxResults: 5 },
        ],
        image: {
          content: image,
        },
      },
    ],
  });
  let response = await fetch(
    'https://vision.googleapis.com/v1/images:annotate?key=AIzaSyA7XC9GtbutkELajb80zbyoOCJfraTFPgg',
    {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: body,
    }
  );

  return response;
};
