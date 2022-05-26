import axios from 'axios';
import { BASE_URL } from './baseUrl';

interface BodyType {
  title: string;
  description: string;
  isDone: boolean;
  circleColor: string;
}

const postRequestTask = async ({
  access_token,
  body,
}: {
  access_token: string;
  body: BodyType;
}) => {
  const response = await axios.post(
    `${BASE_URL}/tasks`,
    {
      title: body.title,
      description: body.description,
      isDone: body.isDone,
      circleColor: body.circleColor,
    },
    {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    }
  );

  return response.data;
};

export default postRequestTask;
