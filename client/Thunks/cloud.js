/** @format */

export const pictureToCloud = async (base64EncodedImage) => {
  console.log(base64EncodedImage);
  try {
    const reponse = await fetch(
      `https://geoispy.herokuapp.com/api/achievements
  `,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ data: base64EncodedImage }),
      }
    );
    console.log(reponse);
  } catch (error) {
    console.error(error);
  }
};
