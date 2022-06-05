import axios from 'axios';
import { BASE_URL } from './baseUrl';

interface BodyType {
  userName?: string;
  imageUrl?: string;
}

const patchUserRequest = async ({
  access_token,
  body,
}: {
  access_token: string;
  body: BodyType;
}) => {
  const response = await axios.patch(
    `${BASE_URL}/users/me/update`,
    {
      userName: body.userName,
      imageUrl: body.imageUrl,
    },
    {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    }
  );

  return response.data;
};

export default patchUserRequest;
