import axios from 'axios';
import { BASE_URL } from './baseUrl';

interface BodyType {
  title?: string;
  description?: string;
  isDone?: boolean;
}

const patchRequestTask = async ({
  id,
  access_token,
  body,
}: {
  id: string;
  access_token: string;
  body: BodyType;
}) => {
  const response = await axios.patch(
    `${BASE_URL}/tasks/${id}`,
    {
      title: body.title,
      description: body.description,
      isDone: body.isDone,
    },
    {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    }
  );

  return response.data;
};

export default patchRequestTask;
