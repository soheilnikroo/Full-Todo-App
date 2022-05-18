import { useCookies } from 'react-cookie';
import { useMutation } from 'react-query';
import { postRequestTask } from '../api';

interface NewTodoType {
  title: string;
  description: string;
  isDone: boolean;
}

const useAddTask = () => {
  const [cookies, setCookie] = useCookies(['access_token']);

  const addTask = useMutation((newTodo: NewTodoType) =>
    postRequestTask({
      access_token: cookies.access_token,
      body: {
        title: newTodo.title,
        description: newTodo.description,
        isDone: newTodo.isDone,
      },
    })
  );

  return addTask;
};

export default useAddTask;
