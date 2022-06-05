import axios from 'axios';
import { BASE_URL } from './baseUrl';

const getUserAvatarRequest = async (access_token: string) => {
  const response = await axios.get(`${BASE_URL}/users/me/avatar`, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });

  return response.data;
};

export default getUserAvatarRequest;
