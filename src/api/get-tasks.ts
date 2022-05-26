import axios from 'axios';
import Todo from '../models/todos-model';
import { TaskType } from '../types';
import { BASE_URL } from './baseUrl';

const getTasksRequest = async (
  access_token: string,
  isDone: boolean | null = null
) => {
  const response = await axios.get(`${BASE_URL}/tasks`, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
    params: {
      isDone: isDone,
    },
  });

  if (response.data.length === 0) {
    return response.data;
  } else {
    const data: Todo[] = response.data.tasks.map((task: TaskType) => {
      return new Todo(task);
    });

    return data;
  }
};

export default getTasksRequest;
