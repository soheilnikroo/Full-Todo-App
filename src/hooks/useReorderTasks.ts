import { useCookies } from 'react-cookie';
import { useMutation } from 'react-query';
import { reorderRequestTask } from '../api';

const useReorderTasks = () => {
  const [cookies, setCookie] = useCookies(['access_token']);

  const reOrderTask = useMutation(
    (task: { id: string; destinationIndex: number }) =>
      reorderRequestTask({
        access_token: cookies.access_token,
        body: {
          id: task.id,
          destinationIndex: task.destinationIndex,
        },
      })
  );

  return reOrderTask;
};

export default useReorderTasks;
