import axios from 'axios';
import User from '../models/user-model';
import { BASE_URL } from './baseUrl';

const getRequestUser = async (access_token: string) => {
  const response = await axios.get(`${BASE_URL}/users/me/profile`, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });

  const data: User = new User(response.data.userProfile);

  return data;
};

export default getRequestUser;
