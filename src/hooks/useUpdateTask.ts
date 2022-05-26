import { useCookies } from 'react-cookie';
import { useMutation } from 'react-query';
import patchRequestTask from '../api/update-task';
import { Todo } from '../models';

const useUpdateTask = () => {
  const [cookies, setCookie] = useCookies(['access_token']);

  const updateTask = useMutation((task: Todo) =>
    patchRequestTask({
      id: task._id,
      access_token: cookies.access_token,
      body: {
        title: task.title,
        description: task.description,
        isDone: task.isDone,
      },
    })
  );

  return updateTask;
};

export default useUpdateTask;
