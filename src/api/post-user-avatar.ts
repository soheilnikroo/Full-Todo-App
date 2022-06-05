import axios from 'axios';
import { BASE_URL } from './baseUrl';

interface BodyType {
  imageUrl: any;
}

const postUserAvatarRequest = async ({
  access_token,
  body,
}: {
  access_token: string;
  body: BodyType;
}) => {
  console.log(body.imageUrl);

  const response = await axios.post(
    `${BASE_URL}/users/me/avatar`,
    body.imageUrl,
    {
      onUploadProgress: (progressEvent) => {
        const { loaded, total } = progressEvent;
        const percent = Math.floor((loaded * 100) / total);
        console.log(` file uploaded: ${percent}%`);
      },

      headers: {
        Authorization: `Bearer ${access_token}`,
        'Content-Type': 'multipart/form-data',
      },
    }
  );

  return response.data;
};

export default postUserAvatarRequest;
