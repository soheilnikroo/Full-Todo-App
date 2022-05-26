import axios from 'axios';
import { BASE_URL } from './baseUrl';

interface BodyType {
  id: string;
  destinationIndex: number;
}

const reorderRequestTask = async ({
  access_token,
  body,
}: {
  access_token: string;
  body: BodyType;
}) => {
  const response = await axios.post(
    `${BASE_URL}/tasks/sortIndex`,
    {
      _id: body.id,
      destinationIndex: body.destinationIndex,
    },
    {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    }
  );

  return response.data;
};

export default reorderRequestTask;
