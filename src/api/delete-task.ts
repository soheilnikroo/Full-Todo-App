import axios from 'axios';
import { BASE_URL } from './baseUrl';

interface DeleteRequestTaskProps {
  access_token: string;
  taskId: string;
}

const deleteRequestTask = async ({
  access_token,
  taskId,
}: DeleteRequestTaskProps) => {
  const response = await axios.delete(`${BASE_URL}/tasks/${taskId}`, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });

  return response.data;
};

export default deleteRequestTask;
