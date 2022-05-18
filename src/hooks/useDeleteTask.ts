import { useCookies } from 'react-cookie';
import { useMutation } from 'react-query';
import { deleteRequestTask } from '../api';

const useDeleteTask = () => {
  const [cookies, setCookie] = useCookies(['access_token']);

  const deleteTask = useMutation((taskId: string) =>
    deleteRequestTask({
      access_token: cookies.access_token,
      taskId,
    })
  );

  return deleteTask;
};

export default useDeleteTask;
