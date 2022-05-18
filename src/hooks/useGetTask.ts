import { useCookies } from 'react-cookie';
import { useQuery } from 'react-query';
import { getTasksRequest } from '../api';

const useGetTask = () => {
  const [cookies, setCookie] = useCookies(['access_token']);

  const { isLoading, error, isError, data, refetch } = useQuery('todos', () =>
    getTasksRequest(cookies.access_token)
  );

  let todosIsLoading = isLoading;
  let todosError = error;
  let todosIsError = isError;
  let todosData = data;
  let todosRefetch = refetch;

  return { todosIsLoading, todosError, todosIsError, todosData, todosRefetch };
};

export default useGetTask;
